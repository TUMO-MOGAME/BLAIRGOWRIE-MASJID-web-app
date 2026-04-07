'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/salah-times', label: 'Salah Times' },
  { href: '/events', label: 'Events' },
  { href: '/prospectus', label: 'Prospectus' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} id="main-nav">
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>Blairgowrie Masjid</Link>

          <div className={styles.desktopLinks}>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.actions}>
            <Link href="/donate" className={styles.donateBtn} id="nav-donate-btn">
              Donate
            </Link>
            <button
              className={styles.hamburger}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              <span className="material-symbols-outlined">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOpen : ''}`} onClick={() => setMobileOpen(false)} />
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ''}`} id="mobile-menu">
        <div className={styles.mobileMenuInner}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${pathname === link.href ? styles.active : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/donate" className={styles.mobileDonate} onClick={() => setMobileOpen(false)}>
            Donate
          </Link>
          <Link href="/contact" className={styles.mobileContact} onClick={() => setMobileOpen(false)}>
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
