import { Marquee } from "@/components/motion";
import { Container, Eyebrow, Section } from "@/components/ui";
import { technologies } from "@/content";

const half = Math.ceil(technologies.length / 2);

/**
 * 5.8: the tools we use in production, in two strips running opposite ways.
 * TODO(content): add a partner/client logo strip once logos and permission are confirmed.
 */
export function TechMarquee() {
  return (
    <Section theme="dark" spacing="sm" aria-labelledby="tech-title" className="overflow-hidden">
      <Container className="mb-12">
        <Eyebrow index={9} id="tech-title">
          What we build with
        </Eyebrow>
      </Container>
      <div className="flex flex-col gap-2">
        <Marquee label="Technologies, part one" duration={55}>
          {technologies.slice(0, half).map((t) => (
            <span key={t} className="flex items-center font-display text-h1 font-semibold whitespace-nowrap">
              <span className="px-8">{t}</span>
              <span aria-hidden className="text-jade">
                ·
              </span>
            </span>
          ))}
        </Marquee>
        <Marquee label="Technologies, part two" duration={60} direction="right">
          {technologies.slice(half).map((t) => (
            <span
              key={t}
              className="flex items-center font-display text-h1 font-semibold whitespace-nowrap text-subtle"
            >
              <span className="px-8">{t}</span>
              <span aria-hidden>·</span>
            </span>
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
