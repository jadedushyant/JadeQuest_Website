import { TransitionLink } from "@/components/layout";
import { Tag } from "@/components/ui";
import type { Product } from "@/content";
import { cn } from "@/lib/cn";

/** Compact product card used in grids and "related" lists. */
export function ProductCard({ product, className }: { product: Product; className?: string }) {
  return (
    <TransitionLink
      href={`/products/${product.slug}`}
      data-cursor="view"
      className={cn(
        "group flex h-full flex-col gap-5 rounded-card border border-[var(--line)] bg-[var(--card)] p-6 transition-colors hover:border-[var(--fg-subtle)] md:p-7",
        className,
      )}
    >
      <span className="text-sm text-[var(--fg-subtle)]">{product.category}</span>
      <span className="flex items-baseline justify-between gap-4">
        <span className="font-display text-h3 font-semibold">{product.name}</span>
        <span aria-hidden className="text-[var(--accent)] transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
      <span className="text-[var(--fg-muted)]">{product.tagline}</span>
      <span className="mt-auto flex flex-wrap gap-2">
        {product.stack.slice(0, 3).map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </span>
    </TransitionLink>
  );
}

type RowLinkProps = {
  href: string;
  index: number;
  title: string;
  text?: string;
  meta?: string;
};

/** Full-width list row: index, title, short text. Used on index pages. */
export function RowLink({ href, index, title, text, meta }: RowLinkProps) {
  return (
    <TransitionLink
      href={href}
      className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-t border-[var(--line)] py-7 md:grid-cols-[3.5rem_1fr_1fr_auto] md:gap-8"
    >
      <span className="font-mono text-xs text-[var(--fg-subtle)]">{String(index + 1).padStart(2, "0")}</span>
      <span className="font-display text-h2 font-semibold transition-transform duration-500 ease-[var(--ease-expo-out)] group-hover:translate-x-2">
        {title}
      </span>
      <span className="col-start-2 text-[var(--fg-muted)] md:col-start-auto">
        {text}
        {meta && <span className="mt-2 block text-sm text-[var(--fg-subtle)]">{meta}</span>}
      </span>
      <span
        aria-hidden
        className="row-start-1 text-xl text-[var(--accent)] transition-transform group-hover:-rotate-45 md:row-start-auto"
        style={{ gridColumnStart: -2 }}
      >
        →
      </span>
    </TransitionLink>
  );
}
