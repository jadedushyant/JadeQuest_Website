"use client";

import { useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/cn";
import { useLenis } from "./SmoothScrollProvider";

type MarqueeProps = {
  /** Seconds for one full loop */
  duration?: number;
  direction?: "left" | "right";
  /** Speed up and follow scroll direction while the page scrolls */
  scrollReactive?: boolean;
  pauseOnHover?: boolean;
  /** Accessible label for the whole strip */
  label?: string;
  className?: string;
  children: ReactNode;
};

/** Infinite horizontal loop. Content is rendered twice; the copy is hidden from screen readers. */
export function Marquee({
  duration = 40,
  direction = "left",
  scrollReactive = true,
  pauseOnHover = true,
  label,
  className,
  children,
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track || prefersReducedMotion()) return;

      const loop = gsap.fromTo(
        track,
        { xPercent: direction === "left" ? 0 : -50 },
        { xPercent: direction === "left" ? -50 : 0, duration, ease: "none", repeat: -1 },
      );

      let hoverScale = 1;
      let scrollBoost = 1;
      let scrollSign = 1;
      const apply = () =>
        gsap.to(loop, { timeScale: scrollSign * scrollBoost * hoverScale, duration: 0.6, ease: "power2.out", overwrite: true });

      const onEnter = () => {
        hoverScale = 0.2;
        apply();
      };
      const onLeave = () => {
        hoverScale = 1;
        apply();
      };
      if (pauseOnHover) {
        root.addEventListener("pointerenter", onEnter);
        root.addEventListener("pointerleave", onLeave);
      }

      let settle: ReturnType<typeof setTimeout> | undefined;
      const onScroll = ({ velocity }: { velocity: number }) => {
        scrollSign = velocity < 0 ? -1 : 1;
        scrollBoost = 1 + Math.min(Math.abs(velocity) * 0.08, 3);
        apply();
        clearTimeout(settle);
        settle = setTimeout(() => {
          scrollBoost = 1;
          apply();
        }, 150);
      };
      // Scrolling up runs the strip backwards: timeScale flips sign.
      const unsubscribe = scrollReactive && lenis ? lenis.on("scroll", onScroll) : undefined;

      return () => {
        unsubscribe?.();
        clearTimeout(settle);
        root.removeEventListener("pointerenter", onEnter);
        root.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: rootRef, dependencies: [lenis, direction, duration], revertOnUpdate: true },
  );

  return (
    <div
      ref={rootRef}
      role={label ? "region" : undefined}
      aria-label={label}
      className={cn(
        "overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div ref={trackRef} className="flex w-max">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
