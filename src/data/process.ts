export interface ProcessStep {
  number: string;
  word: string;
  tagline: string;
  description: string;
  deliverables: string[];
  focus: string;
}

export const processData: ProcessStep[] = [
  {
    number: '01',
    word: 'DISCOVER',
    tagline: 'Deconstructing Complex Domains Into Core Axioms',
    description: 'We interrogate assumptions, analyze edge-case constraints, map user mental models, and formulate the mathematical architecture before writing a single line of code.',
    deliverables: ['System Domain Topology', 'Technical Risk Matrix', 'Feasibility Benchmarks', 'Architecture Blueprint'],
    focus: 'Clarity & Mathematical Foundation',
  },
  {
    number: '02',
    word: 'DESIGN',
    tagline: 'Engineering Intuition, Spatial Depth & Interaction Physics',
    description: 'We design systems that feel alive. Fluid micro-interactions, responsive typography, and spatial hierarchies created to communicate state instantly and effortlessly.',
    deliverables: ['Design Token Engine', 'Interactive Prototypes', 'Motion Specifications', 'Component Taxonomy'],
    focus: 'Sensory Precision & Cognitive Ergonomics',
  },
  {
    number: '03',
    word: 'ENGINEER',
    tagline: 'High-Concurrency, Zero-Latency Hermetic Execution',
    description: 'Precision implementation using modern type-safe languages, reactive architectures, GPU-accelerated graphics pipelines, and robust distributed storage layers.',
    deliverables: ['Type-Safe Codebase', 'Automated Test Suites', 'Distributed Microservices', 'CI/CD Pipelines'],
    focus: 'Execution Craft & Zero-Compromise Quality',
  },
  {
    number: '04',
    word: 'SCALE',
    tagline: 'Autonomous Reliability, Planetary Multi-Region Resilience',
    description: 'Stress-testing under extreme concurrency, chaos engineering, eBPF telemetry monitoring, and autonomous auto-healing infrastructure ready for millions of requests.',
    deliverables: ['Global Edge Caching', 'Chaos Engineering Validation', '24/7 Observability Dashboards', 'Zero-Downtime Migration'],
    focus: 'Fault Tolerance & Infinite Elasticity',
  },
];
