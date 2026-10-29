import type { Metadata } from "next";
import { TechnologyScene } from "@/components/three/TechnologyScene";
import { PageHero } from "@/components/pages/PageHero";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { Reveal } from "@/components/animations/Reveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Button, Container, Eyebrow, Section, Tag } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import {
  Cpu,
  ShieldCheck,
  Cloud,
  Database,
  Lock,
  Layers,
} from "lucide-react";

export const metadata: Metadata = pageMeta({
  title: "Technology Stack & Capabilities",
  description:
    "Explore JadeQuest's technology stack: Hyperledger Fabric, applied AI/ML, cloud-native Kubernetes, zero-trust cybersecurity, and enterprise microservices.",
  path: "/technology",
});

const TECH_DOMAINS = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    badge: "Applied Intelligence",
    icon: Cpu,
    accent: "text-cyan",
    borderHover: "hover:border-cyan/50",
    description:
      "Enterprise-grade neural networks, computer vision, and document intelligence models tuned for zero hallucination and strict offline privacy.",
    capabilities: [
      "Document AI & OCR with layout analysis",
      "Computer vision for industrial defect detection",
      "Predictive telemetry & time-series forecasting",
      "Private LLM deployment & retrieval-augmented generation (RAG)",
      "Automated MLOps pipelines with model drift monitoring",
    ],
    stack: ["PyTorch", "Hugging Face", "ONNX Runtime", "FastAPI", "Ray"],
  },
  {
    id: "blockchain",
    title: "Blockchain & Consortium DLT",
    badge: "Tamper-Evident Proof",
    icon: ShieldCheck,
    accent: "text-purple",
    borderHover: "hover:border-purple/50",
    description:
      "Permissioned distributed ledgers with audited chaincode and zero cryptocurrency exposure, engineered for regulated institutions and sovereign registries.",
    capabilities: [
      "Hyperledger Fabric consortium network design",
      "Audited Go chaincode and Solidity smart contracts",
      "SHA-256 Merkle root anchoring with sub-2s proofs",
      "Off-chain PII dual storage with cryptographic pointers",
      "Intermodal logistics and cross-border trade settlement",
    ],
    stack: ["Hyperledger Fabric", "Raft Consensus", "Solidity", "Go", "Web3.js"],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Engineering",
    badge: "Resilient Infrastructure",
    icon: Cloud,
    accent: "text-cyan",
    borderHover: "hover:border-cyan/50",
    description:
      "Multi-cloud architectures and GitOps automation delivering 99.99% availability, zero-downtime canary rollouts, and active-active failover.",
    capabilities: [
      "Multi-region Kubernetes (EKS, AKS, GKE) orchestration",
      "Infrastructure-as-Code via Terraform & OpenTofu",
      "ArgoCD GitOps deployment pipelines with automated rollbacks",
      "Distributed telemetry with Prometheus, Grafana, and OpenTelemetry",
      "Cloud cost optimization and automated auto-scaling",
    ],
    stack: ["Kubernetes", "Terraform", "ArgoCD", "AWS", "Azure", "GCP"],
  },
  {
    id: "data-analytics",
    title: "Data Engineering & Analytics",
    badge: "Real-Time Telemetry",
    icon: Database,
    accent: "text-purple",
    borderHover: "hover:border-purple/50",
    description:
      "High-throughput data pipelines and event streaming engines that ingest, normalize, and analyze millions of transactions per second.",
    capabilities: [
      "Real-time event streaming and event-driven architectures",
      "Time-series database optimization for IoT telemetry",
      "CDC (Change Data Capture) pipelines with Debezium",
      "Automated ETL pipelines with Apache Airflow & dbt",
      "SOC 2 and HIPAA compliant data lakehouse design",
    ],
    stack: ["PostgreSQL", "TimescaleDB", "Apache Kafka", "Redis", "DuckDB"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Zero-Trust",
    badge: "Cryptographic Isolation",
    icon: Lock,
    accent: "text-cyan",
    borderHover: "hover:border-cyan/50",
    description:
      "Defense-in-depth security engineering incorporating HSM-backed key custody, static vulnerability analysis, and zero-knowledge privacy.",
    capabilities: [
      "Hardware Security Module (HSM) key custody & PKI",
      "Zero-Trust network architecture and mutual TLS (mTLS)",
      "Automated continuous fuzzing and smart contract auditing",
      "GDPR, DPDP, and HIPAA privacy-by-design compliance",
      "End-to-end envelope encryption for sensitive payloads",
    ],
    stack: ["Vault", "mTLS", "WireGuard", "Cert-Manager", "SonarQube"],
  },
  {
    id: "enterprise-engineering",
    title: "Enterprise Systems Engineering",
    badge: "Mission-Critical SaaS",
    icon: Layers,
    accent: "text-purple",
    borderHover: "hover:border-purple/50",
    description:
      "High-performance distributed systems, multi-tenant SaaS platforms, and strangler-fig legacy modernizations with zero business interruption.",
    capabilities: [
      "Strangler-fig legacy monolithic modernization",
      "High-concurrency Next.js App Router & Node.js microservices",
      "Multi-tenant database schema partitioning",
      "Resilient B2B integration APIs with OpenAPI specifications",
      "Automated disaster recovery and cold/hot replication",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "GraphQL", "Docker"],
  },
];

