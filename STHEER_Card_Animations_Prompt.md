# STHEER — Card Animations & Transitions Prompt
**For: Antigravity AI Website Builder**
**Scope: All card components across every page**

---

## OVERVIEW

Add premium card animations and transitions throughout the STHEER website. Every card type gets three layers of animation:
1. **Entrance** — how the card appears when scrolled into view
2. **Hover** — what happens when the user mouses over it
3. **Internal** — icon, text, and border micro-movements inside the card

Rule: All animations must feel deliberate and calm. No bounce, no spring physics, no dramatic movements.

---

## DEPENDENCY

```bash
npm install framer-motion
```

---

## CARD TYPES ON THE SITE

| Card Type | Page | Grid |
|-----------|------|------|
| Service Cards | Home, Services | 2×2 |
| Result / Stats Cards | Home | 2×2 |
| Value Cards | About | 4 horizontal |
| Team Cards | About | 3–4 columns |
| Portfolio Cards | Work | 3 columns |
| Growth Step Cards | Home | 5 horizontal |
| Deliverable List Items | Services | vertical list |

---

## PART 1 — SHARED CARD ANIMATION VARIANTS

Create or update `src/lib/animations.ts` — add these card-specific variants:

```typescript
// src/lib/animations.ts — card animation additions

// Card entrance — primary variant used on all cards
export const cardEntrance = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.97
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

// Card entrance — horizontal (for value cards / step cards in a row)
export const cardEntranceLeft = {
  hidden: { opacity: 0, x: -24, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }
  }
}

// Card entrance — for portfolio cards (scale only, no Y shift)
export const cardEntranceScale = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
}

// Stagger wrappers
export const cardGrid = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
}

export const cardGridFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.0
    }
  }
}

export const cardRow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

// Viewport config
export const viewport = { once: true, amount: 0.15 }
```

---

## PART 2 — SERVICE CARDS (Home & Services page)

### Entrance
```tsx
import { motion } from 'framer-motion'
import { cardGrid, cardEntrance, viewport } from '@/lib/animations'

<motion.div
  className="grid grid-cols-2 gap-6"  // keep existing grid classes
  variants={cardGrid}
  initial="hidden"
  whileInView="visible"
  viewport={viewport}
>
  {services.map((service, i) => (
    <ServiceCard key={i} service={service} />
  ))}
</motion.div>
```

### ServiceCard component — full animation spec
```tsx
function ServiceCard({ service }) {
  return (
    <motion.div
      variants={cardEntrance}

      // Hover state
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: 'easeOut' }
      }}

      // Base card styles (keep your existing Tailwind classes, add these)
      style={{ cursor: 'default' }}
    >
      {/* Yellow top border line — animate width on hover */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-yellow-400"
        initial={{ width: '0%' }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        // Note: parent card needs position: relative, overflow: hidden
      />

      {/* Icon — animate on card hover */}
      <motion.div
        className="icon-wrapper"
        whileHover={{ rotate: 6, scale: 1.1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {service.icon}  {/* existing lucide icon */}
      </motion.div>

      {/* Title — no animation, stays static */}
      <h3>{service.title}</h3>

      {/* Body — no animation */}
      <p>{service.body}</p>

      {/* Arrow link — slides right on hover */}
      <motion.span
        className="explore-link"
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        Explore →
      </motion.span>

    </motion.div>
  )
}
```

### CSS additions for service cards
```css
/* Add to existing card class */
.service-card {
  position: relative;
  overflow: hidden;
  transition: border-color 300ms ease, box-shadow 300ms ease;
}

.service-card:hover {
  border-color: rgba(255, 215, 0, 0.35);
  box-shadow: 0 8px 32px rgba(255, 215, 0, 0.07);
}
```

---

## PART 3 — RESULT / STATS CARDS (Home page)

### Entrance
```tsx
<motion.div
  className="grid grid-cols-2 gap-6"
  variants={cardGrid}
  initial="hidden"
  whileInView="visible"
  viewport={viewport}
>
  {results.map((result, i) => (
    <ResultCard key={i} result={result} />
  ))}
</motion.div>
```

