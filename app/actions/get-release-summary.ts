'use server';

import { generateText } from 'ai';
import { unstable_cache } from 'next/cache';

interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  draft: boolean;
  prerelease: boolean;
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
const GITHUB_FETCH_TIMEOUT_MS = 5000;
const AI_TAGLINE_TIMEOUT_MS = 5000;
const DEFAULT_RELEASE_SCAN_WINDOW = 25;
const RELEASE_SUMMARY_CACHE_VERSION = 'v4';

function getReleaseScanWindow(): number {
  const rawValue = process.env.RELEASE_SCAN_WINDOW;
  if (!rawValue) return DEFAULT_RELEASE_SCAN_WINDOW;

  const parsedValue = parseInt(rawValue, 10);
  if (Number.isNaN(parsedValue)) return DEFAULT_RELEASE_SCAN_WINDOW;

  // GitHub API max per_page is 100.
  return Math.min(Math.max(parsedValue, 1), 100);
}

function getTaglineModel(): string {
  const model = process.env.RELEASE_TAGLINE_MODEL || 'openai/gpt-4o-mini';
  return model.trim();
}

async function fetchLatestReleases(
  perPage: number = getReleaseScanWindow()
): Promise<GitHubRelease[]> {
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
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GITHUB_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://api.github.com/repos/seerr-team/seerr/releases?per_page=${perPage}`,
      { ...fetchOptions, signal: controller.signal }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const releases = (await response.json()) as GitHubRelease[];
    return releases.filter((release) => !release.draft && !release.prerelease);
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Generate a catchy tagline from release notes using AI when configured.
 * Falls back to a descriptive release name or a generic tagline.
 */
async function generateTagline(
  releaseName: string,
  releaseBody: string
): Promise<string> {
  const fallbackTagline = (reason: string): string => {
    // Try to use the release name if it's descriptive
    // Ignore generic titles like "Release v3.1.0".
    const looksGenericReleaseTitle = /^release\s+v?\d+\.\d+\.\d+/i.test(
      releaseName.trim()
    );
    if (
      releaseName &&
      releaseName.toLowerCase() !== releaseName.replace(/[^\d.]/g, '') &&
      !looksGenericReleaseTitle
    ) {
      // Release name has more than just version number
      return (
        releaseName.replace(/^v?\d+\.\d+\.\d+\s*[-:]?\s*/i, '').trim() ||
        'New Features & Improvements'
      );
    }

    return 'New Features & Improvements';
  };

  // Try AI generation if available
  try {
    const model = getTaglineModel();
    if (!model) {
      return fallbackTagline('no RELEASE_TAGLINE_MODEL available');
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), AI_TAGLINE_TIMEOUT_MS);

    const { text } = await generateText({
      model,
      maxOutputTokens: 50,
      abortSignal: controller.signal,
      prompt: `You are writing a short, catchy tagline for a software release badge on a marketing website.

Release Name: ${releaseName}
Release Notes:
${releaseBody.slice(0, 2000)}

Generate a single short tagline (5-8 words max) that prioritizes user-facing FEATURES from the release notes when present.
If feature additions are available, focus on those and avoid centering bug fixes.
Only mention bug fixes when no meaningful new features are described.
Be concise and engaging. Don't use quotes or punctuation at the end.
Examples of good taglines:
- "Now with Multi-Server Support"
- "Introducing Advanced Search Filters"
- "Faster Performance & New UI"
- "Full Anime Support is Here"

Your tagline:`,
    }).finally(() => clearTimeout(timeout));

    return text
      .trim()
      .replace(/^["']|["']$/g, '')
      .replace(/[.!]$/, '');
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn(
        `[release-summary] AI tagline generation timed out after ${AI_TAGLINE_TIMEOUT_MS}ms`
      );
    } else {
      console.error('[release-summary] Failed to generate AI tagline:', error);
    }
    return fallbackTagline('AI generation failed');
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
      const releases = await fetchLatestReleases();

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
  [`release-summary-${RELEASE_SUMMARY_CACHE_VERSION}`],
  {
    revalidate: 86400, // Cache for 24 hours
    tags: [`release-summary-${RELEASE_SUMMARY_CACHE_VERSION}`],
  }
);

export async function getReleaseSummary(): Promise<ReleaseSummary | null> {
  return getCachedReleaseSummary();
}
