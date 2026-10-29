"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/animations";
import { useReducedMotion } from "@/lib/animations/reducedMotion";
import { cn } from "@/lib/cn";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number; // e.g. -0.2 for slower, 0.2 for faster
  direction?: "vertical" | "horizontal";
}

export function Parallax({
  children,
  className,
  speed = 0.15,
  direction = "vertical",
}: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const container = containerRef.current;
      const target = targetRef.current;
      if (!container || !target || reducedMotion) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const movement = speed * 120;
        const vars =
          direction === "vertical"
            ? { y: movement, ease: "none" }
            : { x: movement, ease: "none" };

        gsap.to(target, {
          ...vars,
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [reducedMotion, speed, direction] }
  );

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <div ref={targetRef} className="will-change-transform h-full w-full">
        {children}
      </div>
    </div>
  );
}

