import React from 'react';
import { GridBackground } from '../ui/GridBackground';

export const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* Hero Parallax Background Gradient Layer */}
      <div className="hero__bg absolute inset-0 bg-jade-mesh opacity-70" />
      
      {/* Subtle Grid System */}
      <div className="hero__grid absolute inset-0">
        <GridBackground fade={true} />
      </div>

      {/* Radiant Focal Core Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-jade-500/10 blur-[140px]" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] rounded-full bg-jade-900/10 blur-[100px]" />
    </div>
  );
};
