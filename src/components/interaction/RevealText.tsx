import React, { useRef, useEffect } from 'react';
import { createTextReveal, createStaggerLinesReveal } from '../../animations/scroll/textReveal';
import { cn } from '../../lib/utils';

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  isLines?: boolean;
  delay?: number;
}

export const RevealText: React.FC<RevealTextProps> = ({
  children,
  className,
  isLines = false,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (isLines) {
      const anim = createStaggerLinesReveal(ref.current);
      return () => {
        anim?.kill();
      };
    } else {
      const anim = createTextReveal(ref.current, { delay });
      return () => {
        anim?.kill();
      };
    }
  }, [isLines, delay]);

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      {children}
    </div>
  );
};
