---
name: anti-slop-web-design
description: >
  Master framework for building elite, bespoke, editorial web applications with AI.
  Eliminates all AI slop patterns (purple gradients, card overload, Inter defaults,
  glow blobs, SaaS tab dashboards) and enforces premium editorial aesthetics through
  the ANF, PAGES, and Cloner frameworks. Synthesised from 16 masterclass transcripts
  and verified by building the Anti-Slop Studio application.
---

# Anti-Slop Web Design Skill

Use this skill whenever **building, auditing, or refactoring** any web application, landing
page, or UI component. It enforces world-class visual aesthetics, editorial design systems,
bespoke typography, and intentional interactive details.

> "AI has no taste. Most people can't articulate theirs. If you don't know what right looks
> like, how is Claude Code supposed to figure it out?"
> — The 7 Levels Transcript

---

## STEP 0 — Read This Before Writing Any Code

Before generating a single line of UI code, ask yourself:

1. Do I have a **visual reference** (Awwwards, Dribbble, Godly, CodePen)?
2. Do I have an **art bible** (`design.md`) with explicit palette, type stack, and spacing rules?
3. Am I starting from **human-designed components** or prompting from blank?

If the answer to any of these is **no**, stop and fix it first. Prompting from blank is
the primary cause of AI slop.

---

## PART 1 — The AI Slop Blacklist

Never generate UI containing the following. These are the statistical defaults LLMs
regress to when given no visual context:

### Forbidden Patterns

| Pattern | Why It's Slop | What to Use Instead |
|---|---|---|
| `from-purple-600 to-indigo-600` | Tailwind's most common gradient, statistically predicted | Warm amber `#c8965a`, cool cyan, or brand-specific HSL |
| `bg-slate-950 text-slate-100` | The default Tailwind dark mode combo | Warm graphite `#0a0906` with cream `#f0ebe4` |
| `font-sans` / Inter everywhere | Inter is the statistical default sans-serif | Playfair Display + DM Sans, or Space Grotesk + IBM Plex |
| `rounded-xl border shadow-sm` card grid | Card overload — every element boxed | Left-border insets, typography scale, negative space |
| `blur-3xl rounded-full opacity-30` blobs | Random glow circles with no structural purpose | Architectural hairline grids, CSS noise textures |
| Tab-based SaaS dashboard layout | The #1 tell of an AI-generated interface | Single-page editorial scroll with section-based nav |
| 5+ CTAs in a hero section | Action clutter — users freeze | Max 2 primary CTAs. All others hidden or deprioritised |
| "Get Started" / "Learn More" CTAs | Generic copy no one reads | Specific CTAs: "Run Your First Audit", "Unlock the Playbook" |
| `animate-bounce` on UI elements | Looks like a stock template | `cubic-bezier(0.16, 1, 0.3, 1)` ease-out expo fades |
| Redundant subheadings ("Manage your X") | Explains the obvious | Let layout and hierarchy communicate; cut the subheading |
| `border-radius: 8–12px` on all buttons | The SaaS default | Clip-path polygon cuts, 0px radius, or bracket `[ ]` style |

---

## PART 2 — The 7 Levels of AI Web Design

Work at the highest level your project requirements allow. Never ship Level 1–2 output.

| Level | Name | What It Means |
|---|---|---|
| 1 | Raw Prompt | "Build me a landing page." Outputs: purple gradient, Inter, 3-col card grid. Never ship. |
| 2 | Design Token Injection | Explicit CSS variables, type scale, spacing system fed into context. Minimum acceptable. |
| 3 | Visual Art Director | Reference boards (Godly, Awwwards, Pinterest), `design.md` extracted and enforced. |
| 4 | Code Teardown & Cloner | HTML/CSS extracted from premium sites; scroll mechanics and layout architecture cloned and adapted. |
| 5 | Art Plate + Sniped Components | Bespoke hero image (Midjourney/Whisk) + human-designed components from 21st.dev / Magic UI. |
| 6 | Canvas Tinkering | Final 1% refinement in Stitch, Pencil.dev, or Figma — things you cannot express in text. |
| 7 | Architect | Custom WebGL, Spline 3D, GLSL shaders, scroll-linked JPEG/WebP frame sequences. |

