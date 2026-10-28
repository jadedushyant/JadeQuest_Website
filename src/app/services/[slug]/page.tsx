import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LineDraw, RevealFade } from "@/components/motion";
import { ProductCard, RowLink } from "@/components/pages/cards";
import { PageHero } from "@/components/pages/PageHero";
import { ProcessTimeline } from "@/components/pages/ProcessTimeline";
import { Button, Container, Eyebrow, Section, Tag } from "@/components/ui";
import { getProduct, getService, serviceDeliverables, services } from "@/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, orgRef, pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMeta({ title: service.title, description: service.featured?.description ?? service.summary, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: Params) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const deliverables = serviceDeliverables(service);
  const related = (service.products ?? []).map(getProduct).filter((p) => p !== undefined);
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          serviceType: service.title,
          description: service.featured?.description ?? service.summary,
          url: absoluteUrl(`/services/${service.slug}`),
          provider: orgRef,
          areaServed: ["IN", "AE", "VN", "Worldwide"],
        }}
      />
      <PageHero
        eyebrow="Service"
        title={service.featured?.headline ?? service.title}
        intro={service.featured?.description ?? service.summary}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.shortTitle }]}
        aside={
          <div className="flex flex-col gap-4">
            <span className="text-sm text-[var(--fg-subtle)]">Typical stack</span>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <Button href="/contact" className="mt-4 self-start">
              Talk to an engineer
            </Button>
          </div>
        }
      />

      <Section theme="light" aria-labelledby="deliver-title">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div className="flex flex-col gap-5 lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
            <Eyebrow>What we deliver</Eyebrow>
            <h2 id="deliver-title" className="max-w-[16ch] font-display text-h1 font-semibold">
              {service.title}
            </h2>
            <p className="max-w-[40ch] text-[var(--fg-muted)]">{service.summary}</p>
          </div>
          <ol className="flex flex-col">
            {deliverables.map((d, i) => (
              <li key={d}>
                <LineDraw />
                <RevealFade className="flex items-baseline gap-6 py-8">
                  <span className="font-mono text-xs text-[var(--fg-subtle)]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-h2 font-semibold">{d}</span>
                </RevealFade>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section theme="dark" aria-labelledby="built-title">
          <Container className="flex flex-col gap-12">
            <div className="flex flex-col gap-5">
              <Eyebrow>Built with this</Eyebrow>
              <h2 id="built-title" className="font-display text-h1 font-semibold">
                Our own platforms
              </h2>
            </div>
            <RevealFade stagger={0.08} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </RevealFade>
          </Container>
        </Section>
      )}

      <ProcessTimeline theme="stone" />

      <Section theme="dark" spacing="sm">
        <Container className="flex flex-col gap-8">
          <Eyebrow>Other services</Eyebrow>
          <ol>
            {others.map((s, i) => (
              <li key={s.slug}>
                <RowLink href={`/services/${s.slug}`} index={i} title={s.title} text={s.summary} />
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
