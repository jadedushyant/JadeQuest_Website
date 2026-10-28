import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TransitionLink } from "@/components/layout";
import { RevealFade } from "@/components/motion";
import { ProductCard, RowLink } from "@/components/pages/cards";
import { FlowDiagram } from "@/components/pages/FlowDiagram";
import { PageHero } from "@/components/pages/PageHero";
import { Button, Container, Eyebrow, Section, Tag } from "@/components/ui";
import { caseStudies, getIndustry, getProduct, products, solutions } from "@/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, orgRef, pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return pageMeta({ title: `${product.name}: ${product.category}`, description: product.description, path: `/products/${product.slug}` });
}

export default async function ProductPage({ params }: Params) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const sectors = product.industries.map(getIndustry).filter((i) => i !== undefined);
  const cases = caseStudies.filter((c) => c.products.includes(product.slug));
  const inSolutions = solutions.filter((s) => s.products.includes(product.slug));
  const others = products.filter((p) => p.slug !== product.slug && p.industries.some((i) => product.industries.includes(i)));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: product.name,
          applicationCategory: "BusinessApplication",
          applicationSubCategory: product.category,
          operatingSystem: "Web",
          description: product.description,
          url: absoluteUrl(`/products/${product.slug}`),
          publisher: orgRef,
        }}
      />
      <PageHero
        eyebrow={product.category}
        title={product.name}
        intro={product.description}
        crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: product.name }]}
        aside={
          <dl className="grid grid-cols-[6.5rem_1fr] gap-x-6 gap-y-4 text-sm">
            <dt className="text-[var(--fg-subtle)]">Stack</dt>
            <dd className="flex flex-wrap gap-2">
              {product.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </dd>
            <dt className="text-[var(--fg-subtle)]">Sectors</dt>
            <dd className="flex flex-wrap gap-x-3 gap-y-1">
              {sectors.map((s) => (
                <TransitionLink key={s.slug} href={`/industries/${s.slug}`} className="underline underline-offset-4 hover:text-[var(--accent)]">
                  {s.name}
                </TransitionLink>
              ))}
            </dd>
            <dd className="col-span-2 pt-4">
              <Button href="/contact">Request a demo</Button>
            </dd>
          </dl>
        }
      />

      <Section theme="stone" aria-labelledby="flow-title">
        <Container className="flex flex-col gap-14">
          <div className="flex flex-col gap-5">
            <Eyebrow>How it works</Eyebrow>
            <h2 id="flow-title" className="max-w-[20ch] font-display text-h1 font-semibold">
              {product.tagline}
            </h2>
          </div>
          <FlowDiagram steps={product.flow} />
        </Container>
      </Section>

      {(cases.length > 0 || inSolutions.length > 0) && (
        <Section theme="dark" spacing="sm">
          <Container className="flex flex-col gap-8">
            <Eyebrow>In practice</Eyebrow>
            <ol>
              {cases.map((c, i) => (
                <li key={c.slug}>
                  <RowLink href={`/case-studies/${c.slug}`} index={i} title={c.title} text={c.result} meta="Case study" />
                </li>
              ))}
              {inSolutions.map((s, i) => (
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

      {others.length > 0 && (
        <Section theme="light" aria-labelledby="related-title">
          <Container className="flex flex-col gap-10">
            <h2 id="related-title" className="font-display text-h2 font-semibold">
              Related platforms
            </h2>
            <RevealFade stagger={0.08} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {others.slice(0, 3).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </RevealFade>
          </Container>
        </Section>
      )}
    </>
  );
}
