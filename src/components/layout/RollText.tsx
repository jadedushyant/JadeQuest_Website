import { cn } from "@/lib/cn";

/**
 * Text that rolls up to a copy of itself on hover of the nearest `.group`.
 * The copy is hidden from assistive tech.
 */
export function RollText({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn("relative inline-flex overflow-hidden", className)}>
      <span className="block transition-transform duration-300 ease-[var(--ease-expo-out)] group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-x-0 top-full block transition-transform duration-300 ease-[var(--ease-expo-out)] group-hover:-translate-y-full group-focus-visible:-translate-y-full"
      >
        {children}
      </span>
    </span>
  );
}