### ResultCard component
```tsx
function ResultCard({ result }) {
  return (
    <motion.div
      variants={cardEntrance}

      whileHover={{
        y: -5,
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
    >
      {/* Image strip at top — zoom on hover */}
      <div style={{ overflow: 'hidden', borderRadius: '4px 4px 0 0' }}>
        <motion.img
          src={result.image}
          alt={result.alt}
          loading="lazy"
          style={{ width: '100%', aspectRatio: '16/7', objectFit: 'cover' }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Category tag — no animation */}
      <span className="category-tag">{result.category}</span>

      {/* Metric — animate colour on card hover using CSS */}
      <p className="metric">{result.metric}</p>

      {/* Label + description */}
      <h3>{result.label}</h3>
      <p>{result.description}</p>

    </motion.div>
  )
}
```

### CSS for result cards
```css
.result-card {
  position: relative;
  overflow: hidden;
  transition: border-color 300ms ease, box-shadow 300ms ease;
}

.result-card:hover {
  border-color: rgba(255, 215, 0, 0.3);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}

.result-card:hover .metric {
  color: #FFD700;
  transition: color 300ms ease;
}
```

---

## PART 4 — VALUE CARDS (About page)

Values are in a horizontal row — use horizontal stagger with `cardRow`.

### Entrance
```tsx
<motion.div
  className="grid grid-cols-4 gap-6"
  variants={cardRow}
  initial="hidden"
  whileInView="visible"
  viewport={viewport}
>
  {values.map((value, i) => (
    <ValueCard key={i} value={value} />
  ))}
</motion.div>
```

### ValueCard component
```tsx
function ValueCard({ value }) {
  return (
    <motion.div
      variants={cardEntranceLeft}

      whileHover={{
        y: -4,
        transition: { duration: 0.22, ease: 'easeOut' }
      }}
    >
      {/* Icon container — subtle background fills on hover */}
      <motion.div
        className="icon-container"
        whileHover={{
          backgroundColor: 'rgba(255, 215, 0, 0.12)',
          transition: { duration: 0.25 }
        }}
        style={{
          padding: '12px',
          borderRadius: '4px',
          backgroundColor: 'rgba(255, 215, 0, 0.06)',
          display: 'inline-flex',
          marginBottom: '16px'
        }}
      >
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {value.icon}
        </motion.div>
      </motion.div>

      <h3>{value.title}</h3>
      <p>{value.body}</p>

    </motion.div>
  )
}
```

### CSS for value cards
```css
.value-card {
  transition: border-color 300ms ease;
  border-bottom: 2px solid transparent;
}

.value-card:hover {
  border-bottom-color: #FFD700;
}
```

---

## PART 5 — TEAM CARDS (About page)

### Entrance
```tsx
<motion.div
  className="grid grid-cols-3 gap-8"
  variants={cardGrid}
  initial="hidden"
  whileInView="visible"
  viewport={viewport}
>
  {team.map((member, i) => (
    <TeamCard key={i} member={member} />
  ))}
</motion.div>
```

### TeamCard component
```tsx
function TeamCard({ member }) {
  return (
    <motion.div
      variants={cardEntrance}

      whileHover={{
        y: -5,
        transition: { duration: 0.22, ease: 'easeOut' }
      }}
    >
      {/* Photo — grayscale by default, colour on hover, slight zoom */}
      <div style={{ overflow: 'hidden', borderRadius: '4px' }}>
        <motion.img
          src={member.photo}
          alt={member.alt}
          loading="lazy"
          style={{
            width: '100%',
            aspectRatio: '1/1',
            objectFit: 'cover',
            filter: 'grayscale(100%)',
            transition: 'filter 400ms ease'
          }}
          whileHover={{
            scale: 1.04,
            filter: 'grayscale(0%)'
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Name */}
      <h3 style={{ marginTop: '16px' }}>{member.name}</h3>

      {/* Role — yellow, animate opacity on hover */}
      <motion.p
        style={{ color: '#FFD700', fontSize: '0.875rem' }}
        initial={{ opacity: 0.7 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {member.role}
      </motion.p>

    </motion.div>
  )
}
```

