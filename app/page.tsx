import React from 'react';
import Image from 'next/image';
import ReleaseBadge from '@components/ReleaseBadge';
import {
  ClockIcon,
  SparklesIcon,
  AdjustmentsIcon,
  DeviceMobileIcon,
  InboxIcon,
  KeyIcon,
  VideoCameraIcon,
  BellIcon,
  ServerIcon,
  HeartIcon,
  CodeIcon,
  LightningBoltIcon,
  CubeTransparentIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline';

const features = [
  {
    name: 'Easy Request Management',
    description:
      'Approving and declining requests is fast and straightforward. Open Seerr, approve, and move on.',
    icon: InboxIcon,
  },
  {
    name: 'Granular Permissions',
    description:
      'Grant access to specific features and restrict access to others. Each user can be assigned individual permissions.',
    icon: KeyIcon,
  },
  {
    name: 'DVR Integration',
    description:
      'We fully integrate with the popular DVR applications Radarr and Sonarr, and support activity monitoring within Seerr itself!',
    icon: VideoCameraIcon,
  },
  {
    name: '4K Support',
    description:
      'Manage standard and 4K content separately using multiple Radarr/Sonarr servers.',
    image: (
      <img
        src="/icons/4k.svg"
        className="w-6 h-6 text-white"
        aria-hidden="true"
        alt=""
      />
    ),
  },
  {
    name: 'Library Scanning',
    description:
      'Seerr scans your Plex, Jellyfin, or Emby libraries at regular intervals, so it knows which items are already available.',
    icon: ServerIcon,
  },
  {
    name: 'Notifications',
    description:
      'Several notification agents are directly supported, including email, Discord, Pushbullet, Pushover, Slack, and Telegram.',
    icon: BellIcon,
  },
  {
    name: 'Mobile-Friendly Experience',
    description:
      'Use Seerr as a near-native mobile app by adding it to your home screen. Seerr is designed for use on any screen size.',
    icon: DeviceMobileIcon,
  },
  {
    name: 'Request Limits',
    description:
      'Restrict the number of movies or TV seasons a user can request over a configurable time period.',
    icon: AdjustmentsIcon,
  },
];

const integrations = [
  {
    name: 'Jellyfin',
    description: 'Full authentication and library sync support',
    logo: '/icons/jellyfin-icon.svg',
  },
  {
    name: 'Plex',
    description: 'Native OAuth login and library scanning',
    logo: '/icons/plex.svg',
  },
  {
    name: 'Emby',
    description: 'Seamless integration with your Emby server',
    logo: '/icons/emby-icon-only.svg',
  },
  {
    name: 'Radarr',
    description: 'Automatic movie request handling',
    logo: '/icons/radarr.svg',
  },
  {
    name: 'Sonarr',
    description: 'Automatic TV series request handling',
    logo: '/icons/sonarr.svg',
  },
];

const evolutionPoints = [
  {
    title: 'Born from the Community',
    description:
      'Seerr is the result of a collaborative effort between the original Overseerr project and the Jellyseerr fork, combining the best of both worlds.',
    icon: HeartIcon,
  },
  {
    title: 'Multi-Platform Support',
    description:
      'Unlike its predecessors, Seerr supports Jellyfin, Plex, AND Emby - all in one unified application.',
    icon: CubeTransparentIcon,
  },
  {
    title: 'Modern Architecture',
    description:
      'Built with TypeScript and modern best practices, Seerr is faster, more reliable, and easier to extend.',
    icon: CodeIcon,
  },
  {
    title: 'Active Development',
    description:
      'With 190+ contributors and regular releases, Seerr is constantly improving with new features and fixes.',
    icon: LightningBoltIcon,
  },
];

const stats = [
  { label: 'GitHub Stars', value: '10,300+' },
  { label: 'Contributors', value: '190+' },
  { label: 'Languages', value: '25+' },
];

const newFeatures = [
  'PostgreSQL and SQLite database support',
  'Watchlist and Blocklist functionality',
  'Override rules for custom request handling',
  'Enhanced notification system',
  'Improved permission granularity',
  'Better mobile experience',
];

interface FAQItem {
  id: number;
  question: React.ReactNode;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'What makes Seerr different from Overseerr or Jellyseerr?',
    answer:
      "Seerr combines the best features of both projects while adding support for all three major media servers: Jellyfin, Plex, and Emby. It's a unified solution actively maintained by the community.",
  },
  {
    id: 2,
    question: 'Is migration from Overseerr or Jellyseerr easy?',
    answer:
      'Yes! We provide detailed migration guides in our documentation. Your existing settings, users, and request history can be preserved during migration.',
  },
  {
    id: 3,
    question: 'Is there support for other languages?',
    answer:
      "Seerr has been localized into over 25 languages thanks to our amazing community! If your language hasn't been added yet, we welcome new translations.",
  },
  {
    id: 4,
    question: 'Can I use multiple Radarr/Sonarr servers?',
    answer:
      'Absolutely! You can add as many servers as you need, including separate 4K servers. The Advanced Requester lets you choose destinations when approving requests.',
  },
  {
    id: 5,
    question: 'What database options are available?',
    answer:
      'Seerr supports both PostgreSQL and SQLite databases, giving you flexibility to choose what works best for your setup.',
  },
  {
    id: 6,
    question: 'How do I get support if I run into issues?',
    answer: (
      <span>
        Check out our{' '}
        <a
          href="https://docs.seerr.dev"
          target="_blank"
          rel="noreferrer"
          className="text-white underline hover:text-indigo-300"
        >
          documentation
        </a>{' '}
        first, then join our{' '}
        <a
          href="https://discord.gg/seerr"
          target="_blank"
          rel="noreferrer"
          className="text-white underline hover:text-indigo-300"
        >
          Discord community
        </a>{' '}
        for help from the team and other users.
      </span>
    ),
  },
];

