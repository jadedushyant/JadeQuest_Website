"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";

const LenisContext = createContext<Lenis | null>(null);

/** The active Lenis instance, or null when smooth scroll is off (reduced motion, SSR). */
export const useLenis = () => useContext(LenisContext);

const easeInOutExpo = (t: number) =>
  t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? 2 ** (20 * t - 10) / 2 : (2 - 2 ** (-20 * t + 10)) / 2;

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      smoothWheel: true,
      autoRaf: false,
      anchors: { offset: -80, duration: 1.4, easing: easeInOutExpo },
    });

    // Drive Lenis from GSAP's ticker so ScrollTrigger and Lenis share one frame.
    const update = (time: number) => instance.raf(time * 1000);
    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
      instance.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  // Web fonts change line breaks and section heights: re-measure once they're in.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
