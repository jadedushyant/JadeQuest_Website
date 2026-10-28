import type { Metadata } from "next";
import { ArrowIcon, Button, Card, Container, Divider, Eyebrow, Heading, Section, Tag } from "@/components/ui";
import { caseStudies, industries, products, services, stats } from "@/content";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const palettes = [
  {
    name: "Dark (primary)",
    colors: [
      { name: "forest", value: "#101815", use: "Page background", className: "bg-forest" },
      { name: "surface", value: "#18211C", use: "Cards, panels", className: "bg-surface" },
      { name: "surface-raised", value: "#202C25", use: "Menus, featured cards", className: "bg-surface-raised" },
      { name: "line", value: "#344239", use: "Borders, dividers", className: "bg-line" },
      { name: "paper", value: "#F3F2EA", use: "Primary text", className: "bg-paper" },
      { name: "mist", value: "#B1BBB2", use: "Body copy", className: "bg-mist" },
      { name: "subtle", value: "#829187", use: "Labels, metadata", className: "bg-subtle" },
    ],
  },
  {
    name: "Accent",
    colors: [
      { name: "jade", value: "#19B58A", use: "Accent on dark", className: "bg-jade" },
      { name: "jade-deep", value: "#077052", use: "Accent on light", className: "bg-jade-deep" },
      { name: "jade-soft", value: "#B4E8D4", use: "Hover, selection", className: "bg-jade-soft" },
    ],
  },
  {
    name: "Light (editorial)",
    colors: [
      { name: "paper", value: "#F3F2EA", use: "Manifesto, about", className: "bg-paper" },
      { name: "stone", value: "#E9E8DE", use: "Alternating sections", className: "bg-stone" },
      { name: "white", value: "#FFFFFF", use: "Forms, cards on light", className: "bg-white" },
      { name: "ink", value: "#202822", use: "Text on light", className: "bg-ink" },
      { name: "ink-muted", value: "#59635D", use: "Supporting text", className: "bg-ink-muted" },
    ],
  },
];

const typeScale = [
  { token: "text-hero", note: "Hero only", className: "text-hero font-display font-bold", sample: "Built to be audited." },
  { token: "text-display", note: "A few section statements", className: "text-display font-display font-semibold", sample: "Software for institutions" },
  { token: "text-h1", note: "Page titles", className: "text-h1 font-display font-semibold", sample: "Enterprise blockchain" },
  { token: "text-h2", note: "Section headings", className: "text-h2 font-display font-semibold", sample: "Cloud architecture & DevOps" },
  { token: "text-h3", note: "Card titles", className: "text-h3 font-semibold tracking-tight", sample: "Custom software & modernization" },
  { token: "text-h4", note: "Small titles", className: "text-h4 font-medium", sample: "Milestone escrow for B2B trade" },
  { token: "text-lead", note: "Intro paragraphs", className: "text-lead text-[var(--fg-muted)]", sample: "We build production software for registries, courts, ports and banks." },
  { token: "body 17px / 1.6", note: "Paragraphs, 55–70ch", className: "max-w-[64ch] text-[var(--fg-muted)]", sample: "Land records move through seven approval stages before a mutation is final. Each stage is signed, timestamped and written to a permissioned ledger, so a sub-registrar can prove what happened and when." },
  { token: "font-mono", note: "Technical labels only", className: "font-mono text-xs text-[var(--fg-subtle)]", sample: "SHA-256 · 0x9f3c…e1a4 · verified in 1.84s" },
];

function Block({ index, title, children }: { index: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Eyebrow index={index}>{title}</Eyebrow>
        <Divider />
      </div>
      {children}
    </div>
  );
}

function ComponentSamples() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <Button icon={<ArrowIcon />}>Consult our engineers</Button>
          <Button variant="ghost">Explore products</Button>
        </div>
        <Button variant="link" href="/services" className="self-start">
          All services
        </Button>
        <div className="flex flex-wrap gap-2">
          <Tag>Hyperledger Fabric</Tag>
          <Tag>Kubernetes</Tag>
          <Tag tone="accent">Verified in 1.84s</Tag>
        </div>
      </div>
      <Card className="flex flex-col gap-4">
        <span className="text-sm text-[var(--fg-subtle)]">Land registry · Government</span>
        <Heading as="h3" size="h3">
          JadeLedger
        </Heading>
        <p className="text-[var(--fg-muted)]">
          Seven-stage mutation approval, deed indexing and sub-registrar sync on a tamper-evident ledger.
        </p>
        <div className="flex flex-wrap gap-2">
          <Tag>Hyperledger Fabric</Tag>
          <Tag>Raft</Tag>
          <Tag>GIS</Tag>
        </div>
      </Card>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <>
      <Section theme="dark" grain>
        <Container className="flex flex-col gap-24">
          <header className="flex flex-col gap-6">
            <Eyebrow>Design system</Eyebrow>
            <Heading as="h1" size="display">
              Jade Ledger
            </Heading>
            <p className="max-w-[58ch] text-lead text-[var(--fg-muted)]">
              Forest black and warm paper, with jade kept for the moments that matter: roughly 55% dark, 25% light,
              15% neutral detail and 5% accent.
            </p>
          </header>

          <Block index={1} title="Colors">
            <div className="flex flex-col gap-12">
              {palettes.map((p) => (
                <div key={p.name} className="flex flex-col gap-4">
                  <h3 className="text-sm font-medium">{p.name}</h3>
                  <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
                    {p.colors.map((c) => (
                      <li key={p.name + c.name} className="flex flex-col gap-3">
                        <span className={`aspect-[4/3] rounded-card border border-line ${c.className}`} />
                        <span className="text-sm leading-snug">
                          {c.name}
                          <br />
                          <span className="font-mono text-xs text-subtle">{c.value}</span>
                          <br />
                          <span className="text-xs text-subtle">{c.use}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>

          <Block index={2} title="Type scale">
            <ul className="flex flex-col gap-12">
              {typeScale.map((t) => (
                <li key={t.token} className="grid gap-3 md:grid-cols-[180px_1fr] md:gap-8">
                  <span className="font-mono text-xs text-subtle">
                    {t.token}
                    <br />
                    {t.note}
                  </span>
                  <span className={t.className}>{t.sample}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block index={3} title="Components on dark">
            <ComponentSamples />
          </Block>

          <Block index={4} title="Content layer">
            <dl className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {[
                ["Services", services.length],
                ["Products", products.length],
                ["Industries", industries.length],
                ["Case studies", caseStudies.length],
                ["Stats", stats.length],
              ].map(([label, count]) => (
                <Card key={label} className="flex flex-col gap-1 p-5 md:p-6">
                  <dt className="text-sm text-[var(--fg-subtle)]">{label}</dt>
                  <dd className="text-h1 font-display font-semibold">{count}</dd>
                </Card>
              ))}
            </dl>
          </Block>
        </Container>
      </Section>

      <Section theme="light">
        <Container className="flex flex-col gap-10">
          <Block index={5} title="Components on paper">
            <Heading size="h1" className="max-w-[18ch]">
              Software for institutions that can&apos;t afford to be wrong.
            </Heading>
            <ComponentSamples />
          </Block>
        </Container>
      </Section>

      <Section theme="stone" spacing="sm">
        <Container>
          <Block index={6} title="Stone section">
            <p className="max-w-[58ch] text-lead text-[var(--fg-muted)]">
              Used to alternate with paper on long pages, so light sections don&apos;t blur together.
            </p>
          </Block>
        </Container>
      </Section>
    </>
  );
}
