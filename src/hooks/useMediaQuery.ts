"use client";

import { useSyncExternalStore } from "react";
import { MEDIA } from "@/lib/motion/constants";

/** Server render and first paint return `serverValue`, then the real match. */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export const useReducedMotion = () => useMediaQuery(MEDIA.reducedMotion);
export const useFinePointer = () => useMediaQuery(MEDIA.finePointer);

/** Non-hook check for use inside effects and GSAP callbacks. */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(MEDIA.reducedMotion).matches;
}
