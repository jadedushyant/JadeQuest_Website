# JadeQuest — Fully Animated Website: Phase-wise Build Plan & Prompts

> **Goal:** Rebuild https://www.jadequest.com as an award-style, motion-first website, with the *level* of craft seen on studio sites like trionn.com (preloader, kinetic type, smooth scroll, magnetic UI, scroll storytelling). The website keeps **JadeQuest's own content and an original visual identity**. Trionn is a quality bar only. Don't copy its layouts, copy, or assets.
>
> **How to use this file:** Work through the phases in order. Each phase has:
> 1. **Goal & deliverables**
> 2. **🧱 Build Prompt**: paste into Claude Code / Cursor to build the phase
> 3. **🎬 Animation Prompts**: paste one at a time to add each motion effect
> 4. **✅ Acceptance checklist**: check these before moving on

---

## 0. Master Context (paste this at the start of EVERY new AI session)

```
You are building the new JadeQuest website, a motion-first, award-level
corporate site for an enterprise technology company.

COMPANY: JadeQuest Consulting Pvt. Ltd. Enterprise software, permissioned
blockchain (Hyperledger Fabric), applied AI/ML, cloud & DevOps, e-governance.
Offices: India, UAE, Vietnam. 70+ engineers, remote-first.
Contact: contact@jadequest.com · +91 9913006090
Socials: LinkedIn, X, Telegram, WhatsApp, Discord.

STACK: Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
       GSAP 3 (ScrollTrigger, SplitText, Flip, CustomEase, Observer)
       Lenis (smooth scroll) · React Three Fiber + drei (hero WebGL only)
       Framer Motion ONLY for small UI state transitions (optional)

DESIGN LANGUAGE ("Jade Ledger", forest + paper edition). Tokens live in src/app/globals.css:
- Dark: forest #101815 bg, surface #18211C, surface-raised #202C25, line #344239,
  text #F3F2EA, body #B1BBB2, labels #829187
- Accent: jade #19B58A on dark, jade-deep #077052 on light (AA on paper and stone), jade-soft #B4E8D4 for hover
- Light: paper #F3F2EA, stone #E9E8DE, white #FFFFFF cards/forms, text #202822 / #59635D
- Ratio: ~55% dark, ~25% paper/stone, ~15% neutral detail, ~5% jade. No neon glows.
- Fonts: Syne 600–700 (display), Inter 400–500 (body, nav), JetBrains Mono 11–12px (technical labels only)
- Sentence case for headings and buttons. Huge type only in the hero and a few statements.
- Shape: buttons 8px radius, cards 14px with a 1px border, tags 4px. Soft shadows only.
- Section themes via data-theme="dark|light|stone"; components read --bg/--fg/--accent.
- Imagery: real team/office photos, real product screenshots, original diagrams.
  Subtle film grain (.grain) on selected backgrounds.
- Motif: ledger blocks, hash lines, Merkle trees, used to explain things, not to decorate.

HUMAN-MADE RULES (avoid the "AI website" look):
- One signature moment (the Living Ledger hero). Don't repeat effects in every section.
- Vary layouts: asymmetric columns, different section rhythms. Not a stack of identical card grids.
- Write specific copy with real details (stages, numbers, names, places). No buzzword lists.
- No gradient blobs, no glowing borders, no emoji icons, no stock 3D renders.
- Icons: Lucide line icons or original SVGs, one consistent style.

MOTION PRINCIPLES:
- Ease: custom "jade" ease = CustomEase "0.76,0,0.24,1" (in-out), "expo.out" for reveals
- Durations: button hover 0.2–0.3s · text reveals 0.6–1.0s · section transitions 0.7–1.0s
- Motion is purposeful and tied to content. Not every element moves.
- Headline text reveals by line from a masked overflow (yPercent 110 → 0)
- Every animation must respect prefers-reduced-motion (fade only, no transforms)
- All GSAP code inside gsap.context()/useGSAP for cleanup. No layout thrash.
- 60fps target: animate transform/opacity only. WebGL paused when off-screen.

RULES: Original design only. Do not copy any other studio's layout, copy, or assets.
Components are typed, accessible (keyboard + ARIA), and mobile-responsive.
```

---

## Site Map

