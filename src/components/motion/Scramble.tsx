"use client";

import { useRef } from "react";
import { MEDIA } from "@/lib/motion/constants";

const GLYPHS = "0123456789abcdef";

/**
 * Text that briefly resolves from hex characters on hover (mouse only).
 * Screen readers get the plain text; the scrambling copy is hidden from them.
 */
export function Scramble({ text, duration = 450 }: { text: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const running = useRef(false);

  const play = () => {
    const el = ref.current;
    if (!el || running.current) return;
    if (!window.matchMedia(`${MEDIA.finePointer} and (prefers-reduced-motion: no-preference)`).matches) return;
    running.current = true;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const resolved = Math.floor(t * text.length);
      el.textContent = text
        .split("")
        .map((c, i) => (i < resolved || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
        .join("");
      if (t < 1) requestAnimationFrame(tick);
      else {
        el.textContent = text;
        running.current = false;
      }
    };
    requestAnimationFrame(tick);
  };

  return (
    <span onPointerEnter={play}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden>
        {text}
      </span>
    </span>
  );
}
