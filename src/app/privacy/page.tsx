import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageHero";
import { Container, Section } from "@/components/ui";
import { company } from "@/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "JadeQuest Consulting's commitment to enterprise data protection, privacy-by-design, GDPR, and DPDP compliance.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal & Governance"
        title="Privacy Policy"
        intro="How JadeQuest Consulting Pvt. Ltd. handles data, respects privacy-by-design, and enforces zero-exposure cryptographic security."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <Section theme="dark">
        <Container className="max-w-4xl flex flex-col gap-10 text-mist leading-relaxed">
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold text-paper">
              1. Overview & Data Controller
            </h2>
            <p>
              This Privacy Policy explains how {company.legalName} (&ldquo;JadeQuest&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, processes, and protects information when you visit our website ({company.tagline}) or engage our enterprise software, permissioned blockchain, and AI engineering services.
            </p>
            <p>
              JadeQuest Consulting Pvt. Ltd. operates as a Data Controller and Data Processor in accordance with applicable data protection laws, including the European General Data Protection Regulation (GDPR) and the Digital Personal Data Protection Act (DPDP Act).
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold text-paper">
              2. Privacy-by-Design & Zero-Exposure Architecture
            </h2>
            <p>
              Unlike conventional tech providers, JadeQuest engineers systems following strict Zero-Trust and Zero-Exposure architectural principles:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-paper">No Plaintext PII on Shared Ledgers:</strong> In all distributed ledger and consortium applications, sensitive identity details (such as national IDs, student records, and commercial contracts) are never stored in plaintext on immutable ledgers. Only cryptographic salted SHA-256 Merkle root hashes are anchored, ensuring complete compliance with the Right to be Forgotten.
              </li>
              <li>
                <strong className="text-paper">Encrypted Off-Chain Custody:</strong> Sensitive payloads reside in encrypted, localized databases with Hardware Security Module (HSM) managed keys.
              </li>
              <li>
                <strong className="text-paper">Cookieless Analytics:</strong> Our public website utilizes privacy-preserving, cookieless analytics that do not track individuals across third-party websites or construct advertising profiles.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold text-paper">
              3. Information We Collect
            </h2>
            <p>
              We only collect information directly provided by you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-paper">Inquiry Details:</strong> When you submit a project inquiry or contact request, we collect your name, corporate email address, organization name, phone number, and project requirements.
              </li>
              <li>
                <strong className="text-paper">Careers Applications:</strong> When you apply for an engineering or leadership role, we process your resume, LinkedIn profile URL, work history, and portfolio.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold text-paper">
              4. Data Retention & Security
            </h2>
            <p>
              We enforce strict encryption in transit (TLS 1.3) and at rest (AES-256). Form submissions are protected against spam through cryptographic honeypots and rate limiting. Project inquiry records are retained strictly for the duration of the business relationship or as mandated by statutory compliance obligations.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold text-paper">
              5. Your Legal Rights
            </h2>
            <p>
              Under GDPR and DPDP, you have the right to access, rectify, port, or request erasure of your personal data held by JadeQuest. To exercise these rights, email our Data Protection team at:{" "}
              <a href={`mailto:${company.contact.email}`} className="text-cyan underline">
                {company.contact.email}
              </a>
            </p>
          </div>

          <div className="pt-6 border-t border-line text-xs font-mono text-subtle">
            Last Updated: October 2026 · JadeQuest Consulting Pvt. Ltd.
          </div>
        </Container>
      </Section>
    </>
  );
}