| Route | Content source |
|---|---|
| `/` | Home: hero, manifesto, pillars, services, products, stats, industries, case studies, tech marquee, CTA |
| `/services` + `/services/[slug]` | 10 services (Blockchain, Web3, AI/ML, Cloud & DevOps, Custom Software, Game Dev, Mobile, eCommerce, Product Design, Hire Developers) |
| `/products` + `/products/[slug]` | 11 platforms: JustifAI, JadeLedger, JaxMart, eTDR, JadeCourt, Portchain, BharatCarbon, AgriSenti, JadeEdu, SMP, JadeLC |
| `/industries` + `/industries/[slug]` | Healthcare, Banking & FinTech, Education, Real Estate, Logistics, Manufacturing, Government |
| `/solutions/[slug]` | Document Verification, Blockchain for Education, Government & E-Governance, B2B Marketplaces |
| `/case-studies` + `/case-studies/[slug]` | Credential Verification, Port Clearance, B2B Marketplace & Escrow |
| `/about` | Story, MD (Rohan Bhatt), 4 pillars, global presence, CSR |
| `/careers` | Key figures, perks, openings, application form |
| `/contact` | Inquiry form, offices, socials |
| `/blog`, `/events` | Listing + detail (phase 6) |

---

## PHASE 1: Foundation & Design System

**Goal:** Project scaffold, design tokens, fonts, content data layer.
**Deliverables:** Next.js app, Tailwind theme, `/content` data files, base UI primitives.

### 🧱 Build Prompt
```
Phase 1: Foundation. Using the Master Context:

1. Scaffold Next.js 15 (App Router, TS, src/ dir, pnpm). Install: gsap, @gsap/react,
   lenis, three, @react-three/fiber, @react-three/drei, clsx, zod, react-hook-form.
2. Tailwind v4 theme tokens in globals.css: colors, font families, fluid type scale
   (--text-hero: clamp(2.5rem, 8vw, 8rem) ... down to --text-xs), spacing, radii,
   z-index layers (cursor 9999, preloader 9000, menu 8000, header 7000).
3. Load fonts with next/font from Google: Syne (600–700), Inter (400–500),
   JetBrains Mono (400–500). Use font-display: swap.
4. Create typed content files in src/content/: services.ts, products.ts,
   industries.ts, caseStudies.ts, stats.ts, company.ts (contact, socials, offices),
   navigation.ts. Fill them with the JadeQuest content listed in the plan.
5. Folder structure:
   src/app, src/components/{ui,layout,sections,motion,three}, src/lib/motion,
   src/hooks, src/content, src/styles
6. Base UI primitives: Container, Section (with data-theme="dark|light"),
   Heading (as h1–h4, size variants), Eyebrow (mono label with index "01 —"),
   Button (primary/ghost/link variants), Tag, Divider (hairline 1px line).
7. A /styleguide route that renders all tokens and primitives.
No animation yet. Just clean, semantic, responsive markup.
```

### ✅ Acceptance
- [ ] `pnpm dev` runs with zero TS/ESLint errors
- [ ] `/styleguide` shows colors, type scale, buttons, eyebrows
- [ ] All content is in `src/content`, none hard-coded in components

---

## PHASE 2: Global Motion Engine

**Goal:** The "feel" of the site: smooth scroll, GSAP setup, cursor, magnetic UI, reveal utilities.
**Deliverables:** `src/lib/motion/*`, providers, reusable motion components.

### 🧱 Build Prompt
```
Phase 2: Global Motion Engine.

1. src/lib/motion/gsap.ts: register ScrollTrigger, SplitText, Flip, CustomEase,
   Observer once (client only). Define CustomEase "jade" = "0.76,0,0.24,1".
   Export constants DURATION and EASE.
2. SmoothScrollProvider: Lenis (lerp 0.09, smoothWheel true), synced to GSAP:
   lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000));
   gsap.ticker.lagSmoothing(0). Expose lenis via context (for scrollTo / stop / start).
   Disable Lenis when prefers-reduced-motion.
3. useReducedMotion hook + a global `motionOK` flag. Every effect checks it.
4. Reusable motion components (each self-cleaning with useGSAP):
   - <RevealText as="h2" split="lines|words|chars" stagger delay>
   - <RevealFade y={40}>
   - <ParallaxImage speed={0.2}> (inner image scale 1.15 + yPercent on scroll)
   - <Magnetic strength={0.35}>
   - <Marquee speed direction pauseOnHover>
   - <Counter to={70} suffix="+" duration>
   - <LineDraw> (SVG stroke-dashoffset on scroll)
5. Custom cursor + Lenis + magnetic must be disabled on touch devices.
Put a demo of each in /styleguide/motion.
```

