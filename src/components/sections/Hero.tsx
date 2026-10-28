"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Magnetic } from "@/components/motion";
import { LedgerPoster } from "@/components/three/LedgerPoster";
import { createLedgerUniforms } from "@/components/three/ledgerUniforms";
import { ArrowIcon, Button, Container, Eyebrow } from "@/components/ui";
import { company } from "@/content";
import { prefersReducedMotion, useFinePointer } from "@/hooks/useMediaQuery";
import { gsap, SplitText, useGSAP } from "@/lib/motion/gsap";
import { onPreloaderDone } from "@/lib/motion/preloader";
import { cn } from "@/lib/cn";

const LedgerField = dynamic(() => import("@/components/three/LedgerField"), { ssr: false });

type Status = "idle" | "holding" | "verified";

const RING_LENGTH = 2 * Math.PI * 19;
const HOLD_SECONDS = 1.6;
/** Releasing after this long counts as a full hold, whatever the frame rate did */
const VERIFY_AFTER = 1;

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function randomHash() {
  const hex = Array.from(crypto.getRandomValues(new Uint8Array(32)), (b) => b.toString(16).padStart(2, "0")).join("");
  return `0x${hex.slice(0, 4)}…${hex.slice(-4)}`;
}

/**
 * Home hero: "The Living Ledger". A WebGL grid of ledger blocks reacts to the
 * pointer; press and hold (or hold Space on the button) to compress it, and
 * release to watch it settle into a Merkle tree.
 */
