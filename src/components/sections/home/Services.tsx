"use client";

import { useRef } from "react";
import { TransitionLink } from "@/components/layout";
import { RevealText } from "@/components/motion";
import { Button, Container, Eyebrow, Section, Tag } from "@/components/ui";
import { featuredServices, services } from "@/content";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { gsap, useGSAP } from "@/lib/motion/gsap";

/**
 * 5.3: featured services as cards that stack. Each card sticks a little lower
 * than the one before; as the next one slides over, the previous recedes.
 */
export function Services() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]");

      cards.forEach((card, i) => {
        // Ticks draw in as each card settles.
        gsap.fromTo(
          card.querySelectorAll("[data-tick]"),
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: card, start: "top 65%", once: true },
          },
        );

        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card.querySelector("[data-card-inner]"), {
          scale: 0.94,
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 30%", scrub: true },
        });
        gsap.to(card.querySelector("[data-card-shade]"), {
          opacity: 0.55,
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 30%", scrub: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Section ref={ref} theme="dark" aria-labelledby="services-title">
      <Container className="flex flex-col gap-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="flex flex-col gap-6">
            <Eyebrow index={4}>Services</Eyebrow>
            <RevealText as="h2" id="services-title" className="max-w-[18ch] text-display font-display font-semibold">
              Full-cycle enterprise technology services
            </RevealText>
          </div>
          <Button href="/services" variant="ghost">
            All {services.length} services
          </Button>
        </div>

        <ol className="flex flex-col gap-6">
          {featuredServices.map((service, i) => {
            const featured = service.featured!;
            return (
              <li
                key={service.slug}
                data-service-card
                className="sticky"
                style={{ top: `calc(var(--header-h) + 1rem + ${i * 1.25}rem)` }}
              >
                <article
                  data-card-inner
                  className="relative grid origin-top gap-10 overflow-hidden rounded-card border border-line bg-surface p-6 md:p-10 lg:min-h-[28rem] lg:grid-cols-[1.1fr_1fr]"
                >
                  <div className="flex flex-col gap-6">
                    <span className="font-mono text-xs text-subtle">
                      {String(i + 1).padStart(2, "0")} — {service.shortTitle}
                    </span>
                    <h3 className="max-w-[16ch] font-display text-h2 font-semibold">{featured.headline}</h3>
                    <p className="max-w-[46ch] text-[var(--fg-muted)]">{featured.description}</p>
                    <ul className="mt-auto flex flex-wrap gap-2">
                      {service.tags.map((t) => (
                        <li key={t}>
                          <Tag>{t}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col justify-between gap-8">
                    <ul className="flex flex-col">
                      {featured.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-3 border-b border-line py-3 last:border-0">
                          <svg viewBox="0 0 16 16" aria-hidden className="mt-1 size-4 shrink-0 text-jade">
                            <path
                              data-tick
                              d="M3 8.5l3.2 3L13 4.5"
                              pathLength={1}
                              strokeDasharray="1"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.6"
                            />
                          </svg>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <TransitionLink
                      href={`/services/${service.slug}`}
                      className="group inline-flex items-center gap-2 self-start text-sm text-jade"
                    >
                      Explore {service.shortTitle}
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </TransitionLink>
                  </div>
                  {/* Darkens the card as the next one covers it */}
                  <div data-card-shade aria-hidden className="pointer-events-none absolute inset-0 bg-forest opacity-0" />
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
