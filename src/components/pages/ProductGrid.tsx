"use client";

import { useRef, useState } from "react";
import { industries, products, type IndustrySlug } from "@/content";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { Flip, gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/cn";
import { ProductCard } from "./cards";

type Filter = IndustrySlug | "all";

/** All products with industry filters. Cards rearrange with a Flip animation. */
export function ProductGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const select = (next: Filter) => {
    if (next === filter) return;
    if (!prefersReducedMotion()) {
      flipState.current = Flip.getState(ref.current!.querySelectorAll("[data-card], [data-pill-bg]"));
    }
    setFilter(next);
  };

  useGSAP(
    () => {
      const state = flipState.current;
      if (!state) return;
      flipState.current = null;
      Flip.from(state, {
        duration: 0.7,
        ease: "jade",
        absolute: true,
        stagger: 0.03,
        targets: ref.current!.querySelectorAll("[data-card], [data-pill-bg]"),
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 }),
      });
    },
    { scope: ref, dependencies: [filter] },
  );

  const visible = products.filter((p) => filter === "all" || p.industries.includes(filter));
  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    ...industries.map((i) => ({ value: i.slug, label: i.name.split(" ")[0] })),
  ];

  return (
    <div ref={ref} className="flex flex-col gap-10">
      <div role="group" aria-label="Filter by industry" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => select(f.value)}
            className={cn(
              "relative h-10 rounded-button border px-4 text-sm transition-colors",
              filter === f.value
                ? "border-transparent text-[var(--on-accent)]"
                : "border-[var(--line)] text-[var(--fg-muted)] hover:text-[var(--fg)]",
            )}
          >
            {filter === f.value && (
              <span data-pill-bg data-flip-id="pill" aria-hidden className="absolute inset-0 rounded-button bg-[var(--accent)]" />
            )}
            <span className="relative">{f.label}</span>
          </button>
        ))}
      </div>

      <p aria-live="polite" className="text-sm text-[var(--fg-subtle)]">
        {visible.length} {visible.length === 1 ? "platform" : "platforms"}
      </p>

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li key={p.slug} data-card data-flip-id={p.slug}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
