# JadeQuest website

The motion-first website for [JadeQuest Consulting](https://www.jadequest.com): Next.js 15 (App Router), TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis smooth scroll and a React Three Fiber hero.

The phase-by-phase build plan, design rules and motion prompts are in [JADEQUEST_ANIMATED_WEBSITE_PLAN.md](JADEQUEST_ANIMATED_WEBSITE_PLAN.md).

## Getting started

Requires Node 20+ and pnpm.

```bash
pnpm install
cp .env.example .env.local   # optional in development
pnpm dev                     # http://localhost:3000
```

| Script | What it does |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Production build (all pages are prerendered) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript, no emit |

Don't run `pnpm build` while `pnpm dev` is running: both write to `.next/`. If the dev server shows "Cannot find module" errors, stop it, delete `.next/` and start again.

## Where things live

| Path | Contents |
|---|---|
| `src/content/` | All copy and data: services, products, industries, solutions, case studies, stats, company details. Edit here, not in components. |
| `src/app/` | Routes. Detail pages are generated from `src/content`. |
| `src/components/ui/` | Base primitives (Button, Section, Heading, Card…) |
| `src/components/motion/` | Smooth scroll, reveals, magnetic, marquee, counters, cursor |
| `src/components/layout/` | Preloader, header, menu, page transitions, footer |
| `src/components/sections/` | Home page sections and the hero |
| `src/components/three/` | The "Living Ledger" WebGL field |
| `src/app/globals.css` | Design tokens (colours, type scale, radii) |
| `/styleguide`, `/styleguide/motion` | Living reference for tokens and motion (not indexed) |

## Environment variables

See [.env.example](.env.example).

- `NEXT_PUBLIC_SITE_URL`: canonical domain for metadata, sitemap and social cards.
- `RESEND_API_KEY`, `MAIL_FROM`: email delivery for the inquiry and careers forms through [Resend](https://resend.com). `MAIL_FROM` must use a domain verified in Resend.
- `INQUIRY_TO`, `CAREERS_TO`: optional recipients (default contact@ and careers@jadequest.com).

Without the mail settings, forms log submissions in development; in production they tell the visitor to email instead, so nothing is silently lost.

## Deploying (Vercel)

1. Import the repository in Vercel. Framework preset: Next.js; install command `pnpm install`.
2. Add the environment variables above for Production (and Preview if wanted).
3. In Resend, verify the sending domain and create an API key.
4. Point `www.jadequest.com` at the Vercel project.

Vercel Analytics and Speed Insights switch on automatically when deployed on Vercel. Both are cookieless.

## Launch checklist

- [ ] Confirm content marked `TODO(content)` in the code (engagement steps, values wording, careers figures, 3 vs 4 countries, "11" vs "11+" platforms)
- [ ] Real photography: team, offices, Rohan Bhatt portrait; product screenshots
- [ ] Full case study write-ups (challenge, approach, outcome)
- [ ] Partner/client logos with permission
- [ ] Check old site URLs against the redirects in `next.config.ts`
- [ ] Resend configured; send a test inquiry and a test application from production
- [ ] Lighthouse on the deployed site (target: Performance ≥ 90 desktop / ≥ 75 mobile, Accessibility ≥ 95)
- [ ] Test on Safari (macOS + iOS), Firefox, Edge and a mid-range Android phone
- [ ] Share previews checked on LinkedIn, X and WhatsApp
