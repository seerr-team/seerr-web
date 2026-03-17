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

/**
 * Parse semantic version and determine if it's a feature release (minor bump)
 */
function parseVersion(version: string): { major: number; minor: number; patch: number } | null {
  const match = version.replace(/^v/, '').match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!match) return null;
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
  };
}

function isFeatureRelease(currentVersion: string, previousVersion: string | null): boolean {
  const current = parseVersion(currentVersion);
  if (!current) return false;
  
  // If no previous version to compare, check if patch is 0 (indicates feature release)
  if (!previousVersion) {
    return current.patch === 0;
  }
  
  const previous = parseVersion(previousVersion);
  if (!previous) return current.patch === 0;
  
  // Feature release if minor version increased or major version increased
  return current.major > previous.major || 
         (current.major === previous.major && current.minor > previous.minor);
}

/**
 * Fetch the latest releases from GitHub
 */
async function fetchLatestReleases(): Promise<GitHubRelease[]> {
  const response = await fetch(
    'https://api.github.com/repos/seerr-team/seerr/releases?per_page=2',
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        // Add GitHub token if available for higher rate limits
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Generate a catchy tagline from release notes using AI
 */
async function generateTagline(releaseName: string, releaseBody: string): Promise<string> {
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

    return text.trim().replace(/^["']|["']$/g, '').replace(/[.!]$/, '');
  } catch (error) {
    console.error('Failed to generate AI tagline:', error);
    // Fallback to release name or generic tagline
    return releaseName || 'New Features Available';
  }
}

/**
 * Get release summary with caching
 */
const getCachedReleaseSummary = unstable_cache(
  async (): Promise<ReleaseSummary | null> => {
    try {
      const releases = await fetchLatestReleases();
      
      if (!releases || releases.length === 0) {
        return null;
      }

      const latestRelease = releases[0];
      const previousRelease = releases[1] || null;
      
      const isFeature = isFeatureRelease(
        latestRelease.tag_name,
        previousRelease?.tag_name || null
      );

      // Only generate AI tagline for feature releases
      if (!isFeature) {
        return null;
      }

      const tagline = await generateTagline(
        latestRelease.name || latestRelease.tag_name,
        latestRelease.body || ''
      );

      return {
        version: latestRelease.tag_name.replace(/^v/, ''),
        tagline,
        url: latestRelease.html_url,
        isFeatureRelease: isFeature,
      };
    } catch (error) {
      console.error('Failed to fetch release summary:', error);
      return null;
    }
  },
  ['release-summary'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['release-summary'],
  }
);

export async function getReleaseSummary(): Promise<ReleaseSummary | null> {
  return getCachedReleaseSummary();
}
