import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from '../../animations/core/gsap';
import { Container } from '../ui/Container';
import { EASING } from '../../animations/core/constants';
import { Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const phrase1Ref = useRef<HTMLDivElement>(null);
  const phrase2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !phrase1Ref.current || !phrase2Ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: 1,
      },
    });

    tl.to(phrase1Ref.current, {
      y: -50,
      opacity: 0.4,
      ease: EASING.power2Out,
    }).fromTo(
      phrase2Ref.current,
      { y: 60, opacity: 0.2 },
      { y: 0, opacity: 1, ease: EASING.power2Out },
      '<'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-36 sm:py-56 bg-obsidian-950 text-white overflow-hidden select-none border-t border-warm-border"
    >
      <Container size="lg" className="text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-12">
          <span className="eyebrow-tag px-3 py-1 rounded-full border border-jade-500/25 bg-jade-500/10">
            <Sparkles className="w-3.5 h-3.5 text-jade-400" />
            ABOUT JADEQUEST
          </span>
        </div>

        {/* Phrase 1: WE DON'T JUST WRITE CODE. */}
        <div ref={phrase1Ref} className="mb-2 sm:mb-4 transition-transform">
          <h3 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-syne font-black uppercase text-warm-muted tracking-tight leading-[0.92]">
            WE DON'T <br />
            JUST WRITE <br />
            CODE.
          </h3>
        </div>

        {/* Phrase 2: WE ENGINEER POSSIBILITIES. */}
        <div ref={phrase2Ref} className="mt-8 sm:mt-12">
          <h2 className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-syne font-black uppercase text-warm-white tracking-tight leading-[0.9]">
            WE ENGINEER <br />
            <span className="text-gradient-jade">POSSIBILITIES.</span>
          </h2>
        </div>

        <p className="mt-16 text-lg sm:text-2xl text-warm-muted max-w-2xl mx-auto font-light leading-relaxed">
          Founded on the conviction that software should be beautiful, unyielding, and mathematically rigorous. We partner with ambitious businesses to build technology that defines what's next.
        </p>
      </Container>
    </section>
  );
};
