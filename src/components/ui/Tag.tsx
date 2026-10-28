import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type TagProps = ComponentPropsWithoutRef<"span"> & { tone?: "default" | "accent" };

export function Tag({ tone = "default", className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-tag px-2.5 py-1 text-xs font-medium",
        tone === "accent"
          ? "bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent)]"
          : "bg-[color-mix(in_srgb,var(--fg)_7%,transparent)] text-[var(--fg-muted)]",
        className,
      )}
      {...props}
    />
  );
}
