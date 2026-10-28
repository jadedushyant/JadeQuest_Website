import type { Metadata } from "next";
import { TransitionLink } from "@/components/layout";
import { RevealFade } from "@/components/motion";
import { PageHero } from "@/components/pages/PageHero";
import { Container, Section, Tag } from "@/components/ui";
import { caseStudies } from "@/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Case studies",
  description: "Published JadeQuest work: credential verification, port clearance and B2B marketplace escrow.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Systems in production, written up"
        intro="What we built, for whom and what changed. More write-ups are published as clients approve them."
        crumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
      />
      <Section theme="light">
        <Container>
          <RevealFade as="ol" stagger={0.1} className="grid gap-6 lg:grid-cols-3">
            {caseStudies.map((cs, i) => (
              <li key={cs.slug}>
                <TransitionLink
                  href={`/case-studies/${cs.slug}`}
                  data-cursor="view"
                  data-cursor-label="Read"
                  className="group flex h-full flex-col gap-6"
                >
                  <div
                    data-theme="dark"
                    className="grain flex aspect-[4/5] flex-col justify-between rounded-card p-8 transition-transform duration-700 ease-[var(--ease-expo-out)] group-hover:-translate-y-1"
                  >
                    <span className="font-mono text-xs text-subtle">
                      Case {String(i + 1).padStart(2, "0")} · {cs.sector}
                    </span>
                    <p className="font-display text-h2 font-semibold text-paper">{cs.result}</p>
                    <span className="flex flex-wrap gap-2">
                      {cs.tech.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </span>
                  </div>
                  <span className="font-display text-h3 font-semibold">{cs.title}</span>
                  <span className="text-[var(--fg-muted)]">{cs.summary}</span>
                </TransitionLink>
              </li>
            ))}
          </RevealFade>
        </Container>
      </Section>
    </>
  );
}
