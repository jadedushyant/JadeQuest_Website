import React, { useRef, useEffect } from 'react';
import { projectsData } from '../../data/projects';
import { Project } from '../../types/project';
import { Container } from '../ui/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { ProjectCard } from '../interaction/ProjectCard';
import { createHorizontalScroll } from '../../animations/scroll/horizontalScroll';

interface WorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectProject }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { destroy } = createHorizontalScroll(sectionRef.current, trackRef.current);
    return () => {
      destroy();
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#040506] text-white overflow-hidden"
    >
      <Container size="lg" className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionTitle
            number="02"
            eyebrow="02 — SELECTED WORK"
            title={
              <>
                BUILT FOR <br />
                <span className="text-gradient-jade">THE REAL WORLD.</span>
              </>
            }
            subtitle="Planetary-scale systems, AI architectures, spatial interfaces, and enterprise software engineered for uncompromising performance."
            className="mb-0"
          />

          <div className="hidden lg:flex items-center gap-3 font-mono text-xs text-warm-muted">
            <span className="w-2 h-2 rounded-full bg-jade-400 animate-pulse" />
            <span>SCROLL VERTICALLY TO EXPLORE HORIZONTALLY</span>
          </div>
        </div>
      </Container>

      {/* Project Carousel Track */}
      {/* On desktop: horizontal translate via GSAP pin. On mobile: flex wrap / vertical stack */}
      <div className="w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-12 w-full lg:w-max will-change-transform"
        >
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
            />
          ))}

          {/* End of Track "More Projects" Card */}
          <div className="flex-shrink-0 w-full lg:w-[420px] h-[350px] lg:h-[580px] rounded-2xl border border-dashed border-white/20 bg-obsidian-900/40 p-8 flex flex-col items-center justify-center text-center select-none">
            <span className="font-mono text-xs text-jade-400 uppercase tracking-widest mb-3">
              CONFIDENTIAL PORTFOLIO
            </span>
            <h4 className="text-2xl sm:text-3xl font-syne font-bold uppercase text-white mb-4">
              20+ ADDITIONAL ENTERPRISE DEPLOYMENTS
            </h4>
            <p className="text-xs sm:text-sm text-[#8B949E] max-w-xs font-light mb-6">
              Government infrastructure, quantitative algorithmic trading engines, and proprietary AI swarms under NDA.
            </p>
            <button
              onClick={() => onSelectProject(projectsData[0])}
              className="px-6 py-2.5 rounded-full border border-jade-500/40 bg-jade-500/10 text-xs font-mono text-jade-400 hover:bg-jade-500 hover:text-obsidian-950 transition-colors"
            >
              REQUEST BRIEFING
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
