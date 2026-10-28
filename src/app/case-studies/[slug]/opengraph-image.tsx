import { caseStudies, getCaseStudy } from "@/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "JadeQuest case study";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const cs = getCaseStudy((await params).slug);
  return renderOg({ eyebrow: cs ? `Case study · ${cs.sector}` : "Case study", title: cs?.title ?? "JadeQuest" });
}
