import React, { useEffect } from 'react';
import '../../animations/core/gsap';

interface AnimationProviderProps {
  children: React.ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  useEffect(() => {
    // Initial GSAP global setup
    document.documentElement.classList.add('js-ready');
  }, []);

  return <>{children}</>;
};
