"use client";

import { useState } from "react";
import { company } from "@/content";
import { BackToTop } from "./BackToTop";
import { FooterHashedWordmark } from "./FooterHashedWordmark";
import { TransitionLink } from "./PageTransition";
import { Volume2, VolumeX, ArrowRight } from "lucide-react";

export function Footer() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  return (
    <footer
      data-theme="dark"
      className="relative z-0 overflow-hidden bg-[#0d0f14] text-paper border-t border-white/10 font-sans"
      aria-label="Site Footer"
    >
      {/* Ambient smoky dark background gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 25%, rgba(34, 211, 238, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 82% 40%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 90%, rgba(255, 255, 255, 0.04) 0%, transparent 60%)
          `,
        }}
      />

      <div className="mx-auto flex max-w-[1440px] flex-col justify-between px-6 sm:px-10 lg:px-16 pt-16 md:pt-24 pb-8 min-h-[85vh]">
        {/* Top Grid: Headline on left, CTAs & Enquiry on right */}
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20 items-start">
          {/* Left Column: Big Headline & Interactive Cue */}
          <div className="flex flex-col items-start gap-8">
            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-semibold tracking-[-0.035em] text-paper leading-[1.05]">
              Let&apos;s build<br />
              something that<br />
              has to work.
            </h2>

            <div className="flex flex-col gap-2.5 pt-2">
              <span className="font-sans text-xs text-subtle tracking-wider uppercase font-medium">
                ©jadequest® {new Date().getFullYear()}
              </span>

              {/* Sound Toggle / Interaction Cue */}
              <button
                type="button"
                onClick={toggleSound}
                className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-mist hover:text-cyan transition-colors cursor-pointer py-1 font-medium"
                aria-pressed={soundEnabled}
              >
                {soundEnabled ? (
                  <>
                    <span className="text-cyan font-semibold">SOUND ON</span>
                    <Volume2 className="w-3.5 h-3.5 text-cyan animate-pulse" />
                  </>
                ) : (
                  <>
                    <span className="text-subtle group-hover:text-cyan">SOUND OFF</span>
                    <VolumeX className="w-3.5 h-3.5 text-subtle group-hover:text-cyan" />
                  </>
                )}
                <span className="text-subtle">· HOVER THE LINES.</span>
              </button>
            </div>
          </div>

          {/* Right Column: Direct CTAs & Business / Social Directory */}
          <div className="flex flex-col gap-10 md:gap-12 lg:pt-4">
            {/* Top Action Links with animated arrows */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 border-b border-white/10 pb-8">
              <TransitionLink
                href="/contact"
                className="group inline-flex items-center justify-between gap-4 font-sans text-xs uppercase tracking-wider text-paper hover:text-cyan transition-colors border-b border-transparent hover:border-cyan pb-1 font-semibold"
              >
                <span>DISCUSS YOUR PROJECT</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </TransitionLink>

              <TransitionLink
                href="/contact"
                className="group inline-flex items-center justify-between gap-4 font-sans text-xs uppercase tracking-wider text-paper hover:text-cyan transition-colors border-b border-transparent hover:border-cyan pb-1 font-semibold"
              >
                <span>BOOK A 30-MINUTE CALL</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </TransitionLink>
            </div>

            {/* Business Enquiry and Social 2-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
              {/* Business Enquiry */}
              <div className="flex flex-col gap-3">
                <h3 className="font-sans text-xs uppercase tracking-wider text-subtle font-semibold">
                  Business Enquiry
                </h3>
                <div className="flex flex-col gap-2 font-sans text-xs text-mist">
                  <a
                    href={`mailto:${company.contact.email}`}
                    className="hover:text-cyan transition-colors"
                  >
                    E. {company.contact.email}
                  </a>
                  <a
                    href={company.contact.phoneHref}
                    className="hover:text-cyan transition-colors"
                  >
                    P. {company.contact.phone}
                  </a>
                </div>
              </div>

              {/* Social Channels in 2 Sub-Columns */}
              <div className="flex flex-col gap-3">
                <h3 className="font-sans text-xs uppercase tracking-wider text-subtle font-semibold">
                  Social
                </h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 font-sans text-xs text-mist">
                  {company.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-cyan transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Giant Hashed Wordmark (in small/lowercase: jadequest) */}
        <div className="w-full mt-12 md:mt-16">
          <FooterHashedWordmark soundEnabled={soundEnabled} />
        </div>

        {/* Legal & Back-To-Top Bar */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-sans text-subtle">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} jadequest consulting pvt. ltd. all rights reserved.</span>
            <span>·</span>
            <span>india · uae · vietnam</span>
            <span>·</span>
            <TransitionLink href="/privacy" className="hover:text-paper transition-colors underline underline-offset-2">
              privacy policy
            </TransitionLink>
            <span>·</span>
            <TransitionLink href="/terms" className="hover:text-paper transition-colors underline underline-offset-2">
              terms of use
            </TransitionLink>
          </div>

          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
