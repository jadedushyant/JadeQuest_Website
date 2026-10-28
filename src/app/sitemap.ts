import type { MetadataRoute } from "next";
import { caseStudies, industries, products, services, solutions } from "@/content";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });

  return [
    entry("/", 1),
    ...["/services", "/products", "/industries", "/solutions", "/case-studies"].map((p) => entry(p, 0.9)),
    ...["/about", "/careers", "/contact"].map((p) => entry(p, 0.7)),
    ...["/blog", "/events"].map((p) => entry(p, 0.4)),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.8)),
    ...products.map((p) => entry(`/products/${p.slug}`, 0.8)),
    ...industries.map((i) => entry(`/industries/${i.slug}`, 0.7)),
    ...solutions.map((s) => entry(`/solutions/${s.slug}`, 0.7)),
    ...caseStudies.map((c) => entry(`/case-studies/${c.slug}`, 0.7)),
  ];
}
