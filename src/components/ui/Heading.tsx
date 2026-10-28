import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type HeadingSize = "hero" | "display" | "h1" | "h2" | "h3" | "h4";

type HeadingProps = ComponentPropsWithoutRef<"h2"> & {
  as?: HeadingLevel;
  size?: HeadingSize;
};

// Sentence case everywhere. Oversized type is kept for the hero and a few statements.
const sizes: Record<HeadingSize, string> = {
  hero: "text-hero font-display font-bold",
  display: "text-display font-display font-semibold",
  h1: "text-h1 font-display font-semibold",
  h2: "text-h2 font-display font-semibold",
  h3: "text-h3 font-sans font-semibold tracking-tight",
  h4: "text-h4 font-sans font-medium",
};

/** Semantic level (`as`) and visual size (`size`) are independent. */
export function Heading({ as = "h2", size, className, ...props }: HeadingProps) {
  const Tag = as;
  return <Tag className={cn("text-balance", sizes[size ?? as], className)} {...props} />;
}
