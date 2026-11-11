import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import SlopAuditor from './components/SlopAuditor';
import ArtBibleGenerator from './components/ArtBibleGenerator';
import Playbook from './components/Playbook';
import Navbar from './components/Navbar';

// Scroll progress bar — editorial detail that proves you care
function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="progress-bar" style={{ width: `${width}%` }} />;
}

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  };

  // Intersection observer to highlight active nav item
  useEffect(() => {
    const sections = ['hero', 'auditor', 'artbible', 'playbook'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: 'var(--ink-900)', minHeight: '100vh' }}>
      <ScrollProgress />
      <Navbar activeSection={activeSection} scrollTo={scrollTo} />

      {/* Each section fills the page — no tab switching dashboard */}
      <section id="hero">
        <HeroSection scrollTo={scrollTo} />
      </section>

      <section id="auditor">
        <SlopAuditor />
      </section>

      <section id="artbible">
        <ArtBibleGenerator />
      </section>

      <section id="playbook">
        <Playbook />
      </section>

      {/* Footer — minimal, intentional, not boilerplate */}
      <footer style={{
        borderTop: '1px solid var(--hair)',
        padding: '3rem 0',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: 'var(--ink-400)',
                fontStyle: 'italic',
              }}>Anti-Slop Studio</span>
              <span className="brand-dot" />
            </div>
            <p className="mono text-dim" style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Synthesised from 8 masterclasses · Claude Code + AntiGravity · 2026
            </p>
            <p style={{ color: 'var(--ink-600)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', marginTop: '0.5rem' }}>
              The framework that makes your AI website undeniably yours.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
