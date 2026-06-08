# STHEER — Website Build Prompt
**For: Antigravity AI Website Builder**
**Client:** STHEER | stheer.co.uk | info@stheer.co.uk
**Market:** United Kingdom — Premium B2B Agency

---

## 1. PROJECT OVERVIEW

Build a premium, minimal, UK-market agency website for **STHEER** — a social media and brand marketing agency based in the UK. The site must feel like a top-tier London agency: restrained, typographically confident, dark-first, with yellow as a sharp accent colour. No clutter. No noise. Every word earns its place.

**Tone:** Authoritative. Steady. Intelligent. Never loud.
**Feel:** Like a premium consultancy, not a busy marketing firm.
**UK Design Reference:** Think Pentagram, Koto, or ManvsMachine — bold identity, serious craft, minimal decoration.

---

## 2. TECH STACK

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** lucide-react
- **Fonts:** Google Fonts — Montserrat + DM Sans (see Typography)

---

## 3. BRAND & DESIGN SYSTEM

### 3.1 Colour Palette

```css
/* CSS Variables — apply globally */
--color-black:        #0F0F0F;   /* Page background (dark sections) */
--color-surface:      #1A1A1A;   /* Cards, nav, elevated surfaces */
--color-surface-2:    #242424;   /* Subtle card borders, hover states */
--color-yellow:       #FFD700;   /* Primary accent — CTAs, highlights */
--color-gold:         #FFC200;   /* Secondary accent — hover states */
--color-yellow-soft:  #FFF8DC;   /* Light background tint (light sections) */
--color-white:        #FFFFFF;   /* Body text on dark */
--color-off-white:    #E8E8E8;   /* Secondary text on dark */
--color-muted:        #888888;   /* Captions, metadata, small labels */
--color-charcoal:     #4A4A4A;   /* Text on light backgrounds */
--color-border:       rgba(255,255,255,0.08); /* Subtle dividers */
```

**Theme rule:** Default to dark (black bg, white text, yellow accents). Use white/off-white backgrounds only for specific content sections (e.g. Results, Values) to create visual breathing room. Never use yellow as background colour.

### 3.2 Typography

```
Display / Hero:    Montserrat — ExtraBold 800
Headlines (H2):    Montserrat — Bold 700
Subheadings (H3):  DM Sans — SemiBold 600
Body Copy:         DM Sans — Regular 400
Captions / Tags:   DM Sans — Medium 500, uppercase tracking
Navigation:        DM Sans — Medium 500
CTA Buttons:       Montserrat — Bold 700
```

**Type scale (desktop):**
- Hero headline: `clamp(3rem, 6vw, 6rem)` — large, confident
- H2 section title: `clamp(2rem, 4vw, 3.5rem)`
- H3: `1.5rem`
- Body: `1.0625rem` (17px) — slightly larger than standard for readability
- Caption: `0.8125rem` (13px)
- Line height body: `1.75`
- Letter spacing headlines: `-0.02em` (tight, premium feel)
- Letter spacing caps labels: `0.12em`

**Font Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

### 3.3 Logo Usage

- Use the STHEER wordmark with swan S-mark
- On dark backgrounds: logo in **white** or **yellow #FFD700**
- On light backgrounds: logo in **black #1A1A1A**
- Minimum clear space: equal to the height of the "S" mark on all sides
- Never distort, recolour to gradients, or place on busy backgrounds

### 3.4 Spacing System (8px base)

```
4px   — xs (tight gaps, icon padding)
8px   — sm
16px  — md
24px  — lg
32px  — xl
48px  — 2xl
64px  — 3xl
96px  — 4xl (section padding top/bottom minimum)
128px — 5xl (hero padding)
```

### 3.5 Component Styles

