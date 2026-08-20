import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { EASING } from '../../animations/core/constants';
import { prefersReducedMotion } from '../../lib/device';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'jade' | 'quest' | 'jadequest' | 'complete'>('jade');
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.85,
          ease: EASING.power4InOut,
          onComplete: () => {
            setPhase('complete');
            onComplete();
          },
        });
      },
    });

    // Step 1: JADE (0 - 0.35s)
    tl.to(lineRef.current, {
      width: '40%',
      duration: 0.35,
      ease: 'power2.out',
    })
      .add(() => setPhase('quest'), '+=0.25')
      // Step 2: QUEST (0.35 - 0.7s)
      .to(lineRef.current, {
        width: '75%',
        duration: 0.3,
        ease: 'power2.out',
      })
      .add(() => setPhase('jadequest'), '+=0.2')
      // Step 3: JADEQUEST (0.7 - 1.1s)
      .to(lineRef.current, {
        width: '100%',
        duration: 0.35,
        ease: 'power3.inOut',
      })
      .to(textRef.current, {
        scale: 1.08,
        letterSpacing: '0.4em',
        duration: 0.3,
        ease: 'power2.out',
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (phase === 'complete') return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] bg-[#030405] flex flex-col items-center justify-center pointer-events-none select-none"
    >
      {/* Noise background */}
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Monogram pulse */}
        <div className="w-12 h-12 mb-8 relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-jade-500/20 animate-ping opacity-60" />
          <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
            <path
              d="M23 12V24C23 27.3 20.3 30 17 30C13.7 30 11 27.3 11 24H15C15 25.1 15.9 26 17 26C18.1 26 19 25.1 19 24V12H23Z"
              fill="#00F08B"
            />
          </svg>
        </div>

        {/* Morphing Wordmark */}
        <div
          ref={textRef}
          className="font-syne font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-[0.25em] transition-all duration-200"
        >
          {phase === 'jade' && <span className="text-jade-400">JADE</span>}
          {phase === 'quest' && <span className="text-white">QUEST</span>}
          {phase === 'jadequest' && (
            <span>
              <span className="text-jade-400">JADE</span>
              <span className="text-white">QUEST</span>
            </span>
          )}
        </div>

        {/* Laser Loading Bar */}
        <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full mt-8 overflow-hidden relative">
          <div
            ref={lineRef}
            className="h-full bg-gradient-to-r from-jade-500 to-white w-0 shadow-[0_0_12px_#00F08B]"
          />
        </div>

        <div className="mt-4 font-mono text-[10px] tracking-widest text-[#8B949E] uppercase">
          ENGINEERING THE IMPOSSIBLE
        </div>
      </div>
    </div>
  );
};
