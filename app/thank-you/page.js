import Link from 'next/link';
import styles from './page.module.css';

export const metadata = { title: 'Thank You', description: 'Thank you for your generous donation to Blairgowrie Masjid.' };

export default function ThankYouPage() {
  return (
    <div className={styles.page}>
      {/* Decorative */}
      <div className={styles.sparkle}>
        <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: 'var(--secondary)', fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
      </div>

      {/* Success Message */}
      <section className={styles.message}>
        <h1 className={styles.title}>Thank You for Your Generous Donation</h1>
        <div className={styles.quoteWrap}>
          <div className={styles.quoteGlow} />
          <p className={styles.quote}>&ldquo;May Allah reward your generosity and help us build a home for the community. Your contribution makes a lasting difference.&rdquo;</p>
        </div>

        {/* Confirmation */}
        <div className={styles.confirmCard}>
          <div className={styles.confirmIcon}>
            <span className="material-symbols-outlined" style={{ fontSize: '2rem', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <h2 className={styles.confirmTitle}>Confirmation Received</h2>
          <p className={styles.confirmDesc}>Your donation has been received and will go directly towards the Blairgowrie Masjid project.</p>
          <div className={styles.confirmDivider} />
          <Link href="/" className={styles.homeBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
            Return to Home Page
          </Link>
        </div>

        {/* Images */}
        <div className={styles.imageGrid}>
          <div className={styles.imageCard}>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEPUSM9zKITkZTFpBv0xlv07yzFHBe7ZBWSf3QY6LAAvpt5H70N5tAtoYScyvN0uQ9hTw6g3wQC_xhqbSEy8dRT9y4rus0z4Mu-KWB681wERCRUtykD1CaWa5RAqEgJwG6gqUlK4osi-wAa4hBjGpGE8U-PR_aXuuRf4rkPUKhM6O6w--Gx8UgUR632IvP1gEJkK-bEkw_BgCe65YVVe_PxCwl8yBhkJSv80ggGmPnWsv971GC0tEvtMijp1kZYpWnpXsmH6jziUJO" alt="Islamic architecture" />
            <div className={styles.imageOverlay} />
          </div>
          <div className={styles.imageCard}>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqe0ydBbrYY4Hr8i03FF5Dgw28R4ahSXKEfCltn3VwrOe7-_HxFl0OOIrQ9_SwWH80XFl77myRXccqwdEKVFfd9hOUXGuWRhuEwRxYWyscebCyuKFJp_xnhGp_R_-lXSsqJ6OlUsfX_GcebkrGoQmSAZMpALE4AHjvv-rq4N4zDRW_KzZqKshT-n70aljIVjhy1WtH3ObcVa-opAuPCxb3H5nyxXBBbZoZCZBPacStAQ2xJUJXLGJZEOxwfqqPUbJvtxODEyNrTGtP" alt="Community gathering" />
            <div className={styles.imageOverlay} />
          </div>
        </div>
      </section>
    </div>
  );
}
