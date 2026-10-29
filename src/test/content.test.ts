import { describe, it, expect } from "vitest";
import { company, services, caseStudies } from "@/content";
import { articles } from "@/content/articles";

describe("Content Integrity & Brand Data", () => {
  it("has valid company contact details", () => {
    expect(company.legalName).toBe("JadeQuest Consulting Pvt. Ltd.");
    expect(company.contact.email).toBe("contact@jadequest.com");
    expect(company.offices.length).toBeGreaterThanOrEqual(3);
  });

  it("has complete services catalog", () => {
    expect(services.length).toBeGreaterThanOrEqual(10);
    services.forEach((s) => {
      expect(s.slug).toBeTruthy();
      expect(s.title).toBeTruthy();
      expect(s.summary).toBeTruthy();
      expect(s.tags.length).toBeGreaterThan(0);
    });
  });

  it("has comprehensive case studies with outcomes", () => {
    expect(caseStudies.length).toBeGreaterThanOrEqual(5);
    caseStudies.forEach((cs) => {
      expect(cs.slug).toBeTruthy();
      expect(cs.title).toBeTruthy();
      expect(cs.result).toBeTruthy();
      expect(cs.problem).toBeTruthy();
      expect(cs.solution).toBeTruthy();
    });
  });

  it("has technical articles in the insights repository", () => {
    expect(articles.length).toBeGreaterThanOrEqual(4);
    articles.forEach((a) => {
      expect(a.slug).toBeTruthy();
      expect(a.title).toBeTruthy();
      expect(a.author.name).toBeTruthy();
      expect(a.content.length).toBeGreaterThanOrEqual(3);
    });
  });
});

