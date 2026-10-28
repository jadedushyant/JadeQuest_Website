import { Button, Container, Section } from "@/components/ui";

/** Honest empty state for listings that have no entries yet. */
export function EmptyListing({ message, cta }: { message: string; cta: { label: string; href: string } }) {
  return (
    <Section theme="light" spacing="sm">
      <Container className="flex flex-col items-start gap-6 border-t border-[var(--line)] pt-10">
        <p className="max-w-[48ch] text-lead text-[var(--fg-muted)]">{message}</p>
        <Button href={cta.href} variant="ghost">
          {cta.label}
        </Button>
      </Container>
    </Section>
  );
}