---

## PART 6 — PORTFOLIO CARDS (Work page)

### Entrance + Filter Transition
```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { cardEntranceScale, cardGrid, viewport } from '@/lib/animations'

// AnimatePresence handles filter switching
<AnimatePresence mode="wait">
  <motion.div
    key={activeFilter}  // changes when filter tab changes
    className="grid grid-cols-3 gap-6"
    variants={cardGrid}
    initial="hidden"
    animate="visible"
    exit={{ opacity: 0, transition: { duration: 0.15 } }}
    viewport={viewport}
  >
    {filteredProjects.map((project, i) => (
      <PortfolioCard key={project.id} project={project} />
    ))}
  </motion.div>
</AnimatePresence>
```

### PortfolioCard component
```tsx
function PortfolioCard({ project }) {
  return (
    <motion.div
      variants={cardEntranceScale}

      whileHover={{
        y: -6,
        transition: { duration: 0.22, ease: 'easeOut' }
      }}
    >
      {/* Image — zoom on hover */}
      <div style={{ overflow: 'hidden', borderRadius: '4px', aspectRatio: '16/9' }}>
        <motion.img
          src={project.image}
          alt={project.alt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        {/* Overlay appears on hover — CSS only */}
        <div className="card-overlay">
          <span>View Project →</span>
        </div>
      </div>

      {/* Category tag */}
      <span className="category-tag">{project.category}</span>

      {/* Title */}
      <h3>{project.title}</h3>

      {/* Outcome */}
      <p className="outcome">{project.outcome}</p>

      {/* Link — arrow slides right */}
      <motion.a
        href={project.link}
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
        transition={{ duration: 0.18 }}
        style={{ color: '#FFD700', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
      >
        View Project →
      </motion.a>

    </motion.div>
  )
}
```

### CSS for portfolio cards
```css
.portfolio-card {
  position: relative;
  transition: border-color 300ms ease, box-shadow 300ms ease;
}

.portfolio-card:hover {
  border-color: rgba(255, 215, 0, 0.3);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
}

/* Image overlay */
.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 15, 15, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 300ms ease;
  color: #FFD700;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 0.9375rem;
  letter-spacing: 0.04em;
}

.portfolio-card:hover .card-overlay {
  opacity: 1;
}
```

---

## PART 7 — GROWTH STEP CARDS (Home page)

Five step cards in a horizontal row. Large ghost step number behind each.

### Entrance
```tsx
<motion.div
  className="grid grid-cols-5 gap-4"
  variants={cardRow}
  initial="hidden"
  whileInView="visible"
  viewport={viewport}
>
  {steps.map((step, i) => (
    <StepCard key={i} step={step} index={i} />
  ))}
</motion.div>
```

### StepCard component
```tsx
function StepCard({ step, index }) {
  return (
    <motion.div
      variants={cardEntrance}
      style={{ position: 'relative', overflow: 'hidden' }}

      whileHover={{
        y: -4,
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
    >
      {/* Ghost step number — moves up slightly on hover */}
      <motion.span
        style={{
          position: 'absolute',
          top: '-12px',
          right: '-8px',
          fontSize: '5rem',
          fontFamily: 'Montserrat',
          fontWeight: 800,
          color: 'rgba(255, 215, 0, 0.08)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none'
        }}
        whileHover={{ y: -6, color: 'rgba(255, 215, 0, 0.14)' }}
        transition={{ duration: 0.3 }}
      >
        0{index + 1}
      </motion.span>

      {/* Step content */}
      <h3>{step.title}</h3>
      <p>{step.body}</p>

    </motion.div>
  )
}
```

### CSS for step cards
```css
.step-card {
  transition: border-color 300ms ease;
  border-top: 2px solid rgba(255, 255, 255, 0.08);
}

.step-card:hover {
  border-top-color: #FFD700;
}
```

---

## PART 8 — DELIVERABLE LIST ITEMS (Services page)

The list of bullet points / deliverables under each service section.