**Primary Button (Yellow CTA):**
```
Background: #FFD700
Text: #0F0F0F (black)
Font: Montserrat Bold 700, uppercase, tracking 0.08em
Padding: 14px 32px
Border-radius: 2px (sharp — not pill, not square)
Hover: background #FFC200, slight upward translateY(-1px)
Transition: 200ms ease
```

**Secondary Button (Ghost/Outline):**
```
Background: transparent
Border: 1px solid rgba(255,255,255,0.3)
Text: #FFFFFF
Font: DM Sans Medium 500
Padding: 13px 30px
Border-radius: 2px
Hover: border-color #FFD700, text #FFD700
Transition: 200ms ease
```

**Cards:**
```
Background: #1A1A1A
Border: 1px solid rgba(255,255,255,0.08)
Border-radius: 4px
Padding: 32px
Hover: border-color rgba(255,215,0,0.3), subtle box-shadow 0 4px 24px rgba(255,215,0,0.08)
Transition: 300ms ease
```

**Section Label (small caps above headlines):**
```
Font: DM Sans Medium 500
Size: 0.8125rem
Colour: #FFD700
Uppercase: true
Letter-spacing: 0.12em
Margin-bottom: 12px
```

---

## 4. GLOBAL LAYOUT & NAVIGATION

### 4.1 Navigation Bar

- **Position:** Fixed top, full width
- **Background:** `rgba(15,15,15,0.92)` with `backdrop-filter: blur(12px)`
- **Height:** 72px desktop, 64px mobile
- **Left:** STHEER logo (white wordmark + swan mark)
- **Centre:** Nav links — Home · Services · Work · About · Contact
- **Right:** CTA button — "Book Strategy Call" (yellow primary button, smaller: padding 10px 20px)
- **Nav link style:** DM Sans Medium, white, hover colour #FFD700, no underline, transition 200ms
- **Border-bottom on scroll:** `1px solid rgba(255,255,255,0.08)` appears after 50px scroll
- **Mobile:** Hamburger menu (lucide `Menu` icon), full-screen overlay menu, links stacked, large Montserrat Bold

### 4.2 Footer

**Background:** `#0A0A0A` (slightly darker than page)
**Border-top:** `1px solid rgba(255,255,255,0.08)`
**Layout:** 4 columns on desktop, stacked on mobile

**Column 1 — Brand:**
- STHEER logo (white)
- Tagline: *"Digital growth infrastructure for businesses that want to scale with clarity and control."*
- Brand promise: *"We only grow if you grow."*
- Status badge: `● Currently Accepting New Clients` (yellow dot, small green-yellow pill)

**Column 2 — Services:**
- Websites & Systems
- Digital Growth
- Social Media Management
- Software & SaaS
- CRM Systems
- AI & Automation
- Design Services
- Standee Design
- Flyer & Vinyl Design

**Column 3 — Company:**
- Our Story
- Portfolio
- Contact

**Column 4 — Contact:**
- info@stheer.co.uk
- Book a Strategy Call (yellow link)

**Footer bottom strip:**
- Left: © 2026 STHEER. All rights reserved.
- Centre: `Stay Steady · Build Systems · Scale with Purpose` (muted, small caps)
- Right: Subtle legal link

---

## 5. ANIMATION SYSTEM

**Philosophy:** Restrained and purposeful. Every animation serves clarity, not decoration. UK premium agency aesthetic — nothing bounces, pulses, or spins.

**Scroll reveals (Framer Motion):**
```
Initial: { opacity: 0, y: 24 }
Animate: { opacity: 1, y: 0 }
Transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
Viewport: { once: true, amount: 0.2 }
```

**Stagger children:**
```
Stagger delay: 0.1s between items
```

**Hero headline:** Word-by-word reveal — each word fades and rises in sequence (stagger 0.08s per word)

**Number counters:** Count up animation when stat section enters viewport (duration 2s, easeOut)

**Page transitions:** Subtle fade (opacity 0→1, 300ms) on route change

**Hover on cards:** `translateY(-4px)` + border colour shift (300ms ease)

