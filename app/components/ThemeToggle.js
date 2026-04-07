'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const t = stored || sys;
    setTheme(t);
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.style.colorScheme = t;
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    document.documentElement.style.colorScheme = next;
    localStorage.setItem('theme', next);
  };

  return (
    <button onClick={toggle} id="theme_toggle" aria-label="Toggle light/dark mode" style={{
      position: 'fixed', bottom: 'var(--ui-inset)', left: 'var(--nav-x)',
      transform: 'translateX(-50%)', zIndex: 10, width: '2rem', height: '2rem',
      border: 'none', background: 'color-mix(in srgb, var(--muted) 35%, transparent)',
      borderRadius: '50%', cursor: 'pointer', display: 'flex',
      alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s',
    }}>
      {/* Sun */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{
        width: '0.875rem', height: '0.875rem', position: 'absolute', color: 'var(--accent)',
        transition: 'opacity 0.3s, transform 0.3s',
        opacity: theme === 'dark' ? 1 : 0,
        transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(-90deg)',
      }}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      {/* Moon */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{
        width: '0.875rem', height: '0.875rem', position: 'absolute', color: 'var(--accent)',
        transition: 'opacity 0.3s, transform 0.3s',
        opacity: theme === 'light' ? 1 : 0,
        transform: theme === 'light' ? 'rotate(0deg)' : 'rotate(90deg)',
      }}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
      </svg>
    </button>
  );
}
