import React from 'react';

const NAV_ITEMS = [
  { id: 'hero',     label: 'Manifesto' },
  { id: 'auditor',  label: 'Slop Auditor' },
  { id: 'artbible', label: 'Art Bible' },
  { id: 'playbook', label: 'Playbook' },
];

export default function Navbar({ activeSection, scrollTo }) {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'rgba(10,9,6,0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--hair)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo — editorial wordmark, not a pill badge */}
        <button
          onClick={() => scrollTo('hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.95rem',
            color: 'var(--ink-200)',
            letterSpacing: '-0.01em',
          }}>
            Anti-Slop<span style={{ color: 'var(--brand)', fontStyle: 'italic' }}> Studio</span>
          </span>
        </button>

        {/* Nav items — horizontal, mono, understated */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
