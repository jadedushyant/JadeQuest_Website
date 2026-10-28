import type { ComponentPropsWithoutRef } from "react";
import { Scramble } from "@/components/motion/Scramble";
import { cn } from "@/lib/cn";

type EyebrowProps = ComponentPropsWithoutRef<"p"> & {
  /** Renders as "01 —" before the label */
  index?: number;
};

export function Eyebrow({ index, className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-subtle,var(--color-subtle))]",
        className,
      )}
      {...props}
    >
      {index !== undefined && (
        <span className="text-[var(--accent,var(--color-jade))]">
          {String(index).padStart(2, "0")} <span aria-hidden>—</span>
        </span>
      )}
      <span>{typeof children === "string" ? <Scramble text={children} /> : children}</span>
    </p>
  );
}
