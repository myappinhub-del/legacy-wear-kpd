import React from 'react';

interface LogoProps {
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  themePrimary?: string;
}

export const Logo: React.FC<LogoProps> = ({
  onClick,
  size = 'md',
  showTagline = false,
  className = '',
  themePrimary = '#d4af37'
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div
      onClick={onClick}
      className={`group flex items-center gap-3 cursor-pointer select-none transition-transform duration-200 active:scale-95 ${className}`}
      title="Legacy Wear"
    >
      {/* Monogram Crest Emblem matching mockup */}
      <div
        className={`relative flex items-center justify-center rounded-full border border-[#d4af37]/40 bg-gradient-to-b from-[#1a1b24] to-[#0c0d12] shadow-lg transition-all duration-300 group-hover:border-[#d4af37] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] ${
          isSm ? 'h-9 w-9' : isLg ? 'h-14 w-14' : 'h-11 w-11'
        }`}
      >
        {/* Outer ornate circle thin stroke */}
        <div className="absolute inset-[2px] rounded-full border border-[#d4af37]/25" />
        
        {/* LW Monogram letters */}
        <span
          className={`font-serif font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#fef08a] via-[#d4af37] to-[#b45309] ${
            isSm ? 'text-sm' : isLg ? 'text-2xl' : 'text-lg'
          }`}
          style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
        >
          LW
        </span>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        <span
          className={`font-cinzel tracking-[0.22em] font-extrabold text-white uppercase transition-colors group-hover:text-[#d4af37] ${
            isSm ? 'text-xs' : isLg ? 'text-xl' : 'text-sm sm:text-base'
          }`}
        >
          LEGACY WEAR
        </span>
        {showTagline && (
          <span className="text-[10px] tracking-[0.16em] uppercase text-zinc-400 font-medium">
            Timeless Style. Lasting Legacy.
          </span>
        )}
      </div>
    </div>
  );
};
