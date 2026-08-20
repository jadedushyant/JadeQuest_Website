import React from 'react';
import { Container } from '../ui/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { TechnologyNetwork } from '../interaction/TechnologyNetwork';

export const TechnologySection: React.FC = () => {
  return (
    <section
      id="technology"
      className="relative py-28 sm:py-36 bg-obsidian-950 text-white overflow-hidden border-t border-white/5"
    >
      <Container size="lg">
        <SectionTitle
          number="03"
          eyebrow="03 — TECHNOLOGY"
          title={
            <>
              THE TOOLS <br />
              <span className="text-gradient-jade">BEHIND THE QUEST.</span>
            </>
          }
          subtitle="An interconnected engineering ecosystem of modern frameworks, distributed databases, autonomous AI pipelines, and resilient cloud infrastructure."
        />

        {/* Living Digital Network Visualization */}
        <TechnologyNetwork />
      </Container>
    </section>
  );
};
