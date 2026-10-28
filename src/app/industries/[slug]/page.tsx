import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LineDraw, RevealFade } from "@/components/motion";
import { ProductCard, RowLink } from "@/components/pages/cards";
import { PageHero } from "@/components/pages/PageHero";
import { Container, Eyebrow, Section } from "@/components/ui";
import { caseStudies, getIndustry, getProduct, industries, solutions } from "@/content";
import { pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const industry = getIndustry((await params).slug);
  if (!industry) return {};
  return pageMeta({ title: industry.name, description: industry.summary, path: `/industries/${industry.slug}` });
}

export default async function IndustryPage({ params }: Params) {
  const industry = getIndustry((await params).slug);
  if (!industry) notFound();

  const platforms = industry.products.map(getProduct).filter((p) => p !== undefined);
  const cases = caseStudies.filter((c) => c.industries.includes(industry.slug));
  const related = solutions.filter((s) => s.industries.includes(industry.slug));

  return (
    <>
      <PageHero
        eyebrow="Industry"
        title={industry.name}
        intro={industry.summary}
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: industry.name }]}
      />

      <Section theme="light" aria-labelledby="focus-title">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div className="flex flex-col gap-5">
            <Eyebrow>Where we focus</Eyebrow>
            <h2 id="focus-title" className="max-w-[14ch] font-display text-h1 font-semibold">
              What we build for this sector
            </h2>
          </div>
          <ol>
            {industry.highlights.map((h, i) => (
              <li key={h}>
                <LineDraw />
                <RevealFade className="flex items-baseline gap-6 py-7">
                  <span className="font-mono text-xs text-[var(--fg-subtle)]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-h2 font-semibold">{h}</span>
                </RevealFade>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {platforms.length > 0 && (
        <Section theme="dark" aria-labelledby="platforms-title">
          <Container className="flex flex-col gap-10">
            <h2 id="platforms-title" className="font-display text-h2 font-semibold">
              Platforms in use
            </h2>
            <RevealFade stagger={0.08} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {platforms.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </RevealFade>
          </Container>
        </Section>
      )}

      {(cases.length > 0 || related.length > 0) && (
        <Section theme="stone" spacing="sm">
          <Container className="flex flex-col gap-8">
            <Eyebrow>Further reading</Eyebrow>
            <ol>
              {cases.map((c, i) => (
                <li key={c.slug}>
                  <RowLink href={`/case-studies/${c.slug}`} index={i} title={c.title} text={c.result} meta="Case study" />
                </li>
              ))}
              {related.map((s, i) => (
                <li key={s.slug}>
                  <RowLink
                    href={`/solutions/${s.slug}`}
                    index={cases.length + i}
                    title={s.title}
                    text={s.summary}
                    meta="Solution"
                  />
                </li>
              ))}
            </ol>
          </Container>
        </Section>
      )}
    </>
  );
}
