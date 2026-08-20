import React, { useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { createMagneticButton } from '../../animations/interaction/magnetic';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isMagnetic?: boolean;
  cursorLabel?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isMagnetic = false,
  cursorLabel,
  icon,
  iconPosition = 'right',
  href,
  target,
  rel,
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!isMagnetic || !buttonRef.current) return;
    const cleanup = createMagneticButton(buttonRef.current as HTMLElement, 0.35);
    return () => {
      cleanup?.();
    };
  }, [isMagnetic]);

  const baseStyles =
    'group relative inline-flex items-center justify-center font-mono text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 select-none overflow-hidden';

  const sizeStyles = {
    sm: 'px-4 py-2 text-[11px] gap-2 rounded-full',
    md: 'px-6 py-3 text-xs gap-2.5 rounded-full',
    lg: 'px-8 py-4 text-sm gap-3 rounded-full',
  };

  const variantStyles = {
    primary:
      'bg-jade-500 text-obsidian-950 hover:bg-white hover:text-obsidian-950 shadow-[0_0_20px_rgba(0,240,139,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]',
    secondary:
      'bg-obsidian-800 text-white border border-white/10 hover:border-jade-500/50 hover:bg-jade-500/10 hover:text-jade-400',
    outline:
      'bg-transparent text-white border border-white/20 hover:border-jade-400 hover:text-jade-400 shadow-[0_0_15px_rgba(0,240,139,0.05)] hover:shadow-[0_0_20px_rgba(0,240,139,0.2)]',
    ghost:
      'bg-transparent text-[#8B949E] hover:text-white hover:bg-white/5',
  };

  const content = (
    <span className="magnetic-content relative z-10 flex items-center gap-2">
      {icon && iconPosition === 'left' && <span className="transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </span>
  );

  const combinedClasses = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if (href) {
    return (
      <a
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={combinedClasses}
        data-cursor-label={cursorLabel || 'EXPLORE'}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.Ref<HTMLButtonElement>}
      className={combinedClasses}
      data-cursor-label={cursorLabel || 'EXPLORE'}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
};
