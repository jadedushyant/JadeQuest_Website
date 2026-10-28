"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { DURATION, EASE, REVEAL_START } from "@/lib/motion/constants";
import { gsap, useGSAP } from "@/lib/motion/gsap";

type RevealFadeProps = {
  as?: ElementType;
  y?: number;
  delay?: number;
  /** Stagger direct children instead of the wrapper */
  stagger?: number;
  start?: string;
  className?: string;
  children: ReactNode;
};

/** Fade and rise on scroll. With `stagger`, direct children animate one after another. */
export function RevealFade({
  as: Tag = "div",
  y = 32,
  delay = 0,
  stagger,
  start = REVEAL_START,
  className,
  children,
}: RevealFadeProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger !== undefined ? el.children : el;
      gsap.set(el, { autoAlpha: 1 });
      gsap.from(targets, {
        autoAlpha: 0,
        y: prefersReducedMotion() ? 0 : y,
        duration: DURATION.reveal,
        delay,
        ease: EASE.out,
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-reveal className={className}>
      {children}
    </Tag>
  );
}
