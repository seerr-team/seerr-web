import { NextPage } from 'next';
import Image from 'next/image';
import {
  ClockIcon,
  SparklesIcon,
  AdjustmentsIcon,
  DeviceMobileIcon,
  InboxIcon,
  KeyIcon,
  VideoCameraIcon,
  BellIcon,
} from '@heroicons/react/outline';
import React from 'react';

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
      'We fully integrate with the popular DVR applications Radarr and Sonarr, and support activity monitoring within Seerr itself!',
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
      />
    ),
  },
  {
    name: 'Plex/Jellyfin Library Scanning',
    description:
      'Seerr scans your Plex/Jellyfin libraries at regular intervals, so it knows which items are already available on your server.',
    image: (
      <img
        src="/icons/plex.svg"
        className="w-6 h-6 text-white"
        aria-hidden="true"
      />
    ),
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

interface FAQItem {
  id: number;
  question: React.ReactNode;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'Is there support for other languages?',
    answer:
      'Seerr has already localized into several languages thanks to the community! If your language has not been added yet, we are always accepting new translations!',
  },
  {
    id: 2,
    question: 'Is there support for local users?',
    answer:
      'You can create local users alongside Plex OAuth-based or Jellyfin users. You can use this feature to give access to Seerr to your Plex home users.',
  },
  {
    id: 3,
    question: 'Does Seerr support the new Plex Movie/TV agents?',
    answer:
      'Yes! We have full support for both the new Plex Movie Agent and the new Plex TV Agent!',
  },
  {
    id: 4,
    question: 'Does Seerr support anime agents?',
    answer: (
      <span>
        Seerr currently has full support for{' '}
        <a
          href="https://github.com/ZeroQI/Hama.bundle"
          target="_blank"
          rel="noreferrer"
          className="text-white underline"
        >
          HAMA
        </a>
        {' '}for Plex and AniDB for Jellyfin.
      </span>
    ),
  },
  {
    id: 5,
    question: 'Can I use multiple Radarr/Sonarr servers?',
    answer:
      'You can add as many of them as you like! You can switch between servers using the Advanced Requester when approving requests. We also support 4K Radarr/Sonarr servers.',
  },
  {
    id: 6,
    question: 'Can I import my Plex/Jellyfin users?',
    answer:
      'Yes, of course! Any Plex/Jellyfin account with access to your Plex/Jellyfin server can log in without being imported.',
  },
];

const IndexPage: NextPage = () => {
  return (
    <>
      <div className="flex flex-col mx-auto max-w-7xl">
        <div className="z-40 flex-1 px-4 pt-6 pb-24 md:px-6 md:py-12">
          <div className="relative z-50 flex flex-col items-center justify-center mx-auto space-y-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-center text-gray-100 sm:text-5xl md:text-6xl">
              <span className="block leading-tight xl:inline">Beautiful Media Discovery</span>
              <span className="block leading-tight text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-300">
                Simple Request Management
              </span>
            </h1>
            <p className="mt-3 text-base text-center text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Seerr is a request management and media discovery tool built
              to work with your existing Plex/Jellyfin ecosystem.
            </p>
            <div className="w-full overflow-hidden bg-gray-800 rounded-md shadow-2xl md:rounded-xl">
              <Image
                src="/screenshots/screen_main.jpg"
                width="1655"
                height="990"
                layout="responsive"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative pb-32 overflow-hidden md:pt-16">
        <div className="relative">
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="max-w-xl px-4 mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div>
                  <span className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500">
                    <SparklesIcon
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-300">
                    The best way to discover media
                  </h2>
                  <p className="mt-4 text-lg text-gray-400">
                    Seerr helps you find media you{' '}
                    <em className="font-bold">want</em> to watch. With inline
                    recommendations and suggestions, you will find yourself
                    deeper and deeper in a rabbit hole of content you never knew
                    you just had to have.
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-8 border-t border-gray-700">
                <blockquote>
                  <div>
                    <p className="text-base text-gray-400">
                      Media pages display organized, easy-to-digest information.
                      We show you the information you care about seeing:
                      RottenTomatoes scores, the cast and crew, and more.
                    </p>
                  </div>
                </blockquote>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                <img
                  className="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="/screenshots/screen_movie_details.jpg"
                  alt="Inbox user interface"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24">
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="max-w-xl px-4 mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
              <div>
                <div>
                  <span className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500">
                    <ClockIcon
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-300">
                    Requesting has never been so easy
                  </h2>
                  <p className="mt-4 text-lg text-gray-400">
                    Seerr presents you and your users with a request interface
                    that is incredibly easy to understand and use. Users can
                    select the exact seasons they want to watch. Advanced users
                    can use the &ldquo;Advanced Requests&rdquo; options to change destination
                    folders and quality profiles.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
              <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                <img
                  className="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="/screenshots/screen_season_requests.jpg"
                  alt="Customer profile user interface"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-purple-800 to-indigo-700">
        <div className="max-w-4xl px-4 py-16 mx-auto sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            A request system built for ease of use
          </h2>
          <p className="max-w-3xl mt-4 text-lg text-indigo-200">
            Seerr aims to make you and your user&apos;s lives more effortless
            than ever before. Here are some other useful features we support:
          </p>
          <div className="grid grid-cols-1 mt-12 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name}>
                <div>
                  <span className="flex items-center justify-center w-12 h-12 bg-white rounded-md bg-opacity-10">
                    {feature.image ? (
                      feature.image
                    ) : (
                      <feature.icon
                        className="w-6 h-6 text-white"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-white">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base text-indigo-200">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-200">
            Frequently Asked Questions
          </h2>
          <div className="mt-12">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <dt className="text-lg font-medium leading-6 text-gray-300">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base text-gray-400">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <div>
        <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg shadow-xl bg-gradient-to-br from-indigo-600 to-purple-500 lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="px-6 pt-10 pb-12 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Sound awesome?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-indigo-200">
                  Seerr is easy to get up and running with Docker. We also
                  support other installation methods, which you can find in our
                  documentation. If you need help, feel free to reach out
                  in our support channels, such as Discord.
                </p>
                <a
                  href="https://docs.seerr.dev/getting-started"
                  className="inline-flex items-center px-5 py-3 mt-8 mr-2 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md shadow hover:bg-indigo-50"
                >
                  Installation
                </a>
                <a
                  href="https://docs.seerr.dev/"
                  className="inline-flex items-center px-5 py-3 mt-8 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md shadow hover:bg-indigo-50"
                >
                  Documentation
                </a>
              </div>
            </div>
            <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
              <img
                className="object-cover object-left-top transform translate-x-6 translate-y-6 rounded-md sm:translate-x-16 lg:translate-y-20"
                src="/screenshots/screen_trending.jpg"
                alt="App screenshot"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
