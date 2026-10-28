import type { ProcessStep } from "./types";

// TODO(content): confirm these stages and their wording with the JadeQuest delivery team.
export const engagementSteps: ProcessStep[] = [
  {
    title: "Discover",
    description: "Workshops with your team to map the process, the people who sign off and the records that matter.",
  },
  {
    title: "Architect",
    description: "A written architecture: data model, ledger topology where needed, integrations and security boundaries.",
  },
  {
    title: "Build",
    description: "Short iterations with working software at the end of each, reviewed with your stakeholders.",
  },
  {
    title: "Verify",
    description: "Security review, audits of smart contracts or chaincode, load tests and user acceptance.",
  },
  {
    title: "Run",
    description: "Launch, monitoring and handover, or ongoing operation by our team if you prefer.",
  },
];
