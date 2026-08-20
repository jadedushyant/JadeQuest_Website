import React, { forwardRef } from 'react';

export const ServiceHoverPreview = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="floating-preview fixed top-0 left-0 pointer-events-none z-50 w-72 sm:w-80 rounded-xl overflow-hidden border border-warm-border bg-obsidian-900/95 backdrop-blur-xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      aria-hidden="true"
    >
      <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-obsidian-950 border border-white/5 flex items-center justify-center p-4">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        {/* Abstract Architectural SVG Visuals based on service */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <svg className="w-full h-full floating-preview__svg" viewBox="0 0 200 120" fill="none">
            {/* Base Monochromatic Blueprint Canvas */}
            <rect x="10" y="10" width="180" height="100" rx="4" stroke="rgba(243, 241, 234, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="10" y1="35" x2="190" y2="35" stroke="rgba(243, 241, 234, 0.1)" strokeWidth="1" />
            <line x1="60" y1="35" x2="60" y2="110" stroke="rgba(243, 241, 234, 0.1)" strokeWidth="1" />
            
            {/* Dynamic Elements */}
            <circle cx="35" cy="22" r="3" fill="#78E08F" />
            <circle cx="48" cy="22" r="3" fill="rgba(243, 241, 234, 0.3)" />
            <circle cx="61" cy="22" r="3" fill="rgba(243, 241, 234, 0.3)" />
            
            {/* Code / Graph Lines */}
            <line x1="20" y1="50" x2="50" y2="50" stroke="#78E08F" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="62" x2="45" y2="62" stroke="rgba(243, 241, 234, 0.4)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="20" y1="74" x2="52" y2="74" stroke="rgba(243, 241, 234, 0.4)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="20" y1="86" x2="38" y2="86" stroke="rgba(243, 241, 234, 0.4)" strokeWidth="1.5" strokeLinecap="round" />

            {/* Architecture Node Diagram */}
            <rect x="75" y="48" width="40" height="24" rx="3" fill="#101310" stroke="rgba(243, 241, 234, 0.2)" strokeWidth="1" />
            <line x1="115" y1="60" x2="135" y2="60" stroke="#78E08F" strokeWidth="1" strokeDasharray="2 2" />
            <rect x="135" y="48" width="45" height="24" rx="3" fill="#101310" stroke="#78E08F" strokeWidth="1" />
            <circle cx="157" cy="60" r="4" fill="#78E08F" />
            
            <line x1="95" y1="72" x2="95" y2="88" stroke="rgba(243, 241, 234, 0.2)" strokeWidth="1" />
            <rect x="75" y="88" width="40" height="18" rx="3" fill="#101310" stroke="rgba(243, 241, 234, 0.2)" strokeWidth="1" />
          </svg>
        </div>

        {/* Ambient Jade Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-transparent to-transparent pointer-events-none" />
        
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs">
          <span className="floating-preview__title font-syne font-bold text-warm-white uppercase truncate text-[11px]" />
          <span className="floating-preview__tag font-mono text-[10px] text-jade-400 border border-jade-500/30 bg-jade-950/80 px-2 py-0.5 rounded" />
        </div>
      </div>
    </div>
  );
});

ServiceHoverPreview.displayName = 'ServiceHoverPreview';
