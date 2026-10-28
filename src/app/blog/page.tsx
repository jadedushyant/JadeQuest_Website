import type { Metadata } from "next";
import { EmptyListing } from "@/components/pages/EmptyListing";
import { PageHero } from "@/components/pages/PageHero";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Blog",
  description: "Notes from JadeQuest's engineers on permissioned ledgers, applied AI and enterprise software.",
  path: "/blog",
});

// TODO(content): add MDX posts (src/content/posts) and list them here.
export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from the engineering team"
        size="h1"
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <EmptyListing
        message="We're moving our articles to the new site. In the meantime, the case studies cover what we've built."
        cta={{ label: "Read the case studies", href: "/case-studies" }}
      />
    </>
  );
}
