import type { ReactNode } from "react";
import { RevealFade, RevealText } from "@/components/motion";
import { Container, Eyebrow, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  crumbs?: Crumb[];
  theme?: "dark" | "light" | "stone";
  /** Right-hand column: facts, tags, a visual */
  aside?: ReactNode;
  /** Bigger title for index pages */
  size?: "display" | "h1";
  className?: string;
};

/** Shared top section for every inner page. The title rises in once the page is on screen. */
export function PageHero({ eyebrow, title, intro, crumbs, theme = "dark", aside, size = "display", className }: PageHeroProps) {
  return (
    <Section
      theme={theme}
      spacing="none"
      grain={theme === "dark"}
      className={cn("pt-[calc(var(--header-h)+4rem)] pb-16 md:pt-[calc(var(--header-h)+6rem)] md:pb-24", className)}
    >
      <Container className="flex flex-col gap-10">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className={cn("grid gap-10", aside && "lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-20")}>
          <div className="flex flex-col gap-8">
            <Eyebrow>{eyebrow}</Eyebrow>
            <RevealText
              as="h1"
              split="lines"
              immediate
              delay={0.35}
              className={cn(
                "max-w-[18ch] font-display font-semibold",
                size === "display" ? "text-display" : "text-h1",
              )}
            >
              {title}
            </RevealText>
            {intro && (
              <RevealFade delay={0.6} start="top 100%" className="max-w-[58ch] text-lead text-[var(--fg-muted)]">
                {intro}
              </RevealFade>
            )}
          </div>
          {aside && (
            <RevealFade delay={0.75} start="top 100%">
              {aside}
            </RevealFade>
          )}
        </div>
      </Container>
    </Section>
  );
}
