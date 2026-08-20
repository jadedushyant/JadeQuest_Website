import React, { useEffect, useState, useRef } from 'react';
import { ArrowUp, ArrowUpRight, Github, Linkedin, Twitter, MessageSquare, Terminal } from 'lucide-react';
import { Container } from '../../ui/Container';
import { Button } from '../../ui/Button';
import { Logo } from '../../ui/Logo';
import { navLinks, socialLinks } from '../../../data/navigation';
import { scrollToTarget } from '../../../animations/core/lenis';
import { createHeroParallax } from '../../../animations/hero/heroParallax';

interface FooterProps {
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          timeZone: 'UTC',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    scrollToTarget('#root', { duration: 1.6 });
  };

  const getSocialIcon = (icon: string) => {
    const props = { className: 'w-4 h-4' };
    switch (icon) {
      case 'Github': return <Github {...props} />;
      case 'Linkedin': return <Linkedin {...props} />;
      case 'Twitter': return <Twitter {...props} />;
      default: return <MessageSquare {...props} />;
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative pt-20 pb-12 bg-obsidian-950 border-t border-warm-border text-warm-muted overflow-hidden select-none"
    >
      <Container size="lg">
        {/* Top Tier: Clean Editorial Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-warm-border">
          {/* Col 1: Brand Statement */}
          <div className="md:col-span-5">
            <Logo size="md" className="mb-4" />
            <p className="text-sm text-warm-muted font-light leading-relaxed max-w-sm">
              We design and engineer digital products, intelligent platforms and scalable software for ambitious businesses.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs text-warm-white uppercase tracking-widest mb-4">
              INDEX
            </h4>
            <ul className="space-y-3 font-mono text-xs">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTarget(link.href, { offset: -70 });
                    }}
                    className="text-warm-muted hover:text-jade-400 transition-colors uppercase tracking-wider"
                    data-cursor-label="OPEN"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Social */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-xs text-warm-white uppercase tracking-widest mb-4">
                CONTACT
              </h4>
              <a
                href="mailto:hello@jadequest.io"
                className="font-syne font-bold text-2xl sm:text-3xl text-warm-white hover:text-jade-400 transition-colors uppercase tracking-tight block mb-6"
                data-cursor-label="OPEN"
              >
                LET'S TALK.
              </a>
            </div>

            <div>
              <h4 className="font-mono text-xs text-warm-white uppercase tracking-widest mb-3">
                CONNECT
              </h4>
              <div className="flex items-center gap-6 font-mono text-xs">
                {socialLinks.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-warm-muted hover:text-jade-400 transition-colors tracking-wider"
                    data-cursor-label="OPEN"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Giant Monolithic JADEQUEST Typography Banner */}
        <div className="py-12 select-none overflow-hidden text-center">
          <h2 className="title-giant text-[13vw] sm:text-[14vw] font-syne font-black text-transparent bg-clip-text bg-gradient-to-b from-white/10 via-white/5 to-transparent leading-none tracking-tight">
            JADEQUEST
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-warm-border text-xs font-mono text-warm-muted">
          <div>
            © {new Date().getFullYear()} JADEQUEST. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span>SYS CLOCK: <span className="text-warm-white">{timeStr || '00:00:00 UTC'}</span></span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-warm-muted hover:text-jade-400 transition-colors"
              data-cursor-label="TOP"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};
