import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from '../../animations/core/gsap';
import { EASING } from '../../animations/core/constants';
import { Container } from '../ui/Container';

export const TypographicTransition: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const word1Ref = useRef<HTMLHeadingElement>(null);
  const word2Ref = useRef<HTMLHeadingElement>(null);
  const word3Ref = useRef<HTMLHeadingElement>(null);
  const word4Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !word1Ref.current || !word2Ref.current || !word3Ref.current || !word4Ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        start: 'top top',
        end: '+=250%',
        scrub: 0.8,
      },
    });

    // 1. BUILD. scales up and dissolves
    tl.to(word1Ref.current, {
      scale: 3.2,
      opacity: 0,
      filter: 'blur(16px)',
      ease: 'power2.inOut',
      duration: 1,
    })
      // 2. BETTER. enters, stays, then scales out
      .fromTo(
        word2Ref.current,
        { scale: 0.5, opacity: 0, filter: 'blur(12px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', ease: 'power3.out', duration: 1 },
        '-=0.4'
      )
      .to(word2Ref.current, {
        scale: 2.5,
        opacity: 0,
        filter: 'blur(14px)',
        ease: 'power2.in',
        duration: 0.8,
      })
      // 3. FASTER. enters, stays, then scales out
      .fromTo(
        word3Ref.current,
        { scale: 0.5, opacity: 0, filter: 'blur(12px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', ease: 'power3.out', duration: 1 },
        '-=0.3'
      )
      .to(word3Ref.current, {
        scale: 2.5,
        opacity: 0,
        filter: 'blur(14px)',
        ease: 'power2.in',
        duration: 0.8,
      })
      // 4. SMARTER. enters and holds with jade glow
      .fromTo(
        word4Ref.current,
        { scale: 0.5, opacity: 0, filter: 'blur(12px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', ease: 'power3.out', duration: 1 },
        '-=0.3'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-obsidian-950 text-white flex items-center justify-center overflow-hidden select-none border-t border-warm-border"
    >
      <Container size="lg" className="relative z-10 text-center">
        <div className="relative flex items-center justify-center h-72">
          {/* 1. BUILD. */}
          <h2
            ref={word1Ref}
            className="absolute font-syne font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tight text-warm-white uppercase will-change-transform"
          >
            BUILD.
          </h2>

          {/* 2. BETTER. */}
          <h2
            ref={word2Ref}
            className="absolute font-syne font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tight text-warm-white uppercase opacity-0 will-change-transform"
          >
            BETTER.
          </h2>

          {/* 3. FASTER. */}
          <h2
            ref={word3Ref}
            className="absolute font-syne font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tight text-warm-white uppercase opacity-0 will-change-transform"
          >
            FASTER.
          </h2>

          {/* 4. SMARTER. */}
          <h2
            ref={word4Ref}
            className="absolute font-syne font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tight text-gradient-jade uppercase opacity-0 will-change-transform"
          >
            SMARTER.
          </h2>
        </div>

        <p className="font-mono text-xs sm:text-sm text-warm-muted tracking-widest uppercase mt-12">
          ENGINEERING AT THE SPEED OF THOUGHT
        </p>
      </Container>
    </section>
  );
};