export default function TechnologyPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <PageHero
          eyebrow="Technology Architecture"
          title="Engineered for verifiable truth and extreme uptime"
          intro="Our technology choices prioritize cryptographic verifiability, deterministic consensus, fault tolerance, and zero cryptocurrency exposure."
          crumbs={[{ label: "Home", href: "/" }, { label: "Technology" }]}
        />
        {/* Subtle 3D background accent */}
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-35 pointer-events-none">
          <TechnologyScene />
        </div>
      </div>

      {/* Overview Pillars */}
      <Section theme="dark" aria-labelledby="domains-heading">
        <Container className="flex flex-col gap-16">
          <div className="flex flex-col gap-4 max-w-2xl">
            <Eyebrow>Core Capabilities</Eyebrow>
            <h2 id="domains-heading" className="font-display text-h1 font-semibold text-paper">
              Six engineering pillars powering enterprise transformation
            </h2>
            <p className="text-mist text-lead">
              Each discipline is staffed by dedicated senior engineers who specialize in production reliability, security auditing, and high-concurrency architecture.
            </p>
          </div>

          <StaggerReveal className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TECH_DOMAINS.map((domain) => {
              const Icon = domain.icon;
              return (
                <div
                  key={domain.id}
                  className={`flex flex-col justify-between p-8 rounded-card border border-line bg-surface transition-all duration-300 ${domain.borderHover}`}
                >
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-lg bg-surface-raised border border-line">
                        <Icon className={`w-6 h-6 ${domain.accent}`} />
                      </div>
                      <span className="font-mono text-xs text-subtle uppercase tracking-wider">
                        {domain.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-h3 font-semibold text-paper">
                      {domain.title}
                    </h3>
                    <p className="text-sm text-mist leading-relaxed">
                      {domain.description}
                    </p>

                    <div className="pt-4 border-t border-line/60">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-subtle mb-3">
                        Key Capabilities
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {domain.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-start gap-2 text-xs text-mist leading-normal"
                          >
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan shrink-0" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-line/60 flex flex-wrap gap-2">
                    {domain.stack.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
              );
            })}
          </StaggerReveal>
        </Container>
      </Section>

      {/* Architectural Principles */}
      <Section theme="stone" aria-labelledby="principles-heading">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="flex flex-col gap-5 lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Architecture Philosophy</Eyebrow>
            <h2 id="principles-heading" className="font-display text-h1 font-semibold text-paper">
              How we evaluate technical decisions
            </h2>
            <p className="text-mist text-lead">
              We reject resume-driven development. Every protocol, database, and library in our stack is chosen based on these verified invariants.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <Reveal className="p-8 rounded-card border border-line bg-surface">
              <span className="font-mono text-xs text-cyan uppercase tracking-widest font-bold">
                Principle 01
              </span>
              <h3 className="font-display text-xl font-semibold text-paper mt-2 mb-3">
                Zero Cryptocurrency Exposure
              </h3>
              <p className="text-mist text-sm leading-relaxed">
                Public speculative tokens have no place in sovereign enterprise infrastructure. We deploy permissioned distributed ledger technology (Hyperledger Fabric) with deterministic Byzantine or Crash fault-tolerant consensus, eliminating gas price volatility, regulatory hazards, and token speculation.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="p-8 rounded-card border border-line bg-surface">
              <span className="font-mono text-xs text-purple uppercase tracking-widest font-bold">
                Principle 02
              </span>
              <h3 className="font-display text-xl font-semibold text-paper mt-2 mb-3">
                Cryptographic Isolation & GDPR Compliance
              </h3>
              <p className="text-mist text-sm leading-relaxed">
                Immutable ledgers must never store plain-text personally identifiable information (PII). We enforce a strict dual-storage architecture: sensitive user data resides in encrypted, localized databases, while only SHA-256 Merkle root hashes and zero-knowledge proofs are committed to the ledger, guaranteeing compliance with the Right to be Forgotten.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="p-8 rounded-card border border-line bg-surface">
              <span className="font-mono text-xs text-cyan uppercase tracking-widest font-bold">
                Principle 03
              </span>
              <h3 className="font-display text-xl font-semibold text-paper mt-2 mb-3">
                Strangler Fig Modernization
              </h3>
              <p className="text-mist text-sm leading-relaxed">
                High-volume enterprises cannot afford multi-year code freezes or risky rip-and-replace deployments. We isolate legacy monoliths behind intelligent proxy boundaries and incrementally carve out modern microservices, validating each service with live parallel traffic before deprecating old components.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section theme="dark">
        <Container className="flex flex-col items-center text-center gap-8 py-12">
          <Eyebrow>Engage Our Architects</Eyebrow>
          <h2 className="font-display text-h1 font-semibold max-w-2xl text-paper">
            Ready to review your system architecture?
          </h2>
          <p className="text-mist max-w-xl text-lead">
            Schedule a technical discovery session with our senior engineering leads to evaluate topology, security boundaries, and scalability requirements.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <MagneticButton>
              <Button href="/contact" size="lg">
                Schedule Architecture Review
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Button href="/case-studies" variant="ghost" size="lg">
                View Production Case Studies
              </Button>
            </MagneticButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
