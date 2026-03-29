# Operation Healing Waters

A nonprofit website for **Operation Healing Waters** — a veteran-focused organization providing free guided fishing outings for veterans and underprivileged youth, led by Captain Derrious Austin.

## Tech Stack

- **Framework:** Next.js 16 (static export)
- **UI:** React 19, TypeScript, Tailwind CSS 4, Framer Motion 12
- **Contact:** EmailJS integration
- **Donations:** Zeffy (zero-fee nonprofit payments)
- **Hosting:** Cloudflare Pages

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build
```

Static output goes to `out/`. Deploy to Cloudflare Pages via Wrangler or GitHub integration.

## Project Structure

```
app/
  layout.tsx        # Font loading, metadata, theme-color
  page.tsx          # Root layout — all sections composed here
  globals.css       # Base styles, wave keyframes, reduced-motion

components/
  SideNav.tsx       # Navigation (desktop pill + mobile bottom bar)
  Hero.tsx          # Full-screen parallax hero
  ImpactStrip.tsx   # Animated stat counters
  OurStory.tsx      # Mission story (two-column)
  Programs.tsx      # Veterans + Youth program cards
  DonationTiers.tsx # Three-tier donation cards (Zeffy)
  CharterPricing.tsx# Charter fishing packages
  Gallery.tsx       # Photo gallery with lightbox
  SocialFeed.tsx    # Instagram embed + social follow links
  Contact.tsx       # Contact form (EmailJS)
  Footer.tsx        # Footer with links and social
  WaveDivider.tsx   # Animated SVG wave section dividers

lib/
  constants.ts      # URLs, contact info, social handles
  animations.ts     # Shared Framer Motion variants
  emailjs.ts        # EmailJS configuration
```

## Design

The site uses a nautical-inspired dark theme with the following color palette:

| Token | Hex | Usage |
|-------|-----|-------|
| Navy | `#0A1628` | Backgrounds, overlays |
| Teal | `#0E7490` | Accents, secondary CTAs |
| Green | `#059669` | Success states |
| Gold | `#F59E0B` | Primary CTAs, highlights |
| Sky | `#A1CFFB` | Glass borders, tints |
| Off-white | `#F8FAFC` | Light backgrounds |

Typography: **Lora** (headings) · **Raleway** (body)

## License

Private — built for Operation Healing Waters.
