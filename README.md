# Beamlines Outreach

> An interactive, multilingual particle physics and accelerator mechanics learning platform built with Next.js, MDX, and Framer Motion.

---

## Overview

Modern high-energy physics often feels inaccessible behind layers of abstract mathematics and specialized terminology. **Beamlines Outreach** bridges this gap by transforming core theoretical and experimental concepts—from the Lorentz force in cyclotrons to running coupling constants in Grand Unified Theories—into interactive, visual simulations paired with clear conceptual explanations.

Learners can directly manipulate magnetic fields, stretch quark flux tubes, toggle relativistic reference frames, and collapse quantum superpositions. For students wanting deeper mathematical rigor, optional **Math Gates** unpack the underlying Lagrangian formulations, Lorentz transformations, and quantum wavefunctions rendered via KaTeX without interrupting the conceptual flow.

---

## Architecture & Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components & Dynamic Routing)
- **UI Library**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/typography`
- **Interactive Simulations & Animation**: [Framer Motion](https://www.framer-motion.dev/), SVG parametric geometry, and HTML5 Canvas (`canvas-confetti`)
- **Curriculum & Content**: [MDX](https://mdxjs.com/) via `next-mdx-remote` with `remark-math` and `rehype-katex`
- **Math Rendering**: [KaTeX](https://katex.org/) (LaTeX formulas)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) with localStorage persistence
- **Persistence & Progress Tracking**: [Prisma ORM](https://www.prisma.io/) with SQLite (`dev.db`) and anonymous device cookie identification
- **Routing & i18n Middleware**: Custom edge proxy (`src/proxy.ts`) for language negotiation and cookie dispatch

---

## Interactive Demonstrations

The curriculum is structured across three core modules comprising 10 interactive simulations. Each lesson pairs conceptual prose with a dedicated laboratory component, an optional mathematical derivation, and a knowledge verification quiz.

### Module 1: The Core

| Lesson | Simulation Component | Physics Principles | User Controls & Mechanics |
| :--- | :--- | :--- | :--- |
| **1. The Standard Model** | `<StandardModelSorter />` | Elementary particle classification, Fermions (matter particles) vs. Bosons (force carriers), strong/weak/electromagnetic interaction rules. | Tap any scrambled particle to inspect physical clues; drag-and-drop particles into target jars (**Quarks**, **Leptons**, **Bosons**). Colors and orders are randomized per session to enforce deduction over rote memorization. |
| **2. Particle Accelerators** | `<Cyclotron />` | Cyclotron resonance, Lorentz force $\vec{F} = q(\vec{E} + \vec{v} \times \vec{B})$, radial acceleration via electric field $\vec{E}$, magnetic deflection $\vec{B}$, Dee orbit synchronism. | Sliders for **Electric Field** (speed/energy) and **Magnetic Field** (curvature/steering). Out-of-balance fields cause the particle to collide with the chamber wall; tuning both into resonance ($>85\%$ within $\pm10\%$) ejects the beam into the target port. |
| **3. Electromagnetism** | `<InductionCoil />` | Faraday's Law of Induction $\mathcal{E} = -N \frac{d\Phi_B}{dt}$, Lenz's Law, conversion of kinetic motion into electromotive force (EMF). | Draggable permanent bar magnet inside a copper wire solenoid. Instantaneous drag velocity ($\Delta x / \Delta t$) dynamically drives the induced EMF, illuminating a lightbulb and coil glow proportional to movement speed. |
| **4. Quantum States** | `<QuantumCoin />` | Quantum superposition $|\psi\rangle = \frac{1}{\sqrt{2}}(\vert 0\rangle + \vert 1\rangle)$, Copenhagen interpretation, wavefunction collapse upon measurement, Law of Large Numbers. | **Catch the Coin**: Collapses a spinning coin in superposition into deterministic Heads or Tails.<br>**Macro Wave**: Sweeps an observation wave across a $10 \times 10$ matrix of 100 superposed coins, visualizing the emergence of a classical $\sim50/50$ statistical distribution. |
| **5. Special Relativity** | `<RelativisticTrain />` | Invariance of $c$, Lorentz factor $\gamma = 1/\sqrt{1 - v^2/c^2}$, Time Dilation ($t' = t / \gamma$), Lorentz Length Contraction ($L = L_0 / \gamma$), Twin Paradox. | Throttle slider adjusting velocity from $0.00c$ to $0.99c$; dual-perspective toggle (**View from Platform** vs. **View from Train**); real-time synchronous clocks tracking platform time vs. dilated train time alongside visual spatial contraction. |

### Module 2: Mass, Space & Time

| Lesson | Simulation Component | Physics Principles | User Controls & Mechanics |
| :--- | :--- | :--- | :--- |
| **6. The Higgs Field** | `<HiggsBazaar />` | Spontaneous symmetry breaking, non-zero vacuum expectation value, Yukawa coupling, inertial mass acquisition via field interaction. | Subject selector: **Top Quark** (high coupling/mass), **Electron** (low coupling/mass), and **Photon** (zero coupling, travels at $c$). Drag the particle through a fluctuating background of Higgs bosons; drag resistance and particle swarming scale with coupling strength. |
| **7. Dark Matter & Energy** | `<GravityCarousel />` | Galactic rotation curves, Keplerian orbital decline vs. flat rotation profiles $v(r) = \sqrt{G M(r)/r}$, gravitational missing mass problem. | Galaxy rotation speed slider ($1\times$ to $10\times$); **Inject Dark Matter Halo** toggle. Without dark matter, outer stars exceed escape velocity and detach into space; injecting the invisible halo stabilizes outer orbits at high velocities. |

### Module 3: The Unified Universe

| Lesson | Simulation Component | Physics Principles | User Controls & Mechanics |
| :--- | :--- | :--- | :--- |
| **8. Neutrino Oscillations** | `<NeutrinoTrain />` | PMNS lepton mixing matrix, propagation of non-degenerate mass eigenstates, oscillation probability $P(\nu_\alpha \to \nu_\beta) \propto \sin^2(\frac{\Delta m^2 L}{4E})$, empirical proof of neutrino mass. | Baseline detector slider ($0.1$ to $0.9$ distance ratio); **Fire Neutrino!** button. Real-time probability wave smoothly interpolates particle color between $\nu_e$ (red), $\nu_\mu$ (blue), and $\nu_\tau$ (green) until wavefunction collapses at the detector. |
| **9. Quantum Chromodynamics** | `<QuarkConfinement />` | Strong nuclear force, color confinement, gluon flux tubes, Cornell potential $V(r) \approx -\frac{4}{3}\frac{\alpha_s}{r} + kr$, asymptotic freedom, $E = mc^2$ pair creation (string breaking). | Draggable antiquark pulling against constant string tension. An energy gauge tracks accumulated flux-tube energy (GeV). Exceeding the critical threshold snaps the tube, spontaneously converting energy into a new quark-antiquark pair to form two bound mesons. |
| **10. Grand Unified Theory** | `<UnificationEpoch />` | Renormalization Group Equations (RGEs), running coupling constants $\alpha_i(\mu)$, high-energy gauge symmetry unification ($SU(3) \times SU(2) \times U(1) \to GUT$). | Cosmic timeline & temperature slider rewinding from modern energies ($10^2\text{ GeV}$) to the GUT scale ($10^{16}\text{ GeV}, 10^{29}\text{ K}$). Real-time graph tracks converging strong, weak, and electromagnetic coupling constants to complete the curriculum. |

---

## Pedagogical & Accessibility Features

- **Progressive Disclosure (`<MathGate />`)**: Complex mathematical formulas and physical Lagrangians are tucked inside contextual expandable drawers. Students can engage with purely conceptual models or open Math Gates to study the underlying equations in KaTeX.
- **Formative Quizzes (`<CheckpointQuiz />`)**: Every topic ends with an interactive multiple-choice checkpoint providing instant visual validation, explanatory physics writeups, and celebratory confetti upon completion.
- **Accessibility Suite (`<A11yMenu />` & `<A11yProvider />`)**:
  - **High Contrast Mode**: Switches to pure black backgrounds (`#000000`) and high-saturation neon indicators.
  - **Large Text Mode**: Uniformly scales application typography.
  - **Dyslexia Font Mode**: Replaces default fonts with the legible `Atma` typeface.
  - **Reduced Motion**: Disables all CSS transitions, continuous frame loops, and floating animations.
  - **Screen Reader Mode**: Expands visually hidden semantic text descriptions for every interactive visualizer.
