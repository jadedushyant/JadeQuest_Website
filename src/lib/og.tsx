import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Satori needs TTF/OTF/WOFF (not WOFF2), so the static Syne 700 file is used.
const fontPath = join(process.cwd(), "node_modules/@fontsource/syne/files/syne-latin-700-normal.woff");
const logoPath = join(process.cwd(), "public/brand/jadequest-logo-light.png");

/** Branded social card: logo, eyebrow, title and a row of ledger blocks. */
export async function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [font, logo] = await Promise.all([readFile(fontPath), readFile(logoPath)]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const size = title.length > 60 ? 54 : title.length > 36 ? 66 : 80;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#101815",
          color: "#F3F2EA",
          fontFamily: "Syne",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={260} height={56} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#19B58A" }}>{eyebrow}</div>
          <div style={{ fontSize: size, lineHeight: 1.04, letterSpacing: -1.5, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                width: 64,
                height: 34,
                borderRadius: 6,
                border: `2px solid ${i === 5 ? "#19B58A" : "#344239"}`,
                background: i === 5 ? "#19B58A" : "transparent",
              }}
            />
          ))}
          <div style={{ marginLeft: "auto", fontSize: 22, color: "#829187" }}>jadequest.com</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: "Syne", data: font, weight: 700, style: "normal" }] },
  );
}
