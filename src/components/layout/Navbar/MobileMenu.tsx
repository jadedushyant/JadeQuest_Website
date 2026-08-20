import React, { useEffect, useRef } from 'react';
import { X, ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import gsap from 'gsap';
import { navLinks, socialLinks } from '../../../data/navigation';
import { Button } from '../../ui/Button';
import { scrollToTarget } from '../../../animations/core/lenis';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      );

      const items = linksRef.current?.querySelectorAll('.mobile-nav-item');
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power4.out', delay: 0.1 }
        );
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNavClick = (href: string) => {
    onClose();
    setTimeout(() => {
      scrollToTarget(href, { offset: -80 });
    }, 150);
  };

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-[9999] bg-obsidian-950/95 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-10 select-none md:hidden"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <span className="font-syne font-bold text-lg text-white tracking-widest">
          JADEQUEST
        </span>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full border border-white/10 bg-obsidian-900 text-[#8B949E] hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Nav Links */}
      <div ref={linksRef} className="flex flex-col gap-6 my-auto">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => handleNavClick(link.href)}
            className="mobile-nav-item flex items-baseline justify-between text-left group"
          >
            <span className="font-syne font-bold text-3xl sm:text-4xl text-warm-muted group-hover:text-jade-400 transition-colors uppercase">
              {link.label}
            </span>
            <span className="font-mono text-xs text-jade-400/80">
              {link.number}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom CTA & Social */}
      <div className="pt-6 border-t border-warm-border flex flex-col gap-4">
        <Button
          variant="primary"
          onClick={() => {
            onClose();
            onOpenInquiry();
          }}
          icon={<ArrowRight className="w-4 h-4" />}
          className="w-full justify-between"
        >
          START A PROJECT →
        </Button>

        <div className="flex items-center justify-between text-xs font-mono text-warm-muted">
          <span>JADEQUEST • WE ENGINEER WHAT'S NEXT</span>
          <div className="flex items-center gap-3">
            <a href="https://linkedin.com/company/jadequest" target="_blank" rel="noreferrer" className="hover:text-jade-400">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://github.com/jadequest" target="_blank" rel="noreferrer" className="hover:text-jade-400">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