**No:** parallax scrolling, spinning elements, heavy particle systems, typewriter effects on body copy

---

## 6. PAGE SPECIFICATIONS

---

### PAGE 1 — HOME (`/`)

---

#### Section 1.1 — Hero

**Background:** Full viewport height. Black (`#0F0F0F`). Subtle noise texture overlay (CSS: `url("data:image/svg+xml,...")` at 3% opacity for depth). Single thin horizontal yellow line (`2px, #FFD700, 40% width`) positioned below the headline as a decorative rule.

**Layout:** Left-aligned text block, centred vertically. Max-width 820px. Large negative space on right (desktop).

**Section label (above headline):**
`DIGITAL GROWTH INFRASTRUCTURE`
Style: Yellow, small caps, DM Sans Medium, letter-spacing 0.12em

**Main Headline:**
```
We Only Grow
If You Grow.
```
Style: Montserrat ExtraBold 800, clamp(3.5rem, 6vw, 6rem), white, line-height 1.1, letter-spacing -0.02em
Animation: Word-by-word reveal, stagger 0.08s

**Sub-headline:**
```
Building digital infrastructure for businesses that refuse to stay small.
```
Style: DM Sans Regular 400, clamp(1.1rem, 2vw, 1.375rem), colour #E8E8E8, line-height 1.6, max-width 560px
Animation: Fade in after headline (delay 0.6s)

**Supporting line:**
```
Most agencies sell you services. We build you systems — connected, compounding,
and designed to run long after the campaign ends.
```
Style: DM Sans Regular 400, 1rem, colour #888888, max-width 520px
Animation: Fade in (delay 0.9s)

**CTA buttons (row, gap 16px):**
1. `Book a Strategy Call` — Primary yellow button
2. `Explore What We Build` — Ghost/outline button

Animation: Fade in (delay 1.1s)

**Scroll indicator:** Small animated chevron-down (lucide) at bottom-centre, subtle pulse opacity animation

---

#### Section 1.2 — Social Proof Strip

**Background:** `#1A1A1A`
**Border-top + bottom:** `1px solid rgba(255,255,255,0.08)`
**Padding:** 48px vertical

**Intro text (centred):**
*"Trusted by founders, operators, and growth teams across e-commerce, SaaS, real estate, hospitality, and professional services."*
Style: DM Sans Regular, 0.9375rem, #888888, centred

**Stats grid — 4 columns (2x2 on mobile):**

| Stat | Label |
|------|-------|
| 3+ | Years Building |
| 18+ | Businesses Scaled |
| 9 | Integrated Services |
| One Consistent Goal | Your Growth |

Each stat:
- Number: Montserrat ExtraBold 800, clamp(2rem, 4vw, 3.5rem), #FFD700
- Label: DM Sans Medium 500, 0.9375rem, #888888, uppercase, tracking 0.08em
- Counter animation on viewport entry

---

#### Section 1.3 — What We Build

**Background:** `#0F0F0F`
**Padding:** 96px vertical

**Section label:** `WHAT WE BUILD`
**Section headline:**
```
Four Systems.
One Infrastructure.
```
Style: Montserrat Bold 700, clamp(2rem, 4vw, 3rem), white

**Service cards — 2x2 grid (desktop), stacked (mobile):**

**Card 1 — Websites & Systems**
- Icon: lucide `Globe` (yellow, 28px)
- Title: Websites & Systems
- Body: Websites, CRM infrastructure, SaaS platforms, automation, and digital systems designed for scale.
- Link: `Explore →` (yellow, hover underline)

**Card 2 — Growth Marketing**
- Icon: lucide `TrendingUp`
- Title: Growth Marketing
- Body: Paid advertising, SEO, analytics, and conversion systems built to generate measurable business growth.

**Card 3 — Social Media & Content**
- Icon: lucide `Layers`
- Title: Social Media & Content
- Body: Strategic content creation and platform management that builds attention, trust, and engagement.

