"use client";

import { useState } from "react";
import { TransitionLink } from "@/components/layout";
import { Tag } from "@/components/ui";
import { caseStudies } from "@/content";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

const CATEGORIES = ["All", "Blockchain", "Logistics", "FinTech", "Government", "AI & ML"] as const;

export function CaseStudiesList() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = activeCategory === "All"
    ? caseStudies
    : caseStudies.filter((c) => c.category === activeCategory);

  return (
    <div className="flex flex-col gap-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter case studies by category">
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-5 py-2 text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer",
                isSelected
                  ? "bg-cyan text-forest font-semibold shadow-md shadow-cyan/20"
                  : "bg-surface-raised border border-line text-mist hover:text-paper hover:border-cyan/40"
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid of Case Studies */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cs, i) => (
          <article
            key={cs.slug}
            className="group flex flex-col justify-between rounded-card border border-line bg-surface p-8 transition-all duration-300 hover:border-cyan/40 hover:-translate-y-1"
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan uppercase tracking-wider font-semibold">
                  {cs.category} · Case {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs text-subtle font-mono">{cs.sector}</span>
              </div>

              <div className="p-4 rounded-lg bg-surface-raised border border-line/60">
                <span className="font-mono text-[11px] text-purple uppercase font-semibold block mb-1">
                  Verified Outcome
                </span>
                <p className="font-display text-base font-semibold text-paper">
                  {cs.result}
                </p>
              </div>

              <h2 className="font-display text-xl font-semibold text-paper group-hover:text-cyan transition-colors">
                {cs.title}
              </h2>

              <p className="text-sm text-mist leading-relaxed">
                {cs.summary}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-line/60 flex flex-col gap-5">
              <div className="flex flex-wrap gap-2">
                {cs.tech.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              <TransitionLink
                href={`/case-studies/${cs.slug}`}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan hover:text-paper transition-colors font-semibold self-start"
              >
                <span>Read Full Case Study</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </TransitionLink>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

