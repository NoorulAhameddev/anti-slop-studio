import React, { useState } from 'react';

const FRAMEWORKS = [
  {
    id: 'anf',
    label: 'ANF Framework',
    sub: 'Assemble · Normalise · Fill',
    color: 'var(--brand)',
    chapters: [
      {
        num: '01',
        title: 'Assemble',
        summary: 'Use human-designed components from 21st.dev, Magic UI, or CodePen as your building blocks. Save prompts as 1.txt, 2.txt, etc. Tell Claude Code to assemble them in order.',
        why: 'AI cannot design. But AI can perfectly implement designs made by humans. Give it the cookbook.',
        tools: ['21st.dev', 'Magic UI', 'CodePen', 'Monet'],
        prompt: 'Create a website using the components in the /components folder in this order: 1.txt, 2.txt, 3.txt, 4.txt. Assemble them into a single coherent page.',
      },
      {
        num: '02',
        title: 'Normalise',
        summary: 'Components from different designers will clash. Normalise typography, spacing, colors, and border radius across the entire page using a single prompt with your art bible.',
        why: 'The difference between "assembled components" and "designed website" is cohesion. Normalise with your design.md.',
        tools: ['design.md', 'Art Bible Generator', 'CSS custom properties'],
        prompt: 'Normalise the entire page so all sections share the same: (1) font family and scale, (2) spacing system using multiples of 8px, (3) color palette from design.md, (4) border radius system. Eliminate any clashing styles.',
      },
      {
        num: '03',
        title: 'Fill',
        summary: 'Use an AI research prompt to analyse your niche, competitors, and audience. Replace all placeholder copy with targeted, conversion-focused language that sells the dream not the feature.',
        why: '"Sell Maui, not the flight to Maui." Generic copy is as much slop as purple gradients.',
        tools: ['Firecrawl MCP', 'Claude research mode', 'Competitor analysis'],
        prompt: 'Research [niche]. Analyse the top 5 competitors. Then rewrite all copy on this page: (1) Replace all placeholder text, (2) Use the "sell the dream, not the feature" principle, (3) CTAs should be specific ("Unlock your first build") not generic ("Get Started"), (4) Testimonials should be niche-specific.',
      },
    ],
  },
  {
    id: 'pages',
    label: 'PAGES Framework',
    sub: 'Purpose · Anchor · Guide · Elevate · Ship',
    color: 'var(--good)',
    chapters: [
      {
        num: 'P',
        title: 'Purpose',
        summary: 'Define the destination before you write a single line. Use Firecrawl MCP to scrape competitors and analyse their positioning, CTAs, and brand colors.',
        why: 'If you and I get in a car but don\'t have a destination, any road will do — which means we\'ll never arrive.',
        tools: ['Firecrawl MCP', 'Competitor research', 'cool.co palettes'],
        prompt: 'Use Firecrawl to research the top 5 competitors in [niche]. Create a document showing: positioning statements, CTA language, color palettes, brand vibes, and what makes each feel premium or generic.',
      },
      {
        num: 'A',
        title: 'Anchor',
        summary: 'Build a scroll-stopping hero. Generate a start frame and end frame with Google Whisk, animate with Google Flow, and link playback to scroll position.',
        why: 'The hero is your empty shop on Bond Street. People decide to enter within seconds of looking at the window.',
        tools: ['Google Whisk', 'Google Flow', 'Kling', 'Higgsfield', 'Midjourney'],
        prompt: 'Use the attached start_frame.jpg and end_frame.jpg. Create a scroll-linked hero animation: as user scrolls from 0–300px, interpolate through the frames sequentially at ~30fps using a canvas or JPEG sequence approach. On mobile, show start_frame.jpg statically.',
      },
      {
        num: 'G',
        title: 'Guide',
        summary: 'Write copy that leads the user on a single journey. One message, one CTA, one destination. Use the competitive research to use language your audience already uses.',
        why: '"If you tell someone to do more than one thing at a time, they do zero." — The AntiGravity transcript.',
        tools: ['Claude copy mode', 'Firecrawl research doc', 'Swipe file'],
        prompt: 'Go through the entire website. Apply the "sell the dream, not the feature" principle throughout. Ensure there is only one primary CTA per section. The hero leads to the features which leads to testimonials which leads to pricing/CTA. Remove all secondary distractions.',
      },
      {
        num: 'E',
        title: 'Elevate',
        summary: 'UI sniping. Replace generic components with premium micro-interactions from Magic UI. Add load hesitation, scroll progress, staggered reveals, and counter animations.',
        why: 'Look at it like a canvas. Pick specific things to improve like a sniper, not a shotgun.',
        tools: ['Magic UI', '21st.dev', 'CodePen', 'Google Fonts'],
        prompt: 'Do a web search for the best web design micro-interactions for [industry]. Then implement: (1) A subtle loading sequence with staggered text reveals, (2) Scroll-progress indicator, (3) Number counters that count up on scroll, (4) Hover states on all interactive elements. Be surgical — not everything needs animation.',
      },
      {
        num: 'S',
        title: 'Ship',
        summary: 'Push to GitHub, connect to Vercel. Get a custom domain. Test mobile first. Any change in AntiGravity/Claude Code auto-deploys.',
        why: 'A beautiful website that isn\'t live is art in a drawer.',
        tools: ['GitHub', 'Vercel', 'Custom domain registrar'],
        prompt: 'Push this project to GitHub. Then provide the steps to connect this repo to Vercel for deployment. Ensure: mobile responsive (test at 375px), no horizontal scroll, and video fallback to static image on mobile.',
      },
    ],
  },
  {
    id: 'cloner',
    label: 'The Cloner Framework',
    sub: 'Deconstruct · Learn · Adapt',
    color: 'var(--danger)',
    chapters: [
      {
        num: '01',
        title: 'Deconstruct',
        summary: 'Find a world-class site you love (Awwwards, Godly.website). Press Ctrl+U for raw HTML. Use a site teardown skill to extract the linked CSS and JS files completely.',
        why: 'Screenshots give you the surface. Source code gives you the recipe. The translation from image to code is lossy — the code itself is lossless.',
        tools: ['Browser DevTools', 'Site Teardown Skill', 'Ctrl+U', 'Awwwards', 'Godly.website'],
        prompt: 'Here is the HTML for [site]: [paste HTML]. Use the site teardown skill to also extract and analyse the CSS and JS files linked in this HTML. Then explain: what key design techniques are being used here? What creates this specific effect?',
      },
      {
        num: '02',
        title: 'Learn',
        summary: 'Ask Claude Code to explain how specific effects work. How does the scroll animation work? What creates that background? This is your education — not just copying.',
        why: 'You learn by doing and by deconstructing. The cloner is your design education at a code level.',
        tools: ['Claude Code education mode', 'DevTools', 'MDN Web Docs'],
        prompt: 'Looking at the code you just analysed — explain in plain language: (1) How their scroll animation works technically, (2) What CSS properties create that background effect, (3) What JavaScript is driving the interactive elements. Teach me so I can apply these techniques myself.',
      },
      {
        num: '03',
        title: 'Adapt',
        summary: 'You are not plagiarising. You are using the same mechanics with your own brand. Swap the art, the copy, and the palette while preserving the underlying design intelligence.',
        why: 'Just like any skill in any domain: you see what pros do, you try to copy them, you learn, and over time you give it your own spin.',
        tools: ['Midjourney', 'Your art bible', 'Claude Code implementation'],
        prompt: 'Using the design mechanics and CSS techniques we learned from deconstructing [site], now rebuild our website for [your brand] using the same: scroll animation approach, background technique, component structure. But use our colors from design.md, our art plate as the hero image, and our copy.',
      },
    ],
  },
];

