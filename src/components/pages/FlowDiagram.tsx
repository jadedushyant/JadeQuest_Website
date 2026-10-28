"use client";

import { useRef } from "react";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { gsap, useGSAP } from "@/lib/motion/gsap";

const NODE_W = 168;
const NODE_H = 72;

/** Splits a label into at most two lines of roughly `max` characters. */
function wrap(label: string, max = 17) {
  const words = label.split(" ");
  const lines = [""];
  for (const w of words) {
    const cur = lines[lines.length - 1];
    if (cur && (cur + " " + w).length > max && lines.length < 2) lines.push(w);
    else lines[lines.length - 1] = cur ? `${cur} ${w}` : w;
  }
  return lines;
}

type Layout = { width: number; height: number; nodes: { x: number; y: number }[]; paths: string[] };

function horizontal(n: number): Layout {
  const gap = 56;
  const width = n * NODE_W + (n - 1) * gap;
  const y = 40;
  const nodes = Array.from({ length: n }, (_, i) => ({ x: i * (NODE_W + gap), y }));
  const paths = nodes.slice(1).map((b, i) => {
    const a = nodes[i];
    return `M${a.x + NODE_W} ${y + NODE_H / 2} L${b.x} ${y + NODE_H / 2}`;
  });
  return { width, height: NODE_H + 80, nodes, paths };
}

function vertical(n: number): Layout {
  const gap = 44;
  const x = 20;
  const nodes = Array.from({ length: n }, (_, i) => ({ x, y: i * (NODE_H + gap) }));
  const paths = nodes.slice(1).map((b, i) => {
    const a = nodes[i];
    return `M${x + NODE_W / 2} ${a.y + NODE_H} L${x + NODE_W / 2} ${b.y}`;
  });
  return { width: NODE_W + 40, height: n * NODE_H + (n - 1) * gap, nodes, paths };
}

function Diagram({ steps, layout, className }: { steps: string[]; layout: Layout; className: string }) {
  return (
    <svg
      viewBox={`-2 -2 ${layout.width + 4} ${layout.height + 4}`}
      className={className}
      role="img"
      aria-label={`How it works: ${steps.join(", then ")}`}
    >
      <g fill="none" stroke="var(--line)" strokeWidth="1.5">
        {layout.paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="none" stroke="var(--accent)" strokeWidth="1.5">
        {layout.paths.map((d) => (
          <path key={d} data-connector d={d} pathLength={1} strokeDasharray="1" />
        ))}
      </g>
      {layout.paths.map((d) => (
        <circle key={d} data-packet data-path={d} r="4" fill="var(--accent)" opacity="0" />
      ))}
      {steps.map((step, i) => {
        const { x, y } = layout.nodes[i];
        const last = i === steps.length - 1;
        const lines = wrap(step);
        return (
          <g key={step} data-node>
            <rect
              x={x}
              y={y}
              width={NODE_W}
              height={NODE_H}
              rx="10"
              fill={last ? "var(--accent)" : "var(--card)"}
              stroke={last ? "var(--accent)" : "var(--line)"}
            />
            <text
              x={x + 14}
              y={y + 20}
              className="font-mono text-[10px]"
              fill={last ? "var(--on-accent)" : "var(--fg-subtle)"}
            >
              {String(i + 1).padStart(2, "0")}
            </text>
            {lines.map((line, li) => (
              <text
                key={line}
                x={x + 14}
                y={y + 42 + li * 17 - (lines.length - 1) * 4}
                className="text-[14px] font-medium"
                fill={last ? "var(--on-accent)" : "var(--fg)"}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Product flow: nodes appear, connectors draw, then small packets travel
 * along the connectors while the diagram is on screen.
 */
export function FlowDiagram({ steps }: { steps: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = ref.current!;
      root.querySelectorAll("svg").forEach((svg) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: svg, start: "top 80%", toggleActions: "play pause resume pause" },
        });
        tl.from(svg.querySelectorAll("[data-node]"), {
          autoAlpha: 0,
          scale: 0.85,
          transformOrigin: "50% 50%",
          duration: 0.5,
          ease: "back.out(1.8)",
          stagger: 0.12,
        }).fromTo(
          svg.querySelectorAll("[data-connector]"),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut", stagger: 0.12 },
          0.2,
        );

        svg.querySelectorAll<SVGCircleElement>("[data-packet]").forEach((packet, i) => {
          tl.to(
            packet,
            {
              keyframes: [
                { opacity: 1, duration: 0.15 },
                { duration: 0.9 },
                { opacity: 0, duration: 0.15 },
              ],
              motionPath: { path: packet.dataset.path!, alignOrigin: [0.5, 0.5] },
              duration: 1.2,
              ease: "power1.inOut",
              repeat: -1,
              repeatDelay: 0.6,
            },
            1 + i * 0.25,
          );
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="w-full">
      <Diagram steps={steps} layout={horizontal(steps.length)} className="hidden w-full lg:block" />
      <Diagram steps={steps} layout={vertical(steps.length)} className="mx-auto block w-full max-w-[16rem] lg:hidden" />
    </div>
  );
}
