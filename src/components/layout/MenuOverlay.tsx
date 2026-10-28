"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "@/components/motion";
import { company, mainNav, products, services } from "@/content";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { OfficeClocks } from "./OfficeClocks";
import { TransitionLink } from "./PageTransition";

const menuLinks = [
  ...mainNav.map(({ label, href }) => ({ label, href })),
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

type MenuOverlayProps = { open: boolean; onClose: () => void };

/**
 * Fullscreen menu. Wipes down from the top, big links rise out of their masks.
 * Esc closes it, focus stays inside, and the page behind is inert.
 */
export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      tlRef.current = gsap
        .timeline({ paused: true })
        .set(rootRef.current, { autoAlpha: 1 })
        .fromTo(
          rootRef.current,
          { clipPath: reduced ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)", opacity: reduced ? 0 : 1 },
          { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: reduced ? 0.3 : 0.9, ease: "jade" },
        )
        .from(
          "[data-menu-link]",
          { yPercent: reduced ? 0 : 110, autoAlpha: reduced ? 0 : 1, duration: 0.8, ease: "expo.out", stagger: 0.05 },
          "-=0.4",
        )
        .from("[data-menu-meta]", { autoAlpha: 0, y: reduced ? 0 : 16, duration: 0.6, stagger: 0.06 }, "-=0.6");
    },
    { scope: rootRef },
  );

  useEffect(() => {
    const tl = tlRef.current;
    const root = rootRef.current;
    if (!tl || !root) return;
    const page = [document.getElementById("main"), document.querySelector("footer")];

    if (open) {
      lenis?.stop();
      page.forEach((el) => el?.setAttribute("inert", ""));
      // Visible before focusing: hidden elements can't take focus.
      gsap.set(root, { autoAlpha: 1 });
      tl.timeScale(1).play();
      root.querySelector<HTMLElement>("[data-menu-link]")?.focus({ preventScroll: true });
    } else if (tl.progress() > 0) {
      tl.timeScale(1.6).reverse();
      lenis?.start();
      page.forEach((el) => el?.removeAttribute("inert"));
    }
  }, [open, lenis]);

  // Esc to close; Tab cycles inside the menu and the header toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !rootRef.current) return;
      const toggle = document.querySelector<HTMLElement>('[aria-controls="site-menu"]');
      const focusables = [toggle, ...rootRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el): el is HTMLElement => !!el,
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={rootRef}
      id="site-menu"
      data-theme="dark"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      data-lenis-prevent
      className="invisible fixed inset-0 z-menu overflow-y-auto"
    >
      <div className="mx-auto grid min-h-full max-w-[var(--container-max)] gap-12 px-gutter pt-[calc(var(--header-h)+3rem)] pb-10 lg:grid-cols-[1.4fr_1fr]">
        <nav aria-label="Menu">
          <ol className="group/menu flex flex-col">
            {menuLinks.map((link, i) => (
              <li key={link.href} className="overflow-hidden border-b border-[var(--line)]">
                <TransitionLink
                  href={link.href}
                  data-menu-link
                  tabIndex={open ? undefined : -1}
                  onClick={onClose}
                  className="group flex items-baseline gap-5 py-3 transition-opacity duration-300 focus-visible:outline-offset-[-3px] group-hover/menu:opacity-40 hover:!opacity-100 md:py-4"
                >
                  <span className="w-8 font-mono text-xs text-[var(--fg-subtle)]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-h1 font-semibold transition-transform duration-500 ease-[var(--ease-expo-out)] group-hover:translate-x-3">
                    {link.label}
                  </span>
                </TransitionLink>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col gap-10 text-sm lg:pt-3">
          <div data-menu-meta className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-[var(--fg-subtle)]">Services</h2>
              <ul className="flex flex-col gap-1.5">
                {services.slice(0, 6).map((s) => (
                  <li key={s.slug}>
                    <TransitionLink
                      href={`/services/${s.slug}`}
                      tabIndex={open ? undefined : -1}
                      onClick={onClose}
                      className="link-draw text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
                    >
                      {s.shortTitle}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-[var(--fg-subtle)]">Products</h2>
              <ul className="flex flex-col gap-1.5">
                {products.slice(0, 6).map((p) => (
                  <li key={p.slug}>
                    <TransitionLink
                      href={`/products/${p.slug}`}
                      tabIndex={open ? undefined : -1}
                      onClick={onClose}
                      className="link-draw text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
                    >
                      {p.name}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div data-menu-meta className="flex flex-col gap-3">
            <h2 className="text-[var(--fg-subtle)]">Get in touch</h2>
            <a
              href={`mailto:${company.contact.email}`}
              tabIndex={open ? undefined : -1}
              className="text-h3 font-semibold tracking-tight underline decoration-[var(--line)] decoration-1 underline-offset-[6px] transition-colors hover:decoration-[var(--accent)]"
            >
              {company.contact.email}
            </a>
            <a href={company.contact.phoneHref} tabIndex={open ? undefined : -1} className="text-[var(--fg-muted)]">
              {company.contact.phone}
            </a>
          </div>

          <div data-menu-meta className="flex flex-col gap-3">
            <h2 className="text-[var(--fg-subtle)]">Local time</h2>
            <OfficeClocks className="flex max-w-xs flex-col gap-1.5 text-[var(--fg-muted)]" />
          </div>

          <ul data-menu-meta className="mt-auto flex flex-wrap gap-x-5 gap-y-2">
            {company.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={open ? undefined : -1}
                  className="link-draw text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
