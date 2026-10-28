import { BrokenChain } from "@/components/pages/BrokenChain";
import { ArrowIcon, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section theme="dark" spacing="none" grain className="flex min-h-svh items-center pt-[var(--header-h)] pb-16">
      <Container className="flex flex-col items-start gap-10">
        <BrokenChain />
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Error 404</Eyebrow>
          <Heading as="h1" size="display" className="max-w-[16ch]">
            This block isn&apos;t in the ledger.
          </Heading>
          <p className="max-w-[52ch] text-lead text-[var(--fg-muted)]">
            The page may have moved, or the link has a typo. Everything else is still where it should be.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/" icon={<ArrowIcon />}>
              Back to the home page
            </Button>
            <Button href="/contact" variant="ghost">
              Tell us what you were looking for
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
