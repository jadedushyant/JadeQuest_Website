/**
 * Uniform values shared between the hero (which tweens them with GSAP) and the
 * WebGL field (which reads them every frame). Plain objects so the hero doesn't
 * have to import three.js.
 */
export type LedgerUniforms = {
  uTime: { value: number };
  /** 0 → 1 while the intro plays */
  uIntro: { value: number };
  /** 0 → 1 while the pointer is held down */
  uHold: { value: number };
  /** 0 → 1 morphs the grid into the Merkle tree */
  uBurst: { value: number };
  /** 0 → 1 as the hero scrolls out */
  uScroll: { value: number };
  /** Pointer in world units on the z = 0 plane */
  uMouse: { value: [number, number] };
  uMouseStrength: { value: number };
  uPixelRatio: { value: number };
  uSize: { value: number };
  uColor: { value: [number, number, number] };
  uAccent: { value: [number, number, number] };
};

const hex = (h: string): [number, number, number] => {
  const n = parseInt(h.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

export function createLedgerUniforms(): LedgerUniforms {
  return {
    uTime: { value: 0 },
    uIntro: { value: 0 },
    uHold: { value: 0 },
    uBurst: { value: 0 },
    uScroll: { value: 0 },
    uMouse: { value: [99, 99] },
    uMouseStrength: { value: 0 },
    uPixelRatio: { value: 1 },
    uSize: { value: 2.4 },
    uColor: { value: hex("#829187") },
    uAccent: { value: hex("#19b58a") },
  };
}
