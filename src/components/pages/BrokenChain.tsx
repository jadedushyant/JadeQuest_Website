"use client";

import { useRef } from "react";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { onPreloaderDone } from "@/lib/motion/preloader";

const BLOCKS = 5;
const MISSING = 3;

/**
 * 404 illustration: a chain of ledger blocks draws in, and the block where the
 * page should be stays an empty, flickering outline.
 */
export function BrokenChain() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(
        "[data-draw]",
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut", stagger: 0.12 },
      )
        .from("[data-fill]", { autoAlpha: 0, duration: 0.4, stagger: 0.1 }, "-=0.4")
        .to("[data-missing]", { opacity: 0.25, duration: 0.12, repeat: -1, yoyo: true, repeatDelay: 1.6, ease: "steps(1)" });
      return onPreloaderDone(() => tl.play());
    },
    { scope: ref },
  );

  const w = 120;
  const gap = 48;
  const width = BLOCKS * w + (BLOCKS - 1) * gap;

  return (
    <svg ref={ref} viewBox={`-4 -4 ${width + 8} 108`} aria-hidden className="w-full max-w-3xl" fill="none">
      {Array.from({ length: BLOCKS }, (_, i) => {
        const x = i * (w + gap);
        const missing = i === MISSING;
        return (
          <g key={i}>
            {i > 0 && (
              <path
                data-draw
                d={`M${x - gap} 50 H${x}`}
                pathLength={1}
                strokeDasharray={missing || i === MISSING + 1 ? "0.08 0.06" : "1"}
                stroke={missing || i === MISSING + 1 ? "var(--fg-subtle)" : "var(--line)"}
                strokeWidth="1.5"
              />
            )}
            <rect
              data-draw
              {...(missing ? { "data-missing": true } : {})}
              x={x}
              y={10}
              width={w}
              height={80}
              rx="8"
              pathLength={1}
              strokeDasharray={missing ? "0.03 0.03" : "1"}
              stroke={missing ? "var(--color-jade)" : "var(--fg-subtle)"}
              strokeWidth="1.5"
            />
            {!missing && (
              <g data-fill fill="var(--fg-subtle)" opacity="0.5">
                <rect x={x + 16} y={32} width={56} height={4} rx="2" />
                <rect x={x + 16} y={46} width={84} height={4} rx="2" />
                <rect x={x + 16} y={60} width={40} height={4} rx="2" />
              </g>
            )}
            {missing && (
              <text x={x + w / 2} y={57} textAnchor="middle" className="font-mono text-[18px]" fill="var(--color-jade)">
                404
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
