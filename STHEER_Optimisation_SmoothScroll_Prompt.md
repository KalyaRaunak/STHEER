# STHEER — Performance Optimisation & Smooth Scrolling Prompt
**For: Antigravity AI Website Builder**
**Scope: Full site — all pages, all components**

---

## OVERVIEW

This prompt covers two goals:
1. **Smooth scrolling** — buttery page scroll, anchor navigation, route transitions, scroll-linked effects
2. **Performance optimisation** — fast load, no jank, lighthouse score improvements

Do NOT change any design, layout, colours, or copy. Only optimise what exists.

---

## PART 1 — SMOOTH SCROLLING

---

### 1.1 Global CSS Smooth Scroll

In `src/styles/globals.css` — add at the very top:

```css
/* ─── Smooth Scroll ─── */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* offset for fixed navbar height (72px + 8px breathing room) */
}

/* Reduce motion for accessibility — respects user OS setting */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 1.2 Lenis Smooth Scroll Library

CSS `scroll-behavior: smooth` is basic. For a truly premium, inertia-based scroll (like high-end agency sites), install **Lenis**:

```bash
npm install @studio-freight/lenis
```

Create `src/lib/lenis.ts`:

```typescript
// src/lib/lenis.ts
import Lenis from '@studio-freight/lenis'

let lenis: Lenis | null = null

export function initLenis() {
  lenis = new Lenis({
    duration: 1.2,           // scroll animation duration (seconds) — 1.2 feels premium
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo easing
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,    // slightly slower than native — feels heavier/premium
    touchMultiplier: 1.5,    // normal on touch devices
    infinite: false
  })

  function raf(time: number) {
    lenis!.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  return lenis
}

export function getLenis() {
  return lenis
}

export function destroyLenis() {
  lenis?.destroy()
  lenis = null
}
```

In `src/main.tsx` or `src/App.tsx` — initialise Lenis once:

```tsx
// src/App.tsx
import { useEffect } from 'react'
import { initLenis, destroyLenis } from '@/lib/lenis'

export default function App() {
  useEffect(() => {
    const lenis = initLenis()

    return () => {
      destroyLenis()
    }
  }, [])

  return (
    // ... your existing router and page components
  )
}
```

**Important — Framer Motion + Lenis compatibility:**

If using Framer Motion's `useScroll`, pass the Lenis scroll element:

```tsx
import { useScroll } from 'framer-motion'
import { getLenis } from '@/lib/lenis'

// Use window scroll (Lenis emits scroll events on window — this works automatically)
const { scrollY } = useScroll()
```

No extra config needed — Lenis fires standard scroll events that Framer Motion picks up.

---

### 1.3 Scroll-to-Top Button

Create `src/components/ui/ScrollToTop.tsx`:

```tsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { getLenis } from '@/lib/lenis'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            width: '44px',
            height: '44px',
            backgroundColor: '#FFD700',
            color: '#0F0F0F',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)'
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
```

Add to `src/App.tsx` or `src/layouts/RootLayout.tsx`:

```tsx
import { ScrollToTop } from '@/components/ui/ScrollToTop'

// Inside return, outside router (renders on all pages):
<ScrollToTop />
```

---

### 1.4 Page Route Transitions

Create `src/components/layout/PageTransition.tsx`:

```tsx
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function PageTransition({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  )
}
```

Wrap each page component with `PageTransition` and use `AnimatePresence` in router:

```tsx
// src/App.tsx
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Services from '@/pages/Services'
import Work from '@/pages/Work'
import Contact from '@/pages/Contact'

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}
```

---

### 1.5 Scroll-to-Top on Route Change

Create `src/components/layout/ScrollReset.tsx`:

```tsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenis } from '@/lib/lenis'

