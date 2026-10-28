import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageHero";
import { ProductGrid } from "@/components/pages/ProductGrid";
import { Container, Section } from "@/components/ui";
import { products } from "@/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Products",
  description: `${products.length} platforms built by JadeQuest: credential verification, land registries, B2B marketplaces, port logistics, carbon accounting and more.`,
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={`${products.length} platforms, built in-house`}
        intro="Each one started as a client problem: certificates that couldn't be checked, land records that went missing, ports where trucks waited for paperwork. Filter by the sector you work in."
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />
      <Section theme="light">
        <Container>
          <ProductGrid />
        </Container>
      </Section>
    </>
  );
}