### 🎬 Animation Prompts

**A. Smooth scroll**
```
Tune Lenis so scrolling feels heavy and premium but never laggy: lerp 0.09,
wheelMultiplier 0.9, touchMultiplier 1.5. Anchor links use lenis.scrollTo(target,
{ offset: -80, duration: 1.4, easing: easeInOutExpo }). Stop Lenis while the menu,
preloader, or modals are open.
```

**B. Masked text reveal (signature effect)**
```
Build <RevealText>: SplitText into lines (and words if split="words"), wrap each line
in an overflow-hidden mask, animate inner from yPercent:110, rotate:4 → 0 with
"expo.out", 1.2s, stagger 0.08. Trigger at "top 85%", once. Re-split on resize
(debounced) using SplitText's autoSplit + onSplit. Reduced motion: opacity 0→1 only.
```

**C. Custom cursor ("Jade Node")**
```
Create a cursor: a 10px jade dot + a 44px ring with a 1px border, using gsap.quickTo
(dot 0.15s, ring 0.5s "power3"). States via data-cursor attributes:
- data-cursor="link": ring scales to 1.6, dot hides
- data-cursor="view": ring grows to 110px filled jade, shows label "VIEW" (mono, 11px)
- data-cursor="drag": label "DRAG" with ←→ arrows
- data-cursor="text": ring becomes a 2px vertical caret
Use mix-blend-mode: difference over light sections. Hide on touch / when leaving window.
```

**D. Magnetic buttons**
```
<Magnetic>: on pointermove inside the element's bounds (+30px padding), move the
element toward the pointer by strength × offset, and move its inner label 1.5× more
(parallax inside the button). On leave, elastic.out(1, 0.35) back to 0 over 1s.
Primary buttons also get a fill sweep: a jade circle scales from the pointer entry
point to cover the button, and the text color flips.
```

### ✅ Acceptance
- [ ] Scroll is smooth with no jitter on pinned sections (test in Chrome + Safari)
- [ ] Cursor states work. Cursor is hidden on mobile.
- [ ] Reduced-motion: no transforms, everything is still readable

---

## PHASE 3: Preloader, Header, Fullscreen Menu, Page Transitions, Footer

**Goal:** The global shell. This is the first impression.

### 🧱 Build Prompt
```
Phase 3: Global shell.
1. <Preloader>: first visit only (sessionStorage flag).
2. <Header>: logo left, center nav (Services, Products, Industries, Work, About),
   right "Let's talk" magnetic button (8px radius) + menu toggle (two-line burger).
   Hides on scroll down and shows on scroll up (ScrollTrigger onUpdate direction).
   Switches color theme based on the section under it (data-theme).
3. <MenuOverlay>: fullscreen menu with big nav links, mega sub-lists for Services
   and Products, contact info, socials, and the live local time for India / UAE / Vietnam.
4. Page transitions with the Next.js App Router: a <TransitionLink> that plays
   the exit animation, router.push, then plays the enter animation (template.tsx).
5. <Footer>: giant "JADEQUEST" wordmark, CTA, sitemap columns, socials,
   offices, legal. Footer is "revealed" from under the page.
```

### 🎬 Animation Prompts

**A. Preloader: "Hash to Block"**
```
Preloader on #101815: a mono counter 000→100 (bottom-left, tied to real asset/font
loading, minimum 1.8s). In the center, a 64-character hex hash string scrambles
(random chars) and resolves left-to-right into "JADEQUEST" while the remaining characters fade.
At 100: a thin jade line draws across the screen, then the panel splits into
2 halves (top yPercent -100, bottom +100, "jade" ease, 1.1s), revealing the hero.
Emit a 'preloader:done' event that the hero intro listens for.
```

**B. Header behaviour**
```
Header: on load, links stagger in from yPercent 100 (0.05 stagger) after preloader.
Nav link hover: text rolls vertically (duplicate span slides up from below, 0.45s).
Hide on scroll down (yPercent -100, 0.5s), show on scroll up. Add a backdrop blur
+ hairline bottom border once scrollY > 80.
```

