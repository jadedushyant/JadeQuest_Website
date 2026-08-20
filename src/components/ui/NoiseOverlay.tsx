import React from 'react';

export const NoiseOverlay: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[99990] bg-noise opacity-30 select-none"
      aria-hidden="true"
    />
  );
};