- **Progress Tracking**: User progress across lessons and math levels is tracked via Zustand and synchronized to the SQLite database through `/api/progress` using a persistent HTTP-only device cookie.

---

## Multilingual Support

The platform supports 5 languages with native route localization:

| Language Code | Language | Native Name | MDX Directory |
| :--- | :--- | :--- | :--- |
| `en` (default) | English | English | `src/content/en/` |
| `es` | Spanish | Español | `src/content/es/` |
| `fr` | French | Français | `src/content/fr/` |
| `hi` | Hindi | हिन्दी | `src/content/hi/` |
| `ms` | Malay | Bahasa Melayu | `src/content/ms/` |

### Translation Architecture

1. **Lesson Content (`src/content/[lang]/[topic].mdx`)**: Each language contains an identical set of 10 MDX files. Markdown text, headings, MathGate button text, and CheckpointQuiz props (`question`, `options`, `explanation`) are translated in-place.
2. **Page & Hub Strings (`src/app/[lang]/page.tsx`, `CourseHero.tsx`)**: Module headings, descriptions, and hero copy use dictionary lookup tables keyed by the active `lang` route parameter.
3. **Interactive Components (`src/components/client/`)**: Client visualizers accept a `lang` prop to localize on-canvas labels, status badges, and simulation controls.
4. **URL Navigation & Switcher (`src/components/client/LanguageSwitcher.tsx`)**: Switching languages updates the URL path prefix while strictly preserving the currently viewed lesson route (e.g. `/en/cyclotron` $\to$ `/fr/cyclotron`).
5. **Edge Routing (`src/proxy.ts`)**: Inspects incoming request headers (`Accept-Language`) and redirects root visitors to their preferred supported locale while attaching anonymous device identifiers.

