import localFont from "next/font/local";

// Self-hosted variable fonts (Fontsource packages), so builds never depend on
// downloading from Google Fonts. Latin subset only.

export const syne = localFont({
  src: "../../node_modules/@fontsource-variable/syne/files/syne-latin-wght-normal.woff2",
  weight: "400 800",
  variable: "--font-syne",
  display: "swap",
  preload: true,
});

export const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const jetbrains = localFont({
  src: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});
