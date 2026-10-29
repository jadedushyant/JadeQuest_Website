"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/animations";
import { useReducedMotion } from "@/lib/animations/reducedMotion";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    const bar = barRef.current;
    if (!bar || reducedMotion) return;

    gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.15,
        },
      }
    );
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[9990] pointer-events-none origin-left"
    >
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-purple via-cyan to-purple origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