**Target Level 4–5 for production work. Level 6–7 for high-stakes brand launches.**

---

## PART 3 — Core Build Frameworks

### 3.1 — ANF Framework (Assemble · Normalise · Fill)

The default workflow for building new pages. Do not skip phases.

**Phase 1: ASSEMBLE**
- Collect 4–6 components from human-designed sources: 21st.dev, Magic UI, CodePen
- Save each as numbered files: `1.txt`, `2.txt`, `3.txt`
- Prompt: *"Assemble these components from the /components folder in this order: 1.txt, 2.txt, 3.txt into a single coherent page."*

**Phase 2: NORMALISE**
- Feed your `design.md` art bible
- Prompt: *"Normalise the entire page so all sections share the same: (1) font family and scale, (2) spacing using multiples of 8px, (3) color palette from design.md, (4) border radius system. Eliminate all clashing styles."*

**Phase 3: FILL**
- Research competitors with Firecrawl MCP
- Prompt: *"Research [niche]. Analyse top 5 competitors. Rewrite all copy using the 'sell the dream, not the feature' principle. Replace all placeholder text. CTAs should be specific, not generic."*

---

### 3.2 — PAGES Framework (For Conversion)

Use when the goal is a high-converting landing page.

| Phase | Focus | Key Tool |
|---|---|---|
| **Purpose** | Define the single destination. Competitor teardown. | Firecrawl MCP, cool.co palettes |
| **Anchor** | Scroll-stopping hero (3D, scroll-linked video, cinematic image) | Google Whisk + Flow, Kling, Midjourney |
| **Guide** | Single narrative thread. One CTA per section. Sell the outcome. | Swipe file, competitor copy analysis |
| **Elevate** | UI sniping — replace generic components with micro-interactions | Magic UI, 21st.dev, scroll progress bars |
| **Ship** | GitHub + Vercel. Mobile-first test at 375px. | Vercel, custom domain |

---

### 3.3 — The Cloner Framework

Use when you find a world-class site and want to learn from its construction.

1. **Deconstruct** — Press `Ctrl+U` on the target site. Use a site teardown to extract linked CSS/JS.
2. **Learn** — Ask: *"Explain how their scroll animation works technically. What CSS properties create that background effect?"*
3. **Adapt** — *"Using the mechanics from [site], rebuild our brand's page with our colors from design.md, our art plate as hero, and our copy."*

> You are not plagiarising. You are learning from the recipe, then cooking your own dish.

---

## PART 4 — Editorial Design System (The Art Bible)

Generate a `design.md` for **every project**. Feed it into every subsequent AI session.
Without it, AI will revert to defaults within 2–3 prompts.

### Palette Architecture

```css
/* DO: Warm editorial graphite */
--ink-900: #0a0906;   /* Page base — warm, not cold */
--ink-800: #121110;   /* Surface panels */
--ink-500: #6b6560;   /* Muted text */
--ink-300: #c4bdb5;   /* Secondary text */
--ink-100: #f0ebe4;   /* Primary text — cream not stark white */
--brand:   #c8965a;   /* Amber accent — editorial, authoritative */
--hair:    rgba(255,255,255,0.07);  /* Hairline borders, used sparingly */

/* DON'T: Tailwind defaults */
/* bg-slate-950 text-slate-100 from-purple-600 to-indigo-600 */
```

### Typography Trinity

Choose one of these stacks. Never default to Inter + Roboto + no contrast:

| Stack | Display | Body | Mono | Personality |
|---|---|---|---|---|
| **Editorial Ink** | Playfair Display | DM Sans | DM Mono | Print authority, warm |
| **Carbon Technical** | Space Grotesk | IBM Plex Sans | IBM Plex Mono | Precision instrument |
| **Warm Editorial** | Libre Baskerville | Source Serif 4 | Source Code Pro | Long-form journalism |
| **Luxury Silent** | Cormorant Garamond | Helvetica Neue | Courier New | Exclusive, confident |
| **Neon Underground** | Space Grotesk | Inter | Fira Code | Disruptive, high-energy |

