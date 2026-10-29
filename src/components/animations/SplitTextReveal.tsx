"use client";

import { useRef, type ElementType } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/animations";
import { useReducedMotion } from "@/lib/animations/reducedMotion";
import { cn } from "@/lib/cn";

interface SplitTextRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerHook?: string;
}

export function SplitTextReveal({
  text,
  as: Component = "h2",
  className,
  delay = 0,
  duration = 0.9,
  stagger = 0.03,
  triggerHook = "top 85%",
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = textRef.current;
      if (!el) return;

      if (reducedMotion) {
        gsap.set(el, { opacity: 1, visibility: "visible" });
        return;
      }

      const split = SplitText.create(el, {
        type: "words",
        mask: "words",
      });

      gsap.fromTo(
        split.words,
        {
          yPercent: 120,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: triggerHook,
            once: true,
          },
        }
      );

      return () => {
        split.revert();
      };
    },
    { scope: containerRef, dependencies: [reducedMotion, delay, duration, stagger, triggerHook] }
  );

  return (
    <Component ref={containerRef} className={cn("relative overflow-hidden", className)} aria-label={text}>
      <span ref={textRef} aria-hidden="true" className="inline-block">
        {text}
      </span>
    </Component>
  );
}

