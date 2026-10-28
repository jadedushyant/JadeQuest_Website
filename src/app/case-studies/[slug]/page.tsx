import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TransitionLink } from "@/components/layout";
import { ProductCard } from "@/components/pages/cards";
import { FlowDiagram } from "@/components/pages/FlowDiagram";
import { PageHero } from "@/components/pages/PageHero";
import { Container, Eyebrow, Section, Tag } from "@/components/ui";
import { caseStudies, getCaseStudy, getIndustry, getProduct } from "@/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, orgRef, pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const cs = getCaseStudy((await params).slug);
  if (!cs) return {};
  return pageMeta({ title: cs.title, description: cs.summary, path: `/case-studies/${cs.slug}` });
}

// TODO(content): add challenge / approach / outcome sections once the full
// write-ups are supplied. Only the published summary is shown for now.
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
            <dd className="font-medium">{cs.result}</dd>
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

      {lead && (
        <Section theme="stone" aria-labelledby="flow-title">
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

      {/* Next case study: a large panel that leads into the next write-up */}
      <Section theme="dark" spacing="none">
        <TransitionLink
          href={`/case-studies/${next.slug}`}
          data-cursor="view"
          data-cursor-label="Next"
          className="group block"
        >
          <Container className="flex flex-col gap-6 py-section">
            <Eyebrow>Next case study</Eyebrow>
            <span className="max-w-[20ch] font-display text-display font-semibold transition-transform duration-700 ease-[var(--ease-expo-out)] group-hover:translate-x-3">
              {next.title}
            </span>
            <span className="text-[var(--fg-muted)]">{next.sector}</span>
          </Container>
        </TransitionLink>
      </Section>
    </>
  );
}
