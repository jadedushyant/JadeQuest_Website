import { getService, services } from "@/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "JadeQuest service";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  return renderOg({ eyebrow: "Service", title: service?.featured?.headline ?? service?.title ?? "JadeQuest" });
}