**Card 4 — Brand & Design**
- Icon: lucide `Pen`
- Title: Brand & Design
- Body: Visual identity, print, and marketing design that positions your business professionally online and offline.

Card style: Use component card spec from Section 3.5. Stagger reveal animation.

---

#### Section 1.4 — System Summary

**Background:** `#1A1A1A`
**Padding:** 80px vertical
**Layout:** Two columns — left headline/body, right large decorative text or thin rule

**Headline:**
```
Every system we build is designed to compound your growth over time.
```
Style: Montserrat Bold 700, clamp(1.75rem, 3vw, 2.5rem), white, max-width 560px

**Body:**
STHEER is not a collection of freelancers or a one-trick agency. We are a full-stack digital growth infrastructure provider — meaning we build, connect, and operate every layer of your digital presence so that each part feeds the next. Websites drive traffic. Traffic feeds your CRM. Your CRM triggers automation. Automation fuels retention. Retention compounds revenue.

Style: DM Sans Regular, 1.0625rem, #E8E8E8, line-height 1.8

---

#### Section 1.5 — The Growth System

**Background:** `#0F0F0F`
**Padding:** 96px vertical

**Section label:** `OUR APPROACH`
**Section headline:**
```
A Systematic Approach to
Scaling Your Business
```

**5-step horizontal flow (desktop) / stacked with connecting line (mobile):**

Each step card:
- Step number: Montserrat ExtraBold 800, large (4rem), colour `rgba(255,215,0,0.15)` (ghost yellow — background watermark number)
- Title: DM Sans SemiBold 600, 1.25rem, white
- Body: DM Sans Regular, 0.9375rem, #888888

**Step 1 — Attention**
We engineer visibility. Through strategic content, paid campaigns, and SEO, we place your brand in front of the right people at the right moment.

**Step 2 — Conversion**
We turn interest into action. Optimised landing pages, persuasive messaging, and frictionless funnels convert visitors into qualified leads.

**Step 3 — Automation**
We make your business work while you sleep. Smart workflows, AI-powered chatbots, and CRM sequences keep your pipeline moving without manual effort.

**Step 4 — Retention**
We protect your most valuable asset — your existing customers. Personalised experiences, re-engagement campaigns, and loyalty-driven content keep them coming back.

**Step 5 — Scale**
We multiply what is working. Once a system proves itself, we expand it across channels, markets, and audiences with precision.

**Closing line (centred, below steps):**
*Every system connects. Every connection compounds.*
Style: Montserrat Bold 700, 1.375rem, #FFD700, italic

---

#### Section 1.6 — Results Snapshot

**Background:** `#1A1A1A`
**Padding:** 96px vertical

**Section label:** `REAL RESULTS`
**Section headline:**
```
Real Systems. Real Results.
Real Businesses Transformed.
```

**4 result cards — 2x2 grid:**

**Result 1:**
- Metric: `+340%`
- Label: Revenue Growth
- Category tag: E-Commerce
- Description: Complete digital transformation including website rebuild, paid advertising, and CRM automation.

**Result 2:**
- Metric: `10,000+`
- Label: Platform Users
- Category tag: SaaS Startup
- Description: Custom-built SaaS platform with automated onboarding and retention sequences.

**Result 3:**
- Metric: `+500%`
- Label: Social Engagement
- Category tag: Hospitality
- Description: Full social media management and brand refresh across multiple locations.

**Result 4:**
- Metric: `3x`
- Label: Lead Generation
- Category tag: Real Estate
- Description: Property showcase website integrated with CRM and automated lead nurturing.

Metric style: Montserrat ExtraBold 800, clamp(2.5rem, 5vw, 4rem), #FFD700
Category tag: Small pill — yellow border, yellow text, DM Sans Medium 500, 0.75rem

---

#### Section 1.7 — Closing CTA

