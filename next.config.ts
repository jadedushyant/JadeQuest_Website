import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  experimental: {
    optimizePackageImports: ["gsap", "@react-three/drei"],
    // Careers form accepts resumes up to 5 MB
    serverActions: { bodySizeLimit: "6mb" },
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  // Old jadequest.com URLs → new structure (permanent, so search engines move rankings).
  // TODO(launch): check the old site's service/product/solution slugs against the new ones.
  async redirects() {
    return [
      { source: "/about/case-studies", destination: "/case-studies", permanent: true },
      { source: "/about/case-studies/:slug", destination: "/case-studies/:slug", permanent: true },
      { source: "/about/careers", destination: "/careers", permanent: true },
      { source: "/about/blogs", destination: "/blog", permanent: true },
      { source: "/about/blogs/:slug*", destination: "/blog", permanent: true },
      { source: "/about/events", destination: "/events", permanent: true },
      { source: "/about/events/:slug*", destination: "/events", permanent: true },
      { source: "/expertise-and-industry", destination: "/industries", permanent: true },
      { source: "/expertise-and-industry/:slug*", destination: "/industries", permanent: true },
    ];
  },
};

export default nextConfig;
