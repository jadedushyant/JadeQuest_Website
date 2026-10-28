"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "@/components/motion";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/motion/gsap";
import { markPreloaderDone, PRELOADER_SESSION_KEY } from "@/lib/motion/preloader";

const WORD = "JadeQuest";
const HEX = "0123456789abcdef";
const MIN_DURATION = 1.6;

const randomHex = () => HEX[Math.floor(Math.random() * HEX.length)];

/**
 * First visit per session: a hash resolves into the wordmark while a counter
 * runs to 100, then the screen splits open. An inline script in the layout
 * hides it before paint on repeat visits and for reduced motion.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const finishedRef = useRef(false);

  // Lenis is created after first paint; keep the page still while the preloader is up.
  useEffect(() => {
    lenisRef.current = lenis;
    if (lenis && !finishedRef.current && !document.documentElement.classList.contains("skip-preloader")) lenis.stop();
  }, [lenis]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const html = document.documentElement;
    if (html.classList.contains("skip-preloader") || prefersReducedMotion()) {
      finishedRef.current = true;
      root.style.display = "none";
      markPreloaderDone();
      return;
    }

    const counter = counterRef.current!;
    const word = wordRef.current!;
    const progress = { value: 0, scramble: 0 };

    const render = () => {
      counter.textContent = String(Math.round(progress.value)).padStart(3, "0");
      const resolved = Math.floor(progress.scramble * WORD.length);
      word.textContent = WORD.split("")
        .map((char, i) => (i < resolved ? char : randomHex()))
        .join("");
    };

    const tl = gsap.timeline({ onUpdate: render });
    tl.to(progress, { value: 86, scramble: 0.6, duration: MIN_DURATION, ease: "power2.inOut" });

    // Fonts and the window load event decide when we can finish.
    const ready = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener("load", resolve, { once: true })),
    ]);

    let cancelled = false;
    ready.then(() => {
      if (cancelled) return;
      tl.to(progress, { value: 100, scramble: 1, duration: 0.5, ease: "power2.out" })
        .to(lineRef.current, { scaleX: 1, duration: 0.6, ease: "jade" }, "-=0.1")
        .to(contentRef.current, { autoAlpha: 0, y: -12, duration: 0.35, ease: "power2.in" })
        .to(topRef.current, { yPercent: -100, duration: 1, ease: "jade" }, "-=0.05")
        .to(bottomRef.current, { yPercent: 100, duration: 1, ease: "jade" }, "<")
        .to(lineRef.current, { autoAlpha: 0, duration: 0.2 }, "<")
        // Hand over to the hero slightly before the panels finish moving.
        .add(() => {
          html.classList.add("skip-preloader");
          markPreloaderDone();
        }, "-=0.5")
        .add(() => {
          finishedRef.current = true;
          root.style.display = "none";
          try {
            sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
          } catch {}
          lenisRef.current?.start();
        });
    });

    return () => {
      cancelled = true;
      tl.kill();
    };
  }, []);

  return (
    <div ref={rootRef} data-preloader aria-hidden className="fixed inset-0 z-preloader">
      <div ref={topRef} className="absolute inset-x-0 top-0 h-1/2 bg-forest" />
      <div ref={bottomRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-forest" />
      <div ref={lineRef} className="absolute inset-x-0 top-1/2 h-px origin-left scale-x-0 bg-jade" />
      <div ref={contentRef} className="absolute inset-0 px-gutter text-paper">
        <span
          ref={wordRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(100%+1.25rem)] font-display text-h1 font-bold tracking-tight whitespace-nowrap"
        >
          {WORD}
        </span>
        <span className="absolute bottom-8 left-[var(--gutter)] font-mono text-xs text-subtle">
          <span ref={counterRef}>000</span> / 100
        </span>
        <span className="absolute right-[var(--gutter)] bottom-8 font-mono text-xs text-subtle">
          Verifying ledger
        </span>
      </div>
    </div>
  );
}
