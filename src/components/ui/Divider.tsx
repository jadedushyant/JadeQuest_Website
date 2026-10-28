import { cn } from "@/lib/cn";

/** 1px hairline. The Phase 2 LineDraw effect scales it in from the left. */
export function Divider({ className }: { className?: string }) {
  return <hr className={cn("h-px w-full origin-left border-0 bg-[var(--line,var(--color-line))]", className)} />;
}
