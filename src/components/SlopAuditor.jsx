import React, { useState, useCallback } from 'react';

// ── Slop detection rules — sourced directly from transcripts ──
const SLOP_RULES = [
  {
    id: 'purple-gradient',
    label: 'Purple / Indigo Gradient',
    category: 'Color',
    severity: 'slop',
    patterns: [/from-purple/g, /from-indigo/g, /to-purple/g, /to-indigo/g, /purple-[456789]00/g, /indigo-[456789]00/g, /gradient.*purple/gi, /gradient.*indigo/gi, /#[68][12][89][0-9a-f]{3}/gi],
    fix: 'Use a curated HSL brand color instead. Amber, sienna, forest green, deep navy — anything with storytelling intent.',
  },
  {
    id: 'inter-everywhere',
    label: 'Inter Font (AI Default)',
    category: 'Typography',
    severity: 'slop',
    patterns: [/font-family.*Inter/gi, /font-\['Inter'\]/g, /font-inter/g, /'Inter',/g, /"Inter",/g],
    fix: 'Choose a deliberate typeface. Try Playfair Display, DM Sans, Outfit, or any font that matches your brand narrative.',
  },
  {
    id: 'card-overload',
    label: 'Card Overload',
    category: 'Layout',
    severity: 'warn',
    patterns: [/rounded-lg.*shadow/g, /shadow-md.*rounded/g, /bg-white.*rounded.*shadow/gi, /card card card/gi, /<Card/g, /bg-slate.*rounded.*border/g],
    fix: 'Use padding, typography scale, and negative space to create hierarchy. Reserve cards for genuine containment needs.',
  },
  {
    id: 'glow-blobs',
    label: 'Random Glow / SaaS Blobs',
    category: 'Color',
    severity: 'slop',
    patterns: [/blur-3xl.*opacity/g, /rounded-full.*blur/g, /absolute.*blur-\[/g, /animate-pulse.*bg-purple/g, /bg-.*-500\/30.*blur/g, /shadow-\[.*#[0-9a-f]{6}.*\]/gi],
    fix: 'Use architectural grids, noise textures, or editorial photography instead of glowing circles.',
  },
  {
    id: 'border-overload',
    label: 'Border Everywhere',
    category: 'Layout',
    severity: 'warn',
    patterns: [/border border border/g, /border-b border-t border-l border-r/g, /divide-y divide-x/g, /border-gray-[2-4]00/g, /border-slate-[2-4]00/g],
    fix: 'Let spacing and typography create hierarchy. A single consistent hairline border palette is enough.',
  },
  {
    id: 'generic-cta',
    label: 'Generic CTA Text',
    category: 'Copy',
    severity: 'warn',
    patterns: [/Get Started/gi, /Learn More/gi, /Sign Up Free/gi, /Try It Free/gi, /Click Here/gi, /Buy Now/gi],
    fix: 'Sell the dream, not the feature. "Unlock your first build" beats "Get Started". Context-specific beats generic.',
  },
  {
    id: 'top-level-clutter',
    label: 'Top-Level Action Clutter',
    category: 'UX',
    severity: 'warn',
    patterns: [/flex.*gap-2.*<button.*<button.*<button.*<button/gs, /inline-flex.*mr-2.*inline-flex.*mr-2.*inline-flex.*mr-2/g],
    fix: 'Hide secondary actions behind context menus or badges. Decide what ONE thing you want the user to do.',
  },
  {
    id: 'subheading-padding',
    label: 'Redundant Subheading Copy',
    category: 'Copy',
    severity: 'warn',
    patterns: [/Manage your/gi, /View your/gi, /Welcome to your/gi, /Everything you need/gi],
    fix: 'Users know where they are. If they clicked the API keys page, they don\'t need "Manage your API keys" as a subheading.',
  },
  {
    id: 'shadcn-defaults',
    label: 'Default Shadcn Components',
    category: 'Components',
    severity: 'warn',
    patterns: [/from "shadcn\/ui"/g, /from "@\/components\/ui\/button"/g, /from "@\/components\/ui\/card"/g, /@\/components\/ui\/tabs/g],
    fix: 'Shadcn is a baseline, not a design system. Customise your tokens — padding, rounding, colors — before relying on defaults.',
  },
  {
    id: 'overflow-animations',
    label: 'Fake Floating Animations',
    category: 'Motion',
    severity: 'slop',
    patterns: [/animate-bounce/g, /animate-ping/g, /animate-spin.*absolute/g, /floating.*absolute.*animate/gi],
    fix: 'Use intentional entrance animations (fadeUp, stagger) and scroll-linked motion. Bouncing elements add noise, not delight.',
  },
  {
    id: 'gradient-text',
    label: 'Gradient Text Clipping',
    category: 'Typography',
    severity: 'slop',
    patterns: [/bg-clip-text.*text-transparent/g, /text-transparent.*bg-clip-text/g, /bg-gradient-to-.*text-transparent/g],
    fix: 'Use solid, high-contrast typography. Gradient text reduces legibility and screams generic template SaaS.',
  },
  {
    id: 'nested-cards',
    label: 'Nested Cards / Container Soup',
    category: 'Layout',
    severity: 'warn',
    patterns: [/<Card.*<Card/gs, /rounded-[a-z]+.*rounded-[a-z]+.*rounded-[a-z]+/g],
    fix: 'Flatten your visual hierarchy. Use background tint shifts or borderless sections rather than wrapping cards inside cards.',
  },
  {
    id: 'marketing-hype',
    label: 'Cliché Marketing Hype & Buzzwords',
    category: 'Copy',
    severity: 'warn',
    patterns: [/supercharge/gi, /empower your/gi, /10x developer/gi, /next-generation ai/gi, /all-in-one platform/gi, /game-changing/gi],
    fix: 'State the concrete utility and outcome. Replace "Supercharge your workflow" with what the tool actually delivers.',
  },
  {
    id: 'arbitrary-spacing',
    label: 'Arbitrary Pixel Spacing',
    category: 'Layout',
    severity: 'warn',
    patterns: [/p-\[\d+px\]/g, /gap-\[\d+px\]/g, /m-\[\d+px\]/g, /h-\[\d+px\]/g],
    fix: 'Stick to an intentional 4px/8px modular scale (p-4, p-6, gap-8) to maintain harmonic visual rhythm.',
  },
  {
    id: 'low-contrast-text',
    label: 'Low-Contrast Unreadable Text',
    category: 'Accessibility',
    severity: 'slop',
    patterns: [/text-gray-400.*bg-white/g, /text-slate-400.*bg-white/g, /text-zinc-400.*bg-zinc-50/g, /opacity-40.*text-/g],
    fix: 'Ensure at least 4.5:1 contrast for normal text and 3:1 for large text. Gray-400 on white fails WCAG AA standards.',
  },
];

function countMatches(code, patterns) {
  return patterns.reduce((total, rx) => {
    const matches = [...code.matchAll(rx)];
    return total + matches.length;
  }, 0);
}

function computeScore(code) {
  let slopPoints = 0;
  let warnPoints = 0;
  const results = [];

  for (const rule of SLOP_RULES) {
    const count = countMatches(code, rule.patterns);
    if (count > 0) {
      if (rule.severity === 'slop') slopPoints += count * 2;
      if (rule.severity === 'warn') warnPoints += count;
      results.push({ ...rule, count });
    }
  }

  // Score 0 = pure, 100 = maximum slop
  const rawScore = Math.min(100, slopPoints * 10 + warnPoints * 5);
  return { score: rawScore, findings: results };
}

const SAMPLE_SLOP = `<div class="min-h-screen bg-slate-900 text-white">
  <nav class="flex items-center justify-between px-6 py-4 border-b border-slate-700">
    <div class="font-bold text-xl">MyApp</div>
    <div class="flex gap-2">
      <button class="px-4 py-2 text-slate-400 hover:text-white">Learn More</button>
      <button class="px-4 py-2 bg-indigo-600 rounded-lg">Get Started</button>
      <button class="px-4 py-2 bg-purple-600 rounded-lg">Sign Up Free</button>
    </div>
  </nav>
  <section class="relative overflow-hidden py-32 text-center">
    <div class="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl opacity-50 animate-pulse" />
    <div class="absolute bottom-10 right-1/4 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl opacity-40" />
    <h1 class="text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
      Welcome to MyApp
    </h1>
    <p class="text-slate-400 mt-4">Manage your workflow with ease. View your dashboard and track your progress.</p>
    <button class="mt-8 px-8 py-3 bg-indigo-600 rounded-lg text-white">Get Started</button>
  </section>
  <section class="py-20 px-6">
    <div class="grid grid-cols-3 gap-6">
      <div class="bg-slate-800 rounded-lg border border-slate-700 shadow-md p-6">Feature one</div>
      <div class="bg-slate-800 rounded-lg border border-slate-700 shadow-md p-6">Feature two</div>
      <div class="bg-slate-800 rounded-lg border border-slate-700 shadow-md p-6">Feature three</div>
    </div>
  </section>
</div>`;

export default function SlopAuditor() {
  const [code, setCode] = useState(SAMPLE_SLOP);
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const runAudit = useCallback(() => {
    setIsRunning(true);
    setTimeout(() => {
      const { score, findings } = computeScore(code);
      setResult({ score, findings });
      setIsRunning(false);
    }, 600); // slight delay for dramatic effect
  }, [code]);

  const copyFix = (fix, id) => {
    navigator.clipboard.writeText(fix).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  const getSlopColor = (score) => {
    if (score >= 60) return 'var(--danger)';
    if (score >= 25) return 'var(--brand)';
    return 'var(--good)';
  };

  const getSlopLabel = (score) => {
    if (score >= 60) return 'Maximum Slop Detected';
    if (score >= 25) return 'Moderate Slop Risk';
    return 'Relatively Clean';
  };

  return (
    <div style={{
      borderTop: '1px solid var(--hair)',
      background: 'var(--ink-900)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>

        {/* Section header */}
        <div style={{ marginBottom: '3rem' }}>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Tool 01</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontStyle: 'italic',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            Slop Auditor
          </h2>
          <p style={{ color: 'var(--ink-400)', maxWidth: '48ch', lineHeight: 1.65, fontWeight: 300 }}>
            Paste your HTML, JSX, or CSS. The auditor flags every AI slop pattern
            from the 7 Levels framework with actionable fixes drawn from the transcripts.
          </p>
        </div>

        {/* Two-column layout: editor left, results right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'start',
        }}>
          {/* Editor */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--ink-500)',
              }}>Input Code</span>
              <button
                className="btn-text"
                onClick={() => setCode(SAMPLE_SLOP)}
              >Load slop sample <span className="arrow">→</span></button>
            </div>
            {/* Terminal frame — bespoke editor, not a default browser input */}
            <div className="terminal-frame">
              <div className="terminal-titlebar">
                <span className="terminal-dot" />
                <span className="terminal-dot" />
                <span className="terminal-dot" />
                <span className="terminal-label">slop-detector.jsx</span>
              </div>
              <textarea
                className="code-area"
                value={code}
                onChange={e => setCode(e.target.value)}
                rows={21}
                placeholder="Paste HTML, JSX, or CSS here…"
                spellCheck={false}
                style={{ border: 'none', display: 'block' }}
              />
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button
                className="btn-primary"
                onClick={runAudit}
                disabled={isRunning || !code.trim()}
                style={{ opacity: isRunning ? 0.6 : 1 }}
              >
                {isRunning ? 'Analysing…' : 'Run Audit'}
                {!isRunning && <span className="arrow">→</span>}
              </button>
              <button className="btn-ghost" onClick={() => { setCode(''); setResult(null); }}>
                Clear
              </button>
            </div>
          </div>

          {/* Results */}
          <div>
            {!result && (
              <div style={{
                height: '100%',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px dashed var(--hair)',
                borderRadius: '2px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3rem',
                  color: 'var(--ink-700)',
                  fontStyle: 'italic',
                }}>Ready</span>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--ink-600)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginTop: '0.75rem',
                }}>Audit results appear here</p>
              </div>
            )}

            {result && (
              <div style={{ animation: 'fadeIn 0.4s ease forwards' }}>
                {/* Score gauge */}
                <div style={{
                  padding: '2rem',
                  background: 'var(--ink-800)',
                  border: `1px solid ${getSlopColor(result.score)}`,
                  marginBottom: '1.5rem',
                  borderRadius: '2px',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginBottom: '1rem',
                  }}>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '3.5rem',
                        fontWeight: 900,
                        color: getSlopColor(result.score),
                        lineHeight: 1,
                        letterSpacing: '-0.04em',
                      }}>
                        {result.score}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-500)',
                        marginTop: '0.25rem',
                      }}>Slop Score / 100</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: getSlopColor(result.score),
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                      }}>{getSlopLabel(result.score)}</div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        color: 'var(--ink-600)',
                        marginTop: '0.25rem',
                      }}>{result.findings.length} patterns found</div>
                    </div>
                  </div>
                  {/* Meter */}
                  <div className="slop-meter-track">
                    <div
                      className="slop-meter-fill"
                      style={{
                        width: `${result.score}%`,
                        background: getSlopColor(result.score),
                      }}
                    />
                  </div>
                </div>

                {/* Findings */}
                {result.findings.length === 0 ? (
                  <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    border: '1px solid var(--good)',
                    borderRadius: '2px',
                  }}>
                    <span style={{ color: 'var(--good)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.5rem' }}>Clean code detected.</span>
                    <p style={{ color: 'var(--ink-500)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.5rem' }}>No slop patterns found.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {result.findings.map(finding => (
                      <div key={finding.id} className={`diagnostic ${finding.severity}`}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '0.5rem',
                          gap: '1rem',
                        }}>
                          <div>
                            <div style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.72rem',
                              color: 'var(--ink-200)',
                              letterSpacing: '0.04em',
                              textTransform: 'uppercase',
                            }}>{finding.label}</div>
                            <div style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.6rem',
                              color: 'var(--ink-600)',
                              marginTop: '0.2rem',
                            }}>{finding.category} · {finding.count} occurrence{finding.count > 1 ? 's' : ''}</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                            {finding.severity === 'slop' && <span className="slop-badge">Slop</span>}
                            {finding.severity === 'warn' && <span className="warn-badge">Risk</span>}
                            <button
                              className={`copy-btn ${copiedId === finding.id ? 'copied' : ''}`}
                              onClick={() => copyFix(finding.fix, finding.id)}
                            >
                              {copiedId === finding.id ? 'Copied' : 'Copy Fix'}
                            </button>
                          </div>
                        </div>
                        <p style={{
                          fontSize: '0.78rem',
                          color: 'var(--ink-400)',
                          lineHeight: 1.6,
                          fontWeight: 300,
                        }}>{finding.fix}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
