import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TransitionLink } from "@/components/layout";
import { ProductCard } from "@/components/pages/cards";
import { FlowDiagram } from "@/components/pages/FlowDiagram";
import { PageHero } from "@/components/pages/PageHero";
import { Container, Eyebrow, Section, Tag, Button } from "@/components/ui";
import { Reveal } from "@/components/animations/Reveal";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { caseStudies, getCaseStudy, getIndustry, getProduct } from "@/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, orgRef, pageMeta } from "@/lib/seo";
import { CheckCircle2, AlertTriangle, Layers } from "lucide-react";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const cs = getCaseStudy((await params).slug);
  if (!cs) return {};
  return pageMeta({ title: cs.title, description: cs.summary, path: `/case-studies/${cs.slug}` });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const index = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const platforms = cs.products.map(getProduct).filter((p) => p !== undefined);
  const sectors = cs.industries.map(getIndustry).filter((i) => i !== undefined);
  const lead = platforms[0];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: cs.title,
          description: cs.summary,
          url: absoluteUrl(`/case-studies/${cs.slug}`),
          author: orgRef,
          publisher: orgRef,
          about: cs.tech,
        }}
      />
      <PageHero
        eyebrow={`Case study · ${cs.sector}`}
        title={cs.title}
        size="h1"
        intro={cs.summary}
        crumbs={[{ label: "Home", href: "/" }, { label: "Work", href: "/case-studies" }, { label: `Case ${index + 1}` }]}
        aside={
          <dl className="grid grid-cols-[6.5rem_1fr] gap-x-6 gap-y-4 text-sm">
            <dt className="text-[var(--fg-subtle)]">Result</dt>
            <dd className="font-medium text-cyan">{cs.result}</dd>
            <dt className="text-[var(--fg-subtle)]">Sectors</dt>
            <dd className="flex flex-wrap gap-x-3">
              {sectors.map((s) => (
                <TransitionLink
                  key={s.slug}
                  href={`/industries/${s.slug}`}
                  className="underline underline-offset-4 hover:text-[var(--accent)]"
                >
                  {s.name}
                </TransitionLink>
              ))}
            </dd>
            <dt className="text-[var(--fg-subtle)]">Stack</dt>
            <dd className="flex flex-wrap gap-2">
              {cs.tech.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </dd>
          </dl>
        }
      />

      {/* Challenge & Solution Section */}
      <Section theme="dark" aria-labelledby="challenge-solution-heading">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {cs.problem && (
            <Reveal className="flex flex-col gap-6 p-8 rounded-card border border-line bg-surface">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 id="challenge-solution-heading" className="font-display text-h3 font-semibold text-paper">
                  The Problem & Challenge
                </h2>
              </div>
              <p className="text-mist text-base leading-relaxed">
                {cs.problem}
              </p>
            </Reveal>
          )}

          {cs.solution && (
            <Reveal delay={0.1} className="flex flex-col gap-6 p-8 rounded-card border border-line bg-surface">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-cyan/10 border border-cyan/20 text-cyan">
                  <Layers className="w-5 h-5" />
                </div>
                <h2 className="font-display text-h3 font-semibold text-paper">
                  The Technical Solution
                </h2>
              </div>
              <p className="text-mist text-base leading-relaxed">
                {cs.solution}
              </p>
            </Reveal>
          )}
        </Container>
      </Section>

      {/* Implementation Architecture & Outcomes */}
      <Section theme="stone" aria-labelledby="implementation-heading">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          {cs.implementation && cs.implementation.length > 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Eyebrow>Architecture</Eyebrow>
                <h2 id="implementation-heading" className="font-display text-h2 font-semibold text-paper">
                  Engineering Implementation
                </h2>
              </div>
              <ul className="flex flex-col gap-4">
                {cs.implementation.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-4 p-5 rounded-lg border border-line bg-surface"
                  >
                    <span className="font-mono text-xs text-cyan font-bold px-2 py-1 rounded bg-cyan/10 shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-mist leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {cs.outcomes && cs.outcomes.length > 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Eyebrow>Impact & Metrics</Eyebrow>
                <h2 className="font-display text-h2 font-semibold text-paper">
                  Verified Production Outcomes
                </h2>
              </div>
              <StaggerReveal className="flex flex-col gap-4">
                {cs.outcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-5 rounded-lg border border-line bg-surface"
                  >
                    <CheckCircle2 className="w-5 h-5 text-purple shrink-0 mt-0.5" />
                    <span className="text-sm text-paper font-medium leading-relaxed">
                      {outcome}
                    </span>
                  </div>
                ))}
              </StaggerReveal>

              <div className="mt-4 p-6 rounded-card border border-cyan/30 bg-cyan/5 flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-cyan font-semibold">
                  Want similar results?
                </span>
                <p className="text-xs text-mist leading-relaxed">
                  Our senior engineering leads can evaluate your domain, data pipelines, and consensus requirements.
                </p>
                <Button href="/contact" size="md" className="self-start">
                  Consult With Our Architects
                </Button>
              </div>
            </div>
          )}
        </Container>
      </Section>

      {lead && (
        <Section theme="dark" aria-labelledby="flow-title">
          <Container className="flex flex-col gap-14">
            <div className="flex flex-col gap-5">
              <Eyebrow>Built on {lead.name}</Eyebrow>
              <h2 id="flow-title" className="max-w-[20ch] font-display text-h1 font-semibold">
                {lead.tagline}
              </h2>
            </div>
            <FlowDiagram steps={lead.flow} />
            <div className="max-w-md">
              <ProductCard product={lead} />
            </div>
          </Container>
        </Section>
      )}

      {/* Next case study */}
      <Section theme="stone" spacing="none">
        <TransitionLink
          href={`/case-studies/${next.slug}`}
          data-cursor="view"
          data-cursor-label="Next"
          className="group block"
        >
          <Container className="flex flex-col gap-6 py-section">
            <Eyebrow>Next case study</Eyebrow>
            <span className="max-w-[20ch] font-display text-display font-semibold transition-transform duration-700 ease-[var(--ease-expo-out)] group-hover:translate-x-3 text-paper">
              {next.title}
            </span>
            <span className="text-cyan font-mono text-sm">{next.sector} · {next.result}</span>
          </Container>
        </TransitionLink>
      </Section>
    </>
  );
}
