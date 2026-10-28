import type { Metadata } from "next";
import { Counter, LineDraw, Magnetic, Marquee, ParallaxImage, RevealFade, RevealText } from "@/components/motion";
import { ArrowIcon, Button, Card, Container, Eyebrow, Heading, Section, Tag } from "@/components/ui";
import { products, stats, technologies } from "@/content";

export const metadata: Metadata = {
  title: "Motion styleguide",
  robots: { index: false, follow: false },
};

function DemoHeader({ index, title, note }: { index: number; title: string; note: string }) {
  return (
    <div className="flex flex-col gap-4">
      <Eyebrow index={index}>{title}</Eyebrow>
      <LineDraw />
      <p className="max-w-[60ch] text-sm text-[var(--fg-subtle)]">{note}</p>
    </div>
  );
}

export default function MotionStyleguidePage() {
  return (
    <>
      <Section theme="dark" grain className="min-h-[90svh] content-end">
        <Container className="flex flex-col gap-8">
          <Eyebrow>Motion system</Eyebrow>
          <RevealText as="h1" split="words" immediate className="text-hero font-display font-bold max-w-[12ch]">
            Motion with a reason to move.
          </RevealText>
          <RevealFade delay={0.5} className="max-w-[58ch] text-lead text-[var(--fg-muted)]">
            Smooth scroll, masked text reveals, a quiet cursor and a few magnetic buttons. Scroll down to see each
            piece on its own. Turn on reduced motion in your OS and everything falls back to simple fades.
          </RevealFade>
        </Container>
      </Section>

      <Section theme="dark">
        <Container className="flex flex-col gap-28">
          <div className="flex flex-col gap-10">
            <DemoHeader
              index={1}
              title="Text reveal by line"
              note="<RevealText split=&quot;lines&quot;>. Each line rises out of a mask when it enters the viewport. Re-splits on resize."
            />
            <RevealText as="h2" className="text-display font-display font-semibold max-w-[20ch]">
              Land records move through seven signed stages before a mutation is final.
            </RevealText>
          </div>

          <div className="flex flex-col gap-10">
            <DemoHeader
              index={2}
              title="Fade with stagger"
              note="<RevealFade stagger={0.08}>. Direct children fade up one after another. Use for card rows and lists."
            />
            <RevealFade stagger={0.08} className="grid gap-4 md:grid-cols-3">
              {products.slice(0, 3).map((p) => (
                <Card key={p.slug} className="flex flex-col gap-3" data-cursor="view">
                  <span className="text-sm text-[var(--fg-subtle)]">{p.category}</span>
                  <Heading as="h3" size="h3">
                    {p.name}
                  </Heading>
                  <p className="text-[var(--fg-muted)]">{p.tagline}</p>
                </Card>
              ))}
            </RevealFade>
            <p className="text-sm text-[var(--fg-subtle)]">Hover a card: the cursor switches to its “View” state.</p>
          </div>

          <div className="flex flex-col gap-10">
            <DemoHeader
              index={3}
              title="Magnetic buttons"
              note="<Magnetic>. The button leans toward the pointer and its label leans a bit further. Mouse only."
            />
            <div className="flex flex-wrap items-center gap-6">
              <Magnetic>
                <Button size="lg" icon={<ArrowIcon />}>
                  Consult our engineers
                </Button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Button size="lg" variant="ghost">
                  Explore products
                </Button>
              </Magnetic>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <DemoHeader
              index={4}
              title="Counters"
              note="<Counter>. Counts up once in view. The final number is in the HTML, so it's correct without JavaScript."
            />
            <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-2 border-t border-[var(--line)] pt-4">
                  <dd className="order-first text-h1 font-display font-semibold">
                    <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} pad={s.pad} />
                  </dd>
                  <dt className="text-sm text-[var(--fg-subtle)]">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-10">
            <DemoHeader
              index={5}
              title="Parallax image"
              note="<ParallaxImage>. The image drifts inside a fixed frame and opens up on first view. Placeholder diagram until real photos arrive."
            />
            <ParallaxImage
              src="/placeholders/ledger-grid.svg"
              alt="Placeholder diagram of ledger blocks anchoring to a verified record"
              unoptimized
              frameClassName="aspect-[16/9] w-full"
              data-cursor="view"
            />
          </div>
        </Container>
      </Section>

      <Section theme="light" spacing="sm">
        <Container className="flex flex-col gap-10">
          <DemoHeader
            index={6}
            title="Marquee"
            note="<Marquee>. Loops forever, speeds up with scroll and reverses when you scroll up. Slows down on hover."
          />
        </Container>
        <div className="mt-10 flex flex-col gap-4">
          <Marquee label="Technologies we work with" duration={60}>
            {technologies.map((t) => (
              <span key={t} className="px-6 text-h2 font-display font-semibold whitespace-nowrap">
                {t}
                <span aria-hidden className="ml-12 text-[var(--accent)]">
                  /
                </span>
              </span>
            ))}
          </Marquee>
          <Marquee duration={45} direction="right">
            {technologies.map((t) => (
              <span key={t} className="px-2">
                <Tag>{t}</Tag>
              </span>
            ))}
          </Marquee>
        </div>
      </Section>

      <Section theme="stone">
        <Container className="flex flex-col gap-10">
          <DemoHeader
            index={7}
            title="Words, and lines on scroll"
            note="split=&quot;words&quot; for short statements; <LineDraw scrub> ties a line to scroll position."
          />
          <RevealText as="p" split="words" className="text-h1 font-display font-semibold max-w-[22ch]">
            Software for institutions that can&apos;t afford to be wrong.
          </RevealText>
          <LineDraw scrub className="h-0.5 bg-[var(--accent)]" />
        </Container>
      </Section>
    </>
  );
}
