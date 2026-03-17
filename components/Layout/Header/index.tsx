'use client';

import { useState, useRef } from 'react';
import Image from 'next/legacy/image';
import Transition from '../../Transition';
import useClickOutside from 'hooks/useClickOutside';

const navLinks = [
  { href: 'https://docs.seerr.dev', label: 'Documentation' },
  { href: 'https://github.com/seerr-team/seerr', label: 'GitHub' },
  { href: 'https://discord.gg/seerr', label: 'Discord' },
];

export default function Header() {
  const ref = useRef<HTMLDivElement>(null);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  useClickOutside(ref, () => setMobileMenuIsOpen(false));

  return (
    <div className="flex flex-col mx-auto max-w-7xl">
      <div className="relative z-50 pb-8 sm:pb-12">
        <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
          <nav
            className="relative flex items-center justify-between"
            aria-label="Global"
          >
            {/* Logo */}
            <div className="flex items-center">
              <a href="#" className="flex items-center gap-3 group">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                  <Image
                    src="/os_logo_filled.svg"
                    width={48}
                    height={48}
                    priority
                    alt="Seerr Logo"
                    className="transition-transform group-hover:scale-105"
                  />
                </div>
                <span className="text-xl font-bold text-white hidden sm:block">
                  Seerr
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:text-white hover:bg-gray-800/50 transition-all"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://docs.seerr.dev/getting-started"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800/80 backdrop-blur rounded-lg hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all"
                onClick={() => setMobileMenuIsOpen(true)}
                aria-label="Open main menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <Transition
          show={mobileMenuIsOpen}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="absolute inset-x-0 top-0 z-50 p-2 md:hidden">
            <div
              ref={ref}
              className="overflow-hidden bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-gray-700/50"
            >
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-700/50">
                <a href="#" className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <Image
                      src="/os_logo_filled.svg"
                      width={40}
                      height={40}
                      priority
                      alt="Seerr Logo"
                    />
                  </div>
                  <span className="text-lg font-bold text-white">Seerr</span>
                </a>
                <button
                  onClick={() => setMobileMenuIsOpen(false)}
                  type="button"
                  className="inline-flex items-center justify-center p-2 text-gray-400 rounded-lg hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all"
                  aria-label="Close main menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="px-3 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-base font-medium text-gray-200 rounded-xl hover:text-white hover:bg-gray-800/80 transition-all"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4 px-2">
                  <a
                    href="https://docs.seerr.dev/getting-started"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-3 text-base font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
