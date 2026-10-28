"use client";

import { useRef } from "react";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { DURATION, EASE, REVEAL_START } from "@/lib/motion/constants";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/cn";

type LineDrawProps = {
  orientation?: "horizontal" | "vertical";
  /** Tie the line to scroll position instead of playing once */
  scrub?: boolean;
  delay?: number;
  className?: string;
};

/** Hairline that draws itself in. Horizontal grows from the left, vertical from the top. */
export function LineDraw({ orientation = "horizontal", scrub = false, delay = 0, className }: LineDrawProps) {
  const ref = useRef<HTMLDivElement>(null);
  const horizontal = orientation === "horizontal";

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const prop = horizontal ? "scaleX" : "scaleY";
      gsap.from(ref.current, {
        [prop]: 0,
        duration: DURATION.reveal * 1.2,
        delay,
        ease: scrub ? "none" : EASE.jade,
        scrollTrigger: scrub
          ? { trigger: ref.current, start: "top 90%", end: "top 40%", scrub: true }
          : { trigger: ref.current, start: REVEAL_START, once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "bg-[var(--line,var(--color-line))]",
        horizontal ? "h-px w-full origin-left" : "h-full w-px origin-top",
        className,
      )}
    />
  );
}
