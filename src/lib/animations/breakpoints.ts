export const BREAKPOINTS = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  desktop: "(min-width: 1024px)",
  largeDesktop: "(min-width: 1440px)",
  touch: "(hover: none) and (pointer: coarse)",
  finePointer: "(hover: hover) and (pointer: fine)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;

export const isDesktop = () =>
  typeof window !== "undefined" && window.matchMedia(BREAKPOINTS.desktop).matches;

export const isMobile = () =>
  typeof window !== "undefined" && window.matchMedia(BREAKPOINTS.mobile).matches;

export const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia(BREAKPOINTS.finePointer).matches;

