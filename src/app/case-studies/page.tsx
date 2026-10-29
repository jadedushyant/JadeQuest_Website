import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageHero";
import { Container, Section } from "@/components/ui";
import { CaseStudiesList } from "./CaseStudiesList";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Case Studies & Enterprise Systems in Production",
  description:
    "Explore JadeQuest case studies in credential verification, port logistics, B2B escrow, sovereign land registries, and predictive agritech.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio & Proof"
        title="Enterprise systems in production, fully documented"
        intro="Explore verified case studies showcasing how JadeQuest delivers mission-critical software, consortium distributed ledgers, and applied AI."
        crumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
      />
      <Section theme="dark">
        <Container>
          <CaseStudiesList />
        </Container>
      </Section>
    </>
  );
}
