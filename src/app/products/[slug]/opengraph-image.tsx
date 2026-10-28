import { getProduct, products } from "@/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "JadeQuest product";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  return renderOg({ eyebrow: product?.category ?? "Product", title: product ? `${product.name}: ${product.tagline}` : "JadeQuest" });
}
