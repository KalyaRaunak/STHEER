# STHEER — Website v2 Optimisation Prompt
**For: Antigravity AI Website Builder**
**Base:** stheer-topaz.vercel.app (existing build)
**Purpose:** Add minimal animations, fill blank image areas with Unsplash images, optimise performance

---

## TASK SUMMARY

This is an optimisation pass on the existing STHEER website. Three goals:

1. **Add minimal, premium animations** — restrained Framer Motion scroll reveals across all pages
2. **Fill all blank/placeholder image areas** with relevant Unsplash images
3. **Performance optimisation** — lazy loading, font loading, bundle trimming

Do NOT redesign or change any layout, colours, typography, or copy. Only enhance what exists.

---

## PART 1 — ANIMATION SYSTEM

### Philosophy
UK premium agency aesthetic. Every animation must feel intentional and calm — never bouncy, never distracting. Think a high-end consultancy, not a startup landing page.

### Install / Confirm Dependency
```bash
npm install framer-motion
```

### Global Animation Config
Create `src/lib/animations.ts` and paste this exactly:

```typescript
// src/lib/animations.ts
// Reuse these variants everywhere — do not invent new ones

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }
  }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
}

export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.0
    }
  }
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
}

export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
}

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
}

// Viewport settings — use on every motion.div wrapper
export const viewport = { once: true, amount: 0.15 }
```

---

### Animation Application — Page by Page

#### HOME PAGE

**Hero Section:**
```tsx
// Wrap headline words in individual motion.span
// Stagger each word: delay = index * 0.08s
// Each word: opacity 0 → 1, y: 16 → 0, duration 0.5s

import { motion } from 'framer-motion'
import { fadeUp, fadeIn, staggerContainer, viewport } from '@/lib/animations'

// Hero headline — word by word
const headline = "We Only Grow If You Grow."
const words = headline.split(' ')

<motion.h1
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  {words.map((word, i) => (
    <motion.span
      key={i}
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.08 }
        }
      }}
      style={{ display: 'inline-block', marginRight: '0.25em' }}
    >
      {word}
    </motion.span>
  ))}
</motion.h1>

// Sub-headline: fade in after headline completes
<motion.p
  variants={fadeUp}
  initial="hidden"
  animate="visible"
  transition={{ delay: 0.75 }}
>
  ...sub-headline text...
</motion.p>

// Supporting line
<motion.p
  variants={fadeIn}
  initial="hidden"
  animate="visible"
  transition={{ delay: 1.0 }}
>
  ...supporting line...
</motion.p>

// CTA buttons
<motion.div
  variants={fadeUp}
  initial="hidden"
  animate="visible"
  transition={{ delay: 1.15 }}
>
  ...buttons...
</motion.div>
```

**Stats Section:**
```tsx
// Wrap section in staggerContainer, each stat card in fadeUp
// Counter animation on number:

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000 // 2 seconds
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

// Usage: <AnimatedCounter target={340} suffix="%" />
// For non-numeric stats like "One Consistent Goal" — just use fadeUp, no counter
```

**Service Cards (What We Build):**
```tsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={viewport}
  className="grid grid-cols-2 gap-6"  // keep existing grid classes
>
  {services.map((service, i) => (
    <motion.div
      key={i}
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* existing card content */}
    </motion.div>
  ))}
</motion.div>
```

**Growth System Steps:**
```tsx
// Wrap the 5 steps in staggerContainer
// Each step: fadeUp variant
// Connecting line between steps (desktop): draw with CSS, not animated (keep it simple)

<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={viewport}
>
  {steps.map((step, i) => (
    <motion.div key={i} variants={fadeUp}>
      {/* step content */}
    </motion.div>
  ))}
</motion.div>
```

**Results Cards:**
```tsx
// Same staggerContainer + fadeUp pattern
// Metric number: use AnimatedCounter where applicable
// Non-numeric metric (e.g. "3x"): fadeUp only
```

**Closing CTA Section:**
```tsx
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={viewport}
>
  {/* headline, body, button */}
</motion.div>
```

---

#### ABOUT PAGE

**Page Hero:**
```tsx
// Headline: same word-by-word reveal as Home hero (reuse same pattern)
// No sub-headline on this page — let it breathe
```

