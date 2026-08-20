import React, { useRef, useEffect } from 'react';
import { createMagneticButton } from '../../animations/interaction/magnetic';
import { cn } from '../../lib/utils';

interface MagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  strength?: number;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.35,
  className,
  ...props
}) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elRef.current) return;
    const cleanup = createMagneticButton(elRef.current, strength);
    return () => cleanup?.();
  }, [strength]);

  return (
    <div ref={elRef} className={cn('inline-block', className)} {...props}>
      <div className="magnetic-content">{children}</div>
    </div>
  );
};
