import { Counter, LineDraw, RevealText } from "@/components/motion";
import { OfficeMap } from "@/components/pages/OfficeMap";
import { Container, Eyebrow, Section } from "@/components/ui";
import { stats } from "@/content";

/** 5.5: numbers that count up, and where the team works from. */
export function KeyFigures() {
  return (
    <Section theme="stone" aria-labelledby="figures-title">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <Eyebrow index={6}>Key figures</Eyebrow>
            <RevealText as="h2" id="figures-title" className="max-w-[16ch] font-display text-h1 font-semibold">
              A remote-first team working across three time zones.
            </RevealText>
          </div>

          <dl className="grid grid-cols-2 gap-x-8 sm:grid-cols-3">
            {stats.map((s, i) => (
              <div key={s.label} className="flex flex-col gap-2 pt-5 pb-8">
                <LineDraw delay={i * 0.06} className="mb-3" />
                <dd className="order-1 font-display text-h1 font-semibold">
                  <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} pad={s.pad} />
                </dd>
                <dt className="order-2 text-sm text-[var(--fg-muted)]">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <OfficeMap
          className="self-center"
          caption="Offices in India, the UAE and Vietnam. Engineers work remotely from four countries."
        />
      </Container>
    </Section>
  );
}
