import type { Metadata } from "next";
import { EmptyListing } from "@/components/pages/EmptyListing";
import { PageHero } from "@/components/pages/PageHero";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Events",
  description: "Talks, workshops and conferences where you can meet the JadeQuest team.",
  path: "/events",
});

// TODO(content): list upcoming and past events here.
export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Where to meet us"
        size="h1"
        crumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />
      <EmptyListing
        message="There are no upcoming events listed right now. If you'd like us to speak or run a workshop, get in touch."
        cta={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
