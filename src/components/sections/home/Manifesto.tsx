"use client";

import { useRef } from "react";
import { Button, Container, Eyebrow, Section } from "@/components/ui";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/cn";

const TEXT =
  "We build production software for institutions that can't afford to be wrong. Land registries, courts, ports and banks run on what we ship, and every record in it can be checked by someone who doesn't have to trust us.";

/** Words that stay in the accent color once lit */
const KEY = new Set(["wrong.", "checked", "trust"]);

/** 5.1: the statement lights up word by word as it scrolls through the viewport. */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-statement]", start: "top 78%", end: "bottom 45%", scrub: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Section ref={ref} theme="light" aria-labelledby="manifesto-label">
      <Container className="grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
        <div className="flex flex-col gap-3">
          <Eyebrow index={2} id="manifesto-label">
            What we do
          </Eyebrow>
          <p className="text-sm text-[var(--fg-muted)]">India · UAE · Vietnam</p>
        </div>
        <div className="flex flex-col items-start gap-10">
          <p data-statement className="max-w-[26ch] font-display text-h1 font-semibold">
            {TEXT.split(" ").map((word, i) => (
              <span key={i} data-word className={cn(KEY.has(word) && "text-[var(--accent)]")}>
                {word}{" "}
              </span>
            ))}
          </p>
          <Button href="/about" variant="link">
            More about us
          </Button>
        </div>
      </Container>
    </Section>
  );
}
