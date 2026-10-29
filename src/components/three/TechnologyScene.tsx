"use client";

import dynamic from "next/dynamic";
import { StaticHeroFallback } from "./StaticHeroFallback";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <StaticHeroFallback />,
});

export function TechnologyScene() {
  return <HeroScene />;
}

