import type { Metadata } from "next";
import { Counter, LineDraw, RevealFade, RevealText } from "@/components/motion";
import { OfficeMap } from "@/components/pages/OfficeMap";
import { PageHero } from "@/components/pages/PageHero";
import { Button, Container, Eyebrow, Section } from "@/components/ui";
import { company, stats } from "@/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About",
  description: "JadeQuest Consulting builds enterprise software, permissioned blockchain and applied AI from India, the UAE and Vietnam.",
  path: "/about",
});

const values = [
  { title: "Integrity and transparency", text: "Clients see the same plan, risks and numbers we do." },
  { title: "Verifiable by design", text: "If a record matters, someone outside our team should be able to check it." },
  { title: "Precision over speed", text: "Architecture written down before code, and audits before launch." },
  { title: "No bureaucracy", text: "Small teams, short paths to a decision. No committees, just code." },
  { title: "Zero crypto exposure", text: "Ledgers for enterprises and governments, without speculative tokens." },
];

export default function AboutPage() {
  const { leader } = company;
  return (
    <>
      <PageHero
        eyebrow="About JadeQuest"
        title="We build systems people can check"
        intro={`${company.legalName} designs and runs software for governments, banks, ports and universities. ${company.description}`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <Section theme="light" aria-labelledby="practices-title">
        <Container className="flex flex-col gap-14">
          <div className="flex flex-col gap-5">
            <Eyebrow>Practices</Eyebrow>
            <RevealText as="h2" id="practices-title" className="max-w-[18ch] font-display text-h1 font-semibold">
              Four practices that share one standard
            </RevealText>
          </div>
          <RevealFade as="ol" stagger={0.08} className="grid gap-x-10 gap-y-12 md:grid-cols-2">
            {company.pillars.map((p, i) => (
              <li key={p.title} className="flex flex-col gap-3 border-t border-[var(--line)] pt-6">
                <span className="font-mono text-xs text-[var(--fg-subtle)]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-h3 font-semibold">{p.title}</h3>
                <p className="max-w-[44ch] text-[var(--fg-muted)]">{p.description}</p>
              </li>
            ))}
          </RevealFade>
        </Container>
      </Section>

      <Section theme="dark" aria-labelledby="leader-title">
        <Container className="grid gap-12 lg:grid-cols-[20rem_1fr] lg:gap-20">
          {/* TODO(content): replace with a real portrait of Rohan Bhatt */}
          <div
            aria-hidden
            className="grain flex aspect-[4/5] items-end rounded-card border border-line bg-surface p-6 font-display text-display font-semibold text-subtle"
          >
            RB
          </div>
          <div className="flex flex-col justify-end gap-6">
            <Eyebrow>Leadership</Eyebrow>
            <h2 id="leader-title" className="font-display text-h1 font-semibold">
              {leader.name}
            </h2>
            <p className="text-[var(--fg-subtle)]">{leader.role}</p>
            <p className="max-w-[56ch] text-lead text-[var(--fg-muted)]">{leader.bio}</p>
            <a
              href={`mailto:${leader.email}`}
              className="self-start text-jade underline decoration-1 underline-offset-[6px] hover:decoration-2"
            >
              {leader.email}
            </a>
          </div>
        </Container>
      </Section>

      <Section theme="stone" aria-labelledby="values-title">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div className="flex flex-col gap-5 lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
            <Eyebrow>Values</Eyebrow>
            <h2 id="values-title" className="max-w-[14ch] font-display text-h1 font-semibold">
              How we behave on a project
            </h2>
          </div>
          <ol>
            {values.map((v) => (
              <li key={v.title}>
                <LineDraw />
                <RevealFade className="grid gap-2 py-8 md:grid-cols-[1fr_1.2fr] md:gap-10">
                  <h3 className="font-display text-h3 font-semibold">{v.title}</h3>
                  <p className="text-[var(--fg-muted)]">{v.text}</p>
                </RevealFade>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section theme="light" aria-labelledby="presence-title">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <Eyebrow>Where we are</Eyebrow>
              <h2 id="presence-title" className="max-w-[16ch] font-display text-h1 font-semibold">
                Remote-first, with offices in three countries
              </h2>
            </div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
              {stats.slice(0, 3).map((s) => (
                <div key={s.label} className="flex flex-col gap-1 border-t border-[var(--line)] pt-4">
                  <dd className="order-1 font-display text-h1 font-semibold">
                    <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} pad={s.pad} />
                  </dd>
                  <dt className="order-2 text-sm text-[var(--fg-muted)]">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
          <OfficeMap className="self-center" />
        </Container>
      </Section>

      <Section theme="dark" aria-labelledby="csr-title">
        <Container className="flex flex-col gap-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="flex flex-col gap-5">
              <Eyebrow>Giving back</Eyebrow>
              <h2 id="csr-title" className="max-w-[20ch] font-display text-h1 font-semibold">
                Supporting underprivileged children in India
              </h2>
            </div>
            <Button href="/careers" variant="ghost">
              Work with us
            </Button>
          </div>
          <RevealFade as="ul" stagger={0.08} className="grid gap-4 md:grid-cols-3">
            {company.csr.map((area) => (
              <li key={area} className="rounded-card border border-line bg-surface p-7 font-display text-h3 font-semibold">
                {area}
              </li>
            ))}
          </RevealFade>
        </Container>
      </Section>
    </>
  );
}
