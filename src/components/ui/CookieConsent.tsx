"use client";

import { useEffect, useState } from "react";
import { TransitionLink } from "@/components/layout";
import { ShieldCheck, X } from "lucide-react";

const COOKIE_PREF_KEY = "jadequest_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_PREF_KEY);
      if (!stored) {
        // Show after a brief delay
        const timer = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_PREF_KEY, "accepted");
    } catch {}
    setVisible(false);
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem(COOKIE_PREF_KEY, "dismissed");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie and privacy preferences"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[8000] p-5 rounded-card border border-line bg-surface/95 backdrop-blur-md shadow-2xl shadow-black/50"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-cyan/10 border border-cyan/20 text-cyan shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-paper font-semibold">
              Privacy & Cookieless Analytics
            </span>
            <button
              onClick={handleDismiss}
              aria-label="Close cookie notice"
              className="text-subtle hover:text-paper transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-mist leading-relaxed">
            We use privacy-preserving, cookieless metrics to optimize our website. We do not store cross-site advertising cookies or sell your personal data. Read our{" "}
            <TransitionLink href="/privacy" className="text-cyan underline hover:text-paper">
              Privacy Policy
            </TransitionLink>{" "}
            for full details.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleAccept}
              className="px-4 py-1.5 rounded-button bg-cyan text-forest text-xs font-semibold hover:bg-cyan/90 transition-colors cursor-pointer"
            >
              Acknowledge & Continue
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 rounded-button text-xs text-subtle hover:text-paper transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

