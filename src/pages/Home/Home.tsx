import React, { useState } from 'react';
import { Hero } from '../../components/hero/Hero';
import { QuestSection } from '../../components/sections/QuestSection';
import { ServicesSection } from '../../components/sections/ServicesSection';
import { WorkSection } from '../../components/sections/WorkSection';
import { TechnologySection } from '../../components/sections/TechnologySection';
import { ProcessSection } from '../../components/sections/ProcessSection';
import { AboutSection } from '../../components/sections/AboutSection';
import { StatsSection } from '../../components/sections/StatsSection';
import { TypographicTransition } from '../../components/sections/TypographicTransition';
import { CTASection } from '../../components/sections/CTASection';
import { ProjectDetailModal } from '../../components/interaction/ProjectDetailModal';
import { InquiryModal } from '../../components/interaction/InquiryModal';
import { Project } from '../../types/project';

interface HomeProps {
  onOpenInquiry: () => void;
  isInquiryOpen: boolean;
  onCloseInquiry: () => void;
  preloaderFinished: boolean;
}

export const Home: React.FC<HomeProps> = ({
  onOpenInquiry,
  isInquiryOpen,
  onCloseInquiry,
  preloaderFinished,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="relative w-full bg-obsidian-950">
      {/* 1. Hero with Particle J */}
      <Hero onOpenInquiry={onOpenInquiry} preloaderFinished={preloaderFinished} />

      {/* 2. The Quest Narrative */}
      <QuestSection />

      {/* 3. Capabilities & Monolithic Services Rows */}
      <ServicesSection onOpenInquiry={onOpenInquiry} />

      {/* 4. Selected Work with Horizontal Parallax Scroller */}
      <WorkSection onSelectProject={(p) => setSelectedProject(p)} />

      {/* 5. Technology DNA Living Network Graph */}
      <TechnologySection />

      {/* 6. How We Think Methodology Spine */}
      <ProcessSection />

      {/* 7. Philosophy & Overlapping Kinetic Typography */}
      <AboutSection />

      {/* 8. Editorial Statistics Counter */}
      <StatsSection />

      {/* 9. Cinematic Typographic Transition (BUILD -> BETTER.) */}
      <TypographicTransition />

      {/* 10. Final CTA & Particle Convergence */}
      <CTASection onOpenInquiry={onOpenInquiry} />

      {/* Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={onCloseInquiry}
      />
    </main>
  );
};
