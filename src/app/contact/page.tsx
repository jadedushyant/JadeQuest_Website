import type { Metadata } from "next";
import { OfficeClocks } from "@/components/layout/OfficeClocks";
import { OfficeMap } from "@/components/pages/OfficeMap";
import { PageHero } from "@/components/pages/PageHero";
import { InquiryForm } from "@/components/sections/home/InquiryForm";
import { Container, Eyebrow, Section } from "@/components/ui";
import { company } from "@/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: "Talk to JadeQuest's engineers about blockchain, AI, cloud or custom software. Email contact@jadequest.com.",
  path: "/contact",
});

const quick = company.socials.filter((s) => ["WhatsApp", "Telegram", "Discord"].includes(s.label));

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what needs to work"
        intro="A few sentences about the problem are enough to start the conversation."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section theme="dark" spacing="sm">
        <Container className="grid gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
          <InquiryForm />

          <aside className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <Eyebrow>Direct</Eyebrow>
              <a
                href={`mailto:${company.contact.email}`}
                className="text-h3 font-semibold tracking-tight underline decoration-line decoration-1 underline-offset-[6px] hover:decoration-jade"
              >
                {company.contact.email}
              </a>
              <a href={company.contact.phoneHref} className="text-[var(--fg-muted)] hover:text-[var(--fg)]">
                {company.contact.phone}
              </a>
            </div>

            <ul className="flex flex-wrap gap-2">
              {quick.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center rounded-button border border-line px-4 text-sm transition-colors hover:border-mist"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3">
              <Eyebrow>Offices · local time</Eyebrow>
              <OfficeClocks className="flex flex-col gap-2 text-lead" />
            </div>
          </aside>
        </Container>
      </Section>

      <Section theme="stone" spacing="sm">
        <Container>
          <OfficeMap caption="Offices in India, the UAE and Vietnam." />
        </Container>
      </Section>
    </>
  );
}
