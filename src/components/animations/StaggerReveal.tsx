"use client";

import { Children, useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/animations";
import { useReducedMotion } from "@/lib/animations/reducedMotion";
import { cn } from "@/lib/cn";

interface StaggerRevealProps {
  children: ReactNode;
  as?: ElementType;
  childAs?: ElementType;
  className?: string;
  itemClassName?: string;
  stagger?: number;
  duration?: number;
  y?: number;
  triggerHook?: string;
}

export function StaggerReveal({
  children,
  as: Component = "div",
  className,
  itemClassName,
  stagger = 0.08,
  duration = 0.7,
  y = 28,
  triggerHook = "top 85%",
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const count = Children.count(children);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const items = container.querySelectorAll("[data-stagger-item]");
      if (!items.length) return;

      if (reducedMotion) {
        gsap.set(items, { opacity: 1, y: 0, visibility: "visible" });
        return;
      }

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y,
          visibility: "hidden",
        },
        {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: triggerHook,
            once: true,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [reducedMotion, count, stagger, duration, y, triggerHook] }
  );

  return (
    <Component ref={containerRef} className={className}>
      {Children.map(children, (child, idx) => (
        <div key={idx} data-stagger-item className={cn("will-change-transform", itemClassName)}>
          {child}
        </div>
      ))}
    </Component>
  );
}

