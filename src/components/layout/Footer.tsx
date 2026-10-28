import { RevealText } from "@/components/motion";
import { ArrowIcon, Button } from "@/components/ui";
import { company, products, services } from "@/content";
import { BackToTop } from "./BackToTop";
import { OfficeClocks } from "./OfficeClocks";
import { TransitionLink } from "./PageTransition";

const columns = [
  {
    title: "Services",
    links: services.slice(0, 6).map((s) => ({ label: s.shortTitle, href: `/services/${s.slug}` })),
  },
  {
    title: "Products",
    links: products.slice(0, 6).map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/case-studies" },
      { label: "Industries", href: "/industries" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

/**
 * Sits underneath the page and is uncovered as the page scrolls away
 * (sticky only on screens tall enough to show all of it).
 */
export function Footer() {
  return (
    <footer
      data-theme="dark"
      className="relative z-0 overflow-hidden [@media(min-width:768px)_and_(min-height:780px)]:sticky [@media(min-width:768px)_and_(min-height:780px)]:bottom-0"
    >
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-16 px-gutter pt-24 pb-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col items-start gap-6">
            <p className="max-w-[16ch] font-display text-h2 font-semibold">Have a system that needs to be right?</p>
            <Button href="/contact" icon={<ArrowIcon />}>
              Start a conversation
            </Button>
            <a
              href={`mailto:${company.contact.email}`}
              className="text-[var(--fg-muted)] underline decoration-[var(--line)] underline-offset-4 transition-colors hover:text-[var(--fg)]"
            >
              {company.contact.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
                <h2 className="text-[var(--fg-subtle)]">{col.title}</h2>
                <ul className="flex flex-col gap-1.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <TransitionLink
                        href={link.href}
                        className="link-draw text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
                      >
                        {link.label}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div className="flex flex-col gap-3">
              <h2 className="text-[var(--fg-subtle)]">Offices</h2>
              <OfficeClocks className="flex flex-col gap-1.5 text-[var(--fg-muted)]" />
              <ul className="mt-3 flex flex-col gap-1.5">
                {company.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
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

        <RevealText
          as="p"
          split="chars"
          stagger={0.03}
          start="top 95%"
          className="-mb-[0.12em] font-display text-[clamp(4rem,19.5vw,21rem)] leading-[0.85] font-bold tracking-[-0.05em] text-[var(--fg)] select-none"
        >
          JadeQuest
        </RevealText>

        <div className="flex flex-col-reverse justify-between gap-4 border-t border-[var(--line)] pt-6 text-xs text-[var(--fg-subtle)] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {company.legalName} · India · UAE · Vietnam
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
