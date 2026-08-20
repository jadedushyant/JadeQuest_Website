import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, ChevronDown, Sparkles, Code2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from '../../animations/core/gsap';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { HeroBackground } from './HeroBackground';
import { ParticleJ } from './ParticleJ';
import { createHeroIntro } from '../../animations/hero/heroIntro';
import { createHeroParallax } from '../../animations/hero/heroParallax';
import { scrollToTarget } from '../../animations/core/lenis';

interface HeroProps {
  onOpenInquiry: () => void;
  preloaderFinished?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry, preloaderFinished = true }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [formProgress, setFormProgress] = useState<number>(0);

  useEffect(() => {
    if (!preloaderFinished || !containerRef.current) return;

    // Trigger GSAP intro timeline
    const introTimeline = createHeroIntro(containerRef.current);
    const cleanupParallax = createHeroParallax(containerRef.current);

    // Animate Particle J formation progress from 0 to 1
    const formObj = { progress: 0 };
    gsap.to(formObj, {
      progress: 1,
      duration: 1.8,
      ease: 'power3.out',
      delay: 0.3,
      onUpdate: () => setFormProgress(formObj.progress),
    });

    // ScrollTrigger for Hero transformation & particle breakup
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      introTimeline?.kill();
      cleanupParallax?.();
      st.kill();
    };
  }, [preloaderFinished]);

  return (
    <section
      ref={containerRef}
      className="hero relative min-h-screen w-full flex flex-col justify-between pt-28 sm:pt-36 pb-12 overflow-hidden bg-obsidian-950"
      id="hero"
    >
      <HeroBackground />

      {/* Main Hero Viewport Grid */}
      <Container size="lg" className="relative z-10 flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[60vh]">
          {/* Left Column: Typography & CTAs */}
          <div className="hero__content lg:col-span-7 flex flex-col items-start select-none">
            {/* Small JADEQUEST Label */}
            <div className="hero__eyebrow mb-6">
              <span className="eyebrow-tag px-3 py-1 rounded-full border border-jade-500/25 bg-jade-500/10 backdrop-blur-md text-jade-400">
                <Sparkles className="w-3.5 h-3.5 text-jade-400" />
                JADEQUEST
              </span>
            </div>

            {/* Monumental Headline */}
            <h1 className="hero__title font-syne font-black text-4xl sm:text-6xl md:text-7xl xl:text-8xl tracking-tight text-warm-white uppercase leading-[0.92] mb-8">
              <span className="text-mask-wrapper">
                <span className="hero__title-line text-mask-inner">WE ENGINEER</span>
              </span>
              <span className="text-mask-wrapper">
                <span className="hero__title-line text-mask-inner text-gradient-jade">
                  WHAT'S NEXT.
                </span>
              </span>
            </h1>

            {/* Supporting Subhead */}
            <p className="hero__description text-base sm:text-lg md:text-xl text-warm-muted font-light max-w-xl leading-relaxed mb-10">
              We design and engineer digital products, intelligent platforms and scalable software for ambitious businesses.
            </p>

            {/* Action Buttons */}
            <div className="hero__actions flex flex-wrap items-center gap-4">
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
                onClick={() => scrollToTarget('#work', { offset: -70 })}
                icon={<Code2 className="w-4 h-4" />}
                cursorLabel="EXPLORE"
              >
                EXPLORE OUR WORK
              </Button>
            </div>
          </div>

          {/* Right Column: "Digital J" Interactive Particle Engine */}
          <div className="hero__visual lg:col-span-5 h-[340px] sm:h-[440px] lg:h-[580px] relative flex items-center justify-center">
            <ParticleJ
              scrollProgress={scrollProgress}
              formProgress={formProgress}
              className="absolute inset-0"
            />
          </div>
        </div>
      </Container>

      {/* Bottom Telemetry & Scroll Indicator */}
      <Container size="lg" className="relative z-10 pt-8 border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#8B949E]">
          <div className="hero__meta flex items-center gap-6">
            <span>CORE: <span className="text-jade-400">JADE 2.5 ACTIVE</span></span>
            <span className="hidden sm:inline-block">•</span>
            <span className="hidden sm:inline-block">SPECIALTY: <span className="text-white">QUANTUM-GRADE WEB</span></span>
          </div>

          <div
            className="hero__scroll-indicator flex items-center gap-2 cursor-pointer text-[#8B949E] hover:text-white transition-colors"
            onClick={() => scrollToTarget('#quest', { offset: -60 })}
            data-cursor-label="SCROLL"
          >
            <span>SCROLL TO DISCOVER</span>
            <ChevronDown className="w-4 h-4 text-jade-400 animate-bounce" />
          </div>
        </div>
      </Container>
    </section>
  );
};
