import type { Industry } from "./types";

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    summary: "Unified patient records, AI clinical decision support and compliant telemedicine.",
    highlights: ["HIPAA-style telemedicine", "HL7/FHIR gateways", "Practitioner credential checks"],
    products: ["justifai"],
  },
  {
    slug: "banking-finance",
    name: "Banking & FinTech",
    summary: "Digital banking, trade finance and programmable escrow.",
    highlights: ["Digital letters of credit", "Milestone escrow", "KYC workflows"],
    products: ["jadelc", "smp", "jaxmart"],
  },
  {
    slug: "education",
    name: "Education & EdTech",
    summary: "Exam management, school portals and certificate validation.",
    highlights: ["Exam & result management", "School portals", "Certificate verification"],
    products: ["jadeedu", "smp", "justifai"],
  },
  {
    slug: "logistics",
    name: "Logistics & Supply Chain",
    summary: "Port orchestration, cold-chain IoT and customs coordination.",
    highlights: ["Port clearance", "Cold-chain IoT", "Customs integration"],
    products: ["portchain", "agrisenti"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & Industry 4.0",
    summary: "Industrial IoT, predictive maintenance and carbon accounting.",
    highlights: ["Industrial IoT", "Predictive maintenance", "Carbon accounting"],
    products: ["bharatcarbon"],
  },
  {
    slug: "real-estate",
    name: "Real Estate & PropTech",
    summary: "Land title registries, development rights and title search.",
    highlights: ["Land title registry", "Transferable development rights", "Title search"],
    products: ["jadeledger", "etdr"],
  },
  {
    slug: "government",
    name: "Government & e-Governance",
    summary: "Sovereign digital infrastructure for registries, courts and municipalities.",
    highlights: ["Registries", "Digital courts", "Municipal workflows"],
    products: ["jadeledger", "jadecourt", "etdr", "bharatcarbon"],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
