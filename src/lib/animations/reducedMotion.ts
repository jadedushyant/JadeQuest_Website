"use client";

import { useEffect, useState } from "react";
import { BREAKPOINTS } from "./breakpoints";

export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(BREAKPOINTS.reducedMotion).matches;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(BREAKPOINTS.reducedMotion);
    setReduced(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function getSafeMotion<T extends object, F extends object>(normal: T, fallback: F): T | F {
  return isReducedMotion() ? fallback : normal;
}

