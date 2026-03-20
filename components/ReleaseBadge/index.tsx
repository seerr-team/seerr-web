import { getReleaseSummary } from '../../app/actions/get-release-summary';

interface ReleaseBadgeProps {
  fallbackText?: string;
}

export default async function ReleaseBadge({ 
  fallbackText = 'The Evolution of Overseerr & Jellyseerr' 
}: ReleaseBadgeProps) {
  const release = await getReleaseSummary();

  // If no feature release or fetch failed, show fallback
  if (!release) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        {fallbackText}
      </div>
    );
  }

  return (
    <a 
      href={release.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-colors"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
      </span>
      <span className="font-semibold">v{release.version}</span>
      <span className="text-gray-400">-</span>
      <span className="group-hover:text-indigo-200 transition-colors">{release.tagline}</span>
      <svg 
        className="w-4 h-4 opacity-60 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
}