---

## Repository Structure

```
beamlines_outreach/
├── prisma/
│   ├── dev.db                 # Local SQLite database
│   └── schema.prisma          # Prisma models: User and Progress
├── public/                    # Static SVG vector icons and illustrations
├── src/
│   ├── app/
│   │   ├── [lang]/
│   │   │   ├── (courses)/
│   │   │   │   └── [topic]/
│   │   │   │       └── page.tsx   # Dynamic MDX compiler & topic renderer
│   │   │   └── page.tsx           # Course hub (Modules 1, 2, 3 card grid)
│   │   ├── api/
│   │   │   └── progress/
│   │   │       └── route.ts       # Progress recording API endpoint
│   │   ├── globals.css            # Tailwind theme, CSS variables & A11y overrides
│   │   ├── layout.tsx             # Root layout with font definitions & A11yProvider
│   │   └── page.tsx               # Root redirect to default locale (/en)
│   ├── components/
│   │   ├── client/
│   │   │   ├── A11yMenu.tsx       # Accessibility drawer control
│   │   │   ├── A11yProvider.tsx   # DOM data-attribute manager for A11y
│   │   │   ├── CheckpointQuiz.tsx # Formative quiz with answer feedback
│   │   │   ├── CourseHero.tsx     # Animated landing header with physics runes
│   │   │   ├── Cyclotron.tsx      # Cyclotron resonance simulation
│   │   │   ├── GravityCarousel.tsx# Galaxy rotation curve & dark matter model
│   │   │   ├── HiggsBazaar.tsx    # Mass acquisition & Yukawa drag simulation
│   │   │   ├── InductionCoil.tsx  # Faraday induction & dynamo simulation
│   │   │   ├── LanguageSwitcher.tsx# Sticky locale selector
│   │   │   ├── LightClock.tsx     # Time dilation reference visualizer
│   │   │   ├── MathGate.tsx       # Collapsible progressive disclosure for math
│   │   │   ├── NeutrinoTrain.tsx  # Flavor oscillation & quantum mixing model
│   │   │   ├── PremiumLessonCard.tsx# Lesson card with cursor-following glow
│   │   │   ├── ProgressRing.tsx   # Circular module progress visualizer
│   │   │   ├── QuantumCoin.tsx    # Superposition collapse & 100-coin wave
│   │   │   ├── QuarkConfinement.tsx# Strong force flux tube & E=mc² pair creation
│   │   │   ├── RelativisticTrain.tsx# Special relativity & length contraction engine
│   │   │   ├── RevealText.tsx     # Scroll-triggered text animations
│   │   │   ├── SchrodingersBox.tsx# Superposition state observer
│   │   │   ├── StandardModelSorter.tsx# Particle deduction and classification game
│   │   │   └── UnificationEpoch.tsx# Running coupling constants & GUT scale graph
│   │   └── server/
│   │       └── StaticNavbar.tsx   # Persistent global navigation bar
│   ├── content/                   # Multilingual MDX curriculum (50 files total)
│   │   ├── en/                    # English course modules (10 lessons)
│   │   ├── es/                    # Spanish course modules (10 lessons)
│   │   ├── fr/                    # French course modules (10 lessons)
│   │   ├── hi/                    # Hindi course modules (10 lessons)
│   │   └── ms/                    # Malay course modules (10 lessons)
│   ├── lib/
│   │   └── useAppStore.ts         # Zustand store (A11y flags & local progress)
│   └── proxy.ts                   # Edge middleware (locale negotiation & auth cookie)
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## Quickstart / Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.17.0 or v20+)
- `npm` (v9+)

### Installation & Launch

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shivamjkulkarni/beamlines_outreach.git
   cd beamlines_outreach
   ```

