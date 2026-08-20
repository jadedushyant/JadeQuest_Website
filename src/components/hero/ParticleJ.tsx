import React, { useEffect, useRef } from 'react';
import { ParticleJSystem } from '../../animations/hero/particleJ';

interface ParticleJProps {
  scrollProgress?: number;
  formProgress?: number;
  className?: string;
}

export const ParticleJ: React.FC<ParticleJProps> = ({
  scrollProgress = 0,
  formProgress = 1,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const systemRef = useRef<ParticleJSystem | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const system = new ParticleJSystem(canvasRef.current);
    systemRef.current = system;

    return () => {
      system.destroy();
      systemRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (systemRef.current) {
      systemRef.current.setScrollProgress(scrollProgress);
    }
  }, [scrollProgress]);

  useEffect(() => {
    if (systemRef.current) {
      systemRef.current.setFormProgress(formProgress);
    }
  }, [formProgress]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-auto ${className || ''}`}
      aria-label="Interactive JadeQuest Particle J Monogram"
    />
  );
};
