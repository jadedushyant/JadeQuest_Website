import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from '../../animations/core/gsap';
import { Container } from '../ui/Container';
import { GridBackground } from '../ui/GridBackground';
import { Sparkles, HelpCircle } from 'lucide-react';
import { EASING } from '../../animations/core/constants';

export const QuestSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const words = textRef.current.querySelectorAll('.quest-word');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'center center',
        scrub: 1,
      },
    });

    // Staggered parallax word velocity
    words.forEach((w, idx) => {
      const depth = (idx % 3) * 20 - 20;
      tl.fromTo(
        w,
        { y: 80 + depth, opacity: 0.15, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', ease: EASING.power2Out },
        idx * 0.08
      );
    });

    if (subtextRef.current) {
      tl.fromTo(
        subtextRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        '-=0.2'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="quest"
      ref={sectionRef}
      className="relative py-32 sm:py-48 bg-obsidian-950 overflow-hidden border-y border-white/5"
    >
      <GridBackground fade={true} />

      <Container size="lg" className="relative z-10 text-center select-none">
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="eyebrow-tag px-3 py-1 rounded-full border border-jade-500/25 bg-jade-500/10">
            01 — THE QUEST
          </span>
        </div>

        {/* Large Monumental Editorial Statement */}
        <h2
          ref={textRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-syne font-black uppercase text-warm-white tracking-tight leading-[0.98] max-w-5xl mx-auto mb-10"
        >
          <span className="quest-word inline-block mr-3 sm:mr-6">WE</span>
          <span className="quest-word inline-block mr-3 sm:mr-6 text-gradient-jade">TURN</span>
          <br className="hidden sm:inline" />
          <span className="quest-word inline-block mr-3 sm:mr-6">AMBITION</span>
          <br className="hidden sm:inline" />
          <span className="quest-word inline-block mr-3 sm:mr-6">INTO</span>
          <span className="quest-word inline-block text-jade-400">SOFTWARE.</span>
        </h2>

        {/* Supporting Copy */}
        <p
          ref={subtextRef}
          className="text-lg sm:text-2xl text-warm-muted font-light max-w-2xl mx-auto leading-relaxed"
        >
          From product strategy to engineering and scale, JadeQuest helps teams turn complex ideas into technology people actually use.
        </p>
      </Container>
    </section>
  );
};
