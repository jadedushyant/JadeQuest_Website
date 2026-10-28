import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CaseStudies } from "@/components/sections/home/CaseStudies";
import { ContactCta } from "@/components/sections/home/ContactCta";
import { Industries } from "@/components/sections/home/Industries";
import { KeyFigures } from "@/components/sections/home/KeyFigures";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { Pillars } from "@/components/sections/home/Pillars";
import { Products } from "@/components/sections/home/Products";
import { Services } from "@/components/sections/home/Services";
import { TechMarquee } from "@/components/sections/home/TechMarquee";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Enterprise Digital Transformation & Software Development | JadeQuest",
    description:
      "Mission-critical software, permissioned blockchain and applied AI for governments, banks, ports and universities.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Pillars />
      <Services />
      <Products />
      <KeyFigures />
      <Industries />
      <CaseStudies />
      <TechMarquee />
      <ContactCta />
    </>
  );
}
