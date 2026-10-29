import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "credential-verification-infrastructure",
    title: "Zero-Exposure Credential Verification Infrastructure",
    category: "Blockchain",
    sector: "Government & Higher Education",
    summary: "SHA-256 Merkle proofs on permissioned ledgers for diploma and certificate checks.",
    result: "Diploma verification in under 2 seconds",
    problem:
      "Accredited universities and state education ministries faced widespread credential falsification. Manual verification through registrars took 3 to 4 weeks, stalling overseas employment and graduate admissions.",
    solution:
      "JadeQuest engineered JustifAI—a consortium distributed ledger system utilizing Hyperledger Fabric. Certificates are hashed into SHA-256 Merkle roots and committed to an immutable ledger while all sensitive student PII remains encrypted in localized off-chain storage.",
    implementation: [
      "Consortium network topology connecting 40+ higher education institutions and government accreditation bodies",
      "Raft consensus orderers delivering deterministic sub-second block finality with zero crypto fees",
      "Audited Go chaincode enforcing multi-signatory registrar approvals before Merkle tree anchoring",
      "High-throughput QR and REST API verification endpoints capable of 10,000+ verification queries per second",
    ],
    outcomes: [
      "Credential verification turnaround reduced from 3 weeks to under 2 seconds",
      "100% elimination of fraudulent physical diploma submissions across participating institutions",
      "Zero student PII stored on shared ledgers, maintaining full GDPR and DPDP compliance",
    ],
    tech: ["Hyperledger Fabric", "Merkle Proofs", "Computer Vision", "Go"],
    industries: ["education", "government"],
    products: ["justifai"],
  },
  {
    slug: "port-logistics-orchestration",
    title: "Intermodal Port Clearance & Maritime Telemetry Platform",
    category: "Logistics",
    sector: "Logistics & Maritime",
    summary: "A shared Hyperledger Fabric network for terminal operators, customs and carriers.",
    result: "Reduced terminal gate dwell time by 38%",
    problem:
      "Deep-sea container terminals suffered from paper-heavy handoffs between customs brokers, shipping lines, rail operators, and terminal gates, causing severe congestion and truck idling.",
    solution:
      "JadeQuest built Portchain—an event-driven telemetry and intermodal clearance platform that unifies container manifests, optical gate OCR readings, and customs release statuses on a shared ledger.",
    implementation: [
      "Event-driven architecture ingesting EDIFACT manifests, IoT telematics, and optical character recognition gate cameras",
      "Permissioned smart contracts that automatically grant gate-out authorization when customs hold flags clear",
      "Multi-tenant carrier dashboard with real-time container dwell time telemetry and automated demurrage calculation",
      "High-availability Kubernetes deployment across regional cloud zones with sub-second failover",
    ],
    outcomes: [
      "38% reduction in terminal gate dwell time, saving hours of driver queue time daily",
      "Automated paperless clearance for over 150,000 TEUs in the first operational phase",
      "Tamper-proof audit logs preventing unauthorized container gate releases and cargo misplacement",
    ],
    tech: ["Hyperledger Fabric", "IoT Telematics", "EDI", "Kubernetes"],
    industries: ["logistics"],
    products: ["portchain"],
  },
  {
    slug: "b2b-marketplace-escrow",
    title: "B2B Wholesale Marketplace & Milestone Escrow Rails",
    category: "FinTech",
    sector: "Commerce & FinTech",
    summary: "A multi-tenant procurement marketplace with RFQ bidding, KYC and milestone escrow.",
    result: "End-to-end escrowed B2B procurement",
    problem:
      "Cross-border wholesale commodity traders suffered high counterparty risk, delayed letters of credit, and lack of verifiable milestone inspections before fund release.",
    solution:
      "JadeQuest delivered JaxMart—an enterprise procurement exchange featuring multi-currency escrow accounts, automated RFQ matching, and milestone-triggered payment disbursements.",
    implementation: [
      "Microservice architecture built with Next.js App Router, Node.js, and PostgreSQL with database schema isolation",
      "Audited milestone escrow custody with multi-sig release based on verified bill-of-lading and inspection certificates",
      "Automated enterprise KYC and anti-money laundering (AML) screening integration",
      "Comprehensive supplier analytics, contract lifecycle management, and real-time inventory tracking",
    ],
    outcomes: [
      "100% escrow settlement audit rate with zero unresolved supplier disputes",
      "Payment disbursement cycle accelerated by 65% upon digital inspection sign-off",
      "Enterprise platform processing multi-million dollar wholesale order volumes annually",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    industries: ["banking-finance"],
    products: ["jaxmart"],
  },
  {
    slug: "sovereign-land-registry",
    title: "Sovereign Digital Land Registry & Title Verification",
    category: "Government",
    sector: "Government & E-Governance",
    summary: "Cryptographic title deeds and municipal registry infrastructure for fraud prevention.",
    result: "Deed registration reduced from 45 days to 4 hours",
    problem:
      "Municipal land records were plagued by duplicate title claims, forged deed transfers, and multi-month bureaucratic title search delays in municipal registry offices.",
    solution:
      "JadeQuest implemented an immutable cadastral title registry where parcel boundary coordinates, deeds, and lien endorsements are cryptographically anchored and audited.",
    implementation: [
      "Private Hyperledger Fabric consortium connecting municipal revenue offices, banks, and judiciary departments",
      "Hardware Security Module (HSM) digital signatures required for all municipal registrar approvals",
      "Citizen self-service portal for instant title search and encumbrance certificate verification",
      "Integration with state GIS mapping servers to prevent overlapping parcel boundary registration",
    ],
    outcomes: [
      "Title deed registration turnaround cut from 45 days to under 4 hours",
      "Zero fraudulent duplicate deed registrations recorded across covered districts",
      "Instant encumbrance verification eliminating title fraud for mortgage lenders",
    ],
    tech: ["Hyperledger Fabric", "GIS Mapping", "HSM PKI", "Next.js"],
    industries: ["government", "real-estate"],
    products: ["jadeledger"],
  },
  {
    slug: "agritech-predictive-supply",
    title: "AI-Powered Agritech Supply Chain & Predictive Yields",
    category: "AI & ML",
    sector: "Agriculture & Supply Chain",
    summary: "Computer vision and time-series forecasting for cooperative crop preservation.",
    result: "28% reduction in post-harvest spoilage",
    problem:
      "Agricultural cooperatives suffered up to 35% crop spoilage due to unpredictable weather patterns, lack of harvest yield visibility, and localized distributor bottlenecks.",
    solution:
      "JadeQuest engineered AgriSenti—an applied AI platform combining satellite vegetation indices, localized weather sensor telemetry, and predictive pricing models.",
    implementation: [
      "PyTorch computer vision pipeline analyzing multispectral satellite imagery for crop health anomalies",
      "Time-series predictive models forecasting regional crop yield volumes and distributor demand curves",
      "Automated SMS and mobile app harvest timing advisories delivered directly to cooperative farmers",
      "High-throughput ingest of LoRaWAN farm sensor telematics into TimescaleDB",
    ],
    outcomes: [
      "28% reduction in post-harvest crop spoilage across pilot cooperatives",
      "94% price forecasting accuracy enabling farmers to negotiate fair wholesale rates",
      "Over 12,000 participating cooperative members onboarded in the first season",
    ],
    tech: ["PyTorch", "TimescaleDB", "Computer Vision", "LoRaWAN"],
    industries: ["manufacturing", "logistics"],
    products: ["agrisenti"],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
