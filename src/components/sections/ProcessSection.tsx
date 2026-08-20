import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from '../../animations/core/gsap';
import { Container } from '../ui/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { processData } from '../../data/process';
import { CheckCircle2, Cpu } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const spineLineRef = useRef<HTMLDivElement>(null);
  const bulletRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  useEffect(() => {
    if (!sectionRef.current || !spineLineRef.current || !bulletRef.current) return;

    // Track scroll through the process section to animate spine progress & active step
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      end: 'bottom 80%',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        if (spineLineRef.current) {
          spineLineRef.current.style.height = `${progress * 100}%`;
        }
        if (bulletRef.current) {
          bulletRef.current.style.top = `${progress * 100}%`;
        }
        const stepIdx = Math.min(
          processData.length - 1,
          Math.floor(progress * processData.length)
        );
        setActiveStepIndex(stepIdx);
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-32 sm:py-48 bg-obsidian-950 text-white overflow-hidden border-t border-warm-border"
    >
      <Container size="lg">
        <SectionTitle
          number="04"
          eyebrow="04 — HOW WE WORK"
          title="PROCESS"
          subtitle="A disciplined engineering methodology to deconstruct complex challenges into resilient, production-ready software."
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
          {/* Vertical Progress Spine (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 relative">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-warm-border">
              {/* Animated Progress Line */}
              <div
                ref={spineLineRef}
                className="w-full bg-jade-400 shadow-[0_0_10px_#78E08F] h-0 transition-all duration-75"
              />
              {/* Traveling Glowing Particle Bullet */}
              <div
                ref={bulletRef}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-jade-400 border-2 border-obsidian-950 shadow-[0_0_12px_#78E08F] top-0 transition-all duration-75 flex items-center justify-center"
              >
                <div className="w-1 h-1 rounded-full bg-warm-white" />
              </div>
            </div>
          </div>

          {/* Sequential Minimal Process Stages */}
          <div className="lg:col-span-11 space-y-16 sm:space-y-24">
            {processData.map((step, idx) => {
              const isActive = activeStepIndex === idx;

              return (
                <div
                  key={step.number}
                  className={`group relative transition-all duration-500 select-none ${
                    isActive ? 'opacity-100' : 'opacity-35 hover:opacity-70'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className={`font-mono text-xs font-bold transition-colors ${
                        isActive ? 'text-jade-400' : 'text-warm-muted'
                      }`}>
                        {step.number}
                      </span>
                      <h3 className={`text-4xl sm:text-6xl md:text-7xl font-syne font-black uppercase tracking-tight transition-colors duration-300 ${
                        isActive ? 'text-warm-white' : 'text-warm-muted'
                      }`}>
                        {step.word}
                      </h3>
                    </div>

                    <span className="font-mono text-xs text-warm-muted uppercase tracking-widest flex items-center gap-2">
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-jade-400" />}
                      FOCUS: {step.focus}
                    </span>
                  </div>

                  <p className="text-base sm:text-lg text-warm-muted font-light max-w-3xl leading-relaxed mb-6">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {step.deliverables.map((del, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-3 py-1 rounded border border-warm-border bg-obsidian-900/60 text-xs font-mono text-warm-muted"
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
