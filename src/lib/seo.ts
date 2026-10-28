import type { Metadata } from "next";
import { company } from "@/content";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jadequest.com").replace(/\/$/, "");

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/services/cloud-devops" */
  path: string;
};

/**
 * Page metadata with a canonical URL and matching Open Graph / Twitter tags.
 * Social images come from the nearest opengraph-image file.
 */
export function pageMeta({ title, description, path }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${company.name}`,
      description,
      url: path,
      siteName: company.name,
      type: "website",
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: `${title} | ${company.name}`, description, site: "@JadeQuest" },
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: company.name,
  legalName: company.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/jadequest-logo.png`,
  email: company.contact.email,
  telephone: company.contact.phone.replace(/\s/g, ""),
  description: `${company.tagline} ${company.description}`,
  sameAs: company.socials.filter((s) => !s.href.startsWith("https://wa.me")).map((s) => s.href),
  areaServed: ["IN", "AE", "VN"],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: company.name,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

/** Reference to the organization node, for use inside other schemas. */
export const orgRef = { "@id": `${SITE_URL}/#organization` };
