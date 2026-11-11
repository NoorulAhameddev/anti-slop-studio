import React, { useEffect, useRef, useState } from 'react';

// Scroll-reveal hook — activates .reveal elements on intersection
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


// Animated counter — editorial detail
function Counter({ target, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start = Math.min(start + step, target);
          setCount(Math.floor(start));
          if (start >= target) clearInterval(timer);
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 900,
        color: 'var(--ink-100)',
        letterSpacing: '-0.04em',
        lineHeight: 1,
      }}>
        {count}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--ink-500)',
        marginTop: '0.5rem',
      }}>{label}</div>
    </div>
  );
}

// Ticker tape — runs slop patterns as a warning stream
const SLOP_SINS = [
  'Purple gradient · ',
  'Inter on everything · ',
  'Card overload · ',
  'Random glow blobs · ',
  'Border everywhere · ',
  'Generic CTA · ',
  'Three-column feature grid · ',
  'Floating SaaS orbs · ',
  'Indigo-500 defaults · ',
  'Uneven spacing · ',
  'Overcrowded top nav · ',
  'Eyebrow + border + badge + glow · ',
];

function SlopTicker() {
  const items = [...SLOP_SINS, ...SLOP_SINS]; // double for seamless loop
  return (
    <div style={{
      borderTop: '1px solid var(--hair)',
      borderBottom: '1px solid var(--hair)',
      padding: '0.625rem 0',
      overflow: 'hidden',
      background: 'rgba(10,9,6,0.8)',
    }}>
      <div className="ticker-inner">
        {items.map((sin, i) => (
          <span key={i} className="ticker-item">
            <span style={{ color: 'var(--danger)', opacity: 0.6 }}>✕</span>{' '}
            {sin}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection({ scrollTo }) {
  useReveal();
  return (
    <div style={{ paddingTop: '52px' }}> {/* offset for fixed nav */}

      {/* ── Monumental Hero — editorial, not a SaaS hero ── */}
      <div
        className="arch-grid noise-overlay"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '8rem 2rem 4rem',
          overflow: 'hidden',
        }}
      >
        {/* Large background typography — structure, not decoration */}
        <div
          className="monumental"
          style={{
            position: 'absolute',
            bottom: '-2rem',
            right: '-1rem',
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          NO<br />SLOP
        </div>

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
        }}>
          {/* Eyebrow */}
          <p className="eyebrow animate-fade-up" style={{ marginBottom: '1.5rem' }}>
            Anti-Slop Studio · 8 Masterclasses Synthesised
          </p>

          {/* Headline — Playfair Display, editorial weight */}
          <h1
            className="animate-fade-up-delay-1"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              fontWeight: 900,
              fontStyle: 'italic',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: 'var(--ink-100)',
              maxWidth: '14ch',
              marginBottom: '2rem',
            }}
          >
            Your AI website<br />
            <span style={{ color: 'var(--brand)' }}>tells everyone</span><br />
            you didn’t try.
          </h1>

          {/* Sub — DM Sans, not cramped, not overloaded */}
          <p
            className="animate-fade-up-delay-2"
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              color: 'var(--ink-300)',
              maxWidth: '42ch',
              lineHeight: 1.65,
              marginBottom: '3rem',
              fontWeight: 300,
            }}
          >
            The definitive framework for breaking out of the AI template trap.
            Audit slop patterns, generate art bibles, and learn the 7 levels —
            synthesised from the transcripts.
          </p>

          {/* CTA — two actions, not twelve */}
          <div
            className="animate-fade-up-delay-3"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <button className="btn-primary" onClick={() => scrollTo('auditor')}>
              Run Slop Audit
              <span className="arrow">→</span>
            </button>
            <button className="btn-ghost" onClick={() => scrollTo('playbook')}>
              View Playbook
            </button>
          </div>
        </div>
      </div>

      {/* ── Slop Ticker — runs the sins in a banner ── */}
      <SlopTicker />

      {/* ── Stat Row — vertical rule dividers, no card grid ── */}
      <div style={{ borderBottom: '1px solid var(--hair)' }}>
        <div className="stat-row">
          {[
            [16, 'Transcripts'],
            [10, 'Slop Patterns'],
            [7,  'Design Levels'],
            [3,  'Frameworks'],
            [8,  'Masterclasses'],
          ].map(([n, l], i) => (
            <div key={l} className={`stat-item reveal reveal-delay-${i + 1}`}>
              <Counter target={n} label={l} />
            </div>
          ))}
        </div>
      </div>

      {/* ── The Problem — editorial text block, no cards ── */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '6rem 2rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '6rem',
        alignItems: 'start',
      }}>
        <div>
          <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>The Problem</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            fontStyle: 'italic',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}>
            AI has no taste. Most people can’t articulate theirs.
          </h2>
          <p style={{ color: 'var(--ink-300)', lineHeight: 1.75, fontWeight: 300, marginBottom: '1.5rem' }}>
            The problem isn’t the model. It’s that you arrive without direction
            and leave with an averaged regression-to-the-mean output. Claude Code
            and every other AI fills in the gaps with whatever is statistically
            most common: Tailwind’s Indigo-500, Inter font, three-column feature
            grids, and glowing orbs.
          </p>
          <p style={{ color: 'var(--ink-400)', lineHeight: 1.75, fontWeight: 300, fontSize: '0.9rem' }}>
            “If you don’t know what right looks like, how is Claude Code supposed to figure it out?”
          </p>
          <p className="eyebrow" style={{ marginTop: '0.75rem', color: 'var(--ink-500)' }}>
            — The 7 Levels Transcript
          </p>
        </div>

        <div>
          <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>The Solution</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              ['01', 'Cultivate taste', 'Build an inspiration library from Dribbble, Awwwards, Pinterest, and X before you write a single prompt.'],
              ['02', 'Provide the art plate', 'Never prompt from a blank canvas. Give AI a bespoke visual reference — not a template description.'],
              ['03', 'Inject your art bible', 'Extract typography, palette, and spacing rules into a design.md and feed it to every subsequent prompt.'],
              ['04', 'Escape the terminal', 'Use Stitch, Pencil.dev, or Figma for the final 1% of visual tinkering you cannot describe in text.'],
            ].map(([num, title, desc]) => (
              <div
                key={num}
                style={{
                  padding: '1.5rem 0',
                  borderBottom: '1px solid var(--hair)',
                  display: 'grid',
                  gridTemplateColumns: '2.5rem 1fr',
                  gap: '1rem',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--ink-600)',
                  paddingTop: '0.2rem',
                }}>{num}</span>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--ink-200)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}>{title}</div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--ink-400)',
                    lineHeight: 1.6,
                    fontWeight: 300,
                  }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 7 Levels Overview ── */}
      <div style={{
        background: 'var(--ink-800)',
        borderTop: '1px solid var(--hair)',
        borderBottom: '1px solid var(--hair)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '5rem 2rem',
        }}>
          <div style={{ marginBottom: '3rem' }}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>The 7 Levels Framework</p>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontStyle: 'italic',
              fontWeight: 700,
              maxWidth: '32ch',
              lineHeight: 1.15,
            }}>
              Where are you in the journey from slop to architect?
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '0',
          }}>
            {[
              { lvl: 'L1', name: 'Simple Prompting', desc: 'Basic prompt, no direction. Purple gradients guaranteed.', state: 'slop' },
              { lvl: 'L2', name: 'Skills Injection', desc: 'UI/UX Pro Max skill. Better, but still a recognisable AI template.', state: 'slop' },
              { lvl: 'L3', name: 'Visual Director', desc: 'Screenshots from Awwwards/Pinterest. Hit the "vibe gap" — AI translates lossily.', state: 'warn' },
              { lvl: 'L4', name: 'The Cloner', desc: 'Extract HTML/CSS/JS from world-class sites. Learn the mechanics deeply.', state: 'warn' },
              { lvl: 'L5', name: 'Custom Components', desc: '21st.dev + bespoke Midjourney art plates. Original character.', state: 'good' },
              { lvl: 'L6', name: 'Visual Tinkering', desc: 'Stitch, Pencil.dev, Figma for the final 1%. Terminal can\'t do this.', state: 'good' },
              { lvl: 'L7', name: 'The Architect', desc: 'Custom WebGL, shaders, 3D. Teams of designers. Few can play here.', state: 'good' },
            ].map(({ lvl, name, desc, state }) => (
              <div
                key={lvl}
                style={{
                  padding: '2rem',
                  borderLeft: `2px solid ${state === 'slop' ? 'var(--danger)' : state === 'good' ? 'var(--good)' : 'var(--brand)'}`,
                  borderBottom: '1px solid var(--hair)',
                  background: state === 'slop'
                    ? 'rgba(224,82,82,0.03)'
                    : state === 'good'
                    ? 'rgba(90,143,110,0.03)'
                    : 'rgba(200,150,90,0.03)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    color: 'var(--ink-600)',
                    textTransform: 'uppercase',
                  }}>{lvl}</span>
                  {state === 'slop' && <span className="slop-badge">Slop Zone</span>}
                  {state === 'warn' && <span className="warn-badge">Ceiling Risk</span>}
                  {state === 'good' && <span className="good-badge">Elite</span>}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--ink-200)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '0.625rem',
                }}>{name}</div>
                <div style={{
                  fontSize: '0.82rem',
                  color: 'var(--ink-400)',
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