export function ScrollReset() {
  const { pathname } = useLocation()

  useEffect(() => {
    const lenis = getLenis()
    if (lenis) {
      // Instant jump — no animation — on route change
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
```

Add inside `<Router>` in `App.tsx`:

```tsx
<Router>
  <ScrollReset />
  {/* rest of app */}
</Router>
```

---

### 1.6 Navbar Scroll Behaviour

Update the Navbar component to react to scroll position:

```tsx
// src/components/layout/Navbar.tsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 48)

      // Progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (y / docHeight) * 100 : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: scrolled
            ? 'rgba(15, 15, 15, 0.95)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid transparent',
          transition: 'background-color 400ms ease, backdrop-filter 400ms ease, border-color 400ms ease'
        }}
      >
        {/* Existing nav content — logo, links, CTA button */}
      </motion.nav>

      {/* Scroll progress bar — thin yellow line at very top */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          backgroundColor: '#FFD700',
          zIndex: 101,
          width: `${scrollProgress}%`,
          transformOrigin: 'left',
          transition: 'width 100ms linear'
        }}
      />
    </>
  )
}
```

---

### 1.7 Anchor Link Smooth Scroll (Services Tab Bar)

For the sticky services tab bar that jumps to sections:

```tsx
// src/pages/Services.tsx

const sections = [
  { id: 'websites', label: 'Websites & Systems' },
  { id: 'growth', label: 'Growth Marketing' },
  { id: 'social', label: 'Social Media' },
  { id: 'brand', label: 'Brand & Design' },
]

function ServicesTabBar() {
  const [activeTab, setActiveTab] = useState('websites')

  const handleTabClick = (id: string) => {
    setActiveTab(id)

    const lenis = getLenis()
    const el = document.getElementById(id)
    if (!el) return

    if (lenis) {
      lenis.scrollTo(el, {
        offset: -88,      // navbar height (72px) + tab bar height (56px) + 8px gap
        duration: 1.0,
        easing: (t) => 1 - Math.pow(1 - t, 3)
      })
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - 88
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  // Auto-highlight active tab on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offsets = sections.map(s => ({
        id: s.id,
        top: document.getElementById(s.id)?.getBoundingClientRect().top ?? 9999
      }))
      const active = offsets.filter(s => s.top < 160).pop()
      if (active) setActiveTab(active.id)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{
      position: 'sticky',
      top: '72px',
      zIndex: 90,
      backgroundColor: '#1A1A1A',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      gap: '0',
      overflowX: 'auto'
    }}>
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => handleTabClick(section.id)}
          style={{
            padding: '16px 24px',
            background: 'none',
            border: 'none',
            color: activeTab === section.id ? '#FFD700' : '#888888',
            fontFamily: 'DM Sans',
            fontWeight: 500,
            fontSize: '0.9375rem',
            cursor: 'pointer',
            position: 'relative',
            transition: 'color 200ms ease',
            whiteSpace: 'nowrap'
          }}
        >
          {section.label}

          {/* Active indicator line */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              backgroundColor: '#FFD700'
            }}
            initial={false}
            animate={{ scaleX: activeTab === section.id ? 1 : 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        </button>
      ))}
    </div>
  )
}
```

---

## PART 2 — PERFORMANCE OPTIMISATION

---

### 2.1 Vite Config

Replace or update `vite.config.ts` completely:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  build: {
    // Target modern browsers only (UK B2B audience — no IE needed)
    target: 'es2020',

    // Warn if any chunk exceeds 500kb
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        manualChunks: {
          // Split heavy dependencies into separate chunks
          // Browser caches them independently — repeat visits load faster
          'react-core':   ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          'framer':       ['framer-motion'],
          'lenis':        ['@studio-freight/lenis'],
          'icons':        ['lucide-react']
        }
      }
    },

    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,      // Remove all console.log in production
        drop_debugger: true,
        pure_funcs: ['console.info', 'console.debug', 'console.warn']
      }
    }
  },

  // Dev server optimisations
  server: {
    hmr: { overlay: true }
  },

  // Pre-bundle dependencies for faster dev start
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      '@studio-freight/lenis',
      'lucide-react'
    ]
  }
})
```

---

### 2.2 index.html — Head Optimisations

