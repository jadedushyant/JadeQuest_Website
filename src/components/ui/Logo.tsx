import React from 'react';
import { cn } from '../../lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true, size = 'md' }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-sm tracking-widest',
    md: 'text-base tracking-[0.25em]',
    lg: 'text-2xl tracking-[0.3em]',
  };

  return (
    <div className={cn('inline-flex items-center gap-3 select-none group', className)}>
      <div className={cn('relative flex items-center justify-center', iconSizes[size])}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer diamond / frame */}
          <rect
            x="20"
            y="3"
            width="24"
            height="24"
            transform="rotate(45 20 3)"
            stroke="rgba(120, 224, 143, 0.4)"
            strokeWidth="1.5"
            className="transition-all duration-500 group-hover:stroke-jade-400 group-hover:scale-105"
          />
          {/* Inner Jade "J" path */}
          <path
            d="M23 12V24C23 27.3 20.3 30 17 30C13.7 30 11 27.3 11 24H15C15 25.1 15.9 26 17 26C18.1 26 19 25.1 19 24V12H23Z"
            fill="#78E08F"
            className="transition-all duration-300 group-hover:fill-warm-white"
          />
          {/* Glowing dot accent */}
          <circle cx="28" cy="13" r="2" fill="#78E08F" className="animate-pulse" />
        </svg>
      </div>

      {showText && (
        <span className={cn('font-syne font-bold text-warm-white transition-colors duration-300 group-hover:text-jade-400', textSizes[size])}>
          JADEQUEST
        </span>
      )}
    </div>
  );
};
