import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "JadeQuest: mission-critical software, blockchain and AI";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({ eyebrow: "Enterprise technology", title: "Engineering mission-critical software, blockchain & AI." });
}