Update `index.html` `<head>` section:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Primary Meta -->
  <title>STHEER | Digital Growth Infrastructure | UK Marketing Agency</title>
  <meta name="description" content="STHEER builds connected digital infrastructure for UK businesses — websites, growth marketing, social media, and brand design that compound your growth." />
  <meta name="theme-color" content="#0F0F0F" />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <!-- Font preconnect — must be BEFORE font stylesheet link -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- Fonts — only weights actually used -->
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&display=swap"
    rel="stylesheet"
  />

  <!-- Open Graph (LinkedIn / social sharing for UK B2B) -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="STHEER | Digital Growth Infrastructure" />
  <meta property="og:description" content="We only grow if you grow. Digital infrastructure for UK businesses that refuse to stay small." />
  <meta property="og:url" content="https://stheer.co.uk" />
  <meta property="og:image" content="https://stheer.co.uk/og-image.jpg" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="STHEER | Digital Growth Infrastructure" />
  <meta name="twitter:description" content="We only grow if you grow." />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

---

### 2.3 Image Optimisation

For all images across the site — apply this pattern:

```tsx
// Above the fold (hero images) — eager load, no lazy
<img
  src="https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=1200&q=80"
  alt="Descriptive text"
  loading="eager"
  decoding="sync"
  fetchpriority="high"
  width={1200}
  height={800}
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>

// Below the fold (all other images) — lazy load
<img
  src="https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=900&q=80"
  alt="Descriptive text"
  loading="lazy"
  decoding="async"
  width={900}
  height={600}
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>
```

**Always set explicit `width` and `height`** — prevents cumulative layout shift (CLS), which tanks Lighthouse scores.

**Unsplash URL parameters to always include:**
```
?auto=format    → serves WebP automatically to supporting browsers
&fit=crop       → crops to exact dimensions
&w=900          → resize to appropriate display width
&q=80           → 80% quality — good balance of size vs sharpness
```

---

### 2.4 Lazy Loading Routes (Code Splitting)

Update `src/App.tsx` to lazy-load page components:

```tsx
import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { Navbar } from '@/components/layout/Navbar'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { ScrollReset } from '@/components/layout/ScrollReset'

// Lazy load all pages — each becomes its own JS chunk
const Home     = lazy(() => import('@/pages/Home'))
const About    = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const Work     = lazy(() => import('@/pages/Work'))
const Contact  = lazy(() => import('@/pages/Contact'))

// Minimal loading fallback — blank dark screen, no spinner (avoids flash)
function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0F0F0F'
    }} />
  )
}

function App() {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <ScrollReset />
      <ScrollToTop />

      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"        element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about"   element={<PageTransition><About /></PageTransition>} />
            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/work"    element={<PageTransition><Work /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  )
}

export default App
```

---

### 2.5 Framer Motion — Reduce Bundle Impact

Only import what is used. Never use wildcard imports:

```tsx
// ✅ Correct — tree-shakeable
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'

// ❌ Wrong — imports entire library
import * as motion from 'framer-motion'
import Framer from 'framer-motion'
```

For scroll-linked values (parallax, progress bar), use `useScroll` + `useTransform`:

```tsx
import { useScroll, useTransform, motion } from 'framer-motion'

function HeroSection() {
  const { scrollY } = useScroll()

  // Hero content fades and rises slightly as user scrolls away
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const y = useTransform(scrollY, [0, 300], [0, -40])

  return (
    <motion.div style={{ opacity, y }}>
      {/* hero content */}
    </motion.div>
  )
}
```

---

### 2.6 Tailwind CSS — Production Purge

Ensure `tailwind.config.js` has correct content paths:

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stheer-yellow': '#FFD700',
        'stheer-gold':   '#FFC200',
        'stheer-black':  '#0F0F0F',
        'stheer-surface': '#1A1A1A',
      },
      fontFamily: {
        'display': ['Montserrat', 'sans-serif'],
        'body':    ['DM Sans', 'sans-serif'],
      }
    }
  },
  plugins: []
}
```

---

### 2.7 Passive Event Listeners

All scroll and resize listeners must use `{ passive: true }`:

```tsx
// ✅ Correct — doesn't block scroll thread
window.addEventListener('scroll', handler, { passive: true })
window.addEventListener('resize', handler, { passive: true })

