import type { Metadata } from "next";
import { RowLink } from "@/components/pages/cards";
import { PageHero } from "@/components/pages/PageHero";
import { Container, Section } from "@/components/ui";
import { getProduct, solutions } from "@/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Solutions",
  description: "Document verification, blockchain for education, e-governance and B2B marketplaces from JadeQuest.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Problems we have solved before"
        intro="Combinations of our platforms and services for problems we see again and again."
        crumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
      />
      <Section theme="dark" spacing="sm">
        <Container>
          <ol>
            {solutions.map((s, i) => (
              <li key={s.slug}>
                <RowLink
                  href={`/solutions/${s.slug}`}
                  index={i}
                  title={s.title}
                  text={s.summary}
                  meta={s.products
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
