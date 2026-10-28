import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type CardProps<T extends ElementType> = {
  as?: T;
  raised?: boolean;
} & ComponentPropsWithoutRef<T>;

/** Surface with a 1px border. No glow, no heavy shadow. */
export function Card<T extends ElementType = "div">({ as, raised, className, ...props }: CardProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={cn(
        "rounded-card border border-[var(--line)] p-6 md:p-8",
        raised ? "bg-surface-raised" : "bg-[var(--card)]",
        className,
      )}
      {...props}
    />
  );
}
