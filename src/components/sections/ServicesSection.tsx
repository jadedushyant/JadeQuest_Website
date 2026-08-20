import React, { useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { servicesData, ServiceItem } from '../../data/services';
import { Container } from '../ui/Container';
import { SectionTitle } from '../ui/SectionTitle';

interface ServicesSectionProps {
  onOpenInquiry: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenInquiry }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const handleMouseEnter = (service: ServiceItem) => {
    setHoveredServiceId(service.id);
  };

  const handleMouseLeave = () => {
    setHoveredServiceId(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedServiceId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative py-28 sm:py-36 bg-obsidian-950 text-white overflow-hidden"
    >
      <Container size="lg">
        {/* Section Header */}
        <SectionTitle
          number="01"
          eyebrow="01 — WHAT WE DO"
          title="CAPABILITIES"
          subtitle="Precision engineering across the complete modern software stack. We architect resilient systems for exponential scale."
        />

        {/* Monolithic Interactive Typographic Rows */}
        <div className="divide-y divide-warm-border border-y border-warm-border select-none">
          {servicesData.map((service) => {
            const isHovered = hoveredServiceId === service.id;
            const isDimmed = hoveredServiceId !== null && !isHovered;
            const isExpanded = expandedServiceId === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => handleMouseEnter(service)}
                onMouseLeave={handleMouseLeave}
                onClick={() => toggleExpand(service.id)}
                className={`group relative py-10 sm:py-14 transition-all duration-500 cursor-pointer ${
                  isDimmed ? 'opacity-25' : 'opacity-100'
                }`}
                data-cursor-label="EXPLORE"
              >
                {/* Thin Jade Line on Hover */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-jade-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Main Row Content */}
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    {/* Number Tag */}
                    <span className="font-mono text-xs sm:text-sm text-warm-muted font-bold group-hover:text-jade-400 group-hover:scale-105 transition-all duration-300">
                      {service.number}
                    </span>

                    {/* Monolithic Title */}
                    <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-syne font-bold uppercase tracking-tight text-warm-white transition-all duration-300 group-hover:text-white group-hover:translate-x-3">
                      {service.title}
                    </h3>
                  </div>

                  {/* Arrow Indicator & Tagline */}
                  <div className="flex items-center gap-4 pl-8 md:pl-0">
                    <span className="hidden lg:inline-block font-mono text-xs text-warm-muted uppercase tracking-wider">
                      {service.tagline}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-warm-border flex items-center justify-center text-warm-muted transition-all duration-300 group-hover:border-jade-400 group-hover:bg-jade-400 group-hover:text-obsidian-950 group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="mt-8 pt-8 border-t border-jade-500/20 pl-8 md:pl-16 grid grid-cols-1 md:grid-cols-12 gap-8 animate-fadeIn">
                    <div className="md:col-span-6">
                      <p className="text-sm sm:text-base text-[#CBD1D9] font-light leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenInquiry();
                        }}
                        className="font-mono text-xs text-jade-400 hover:text-white uppercase tracking-widest flex items-center gap-2"
                      >
                        <span>COMMISSION {service.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="md:col-span-6">
                      <h4 className="font-mono text-xs text-[#8B949E] uppercase tracking-widest mb-3">
                        DELIVERABLES & MODULES
                      </h4>
                      <div className="space-y-2">
                        {service.deliverables.map((d, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#A1ABB8]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-jade-400 flex-shrink-0" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
