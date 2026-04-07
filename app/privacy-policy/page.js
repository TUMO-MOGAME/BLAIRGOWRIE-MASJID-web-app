import styles from './page.module.css';

export const metadata = { title: 'Privacy Policy', description: 'Privacy Policy for Blairgowrie Muslim Association — how we collect, use, and protect your personal information.' };

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <div className={styles.meta}>
            <span>Effective Date: 16 December 2023</span>
            <span className={styles.metaDivider}>|</span>
            <span>Blairgowrie Muslim Association</span>
          </div>
        </header>

        {/* Decorative Image */}
        <div className={styles.decorImg}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHdiokX-AzrvNFVqBHW031w4FRSUBtrACzrfze6Gd8IL0N1xkGnBiDXfBgR5TrKIU891HBzM6ztkhJMKbQPyCFPZEcUWr7Dd03quASxQajvxWSarfRu27X20bHYELBs-i1DQGhx4i62lgqph_51uLr6hw2I2_S1LfXN9bIiguAAL_TIQQLVAuqdcBnUVDcIQb-jVTunjAQpoG482PNCYhqcH0QSxPlCB4GYFIYtSQMs460Ft87EDV-OlxsQeCQAjlFX0wfxVs9SapH" alt="Masjid patterns" />
          <div className={styles.decorOverlay} />
        </div>

        {/* Content */}
        <div className={styles.content}>
          <p className={styles.intro}>Blairgowrie Muslim Association is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, and protect the personal information you provide to us.</p>

          {/* Section 1 */}
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionNum}>01</span>
              <div>
                <h2 className={styles.sectionTitle}>Information We Collect</h2>
                <p className={styles.sectionText}>We may collect personal information such as your name, email address, phone number, and mailing address when you interact with us, such as when you make a donation, sign up for our newsletter, or participate in our events.</p>
                <ul className={styles.bulletList}>
                  <li><span className={styles.bullet} />Contact Details (Name, Email, Phone)</li>
                  <li><span className={styles.bullet} />Financial Information for Donations</li>
                  <li><span className={styles.bullet} />Communication Preferences</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className={styles.highlightSection}>
            <h2 className={styles.sectionTitle}>How We Collect Information</h2>
            <p className={styles.sectionText}>We collect information directly from you when you provide it to us through our website, in person, or via other communication channels. We may also collect information from third-party sources, such as payment processors, to facilitate your interactions with us.</p>
          </section>

          {/* Section 3 */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Use of Information</h2>
            <p className={styles.sectionText}>We use the personal information we collect for the following purposes:</p>
            <div className={styles.purposeGrid}>
              {[
                { icon: 'volunteer_activism', title: 'Process Donations', desc: 'To securely process and acknowledge your contributions to the Masjid.' },
                { icon: 'mail', title: 'Communications', desc: 'To send newsletters, updates, and information about upcoming events.' },
                { icon: 'support_agent', title: 'Support', desc: 'To respond to your inquiries and provide requested services.' },
                { icon: 'analytics', title: 'Internal Operations', desc: 'To improve our programs, services, and community outreach.' },
              ].map((p, i) => (
                <div key={i} className={styles.purposeCard}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--secondary)', marginBottom: '0.75rem', display: 'block' }}>{p.icon}</span>
                  <h3 className={styles.purposeTitle}>{p.title}</h3>
                  <p className={styles.purposeDesc}>{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sharing & Rights */}
          <section className={styles.twoCol}>
            <div>
              <h2 className={styles.sectionTitle}>Sharing of Information</h2>
              <p className={styles.sectionText}>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website or conducting our activities, provided they agree to keep your information confidential.</p>
            </div>
            <div>
              <h2 className={styles.sectionTitle}>Your Rights</h2>
              <p className={styles.sectionText}>You have the right to access, correct, or delete your personal information. You may also opt out of receiving communications from us at any time by contacting us or using the unsubscribe link provided in our emails.</p>
            </div>
          </section>

          {/* Security */}
          <section className={styles.securitySection}>
            <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: 'var(--secondary-fixed)' }}>gpp_maybe</span>
            <div>
              <h2 className={styles.securityTitle}>Security</h2>
              <p className={styles.securityText}>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.</p>
            </div>
          </section>

          {/* Updates */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Updates to Privacy Policy</h2>
            <p className={styles.sectionText}>We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any significant changes by posting the updated policy on our website.</p>
          </section>

          {/* Contact */}
          <section className={styles.contactSection}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>
            <p className={styles.sectionText}>If you have any questions or concerns about this Privacy Policy or our practices, please contact us at:</p>
            <div className={styles.contactRow}>
              <div className={styles.contactItem}>
                <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>alternate_email</span>
                <span>blairgowriemasjid@gmail.com</span>
              </div>
              <div className={styles.contactItem}>
                <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>location_on</span>
                <span>70 Conrad Drive, Blairgowrie</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
