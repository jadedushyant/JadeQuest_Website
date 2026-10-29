export type Article = {
  slug: string;
  title: string;
  category: "Blockchain" | "AI & ML" | "Cloud & DevOps" | "Architecture";
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  summary: string;
  content: string[];
  keyTakeaways: string[];
  tags: string[];
};

export const articles: Article[] = [
  {
    slug: "enterprise-consortium-dlt-vs-public-chains",
    title: "Why Enterprise Consortium DLT Beats Public Blockchains for Cross-Border Logistics",
    category: "Blockchain",
    publishedAt: "2026-08-14",
    readTime: "7 min read",
    author: {
      name: "Rohan Bhatt",
      role: "Managing Director & Enterprise Architect",
    },
    summary:
      "Public speculative blockchains impose unpredictable gas spikes, regulatory exposure, and public transaction scrutiny. Here is how permissioned Hyperledger Fabric topologies deliver deterministic finality for maritime terminals.",
    keyTakeaways: [
      "Gas volatility on public chains makes per-transaction budgeting impossible for logistics operators handling millions of containers.",
      "Permissioned Raft consensus guarantees sub-second deterministic finality without the risk of blockchain reorganizations or forks.",
      "Private data collections (PDCs) ensure that bilateral price negotiations remain invisible to competing carriers on the same ledger.",
    ],
    content: [
      "In deep-sea maritime logistics, predictable operational latency is paramount. When thousands of intermodal containers move through terminal gates each hour, every fraction of a second spent waiting for confirmation translates into vehicular congestion and costly demurrage.",
      "Early enterprise blockchain pilots often made the mistake of launching on public Ethereum or EVM-compatible layer-2s. However, enterprise legal counsels immediately encountered insurmountable friction: public gas price spikes during market volatility caused transaction costs to swing by 3000%, and open ledger explorers violated basic commercial confidentiality.",
      "By contrast, permissioned consortium DLT (such as Hyperledger Fabric) operates with established cryptographic identities issued by accredited Certificate Authorities (PKI). Each organization runs peer nodes within its sovereign boundary, participating in crash fault-tolerant (CFT) Raft consensus.",
      "Furthermore, Hyperledger Fabric's Private Data Collections (PDCs) allow bilateral transaction details—such as contracted freight tariffs—to be hashed and verified across the consortium while keeping the underlying commercial payloads restricted exclusively to the buyer and seller.",
      "For sovereign ports and customs agencies, consortium DLT provides the optimal convergence: complete cryptographic non-repudiation without exposing sensitive trade volume data or introducing cryptocurrency volatility.",
    ],
    tags: ["Hyperledger Fabric", "Consortium DLT", "Maritime Logistics", "Private Data Collections"],
  },
  {
    slug: "designing-sub-two-second-merkle-proofs",
    title: "Designing Sub-2-Second Cryptographic Merkle Proofs for Sovereign Registries",
    category: "Architecture",
    publishedAt: "2026-09-02",
    readTime: "6 min read",
    author: {
      name: "Lead Cryptography Engineer",
      role: "Distributed Systems Team",
    },
    summary:
      "A technical walkthrough of how JadeQuest structures SHA-256 Merkle trees to verify university diplomas and government licenses in milliseconds while preserving GDPR compliance.",
    keyTakeaways: [
      "Leaf nodes contain hashed identity salts rather than raw PII, ensuring that verification proofs do not leak personal records.",
      "Batch anchoring on 10-minute epochs minimizes ledger write overhead while sustaining instantaneous verification lookups.",
      "Client-side cryptographic proof verification can be performed offline inside standard mobile browsers using WebAssembly.",
    ],
    content: [
      "Sovereign identity registries and educational credential verification systems share a fundamental challenge: they must prove document authenticity beyond dispute, yet they cannot store student transcripts or personal identification numbers on an immutable ledger.",
      "The solution implemented across JadeQuest's JustifAI platform relies on salted Merkle tree architectures. When a university issues a degree, the document payload is combined with a cryptographically secure random salt known only to the graduate and the issuing registrar.",
      "The resulting SHA-256 hash forms a leaf node in a balanced binary Merkle tree. Every ten minutes, our ordering cluster aggregates pending certificate hashes, computes the master root hash, and writes a single checkpoint transaction to the permissioned ledger.",
      "When an employer or overseas immigration officer scans the graduate's QR code, the verification API returns the Merkle audit path—a logarithmic array of sibling hashes. The verifier's browser recalculates the path in under 12 milliseconds and confirms that the root matches the ledger checkpoint.",
      "Because the ledger records only mathematical root hashes and timestamps, the student retains full ownership of their personal data, ensuring complete compliance with the EU GDPR Right to be Forgotten and India's DPDP Act.",
    ],
    tags: ["Merkle Trees", "Cryptography", "GDPR", "Zero-PII", "WASM"],
  },
  {
    slug: "strangler-fig-legacy-modernization",
    title: "Strangler-Fig Migration: Decomposing a 12-Year Monolith Without Downtime",
    category: "Cloud & DevOps",
    publishedAt: "2026-09-20",
    readTime: "8 min read",
    author: {
      name: "Principal Cloud Architect",
      role: "DevOps & Infrastructure Lead",
    },
    summary:
      "How our engineering squad used event-driven proxies and change data capture (CDC) to migrate a mission-critical wholesale banking engine without a single second of maintenance window.",
    keyTakeaways: [
      "Big-bang rewrites carry a 70%+ failure rate in enterprise environments; strangler-fig migration isolates risk into measurable micro-sprints.",
      "Change Data Capture (CDC) via Debezium and Kafka keeps legacy relational databases and new microservice databases in lockstep.",
      "Shadow traffic routing allows engineers to verify new service responses against legacy outputs before flipping live authority.",
    ],
    content: [
      "For financial institutions handling billions in daily settlements, 'scheduled downtime' is not merely an inconvenience—it represents contractual penalties, regulatory audits, and severe reputational risk.",
      "When tasked with modernizing a 12-year-old monolithic Java and Oracle backend, our team deployed the Strangler Fig architectural pattern. Rather than attempting a high-risk parallel rebuild, we placed an intelligent Envoy proxy boundary in front of the legacy core.",
      "The first stage migrated read-only queries. We established real-time Change Data Capture (CDC) utilizing Debezium and Apache Kafka to replicate database changes into optimized PostgreSQL and TimescaleDB clusters in under 50 milliseconds.",
      "Next, we introduced shadow traffic mirroring: production requests were simultaneously dispatched to both the legacy service and the newly developed Next.js and Go microservice. An automated telemetry comparator flagged any discrepancies in business logic or edge-case calculations.",
      "Once 100% parity was verified over a 30-day window, write authority for the first domain boundary was seamlessly switched over. Over the course of nine months, the entire monolith was dismantled into resilient, containerized services with zero user downtime.",
    ],
    tags: ["Microservices", "Strangler Fig", "Change Data Capture", "Kafka", "Kubernetes"],
  },
  {
    slug: "private-llm-deployment-regulated-enterprise",
    title: "Private LLM Deployment: Preventing Data Leakage in Regulated Health & FinTech Environments",
    category: "AI & ML",
    publishedAt: "2026-10-05",
    readTime: "9 min read",
    author: {
      name: "Senior AI/ML Scientist",
      role: "Applied Machine Learning Lead",
    },
    summary:
      "Techniques for deploying high-accuracy domain-adapted language models on air-gapped enterprise clusters with zero external API calls or confidential data exfiltration.",
    keyTakeaways: [
      "Third-party public AI APIs pose serious compliance violations under HIPAA and banking privacy laws due to cloud logging policies.",
      "Self-hosted quantized models (vLLM, Ollama, ONNX Runtime) running on private GPUs match proprietary API performance on specialized domain tasks.",
      "Retrieval-Augmented Generation (RAG) coupled with vector database role-based access control (RBAC) ensures users only retrieve documents they are cleared to view.",
    ],
    content: [
      "Enterprises across healthcare, banking, and sovereign governance are eager to harness generative AI for complex document summarization and automated workflow triage. However, sending proprietary contracts or electronic health records (EHR) to commercial third-party cloud APIs poses unacceptable legal liability.",
      "To resolve this bottleneck, JadeQuest designs air-gapped private AI architectures. By running optimized open-weights models (such as Llama-3 and Mistral architectures fine-tuned on curated industry corpora) within the client's own Kubernetes VPC, no byte of data ever leaves the sovereign perimeter.",
      "In our AgriSenti and JustifAI platforms, document parsing combines lightweight computer vision for structural layout extraction with local embeddings stored in pgvector. Every vector lookup is gated by cryptographically verified identity tokens, ensuring that multi-tenant isolation is enforced before context reaches the language model.",
      "Through automated parameter-efficient fine-tuning (PEFT/LoRA) and 4-bit INT quantization via vLLM, our engineers achieve sub-150ms token generation latency on affordable enterprise GPU hardware while guaranteeing absolute data sovereignty.",
    ],
    tags: ["Private LLMs", "vLLM", "RAG", "Data Sovereignty", "HIPAA Compliance"],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