**C. Menu open/close**
```
Menu open: Lenis.stop(). A jade panel wipes in with clip-path from
circle(0% at <toggle position>) → circle(150%) over 1s "jade", then a dark panel follows
0.1s later. Big links reveal with masked yPercent 110→0, stagger 0.06, each with a mono index
"01". Hovering a link dims the others to 0.25 opacity and shows a small floating
preview (product/service visual) that follows the cursor with lag.
Close: reverse at 1.4× speed, then Lenis.start(). The burger morphs into an X.
Escape key closes the menu. Focus trap.
```

**D. Page transition: "Block Wipe"**
```
Exit: 6 vertical columns (jade #19B58A, then dark) scale from scaleY 0→1
(transform-origin bottom, stagger 0.05, 0.6s). Center shows the next page's title
in display font. Enter: columns scaleY 1→0 (origin top), new page hero runs its intro.
Scroll resets to top via lenis.scrollTo(0, {immediate:true}) while covered.
```

**E. Footer reveal**
```
Footer is position: sticky bottom under main (main has bg + margin-bottom = footer height),
so the page lifts away to reveal it. Giant "JADEQUEST" wordmark: chars rise
from yPercent 100 with stagger as the footer enters. The letters subtly follow
the cursor X (skew/translate). A "Back to top" magnetic button scrolls to 0 with Lenis.
```

### ✅ Acceptance
- [ ] Preloader plays once per session, then the hero intro starts
- [ ] Menu is keyboard accessible (Tab, Esc), focus trapped
- [ ] Transitions work with browser back/forward without breaking ScrollTrigger (kill + refresh)

---

## PHASE 4: Home Hero (the "wow" moment)

**Goal:** An original interactive hero that shows JadeQuest's core idea: *verifiable, mission-critical engineering*.

**Concept: "The Living Ledger"**: a WebGL field of thousands of jade particles arranged as a network of blocks/nodes. The headline **"Engineering Mission-Critical Software, Blockchain & AI"** sits on top. Moving the cursor disturbs the nodes, which then snap back into place, the way a ledger restores integrity. **Press & hold** charges a "Proof Burst": particles compress into a glowing core, then explode outward into a Merkle-tree formation. The hero shows the hint "Hold to verify ⟶ < 2s".

### 🧱 Build Prompt
```
Phase 4: Home hero.
Layout: full viewport. Top-left eyebrow "ENTERPRISE TECHNOLOGY · SINCE <year>".
Headline in 3 lines, huge display type:
  "Engineering"
  "Mission-Critical"
  "Software, Blockchain & AI."
Body copy (max 46ch) + CTAs: "Consult Our Engineers" (magnetic primary),
"Explore Products" (ghost). Bottom row: 4 stat chips (11+ Platforms · DLT & EVM ·
AI/ML in Production · <2s Cryptographic Proof) + "Scroll" indicator.
Background: <LedgerField/> React Three Fiber canvas (dynamic import, ssr:false).
Fallback for low-power/mobile/reduced-motion: a static poster image + CSS gradient.
```

### 🎬 Animation Prompts

**A. Hero intro timeline (after preloader)**
```
Build one GSAP timeline triggered by 'preloader:done':
0.0s  canvas particles fly in from z=-20 to their grid positions (1.6s, expo.out)
0.2s  headline lines reveal by chars from yPercent 120 + rotateX -60
      (perspective 800px, stagger 0.02, 1.2s expo.out)
0.9s  body copy fades and rises (y 30→0)
1.1s  CTAs scale 0.8→1 with back.out(1.7), stagger 0.1
1.3s  stat chips slide up, and their numbers scramble in
1.6s  scroll indicator: a looping line that draws downward
```

**B. LedgerField particle shader**
```
In R3F, create ~6,000 instanced points (2,500 on mobile) in a layered isometric grid
of "blocks" connected by thin lines (LineSegments, 10% of nearest neighbors).
Custom ShaderMaterial:
- uTime: gentle noise drift (simplex 3D, amplitude 0.05)
- uMouse (raycast to plane): points within radius 1.5 are pushed away
  (smoothstep falloff), then spring back with damping. Lines brighten near the cursor.
- uHold (0→1): while pointer is held, points pull toward the center (mix positions),
  core glow increases (additive blending, jade #19B58A → white).
- On release with uHold > 0.6: "Proof Burst". Points tween to a Merkle-tree target
  layout (precomputed positions) in 1.2s elastic, a ring shockwave expands, and a
  mono label "✓ VERIFIED · 1.84s" fades in, then the field returns to the grid after 3s.
Pause rendering when the hero is off-screen (IntersectionObserver → frameloop="demand").
Cap DPR at 1.75.
```

