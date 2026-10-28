"use client";

import { Magnetic, useLenis } from "@/components/motion";

export function BackToTop() {
  const lenis = useLenis();
  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0 });
    document.querySelector<HTMLElement>("a[href='#main']")?.focus({ preventScroll: true });
  };

  return (
    <Magnetic strength={0.3}>
      <button
        type="button"
        onClick={toTop}
        className="group inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
      >
        <span data-magnetic-label>Back to top</span>
        <svg viewBox="0 0 16 16" aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5">
          <path d="M8 13V3M4 7l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </button>
    </Magnetic>
  );
}
