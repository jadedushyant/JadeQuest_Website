"use client";

import { useRef, type ElementType } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/animations";
import { useReducedMotion } from "@/lib/animations/reducedMotion";
import { cn } from "@/lib/cn";

interface TextRevealProps {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  type?: "lines" | "words" | "chars";
  id?: string;
}

export function TextReveal({
  children,
  as: Component = "p",
  className,
  delay = 0,
  duration = 0.8,
  stagger = 0.04,
  type = "words",
  id,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (reducedMotion) {
        gsap.set(el, { opacity: 1, visibility: "visible" });
        return;
      }

      const split = SplitText.create(el, {
        type: type === "chars" ? "chars,words" : type,
        mask: type === "chars" ? "chars" : type === "lines" ? "lines" : "words",
      });

      const targets =
        type === "chars"
          ? split.chars
          : type === "lines"
          ? split.lines
          : split.words;

      gsap.fromTo(
        targets,
        {
          yPercent: 110,
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
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );

      return () => {
        split.revert();
      };
    },
    { scope: ref, dependencies: [reducedMotion, delay, duration, stagger, type] }
  );

  return (
    <Component ref={ref} id={id} className={cn("inline-block", className)}>
      {children}
    </Component>
  );
}