**C. Hero scroll-out**
```
ScrollTrigger on hero (start top top, end bottom top, scrub 1):
- headline lines move at different speeds (line1 y -120, line2 -60, line3 -20) and fade
- canvas camera dollies forward (z 6 → 2) and particles thin out
- the whole hero scales 1 → 0.92 with rounded corners 0 → 32px as the next
  section slides over it (next section has negative margin-top + higher z-index)
```

### ✅ Acceptance
- [ ] Hero hits 60fps on a mid-range laptop. Mobile uses the fallback or reduced particles.
- [ ] Press-and-hold works with mouse AND touch (pointer events)
- [ ] LCP element is the headline text (not the canvas), with LCP < 2.5s

---

## PHASE 5: Home Page Sections

Build each section separately. Each has its own build + animation prompt.

### 5.1 Manifesto / Intro
```
BUILD: Light section (#F3F2EA). A large statement paragraph (~40 words) about
JadeQuest: "We build production-grade software for institutions that cannot
afford to be wrong: sovereign e-governance, regulated finance, and supply chains
that need tamper-evident truth." With "More about us →" link.

ANIMATE: Scroll-scrubbed word highlight: split into words, all start at opacity 0.15,
and as you scroll (start "top 70%", end "bottom 60%", scrub) each word brightens to 1 in
sequence. Key words ("tamper-evident", "sovereign") turn jade, and a small inline
icon pops in next to them (scale 0→1, back.out).
```

### 5.2 Pillars: "Engineer · Verify · Scale"
```
BUILD: Pinned section showing the 4 pillars as giant words that swap:
Blockchain & Web3 / AI & Machine Learning / Custom Enterprise Software / e-Governance.
Each has a one-line description and a mono index.

ANIMATE: Pin for 300vh. Each pillar word enters from yPercent 100 with chars rotating
in on X, holds, then exits upward while the next enters. Behind it, an SVG line
illustration morphs between 4 shapes (chain links → neural net → stacked modules →
government building) using GSAP MorphSVG or path interpolation. Progress bar
(4 segments) on the left fills with scroll.
```

### 5.3 Services: Stacked Cards
```
BUILD: Heading "Full-Cycle Enterprise Technology Services". 6 featured service
cards (Blockchain & DLT, AI & ML, Cloud & DevOps, Custom Software & Modernization,
Web3 Protocols, Mobile) with title, description, 4–5 deliverable bullets, tech tags,
"Explore →". Link "View all 10 services".

ANIMATE: Sticky stacking cards. Each card is position: sticky with top offset
increasing by 24px. As the next card scrolls over, the previous one scales to
0.92 - i*0.02, darkens (brightness 0.6), and tilts rotateX 6deg. Inside each card, the
deliverable bullets draw a jade tick (stroke-dashoffset) one by one as the card
settles. Card hover: cursor becomes "VIEW" and a 3D visual tilts (max 8deg).
```

### 5.4 Products: Horizontal Scroll Showcase
```
BUILD: "11 Proprietary Platforms". Horizontal track of product panels: JustifAI,
JadeLedger, JaxMart, Portchain, BharatCarbon, eTDR, AgriSenti, JadeCourt, JadeEdu,
SMP, JadeLC. Each panel: name (huge), category, one-liner, stack tags, visual mockup,
"View product". End panel: "View Full Catalog →".

ANIMATE: Pin the section and translate the track horizontally (x: -(trackWidth - vw)),
scrub 1, with containerAnimation so inner panels can have their own triggers:
- Each mockup image has inner parallax (x ±10%) and a clip-path reveal
  (inset(0 100% 0 0) → inset(0 0 0 0)) when it reaches 70% of the viewport.
- Product names skew (skewX up to ±8deg) based on scroll velocity, clamped and eased back.
- A mono progress counter "03 / 11" updates live.
- Cursor shows "DRAG" and the track is also drag-scrollable (Observer).
Mobile: no pin. Use a native swipe carousel with scroll-snap instead.
```

