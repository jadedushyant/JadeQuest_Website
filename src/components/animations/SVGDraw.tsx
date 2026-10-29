"use client";

import { useRef, type SVGProps } from "react";
import { gsap, useGSAP } from "@/lib/animations";
import { useReducedMotion } from "@/lib/animations/reducedMotion";
import { cn } from "@/lib/cn";

interface SVGDrawProps extends SVGProps<SVGSVGElement> {
  pathD: string;
  strokeColor?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
  scrub?: boolean | number;
  className?: string;
}

export function SVGDraw({
  pathD,
  strokeColor = "currentColor",
  strokeWidth = 2,
  duration = 1.2,
  delay = 0,
  scrub = false,
  className,
  ...props
}: SVGDrawProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path) return;

      const length = path.getTotalLength();

      if (reducedMotion) {
        gsap.set(path, { strokeDasharray: "none", strokeDashoffset: 0 });
        return;
      }

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      if (scrub) {
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: svgRef.current,
            start: "top 85%",
            end: "bottom 60%",
            scrub: scrub === true ? 1 : scrub,
          },
        });
      } else {
        gsap.to(path, {
          strokeDashoffset: 0,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: svgRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    },
    { scope: svgRef, dependencies: [pathD, duration, delay, scrub, reducedMotion] }
  );

  return (
    <svg ref={svgRef} className={cn("overflow-visible", className)} {...props}>
      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

