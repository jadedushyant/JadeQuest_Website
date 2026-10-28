import { mainNav } from "@/content/navigation";
import type { NavLink } from "@/content/types";

const extraRoutes: Record<string, string> = {
  "/": "Home",
  "/contact": "Contact",
  "/careers": "Careers",
  "/case-studies": "Work",
  "/styleguide": "Styleguide",
  "/styleguide/motion": "Motion",
};

function collect(links: NavLink[], into: Map<string, string>) {
  for (const link of links) {
    if (!into.has(link.href)) into.set(link.href, link.label);
    if (link.children) collect(link.children, into);
  }
  return into;
}

const labels = collect(mainNav, new Map(Object.entries(extraRoutes)));

/** Human label for a route, used by the page transition title. */
export function getRouteLabel(href: string) {
  const path = href.split(/[?#]/)[0] || "/";
  const known = labels.get(path);
  if (known) return known;
  const last = path.split("/").filter(Boolean).pop() ?? "";
  return last.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}