```tsx
<motion.ul
  variants={cardGrid}
  initial="hidden"
  whileInView="visible"
  viewport={viewport}
  style={{ listStyle: 'none', padding: 0 }}
>
  {deliverables.map((item, i) => (
    <motion.li
      key={i}
      variants={cardEntrance}

      whileHover={{ x: 6 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}

      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        cursor: 'default',
        transition: 'color 200ms ease'
      }}
    >
      {/* Yellow dash prefix */}
      <motion.span
        style={{ color: '#FFD700', fontSize: '1.25rem', lineHeight: 1 }}
        whileHover={{ scaleX: 1.5 }}
        transition={{ duration: 0.15 }}
      >
        —
      </motion.span>

      {item}

    </motion.li>
  ))}
</motion.ul>
```

---

## PART 9 — STAT CARDS (Social Proof Strip)

```tsx
<motion.div
  className="grid grid-cols-4 gap-8"
  variants={cardRow}
  initial="hidden"
  whileInView="visible"
  viewport={viewport}
>
  {stats.map((stat, i) => (
    <motion.div
      key={i}
      variants={cardEntrance}

      whileHover={{
        y: -3,
        transition: { duration: 0.18 }
      }}

      style={{ textAlign: 'center' }}
    >
      {/* Number — use AnimatedCounter from v2 prompt */}
      <motion.div
        style={{ color: '#FFD700' }}
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.2 }}
      >
        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
      </motion.div>

      <p style={{ color: '#888' }}>{stat.label}</p>

    </motion.div>
  ))}
</motion.div>
```

---

## PART 10 — GLOBAL CARD CSS TRANSITIONS

Add these to `src/styles/globals.css`. These handle the CSS-only transitions that complement Framer Motion:

```css
/* ─── Global Card Base ─── */
[class*="card"],
[class*="-card"] {
  transition:
    border-color 300ms ease,
    box-shadow 300ms ease,
    transform 250ms ease;
}

/* ─── Yellow border glow on all card hovers ─── */
[class*="card"]:hover {
  border-color: rgba(255, 215, 0, 0.28);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 215, 0, 0.06);
}

/* ─── Category / tag pills ─── */
.category-tag {
  display: inline-block;
  padding: 3px 10px;
  border: 1px solid rgba(255, 215, 0, 0.4);
  border-radius: 2px;
  color: #FFD700;
  font-size: 0.75rem;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: background-color 200ms ease;
}

.category-tag:hover {
  background-color: rgba(255, 215, 0, 0.08);
}

/* ─── Explore / view links ─── */
.card-link {
  color: #FFD700;
  font-size: 0.9375rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: gap 200ms ease, opacity 200ms ease;
}

.card-link:hover {
  gap: 10px;
  opacity: 0.85;
}

/* ─── Grayscale image treatment (Team cards) ─── */
.team-img {
  filter: grayscale(100%);
  transition: filter 400ms ease, transform 400ms ease;
}

.team-card:hover .team-img {
  filter: grayscale(0%);
  transform: scale(1.04);
}

/* ─── Portfolio overlay ─── */
.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 15, 15, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 300ms ease;
  color: #FFD700;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.portfolio-card:hover .card-overlay {
  opacity: 1;
}
```

---

## SUMMARY — What Changes Per Page

| Page | Cards Animated | Variants Used |
|------|---------------|---------------|
| Home → Stats | Stat grid | `cardRow` + `cardEntrance` |
| Home → Services | Service card grid | `cardGrid` + `cardEntrance` |
| Home → Results | Result card grid | `cardGrid` + `cardEntrance` |
| Home → Steps | Step card row | `cardRow` + `cardEntrance` |
| About → Values | Value card row | `cardRow` + `cardEntranceLeft` |
| About → Team | Team card grid | `cardGrid` + `cardEntrance` |
| Services → Deliverables | List items | `cardGrid` + `cardEntrance` |
| Work → Portfolio | Portfolio card grid | `cardGrid` + `cardEntranceScale` + `AnimatePresence` |

---

*STHEER Card Animations & Transitions Prompt*
*Upload to Antigravity after v2 Optimisation Prompt is applied*
*© 2026 STHEER | stheer.co.uk*
