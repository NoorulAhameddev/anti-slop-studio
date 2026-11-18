// Realistic user interaction test for Anti-Slop Studio Auditor
import { readFileSync } from 'fs';

// Read SlopAuditor source to extract rules dynamically
const source = readFileSync(new URL('./src/components/SlopAuditor.jsx', import.meta.url), 'utf8');

// Test input representing typical AI-generated SaaS component (heavy slop)
const aiGeneratedSlopSnippet = `
export default function HeroSection() {
  return (
    <div className="bg-white min-h-screen p-[17px] font-['Inter']">
      <div className="absolute rounded-full blur-3xl opacity-30 bg-purple-500/30 w-96 h-96 animate-pulse bg-purple" />
      <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
        Supercharge your workflow with next-generation AI
      </h1>
      <p className="text-gray-400 bg-white mt-4">
        Everything you need to empower your 10x developer team.
      </p>
      <Card className="rounded-lg shadow-md border-gray-200 mt-8">
        <CardContent>
          <Card className="rounded-lg shadow-sm border border border">
            Nested card soup
          </Card>
        </CardContent>
      </Card>
      <div className="flex gap-2 mt-6">
        <button className="bg-purple-600 text-white px-4 py-2">Get Started</button>
        <button className="text-gray-600">Learn More</button>
      </div>
    </div>
  );
}
`;

// Test input representing clean, hand-crafted, anti-slop design
const cleanHumanCraftedSnippet = `
export default function EditorialFeature() {
  return (
    <section className="bg-stone-50 text-stone-900 px-6 py-16 font-serif">
      <div className="max-w-3xl mx-auto space-y-6">
        <span className="text-xs tracking-widest uppercase text-stone-500">Dispatch 04</span>
        <h1 className="text-4xl font-normal tracking-tight text-stone-950">
          Autonomous systems verified under empirical conditions
        </h1>
        <p className="text-stone-700 leading-relaxed text-lg">
          Clear contrast, semantic structure, and intentional hierarchy replace generic defaults.
        </p>
        <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
          <a href="/archive" className="text-sm underline underline-offset-4 hover:text-stone-600">
            Read the full methodology
          </a>
        </div>
      </div>
    </section>
  );
}
`;

console.log('Testing Anti-Slop Studio Auditor Rules...');

// Verify new rules exist in source code
const requiredRuleIds = [
  'purple-gradient',
  'inter-everywhere',
  'card-overload',
  'glow-blobs',
  'border-overload',
  'generic-cta',
  'top-level-clutter',
  'subheading-padding',
  'shadcn-defaults',
  'overflow-animations',
  'gradient-text',
  'nested-cards',
  'marketing-hype',
  'arbitrary-spacing',
  'low-contrast-text'
];

for (const ruleId of requiredRuleIds) {
  if (!source.includes(`id: '${ruleId}'`)) {
    throw new Error(`Rule missing from SlopAuditor: ${ruleId}`);
  }
}
console.log('All 15 anti-slop rules verified present in SlopAuditor component.');

// Zero-emoji compliance in SlopAuditor.jsx
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
if (emojiRegex.test(source)) {
  throw new Error('Zero-emoji policy violation: emoji found in SlopAuditor.jsx');
}
console.log('Zero-emoji compliance verified in SlopAuditor.jsx.');

// Evaluate realistic user inputs using evaluator logic extracted from component
const slopRulesMatch = source.match(/const SLOP_RULES = (\[[\s\S]*?\]);\n\nfunction countMatches/);
if (!slopRulesMatch) {
  throw new Error('Could not parse SLOP_RULES from SlopAuditor.jsx');
}

// Evaluate rules in a safe context
const SLOP_RULES = eval(slopRulesMatch[1]);

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

  const rawScore = Math.min(100, slopPoints * 10 + warnPoints * 5);
  return { score: rawScore, findings: results };
}

// User test 1: Clean code
const cleanResult = computeScore(cleanHumanCraftedSnippet);
console.log(`Clean design score: ${cleanResult.score}/100 with ${cleanResult.findings.length} findings.`);
if (cleanResult.score !== 0 || cleanResult.findings.length !== 0) {
  throw new Error(`Clean design falsely flagged with slop: ${JSON.stringify(cleanResult.findings)}`);
}

// User test 2: Heavy slop code
const slopResult = computeScore(aiGeneratedSlopSnippet);
console.log(`AI Slop design score: ${slopResult.score}/100 with ${slopResult.findings.length} findings.`);
if (slopResult.score < 80) {
  throw new Error(`Expected severe slop score >= 80, got ${slopResult.score}`);
}

// Verify that the newly added 5 rules were caught
const triggeredRuleIds = new Set(slopResult.findings.map(f => f.id));
const newlyAddedRules = ['gradient-text', 'nested-cards', 'marketing-hype', 'arbitrary-spacing', 'low-contrast-text'];
for (const rule of newlyAddedRules) {
  if (!triggeredRuleIds.has(rule)) {
    throw new Error(`New rule '${rule}' failed to trigger on sample slop snippet!`);
  }
  console.log(`- Successfully caught: ${rule}`);
}

console.log('Real user interaction verification for Anti-Slop Studio PASSED!');
