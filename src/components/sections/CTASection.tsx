import React, { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, MessageSquare, Sparkles } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { CTAConvergenceSystem } from '../../animations/transitions/ctaConvergence';
import { ScrollTrigger } from '../../animations/core/gsap';

interface CTASectionProps {
  onOpenInquiry: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenInquiry }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const systemRef = useRef<CTAConvergenceSystem | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return;

    const system = new CTAConvergenceSystem(canvasRef.current);
    systemRef.current = system;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        system.setConvergence(self.progress);
      },
    });

    return () => {
      st.kill();
      system.destroy();
      systemRef.current = null;
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-36 sm:py-56 bg-obsidian-950 text-white overflow-hidden text-center select-none border-t border-warm-border"
    >
      {/* Particle Convergence Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 mb-10">
          <span className="eyebrow-tag px-3.5 py-1.5 rounded-full border border-jade-500/25 bg-jade-500/10 backdrop-blur-md text-jade-400">
            <Sparkles className="w-3.5 h-3.5 text-jade-400" />
            05 — START THE QUEST
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-syne font-black uppercase tracking-tight text-warm-white leading-[0.92] max-w-5xl mx-auto mb-8">
          HAVE AN <br />
          IMPOSSIBLE <br />
          <span className="text-gradient-jade">IDEA?</span>
        </h2>

        {/* Secondary Statement */}
        <p className="text-3xl sm:text-5xl md:text-6xl font-syne font-bold uppercase text-warm-white mb-14 tracking-tight">
          LET'S BUILD IT.
        </p>

        {/* Action Button */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Button
            variant="primary"
            size="lg"
            isMagnetic
            onClick={onOpenInquiry}
            icon={<ArrowUpRight className="w-4 h-4" />}
            cursorLabel="OPEN"
          >
            START A PROJECT →
          </Button>

          <Button
            variant="outline"
            size="lg"
            isMagnetic
            href="mailto:hello@jadequest.io"
            cursorLabel="TALK"
          >
            LET'S TALK.
          </Button>
        </div>
      </Container>
    </section>
  );
};
