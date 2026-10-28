"use client";

import { useRef } from "react";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/cn";

// Equirectangular crop: longitude 40–115°E, latitude 35–5°N → 600 × 300.
const project = (lon: number, lat: number) => [((lon - 40) / 75) * 600, ((35 - lat) / 30) * 300] as const;

const offices = [
  { name: "UAE", at: project(54.4, 24.4), labelDx: -12, anchor: "end" as const },
  { name: "India", at: project(78, 21.5), labelDx: 0, anchor: "middle" as const },
  { name: "Vietnam", at: project(106.5, 16), labelDx: 12, anchor: "start" as const },
];

function arc([x1, y1]: readonly [number, number], [x2, y2]: readonly [number, number]) {
  const lift = Math.abs(x2 - x1) * 0.35;
  return `M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - lift} ${x2} ${y2}`;
}

/** Dot-grid map of the three offices; the arcs between them draw in on scroll. */
export function OfficeMap({ caption, className }: { caption?: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const scrollTrigger = { trigger: ref.current, start: "top 75%", once: true };
      gsap.fromTo(
        "[data-arc]",
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", stagger: 0.3, scrollTrigger },
      );
      gsap.from("[data-office]", {
        scale: 0,
        transformOrigin: "50% 50%",
        duration: 0.6,
        ease: "back.out(2)",
        stagger: 0.3,
        scrollTrigger,
      });
    },
    { scope: ref },
  );

  return (
    <figure ref={ref} className={cn("flex flex-col gap-4", className)}>
      <svg viewBox="0 0 600 300" role="img" aria-label="Offices in the UAE, India and Vietnam" className="w-full">
        <defs>
          <pattern id="office-dot-grid" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r="1.2" fill="var(--fg-subtle)" fillOpacity="0.35" />
          </pattern>
        </defs>
        <rect width="600" height="300" fill="url(#office-dot-grid)" />
        {[30, 20, 10].map((lat) => {
          const y = project(0, lat)[1];
          return <line key={lat} x1="0" x2="600" y1={y} y2={y} stroke="var(--line)" strokeDasharray="2 6" />;
        })}
        <g fill="none" stroke="var(--accent)" strokeWidth="1.5">
          <path data-arc d={arc(offices[0].at, offices[1].at)} pathLength={1} strokeDasharray="1" />
          <path data-arc d={arc(offices[1].at, offices[2].at)} pathLength={1} strokeDasharray="1" />
        </g>
        {offices.map((o) => (
          <g key={o.name} data-office>
            <circle cx={o.at[0]} cy={o.at[1]} r="14" fill="var(--accent)" fillOpacity="0.14" />
            <circle cx={o.at[0]} cy={o.at[1]} r="5" fill="var(--accent)" />
            <text
              x={o.at[0] + o.labelDx}
              y={o.at[1] + 32}
              textAnchor={o.anchor}
              className="fill-[var(--fg)] text-[13px] font-medium"
            >
              {o.name}
            </text>
          </g>
        ))}
      </svg>
      {caption && <figcaption className="text-sm text-[var(--fg-muted)]">{caption}</figcaption>}
    </figure>
  );
}
