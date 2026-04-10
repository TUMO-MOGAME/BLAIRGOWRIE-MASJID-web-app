'use client';
import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const t = stored || 'dark';
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
    <button onClick={toggle} id="theme_toggle" aria-label="Toggle light/dark mode" className={styles.themeToggle}>
      {/* Sun */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`${styles.sun} ${theme === 'dark' ? styles.visible : ''}`}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      {/* Moon */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`${styles.moon} ${theme === 'light' ? styles.visible : ''}`}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
      </svg>
    </button>
  );
}
