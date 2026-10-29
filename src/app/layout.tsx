import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Footer, Header, PageTransitionProvider, Preloader, ScrollProgress } from "@/components/layout";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { Cursor, SmoothScrollProvider } from "@/components/motion";
import { company } from "@/content";
import { inter, jetbrains, syne } from "@/lib/fonts";
import { PRELOADER_SESSION_KEY } from "@/lib/motion/preloader";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationLd, SITE_URL, websiteLd } from "@/lib/seo";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Enterprise Digital Transformation & Software Development | JadeQuest",
    template: "%s | JadeQuest",
  },
  description: `${company.tagline} ${company.description}`,
  icons: { icon: "/favicon.svg" },
  openGraph: { siteName: company.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", site: "@JadeQuest" },
};

export const viewport: Viewport = {
  themeColor: "#111318",
};

// Runs before first paint: marks JS as available (reveal targets start hidden)
// and skips the preloader on repeat visits or with reduced motion.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('${PRELOADER_SESSION_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('skip-preloader')}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrains.variable}`}
      // The boot script adds classes before hydration.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <JsonLd data={[organizationLd, websiteLd]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-cursor focus:rounded-button focus:bg-jade focus:px-5 focus:py-3 focus:text-forest"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <PageTransitionProvider>
            <Preloader />
            <ScrollProgress />
            <Header />
            {/* Sits above the sticky footer so scrolling past it uncovers the footer */}
            <main id="main" tabIndex={-1} className="relative z-10 bg-forest outline-none">
              {children}
            </main>
            <Footer />
          </PageTransitionProvider>
        </SmoothScrollProvider>
        <Cursor />
        <CookieConsent />
        {/* Cookieless analytics; only on Vercel, where the endpoints exist */}
        {process.env.VERCEL && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