export function Hero() {
  const { hero } = company;
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const shockRef = useRef<HTMLDivElement>(null);
  const holdTween = useRef<gsap.core.Tween | null>(null);
  const resetCall = useRef<gsap.core.Tween | null>(null);
  const holdStart = useRef(0);

  const uniforms = useMemo(() => createLedgerUniforms(), []);
  const finePointer = useFinePointer();
  const [webgl, setWebgl] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [hash, setHash] = useState("");
  const statusRef = useRef<Status>("idle");
  statusRef.current = status;

  useEffect(() => {
    setWebgl(!prefersReducedMotion() && hasWebGL());
  }, []);

  // Stop rendering the canvas while the hero is off screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ---------------------------------------------------------------- intro + scroll-out
  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const q = gsap.utils.selector(sectionRef);
      const lines = q<HTMLElement>("[data-hero-line]");
      const split = SplitText.create(lines, { type: "words", mask: "words" });

      gsap.set(q("[data-reveal]"), { autoAlpha: 1 });
      gsap.set(split.words, { yPercent: reduced ? 0 : 110, autoAlpha: reduced ? 0 : 1 });
      gsap.set(q("[data-hero-fade]"), { autoAlpha: 0, y: reduced ? 0 : 24 });

      const intro = gsap.timeline({ paused: true });
      intro
        .to(uniforms.uIntro, { value: 1, duration: 2.2, ease: "expo.out" }, 0)
        .to(posterRef.current, { autoAlpha: webgl ? 0.25 : 1, duration: 1.2 }, 0)
        .to(split.words, { yPercent: 0, autoAlpha: 1, duration: 1, ease: "expo.out", stagger: 0.035 }, 0.15)
        .to(q("[data-hero-fade]"), { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 }, 0.55);

      const unsubscribe = onPreloaderDone(() => intro.play());

      if (!reduced) {
        const scrollOut = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });
        scrollOut
          .to(uniforms.uScroll, { value: 1, ease: "none" }, 0)
          .to(frameRef.current, { scale: 0.92, borderRadius: 28, ease: "none" }, 0)
          .to(lines[0], { yPercent: -60, ease: "none" }, 0)
          .to(lines[1], { yPercent: -35, ease: "none" }, 0)
          .to(lines[2], { yPercent: -15, ease: "none" }, 0)
          .to(q("[data-hero-content]"), { autoAlpha: 0.15, ease: "none" }, 0);
      }

      return () => {
        unsubscribe();
        split.revert();
      };
    },
    // Re-runs once WebGL is detected; revert first so words aren't split twice.
    { scope: sectionRef, dependencies: [webgl], revertOnUpdate: true },
  );

  // ---------------------------------------------------------------- hold to verify
  const setRing = useCallback((progress: number) => {
    progressRef.current?.setAttribute("stroke-dashoffset", String(RING_LENGTH * (1 - progress)));
  }, []);

  const burst = useCallback(() => {
    setStatus("verified");
    setHash(randomHash());
    holdTween.current?.kill();

    gsap.timeline()
      .to(uniforms.uHold, { value: 0, duration: 0.3, ease: "power2.out", onUpdate: () => setRing(uniforms.uHold.value) }, 0)
      .to(uniforms.uBurst, { value: 1, duration: 1.4, ease: "elastic.out(1, 0.65)" }, 0)
      .fromTo(
        shockRef.current,
        { scale: 0, autoAlpha: 0.9 },
        { scale: 1, autoAlpha: 0, duration: 1.3, ease: "expo.out" },
        0,
      );

    // Return to the grid after a moment so it can be played again.
    resetCall.current = gsap.delayedCall(3.4, () => {
      gsap.to(uniforms.uBurst, {
        value: 0,
        duration: 1.6,
        ease: "jade",
        onComplete: () => setStatus("idle"),
      });
    });
  }, [setRing, uniforms]);

  const startHold = useCallback(() => {
    if (statusRef.current !== "idle" || !webgl) return;
    setStatus("holding");
    holdStart.current = performance.now();
    holdTween.current?.kill();
    holdTween.current = gsap.to(uniforms.uHold, {
      value: 1,
      duration: HOLD_SECONDS,
      ease: "power2.in",
      onUpdate: () => setRing(uniforms.uHold.value),
    });
  }, [setRing, uniforms, webgl]);

  const releaseHold = useCallback(() => {
    if (statusRef.current !== "holding") return;
    holdTween.current?.kill();
    const heldFor = (performance.now() - holdStart.current) / 1000;
    if (heldFor >= VERIFY_AFTER || uniforms.uHold.value > 0.6) return burst();
    setStatus("idle");
    gsap.to(uniforms.uHold, {
      value: 0,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => setRing(uniforms.uHold.value),
    });
  }, [burst, setRing, uniforms]);

  useEffect(() => {
    window.addEventListener("pointerup", releaseHold);
    window.addEventListener("pointercancel", releaseHold);
    return () => {
      window.removeEventListener("pointerup", releaseHold);
      window.removeEventListener("pointercancel", releaseHold);
      resetCall.current?.kill();
    };
  }, [releaseHold]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest("a, button:not([data-hold])")) return;
    startHold();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === " " || e.key === "Enter") && !e.repeat) {
      e.preventDefault();
      startHold();
    }
  };
  const onKeyUp = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      releaseHold();
    }
  };

  const hintLabel =
    status === "holding" ? "Keep holding…" : status === "verified" ? "Proof verified" : "Hold to verify";

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      aria-labelledby="hero-title"
      className="relative !bg-paper"
    >
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onContextMenu={(e) => status === "holding" && e.preventDefault()}
        className={cn("grain relative min-h-svh overflow-hidden bg-forest", status === "holding" && "select-none")}
      >
        <div ref={posterRef} className="absolute inset-0">
          <LedgerPoster />
        </div>
        {webgl && <LedgerField uniforms={uniforms} trackRef={frameRef} active={onScreen} lite={!finePointer} />}

        {/* Keeps the copy readable over the field */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-forest via-forest/80 to-transparent"
        />
        <div
          ref={shockRef}
          aria-hidden
          className="pointer-events-none invisible absolute top-1/2 left-1/2 -mt-[45vmax] -ml-[45vmax] size-[90vmax] rounded-full border border-jade"
        />

        <Container
          data-hero-content
          className="relative flex min-h-svh flex-col justify-end gap-8 pt-[calc(var(--header-h)+3rem)] pb-8 md:gap-10 md:pb-10"
        >
          <div data-hero-fade className="flex items-center justify-between">
            <Eyebrow index={1}>{hero.eyebrow}</Eyebrow>
            <span className="hidden items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-subtle uppercase md:flex">
              Scroll
              <span className="relative h-8 w-px overflow-hidden bg-line">
                <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2s_var(--ease-jade)_infinite] bg-paper" />
              </span>
            </span>
          </div>

          <h1 id="hero-title" data-reveal className="text-hero font-display font-bold">
            {hero.lines.map((line) => (
              <span key={line} data-hero-line className="block">
                {line}
              </span>
            ))}
          </h1>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <p data-hero-fade className="max-w-[54ch] text-lead text-[var(--fg-muted)]">
              {hero.body}
            </p>
            <div data-hero-fade className="flex flex-wrap gap-3">
              <Magnetic>
                <Button href={hero.primaryCta.href} size="lg" icon={<ArrowIcon />}>
                  {hero.primaryCta.label}
                </Button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Button href={hero.secondaryCta.href} variant="ghost" size="lg">
                  {hero.secondaryCta.label}
                </Button>
              </Magnetic>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-6 border-t border-[var(--line)] pt-6 md:flex-row md:items-center md:justify-between">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-[var(--fg-subtle)] md:flex md:gap-10">
              {hero.chips.map((chip) => (
                <li key={chip} data-hero-fade>
                  {chip}
                </li>
              ))}
            </ul>

            {webgl && (
              <button
                type="button"
                data-hold
                data-hero-fade
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onBlur={releaseHold}
                aria-describedby="hold-help"
                className="group flex items-center gap-3 self-start text-left text-sm md:self-auto"
              >
                <svg viewBox="0 0 44 44" aria-hidden className="size-11 -rotate-90">
                  <circle cx="22" cy="22" r="19" fill="none" stroke="var(--line)" strokeWidth="1.5" />
                  <circle
                    ref={progressRef}
                    cx="22"
                    cy="22"
                    r="19"
                    fill="none"
                    stroke="var(--color-jade)"
                    strokeWidth="1.5"
                    strokeDasharray={RING_LENGTH}
                    strokeDashoffset={RING_LENGTH}
                  />
                  <circle
                    cx="22"
                    cy="22"
                    r="3"
                    className={cn(
                      "transition-colors",
                      status === "verified" ? "fill-jade" : "fill-paper group-hover:fill-jade",
                    )}
                  />
                </svg>
                <span className="flex flex-col">
                  <span className="font-medium">{hintLabel}</span>
                  <span className="font-mono text-[11px] text-[var(--fg-subtle)]">
                    {status === "verified" ? hash : "Press and hold anywhere"}
                  </span>
                </span>
              </button>
            )}
            <p id="hold-help" className="sr-only">
              Hold Space or Enter to compress the ledger, then release to see it verified as a Merkle tree.
            </p>
            <p aria-live="polite" className="sr-only">
              {status === "verified" ? `Proof verified, hash ${hash}` : ""}
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
