"use client";

import { useRef } from "react";
import { Container, Eyebrow } from "@/components/ui";
import { gsap, useGSAP } from "@/lib/animations";
import { useReducedMotion } from "@/lib/animations/reducedMotion";

const STEPS = [
  {
    step: "01",
    title: "Discovery & Threat Modeling",
    description:
      "We unpack domain boundaries, compliance mandates (GDPR, HIPAA, SOC 2), data confidentiality requirements, and transaction volume SLAs before writing a line of code.",
    tags: ["Domain Modeling", "SLA Definition", "Zero-Trust Architecture"],
  },
  {
    step: "02",
    title: "Cryptographic & Systems Architecture",
    description:
      "We design consortium topologies, Merkle tree proof schemas, dual-storage PII isolation boundaries, and resilient microservice integration middleware.",
    tags: ["Consortium Topology", "Merkle Schema", "PII Segregation"],
  },
  {
    step: "03",
    title: "Consensus & Chaincode Engineering",
    description:
      "High-throughput Go chaincode and Solidity smart contracts are developed with deterministic execution, audited cryptographic primitives, and automated test harnesses.",
    tags: ["Go Chaincode", "Smart Contracts", "Deterministic State"],
  },
  {
    step: "04",
    title: "Formal Verification & Security Audit",
    description:
      "Every smart contract and critical microservice undergoes multi-pass static analysis, fuzzing, penetration testing, and formal cryptographic verification.",
    tags: ["Fuzz Testing", "Static Analysis", "Cryptographic Audit"],
  },
  {
    step: "05",
    title: "Deployment & Zero-Downtime Cutover",
    description:
      "We orchestrate multi-region Kubernetes clusters with GitOps pipelines, canary deployments, real-time telemetry, and automated rollback triggers.",
    tags: ["Kubernetes", "GitOps", "Canary Deployment", "Real-Time Telemetry"],
  },
];

export function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || reducedMotion) return;

      const items = container.querySelectorAll("[data-process-item]");
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-24 bg-forest border-t border-line"
      aria-labelledby="process-title"
    >
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-4 max-w-2xl">
          <Eyebrow>Methodology</Eyebrow>
          <h2 id="process-title" className="font-display text-h1 font-semibold text-paper">
            How we engineer mission-critical reliability
          </h2>
          <p className="text-mist text-lead">
            Every engagement follows a proven, transparent delivery pipeline built for regulated industries, high-frequency transactions, and zero-compromise security.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, idx) => (
            <div
              key={s.step}
              data-process-item
              className={`group relative flex flex-col justify-between p-8 rounded-card border border-line bg-surface hover:border-cyan/40 transition-all duration-300 ${
                idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-cyan font-bold px-3 py-1 rounded bg-cyan/10 border border-cyan/20">
                    PHASE {s.step}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-line group-hover:bg-cyan transition-colors" />
                </div>
                <h3 className="font-display text-xl font-semibold text-paper pt-2">
                  {s.title}
                </h3>
                <p className="text-sm text-mist leading-relaxed">{s.description}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-line/60 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] text-subtle bg-surface-raised px-2.5 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

