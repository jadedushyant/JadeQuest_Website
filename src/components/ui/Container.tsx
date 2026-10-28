import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: "default" | "wide" | "narrow";
} & ComponentPropsWithoutRef<T>;

const sizes = {
  narrow: "max-w-[960px]",
  default: "max-w-[var(--container-max)]",
  wide: "max-w-[1920px]",
};

export function Container<T extends ElementType = "div">({
  as,
  size = "default",
  className,
  ...props
}: ContainerProps<T>) {
  const Tag = as ?? "div";
  return <Tag className={cn("mx-auto w-full px-gutter", sizes[size], className)} {...props} />;
}
