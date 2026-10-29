import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "blockchain-development",
    title: "Blockchain Development",
    shortTitle: "Blockchain",
    summary: "Secure, scalable blockchain networks, smart contracts and private consortium ledgers.",
    featured: {
      headline: "Enterprise Blockchain & Consortium DLT",
      description:
        "Permissioned Hyperledger Fabric networks with audited smart contracts and zero cryptocurrency exposure.",
      deliverables: [
        "Hyperledger Fabric consortium topology",
        "Audited Solidity & Go chaincode",
        "Merkle root generation & ledger anchoring",
        "Zero-exposure PII dual storage",
        "Legacy DB & ERP middleware integration",
      ],
    },
    tags: ["Hyperledger Fabric", "Solidity", "Go", "Raft"],
    products: ["justifai", "jadeledger", "portchain", "etdr"],
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    shortTitle: "AI & ML",
    summary: "Predictive analytics, NLP, computer vision and MLOps.",
    featured: {
      headline: "AI & Machine Learning Innovation",
      description:
        "Automate high-friction processes, extract knowledge from complex documents and add predictive foresight.",
      deliverables: [
        "Document intelligence & extraction",
        "Computer vision pipelines",
        "NLP summarisation & classification",
        "Predictive forecasting models",
        "MLOps & model monitoring",
      ],
    },
    tags: ["PyTorch", "Computer Vision", "NLP", "MLOps"],
    products: ["agrisenti", "jadecourt", "justifai"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps Consulting",
    shortTitle: "Cloud & DevOps",
    summary: "Cloud migration, Kubernetes orchestration, CI/CD automation and infrastructure as code.",
    featured: {
      headline: "Cloud Architecture & DevOps",
      description: "Zero-downtime migration, multi-cloud Kubernetes and GitOps across AWS, Azure and GCP.",
      deliverables: [
        "Zero-downtime cloud migration",
        "Multi-cloud Kubernetes",
        "GitOps & CI/CD automation",
        "Infrastructure as code",
        "Observability & cost control",
      ],
    },
    tags: ["Kubernetes", "AWS", "Azure", "GCP"],
    products: ["portchain"],
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    shortTitle: "Software Development",
    summary: "End-to-end web applications, microservices and enterprise modernization.",
    featured: {
      headline: "Custom Software & Modernization",
      description:
        "Greenfield multi-tenant SaaS, and strangler-fig decomposition of legacy monoliths without stopping the business.",
      deliverables: [
        "Multi-tenant SaaS platforms",
        "Microservice architecture",
        "Strangler-fig legacy modernization",
        "API & integration layers",
        "Performance & security hardening",
      ],
    },
    tags: ["Next.js", "Node.js", "PostgreSQL", "Microservices"],
    products: ["jaxmart", "smp", "jadeedu"],
  },
  {
    slug: "web3-solutions",
    title: "Web3 Solutions",
    shortTitle: "Web3",
    summary: "dApps, DAOs, tokenomics and wallet integrations.",
    featured: {
      headline: "Web3 & Decentralized Protocol Engineering",
      description: "Non-speculative dApps, utility tokenomics, self-sovereign identity and escrow protocols.",
      deliverables: [
        "Decentralized applications (dApps)",
        "Utility tokenomics design",
        "Self-sovereign identity (DID)",
        "Escrow & settlement protocols",
        "Wallet integrations",
      ],
    },
    tags: ["EVM", "DID", "Smart Contracts"],
    products: ["jaxmart", "jadelc"],
  },
  {
    slug: "cybersecurity-zero-trust",
    title: "Cybersecurity & Zero-Trust Architecture",
    shortTitle: "Cybersecurity",
    summary: "Hardware-security key custody, static cryptographic analysis, and zero-trust perimeter defense.",
    featured: {
      headline: "Zero-Trust Cybersecurity & Cryptographic Custody",
      description: "HSM-backed key signing, continuous vulnerability fuzzing, and compliance with GDPR, HIPAA, and SOC 2.",
      deliverables: [
        "Hardware Security Module (HSM) key custody",
        "Zero-Trust network architecture & mTLS",
        "Automated smart contract & chaincode audits",
        "GDPR & HIPAA cryptographic compliance",
        "Threat modeling & penetration testing",
      ],
    },
    tags: ["HSM", "Zero-Trust", "mTLS", "SOC 2"],
    products: ["justifai", "jadeledger"],
  },
  {
    slug: "data-engineering-analytics",
    title: "Data Engineering & Real-Time Analytics",
    shortTitle: "Data & Analytics",
    summary: "High-throughput stream processing, IoT time-series telemetry, and modern data lakehouse design.",
    featured: {
      headline: "Data Engineering & Streaming Telemetry",
      description: "Ingest and process millions of transactions per second with sub-50ms query latencies.",
      deliverables: [
        "Real-time event streaming with Apache Kafka",
        "Time-series database optimization",
        "Change Data Capture (CDC) pipelines",
        "Data lakehouse architecture",
        "Automated data quality & observability",
      ],
    },
    tags: ["TimescaleDB", "Kafka", "PostgreSQL", "dbt"],
    products: ["portchain", "agrisenti"],
  },
  {
    slug: "digital-transformation-consulting",
    title: "Digital Transformation & Systems Integration",
    shortTitle: "IT Consulting",
    summary: "Strategic enterprise advisory, legacy core modernization, and sovereign governance automation.",
    featured: {
      headline: "Enterprise Digital Transformation & Integration",
      description: "Strangler-fig migration strategies and resilient enterprise API integration frameworks.",
      deliverables: [
        "Architecture discovery & threat modeling",
        "Strangler-fig legacy modernization",
        "Enterprise ERP & CRM middleware integration",
        "Regulatory compliance roadmap",
        "Dedicated engineering pod staffing",
      ],
    },
    tags: ["Enterprise Architecture", "Middleware", "Strangler Fig"],
    products: ["etdr", "jadecourt"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    summary: "Native and cross-platform iOS and Android apps built for enterprise scale.",
    featured: {
      headline: "Mobile Application Development",
      description: "60fps experiences, offline-first sync and enterprise hardware integration.",
      deliverables: [
        "Native & cross-platform apps",
        "60fps interaction design",
        "Offline-first data sync",
        "Enterprise hardware integration",
        "App store release management",
      ],
    },
    tags: ["iOS", "Android", "Offline-first"],
    products: ["agrisenti"],
  },
  {
    slug: "game-development",
    title: "Game Development",
    shortTitle: "Game Development",
    summary: "2D/3D games, Unity and Unreal projects, and gamified platforms.",
    tags: ["Unity", "Unreal", "3D"],
    deliverables: ["2D and 3D games", "Unity and Unreal development", "Gamified platforms"],
  },
  {
    slug: "ecommerce-solutions",
    title: "eCommerce Solutions",
    shortTitle: "eCommerce",
    summary: "Omnichannel commerce, headless architecture and payment integrations.",
    tags: ["Headless", "Payments", "Omnichannel"],
    products: ["jaxmart"],
    deliverables: ["Omnichannel commerce", "Headless architecture", "Payment integrations"],
  },
  {
    slug: "product-design",
    title: "Product Design (UI/UX)",
    shortTitle: "Product Design",
    summary: "UX research, design systems and rapid prototyping.",
    tags: ["UX Research", "Design Systems", "Prototyping"],
    deliverables: ["UX research", "Design systems", "Rapid prototyping"],
  },
  {
    slug: "hire-dedicated-developers",
    title: "Hire Dedicated Developers",
    shortTitle: "Hire Developers",
    summary: "On-demand senior engineers and cross-functional pods.",
    tags: ["Senior Engineers", "Pods"],
    deliverables: ["Senior engineers on demand", "Cross-functional pods"],
  },
];

export const featuredServices = services.filter((s) => s.featured);

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const serviceDeliverables = (s: Service) => s.featured?.deliverables ?? s.deliverables ?? [];
