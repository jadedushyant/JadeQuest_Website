import { describe, it, expect } from "vitest";
import { BREAKPOINTS } from "@/lib/animations/breakpoints";
import { DURATIONS, EASINGS, ANIMATION_PRESETS } from "@/lib/animations/presets";

describe("Animation Architecture & Presets", () => {
  it("defines standard breakpoint queries", () => {
    expect(BREAKPOINTS.mobile).toBe("(max-width: 767px)");
    expect(BREAKPOINTS.desktop).toBe("(min-width: 1024px)");
    expect(BREAKPOINTS.reducedMotion).toBe("(prefers-reduced-motion: reduce)");
  });

  it("exports calibrated timing and eases", () => {
    expect(DURATIONS.fast).toBe(0.25);
    expect(DURATIONS.normal).toBe(0.6);
    expect(EASINGS.default).toBe("power3.out");
    expect(EASINGS.expo).toBe("expo.out");
  });

  it("provides reliable animation presets", () => {
    expect(ANIMATION_PRESETS.fadeUp.from.opacity).toBe(0);
    expect(ANIMATION_PRESETS.fadeUp.to.opacity).toBe(1);
    expect(ANIMATION_PRESETS.maskReveal.to.clipPath).toBe("inset(0% 0% 0% 0%)");
  });
});

