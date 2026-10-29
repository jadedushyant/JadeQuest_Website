"use client";

import { useRef, type ReactNode, type MouseEvent, type ElementType, type ComponentPropsWithoutRef } from "react";
import { gsap } from "@/lib/animations";
import { useReducedMotion } from "@/lib/animations/reducedMotion";
import { cn } from "@/lib/cn";

interface MagneticButtonProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: ElementType;
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  as: Component = "div",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const bounds = ref.current.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(ref.current, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (reducedMotion || !ref.current) return;

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    });
  };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("inline-block transition-transform duration-150", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