2. **Configure the environment:**
   Create a `.env` file pointing Prisma to the local SQLite database:
   ```bash
   echo 'DATABASE_URL="file:./prisma/dev.db"' > .env
   ```

3. **Install dependencies:**
   This command installs all packages and automatically executes `prisma generate` via `postinstall`:
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your web browser. The application will automatically route to [http://localhost:3000/en](http://localhost:3000/en).

### Production Build

To test a production-ready optimized build locally:
```bash
npm run build
npm run start
```

---

## Adding New Languages

To contribute a new language translation (for example, German `de`):

1. **Register the Locale**:
   - In `src/proxy.ts`, add the language code to the `locales` array:
     ```typescript
     const locales = ['en', 'hi', 'ms', 'fr', 'es', 'de']
     ```
   - In `src/components/client/LanguageSwitcher.tsx`, add `'de'` to the language button array:
     ```typescript
     {(['en', 'hi', 'ms', 'fr', 'es', 'de'] as const).map((lang) => ( ... ))}
     ```
   - In `src/lib/useAppStore.ts`, extend the `Language` union type:
     ```typescript
     export type Language = 'en' | 'hi' | 'ms' | 'fr' | 'es' | 'de'
     ```

2. **Create the Content Directory**:
   Create a new folder at `src/content/de/` and copy the 10 `.mdx` files from `src/content/en/`:
   ```bash
   cp -r src/content/en src/content/de
   ```

3. **Translate Lesson MDX Files**:
   Translate the prose, headings, frontmatter title, `MathGate` button labels, and `CheckpointQuiz` properties (`question`, `options`, `explanation`) in each `.mdx` file.

4. **Add Hub & Hero Translations**:
   - In `src/app/[lang]/page.tsx`, add the localized module descriptions to the `t` translation map.
   - In `src/components/client/CourseHero.tsx`, add the hero title and subtitle strings for the new language code.
