"use client";

import { useRef } from "react";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { REVEAL_START } from "@/lib/motion/constants";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/cn";

type CounterProps = {
  to: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  /** Zero-pad to this many digits, e.g. 2 → "04" */
  pad?: number;
  duration?: number;
  className?: string;
};

const format = (n: number, pad?: number) => (pad ? String(n).padStart(pad, "0") : String(n));

/**
 * Counts up when scrolled into view. Server HTML already holds the final value,
 * so the number is right without JavaScript and screen readers get it once.
 */
export function Counter({ to, from = 0, prefix = "", suffix = "", pad, duration = 1.6, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const num = numRef.current;
      if (!num || prefersReducedMotion()) return;
      const state = { value: from };
      num.textContent = format(from, pad);
      gsap.to(state, {
        value: to,
        duration,
        ease: "power3.out",
        snap: { value: 1 },
        onUpdate: () => {
          num.textContent = format(state.value, pad);
        },
        scrollTrigger: { trigger: ref.current, start: REVEAL_START, once: true },
      });
    },
    { scope: ref },
  );

  const finalText = `${prefix}${format(to, pad)}${suffix}`;
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      <span className="sr-only">{finalText}</span>
      <span aria-hidden>
        {prefix}
        <span ref={numRef}>{format(to, pad)}</span>
        {suffix}
      </span>
    </span>
  );
}
