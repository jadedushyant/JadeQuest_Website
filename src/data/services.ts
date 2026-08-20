export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  previewImage: string;
  abstractVisual: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'product-engineering',
    number: '01',
    title: 'PRODUCT ENGINEERING',
    tagline: 'End-to-End Architectural Precision & Execution',
    description: 'We translate complex system requirements into scalable, resilient digital products. From architecture blueprinting to production deployment, we engineer mission-critical systems with uncompromised craft.',
    deliverables: [
      'System Architecture & Topology Design',
      'High-Concurrency Microservices',
      'Domain-Driven Domain Models',
      'Zero-Latency Event Streaming',
      'Performance Optimization & Profiling',
    ],
    technologies: ['TypeScript', 'Rust', 'Go', 'Node.js', 'PostgreSQL', 'Kafka'],
    previewImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    abstractVisual: 'cyber-circuit',
  },
  {
    id: 'web-applications',
    number: '02',
    title: 'WEB APPLICATIONS',
    tagline: 'Hyper-Fast, Fluid Next-Generation Web Platforms',
    description: 'Interactive web applications that merge cinematic aesthetics with lightning performance. We craft reactive frontends powered by server-driven UI, WebGL shaders, and instantaneous state synchronization.',
    deliverables: [
      'Next-Gen Web Platforms & SPAs',
      'WebGL & Spatial Canvas Interfaces',
      'Progressive Web Apps (PWA)',
      'Design Systems & UI Component Kits',
      'Sub-Second Global Edge Delivery',
    ],
    technologies: ['React 19', 'Next.js', 'Vite', 'Three.js', 'Tailwind CSS', 'GSAP'],
    previewImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    abstractVisual: 'fluid-matrix',
  },
  {
    id: 'mobile-experiences',
    number: '03',
    title: 'MOBILE EXPERIENCES',
    tagline: 'Native Fluidity Across iOS, Android & Spatial Devices',
    description: 'High-performance mobile applications engineered with native speed, gesture fluidity, offline resilience, and biometric security for millions of daily active users.',
    deliverables: [
      'Cross-Platform & Native Mobile Apps',
      'Spatial / XR Interaction Modules',
      'Offline-First Sync Engines',
      'Biometric Key Management & Auth',
      'Real-Time Push & Device Telemetry',
    ],
    technologies: ['React Native', 'Swift', 'Kotlin', 'WebAssembly', 'SQLite', 'GraphQL'],
    previewImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop',
    abstractVisual: 'spatial-orbit',
  },
  {
    id: 'ai-automation',
    number: '04',
    title: 'AI & AUTOMATION',
    tagline: 'Autonomous Cognitive Swarms & Custom LLM Architectures',
    description: 'Custom fine-tuned generative AI pipelines, multi-agent autonomous decision loops, vector search indexing, and automated enterprise intelligence that transforms data into executive action.',
    deliverables: [
      'Autonomous Multi-Agent Swarms',
      'RAG & Vector Retrieval Engines',
      'Custom LLM Fine-Tuning Pipelines',
      'Predictive Classification Models',
      'Real-Time AI Guardrails & Governance',
    ],
    technologies: ['Python', 'PyTorch', 'LangChain', 'OpenAI / Anthropic APIs', 'pgvector', 'Pinecone'],
    previewImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop',
    abstractVisual: 'neural-synapse',
  },
  {
    id: 'cloud-devops',
    number: '05',
    title: 'CLOUD & DEVOPS',
    tagline: 'Resilient Infrastructure, Zero-Downtime CI/CD & Kubernetes',
    description: 'Cloud native infrastructure as code, multi-region Kubernetes clusters, automated compliance guardrails, and 24/7 observability designed for enterprise SLAs.',
    deliverables: [
      'Multi-Region Cloud Architecture (AWS/GCP/Azure)',
      'Kubernetes Cluster Orchestration',
      'Infrastructure as Code (Terraform / Pulumi)',
      'Automated Zero-Downtime CI/CD',
      'eBPF Observability & Security Auditing',
    ],
    technologies: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'Grafana', 'Prometheus'],
    previewImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    abstractVisual: 'cloud-grid',
  },
  {
    id: 'enterprise-software',
    number: '06',
    title: 'ENTERPRISE SOFTWARE',
    tagline: 'Mission-Critical Digital Ecosystems Built for Unstoppable Scale',
    description: 'Enterprise ERPs, financial transaction systems, compliance telemetry portals, and custom internal platforms engineered to replace legacy bottlenecks with modern speed.',
    deliverables: [
      'Complex Transaction Processing Engines',
      'Legacy Modernization & Migration',
      'Enterprise SSO / SAML & RBAC Auth',
      'Auditing & Compliance Workflows (SOC2, HIPAA)',
      'Custom Analytics & Telemetry Dashboards',
    ],
    technologies: ['.NET Core', 'Go', 'PostgreSQL', 'Redis', 'Kafka', 'React'],
    previewImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    abstractVisual: 'enterprise-cube',
  },
];
