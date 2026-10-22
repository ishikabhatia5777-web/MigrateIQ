import React from 'react';

interface MigrateIQLogoProps {
  /** 'dark' = dark text for white/light backgrounds; 'light' = white text for dark backgrounds */
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export const MigrateIQLogo: React.FC<MigrateIQLogoProps> = ({
  theme = 'dark',
  size = 'md',
  className = '',
  showText = true,
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl sm:text-5xl',
  };

  const migrateTextColor = theme === 'light' ? 'text-white' : 'text-slate-950';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Interlocking Link Rings SVG */}
      <svg
        viewBox="0 0 44 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSizes[size]} flex-shrink-0 drop-shadow-sm`}
      >
        {/* Left Ring Back Arc (Light Sky / Periwinkle Blue) */}
        <path
          d="M 18 10 C 11.5 10, 6.5 14.5, 6.5 20 C 6.5 25.5, 11.5 30, 18 30 C 20.8 30, 23.3 28.7, 25.2 26.6"
          stroke="#79A2FB"
          strokeWidth="4.6"
          strokeLinecap="round"
        />

        {/* Right Ring Full Loop (Cobalt / Royal Blue) */}
        <path
          d="M 26 30 C 32.5 30, 37.5 25.5, 37.5 20 C 37.5 14.5, 32.5 10, 26 10 C 23.2 10, 20.7 11.3, 18.8 13.4 C 17.5 15, 16.8 17.2, 16.8 20 C 16.8 22.8, 17.5 25, 18.8 26.6"
          stroke="#2563EB"
          strokeWidth="4.6"
          strokeLinecap="round"
        />

        {/* Left Ring Front Overlap Arc (passes in front of Right Ring on top to create the interlock) */}
        <path
          d="M 14 10.8 C 15.3 10.3, 16.6 10, 18 10 C 21.5 10, 24.6 11.8, 26.5 14.6"
          stroke="#79A2FB"
          strokeWidth="4.6"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand Text */}
      {showText && (
        <span className={`font-display font-extrabold tracking-tight leading-none ${textSizes[size]}`}>
          <span className={migrateTextColor}>Migrate</span>
          <span className="text-[#2563EB]">IQ</span>
        </span>
      )}
    </div>
  );
};
