"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/animations";
import { useReducedMotion } from "@/lib/animations/reducedMotion";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

export function Reveal({
  children,
  as: Component = "div",
  className,
  delay = 0,
  duration = 0.8,
  y = 30,
  direction = "up",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (reducedMotion) {
        gsap.set(el, { opacity: 1, visibility: "visible" });
        return;
      }

      let xOffset = 0;
      let yOffset = y;

      if (direction === "down") yOffset = -y;
      if (direction === "left") {
        xOffset = y;
        yOffset = 0;
      }
      if (direction === "right") {
        xOffset = -y;
        yOffset = 0;
      }
      if (direction === "none") {
        xOffset = 0;
        yOffset = 0;
      }

      gsap.fromTo(
        el,
        {
          opacity: 0,
          x: xOffset,
          y: yOffset,
          visibility: "hidden",
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          visibility: "visible",
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once,
          },
        }
      );
    },
    { scope: ref, dependencies: [reducedMotion, delay, duration, y, direction, once] }
  );

  return (
    <Component ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </Component>
  );
}

