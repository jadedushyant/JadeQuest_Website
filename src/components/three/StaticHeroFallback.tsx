"use client";

import { cn } from "@/lib/cn";

export function StaticHeroFallback({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none select-none flex items-center justify-center opacity-40",
        className
      )}
    >
      <div className="relative w-full max-w-[800px] aspect-square">
        {/* Subtle radial ambient glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple/15 via-cyan/15 to-transparent blur-3xl" />

        {/* Geometric cybernetic concentric rings */}
        <svg
          viewBox="0 0 600 600"
          className="w-full h-full stroke-white/10 fill-none"
        >
          <circle cx="300" cy="300" r="260" strokeDasharray="4 8" strokeWidth="1" />
          <circle cx="300" cy="300" r="210" strokeDasharray="12 12" strokeWidth="1.5" stroke="rgba(34, 211, 238, 0.25)" />
          <circle cx="300" cy="300" r="150" strokeWidth="1" stroke="rgba(139, 92, 246, 0.3)" />
          <polygon
            points="300,160 421,230 421,370 300,440 179,370 179,230"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1.5"
          />
          <polygon
            points="300,200 386,250 386,350 300,400 214,350 214,250"
            stroke="rgba(34, 211, 238, 0.35)"
            strokeWidth="1"
          />
          {/* Constellation nodes */}
          <circle cx="300" cy="160" r="4" fill="#22D3EE" />
          <circle cx="421" cy="230" r="4" fill="#8B5CF6" />
          <circle cx="421" cy="370" r="4" fill="#22D3EE" />
          <circle cx="300" cy="440" r="4" fill="#8B5CF6" />
          <circle cx="179" cy="370" r="4" fill="#22D3EE" />
          <circle cx="179" cy="230" r="4" fill="#8B5CF6" />
          <circle cx="300" cy="300" r="6" fill="#F5F7FA" />
        </svg>
      </div>
    </div>
  );
}

