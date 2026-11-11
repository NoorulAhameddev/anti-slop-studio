# Anti-Slop Web Design Studio

A frontend code quality auditor, linter, and design token normalization framework designed to eliminate generic templating patterns in AI-generated web interfaces.

---

## Core Capabilities

### 1. Code Auditor and Linter
Analyzes raw HTML, JSX, and TSX markup for common design anti-patterns:
* Overused default color gradients and saturated palette presets
* Excessive nested card wrapping and uniform border radiuses
* Low-contrast ambient background artifacts
* Header navigation and primary action clutter

Computes an objective 0–100% interface quality metric and provides automated prompt corrections for coding agents.

### 2. Design Token Generator
Generates customized design system specifications (`design.md`) detailing:
* Surface and border HSL color palettes
* Typeface pairing and typographic scale hierarchies
* Consistent spatial grid measurements
* Component state styles

### 3. Motion System
* Deterministic scroll progress indicators
* Staggered element reveals
* Synchronized stat counters
* Hairline borders and minimal divider elements

### 4. Agent Skill Integration
Includes `.agents/skills/anti-slop-web-design/SKILL.md` to directly inject interface design standards into agentic coding workflows.

---

## Getting Started

### Prerequisites
* Node.js 18.0 or higher
* npm 9.0 or higher

### Installation

```bash
# Clone repository
git clone https://github.com/NoorulAhameddev/anti-slop-studio.git
cd anti-slop-studio

# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

The application runs locally at `http://localhost:3000`.

---

## Repository Structure

```
anti-slop-studio/
├── .agents/skills/       # Agent skill definitions
├── public/               # Static assets, robots.txt, sitemap
├── src/                  # React components, styles, application logic
├── Best_Practices_Guide.md # Technical implementation guidelines
├── package.json          # Node dependencies and scripts
└── vite.config.js        # Vite build configuration
```

---

## License

This project is licensed under the [MIT License](LICENSE).