### 5.5 Key Figures: Counters
```
BUILD: Grid of stats: 11 Platforms · 70+ Engineers · 4 Countries · 3 Operating Regions (IN, UAE, VN)
· 83% Engineering Graduates · <2s Proof Time.

ANIMATE: Numbers count up (snap 1) when in view, while digits use a "slot machine"
roll (each digit column translates through 0–9). Hairline grid borders draw in
(scaleX/scaleY 0→1) before numbers appear. Add a subtle world map dot-grid behind it,
where India, UAE, and Vietnam dots pulse jade and arcs draw between them (SVG path draw).
```

### 5.6 Industries: Hover-reveal List
```
BUILD: Big list rows: Healthcare, Banking & FinTech, Education & EdTech, Logistics &
Supply Chain, Manufacturing & Industry 4.0, Real Estate & PropTech, Government.
Each row: index, name, related products, arrow.

ANIMATE: Row hover → a jade fill rises from the bottom of the row (scaleY 0→1, origin
bottom), text flips to dark, and the arrow rotates -45deg. A floating image card
(industry visual) follows the cursor with lag (quickTo 0.6s), rotating slightly by
velocity, and crossfades between images when moving across rows. Rows reveal on
scroll with masked text + divider lines drawing left→right.
```

### 5.7 Case Studies
```
BUILD: 3 large case study cards: Zero-Exposure Credential Verification (Gov & Higher Ed),
Intermodal Port Clearance (Logistics), B2B Marketplace & Milestone Escrow (FinTech).
Each: sector tag, title, 1-line result, image, "Read Case Study".

ANIMATE: Cards alternate left/right. The image reveals with a clip-path wipe plus scale 1.3→1.
On scroll, image moves at 0.85× speed (parallax). Hover: the image scales to 1.05 and an
RGB-split / displacement distortion runs (optional small R3F plane with a
displacement shader). Cursor = "VIEW". Clicking uses a Flip transition: the image
expands into the case study hero of the next page.
```

### 5.8 Tech Stack & Partners Marquee
```
BUILD: Two marquee rows: technologies (Hyperledger Fabric, Solidity, Go, Kubernetes,
AWS, Azure, GCP, PyTorch, Next.js, Node.js, PostgreSQL, TimescaleDB, LoRaWAN, HL7/FHIR...)
and partner logos.

ANIMATE: Infinite marquees in opposite directions. Speed reacts to scroll velocity
(faster + direction flips with scroll direction). Hovering a row slows it to 0.2×.
Logos are grayscale and turn to color on hover. Edges fade with a mask-image gradient.
```

### 5.9 Final CTA: "Let's Build the Future Together"
```
BUILD: Huge two-line CTA, magnetic circular "Get in touch" button (200px),
email link contact@jadequest.com, quick inquiry form (name, email, service select,
budget chips, message ≥20 chars) using react-hook-form + zod.

ANIMATE: Section background transitions dark → jade gradient as it enters
(scrub). The particles from the hero reappear and converge into the CTA button
(reuse LedgerField in a small canvas, or a 2D canvas version). The circular button
has rotating text "LET'S TALK · LET'S TALK ·" around it, which speeds up on hover.
Form fields: label floats up on focus, an underline draws jade, and on success the
button morphs into a ✓ with a confetti of tiny hash characters.
```

### ✅ Acceptance (Phase 5)
- [ ] All ScrollTriggers refresh correctly after fonts/images load (`ScrollTrigger.refresh()` after `document.fonts.ready`)
- [ ] No horizontal overflow on mobile
- [ ] Each section degrades gracefully with reduced motion

---

## PHASE 6: Inner Pages

