# emretirabzonlu.dev

Personal portfolio site — Full Stack Developer (.NET + React).

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12, GSAP 3 + ScrollTrigger |
| 3D | React Three Fiber 9, Three.js 0.184, @react-three/drei |
| Smooth Scroll | Lenis 1.3 (GSAP-driven RAF) |
| UI Primitives | shadcn/ui v4 (base-ui) |
| Icons | lucide-react |
| Toasts | sonner |

## Local Development

```bash
npm install
npm run dev          # http://localhost:3000 (Turbopack)
```

## Build & Start

```bash
npm run build
npm start
```

## Deploy

Optimized for **Vercel** (zero-config). Push to `main` for automatic deployment.

Environment variables (copy `.env.example` → `.env.local`):

```
NEXT_PUBLIC_SITE_URL=https://emretirabzonlu.dev
```

## Project Structure

```
app/
  layout.tsx          Root layout — metadata, providers, loading screen
  page.tsx            Home — all sections in sequence
  globals.css         Tailwind v4, palette, keyframes
  opengraph-image.tsx Auto-generated OG image (Next.js Edge)
  robots.ts           robots.txt (Next.js native)
  sitemap.ts          sitemap.xml (Next.js native)
  hi/                 NFC card page — no nav/footer, mobile-first

components/
  layout/             Navbar, Footer
  sections/           Hero, About, Skills, Projects, Experience, Contact
  three/              ParticleSphere, HeroScene, SkillsOrbit
  ui/                 SectionHeading, Reveal, TiltCard, CountUp,
                      MagneticButton, CustomCursor, LiquidButton,
                      ProjectMockup, LoadingScreen, GradientMesh, EasterEggs
  providers/          LenisProvider (GSAP ticker integration)

lib/
  data.ts             All content — heroData, aboutData, projectsData, ...
  lenis-store.ts      Lenis singleton for cross-component access
  hooks/              useReducedMotion, useMediaQuery
```

## Lighthouse Scores

| Metric | Score |
|--------|-------|
| Performance | — |
| Accessibility | — |
| Best Practices | — |
| SEO | — |

_Run `npx lighthouse https://emretirabzonlu.dev --view` after deploy._
