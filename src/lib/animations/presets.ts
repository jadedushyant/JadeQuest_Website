export const DURATIONS = {
  instant: 0.05,
  fast: 0.25,
  normal: 0.6,
  medium: 0.8,
  long: 1.2,
  hero: 1.6,
} as const;

export const EASINGS = {
  default: "power3.out",
  smooth: "power2.out",
  inOut: "power2.inOut",
  expo: "expo.out",
  cyber: "0.76,0,0.24,1",
  fluid: "0.16,1,0.3,1",
} as const;

export const ANIMATION_PRESETS = {
  fadeUp: {
    from: { opacity: 0, y: 32 },
    to: { opacity: 1, y: 0, duration: DURATIONS.normal, ease: EASINGS.smooth },
  },
  fadeDown: {
    from: { opacity: 0, y: -24 },
    to: { opacity: 1, y: 0, duration: DURATIONS.normal, ease: EASINGS.smooth },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: DURATIONS.normal, ease: EASINGS.smooth },
  },
  scaleUp: {
    from: { opacity: 0, scale: 0.95 },
    to: { opacity: 1, scale: 1, duration: DURATIONS.normal, ease: EASINGS.smooth },
  },
  maskReveal: {
    from: { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
    to: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: DURATIONS.medium, ease: EASINGS.expo },
  },
  staggerCards: {
    stagger: 0.08,
    duration: DURATIONS.medium,
    ease: EASINGS.smooth,
  },
} as const;