**Founder Story:**
```tsx
// Two-column layout
// Left column (quote + label): slideInLeft
// Right column (paragraphs): slideInRight
// Apply to the section wrapper, stagger children paragraphs with 0.1s delay each

<motion.div
  className="grid grid-cols-2 gap-16"
  initial="hidden"
  whileInView="visible"
  viewport={viewport}
>
  <motion.div variants={slideInLeft}>
    {/* label + pull quote */}
  </motion.div>
  <motion.div variants={staggerContainer}>
    {paragraphs.map((p, i) => (
      <motion.p key={i} variants={fadeUp}>{p}</motion.p>
    ))}
  </motion.div>
</motion.div>
```

**Mission Section:**
```tsx
// Centred block: fadeUp, viewport once
```

**Values Cards:**
```tsx
// staggerContainer + scaleUp variant — slightly different from fadeUp, adds variety
```

**Team Cards:**
```tsx
// staggerContainer + fadeUp
// Team member image: scaleUp variant
```

---

#### SERVICES PAGE

**Page Hero:**
```tsx
// fadeUp on label, headline, sub-headline in sequence (delay 0, 0.15, 0.3)
```

**Sticky Tab Bar:**
```tsx
// No animation — it's a navigation element, should be instant
// Active tab yellow underline: CSS transition width 200ms ease
```

**Each Service Section (1–4):**
```tsx
// Section label: fadeIn
// Headline: fadeUp (delay 0.1)
// Sub-headline: fadeUp (delay 0.2)
// Body paragraphs: fadeUp (delay 0.3)
// Deliverables list: staggerContainer + fadeUp per item
// CTA: fadeUp (delay 0.5)

// Two-column layouts (if image on one side): slideInLeft / slideInRight split
```

---

#### WORK / PORTFOLIO PAGE

**Filter Tabs:**
```tsx
// No entrance animation — instant
// On filter change: portfolio cards fade out (opacity 0, 150ms) then fade in (opacity 1, 250ms)
// Use AnimatePresence for this:

import { AnimatePresence, motion } from 'framer-motion'

<AnimatePresence mode="wait">
  <motion.div
    key={activeFilter}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {/* filtered cards grid */}
  </motion.div>
</AnimatePresence>
```

**Portfolio Cards:**
```tsx
// staggerContainer + scaleUp (adds variety vs fadeUp used elsewhere)
// Image area hover: scale(1.04) on img element, overflow hidden on container
// transition: 400ms ease
```

---

#### CONTACT PAGE

**Page Hero:**
```tsx
// fadeUp — headline, then sub-headline (delay 0.2)
```

**Form + Right Column:**
```tsx
// slideInLeft on form column
// slideInRight on contact info column
// Both trigger on viewport entry
```

**Form Submit button:**
```tsx
// On hover: whileHover={{ scale: 1.01 }}
// On click/submit: whileTap={{ scale: 0.98 }}
// Loading state: show lucide Loader2 icon spinning (CSS animation: animate-spin)
```

---

### Global Micro-Interactions

**All primary buttons:**
```tsx
<motion.button
  whileHover={{ y: -2 }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.15 }}
>
  Book Strategy Call
</motion.button>
```

**All ghost/outline buttons:**
```tsx
// CSS transition only (no Framer Motion needed)
// border-color: rgba(255,255,255,0.3) → #FFD700
// color: white → #FFD700
// transition: 200ms ease
```

**Navigation links:**
```tsx
// CSS only
// color: white → #FFD700
// transition: 200ms ease
// No underline — colour change is sufficient
```

**Scroll-to-top button (if present):**
```tsx
// Show/hide with AnimatePresence
// Entrance: opacity 0 → 1, y: 16 → 0 (300ms)
// Exit: opacity 1 → 0, y: 0 → 16 (200ms)
```

---

## PART 2 — UNSPLASH IMAGES FOR BLANK SECTIONS

Use these exact Unsplash URLs. They are free, no API key needed, and sized for web use.
Add `?auto=format&fit=crop&w=1200&q=80` to the end of each base URL for optimal loading.

All images: add `loading="lazy"` attribute. Add `decoding="async"`. Add descriptive `alt` text.

---

### HOME PAGE — Results Section (4 project result cards)

Each result card gets a background or top image representing the industry.

**Result Card 1 — E-Commerce (+340% Revenue):**
```
URL: https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80
Alt: E-commerce dashboard showing growth metrics
```

