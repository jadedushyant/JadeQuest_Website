import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { TransitionLink } from "@/components/layout/PageTransition";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "link";
type Size = "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof TransitionLink>, keyof BaseProps | "href">;
type ButtonAsButton = BaseProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps>;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

// Colors come from the section theme: jade on forest, deep jade on paper.
const variants: Record<Variant, string> = {
  primary: "rounded-button bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-hover)]",
  ghost: "rounded-button border border-[var(--line)] text-[var(--fg)] hover:border-[var(--fg-muted)]",
  link: "link-draw text-[var(--accent)] [--link-rest:35%]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-6 text-base",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, className, children } = props;
  // data-magnetic / data-cursor hooks are consumed by the Phase 2 motion engine.
  const classes = cn(
    "group relative inline-flex items-center justify-center gap-3 font-medium whitespace-nowrap",
    "transition-colors duration-[var(--duration-fast)] ease-out",
    variant !== "link" && sizes[size],
    variants[variant],
    className,
  );
  const roll = "transition-transform duration-500 ease-[var(--ease-expo-out)]";
  // Label rolls up to a copy of itself; the arrow slides out and a fresh one slides in.
  const content = (
    <>
      <span className="relative inline-flex overflow-hidden" data-magnetic-label>
        <span className={cn("block", variant !== "link" && cn(roll, "group-hover:-translate-y-full"))}>{children}</span>
        {variant !== "link" && (
          <span aria-hidden className={cn("absolute inset-x-0 top-full block", roll, "group-hover:-translate-y-full")}>
            {children}
          </span>
        )}
      </span>
      {icon && (
        <span className="relative inline-flex overflow-hidden">
          <span className={cn("inline-flex", roll, "group-hover:translate-x-[160%]")}>{icon}</span>
          <span aria-hidden className={cn("absolute inset-0 inline-flex -translate-x-[160%]", roll, "group-hover:translate-x-0")}>
            {icon}
          </span>
        </span>
      )}
    </>
  );

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, size: _s, icon: _i, className: _c, children: _ch, ...rest } = props;
    return (
      <TransitionLink className={classes} data-cursor="link" {...rest}>
        {content}
      </TransitionLink>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, icon: _i, className: _c, children: _ch, type = "button", ...rest } = props;
  return (
    <button type={type} className={classes} data-cursor="link" {...rest}>
      {content}
    </button>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={cn("size-4", className)}>
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}
