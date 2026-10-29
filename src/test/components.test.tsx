import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tag } from "@/components/ui/Tag";
import { StaticHeroFallback } from "@/components/three/StaticHeroFallback";
import { FaqSection } from "@/components/sections/home/FaqSection";

describe("UI & Primitives Components", () => {
  it("renders Eyebrow with accessible text", () => {
    render(<Eyebrow>Enterprise Technology</Eyebrow>);
    const elements = screen.getAllByText("Enterprise Technology");
    expect(elements.length).toBeGreaterThan(0);
  });

  it("renders Tag properly", () => {
    render(<Tag>Hyperledger Fabric</Tag>);
    expect(screen.getByText("Hyperledger Fabric")).toBeDefined();
  });

  it("renders StaticHeroFallback SVG structure", () => {
    const { container } = render(<StaticHeroFallback />);
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("renders FAQ section with all interactive questions", () => {
    render(<FaqSection />);
    expect(
      screen.getByText(/What is JadeQuest's stance on enterprise blockchain/i)
    ).toBeDefined();
  });
});