// ❌ Wrong — blocks main thread, causes jank
window.addEventListener('scroll', handler)
```

Check every `useEffect` that attaches a scroll listener and add `{ passive: true }`.

---

### 2.8 Will-Change Hints

For elements that animate frequently (navbar, scroll-to-top button, hero content), add CSS `will-change` to pre-promote to GPU layer:

```css
/* globals.css */

/* Navbar — transitions on every scroll */
nav[style*="position: fixed"] {
  will-change: background-color, backdrop-filter;
}

/* Scroll progress bar */
.scroll-progress-bar {
  will-change: width;
}

/* Animated cards — only while hovering (avoid memory waste) */
[class*="card"] {
  will-change: auto; /* default — no promotion */
}

[class*="card"]:hover {
  will-change: transform; /* promote only on hover */
}

/* Hero content — scroll-linked opacity/transform */
.hero-content {
  will-change: opacity, transform;
}
```

---

### 2.9 Font Display Strategy

Prevent invisible text flash (FOIT) during font load:

In `globals.css`, add a system font fallback stack:

```css
/* globals.css */
:root {
  --font-display: 'Montserrat', 'Arial Black', 'Helvetica Neue', sans-serif;
  --font-body:    'DM Sans', 'Inter', 'Helvetica Neue', Arial, sans-serif;
}

body {
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
}
```

---

### 2.10 CSS Variables for Transitions

Define all transition values as CSS variables — easier to tweak and stays consistent:

```css
/* globals.css */
:root {
  /* Timing */
  --t-fast:    150ms;
  --t-base:    250ms;
  --t-slow:    400ms;
  --t-slower:  600ms;

  /* Easing */
  --ease-out:      cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-in-out:   cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);  /* subtle spring — use sparingly */

  /* Common transition shorthand */
  --transition-base:  all var(--t-base) var(--ease-out);
  --transition-color: color var(--t-fast) var(--ease-out),
                      background-color var(--t-fast) var(--ease-out),
                      border-color var(--t-fast) var(--ease-out);
}

/* Apply globally */
a, button {
  transition: var(--transition-color);
}
```

---

## PART 3 — FINAL CHECKLIST

**Smooth Scrolling:**
- [ ] `scroll-behavior: smooth` + `scroll-padding-top: 80px` in globals.css
- [ ] `prefers-reduced-motion` media query present
- [ ] Lenis installed and initialised in App.tsx
- [ ] ScrollReset component added — fires on every route change
- [ ] ScrollToTop button appears after 500px scroll, uses Lenis scroll
- [ ] PageTransition wraps all route components
- [ ] AnimatePresence with `mode="wait"` wraps Routes
- [ ] Navbar transitions background on scroll (transparent → dark blur)
- [ ] Yellow scroll progress bar at top of viewport
- [ ] Services tab bar smooth-scrolls to sections with correct offset
- [ ] Active tab auto-highlights based on scroll position

**Performance:**
- [ ] Vite manual chunks configured (react-core, router, framer, lenis, icons)
- [ ] `drop_console: true` in terser config (production builds clean)
- [ ] All page components lazy-loaded with `React.lazy`
- [ ] Above-fold images: `loading="eager"`, `fetchpriority="high"`
- [ ] Below-fold images: `loading="lazy"`, `decoding="async"`
- [ ] All images have explicit `width` and `height` attributes
- [ ] All Unsplash URLs include `?auto=format&fit=crop&w=...&q=80`
- [ ] Font preconnect links present before stylesheet link in index.html
- [ ] Only font weights 700 and 800 (Montserrat) + 400, 500, 600 (DM Sans) loaded
- [ ] Tailwind content paths include all `.tsx` files
- [ ] `will-change: transform` on cards (hover only), navbar, progress bar
- [ ] All scroll listeners use `{ passive: true }`
- [ ] Framer Motion imports are specific — no wildcard
- [ ] `-webkit-font-smoothing: antialiased` on body

---

*STHEER Performance & Smooth Scroll Prompt*
*Apply after Card Animations Prompt*
*© 2026 STHEER | stheer.co.uk*
