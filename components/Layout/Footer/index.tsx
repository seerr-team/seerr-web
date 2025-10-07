export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="flex flex-col mx-auto max-w-7xl">
        <ul className="flex items-center justify-between px-4 py-6 mx-auto text-sm text-white lg:container md:px-6">
          <li className="flex items-center space-x-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>Free and Open Source</span>
          </li>

          <li className="flex items-center space-x-6">
            <a
              href="https://github.com/seerr-team/seerr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              GitHub
            </a>
            <a
              href="https://discord.gg/seerr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              Discord
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
