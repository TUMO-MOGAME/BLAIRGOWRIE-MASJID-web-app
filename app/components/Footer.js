import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="site-footer">
      <div className={styles.grid}>
        <div className={styles.brand}>
          <div className={styles.logo}>Blairgowrie Masjid</div>
          <p className={styles.desc}>
            A project dedicated to the spiritual upliftment and social development of the Blairgowrie community.
          </p>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contact Information</h4>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: '#f59e0b' }}>location_on</span>
              70 Conrad Drive, Blairgowrie, Randburg
            </li>
            <li className={styles.listItem}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: '#f59e0b' }}>mail</span>
              <a href="mailto:blairgowriemasjid@gmail.com">blairgowriemasjid@gmail.com</a>
            </li>
            <li className={styles.listItem}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: '#f59e0b' }}>call</span>
              <a href="tel:0724411651">072 441 1651</a>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <div className={styles.links}>
            <Link href="/privacy-policy" className={styles.link}>Privacy Policy</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
            <Link href="/donate" className={styles.linkGold}>Donate Now</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Blairgowrie Masjid. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
