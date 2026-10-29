"use client";

import { Container, Eyebrow } from "@/components/ui";
import { StaggerReveal } from "@/components/animations/StaggerReveal";

const TESTIMONIALS = [
  {
    quote:
      "JadeQuest delivered a zero-exposure cryptographic credential verification framework that reduced diploma verification turnaround from 3 weeks to under 2 seconds across 40+ higher education institutions.",
    author: "Registry & Accreditation Director",
    organization: "Higher Education & Sovereign Credential Authority",
    impact: "< 2s Verification Speed",
    tags: ["Hyperledger Fabric", "Zero-PII Proofs"],
  },
  {
    quote:
      "The distributed telemetry and intermodal clearance platform engineered by JadeQuest eliminated inter-agency paper friction, cutting container dwell time significantly across our deep-sea terminal gates.",
    author: "Chief Operations Officer",
    organization: "International Maritime Terminal Logistics",
    impact: "38% Dwell Time Reduction",
    tags: ["Consortium DLT", "IoT Telematics"],
  },
  {
    quote:
      "Unlike many Web3 consultants who push volatile tokens, JadeQuest focused entirely on audited smart contracts, milestone escrow rails, and zero-compromise security for our cross-border wholesale marketplace.",
    author: "Head of Digital Infrastructure",
    organization: "Wholesale Trade & Commercial Banking Network",
    impact: "100% Escrow Settlement Audit Rate",
    tags: ["Escrow Protocols", "Next.js & Node.js"],
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-surface border-t border-line" aria-labelledby="testimonials-title">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-4 max-w-2xl">
          <Eyebrow>Client Impact</Eyebrow>
          <h2 id="testimonials-title" className="font-display text-h1 font-semibold text-paper">
            Trusted in mission-critical environments
          </h2>
          <p className="text-mist text-lead">
            Here is how government agencies, port authorities, and financial institutions measure the value of our engineering.
          </p>
        </div>

        <StaggerReveal className="grid gap-8 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="flex flex-col justify-between p-8 rounded-card border border-line bg-surface-raised relative overflow-hidden group hover:border-purple/40 transition-colors duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple/5 rounded-full blur-2xl group-hover:bg-purple/10 transition-colors pointer-events-none" />

              <div className="flex flex-col gap-6">
                <span className="font-mono text-xs text-purple font-semibold tracking-wider uppercase">
                  Verified Outcome: {t.impact}
                </span>
                <p className="text-paper/90 text-base leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-8 mt-6 border-t border-line/60 flex flex-col gap-2">
                <span className="font-display font-semibold text-sm text-paper">
                  {t.author}
                </span>
                <span className="text-xs text-subtle">
                  {t.organization}
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] text-cyan/90 bg-cyan/10 px-2 py-0.5 rounded border border-cyan/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}

