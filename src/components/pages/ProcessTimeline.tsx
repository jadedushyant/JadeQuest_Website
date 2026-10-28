"use client";

import { useRef } from "react";
import { Container, Eyebrow, Section } from "@/components/ui";
import { engagementSteps } from "@/content";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

/** How an engagement runs. A line fills with scroll and each step lights up as it's reached. */
export function ProcessTimeline({ theme = "light" }: { theme?: "light" | "stone" | "dark" }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const list = "[data-steps]";
      gsap.fromTo(
        "[data-fill]",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 60%", end: "bottom 60%", scrub: true } },
      );
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
        gsap.from(step.querySelector("[data-step-body]"), {
          x: 32,
          autoAlpha: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: { trigger: step, start: "top 75%", once: true },
        });
        // Dot fills once the line reaches it.
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          toggleClass: { targets: step.querySelector("[data-dot]")!, className: "is-reached" },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Section ref={ref} theme={theme} aria-labelledby="process-title" className="overflow-x-clip">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
        <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
          <Eyebrow>How we work</Eyebrow>
          <h2 id="process-title" className="max-w-[14ch] font-display text-h1 font-semibold">
            How an engagement usually runs
          </h2>
          <p className="max-w-[40ch] text-[var(--fg-muted)]">
            Every project is different. This is the shape most of them take, from first workshop to running system.
          </p>
        </div>

        <ol data-steps className="relative flex flex-col gap-14 pl-10">
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-[var(--line)]">
            <span data-fill className="block h-full w-full origin-top bg-[var(--accent)]" />
          </span>
          {engagementSteps.map((step, i) => (
            <li key={step.title} data-step className="relative">
              <span
                data-dot
                aria-hidden
                className="absolute top-1.5 -left-10 size-[15px] rounded-full border border-[var(--line)] bg-[var(--bg)] transition-colors duration-300 [&.is-reached]:border-[var(--accent)] [&.is-reached]:bg-[var(--accent)]"
              />
              <div data-step-body className="flex flex-col gap-2">
                <span className="font-mono text-xs text-[var(--fg-subtle)]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-h3 font-semibold">{step.title}</h3>
                <p className="max-w-[52ch] text-[var(--fg-muted)]">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
