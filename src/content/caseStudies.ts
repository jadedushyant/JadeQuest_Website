import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "credential-verification-infrastructure",
    title: "Zero-Exposure Credential Verification Infrastructure",
    sector: "Government & Higher Education",
    summary: "SHA-256 Merkle proofs on permissioned ledgers for diploma and certificate checks.",
    result: "Diploma verification in under 2 seconds",
    tech: ["Hyperledger Fabric", "Merkle Proofs", "Computer Vision"],
    industries: ["education", "government"],
    products: ["justifai"],
  },
  {
    slug: "port-logistics-orchestration",
    title: "Intermodal Port Clearance & Maritime Telemetry Platform",
    sector: "Logistics",
    summary: "A shared Hyperledger Fabric network for terminal operators, customs and carriers.",
    result: "Reduced terminal gate dwell time",
    tech: ["Hyperledger Fabric", "IoT Telematics", "EDI"],
    industries: ["logistics"],
    products: ["portchain"],
  },
  {
    slug: "b2b-marketplace-escrow",
    title: "B2B Wholesale Marketplace & Milestone Escrow Rails",
    sector: "Commerce & FinTech",
    summary: "A multi-tenant procurement marketplace with RFQ bidding, KYC and milestone escrow.",
    result: "End-to-end escrowed B2B procurement",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    industries: ["banking-finance"],
    products: ["jaxmart"],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
