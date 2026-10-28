"use client";

import { useRef, useState } from "react";
import { TransitionLink } from "@/components/layout";
import { LineDraw, RevealText } from "@/components/motion";
import { Container, Eyebrow, Section } from "@/components/ui";
import { industries, products } from "@/content";
import { MEDIA } from "@/lib/motion/constants";
import { gsap, useGSAP } from "@/lib/motion/gsap";

const productName = (slug: string) => products.find((p) => p.slug === slug)?.name ?? slug;

/**
 * 5.6: a list of industries. On hover a jade fill rises through the row and a
 * small card with the details follows the cursor (mouse only).
 */
export function Industries() {
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MEDIA.finePointer} and (min-width: 1024px)`, () => {
        const card = cardRef.current!;
        const list = ref.current!.querySelector<HTMLElement>("[data-list]")!;
        const xTo = gsap.quickTo(card, "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(card, "y", { duration: 0.6, ease: "power3.out" });
        const rotTo = gsap.quickTo(card, "rotation", { duration: 0.8, ease: "power3.out" });
        let lastX = 0;

        const onMove = (e: PointerEvent) => {
          xTo(e.clientX + 24);
          yTo(e.clientY - 80);
          rotTo(gsap.utils.clamp(-6, 6, (e.clientX - lastX) * 0.4));
          lastX = e.clientX;
        };
        const onEnter = (e: PointerEvent) => {
          lastX = e.clientX;
          gsap.set(card, { x: e.clientX + 24, y: e.clientY - 80 });
          gsap.to(card, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3.out" });
        };
        const onLeave = () => gsap.to(card, { autoAlpha: 0, scale: 0.9, duration: 0.25 });

        gsap.set(card, { autoAlpha: 0, scale: 0.9 });
        list.addEventListener("pointermove", onMove);
        list.addEventListener("pointerenter", onEnter);
        list.addEventListener("pointerleave", onLeave);
        return () => {
          list.removeEventListener("pointermove", onMove);
          list.removeEventListener("pointerenter", onEnter);
          list.removeEventListener("pointerleave", onLeave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const current = industries[active];

  return (
    <Section ref={ref} theme="dark" aria-labelledby="industries-title">
      <Container className="flex flex-col gap-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-end">
          <div className="flex flex-col gap-6">
            <Eyebrow index={7}>Industries</Eyebrow>
            <RevealText as="h2" id="industries-title" className="max-w-[18ch] font-display text-h1 font-semibold">
              Sectors where records have to hold up
            </RevealText>
          </div>
          <p className="text-[var(--fg-muted)]">
            Regulated sectors with paperwork, approvals and audits. That&apos;s where verifiable systems pay off.
          </p>
        </div>

        <ol data-list className="flex flex-col">
          {industries.map((industry, i) => (
            <li key={industry.slug} className="relative">
              <LineDraw delay={i * 0.05} />
              <TransitionLink
                href={`/industries/${industry.slug}`}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 overflow-hidden py-6 md:grid-cols-[3.5rem_1fr_16rem_auto] md:py-8"
              >
                {/* Fill rises from the bottom on hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-jade transition-transform duration-500 ease-[var(--ease-expo-out)] group-hover:scale-y-100"
                />
                <span className="relative font-mono text-xs text-subtle transition-colors group-hover:text-forest">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative font-display text-h2 font-semibold transition-[color,translate] duration-500 group-hover:translate-x-3 group-hover:text-forest">
                  {industry.name}
                </span>
                <span className="relative hidden text-sm text-[var(--fg-muted)] transition-colors group-hover:text-forest md:block">
                  {industry.products.map(productName).join(" · ")}
                </span>
                <span
                  aria-hidden
                  className="relative pr-2 text-xl transition-[color,rotate] duration-500 group-hover:-rotate-45 group-hover:text-forest"
                >
                  →
                </span>
              </TransitionLink>
            </li>
          ))}
          <li aria-hidden>
            <LineDraw />
          </li>
        </ol>
      </Container>

      {/* Cursor-following detail card (desktop with a mouse) */}
      <div
        ref={cardRef}
        aria-hidden
        className="pointer-events-none invisible fixed top-0 left-0 z-header hidden w-72 flex-col gap-3 rounded-card border border-line bg-surface-raised p-5 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6)] lg:flex"
      >
        <span className="font-mono text-[11px] text-mist uppercase">{current.name}</span>
        <p className="text-sm text-paper">{current.summary}</p>
        <ul className="flex flex-col gap-1 text-sm text-mist">
          {current.highlights.map((h) => (
            <li key={h}>— {h}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
