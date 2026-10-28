"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useLenis } from "@/components/motion";
import { prefersReducedMotion } from "@/hooks/useMediaQuery";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { getRouteLabel } from "@/lib/routes";

const COLUMNS = 5;

/**
 * Background tabs and throttled frames can stall a timeline; navigation must
 * still happen. Jumps the timeline to its end if it hasn't finished in time.
 */
function finishWithin(tl: gsap.core.Timeline, ms: number) {
  const id = setTimeout(() => {
    if (tl.progress() < 1) tl.progress(1);
  }, ms);
  tl.eventCallback("onInterrupt", () => clearTimeout(id));
  return tl;
}

type TransitionContextValue = { navigate: (href: string, label?: string) => void };
const TransitionContext = createContext<TransitionContextValue>({ navigate: () => {} });
export const usePageTransition = () => useContext(TransitionContext);

/**
 * "Block wipe": columns rise to cover the page with the next page's name,
 * the route changes underneath, then the columns lift away.
 * Browser back/forward skip the animation.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const pendingRef = useRef(false);
  const busyRef = useRef(false);

  const navigate = useCallback(
    (href: string, label?: string) => {
      if (busyRef.current) return;
      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }
      const overlay = overlayRef.current;
      const title = titleRef.current;
      if (!overlay || !title) return router.push(href);

      busyRef.current = true;
      lenis?.stop();
      title.textContent = label ?? getRouteLabel(href);
      const columns = overlay.querySelectorAll("[data-column]");

      const exit = gsap
        .timeline({
          onComplete: () => {
            pendingRef.current = true;
            router.push(href, { scroll: false });
          },
        })
        .set(overlay, { autoAlpha: 1 })
        .fromTo(
          columns,
          { scaleY: 0, transformOrigin: "50% 100%" },
          { scaleY: 1, duration: 0.6, ease: "jade", stagger: 0.05 },
        )
        .fromTo(title, { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: "expo.out" }, "-=0.3");
      finishWithin(exit, 2000);
    },
    [router, lenis],
  );

  // New route committed: reset scroll under the cover, then reveal.
  useEffect(() => {
    if (!pendingRef.current) return;
    pendingRef.current = false;
    const overlay = overlayRef.current;
    if (!overlay) return;

    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true, force: true });
    ScrollTrigger.refresh();

    const enter = gsap
      .timeline({
        delay: 0.1,
        onComplete: () => {
          gsap.set(overlay, { autoAlpha: 0 });
          busyRef.current = false;
          lenis?.start();
        },
      })
      .to(titleRef.current, { yPercent: -110, duration: 0.45, ease: "power3.in" })
      .to(
        overlay.querySelectorAll("[data-column]"),
        { scaleY: 0, transformOrigin: "50% 0%", duration: 0.7, ease: "jade", stagger: 0.05 },
        "-=0.1",
      );
    finishWithin(enter, 2500);
  }, [pathname, lenis]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div ref={overlayRef} aria-hidden className="pointer-events-none invisible fixed inset-0 z-transition flex">
        {Array.from({ length: COLUMNS }, (_, i) => (
          <div key={i} data-column className="h-full flex-1 scale-y-0 bg-surface-raised" />
        ))}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-gutter">
          <span className="overflow-hidden">
            <span ref={titleRef} className="block font-display text-display font-semibold text-paper">
              &nbsp;
            </span>
          </span>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

type TransitionLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  href: string;
  /** Title shown during the transition; defaults to the route's label */
  transitionLabel?: string;
  children: ReactNode;
};

/** next/link that plays the page transition for same-site navigations. */
export function TransitionLink({ href, transitionLabel, onClick, target, children, ...props }: TransitionLinkProps) {
  const { navigate } = usePageTransition();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    const isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);
    const [path, hash] = href.split("#");
    const samePage = (path || pathname) === pathname;
    if (isModified || isExternal || target === "_blank" || samePage || hash !== undefined) return;
    e.preventDefault();
    navigate(href, transitionLabel);
  };

  return (
    <Link href={href} target={target} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
