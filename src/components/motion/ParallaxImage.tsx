"use client";

import Image, { type ImageProps } from "next/image";
import { useRef } from "react";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/cn";

type ParallaxImageProps = Omit<ImageProps, "fill" | "width" | "height"> & {
  /** 0–0.5. How far the image drifts inside its frame while scrolling past. */
  speed?: number;
  /** Clip-path reveal when the frame first enters the viewport */
  reveal?: boolean;
  frameClassName?: string;
};

/** Image in a fixed frame that drifts slower than the page. The frame sets the size. */
export function ParallaxImage({
  speed = 0.15,
  reveal = true,
  frameClassName,
  className,
  alt,
  sizes = "100vw",
  ...props
}: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const frame = frameRef.current;
      const inner = innerRef.current;
      if (!frame || !inner) return;

      const drift = speed * 100;
      gsap.fromTo(
        inner,
        { yPercent: -drift / 2 },
        {
          yPercent: drift / 2,
          ease: "none",
          scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      if (reveal) {
        gsap.from(frame, {
          clipPath: "inset(12% 8% 12% 8% round 14px)",
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: frame, start: "top 85%", once: true },
        });
      }
    },
    { scope: frameRef },
  );

  return (
    <div ref={frameRef} className={cn("relative overflow-hidden rounded-card", frameClassName)}>
      {/* Taller than the frame so the drift never shows an edge */}
      <div ref={innerRef} className="absolute inset-x-0" style={{ top: `-${speed * 50}%`, bottom: `-${speed * 50}%` }}>
        <Image fill alt={alt} sizes={sizes} className={cn("object-cover", className)} {...props} />
      </div>
    </div>
  );
}