### 🧱 Build Prompt
```
Phase 6: Inner pages using shared templates and the existing motion components.

1. Page hero template <PageHero eyebrow title intro visual>: used on all inner pages.
   Animation: title chars reveal, visual clip-path reveal, breadcrumbs fade.
2. /services: grid of 10 services with hover-reveal list (reuse 5.6).
   /services/[slug]: hero, "What we deliver" sticky-left/scrolling-right layout,
   tech stack chips, related products, process timeline, FAQ accordion, CTA.
3. /products: filterable grid (by industry). Filter uses GSAP Flip for re-layout.
   /products/[slug]: hero with large product name + mockup, problem → solution,
   feature list, architecture diagram (animated SVG: nodes appear, lines draw,
   data packets travel along paths), stack, "Request a demo".
4. /industries + /industries/[slug]: challenges, JadeQuest products used, case studies.
5. /case-studies + /case-studies/[slug]: Flip-in hero from listing, challenge /
   approach / architecture / outcome sections, big metric callouts with counters,
   "Next case study" footer panel (scroll to the end → it pulls you in).
6. /about: story timeline (horizontal), MD section (Rohan Bhatt, 15+ years, quote
   with masked line reveal), 4 pillars, global presence map, CSR
   (Health Access, Sustainable Education, Holistic Well-being), values.
7. /careers: "Build the Future With Us", key figures (70+, 4 continents, 69%
   trilingual, 40/60, 83%), perks grid with icon micro-animations, openings
   accordion, application form (resume upload ≤5MB).
8. /contact: split layout, large form, office cards for India / UAE / Vietnam with live clocks,
   WhatsApp/Telegram/Discord quick links.
9. /blog and /events: listing with Flip filters + MDX detail pages with reading progress bar.
Generate static params for all [slug] routes from src/content.
```

### 🎬 Animation Prompts

**A. Sticky split layout (service detail)**
```
Left column: sticky title + mono progress list of deliverables. Right column:
deliverable blocks scroll. As each block hits center, its matching left item becomes
active (jade dot, text to 100% opacity, others 40%) and the left illustration
crossfades. Use ScrollTrigger per block with onToggle.
```

**B. Animated architecture diagram (product pages)**
```
SVG architecture diagram (e.g., JustifAI: Scanner → Hash → Fabric Ledger → Merkle
Proof → Verified). On scroll into view: nodes pop in (scale 0→1, stagger),
connectors draw (stroke-dashoffset), then small jade "data packets" loop along the
paths using MotionPathPlugin. Hovering a node shows a tooltip and highlights its edges.
```

**C. Process timeline**
```
Vertical timeline (Discover → Architect → Build → Verify → Scale). A jade line fills
with scroll (scaleY scrub). Each step's circle fills when the line reaches it, and the step
content reveals from x:40. Mobile: same, left-aligned.
```

**D. Flip filters**
```
On filter click: Flip.getState(cards), update the filter, then Flip.from(state, {duration:0.7,
ease:"jade", stagger:0.03, absolute:true, onEnter: fade+scale in, onLeave: fade+scale out}).
Active filter pill has a sliding jade background (Flip on the indicator).
```

### ✅ Acceptance
- [ ] Every route has unique metadata, OG image, and a working page transition
- [ ] Dynamic routes are statically generated

---

## PHASE 7: Micro-interactions & Polish

### 🎬 Animation Prompts
```
1. Button text roll on hover (duplicated label slides up), arrow icons slide out
   right and a new arrow slides in from the left.
2. Link underline: draws left→right on hover, retracts right on leave.
3. Image hover: inner scale 1.06 + slight grayscale→color.
4. Text scramble on mono labels when hovered (hex chars → final text, 0.5s).
5. Scroll progress: thin jade bar at top of the viewport (scaleX scrub).
6. Section theme switch: body background tweens between dark/light as sections
   with data-theme cross the viewport center. The header and cursor adapt.
7. Velocity skew: large headings skew slightly on fast scroll (clamped ±5deg).
8. 404 page: particles spell "404", with the "Block not found in ledger" message
   and a magnetic "Back home" button.
9. Toast/notification for form success, sliding in with a spring.
10. Sound toggle (optional, off by default): soft UI ticks on hover.
```

### Accessibility & Responsive Prompt
```
Audit the whole site:
- prefers-reduced-motion: disable Lenis, WebGL → poster, all transforms → opacity fades
- Keyboard: visible focus rings (jade 2px outline offset 4px), skip-to-content link,
  menu & modals with focus trap, no keyboard traps in pinned sections
- Screen readers: SplitText keeps aria-label on the parent; decorative canvases aria-hidden
- Color contrast AA for all text (muted text on dark ≥ 4.5:1)
- Breakpoints: 360, 768, 1024, 1440, 1920+. Pinned/horizontal sections convert to
  vertical stacks below 768px using gsap.matchMedia()
- Touch: cursor off, magnetic off, hover-reveals become tap or always-visible
```

### ✅ Acceptance
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Every page is usable with keyboard only and with reduced motion on

---

## PHASE 8: Performance, SEO & Launch

