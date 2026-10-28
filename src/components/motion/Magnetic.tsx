"use client";

import { useRef, type ReactNode } from "react";
import { MEDIA } from "@/lib/motion/constants";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/cn";

type MagneticProps = {
  /** Share of the pointer offset the element follows. Keep it small. */
  strength?: number;
  /** Extra px around the element where the pull starts */
  padding?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Pulls its child gently toward the pointer. A `[data-magnetic-label]` inside
 * moves a little further, so the label floats over the button.
 * Mouse/trackpad only, and off for reduced motion.
 */
export function Magnetic({ strength = 0.25, padding = 24, className, children }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(`${MEDIA.finePointer} and (prefers-reduced-motion: no-preference)`, () => {
        const label = el.querySelector<HTMLElement>("[data-magnetic-label]");
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
        const lxTo = label && gsap.quickTo(label, "x", { duration: 0.6, ease: "power3.out" });
        const lyTo = label && gsap.quickTo(label, "y", { duration: 0.6, ease: "power3.out" });
        let active = false;

        const onMove = (e: PointerEvent) => {
          // Measure without our own transform so the hit area doesn't chase the pointer.
          const rect = el.getBoundingClientRect();
          const tx = Number(gsap.getProperty(el, "x"));
          const ty = Number(gsap.getProperty(el, "y"));
          const left = rect.left - tx;
          const top = rect.top - ty;
          const inside =
            e.clientX > left - padding &&
            e.clientX < left + rect.width + padding &&
            e.clientY > top - padding &&
            e.clientY < top + rect.height + padding;

          if (inside) {
            active = true;
            const dx = e.clientX - (left + rect.width / 2);
            const dy = e.clientY - (top + rect.height / 2);
            xTo(dx * strength);
            yTo(dy * strength);
            lxTo?.(dx * strength * 0.5);
            lyTo?.(dy * strength * 0.5);
          } else if (active) {
            active = false;
            gsap.to(label ? [el, label] : el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
          }
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        return () => {
          window.removeEventListener("pointermove", onMove);
          gsap.set(label ? [el, label] : el, { x: 0, y: 0 });
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={cn("inline-block will-change-transform", className)}>
      {children}
    </span>
  );
}
