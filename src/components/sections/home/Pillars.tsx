"use client";

import { useRef } from "react";
import { Container, Eyebrow, Section } from "@/components/ui";
import { company } from "@/content";
import { gsap, SplitText, useGSAP } from "@/lib/motion/gsap";

/** Line drawings, one per pillar. `pathLength=1` lets GSAP draw any path the same way. */
const illustrations = [
  // Blockchain: three chained blocks
  <g key="chain">
    <rect x="18" y="78" width="48" height="44" rx="4" pathLength={1} />
    <rect x="96" y="78" width="48" height="44" rx="4" pathLength={1} />
    <rect x="174" y="78" width="48" height="44" rx="4" pathLength={1} />
    <path d="M66 100h30M144 100h30" pathLength={1} />
    <path d="M30 92h24M108 92h24M186 92h24M30 104h14M108 104h14M186 104h14" pathLength={1} />
  </g>,
  // AI: a small neural net
  <g key="net">
    <path
      d="M40 50L120 70M40 50L120 130M40 100L120 70M40 100L120 130M40 150L120 70M40 150L120 130M120 70L200 100M120 130L200 100"
      pathLength={1}
    />
    {[
      [40, 50],
      [40, 100],
      [40, 150],
      [120, 70],
      [120, 130],
      [200, 100],
    ].map(([cx, cy]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="9" pathLength={1} />
    ))}
  </g>,
  // Software: stacked modules
  <g key="stack">
    <rect x="50" y="40" width="140" height="34" rx="4" pathLength={1} />
    <rect x="50" y="83" width="140" height="34" rx="4" pathLength={1} />
    <rect x="50" y="126" width="64" height="34" rx="4" pathLength={1} />
    <rect x="126" y="126" width="64" height="34" rx="4" pathLength={1} />
    <path d="M64 57h40M64 100h70" pathLength={1} />
  </g>,
  // e-Governance: a civic building
  <g key="civic">
    <path d="M30 80L120 36L210 80Z" pathLength={1} />
    <path d="M44 92v62M76 92v62M108 92v62M140 92v62M172 92v62M200 92v62" pathLength={1} />
    <path d="M24 164h192M36 86h168" pathLength={1} />
  </g>,
];

/**
 * 5.2: the four pillars swap in a pinned section (desktop). On small screens
 * and with reduced motion they're simply listed.
 */
export function Pillars() {
  const ref = useRef<HTMLElement>(null);
  const pillars = company.pillars;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(ref);
        const titles = q<HTMLElement>("[data-pillar-title]");
        const bodies = q<HTMLElement>("[data-pillar-body]");
        const arts = q<SVGGElement>("[data-pillar-art]");
        const bars = q<HTMLElement>("[data-pillar-bar]");
        const splits = titles.map((t) => SplitText.create(t, { type: "words", mask: "words" }));

        // Everything after the first starts hidden.
        splits.slice(1).forEach((s) => gsap.set(s.words, { yPercent: 110 }));
        gsap.set(bodies.slice(1), { autoAlpha: 0, y: 20 });
        gsap.set(arts.slice(1), { autoAlpha: 0 });
        gsap.set(q("[data-pillar-art] *"), { strokeDasharray: 1, strokeDashoffset: 0 });
        gsap.set(bars, { scaleX: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${window.innerHeight * pillars.length}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        bars.forEach((bar, i) => {
          tl.to(bar, { scaleX: 1, duration: 1 }, i);
          if (i === 0) return;
          const at = i - 0.25;
          tl.to(splits[i - 1].words, { yPercent: -110, duration: 0.3, stagger: 0.03 }, at)
            .to(bodies[i - 1], { autoAlpha: 0, y: -20, duration: 0.25 }, at)
            .to(arts[i - 1], { autoAlpha: 0, duration: 0.25 }, at)
            .to(splits[i].words, { yPercent: 0, duration: 0.35, stagger: 0.03 }, at + 0.15)
            .to(bodies[i], { autoAlpha: 1, y: 0, duration: 0.3 }, at + 0.2)
            .set(arts[i], { autoAlpha: 1 }, at + 0.15)
            .fromTo(
              arts[i].querySelectorAll("*"),
              { strokeDashoffset: 1 },
              { strokeDashoffset: 0, duration: 0.5, stagger: 0.04 },
              at + 0.15,
            );
        });

        return () => splits.forEach((s) => s.revert());
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Section ref={ref} theme="dark" spacing="none" aria-labelledby="pillars-label" className="overflow-hidden">
      <Container className="flex flex-col gap-12 py-section lg:h-svh lg:justify-center lg:py-0">
        <div className="flex items-end justify-between gap-6">
          <Eyebrow index={3} id="pillars-label">
            Four practices, one standard
          </Eyebrow>
          <ol className="hidden w-64 grid-cols-4 gap-2 lg:grid" aria-hidden>
            {pillars.map((p) => (
              <li key={p.title} className="h-0.5 overflow-hidden bg-line">
                <span data-pillar-bar className="block h-full origin-left bg-jade" />
              </li>
            ))}
          </ol>
        </div>

        {/* Desktop: stacked panels that swap. Mobile: a plain list. */}
        <ol className="flex flex-col gap-16 lg:relative lg:block lg:h-[52vh]">
          {pillars.map((p, i) => (
            <li
              key={p.title}
              className="grid gap-6 lg:absolute lg:inset-0 lg:grid-cols-[1fr_20rem] lg:gap-x-16"
            >
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs text-subtle">
                  {String(i + 1).padStart(2, "0")} / {String(pillars.length).padStart(2, "0")}
                </span>
                <h3 data-pillar-title className="max-w-[12ch] font-display text-display font-semibold">
                  {p.title}
                </h3>
              </div>
              <div className="flex flex-col gap-6 lg:justify-end">
                <svg
                  viewBox="0 0 240 200"
                  aria-hidden
                  className="h-28 w-auto self-start text-mist lg:h-40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <g data-pillar-art>{illustrations[i]}</g>
                </svg>
                <p data-pillar-body className="text-lead text-[var(--fg-muted)]">
                  {p.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
