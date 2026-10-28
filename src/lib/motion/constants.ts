/** Motion tokens. Keep in sync with --ease-* / --duration-* in globals.css. */
export const EASE = {
  /** In-out, for things that travel: page wipes, menu panels */
  jade: "jade",
  /** Reveals and settling */
  out: "expo.out",
  /** Elastic return for magnetic elements */
  spring: "elastic.out(1, 0.4)",
} as const;

export const DURATION = {
  hover: 0.25,
  reveal: 0.9,
  section: 0.9,
  page: 1,
} as const;

export const MEDIA = {
  reducedMotion: "(prefers-reduced-motion: reduce)",
  /** Mouse/trackpad: enables cursor and magnetic effects */
  finePointer: "(hover: hover) and (pointer: fine)",
} as const;

/** Default ScrollTrigger start for one-shot reveals */
export const REVEAL_START = "top 85%";
