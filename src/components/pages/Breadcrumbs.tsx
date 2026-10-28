import { TransitionLink } from "@/components/layout";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={ld} />
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--fg-subtle)]">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {item.href ? (
              <TransitionLink href={item.href} className="transition-colors hover:text-[var(--fg)]">
                {item.label}
              </TransitionLink>
            ) : (
              <span aria-current="page" className="text-[var(--fg-muted)]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