**Result Card 2 — SaaS Startup (10,000+ Users):**
```
URL: https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80
Alt: SaaS software platform interface on laptop screen
```

**Result Card 3 — Hospitality (+500% Engagement):**
```
URL: https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80
Alt: Premium hotel lobby interior
```

**Result Card 4 — Real Estate (3x Leads):**
```
URL: https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80
Alt: Modern property exterior for real estate listing
```

Image placement in cards:
- Add a top image strip (aspect-ratio 16/7, `object-fit: cover`, `border-radius: 4px 4px 0 0`)
- Below image: existing card content (metric, label, tag, description)
- Image overlay: `linear-gradient(to bottom, transparent 60%, rgba(26,26,26,0.95) 100%)` so card bg bleeds in smoothly

---

### ABOUT PAGE — Founder Story Section

**Left column decorative image (team at work / strategic planning):**
```
URL: https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80
Alt: Team collaborating on digital strategy in a modern office
```
Placement: Below the pull quote. Aspect ratio 4:3. `border-radius: 4px`. Full width of left column.

**Right column decorative image (optional — only if column feels sparse):**
Not required if copy fills the column adequately.

---

### ABOUT PAGE — Team Section (Placeholder Team Cards)

Until real team photos are provided, use these professional placeholder portraits.
Apply consistent treatment: grayscale filter (`filter: grayscale(100%)`), hover removes grayscale (`filter: grayscale(0%)`, `transition: 400ms ease`).

**Team Member 1:**
```
URL: https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80
Alt: Team member portrait placeholder
```

**Team Member 2:**
```
URL: https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80
Alt: Team member portrait placeholder
```

**Team Member 3:**
```
URL: https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80
Alt: Team member portrait placeholder
```

**Team Member 4 (if grid has 4):**
```
URL: https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80
Alt: Team member portrait placeholder
```

Add a small badge below each image: `[Placeholder — Real Photo Coming Soon]`
Style: DM Sans Regular, 0.75rem, #888888, italic. This is transparent to the client and professional.

---

### SERVICES PAGE — Service Section Hero Images

Each of the 4 service sections gets a supporting visual in the two-column layout (image on one side, copy on the other). Alternate image position: Service 1 right, Service 2 left, Service 3 right, Service 4 left.

**Service 1 — Websites & Systems:**
```
URL: https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80
Alt: Developer working on website code on dual monitors
```

**Service 2 — Growth Marketing:**
```
URL: https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=900&q=80
Alt: Digital marketing analytics dashboard showing growth charts
```

**Service 3 — Social Media & Content:**
```
URL: https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=900&q=80
Alt: Social media content creation and scheduling workflow
```

**Service 4 — Brand & Design:**
```
URL: https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80
Alt: Brand design mood board with colour swatches and typography
```

Image treatment for all service images:
- Aspect ratio: 4:3
- `border-radius: 4px`
- `object-fit: cover`
- Subtle overlay: `linear-gradient(135deg, rgba(255,215,0,0.06) 0%, transparent 60%)`
- On hover: `scale(1.02)`, `transition: 500ms ease` (container: `overflow: hidden`)

---

### WORK / PORTFOLIO PAGE — Placeholder Project Cards

Until real portfolio images are added, use these. Label each card with its placeholder category.

**Web & SaaS projects:**
```
Card 1: https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=700&q=80
Alt: E-commerce website on laptop screen
Category tag: Websites & Systems
Project title: E-Commerce Platform Rebuild
Outcome: +340% revenue in 6 months
```

```
Card 2: https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=700&q=80
Alt: Mobile app interface on smartphone
Category tag: Software & SaaS
Project title: Client Portal & SaaS Platform
Outcome: 10,000+ active users onboarded
```

**Marketing projects:**
```
Card 3: https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=700&q=80
Alt: Digital advertising campaign performance dashboard
Category tag: Digital Growth
Project title: Paid Media Growth Campaign
Outcome: 3x lead volume within 90 days
```

```
Card 4: https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=700&q=80
Alt: Social media content grid on smartphone
Category tag: Social Media
Project title: Hospitality Brand Social Presence
Outcome: +500% engagement rate
```

**Design projects:**
```
Card 5: https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=700&q=80
Alt: Brand identity design system with logo and colours
Category tag: Brand & Design
Project title: Brand Identity System
Outcome: Full visual identity delivered in 3 weeks
```

