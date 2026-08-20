import React, { useEffect } from 'react';
import { initSmoothScroll, destroySmoothScroll } from '../../animations/core/lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  useEffect(() => {
    const lenis = initSmoothScroll();

    return () => {
      destroySmoothScroll();
    };
  }, []);

  return <>{children}</>;
};
