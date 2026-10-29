"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/animations";
import { useReducedMotion } from "@/lib/animations/reducedMotion";
import { cn } from "@/lib/cn";

interface HorizontalShowcaseProps {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  className?: string;
}

export function HorizontalShowcase({
  children,
  title,
  eyebrow,
  className,
}: HorizontalShowcaseProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const trigger = triggerRef.current;
      const track = trackRef.current;
      if (!trigger || !track || reducedMotion) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const getScrollDistance = () => track.scrollWidth - track.clientWidth;

        const pinAnim = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          pinAnim.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: triggerRef, dependencies: [reducedMotion] }
  );

  return (
    <div
      ref={triggerRef}
      className={cn("relative overflow-hidden w-full py-16 lg:py-24", className)}
    >
      {(title || eyebrow) && (
        <div className="container mx-auto px-6 mb-10 flex flex-col gap-2">
          {eyebrow && (
            <span className="font-mono text-xs uppercase tracking-widest text-cyan">
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-paper">
              {title}
            </h2>
          )}
        </div>
      )}

      {/* On desktop: horizontal scrolling track. On mobile: stacked grid */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row gap-6 px-6 lg:px-12 w-full lg:w-max will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}

