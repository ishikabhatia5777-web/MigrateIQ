import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { MigrateIQLogo } from './MigrateIQLogo';
import { Platform } from '../types/migration';

interface HeroSectionProps {
  platform: Platform;
  onRunMigration: () => void;
  onLearnMore: () => void;
  isProcessing: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRunMigration,
  onLearnMore,
  isProcessing,
}) => {
  return (
    <section className="relative w-full min-h-[520px] lg:min-h-[640px] flex items-center justify-center overflow-hidden">

      {/* Background Image: Dark AI Network (new) */}
      <img
        src="/hero-bg.jpg"
        alt="MigrateIQ AI Network"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-6">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-cyan-200 text-xs font-semibold tracking-wider uppercase">
            AI-Powered Agentic Migration
          </span>
        </div>

        {/* Main Heading — MigrateIQ matching reference logo and styling */}
        <div className="flex items-center justify-center mb-4">
          <MigrateIQLogo theme="light" size="xl" />
        </div>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-slate-200 font-medium max-w-2xl mx-auto mb-4 leading-relaxed drop-shadow-sm">
          Agentic Migration Platform for Microsoft Fabric
        </p>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed">
          Cut migration time, cost, and risk when moving Qlik &amp; Tableau to Microsoft Fabric.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onLearnMore}
            className="px-8 py-3.5 rounded-xl bg-white/85 hover:bg-white text-gray-900 font-semibold text-sm sm:text-base shadow-lg backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            Learn more
          </button>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white/60 animate-bounce">
        <ArrowDown className="w-5 h-5" />
      </div>

    </section>
  );
};
