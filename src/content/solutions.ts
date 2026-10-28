import type { Solution } from "./types";

export const solutions: Solution[] = [
  {
    slug: "document-verification",
    title: "Document Verification",
    summary:
      "Tamper-evident checks for certificates, diplomas and official documents: hashes anchored to a permissioned ledger and verified in seconds.",
    products: ["justifai"],
    industries: ["education", "government", "healthcare"],
  },
  {
    slug: "blockchain-for-education",
    title: "Blockchain for Education",
    summary: "Exam management, results and certificates that institutions, employers and students can all verify.",
    products: ["jadeedu", "justifai", "smp"],
    industries: ["education"],
  },
  {
    slug: "government-e-governance",
    title: "Government & E-Governance",
    summary: "Registries, courts, municipal rights and carbon accounting built on shared, auditable records.",
    products: ["jadeledger", "jadecourt", "etdr", "bharatcarbon"],
    industries: ["government", "real-estate"],
  },
  {
    slug: "b2b-marketplaces",
    title: "B2B Marketplaces",
    summary: "Wholesale procurement with RFQ bidding, merchant KYC and milestone escrow.",
    products: ["jaxmart", "smp"],
    industries: ["banking-finance"],
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
