export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  /** Shown as a featured card on the home page */
  featured?: {
    headline: string;
    description: string;
    deliverables: string[];
  };
  tags: string[];
  /** For services without a featured card */
  deliverables?: string[];
  /** Product slugs built with this service */
  products?: string[];
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  stack: string[];
  industries: IndustrySlug[];
  /** Steps of how the platform works, drawn as a flow diagram */
  flow: string[];
};

export type IndustrySlug =
  | "healthcare"
  | "banking-finance"
  | "education"
  | "logistics"
  | "manufacturing"
  | "real-estate"
  | "government";

export type Industry = {
  slug: IndustrySlug;
  name: string;
  summary: string;
  highlights: string[];
  products: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  summary: string;
  result: string;
  tech: string[];
  industries: IndustrySlug[];
  products: string[];
};

export type Solution = {
  slug: string;
  title: string;
  summary: string;
  products: string[];
  industries: IndustrySlug[];
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Pads the number for display, e.g. 4 → "04" */
  pad?: number;
  label: string;
};

export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};