### 🧱 Build Prompt
```
Phase 8: Performance, SEO & deploy.
Performance:
- Dynamic import for three/R3F and heavy sections. GSAP plugins only where used.
- next/image with AVIF/WebP, correct sizes, priority only for the hero poster.
- Preload display font. Subset fonts to Latin.
- Kill all ScrollTriggers/contexts on route change. Check for memory leaks.
- Budget: JS < 250KB gzip on home (excluding three chunk loaded after LCP),
  LCP < 2.5s, CLS < 0.05, INP < 200ms.
SEO:
- Metadata API per page, canonical URLs, OG/Twitter images (generated with next/og
  in brand style), sitemap.xml, robots.txt.
- JSON-LD: Organization, WebSite, Service (per service), SoftwareApplication
  (per product), Article (case studies/blog), BreadcrumbList.
- Keep existing URL structure or add 301 redirects from old jadequest.com paths
  (/about/case-studies/* → /case-studies/*, etc.).
Forms: server actions + email (Resend) + reCAPTCHA v3 / Turnstile, rate limiting.
Analytics: Vercel Analytics or GA4 (consent banner, privacy-first default).
Deploy: Vercel. Preview deployments per PR.
```

### ✅ Launch Checklist
- [ ] Lighthouse Performance ≥ 90 desktop / ≥ 75 mobile
- [ ] All old URLs redirect correctly
- [ ] Forms deliver to contact@jadequest.com and careers@jadequest.com
- [ ] Tested on Chrome, Safari (macOS + iOS), Firefox, Edge, and an Android mid-range phone
- [ ] Favicon, manifest, OG previews verified (LinkedIn, X, WhatsApp)

---

## Animation Inventory (quick reference)

| # | Effect | Where | Tech |
|---|---|---|---|
| 1 | Hash→Wordmark preloader + split exit | Global | GSAP timeline |
| 2 | Smooth scroll | Global | Lenis + ScrollTrigger |
| 3 | Jade Node cursor with states | Global | gsap.quickTo |
| 4 | Magnetic buttons + fill sweep | Global | GSAP |
| 5 | Masked line/char text reveals | Global | SplitText |
| 6 | Block-wipe page transitions | Global | GSAP + App Router |
| 7 | Clip-path circular menu | Header | GSAP |
| 8 | Living Ledger particles + Hold-to-verify burst | Hero | R3F + GLSL |
| 9 | Hero scroll-out scale/round corners | Hero | ScrollTrigger scrub |
| 10 | Scroll-scrubbed word highlight | Manifesto | SplitText + scrub |
| 11 | Pinned pillar word swap + SVG morph | Pillars | Pin + MorphSVG |
| 12 | Sticky stacking service cards | Services | CSS sticky + GSAP |
| 13 | Horizontal product track + velocity skew | Products | Pin + containerAnimation |
| 14 | Slot-machine counters + map arcs | Stats | GSAP |
| 15 | Hover-reveal list + cursor-follow image | Industries | quickTo |
| 16 | Clip-path image reveals + Flip to detail | Case studies | Flip |
| 17 | Velocity-reactive marquees | Tech/Partners | GSAP ticker |
| 18 | Particle-converge CTA + rotating text button | CTA | Canvas + GSAP |
| 19 | Sticky footer reveal + wordmark | Footer | CSS sticky + GSAP |
| 20 | Animated architecture diagrams | Product pages | MotionPath |

---

## Suggested Timeline

| Phase | Effort |
|---|---|
| 1. Foundation | 2–3 days |
| 2. Motion engine | 3–4 days |
| 3. Shell (preloader/menu/transitions/footer) | 4–5 days |
| 4. Hero WebGL | 5–7 days |
| 5. Home sections | 7–10 days |
| 6. Inner pages | 10–14 days |
| 7. Polish & a11y | 4–5 days |
| 8. Perf, SEO, launch | 3–4 days |
| **Total** | **~6–8 weeks (1 senior front-end dev)** |

---

## Assets You Need to Provide
- [ ] JadeQuest logo (SVG, light + dark) and logomark for favicon
- [ ] Product screenshots / mockups for all 11 platforms
- [ ] Case study images and real metrics (verify the published numbers)
- [ ] Team / office photos (optional), Rohan Bhatt portrait
- [ ] Partner & client logos (with permission)
- [ ] Real team / office photography (natural light, candid). Avoid stock or AI-generated portraits
- [ ] Confirm figures that conflict on the current site: "11+" vs "11" platforms, and 3 vs 4 countries