**Critical rules:**
- Headings: `letter-spacing: -0.03em`, `line-height: 1.05–1.15`
- Eyebrow labels: `font-family: mono`, `letter-spacing: 0.12em`, `text-transform: uppercase`, `font-size: 0.62rem`
- Body: `font-weight: 300`, `line-height: 1.65–1.8`

### Button System — Anti-Default

```css
/* Editorial bracket-style button — NOT rounded-lg */
.btn-primary {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
}
.btn-primary::before { content: '['; opacity: 0.6; }
.btn-primary::after  { content: ']'; opacity: 0.6; }
```

### Hierarchy Without Cards

```css
/* DO: Left-border insets */
.insight {
  padding: 1.25rem 1.5rem;
  border-left: 2px solid var(--brand);
  background: transparent;
}

/* DO: Stat row with CSS vertical dividers */
.stat-item + .stat-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 20%; bottom: 20%;
  width: 1px;
  background: var(--hair);
}

/* DON'T */
/* <div class="rounded-xl border shadow p-6 bg-white">...</div> */
```

---

## PART 5 — Layout Rules

### Single-Page Editorial Scroll (Not Tab Dashboard)

```jsx
// SLOP: Tab-based SaaS dashboard
<Tabs value={activeTab}>
  <TabsList><TabsTrigger>Tool</TabsTrigger></TabsList>
  <TabsContent>...</TabsContent>
</Tabs>

// ANTI-SLOP: Scroll-based editorial sections
<main>
  <section id="hero"><HeroSection /></section>
  <section id="auditor"><SlopAuditor /></section>
  <section id="artbible"><ArtBibleGenerator /></section>
  <section id="playbook"><Playbook /></section>
</main>
```

### Scroll Navigation Pattern
```jsx
// Nav highlights active section via IntersectionObserver
useEffect(() => {
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) setActive(e.target.id);
    }),
    { threshold: 0.5 }
  );
  document.querySelectorAll('section[id]').forEach(s => obs.observe(s));
  return () => obs.disconnect();
}, []);
```

### Background Texture — No Glow Blobs

```css
/* Architectural grid — structural, not decorative noise */
background-image:
  linear-gradient(var(--hair) 1px, transparent 1px),
  linear-gradient(90deg, var(--hair) 1px, transparent 1px);
background-size: 60px 60px;

/* FORBIDDEN */
/* <div class="blur-3xl rounded-full opacity-30 bg-purple-500 absolute" /> */
```

---

## PART 6 — Motion Principles

```css
/* Ease-out expo — used by premium sites */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

/* Scroll reveal — fade-up entrance */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s var(--ease-out-expo), transform 0.7s var(--ease-out-expo);
}
.reveal.visible { opacity: 1; transform: translateY(0); }

/* Stagger via delay classes */
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }

/* FORBIDDEN */
/* animate-bounce, animate-spin on UI elements */
/* transition: all 0.3s ease (too generic) */
```

### Scroll Reveal Hook (React)
```jsx
function useReveal() {
  useEffect(() => {
    const activate = () => {
      document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) el.classList.add('visible');
      });
    };
    activate();
    window.addEventListener('scroll', activate, { passive: true });
    return () => window.removeEventListener('scroll', activate);
  }, []);
}
```

---

## PART 7 — Micro-Detail Checklist (UI Sniping)

Add these *after* the layout is solid. Be surgical — not everything needs one:

- [ ] **Scroll progress bar** — 2px top-of-page indicator, brand color
- [ ] **Ticker tape** — horizontal scrolling text banner for key messages/warnings
- [ ] **Load hesitation** — `animation-delay: 0.2–0.4s` on hero content for perceived weight
- [ ] **Counter animations** — numbers count up when scrolled into view via IntersectionObserver
- [ ] **Terminal frame** — wrap code inputs in a titlebar with 3 colored window-control dots
- [ ] **Bracket buttons** — `[ CTA TEXT ]` with `::before`/`::after` pseudo-elements and clip-path corner
- [ ] **Eyebrow labels** — small mono uppercase text above every section heading
- [ ] **Left-border insets** — 2px brand color left border instead of card containers
- [ ] **Hairline dividers** — 1px `var(--hair)` between sections, not full borders everywhere
- [ ] **Copy-on-click** — code blocks and prompt templates have a "Copied!" confirmation state
- [ ] **Monumental background type** — oversized text used as structural pattern, not readable content

