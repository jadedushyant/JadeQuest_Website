import React, { useState, useEffect, useRef } from 'react';
import { Menu, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { Logo } from '../../ui/Logo';
import { Button } from '../../ui/Button';
import { SoundToggle } from '../../ui/SoundToggle';
import { MobileMenu } from './MobileMenu';
import { navLinks } from '../../../data/navigation';
import { scrollToTarget } from '../../../animations/core/lenis';

interface NavbarProps {
  onOpenInquiry: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInquiry,
  isMuted,
  onToggleSound,
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      // Hide navbar when scrolling down fast, show when scrolling up
      if (navRef.current) {
        if (currentScrollY > 300 && currentScrollY > lastScrollY.current + 10) {
          // Scrolling down -> hide
          gsap.to(navRef.current, {
            y: -100,
            duration: 0.35,
            ease: 'power2.out',
          });
        } else if (currentScrollY < lastScrollY.current - 10) {
          // Scrolling up -> show
          gsap.to(navRef.current, {
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
          });
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToTarget(href, { offset: -70 });
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-obsidian-950/85 backdrop-blur-xl border-b border-warm-border shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#root')}
            className="focus:outline-none flex items-center gap-2 group"
            data-cursor-label="JADEQUEST"
          >
            <Logo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-mono text-xs tracking-[0.2em] text-warm-muted hover:text-warm-white uppercase transition-colors duration-200"
                data-cursor-label="OPEN"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Audio Feedback Switch */}
            <SoundToggle isMuted={isMuted} onToggle={onToggleSound} />

            {/* Desktop CTA */}
            <div className="hidden sm:inline-block">
              <Button
                variant="primary"
                size="sm"
                isMagnetic
                onClick={onOpenInquiry}
                icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                cursorLabel="OPEN"
              >
                START A PROJECT →
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex items-center gap-2 px-3 py-1.5 rounded-full border border-warm-border bg-obsidian-900/80 text-warm-white hover:border-jade-400/50 transition-colors font-mono text-xs"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-3.5 h-3.5 text-jade-400" />
              <span>MENU</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenInquiry={onOpenInquiry}
      />
    </>
  );
};
