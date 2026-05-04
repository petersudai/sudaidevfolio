# Peter Sudai — Portfolio v3

Next.js 14 · TypeScript · Tailwind CSS

## What changed in v3
- **Font**: Plus Jakarta Sans (body) — sharp, modern, premium SaaS standard. Replaces DM Sans.
- **Code font**: JetBrains Mono — crisp and technical. Replaces DM Mono.
- **Contrast**: Full CSS custom property system (--s0→--s5 surfaces, --t1→--t4 text hierarchy)
  - Each surface level is clearly distinct (no more muddy blending)
  - Body text --t2 (#8eafc8) is clearly readable against dark surfaces
  - Labels --t3 (#4d6f88) are visible hints, not invisible ghosts
- **Type scale**: Bumped across the board — no more 10px labels
  - Labels: 12px (was 10px)
  - Body copy: 15–16px (was 13px)
  - Section subheads: 17px (was 14px)
- **Select dropdowns**: Fixed — explicit `background-color` on `option` elements,
  custom SVG arrow, proper focus states. Options are always visible.
- **Section separation**: Alternating --s1/--s2/--s3 backgrounds + 1px gradient dividers
- **Animations**: All preserved — canvas particles, typewriter, scroll reveals, 
  interactive process steps, hover lifts with box-shadow

## Quick Start
```bash
npm install
npm run dev        # → localhost:3000
npm run build      # production build
```

## Deploy (Vercel)
```bash
npx vercel         # or push to GitHub → vercel.com/new
```

## File Map
| Section       | File                                   |
|---------------|----------------------------------------|
| Design tokens | app/globals.css (:root CSS vars)       |
| Type scale    | tailwind.config.ts                     |
| Hero          | components/sections/Hero.tsx           |
| Services      | components/sections/Services.tsx       |
| Work          | components/sections/Work.tsx           |
| Process       | components/sections/Process.tsx        |
| About         | components/sections/About.tsx          |
| Testimonials  | components/sections/Testimonials.tsx   |
| Contact       | components/sections/Contact.tsx        |
| Navbar        | components/layout/Navbar.tsx           |

## To complete
1. Replace testimonials with real client quotes
2. Add your LinkedIn URL (search "linkedin.com" in components)
3. Connect form to Resend/Formspree for real email delivery
4. Add project screenshots to replace mock UIs in Work.tsx
