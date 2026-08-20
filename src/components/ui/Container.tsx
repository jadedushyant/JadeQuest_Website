import React from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'lg',
  ...props
}) => {
  const sizeClasses = {
    sm: 'max-w-4xl',
    md: 'max-w-6xl',
    lg: 'max-w-7xl',
    full: 'max-w-[100vw]',
  };

  return (
    <div
      className={cn(
        'w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
