import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 px-6 lg:px-12 text-gray-600 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: AOSC Technologies Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-sm shadow-cyan-500/20 flex-shrink-0 text-white">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 3-8 4.5v9L12 21l8-4.5v-9L12 3Z" />
              <path d="M12 12 4 7.5" />
              <path d="m12 12 8-4.5" />
              <path d="M12 12v9" />
            </svg>
          </div>

          <span className="font-display font-bold text-xl tracking-tight text-gray-950">
            AOSC Technologies
          </span>
        </div>

        {/* Center: Badges (Microsoft for Startups + Microsoft ISV Partner) */}
        <div className="flex items-center gap-6">
          <img
            src="https://images.squarespace-cdn.com/content/v1/679d89679ef8b943803f6a4a/b8f6139c-328e-4eb6-a192-eff6dc14c5fb/MicrosoftForStartupsBadge.png"
            alt="Microsoft for Startups"
            className="h-10 object-contain opacity-90"
          />
        </div>

        {/* Right: Copyright and navigation */}
        <div className="text-center md:text-right text-gray-500 space-y-1">
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-xs font-medium text-gray-600 mb-2">
            <a href="#agents-showcase-section" className="hover:text-black transition-colors">
              AI Agents
            </a>
            <span>&bull;</span>
            <a href="#contact-section" className="hover:text-black transition-colors">
              Request Demo
            </a>
          </div>

          <p>&copy; {new Date().getFullYear()} AOSC Technologies. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};
