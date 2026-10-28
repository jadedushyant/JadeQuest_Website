"use client";

import { useRef } from "react";
import { TransitionLink } from "@/components/layout";
import { useLenis } from "@/components/motion";
import { Container, Eyebrow, Section, Tag } from "@/components/ui";
import { industries, products, type Product } from "@/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

const industryName = (slug: string) => industries.find((i) => i.slug === slug)?.name.split(" ")[0] ?? slug;

/** A product "spec sheet" — honest about what it is until real screenshots arrive. */
function SpecSheet({ product, index }: { product: Product; index: number }) {
  return (
    <div
      data-spec
      className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-card border border-[var(--line)] bg-white p-6 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:28px_28px]"
    >
      <div className="flex items-center justify-between font-mono text-[11px] text-[var(--fg-subtle)] uppercase">
        <span>Spec · JQ-{String(index + 1).padStart(2, "0")}</span>
        <span>{product.category}</span>
      </div>
      <p className="font-display text-[clamp(2.25rem,4.2vw,5rem)] leading-none font-bold tracking-tight text-[var(--accent)]">
        {product.name}
      </p>
      <dl className="grid grid-cols-[6rem_1fr] gap-y-2 bg-white/80 text-sm">
        <dt className="text-[var(--fg-subtle)]">Stack</dt>
        <dd>{product.stack.join(", ")}</dd>
        <dt className="text-[var(--fg-subtle)]">Sectors</dt>
        <dd>{product.industries.map(industryName).join(", ")}</dd>
      </dl>
    </div>
  );
}

/**
 * 5.4: the eleven platforms on a horizontal track that scrolls with the page
 * (desktop). Smaller screens and reduced motion get a swipeable row.
 */
export function Products() {
  const ref = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = ref.current!.querySelector<HTMLElement>("[data-track]")!;
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
        const names = gsap.utils.toArray<HTMLElement>("[data-name]");
        const distance = () => track.scrollWidth - window.innerWidth;

        const skewTo = gsap.quickTo(names, "skewX", { duration: 0.5, ease: "power3.out" });
        const scroll = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const current = Math.min(products.length, Math.floor(self.progress * products.length) + 1);
              if (counterRef.current) counterRef.current.textContent = String(current).padStart(2, "0");
              skewTo(gsap.utils.clamp(-6, 6, self.getVelocity() / -400));
            },
            onScrubComplete: () => skewTo(0),
          },
        });

        // Keyboard: tabbing to an off-screen card scrolls the page to where the
        // track shows it, and undoes the browser's own sideways scroll of the section.
        const st = scroll.scrollTrigger!;
        const onFocus = (e: FocusEvent) => {
          const panel = (e.target as HTMLElement).closest<HTMLElement>("li");
          if (!panel || !track.contains(panel)) return;
          ref.current!.scrollLeft = 0;
          const progress = gsap.utils.clamp(0, 1, (panel.offsetLeft - window.innerWidth * 0.1) / distance());
          const y = st.start + progress * (st.end - st.start);
          if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
          else window.scrollTo({ top: y, behavior: "instant" });
        };
        track.addEventListener("focusin", onFocus);

        panels.forEach((panel) => {
          const spec = panel.querySelector("[data-spec]");
          if (!spec) return;
          gsap.from(spec, {
            clipPath: "inset(0% 100% 0% 0% round 14px)",
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: panel, containerAnimation: scroll, start: "left 80%", once: true },
          });
        });
        return () => track.removeEventListener("focusin", onFocus);
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [lenis], revertOnUpdate: true },
  );

  return (
    <Section ref={ref} theme="light" spacing="none" aria-labelledby="products-title" className="overflow-hidden">
      <div className="flex flex-col gap-12 py-section lg:h-svh lg:justify-center lg:py-0">
        <Container className="flex items-end justify-between gap-6">
          <div className="flex flex-col gap-5">
            <Eyebrow index={5}>Products</Eyebrow>
            <h2 id="products-title" className="max-w-[16ch] font-display text-display font-semibold">
              {products.length} platforms, built in&#8209;house
            </h2>
          </div>
          <p aria-hidden className="hidden font-mono text-sm text-[var(--fg-subtle)] lg:block">
            <span ref={counterRef}>01</span> / {String(products.length).padStart(2, "0")}
          </p>
        </Container>

        <div className="overflow-x-auto overscroll-x-contain py-2 [scrollbar-width:none] lg:overflow-visible">
          <ol
            data-track
            className="flex w-max snap-x snap-mandatory gap-6 px-gutter lg:snap-none lg:gap-10 lg:pr-[20vw]"
          >
            {products.map((product, i) => (
              <li data-panel key={product.slug} className="w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-[min(46vw,44rem)]">
                <TransitionLink href={`/products/${product.slug}`} data-cursor="view" className="group flex flex-col gap-6">
                  <SpecSheet product={product} index={i} />
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex flex-col gap-2">
                      <h3 data-name className="origin-left font-display text-h2 font-semibold">
                        {product.name}
                      </h3>
                      <p className="max-w-[40ch] text-[var(--fg-muted)]">{product.tagline}</p>
                    </div>
                    <span
                      aria-hidden
                      className="mt-2 text-xl text-[var(--accent)] transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {product.stack.slice(0, 3).map((s) => (
                      <li key={s}>
                        <Tag>{s}</Tag>
                      </li>
                    ))}
                  </ul>
                </TransitionLink>
              </li>
            ))}
            <li className="flex w-[70vw] shrink-0 snap-start items-center sm:w-[40vw] lg:w-[24rem]">
              <TransitionLink
                href="/products"
                className="group flex flex-col gap-3 font-display text-h2 font-semibold"
              >
                View the full catalog
                <span aria-hidden className="text-[var(--accent)] transition-transform group-hover:translate-x-2">
                  →
                </span>
              </TransitionLink>
            </li>
          </ol>
        </div>
      </div>
    </Section>
  );
}
