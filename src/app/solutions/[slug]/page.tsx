import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TransitionLink } from "@/components/layout";
import { RevealFade } from "@/components/motion";
import { ProductCard } from "@/components/pages/cards";
import { FlowDiagram } from "@/components/pages/FlowDiagram";
import { PageHero } from "@/components/pages/PageHero";
import { Container, Eyebrow, Section } from "@/components/ui";
import { getIndustry, getProduct, getSolution, solutions } from "@/content";
import { pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const solution = getSolution((await params).slug);
  if (!solution) return {};
  return pageMeta({ title: solution.title, description: solution.summary, path: `/solutions/${solution.slug}` });
}

export default async function SolutionPage({ params }: Params) {
  const solution = getSolution((await params).slug);
  if (!solution) notFound();

  const platforms = solution.products.map(getProduct).filter((p) => p !== undefined);
  const sectors = solution.industries.map(getIndustry).filter((i) => i !== undefined);
  const lead = platforms[0];

  return (
    <>
      <PageHero
        eyebrow="Solution"
        title={solution.title}
        intro={solution.summary}
        crumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: solution.title }]}
        aside={
          <div className="flex flex-col gap-3 text-sm">
            <span className="text-[var(--fg-subtle)]">Sectors</span>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {sectors.map((s) => (
                <li key={s.slug}>
                  <TransitionLink
                    href={`/industries/${s.slug}`}
                    className="underline underline-offset-4 hover:text-[var(--accent)]"
                  >
                    {s.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {lead && (
        <Section theme="stone" aria-labelledby="flow-title">
          <Container className="flex flex-col gap-14">
            <div className="flex flex-col gap-5">
              <Eyebrow>How it works with {lead.name}</Eyebrow>
              <h2 id="flow-title" className="max-w-[20ch] font-display text-h1 font-semibold">
                {lead.tagline}
              </h2>
            </div>
            <FlowDiagram steps={lead.flow} />
          </Container>
        </Section>
      )}

      <Section theme="dark" aria-labelledby="platforms-title">
        <Container className="flex flex-col gap-10">
          <h2 id="platforms-title" className="font-display text-h2 font-semibold">
            Platforms involved
          </h2>
          <RevealFade stagger={0.08} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {platforms.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </RevealFade>
        </Container>
      </Section>
    </>
  );
}
