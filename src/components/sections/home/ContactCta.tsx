"use client";

import { useRef } from "react";
import { TransitionLink } from "@/components/layout";
import { Magnetic, RevealText } from "@/components/motion";
import { Container, Eyebrow, Section } from "@/components/ui";
import { company } from "@/content";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { LazyInquiryForm } from "./LazyInquiryForm";

const RING_TEXT = "Let's talk · Let's talk · Let's talk · ";

/** 5.9: closing call to action with a quick inquiry form. */
export function ContactCta() {
  const ref = useRef<HTMLElement>(null);
  const spinRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      spinRef.current = gsap.to("[data-ring-text]", {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 16,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: ref },
  );

  const speed = (timeScale: number) =>
    spinRef.current && gsap.to(spinRef.current, { timeScale, duration: 0.6, ease: "power2.out" });

  return (
    <Section ref={ref} theme="dark" aria-labelledby="cta-title" className="grain">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
        <div className="flex flex-col items-start gap-10">
          <Eyebrow index={10}>Contact</Eyebrow>
          <RevealText as="h2" id="cta-title" className="max-w-[12ch] font-display text-display font-semibold">
            Let&apos;s build something that has to work.
          </RevealText>

          <Magnetic strength={0.3}>
            <TransitionLink
              href="/contact"
              onPointerEnter={() => speed(4)}
              onPointerLeave={() => speed(1)}
              aria-label="Go to the contact page"
              className="relative flex size-44 items-center justify-center rounded-full bg-jade text-forest transition-colors hover:bg-jade-soft"
            >
              <svg viewBox="0 0 200 200" aria-hidden className="absolute inset-2">
                <defs>
                  <path id="cta-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <g data-ring-text>
                  <text className="fill-current font-mono text-[13px] tracking-[0.2em] uppercase">
                    <textPath href="#cta-ring">{RING_TEXT}</textPath>
                  </text>
                </g>
              </svg>
              <span data-magnetic-label className="text-2xl" aria-hidden>
                ↗
              </span>
            </TransitionLink>
          </Magnetic>

          <div className="flex flex-col gap-1 text-[var(--fg-muted)]">
            <a
              href={`mailto:${company.contact.email}`}
              className="text-h3 font-semibold tracking-tight text-paper underline decoration-line decoration-1 underline-offset-[6px] transition-colors hover:decoration-jade"
            >
              {company.contact.email}
            </a>
            <a href={company.contact.phoneHref}>{company.contact.phone}</a>
          </div>
        </div>

        <LazyInquiryForm />
      </Container>
    </Section>
  );
}
