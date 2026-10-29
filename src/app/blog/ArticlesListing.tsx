"use client";

import { useState } from "react";
import { TransitionLink } from "@/components/layout";
import { articles } from "@/content/articles";
import { Search, ArrowUpRight, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/cn";

const CATEGORIES = ["All", "Blockchain", "AI & ML", "Cloud & DevOps", "Architecture"] as const;

export function ArticlesListing() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filtered = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "All" || article.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-10">
      {/* Search Bar & Category Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Category Pills */}
        <div
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Filter articles by category"
        >
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

        {/* Search Input */}
        <div className="relative min-w-[260px] md:min-w-[320px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search insights & topics..."
            aria-label="Search articles"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-line bg-surface text-sm text-paper placeholder:text-subtle focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
          />
        </div>
      </div>

      {/* Articles Feed */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-card border border-line bg-surface flex flex-col items-center gap-3">
          <p className="text-paper font-semibold text-lg">No matching insights found</p>
          <p className="text-sm text-mist max-w-md">
            Try adjusting your search query or selecting a different category to view articles.
          </p>
          <button
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="mt-2 text-xs font-mono text-cyan underline uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {filtered.map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col justify-between rounded-card border border-line bg-surface p-8 transition-all duration-300 hover:border-cyan/40 hover:-translate-y-1"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs text-subtle font-mono">
                  <span className="px-2.5 py-1 rounded bg-cyan/10 text-cyan border border-cyan/20 font-semibold uppercase">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.publishedAt}
                    </span>
                  </div>
                </div>

                <h2 className="font-display text-2xl font-semibold text-paper group-hover:text-cyan transition-colors leading-snug pt-2">
                  <TransitionLink href={`/blog/${article.slug}`}>
                    {article.title}
                  </TransitionLink>
                </h2>

                <p className="text-sm text-mist leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-line/60 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-paper">
                    <div className="w-6 h-6 rounded-full bg-surface-raised border border-line flex items-center justify-center text-[10px] font-mono text-cyan font-bold">
                      {article.author.name.charAt(0)}
                    </div>
                    <span className="text-subtle">{article.author.name}</span>
                  </div>

                  <TransitionLink
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-cyan hover:text-paper transition-colors font-semibold"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </TransitionLink>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-subtle bg-surface-raised px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