```
Card 6: https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=700&q=80
Alt: Real estate property photography for marketing
Category tag: Digital Growth
Project title: Real Estate Lead Infrastructure
Outcome: 3x qualified leads month-on-month
```

---

### CONTACT PAGE — Optional Supporting Visual

If the contact page has an image area or feels visually sparse on one side, add:
```
URL: https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80
Alt: Modern office meeting space in the UK
```
Treatment: Full height of the column, `object-fit: cover`, slight dark overlay `rgba(0,0,0,0.4)`.
Overlay text (centred, on top of image): *"A conversation, not a sales pitch."* — Montserrat Bold, white.

---

## PART 3 — PERFORMANCE OPTIMISATIONS

### 3.1 Image Optimisation

For all Unsplash images, ensure:
```tsx
<img
  src="https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=900&q=80"
  alt="Descriptive alt text"
  loading="lazy"
  decoding="async"
  width={900}
  height={600}  // set actual dimensions to prevent layout shift
/>
```

For hero images that are above the fold: use `loading="eager"` instead of `lazy`.

### 3.2 Font Loading

In `index.html`, ensure fonts use `display=swap` and `preconnect`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap"
  rel="stylesheet"
>
```

Remove any unused font weights. Do not load Poppins or Inter unless they are actually used in the current build.

### 3.3 Framer Motion — Tree Shaking

Import only what is used. Never import the entire library:
```tsx
// ✅ Correct
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ❌ Incorrect
import * as Framer from 'framer-motion'
```

### 3.4 Scroll Behaviour

Add smooth scroll to the HTML element in `globals.css`:
```css
html {
  scroll-behavior: smooth;
}
```

For the sticky services tab bar, use this for smooth section jumping:
```tsx
const handleTabClick = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  setActiveTab(id)
}
```

### 3.5 React Router Scroll Reset

If using React Router, add this to scroll to top on every page navigation:
```tsx
// src/components/ScrollToTop.tsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// In App.tsx, inside <Router>:
// <ScrollToTop />
```

### 3.6 Vite Build Optimisation

In `vite.config.ts`, add manual chunk splitting:
```ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'framer': ['framer-motion'],
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        'icons': ['lucide-react']
      }
    }
  }
}
```

### 3.7 Tailwind CSS Purge Check

In `tailwind.config.js`, ensure `content` includes all source files:
```js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```
This ensures unused Tailwind classes are purged in production, reducing CSS bundle size significantly.

---

## PART 4 — FINAL QA CHECKLIST

Before deploying, verify:

**Animations:**
- [ ] Hero headline word-by-word reveal works on Home and About
- [ ] All scroll-triggered sections use `viewport: { once: true }` — animations do not replay on scroll-up
- [ ] No animation feels jarring, fast, or distracting at normal scroll speed
- [ ] Stagger is applied to all card grids (service cards, result cards, portfolio cards, value cards)
- [ ] Counter animation fires correctly on Stats section viewport entry
- [ ] Portfolio filter transition works with AnimatePresence
- [ ] Button hover/tap states feel responsive (not sluggish)

**Images:**
- [ ] All result cards have top image strips
- [ ] Team section has placeholder portraits with grayscale treatment
- [ ] Each service section has a supporting image in two-column layout
- [ ] Portfolio cards all have project images
- [ ] Contact page supporting visual added (if applicable)
- [ ] All images have `alt` text, `loading="lazy"`, `decoding="async"`
- [ ] Hero/above-fold images use `loading="eager"`

**Performance:**
- [ ] Google Fonts preconnect links present in `<head>`
- [ ] `scroll-behavior: smooth` applied
- [ ] ScrollToTop component added to App router
- [ ] Framer Motion imports are specific (not wildcard)
- [ ] Vite manual chunks configured
- [ ] Tailwind purge content paths are correct

**Cross-browser/device:**
- [ ] Test on mobile (375px) — all animations run smoothly, no janky transitions
- [ ] Test on Safari — Framer Motion cubic-bezier easing works correctly
- [ ] Test on tablet (768px) — grid layouts switch correctly

---

*STHEER Website v2 Optimisation Prompt*
*Ready for Antigravity AI Website Builder upload*
*© 2026 STHEER | info@stheer.co.uk | stheer.co.uk*
