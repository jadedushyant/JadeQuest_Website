import type { Metadata } from "next";
import { Counter, RevealFade } from "@/components/motion";
import { ApplicationForm } from "@/components/pages/ApplicationForm";
import { PageHero } from "@/components/pages/PageHero";
import { Container, Eyebrow, Section } from "@/components/ui";
import { company } from "@/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Careers",
  description: "Join JadeQuest: remote-first engineering on blockchain, AI and enterprise software for global clients.",
  path: "/careers",
});

// From the current careers page. TODO(content): confirm before launch.
const figures = [
  { value: 70, suffix: "+", label: "Team members, remote" },
  { value: 4, label: "Continents" },
  { value: 4, pad: 2, label: "Countries" },
  { value: 69, suffix: "%", label: "Speak three languages" },
  { value: 40, suffix: "%", label: "Women on the team" },
  { value: 83, suffix: "%", label: "Hold engineering degrees" },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="No committees, just code"
        intro="Remote-first engineering for governments, banks and ports around the world. Small teams, real responsibility and work you can point to."
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        aside={
          <a
            href="#apply"
            className="inline-flex h-13 items-center rounded-button bg-[var(--accent)] px-6 font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            Apply now
          </a>
        }
      />

      <Section theme="stone" aria-labelledby="team-title">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col gap-5">
            <Eyebrow>The team</Eyebrow>
            <h2 id="team-title" className="font-display text-h1 font-semibold">
              Who you&apos;d work with
            </h2>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
            {figures.map((f) => (
              <div key={f.label} className="flex flex-col gap-1 border-t border-[var(--line)] pt-4">
                <dd className="order-1 font-display text-h1 font-semibold">
                  <Counter to={f.value} suffix={f.suffix} pad={f.pad} />
                </dd>
                <dt className="order-2 text-sm text-[var(--fg-muted)]">{f.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section theme="dark" aria-labelledby="perks-title">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col gap-5">
            <Eyebrow>Benefits</Eyebrow>
            <h2 id="perks-title" className="font-display text-h1 font-semibold">
              What comes with the job
            </h2>
          </div>
          <RevealFade as="ul" stagger={0.04} className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {company.perks.map((perk, i) => (
              <li key={perk} className="group flex items-center justify-between gap-4 bg-forest p-6">
                <span>{perk}</span>
                <span className="font-mono text-xs text-subtle transition-colors group-hover:text-jade">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </RevealFade>
        </Container>
      </Section>

      <Section theme="light" id="apply" aria-labelledby="apply-title" className="scroll-mt-[var(--header-h)]">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="flex flex-col gap-5">
            <Eyebrow>Open roles</Eyebrow>
            <h2 id="apply-title" className="max-w-[14ch] font-display text-h1 font-semibold">
              Send us your application
            </h2>
            {/* TODO(content): list open roles here when there are some */}
            <p className="max-w-[40ch] text-[var(--fg-muted)]">
              No roles are listed right now, but we hire through the year. Tell us what you do best and we&apos;ll be in
              touch when there&apos;s a fit.
            </p>
            <a
              href={`mailto:${company.contact.careersEmail}`}
              className="self-start text-[var(--accent)] underline underline-offset-4"
            >
              {company.contact.careersEmail}
            </a>
          </div>
          <ApplicationForm />
        </Container>
      </Section>
    </>
  );
}
