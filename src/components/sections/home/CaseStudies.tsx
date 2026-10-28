"use client";

import { useRef } from "react";
import { TransitionLink } from "@/components/layout";
import { RevealFade, RevealText } from "@/components/motion";
import { Button, Container, Eyebrow, Section, Tag } from "@/components/ui";
import { caseStudies } from "@/content";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/cn";

/**
 * 5.7: three published case studies, alternating sides. The result panel
 * opens with a clip-path and its contents drift slightly while scrolling.
 */
export function CaseStudies() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-case-panel]").forEach((panel) => {
        gsap.from(panel, {
          clipPath: "inset(18% 12% 18% 12% round 14px)",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: panel, start: "top 80%", once: true },
        });
        gsap.fromTo(
          panel.querySelector("[data-case-inner]"),
          { yPercent: 8 },
          {
            yPercent: -8,
            ease: "none",
            scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <Section ref={ref} theme="light" aria-labelledby="work-title">
      <Container className="flex flex-col gap-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="flex flex-col gap-6">
            <Eyebrow index={8}>Published work</Eyebrow>
            <RevealText as="h2" id="work-title" className="max-w-[16ch] font-display text-h1 font-semibold">
              Systems in production, written up
            </RevealText>
          </div>
          <Button href="/case-studies" variant="ghost">
            All case studies
          </Button>
        </div>

        <ol className="flex flex-col gap-24 md:gap-32">
          {caseStudies.map((cs, i) => (
            <li key={cs.slug}>
              <article
                className={cn(
                  "grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16",
                  i % 2 === 1 && "lg:[&>*:first-child]:order-2",
                )}
              >
                <TransitionLink
                  href={`/case-studies/${cs.slug}`}
                  data-cursor="view"
                  data-cursor-label="Read"
                  aria-label={`Read case study: ${cs.title}`}
                  className="block"
                >
                  <div
                    data-case-panel
                    data-theme="dark"
                    className="grain relative flex aspect-[5/4] overflow-hidden rounded-card p-8 md:p-12"
                  >
                    <div data-case-inner className="flex w-full flex-col justify-between gap-8">
                      <span className="font-mono text-xs text-subtle">
                        Case {String(i + 1).padStart(2, "0")} · {cs.sector}
                      </span>
                      <p className="max-w-[14ch] font-display text-h1 font-semibold text-paper">{cs.result}</p>
                      <ul className="flex flex-wrap gap-2">
                        {cs.tech.map((t) => (
                          <li key={t}>
                            <Tag>{t}</Tag>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TransitionLink>

                <RevealFade stagger={0.08} className="flex flex-col items-start gap-5">
                  <span className="text-sm text-[var(--fg-muted)]">{cs.sector}</span>
                  <h3 className="font-display text-h2 font-semibold">{cs.title}</h3>
                  <p className="max-w-[48ch] text-[var(--fg-muted)]">{cs.summary}</p>
                  <Button href={`/case-studies/${cs.slug}`} variant="link">
                    Read the case study
                  </Button>
                </RevealFade>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
