"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Magnetic } from "@/components/motion";
import { contactCta, mainNav } from "@/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { onPreloaderDone } from "@/lib/motion/preloader";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { MenuOverlay } from "./MenuOverlay";
import { TransitionLink } from "./PageTransition";
import { RollText } from "./RollText";

type Theme = "dark" | "light" | "stone";

/** Theme of the section currently under the header's vertical middle. */
function themeUnderHeader(header: HTMLElement): Theme {
  const y = header.offsetHeight / 2;
  for (const el of document.elementsFromPoint(window.innerWidth / 2, y)) {
    if (header.contains(el)) continue;
    const themed = el.closest<HTMLElement>("[data-theme]");
    if (themed) return (themed.dataset.theme as Theme) ?? "dark";
  }
  return "dark";
}

export function Header() {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Hide on scroll down, show on scroll up; follow the theme of the section below.
  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 80);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 200);
        lastY = y;
      }
      setTheme(themeUnderHeader(header));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Close the menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Intro: items rise in after the preloader.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-header-item]");
      gsap.set(items, { yPercent: 120, autoAlpha: 0 });
      return onPreloaderDone(() =>
        gsap.to(items, { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out", stagger: 0.05, delay: 0.2 }),
      );
    },
    { scope: ref },
  );

  const effectiveTheme = menuOpen ? "dark" : theme;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        ref={ref}
        data-theme={effectiveTheme}
        className={cn(
          "fixed inset-x-0 top-0 z-header !bg-transparent transition-transform duration-500 ease-[var(--ease-expo-out)]",
          hidden && !menuOpen && "-translate-y-full",
        )}
      >
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-md transition-opacity duration-300",
            scrolled && !menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="relative mx-auto flex h-[var(--header-h)] max-w-[var(--container-max)] items-center justify-between gap-6 px-gutter">
          <TransitionLink href="/" aria-label="JadeQuest home" className="overflow-hidden" transitionLabel="Home">
            <span data-header-item className="block">
              <Logo tone={effectiveTheme} priority />
            </span>
          </TransitionLink>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[15px]">
              {mainNav.map((item) => (
                <li key={item.href} className="overflow-hidden">
                  <TransitionLink
                    href={item.href}
                    data-header-item
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group flex items-center gap-2 py-2 focus-visible:outline-offset-[-3px]"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "size-1 rounded-full bg-[var(--accent)] transition-opacity",
                        isActive(item.href) ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <RollText>{item.label}</RollText>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <span data-header-item className="hidden sm:block">
              <Magnetic strength={0.2}>
                <TransitionLink
                  href={contactCta.href}
                  className="group inline-flex h-10 items-center rounded-button bg-[var(--accent)] px-4 text-sm font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)]"
                >
                  <span data-magnetic-label>
                    <RollText>{contactCta.label}</RollText>
                  </span>
                </TransitionLink>
              </Magnetic>
            </span>
            <button
              type="button"
              data-header-item
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="group relative flex size-10 items-center justify-center rounded-button border border-[var(--line)] transition-colors hover:border-[var(--fg-muted)]"
            >
              <span
                className={cn(
                  "absolute h-px w-4 bg-current transition-transform duration-500 ease-[var(--ease-expo-out)]",
                  menuOpen ? "rotate-45" : "-translate-y-[3px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-4 bg-current transition-transform duration-500 ease-[var(--ease-expo-out)]",
                  menuOpen ? "-rotate-45" : "translate-y-[3px]",
                )}
              />
            </button>
          </div>
        </div>
      </header>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
