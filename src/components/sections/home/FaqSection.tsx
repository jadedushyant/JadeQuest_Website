"use client";

import { useState } from "react";
import { Container, Eyebrow } from "@/components/ui";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const FAQS = [
  {
    question: "What is JadeQuest's stance on enterprise blockchain vs speculative crypto?",
    answer:
      "JadeQuest specializes strictly in enterprise and sovereign distributed ledger technology (such as permissioned Hyperledger Fabric networks and audited smart contracts) with zero cryptocurrency exposure. We build tamper-evident ledgers for intermodal logistics, e-governance registries, educational credential verification, and trade escrow—never speculative tokens or memecoins.",
  },
  {
    question: "How do you modernize legacy enterprise systems without stopping business operations?",
    answer:
      "We employ the Strangler Fig architectural pattern. Instead of high-risk 'big bang' rewrites, we introduce event-driven API gateways and microservices that incrementally intercept traffic and take over domain boundaries. Critical databases are synchronized via CDC (Change Data Capture) pipelines, ensuring zero customer downtime and seamless rollbacks if needed.",
  },
  {
    question: "How do you protect sensitive enterprise data and ensure regulatory compliance (GDPR, HIPAA, SOC 2)?",
    answer:
      "We design with Zero-Trust principles and cryptographic isolation by default. Sensitive Personally Identifiable Information (PII) is encrypted with HSM-backed keys and stored in compliant off-chain databases. Only SHA-256 Merkle root hashes and zero-knowledge proofs are committed to shared ledgers, ensuring complete compliance with the 'Right to be Forgotten' while retaining tamper-evident auditability.",
  },
  {
    question: "What cloud platforms and deployment topologies do you support?",
    answer:
      "Our infrastructure engineers are certified across AWS, Microsoft Azure, Google Cloud Platform (GCP), and sovereign on-premise private cloud data centers. We standardize on Kubernetes (EKS, AKS, GKE, Rancher) and GitOps tooling (ArgoCD, Terraform) for multi-region active-active deployments.",
  },
  {
    question: "What is your engagement structure and timeline for project kickoff?",
    answer:
      "Most partnerships begin with a 2-to-3 week Architecture & Threat Modeling Discovery Sprint where we produce comprehensive technical specifications, API schemas, and deployment topologies. Dedicated engineering pods (senior architects, full-stack engineers, and QA leads) can typically deploy within 10 to 14 business days.",
  },
  {
    question: "Where are JadeQuest's global teams and offices located?",
    answer:
      "JadeQuest operates remote-first with 70+ senior engineers, maintaining physical corporate presences in India, the United Arab Emirates (UAE), and Vietnam. This strategic coverage allows us to support clients across Asian, Middle Eastern, European, and North American timezones with round-the-clock engineering velocity.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-forest border-t border-line" aria-labelledby="faq-title">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div className="flex flex-col gap-5 lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Frequently Asked Questions</Eyebrow>
          <h2 id="faq-title" className="font-display text-h1 font-semibold text-paper">
            Everything you need to know about working with JadeQuest
          </h2>
          <p className="text-mist text-lead">
            Have a question about security architecture, team scaling, or platform integration? Here are the answers our enterprise partners frequently ask.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-line">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-content-${idx}`;
            const headerId = `faq-header-${idx}`;

            return (
              <div key={faq.question} className="py-6 first:pt-0 last:pb-0">
                <button
                  id={headerId}
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="flex w-full items-center justify-between gap-4 text-left font-display text-lg md:text-xl font-semibold text-paper hover:text-cyan transition-colors"
                >
                  <span>{faq.question}</span>
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface transition-transform duration-300",
                      isOpen && "rotate-180 border-cyan text-cyan"
                    )}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={headerId}
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-mist text-base leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

