import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageHero";
import { Container, Section } from "@/components/ui";
import { ArticlesListing } from "./ArticlesListing";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Insights & Technical Perspectives",
  description:
    "Engineering insights, architectural blueprints, and deep dives from JadeQuest's distributed systems and applied AI teams.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights & Research"
        title="Technical blueprints from our engineering squads"
        intro="In-depth explorations of permissioned distributed ledger topologies, private language model deployments, zero-downtime microservices, and cryptographic proof verification."
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />
      <Section theme="dark">
        <Container>
          <ArticlesListing />
        </Container>
      </Section>
    </>
  );
}
