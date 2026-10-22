import React from 'react';
import { Send } from 'lucide-react';
import { MigrateIQLogo } from './MigrateIQLogo';
import { Platform } from '../types/migration';

interface NavbarProps {
  currentPlatform?: Platform;
  onPlatformChange?: (platform: Platform) => void;
  onOpenRoi?: () => void;
  onOpenArch?: () => void;
  onDownloadBundle?: () => void;
  onScrollToContact: () => void;
  isProcessing?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onScrollToContact,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs px-6 lg:px-12 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">

        {/* Left: MigrateIQ Brand Logo matching reference */}
        <MigrateIQLogo theme="dark" size="md" />

        {/* Right: Microsoft ISV Partner Badge + Action CTA */}
        <div className="flex items-center gap-4 sm:gap-6">

          {/* Microsoft ISV Partner Logo Badge */}
          <div className="flex items-center gap-2 select-none">
            <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
              <span className="bg-[#f25022] w-full h-full" />
              <span className="bg-[#7fba00] w-full h-full" />
              <span className="bg-[#00a4ef] w-full h-full" />
              <span className="bg-[#ffb900] w-full h-full" />
            </div>
            <div className="leading-none text-left">
              <span className="text-xs font-bold text-gray-800 tracking-tight block">
                Microsoft
              </span>
              <span className="text-[10px] text-gray-500 font-medium block">
                ISV Partner
              </span>
            </div>
          </div>

          {/* Request Demo CTA */}
          <button
            onClick={onScrollToContact}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 hover:bg-black text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            <span>Request Demo</span>
          </button>

        </div>

      </div>
    </header>
  );
};
