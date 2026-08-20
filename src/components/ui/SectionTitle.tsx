import React from 'react';
import { cn } from '../../lib/utils';

interface SectionTitleProps {
  eyebrow?: string;
  number?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  eyebrow,
  number,
  title,
  subtitle,
  className,
  align = 'left',
}) => {
  return (
    <div className={cn('mb-12 md:mb-20', align === 'center' ? 'text-center' : 'text-left', className)}>
      {(eyebrow || number) && (
        <div className={cn('flex items-center gap-3 mb-4', align === 'center' ? 'justify-center' : 'justify-start')}>
          {number && (
            <span className="font-mono text-xs text-jade-500 font-semibold px-2 py-0.5 rounded border border-jade-500/30 bg-jade-500/10">
              {number}
            </span>
          )}
          {eyebrow && (
            <span className="eyebrow-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-jade-400 animate-pulse" />
              {eyebrow}
            </span>
          )}
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-syne font-bold tracking-tight text-warm-white uppercase leading-[1.02]">
        {title}
      </h2>

      {subtitle && (
        <p className={cn('mt-4 text-base sm:text-lg md:text-xl text-warm-muted max-w-2xl font-light leading-relaxed', align === 'center' ? 'mx-auto' : '')}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
