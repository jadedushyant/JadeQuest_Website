import { industries } from "./industries";
import { products } from "./products";
import { services } from "./services";
import type { NavLink } from "./types";

export const mainNav: NavLink[] = [
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({ label: s.shortTitle, href: `/services/${s.slug}` })),
  },
  {
    label: "Products",
    href: "/products",
    children: products.map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
  },
  {
    label: "Industries",
    href: "/industries",
    children: industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
  },
  { label: "Work", href: "/case-studies" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Company", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Events", href: "/events" },
    ],
  },
];

export const solutionsNav: NavLink[] = [
  { label: "Document Verification", href: "/solutions/document-verification" },
  { label: "Blockchain for Education", href: "/solutions/blockchain-for-education" },
  { label: "Government & E-Governance", href: "/solutions/government-e-governance" },
  { label: "B2B Marketplaces", href: "/solutions/b2b-marketplaces" },
];

export const contactCta: NavLink = { label: "Let's talk", href: "/contact" };