**Background:** `#0F0F0F`
**Layout:** Centred, full-width. Thin yellow horizontal rule above and below section.
**Padding:** 96px vertical

**Headline:**
```
Your Competitors Are Not Standing Still.
```
Style: Montserrat ExtraBold 800, clamp(2rem, 4vw, 3.5rem), white, centred, max-width 720px

**Body:**
Every day without a connected digital system is a day your competition gains ground. STHEER builds the infrastructure that closes that gap — and keeps it closed.
Style: DM Sans Regular, 1.0625rem, #888888, centred, max-width 560px

**CTA:** `Book Your Free Strategy Call` — Primary yellow button, large (padding 18px 40px)

---

### PAGE 2 — ABOUT (`/about`)

---

#### Section 2.1 — Page Hero

**Background:** Black, full viewport height
**Section label:** `OUR STORY`
**Headline:**
```
Built From Pressure.
Shaped by Discipline.
Designed for Growth.
```
Style: Montserrat ExtraBold 800, clamp(3rem, 5.5vw, 5.5rem), white, letter-spacing -0.02em
**No sub-headline — let the headline breathe.**

---

#### Section 2.2 — Founder Story

**Background:** `#0F0F0F`
**Layout:** Two columns — left: large section label + quote block; right: body copy paragraphs

**Section label:** `THE STORY BEHIND STHEER`

**Paragraph 1:**
STHEER was not built in a boardroom. It was built in the gap — the space between what businesses are promised by agencies and what they actually receive.

**Paragraph 2:**
Our founder spent years watching capable businesses stall, not because their product was wrong or their market was small, but because their digital infrastructure was fragmented. They had a website that did not convert. Social media that did not connect to sales. Paid ads that burned budget without building systems. CRM tools that nobody used. Each piece existed in isolation, doing its job poorly, disconnected from everything else.

**Paragraph 3:**
STHEER was created to solve that. Not to offer another single service in an already crowded market, but to build the entire infrastructure — connected, intentional, and designed to compound over time.

**Founder quote (pull quote style):**
```
"STHEER is not just about growth.
It is about staying steady long enough
to build something that lasts."
```
Style: Montserrat Bold 700, 1.5rem, white, line-height 1.5. Left border: `4px solid #FFD700`. Padding-left: 24px.

**Paragraph 4:**
The name STHEER means exactly that. Stay steady. Stay the course. Resist the noise of short-term tactics and build something with structural integrity. Growth that lasts does not come from a single campaign or a viral moment. It comes from discipline, systems, and consistency applied over time.

---

#### Section 2.3 — Mission

**Background:** `#1A1A1A`
**Layout:** Centred, max-width 720px
**Padding:** 96px vertical

**Section label:** `WHY WE EXIST`
**Headline:**
```
We exist to close the gap between
ambition and infrastructure.
```
Style: Montserrat Bold 700, clamp(1.75rem, 3vw, 2.5rem), white, centred

**Body:**
Too many businesses with genuine potential are held back by digital systems that do not work together. Our mission is to build the connected infrastructure that gives those businesses the foundation they deserve — and the momentum to grow beyond it.
Style: DM Sans Regular, 1.0625rem, #E8E8E8, centred, line-height 1.8

---

#### Section 2.4 — Values

**Background:** `#0F0F0F`
**Padding:** 96px vertical

**Section label:** `WHAT WE STAND FOR`
**Headline:** `Our Values`

**4 value cards — horizontal list (desktop), stacked (mobile):**

**Value 1 — Systems Over Shortcuts**
We do not believe in quick fixes. We believe in building infrastructure that works independently of trend cycles, algorithm changes, and platform shifts.

**Value 2 — Transparency Without Jargon**
We communicate clearly, report honestly, and never hide behind vanity metrics. You will always know what we are doing, why we are doing it, and what it is producing.