export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col mx-auto max-w-7xl">
        <div className="z-40 flex-1 px-4 pt-6 pb-16 md:px-6 md:py-12">
          <div className="relative z-50 flex flex-col items-center justify-center mx-auto">
            {/* Dynamic Release Badge */}
            <div className="mb-6">
              <ReleaseBadge />
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-center text-gray-100 sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block leading-tight text-balance">
                Beautiful Media Discovery
              </span>
              <span className="block leading-tight text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-400">
                Simple Request Management
              </span>
            </h1>

            <p className="mt-6 text-lg text-center text-gray-400 sm:text-xl max-w-3xl mx-auto text-balance">
              Seerr is a free, open-source request management and media
              discovery tool that works seamlessly with your{' '}
              <strong className="text-gray-200">Jellyfin</strong>,{' '}
              <strong className="text-gray-200">Plex</strong>, or{' '}
              <strong className="text-gray-200">Emby</strong> server.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="https://docs.seerr.dev/getting-started"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25"
              >
                Get Started
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
              <a
                href="https://github.com/seerr-team/seerr"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-300 rounded-lg border border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 transition-all"
              >
                <svg
                  className="mr-2 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                View on GitHub
              </a>
            </div>

            {/* Stats Row */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl">
              {stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`text-center ${
                    idx === stats.length - 1 ? 'col-span-2 md:col-span-1' : ''
                  }`}
                >
                  <div className="text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Hero Screenshot - Placeholder for user to provide */}
            <div className="mt-12 w-full overflow-hidden bg-gray-800/50 backdrop-blur rounded-xl shadow-2xl border border-gray-700/50">
              <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <Image
                  src="/screenshots/screen_main.jpg"
                  alt="Seerr main dashboard screenshot"
                  width={1920}
                  height={1080}
                  priority
                  sizes="(max-width: 768px) 100vw, 1280px"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evolution Section */}
      <section className="py-16 md:py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">
              The Evolution
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              From Overseerr & Jellyseerr to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Seerr
              </span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
              Seerr unifies the best of both projects into a single, powerful
              application that works with all major media servers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {evolutionPoints.map((point) => (
              <div
                key={point.title}
                className="relative p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-indigo-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <point.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {point.title}
                </h3>
                <p className="text-gray-400 text-sm">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's New Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <span className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">
                What&apos;s New
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                Built for the modern media server
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Seerr brings powerful new features that weren&apos;t available
                in the original projects, making media management easier than
                ever.
              </p>

              <ul className="mt-8 space-y-4">
                {newFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://docs.seerr.dev/"
                className="mt-8 inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Read the full changelog
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>

            {/* Screenshot Placeholder */}
            <div className="mt-8 lg:mt-0">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700/50">
                <div className="relative aspect-[231/157] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <Image
                    src="/screenshots/screen_feature_1.png"
                    alt="Seerr feature screenshot"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Discovery Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 mt-8 lg:mt-0">
              {/* Screenshot Placeholder */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[231/157] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-gray-700/50">
                  <Image
                    src="/screenshots/screen_feature_filters.png"
                    alt="Seerr request filters screenshot"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                The best way to discover media
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Seerr helps you find media you{' '}
                <em className="font-semibold text-gray-200">want</em> to watch.
                With inline recommendations and suggestions, you&apos;ll find
                yourself deeper and deeper in a rabbit hole of content you never
                knew you just had to have.
              </p>
              <div className="mt-8 pt-8 border-t border-gray-700">
                <p className="text-gray-400">
                  Media pages display organized, easy-to-digest information. We
                  show you the information you care about: ratings, the cast and
                  crew, streaming availability, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Request System Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
            <div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6">
                <ClockIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Requesting has never been so easy
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Seerr presents you and your users with a request interface that
                is incredibly easy to understand and use. Users can select the
                exact seasons they want to watch.
              </p>
              <p className="mt-4 text-lg text-gray-400">
                Advanced users can use the &ldquo;Advanced Requests&rdquo;
                options to change destination folders and quality profiles.
              </p>
            </div>

            <div className="mt-8 lg:mt-0">
              {/* Screenshot Placeholder */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[231/157] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-gray-700/50">
                  <Image
                    src="/screenshots/screen_feature_2.png"
                    alt="Seerr request screenshot"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-16 md:py-24 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">
              Integrations
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Works with your favorite tools
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
              Seerr integrates seamlessly with all major media servers and
              automation tools.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="flex flex-col items-center p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-indigo-500/50 hover:bg-gray-800 transition-all group"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-700/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {integration.logo ? (
                    <img
                      src={integration.logo}
                      alt={`${integration.name} logo`}
                      className="w-10 h-10 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <ServerIcon className="w-8 h-8 text-indigo-400" />
                  )}
                </div>
                <h3 className="text-white font-semibold">{integration.name}</h3>
                <p className="text-gray-500 text-sm text-center mt-1">
                  {integration.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section
        id="features"
        className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              A request system built for ease of use
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-indigo-200">
              Seerr aims to make you and your user&apos;s lives easier than ever
              before. Here are some of the features that make it special:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.name} className="group">
                <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.image ? (
                    feature.image
                  ) : (
                    <feature.icon
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.name}
                </h3>
                <p className="text-indigo-200 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">
              Community
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Built by the community, for the community
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
              Seerr is open source and thrives thanks to our amazing community
              of contributors and users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="https://github.com/seerr-team/seerr"
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-indigo-500/50 transition-all group text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-700/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Contribute on GitHub
              </h3>
              <p className="text-gray-400">
                Help us build new features, fix bugs, or improve documentation.
              </p>
            </a>

            <a
              href="https://discord.gg/seerr"
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-indigo-500/50 transition-all group text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-indigo-600/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Join our Discord
              </h3>
              <p className="text-gray-400">
                Get help, share ideas, and connect with other Seerr users.
              </p>
            </a>

            <a
              href="https://docs.seerr.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-indigo-500/50 transition-all group text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-700/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Read the Docs
              </h3>
              <p className="text-gray-400">
                Comprehensive guides for installation, configuration, and usage.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-800/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="p-6 rounded-xl bg-gray-800/50 border border-gray-700/50"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
            <div className="relative lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div className="p-8 sm:p-12 lg:p-16">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Ready to get started?
                </h2>
                <p className="mt-4 text-lg text-indigo-100">
                  Seerr is easy to set up with Docker or one of our other
                  installation methods. Join thousands of users who have
                  simplified their media request workflow.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://docs.seerr.dev/getting-started"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-indigo-600 bg-white rounded-lg shadow hover:bg-indigo-50 transition-all"
                  >
                    Installation Guide
                  </a>
                  <a
                    href="https://docs.seerr.dev/"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white border border-white/30 rounded-lg hover:bg-white/10 transition-all"
                  >
                    Full Documentation
                  </a>
                </div>
              </div>

              {/* Screenshot Placeholder */}
              <div className="hidden lg:block p-8">
                <div className="relative rounded-xl overflow-hidden shadow-2xl transform translate-x-8 -translate-y-4">
                  <div className="relative aspect-[231/157] bg-gray-900/30 backdrop-blur flex items-center justify-center">
                    <Image
                      src="/screenshots/screen_trending.png"
                      alt="Seerr trending screenshot"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
