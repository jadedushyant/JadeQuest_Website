import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types/project';
import { cn } from '../../lib/utils';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  className?: string;
  isFeatured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  className,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      onClick={() => onSelect(project)}
      className={cn(
        'work-card group relative flex-shrink-0 w-[85vw] sm:w-[540px] md:w-[680px] lg:w-[740px] h-[520px] sm:h-[580px] rounded-lg overflow-hidden cursor-pointer border border-warm-border bg-obsidian-900 transition-all duration-500 hover:border-jade-400/50 hover:shadow-[0_0_40px_rgba(120,224,143,0.12)] select-none',
        className
      )}
      data-cursor-label="VIEW"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.title}
          className="work-card__image w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Layered Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full p-6 sm:p-8 md:p-10 flex flex-col justify-between">
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 font-mono text-xs text-jade-400">
            <span className="px-2.5 py-1 rounded bg-obsidian-950/90 border border-warm-border">
              {project.number} / 04
            </span>
            <span className="text-warm-muted uppercase tracking-widest text-[11px]">
              {project.industry}
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-obsidian-950/80 border border-warm-border flex items-center justify-center text-warm-white transition-all duration-300 group-hover:border-jade-400 group-hover:bg-jade-400 group-hover:text-obsidian-950 group-hover:rotate-45">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        {/* Bottom Details */}
        <div>
          {/* Main Title */}
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-syne font-bold uppercase tracking-tight text-warm-white mb-2 transition-transform duration-300 group-hover:translate-x-2">
            {project.title}
          </h3>

          {/* Subtitle / Tech Stack Line */}
          <div className="font-mono text-xs text-jade-400 uppercase tracking-widest mb-3">
            {project.technologies.slice(0, 3).join(' • ')}
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-warm-muted font-light max-w-lg mb-6 line-clamp-2">
            {project.tagline}
          </p>

          {/* Metrics */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-warm-border">
            {project.metrics.slice(0, 2).map((m, idx) => (
              <div key={idx} className="flex items-baseline gap-2">
                <span className="font-syne font-bold text-base text-jade-400">
                  {m.value}
                </span>
                <span className="font-mono text-[10px] text-warm-muted uppercase tracking-wider">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
