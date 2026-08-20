import React from 'react';
import { cn } from '../../lib/utils';

interface GridBackgroundProps {
  className?: string;
  fade?: boolean;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({ className, fade = true }) => {
  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none z-0 overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          'w-full h-full bg-grid-pattern opacity-40',
          fade && 'bg-radial-fade'
        )}
      />
    </div>
  );
};