const TOOL_LINKS = {
  '21st.dev': 'https://21st.dev',
  'Magic UI': 'https://magicui.design',
  'Awwwards': 'https://www.awwwards.com',
  'Godly.website': 'https://godly.website',
  'Midjourney': 'https://midjourney.com',
  'Dribbble': 'https://dribbble.com',
  'Pinterest': 'https://pinterest.com',
  'CodePen': 'https://codepen.io',
  'Google Fonts': 'https://fonts.google.com',
  'Vercel': 'https://vercel.com',
  'GitHub': 'https://github.com',
};

function ChapterCard({ chapter }) {
  const [promptCopied, setPromptCopied] = useState(false);

  const copyPrompt = () => {
    navigator.clipboard.writeText(chapter.prompt).then(() => {
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 1800);
    });
  };

  return (
    <div className="chapter">
      <div className="chapter-num">{chapter.num}</div>
      <div>
        <h4 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--ink-200)',
          marginBottom: '0.75rem',
        }}>{chapter.title}</h4>
        <p style={{
          color: 'var(--ink-300)',
          lineHeight: 1.7,
          fontWeight: 300,
          marginBottom: '1rem',
          fontSize: '0.9rem',
        }}>{chapter.summary}</p>
        <blockquote style={{
          borderLeft: '2px solid var(--brand)',
          paddingLeft: '1rem',
          marginBottom: '1rem',
          fontStyle: 'italic',
          color: 'var(--ink-400)',
          fontSize: '0.85rem',
          lineHeight: 1.6,
        }}>{chapter.why}</blockquote>

        {/* Tools */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1rem' }}>
          {chapter.tools.map(tool => (
            <span key={tool} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ink-500)',
              background: 'var(--ink-700)',
              padding: '0.2rem 0.5rem',
              borderRadius: '2px',
            }}>{tool}</span>
          ))}
        </div>

        {/* Prompt block */}
        <div style={{
          background: 'var(--ink-900)',
          border: '1px solid var(--hair)',
          borderRadius: '2px',
          padding: '1rem',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--brand)',
            }}>Prompt Template</span>
            <button
              className={`copy-btn ${promptCopied ? 'copied' : ''}`}
              onClick={copyPrompt}
            >{promptCopied ? '✓ Copied' : 'Copy'}</button>
          </div>
          <pre style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--ink-300)',
            lineHeight: 1.65,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            margin: 0,
          }}>{chapter.prompt}</pre>
        </div>
      </div>
    </div>
  );
}

