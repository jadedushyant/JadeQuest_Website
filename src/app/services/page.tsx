import type { Metadata } from "next";
import { RowLink } from "@/components/pages/cards";
import { PageHero } from "@/components/pages/PageHero";
import { ProcessTimeline } from "@/components/pages/ProcessTimeline";
import { Container, Section } from "@/components/ui";
import { serviceDeliverables, services } from "@/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description: "Blockchain, AI and machine learning, cloud and DevOps, custom software, mobile, Web3 and product design from JadeQuest's engineering teams.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Engineering for systems that have to be right"
        intro="Ten practices, one team. Most projects combine several: a permissioned ledger with an AI document pipeline, or a legacy system moved to the cloud and rebuilt piece by piece."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <Section theme="dark" spacing="sm">
        <Container>
          <ol>
            {services.map((s, i) => (
              <li key={s.slug}>
                <RowLink
                  href={`/services/${s.slug}`}
                  index={i}
                  title={s.title}
                  text={s.summary}
                  meta={serviceDeliverables(s).slice(0, 3).join(" · ")}
                />
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <ProcessTimeline />
    </>
  );
}
