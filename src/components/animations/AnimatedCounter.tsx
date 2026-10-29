"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/animations";
import { useReducedMotion } from "@/lib/animations/reducedMotion";
import { cn } from "@/lib/cn";

interface AnimatedCounterProps {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  pad?: number;
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({
  to,
  from = 0,
  duration = 1.6,
  prefix = "",
  suffix = "",
  pad = 0,
  className,
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(from);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (reducedMotion) {
        setVal(to);
        return;
      }

      const obj = { count: from };
      gsap.to(obj, {
        count: to,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          setVal(decimals > 0 ? parseFloat(obj.count.toFixed(decimals)) : Math.round(obj.count));
        },
      });
    },
    { scope: ref, dependencies: [to, from, duration, reducedMotion, decimals] }
  );

  const formatNumber = (n: number) => {
    let str = decimals > 0 ? n.toFixed(decimals) : String(n);
    if (pad > 0 && decimals === 0) {
      str = str.padStart(pad, "0");
    }
    return str;
  };

  const displayText = `${prefix}${formatNumber(reducedMotion ? to : val)}${suffix}`;

  return (
    <span ref={ref} className={cn("tabular-nums", className)} aria-label={`${prefix}${to}${suffix}`}>
      {displayText}
    </span>
  );
}

