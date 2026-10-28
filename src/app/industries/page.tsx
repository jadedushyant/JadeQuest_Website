import type { Metadata } from "next";
import { RowLink } from "@/components/pages/cards";
import { PageHero } from "@/components/pages/PageHero";
import { Container, Section } from "@/components/ui";
import { getProduct, industries } from "@/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Industries",
  description: "Healthcare, banking, education, logistics, manufacturing, real estate and government: where JadeQuest builds verifiable systems.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Sectors where records have to hold up"
        intro="Regulated work with approvals, audits and paperwork that crosses organisations. That's where a shared, verifiable record saves the most time."
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />
      <Section theme="dark" spacing="sm">
        <Container>
          <ol>
            {industries.map((ind, i) => (
              <li key={ind.slug}>
                <RowLink
                  href={`/industries/${ind.slug}`}
                  index={i}
                  title={ind.name}
                  text={ind.summary}
                  meta={ind.products
                    .map((p) => getProduct(p)?.name)
                    .filter(Boolean)
                    .join(" · ")}
                />
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