export default function Playbook() {
  const [activeFramework, setActiveFramework] = useState(FRAMEWORKS[0]);

  return (
    <div style={{
      borderTop: '1px solid var(--hair)',
      background: 'var(--ink-900)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '6rem 2rem',
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        gap: '4rem',
        alignItems: 'start',
      }}>

        {/* Left sidebar — index nav (from "ledger" design in transcripts) */}
        <div style={{ position: 'sticky', top: '80px' }}>
          <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>Tool 03</p>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontStyle: 'italic',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '2rem',
          }}>The Playbook</h2>

          {/* Framework switcher — index style, not pills */}
          <nav className="index-nav">
            {FRAMEWORKS.map((fw, i) => (
              <button
                key={fw.id}
                className={`index-nav-item ${activeFramework.id === fw.id ? 'active' : ''}`}
                onClick={() => setActiveFramework(fw)}
              >
                <span className="index-num">0{i + 1}</span>
                <span>{fw.label}</span>
              </button>
            ))}
          </nav>

          {/* Tool reference */}
          <div style={{ marginTop: '2.5rem' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink-600)',
              marginBottom: '0.75rem',
              borderBottom: '1px solid var(--hair)',
              paddingBottom: '0.5rem',
            }}>Key Tools</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {Object.entries(TOOL_LINKS).slice(0, 8).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--ink-500)',
                    textDecoration: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.375rem 0',
                    transition: 'color 0.15s ease',
                    borderBottom: '1px solid var(--hair)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-500)'}
                >
                  {name}
                  <span style={{ opacity: 0.4 }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right content */}
        <div>
          {/* Framework header */}
          <div style={{
            paddingBottom: '2rem',
            borderBottom: `2px solid ${activeFramework.color}`,
            marginBottom: '2rem',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              flexWrap: 'wrap',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontStyle: 'italic',
                fontWeight: 700,
                color: 'var(--ink-100)',
              }}>{activeFramework.label}</h3>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: activeFramework.color,
              }}>{activeFramework.sub}</span>
            </div>
          </div>

          {/* Chapters */}
          <div>
            {activeFramework.chapters.map(chapter => (
              <ChapterCard key={chapter.num} chapter={chapter} />
            ))}
          </div>

          {/* Bottom principles — editorial text, not cards */}
          <div style={{
            marginTop: '4rem',
            paddingTop: '3rem',
            borderTop: '1px solid var(--hair)',
          }}>
            <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>Non-Negotiable Principles</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0',
            }}>
              {[
                ['Never one-shot.', 'Cast a wide net. Get 5 variations. Pick a direction. Then iterate. The lottery approach to prompting is what produces slop.'],
                ['Taste must be cultivated.', 'Build an inspiration library. Screenshot Awwwards, Dribbble, Pinterest. What you see becomes what you can articulate.'],
                ['Escape the terminal.', 'Text cannot fully describe a visual medium. At some point, you must use Stitch, Pencil.dev, or Figma.'],
                ['The art plate first.', 'Never prompt for a design from blank. Provide a bespoke visual reference. The image is your spec.'],
                ['Components > prompts.', 'Human-designed components from 21st.dev > AI-generated ones from text prompts. Every time.'],
                ['Art bible is law.', 'Generate a design.md. Feed it to every Claude session. The moment you stop, AI defaults to purple.'],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid var(--hair)',
                    borderRight: '1px solid var(--hair)',
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--brand)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}>{title}</div>
                  <div style={{
                    fontSize: '0.82rem',
                    color: 'var(--ink-400)',
                    lineHeight: 1.65,
                    fontWeight: 300,
                  }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