---

## PART 8 — The Anti-Slop Prompt Arsenal

### Start-of-Session Art Bible Injection
```
Before writing any code: this project uses the following design system.
Background: #0a0906. Accent: #c8965a. Text: #f0ebe4.
Display font: Playfair Display (italic for headings). Body: DM Sans. Mono: DM Mono.
NO purple, NO indigo, NO Inter defaults, NO rounded card grids.
Use left-border insets for hierarchy. Use CSS hairlines for separation.
Buttons use bracket [ ] styling with clip-path polygon corners.
Sections are scroll-based, not tab-based.
```

### Competitor Research + Copy Prompt
```
Use Firecrawl to research the top 5 competitors in [niche].
Create a document showing: positioning statements, CTA language, color palettes.
Then rewrite all copy on this page using "sell the dream, not the feature."
CTAs must be specific (not "Get Started"). Replace every placeholder text.
```

### Slop Audit Prompt
```
Audit the following code for AI slop patterns:
1. Any purple/indigo gradients?
2. Any border-radius + shadow card overload?
3. Inter font without deliberate choice?
4. More than 2 primary CTAs in one section?
5. Any blur-3xl glow blobs?
6. Any tab-based SaaS dashboard layout?
7. Generic CTA copy ("Get Started", "Learn More")?
For each issue found, provide the exact fix with replacement code.
```

### Normalisation Prompt (after ANF Assembly)
```
Normalise the entire page so all sections share:
(1) font: Playfair Display for headings, DM Sans for body
(2) spacing: multiples of 8px base unit
(3) colors: only from design.md — no hardcoded Tailwind defaults
(4) buttons: bracket [ ] style with clip-path corners, not rounded-lg
(5) hierarchy: via typography scale and padding — not card borders
Eliminate all clashing styles from different component sources.
```

### Micro-Interaction Elevation Prompt
```
Do a web search for the best micro-interactions in [industry] web design.
Then implement surgically (not everywhere):
- Scroll progress indicator (2px brand color, top of viewport)
- Number counters that animate up on scroll into view
- Staggered fade-up entrance animations (0.12s stagger between items)
- Hover states on all interactive elements
Do NOT animate every element. Be a sniper, not a shotgun.
```

---

## PART 9 — Reference Tool Ecosystem

| Category | Tools |
|---|---|
| **Component Libraries** | 21st.dev, Magic UI, CodePen |
| **Design Inspiration** | Godly.website, Awwwards, Dribbble, Pinterest |
| **AI Image Generation** | Midjourney, Google Whisk, Stable Diffusion, Nano Banana |
| **AI Video / Animation** | Google Flow, Kling, Higgsfield |
| **Color Palettes** | coolors.co, realtimecolors.com |
| **Typography** | Google Fonts — Playfair Display, DM Sans, Space Grotesk, IBM Plex |
| **Visual Canvas** | Stitch, Pencil.dev, Figma |
| **Research Scraping** | Firecrawl MCP |
| **Deployment** | Vercel + GitHub |
| **3D** | Spline.design |

---

## PART 10 — Non-Negotiable Principles

1. **Never one-shot a design.** Cast a wide net (5 variations), pick a direction, iterate. The lottery approach to prompting produces slop.
2. **Taste must be cultivated before you prompt.** Build an inspiration library from Awwwards, Dribbble, and Godly first.
3. **Escape the terminal for the final 1%.** Some details cannot be described in text — use Stitch or Figma.
4. **The art plate comes first.** Never prompt from blank — provide a bespoke visual reference image.
5. **Human-designed components > AI-generated ones.** 21st.dev > "make me a hero section." Every time.
6. **The art bible is law.** Feed `design.md` to every Claude session. Without it, AI defaults to purple within 3 prompts.
7. **Sell Maui, not the flight.** Copy sells the dream outcome, not the feature set.
8. **UI sniping over shotgun.** Add micro-interactions surgically to 3–5 key moments. Not everything needs animation.
