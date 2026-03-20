'use server';

import { generateText } from 'ai';
import { unstable_cache } from 'next/cache';

interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
}

interface ReleaseSummary {
  version: string;
  tagline: string;
  url: string;
  isFeatureRelease: boolean;
}

type NextFetchOptions = RequestInit & {
  // Next.js adds `next.revalidate` to `fetch` options. We model it explicitly
  // so we don't need `as any`.
  next?: {
    revalidate?: number;
  };
};

/**
 * Parse semantic version and determine if it's a feature release (minor bump)
 */
function parseVersion(
  version: string
): { major: number; minor: number; patch: number } | null {
  const match = version.replace(/^v/, '').match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!match) return null;
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
  };
}

function isFeatureRelease(
  currentVersion: string,
  previousVersion: string | null
): boolean {
  const current = parseVersion(currentVersion);
  if (!current) return false;

  // If no previous version to compare, check if patch is 0 (indicates feature release)
  if (!previousVersion) {
    return current.patch === 0;
  }

  const previous = parseVersion(previousVersion);
  if (!previous) return current.patch === 0;

  // Feature release if minor version increased or major version increased
  return (
    current.major > previous.major ||
    (current.major === previous.major && current.minor > previous.minor)
  );
}

/**
 * Fetch the latest releases from GitHub
 */
async function fetchLatestReleases(perPage: number): Promise<GitHubRelease[]> {
  const fetchOptions: NextFetchOptions = {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      // Add GitHub token if available for higher rate limits
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      }),
    },
    next: { revalidate: 86400 }, // Cache for 24 hours
  };

  const response = await fetch(
    `https://api.github.com/repos/seerr-team/seerr/releases?per_page=${perPage}`,
    fetchOptions
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Extract a short tagline from release notes without AI
 * Looks for common patterns in changelogs
 */
function extractTaglineFromNotes(releaseBody: string): string | null {
  if (!releaseBody) return null;

  // Common patterns to look for in release notes
  const patterns = [
    /##\s*(?:Highlights?|What's New|Features?)\s*\n+[*-]?\s*(.+)/i,
    /###?\s*(?:Added|New)\s*\n+[*-]\s*(.+)/i,
    /[*-]\s*(?:Add(?:ed)?|New|Introduce[ds]?|Support(?:s|ed)?)\s+(.+?)(?:\n|$)/i,
  ];

  for (const pattern of patterns) {
    const match = releaseBody.match(pattern);
    if (match && match[1]) {
      let tagline = match[1].trim();
      // Clean up markdown and limit length
      tagline = tagline
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
        .replace(/[`*_]/g, '') // Remove markdown formatting
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();

      // Limit to reasonable length (around 8 words)
      const words = tagline.split(' ').slice(0, 8);
      return words.join(' ');
    }
  }

  return null;
}

/**
 * Generate a catchy tagline from release notes using AI
 * Falls back to extracting from notes or generic tagline
 */
async function generateTagline(
  releaseName: string,
  releaseBody: string
): Promise<string> {
  // First try to extract from release notes (no AI needed)
  const extractedTagline = extractTaglineFromNotes(releaseBody);
  if (extractedTagline) {
    return extractedTagline;
  }

  // Try AI generation if available
  try {
    const { text } = await generateText({
      model: 'openai/gpt-4o-mini',
      maxOutputTokens: 50,
      prompt: `You are writing a short, catchy tagline for a software release badge on a marketing website.

Release Name: ${releaseName}
Release Notes:
${releaseBody.slice(0, 2000)}

Generate a single short tagline (5-8 words max) that highlights the most exciting new feature or improvement. 
Be concise and engaging. Don't use quotes or punctuation at the end.
Examples of good taglines:
- "Now with Multi-Server Support"
- "Introducing Advanced Search Filters"
- "Faster Performance & New UI"
- "Full Anime Support is Here"

Your tagline:`,
    });

    return text
      .trim()
      .replace(/^["']|["']$/g, '')
      .replace(/[.!]$/, '');
  } catch (error) {
    console.error('Failed to generate AI tagline:', error);

    // Try to use the release name if it's descriptive
    if (
      releaseName &&
      releaseName.toLowerCase() !== releaseName.replace(/[^\d.]/g, '')
    ) {
      // Release name has more than just version number
      return (
        releaseName.replace(/^v?\d+\.\d+\.\d+\s*[-:]?\s*/i, '').trim() ||
        'New Features & Improvements'
      );
    }

    return 'New Features & Improvements';
  }
}

/**
 * Get release summary with caching
 */
const getCachedReleaseSummary = unstable_cache(
  async (): Promise<ReleaseSummary | null> => {
    try {
      // We need to find the most recent *minor/major* release, not just
      // whether the latest release qualifies. For example, if the latest
      // release is a patch, we still want the latest preceding minor/major.
      //
      // Fetch enough releases to cover typical sequences of patch releases.
      const releases = await fetchLatestReleases(10);

      if (!releases || releases.length === 0) {
        return null;
      }

      // releases are ordered newest -> oldest.
      // For index i, we compare against index i+1 (the older release)
      // to determine if release i is a "feature release".
      let featureRelease: GitHubRelease | null = null;
      let featureReleaseIndex: number | null = null;

      // If GitHub only returns a single release, fall back to a best-effort
      // check against "no previous version" (patch === 0 indicates a feature
      // release for the first version).
      if (releases.length === 1) {
        const onlyRelease = releases[0];
        const isFeature = isFeatureRelease(onlyRelease.tag_name, null);
        if (isFeature) {
          featureRelease = onlyRelease;
          featureReleaseIndex = 0;
        }
      }

      for (let i = 0; i < releases.length - 1 && !featureRelease; i++) {
        const currentRelease = releases[i];
        const previousRelease = releases[i + 1];
        const isFeature = isFeatureRelease(
          currentRelease.tag_name,
          previousRelease?.tag_name || null
        );

        if (isFeature) {
          featureRelease = currentRelease;
          featureReleaseIndex = i;
          break;
        }
      }

      // No minor/major release found in the scanned window.
      if (!featureRelease || featureReleaseIndex === null) {
        return null;
      }

      const tagline = await generateTagline(
        featureRelease.name || featureRelease.tag_name,
        featureRelease.body || ''
      );

      return {
        version: featureRelease.tag_name.replace(/^v/, ''),
        tagline,
        url: featureRelease.html_url,
        isFeatureRelease: true,
      };
    } catch (error) {
      console.error('Failed to fetch release summary:', error);
      return null;
    }
  },
  ['release-summary-v2'],
  {
    revalidate: 86400, // Cache for 24 hours
    tags: ['release-summary-v2'],
  }
);

export async function getReleaseSummary(): Promise<ReleaseSummary | null> {
  return getCachedReleaseSummary();
}
