import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {/* Brand */}
        <div>
          <div className={styles.logo}>BLAIRGOWRIE MASJID</div>
          <p className={styles.desc}>A sanctuary for spiritual growth, education, and community service in the heart of Blairgowrie, Randburg.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={styles.colTitle}>NAVIGATE</h3>
          <div className={styles.links}>
            <Link href="/" className={styles.link}>Home</Link>
            <Link href="/about" className={styles.link}>About</Link>
            <Link href="/salah-times" className={styles.link}>Salah Times</Link>
            <Link href="/events" className={styles.link}>Events</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
            <Link href="/prospectus" className={styles.linkGold}>Prospectus →</Link>
            <Link href="/donate" className={styles.linkGold}>Donate →</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className={styles.colTitle}>CONTACT</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className="material-symbols-outlined" style={{fontSize:'1rem'}}>location_on</span>
              70 Conrad Drive, Blairgowrie
            </li>
            <li className={styles.listItem}>
              <span className="material-symbols-outlined" style={{fontSize:'1rem'}}>mail</span>
              <a href="mailto:blairgowriemasjid@gmail.com">blairgowriemasjid@gmail.com</a>
            </li>
            <li className={styles.listItem}>
              <span className="material-symbols-outlined" style={{fontSize:'1rem'}}>phone</span>
              072 441 1651
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>© {new Date().getFullYear()} Blairgowrie Muslim Association.
          <Link href="/privacy-policy" style={{marginLeft:'1rem', color:'var(--muted)'}}>Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
}