**Value 3 — Growth With Integrity**
We only take on clients we genuinely believe we can help. If your business is not the right fit, we will tell you — and point you in the right direction.

**Value 4 — Connected Thinking**
We see your business as a whole system, not a collection of isolated channels. Every decision we make considers how it connects to everything else.

Card style: Use standard card spec. Icon: lucide icons (Shield, Eye, Heart, Link2). Yellow icon, 24px.

---

#### Section 2.5 — Team

**Background:** `#1A1A1A`
**Padding:** 96px vertical

**Section label:** `THE TEAM`
**Section headline:**
```
The People Who Build
Your Infrastructure
```

**Section body:**
STHEER is a focused team of strategists, designers, developers, and growth specialists who work as one integrated unit. We do not outsource your growth to junior staff or rotating contractors. The people who scope your project are the people who deliver it.

**Team grid:** 3–4 columns. Each card: placeholder grey square (aspect-ratio 1:1, border-radius 4px, bg `#242424`), name (Montserrat Bold), role (DM Sans Medium, #FFD700 colour). *Note: Real team photos and details to be added later.*

**CTA (below team grid):**
`Meet the Team — Book a Call` → Primary yellow button

---

### PAGE 3 — SERVICES (`/services`)

---

#### Section 3.1 — Page Hero

**Background:** Black, half-viewport height (not full)
**Section label:** `WHAT WE DO`
**Headline:**
```
Digital Infrastructure for Scale
```
**Sub-headline:**
Nine integrated services. One connected system. Built to compound your growth.

**Intro body:**
Most businesses do not have a marketing problem. They have an infrastructure problem. Isolated tools, disconnected teams, and campaigns that do not speak to each other create noise without momentum. STHEER builds the infrastructure that makes every part of your digital presence work together — so your investment compounds rather than evaporates.

---

#### Section 3.2 — Services Navigation

**Sticky horizontal tab bar** (scrolls with page, sticks below nav):
- Background: `#1A1A1A`
- Border-bottom: `1px solid rgba(255,255,255,0.08)`
- Tabs: Websites & Systems · Growth Marketing · Social Media · Brand & Design
- Active tab: yellow underline indicator (2px), yellow text
- Clicking tab smooth-scrolls to that service section

---

#### Section 3.3 — Service 1: Websites & Systems

**Background alternates:** `#0F0F0F`
**Padding:** 96px vertical

**Section label:** `SERVICE 01`
**Headline:**
```
Your Website Is Not a Brochure.
It Is Infrastructure.
```
**Sub-headline:** High-converting websites and digital systems built to drive measurable business outcomes.

**Body:**
[See content from DOCX — Body Paragraph 1 and 2]

**Deliverables list (5 items):**
- High-converting landing pages and campaign microsites
- Full business websites and e-commerce platforms
- Custom web applications and client portals
- Internal dashboards and business intelligence tools
- Website audits and performance optimisation

List style: Each item prefixed with thin yellow `—` rule. DM Sans Regular. No bullet points.

**Sub-services (expandable accordion below — covers the 5 extra services not given full pages):**
Include under "Also within this pillar": Software & SaaS Development, CRM Systems, AI & Automation — each with a 2-line description and "Learn more" link.

**CTA:** `Build Your Digital Foundation — Book a Strategy Call`

---

#### Section 3.4 — Service 2: Growth Marketing

**Background:** `#1A1A1A`
**Padding:** 96px vertical

**Section label:** `SERVICE 02`
**Headline:**
```
Traffic Without Strategy
Is Just Noise.
```
**Sub-headline:** Strategic paid campaigns, organic search infrastructure, and analytics that turn data into decisions.

**Body:** [See DOCX — Body Paragraphs 1 and 2]

**Deliverables:**
- Meta (Facebook & Instagram) and Google paid advertising
- Conversion-focused ad creative and copywriting
- Technical and on-page SEO
- Content strategy and SEO copywriting
- Analytics setup, dashboards, and monthly reporting
- A/B testing and continuous optimisation

**CTA:** `Stop Burning Budget — Start Building a Growth System`

---

#### Section 3.5 — Service 3: Social Media & Content

**Background:** `#0F0F0F`
**Padding:** 96px vertical

**Section label:** `SERVICE 03`
**Headline:**
```
A Following Without Purpose
Is Just Noise.
```
**Sub-headline:** Content that builds trust, drives engagement, and turns your audience into an asset.

**Body:** [See DOCX — Body Paragraphs 1 and 2]

**Deliverables:**
- Monthly content strategy and calendar planning
- Original content creation — photography direction, graphic design, copy
- Platform management across Instagram, LinkedIn, Facebook, TikTok
- Community engagement and response management
- Monthly analytics reporting and strategy review

**CTA:** `Let Your Social Presence Work as Hard as You Do`

---

#### Section 3.6 — Service 4: Brand & Design

**Background:** `#1A1A1A`
**Padding:** 96px vertical

**Section label:** `SERVICE 04`
**Headline:**
```
Identity Is Not a Logo.
It Is Everything Your Customer
Sees Before You Speak.
```
**Sub-headline:** Visual identity and marketing design that commands attention, builds trust, and drives action.

**Body:** [See DOCX — Body Paragraphs 1 and 2]

**Deliverables:**
- Brand identity — logo, colour palette, typography, brand guidelines
- Marketing collateral — brochures, presentations, pitch decks
- Digital ad creatives — social media, display, video thumbnails
- Email marketing templates
- Brand refresh and visual identity audits
- Standee, flyer, and vinyl design (print production)

**CTA:** `Design a Brand That Commands Attention`

---

#### Section 3.7 — Services Closing CTA

Same structure as Home Page closing CTA (Section 1.7). Reuse component.

---

### PAGE 4 — WORK / PORTFOLIO (`/work`)

---

#### Section 4.1 — Page Hero

**Background:** Black, half-viewport height
**Section label:** `OUR WORK`
**Headline:** `Our Work Speaks`
**Sub-headline:** Across nine disciplines and dozens of industries, one standard applies to every project: it has to work.

**Intro:**
The work below represents a selection from our portfolio across websites, software, social media, design, and automation. Every project here began with a business problem and ended with a measurable outcome.

---

#### Section 4.2 — Filter Tabs

Horizontal pill-style filter buttons:
- All · Websites & Systems · Digital Growth · Social Media · Software & SaaS · CRM & Automation · Design · Print & Physical
- Active: yellow background, black text
- Inactive: transparent, white text, yellow border on hover
- Filter behaviour: show/hide cards by category

---

#### Section 4.3 — Portfolio Grid

**Layout:** 3-column masonry or uniform grid (desktop), 1-column (mobile)
**Card structure:**
- Placeholder image area: aspect-ratio 16:9, bg `#242424`, border-radius 4px
- Category tag (yellow pill, small)
- Project title: DM Sans SemiBold 600, white
- One-line outcome: DM Sans Regular, #888888
- `View Project →` link (yellow, hover underline)
- Hover on card: image area scales 1.02, border colour shifts to yellow

*Note: Placeholder cards — real project content to be added later.*

---

#### Section 4.4 — Portfolio CTA

Centred, below grid.
*"Want to see work specific to your industry? Book a call and we will share relevant case studies directly."*
CTA: `Book a Call`

---

### PAGE 5 — CONTACT (`/contact`)

---

#### Section 5.1 — Page Hero

**Background:** Black, half-viewport height
**Section label:** `GET IN TOUCH`
**Headline:**
```
Start Building Your
Growth System
```
**Sub-headline:** Every STHEER engagement begins with a strategy call. Not a sales pitch. A genuine conversation about your business, where it is now, and what infrastructure it needs to get where you want it to go.

---

#### Section 5.2 — Contact Layout

**Two-column layout (desktop):**

**Left column — Enquiry Form:**
**Headline:** Send Us a Message

Form fields (DM Sans labels, 0.875rem, #888888; inputs: bg #1A1A1A, border `1px solid rgba(255,255,255,0.12)`, focus border #FFD700, border-radius 2px, padding 14px 16px, text white):

- Full Name (text input)
- Email Address (email input)
- Company / Business Name (text input)
- What do you need? (select dropdown: Website, Growth Marketing, Social Media, Brand & Design, CRM/Automation, Software/SaaS, Other)
- Tell us about your project (textarea, min-height 140px)

Submit button: `Send Message` — full-width primary yellow button

Success state: Replace form with message — *"Thank you. We have received your message and will respond within one business day."* (centred, Montserrat Bold, white)

**Right column — Direct Info:**

**Prefer to Talk First? block:**
Headline: Prefer to Talk First?
Body: Book a 30-minute strategy call directly in our calendar. No hard sell. No obligation. Just a focused conversation about what your business needs.
CTA: `Schedule a Call` (ghost button)

**Divider line**

**Contact details:**
- Email: info@stheer.co.uk (linked, yellow hover)
- Response time: We typically respond within one business day.
- Hours: Monday to Friday. For urgent enquiries, email is always the fastest route.

---

## 7. RESPONSIVE BREAKPOINTS

```
Mobile:  < 640px   — single column, stacked layouts
Tablet:  640–1024px — 2-column grids
Desktop: > 1024px  — full multi-column layouts
Wide:    > 1280px  — max-content-width 1200px, centred
```

**Mobile-specific rules:**
- Hero headline size: clamp(2.25rem, 8vw, 3.5rem)
- Nav collapses to hamburger at < 768px
- Stats: 2x2 grid
- Service cards: full width stacked
- Footer: single column stacked

---

## 8. ADDITIONAL TECHNICAL NOTES

### Performance
- All images: WebP format, lazy-loaded
- Fonts: `display=swap` on Google Fonts import
- Framer Motion: import only used components
- No heavy particle systems or canvas animations

### Accessibility
- All interactive elements: visible focus ring (`outline: 2px solid #FFD700; outline-offset: 3px`)
- Colour contrast: white on `#1A1A1A` = 13.5:1 ✓, black on `#FFD700` = 8.3:1 ✓
- All images: descriptive alt text
- Form inputs: proper `<label>` associations

### SEO Meta (per page)
- Home: `STHEER | Digital Growth Infrastructure | UK Marketing Agency`
- About: `About STHEER | Built for Businesses That Refuse to Stay Small`
- Services: `Services | Websites, Growth Marketing, Social Media & Brand Design`
- Work: `Our Work | STHEER Portfolio`
- Contact: `Contact STHEER | Book a Strategy Call`

### File & Folder Structure
```
src/
├── components/
│   ├── layout/       (Navbar, Footer)
│   ├── ui/           (Button, Card, SectionLabel, Tag)
│   └── sections/     (Hero, Stats, ServiceCard, ResultCard, etc.)
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Work.tsx
│   └── Contact.tsx
├── styles/
│   └── globals.css   (CSS variables, base styles)
└── assets/
    └── logo/         (STHEER logo files)
```

---

## 9. CONTENT PLACEHOLDERS

The following require real assets from the client before going live:

- [ ] Team photos (About page — Section 2.5)
- [ ] Portfolio project images and descriptions (Work page — Section 4.3)
- [ ] Calendly or booking link for "Book Strategy Call" / "Schedule a Call" CTAs
- [ ] Any client logos for social proof strip (optional — not in brief)
- [ ] STHEER logo files in SVG format for web use

---

*End of STHEER Website Build Prompt — v1.0*
*Prepared for Antigravity AI Website Builder*
*© 2026 STHEER | info@stheer.co.uk | stheer.co.uk*
