import React, { useRef, useEffect } from 'react';
import { Container } from '../ui/Container';
import { statsData } from '../../data/stats';
import { createCounterAnimation } from '../../animations/scroll/counterAnimation';

export const StatsSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const countRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    statsData.forEach((stat, idx) => {
      const el = countRefs.current[idx];
      if (el && !stat.isInfinity) {
        createCounterAnimation(el, stat.value, { suffix: stat.suffix });
      }
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-28 sm:py-40 bg-obsidian-950 text-white border-y border-warm-border overflow-hidden select-none"
    >
      <Container size="lg">
        {/* Asymmetrical Editorial Metric Composition */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 items-start">
          {/* Col 1: 50+ PROJECTS */}
          <div className="md:col-span-4 flex flex-col">
            <div className="text-6xl sm:text-7xl lg:text-8xl font-syne font-black text-warm-white tracking-tight mb-2">
              <span
                ref={(el) => {
                  countRefs.current[0] = el;
                }}
              >
                0+
              </span>
            </div>
            <h3 className="font-mono text-xs text-jade-400 font-semibold tracking-widest uppercase">
              PROJECTS
            </h3>
            <p className="text-xs text-warm-muted mt-2 max-w-xs font-light">
              High-concurrency platforms and AI deployments shipped to global markets.
            </p>
          </div>

          {/* Col 2: 20+ EXPERTS (Offset down for asymmetry) */}
          <div className="md:col-span-3 md:mt-16 flex flex-col">
            <div className="text-6xl sm:text-7xl lg:text-8xl font-syne font-black text-warm-white tracking-tight mb-2">
              <span
                ref={(el) => {
                  countRefs.current[1] = el;
                }}
              >
                0+
              </span>
            </div>
            <h3 className="font-mono text-xs text-jade-400 font-semibold tracking-widest uppercase">
              EXPERTS
            </h3>
            <p className="text-xs text-warm-muted mt-2 max-w-xs font-light">
              Senior software architects, designers, and AI researchers.
            </p>
          </div>

          {/* Col 3: 10+ INDUSTRIES */}
          <div className="md:col-span-2 md:mt-6 flex flex-col">
            <div className="text-6xl sm:text-7xl lg:text-8xl font-syne font-black text-warm-white tracking-tight mb-2">
              <span
                ref={(el) => {
                  countRefs.current[2] = el;
                }}
              >
                0+
              </span>
            </div>
            <h3 className="font-mono text-xs text-jade-400 font-semibold tracking-widest uppercase">
              INDUSTRIES
            </h3>
            <p className="text-xs text-warm-muted mt-2 max-w-xs font-light">
              Fintech, AI, healthtech, and spatial computing.
            </p>
          </div>

          {/* Col 4: ∞ POSSIBILITIES (Offset further down) */}
          <div className="md:col-span-3 md:mt-24 flex flex-col">
            <div className="text-6xl sm:text-7xl lg:text-8xl font-sans font-light text-gradient-jade tracking-tight mb-2">
              ∞
            </div>
            <h3 className="font-mono text-xs text-jade-400 font-semibold tracking-widest uppercase">
              POSSIBILITIES
            </h3>
            <p className="text-xs text-warm-muted mt-2 max-w-xs font-light">
              Engineering what others consider mathematically impossible.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
