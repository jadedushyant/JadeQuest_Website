import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Cpu, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { Project } from '../../types/project';
import { Button } from '../ui/Button';
import { EASING } from '../../animations/core/constants';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // GSAP Entrance
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
      gsap.fromTo(
        panelRef.current,
        { y: 80, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: EASING.power4Out }
      );
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      ctx.revert();
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleClose = () => {
    gsap.to(panelRef.current, {
      y: 40,
      opacity: 0,
      scale: 0.96,
      duration: 0.3,
      ease: 'power3.in',
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99990] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-obsidian-950/85 backdrop-blur-xl select-text"
      onClick={handleClose}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-obsidian-900 border border-jade-500/30 shadow-[0_0_80px_rgba(0,240,139,0.12)] p-6 sm:p-8 md:p-12 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2.5 rounded-full border border-white/10 bg-obsidian-800 text-[#8B949E] hover:text-white hover:border-jade-500 hover:bg-jade-500/10 transition-all duration-300 z-20"
          data-cursor-label="CLOSE"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono text-jade-400">
          <span className="px-2.5 py-0.5 rounded border border-jade-500/40 bg-jade-500/10">
            {project.number}
          </span>
          <span>{project.industry}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>

        {/* Title & Tagline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-syne font-bold uppercase tracking-tight text-white mb-2">
          {project.title}
        </h2>
        <p className="text-lg sm:text-xl text-[#00F08B] font-light mb-8">
          {project.tagline}
        </p>

        {/* Hero image banner */}
        <div className="relative aspect-[16/8] w-full rounded-xl overflow-hidden mb-10 border border-white/10">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80" />
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {project.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-white/10 bg-obsidian-800/60 backdrop-blur-md"
            >
              <div className="text-2xl sm:text-3xl font-syne font-bold text-jade-400 mb-1">
                {metric.value}
              </div>
              <div className="text-xs font-mono text-[#8B949E] uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Narrative columns: Challenge, Solution, Impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-xl border border-white/10 bg-obsidian-850">
            <h4 className="text-xs font-mono text-red-400 tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              THE CHALLENGE
            </h4>
            <p className="text-sm text-[#CBD1D9] leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="p-6 rounded-xl border border-jade-500/20 bg-jade-950/20">
            <h4 className="text-xs font-mono text-jade-400 tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-jade-400" />
              OUR SOLUTION
            </h4>
            <p className="text-sm text-[#CBD1D9] leading-relaxed">
              {project.solution}
            </p>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-obsidian-850">
            <h4 className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              MEASURED IMPACT
            </h4>
            <p className="text-sm text-[#CBD1D9] leading-relaxed">
              {project.impact}
            </p>
          </div>
        </div>

        {/* Technical Architecture Highlights */}
        <div className="p-6 rounded-xl border border-white/10 bg-obsidian-850 mb-10">
          <h4 className="text-xs font-mono text-white tracking-widest uppercase mb-4 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-jade-400" />
            ARCHITECTURE & ENGINEERING HIGHLIGHTS
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.architectureHighlights.map((hl, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-sm text-[#A1ABB8]">
                <CheckCircle2 className="w-4 h-4 text-jade-400 flex-shrink-0" />
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="mb-10">
          <div className="text-xs font-mono text-[#8B949E] uppercase tracking-widest mb-3">
            TECHNOLOGY STACK
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full border border-white/10 bg-obsidian-800 text-xs font-mono text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions / Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <Button
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                variant="primary"
                icon={<ArrowUpRight className="w-4 h-4" />}
                cursorLabel="VISIT"
              >
                LIVE ARCHITECTURE
              </Button>
            )}
            {project.githubUrl && (
              <Button
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                icon={<Github className="w-4 h-4" />}
                cursorLabel="CODE"
              >
                GITHUB REPO
              </Button>
            )}
          </div>

          <button
            onClick={handleClose}
            className="text-xs font-mono text-[#8B949E] hover:text-white transition-colors"
          >
            ← BACK TO SHOWCASE
          </button>
        </div>
      </div>
    </div>
  );
};
