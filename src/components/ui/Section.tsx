import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/cn";

type SectionProps = ComponentPropsWithRef<"section"> & {
  theme?: "dark" | "light" | "stone";
  spacing?: "none" | "sm" | "md";
  grain?: boolean;
};

const spacings = {
  none: "",
  sm: "py-16 md:py-24",
  md: "py-section",
};

/** Page section. `data-theme` drives colors and, later, header/cursor theme switching. */
export function Section({ theme = "dark", spacing = "md", grain, className, ...props }: SectionProps) {
  return (
    <section data-theme={theme} className={cn("relative", spacings[spacing], grain && "grain", className)} {...props} />
  );
}
