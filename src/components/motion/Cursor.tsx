"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/motion/gsap";

type CursorState = "default" | "link" | "view" | "drag" | "text" | "hidden";

const LABELS: Partial<Record<CursorState, string>> = { view: "View", drag: "Drag" };

/**
 * A small dot with a trailing ring. Elements opt into states with
 * `data-cursor="link|view|drag|text|hidden"` and an optional `data-cursor-label`.
 * Mouse/trackpad only; never rendered for touch or reduced motion.
 */
export function Cursor() {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  if (!finePointer || reducedMotion) return null;
  return <CursorInner />;
}

function CursorInner() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.documentElement.classList.add("has-custom-cursor");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let state: CursorState = "default";
    let visible = false;

    const setState = (next: CursorState, text?: string) => {
      if (next === state && !text) return;
      state = next;
      const big = next === "view" || next === "drag";
      label.textContent = text ?? LABELS[next] ?? "";
      // Solid jade with a label reads better than an inverted blend.
      ring.style.mixBlendMode = big ? "normal" : "difference";

      gsap.to(ring, {
        width: big ? 84 : 36,
        height: big ? 84 : 36,
        scale: next === "link" ? 1.4 : 1,
        // GSAP can't interpolate CSS variables, so these mirror --color-jade / --color-paper.
        backgroundColor: big ? "rgba(25,181,138,1)" : "rgba(25,181,138,0)",
        borderColor: big ? "#19b58a" : "#f3f2ea",
        autoAlpha: next === "text" || next === "hidden" ? 0 : 1,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(dot, {
        scale: next === "default" ? 1 : 0,
        duration: 0.25,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(label, { autoAlpha: big ? 1 : 0, duration: 0.2, overwrite: "auto" });
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        visible = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to(state === "text" || state === "hidden" ? dot : [dot, ring], { autoAlpha: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest<HTMLElement>("[data-cursor], a, button, input, textarea, select, label");
      if (!el) return setState("default");
      const explicit = el.dataset.cursor as CursorState | undefined;
      if (explicit) return setState(explicit, el.dataset.cursorLabel);
      if (el.matches('input:not([type="checkbox"], [type="radio"], [type="submit"], [type="button"]), textarea'))
        return setState("text");
      setState("link");
    };

    const onLeaveWindow = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    };
    const onDown = () => gsap.to(ring, { scale: 0.85, duration: 0.15 });
    const onUp = () => gsap.to(ring, { scale: state === "link" ? 1.4 : 1, duration: 0.3, ease: "power3.out" });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      gsap.killTweensOf([dot, ring, label]);
    };
  }, []);

  // Separate fixed elements, no wrapper: a stacking-context parent would stop
  // mix-blend-difference from blending with the page behind.
  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-cursor flex size-9 items-center justify-center rounded-full border border-paper mix-blend-difference"
      >
        <span ref={labelRef} className="invisible text-xs font-medium text-forest" />
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-cursor size-1.5 rounded-full bg-paper mix-blend-difference"
      />
    </>
  );
}
