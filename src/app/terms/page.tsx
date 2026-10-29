import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageHero";
import { Container, Section } from "@/components/ui";
import { company } from "@/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms of Use",
  description:
    "Terms of Use governing the digital properties and consulting engagements of JadeQuest Consulting Pvt. Ltd.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal & Governance"
        title="Terms of Use"
        intro="The terms and conditions governing the use of JadeQuest Consulting Pvt. Ltd. digital services, platforms, and advisory engagements."
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]}
      />
      <Section theme="dark">
        <Container className="max-w-4xl flex flex-col gap-10 text-mist leading-relaxed">
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold text-paper">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the website and digital resources of {company.legalName} (&ldquo;JadeQuest&rdquo;), you acknowledge and agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree to these terms, you must discontinue using our services immediately.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold text-paper">
              2. Intellectual Property & Proprietary Platforms
            </h2>
            <p>
              All proprietary platforms, codebases, and brand marks developed by JadeQuest—including but not limited to JustifAI, JadeLedger, JaxMart, eTDR, JadeCourt, and Portchain—remain the exclusive intellectual property of JadeQuest Consulting Pvt. Ltd. or their respective licensors.
            </p>
            <p>
              Client engagements governed by formal Master Services Agreements (MSAs) and Statements of Work (SOWs) grant clients full ownership of bespoke custom code and deliverables upon receipt of full contractual payment, subject to reciprocal non-disclosure protections.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold text-paper">
              3. Permissible Use & Enterprise Integrity
            </h2>
            <p>
              Visitors and users are strictly prohibited from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Attempting to probe, scan, or breach the vulnerability of any network node, consortium ordering cluster, or API gateway maintained by JadeQuest.
              </li>
              <li>
                Injecting malicious payloads, automated scraping scripts, or denial-of-service traffic into public or authenticated endpoints.
              </li>
              <li>
                Misrepresenting affiliation with JadeQuest or using JadeQuest marks without prior written authorization.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold text-paper">
              4. Disclaimer & Limitation of Liability
            </h2>
            <p>
              The content provided on this website is for informational and educational purposes regarding our engineering capabilities. While we make every effort to maintain accurate and up-to-date documentation, technical specifications for production deployments are governed solely by executed client contracts and service level agreements.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold text-paper">
              5. Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms of Use shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any dispute arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the competent courts in Gujarat, India.
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

