"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { DURATION, EASE, REVEAL_START } from "@/lib/motion/constants";
import { gsap, SplitText, useGSAP } from "@/lib/motion/gsap";
import { onPreloaderDone } from "@/lib/motion/preloader";

type RevealTextProps = {
  as?: ElementType;
  /** Unit that animates. Each line is always masked. */
  split?: "lines" | "words" | "chars";
  stagger?: number;
  delay?: number;
  duration?: number;
  /** Play on load instead of on scroll (page titles). Waits for the preloader. */
  immediate?: boolean;
  start?: string;
  className?: string;
  id?: string;
  children: ReactNode;
};

const defaultStagger = { lines: 0.08, words: 0.03, chars: 0.012 };

/** Masked text reveal: each line/word/char rises out of its line mask. */
export function RevealText({
  as: Tag = "div",
  split = "lines",
  stagger,
  delay = 0,
  duration = DURATION.reveal,
  immediate = false,
  start = REVEAL_START,
  className,
  id,
  children,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const scrollTrigger = immediate ? undefined : { trigger: el, start, once: true };

      if (prefersReducedMotion()) {
        gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, delay, ease: "none", scrollTrigger });
        return;
      }

      // Immediate reveals stay paused until the preloader has gone.
      let ready = !immediate;
      let tween: gsap.core.Tween | undefined;
      gsap.set(el, { autoAlpha: 1 });
      SplitText.create(el, {
        type: split === "lines" ? "lines" : `lines,${split}`,
        mask: "lines",
        autoSplit: true,
        // Returning the tween lets SplitText resume it after a re-split on resize.
        onSplit: (self) => {
          tween = gsap.from(self[split], {
            yPercent: 110,
            duration,
            delay,
            ease: EASE.out,
            stagger: stagger ?? defaultStagger[split],
            scrollTrigger,
            paused: !ready,
          });
          return tween;
        },
      });
      if (!immediate) return;
      return onPreloaderDone(() => {
        ready = true;
        tween?.play();
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} data-reveal className={className}>
      {children}
    </Tag>
  );
}
