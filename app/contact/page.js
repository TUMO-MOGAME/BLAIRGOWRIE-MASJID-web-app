'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Contact Us</h1>
        <p className={styles.heroSub}>Connecting our hearts and community. We are here to answer your questions and welcome you to our spiritual home.</p>
      </section>

      {/* Main Grid */}
      <section className={styles.main}>
        <div className={styles.mainGrid}>
          {/* Left: Location + Contact Details */}
          <div className={styles.leftCol}>
            {/* Map Card */}
            <div className={styles.mapCard}>
              <div className={styles.mapCardInner}>
                <h2 className={styles.mapTitle}>Our Future Home</h2>
                <p className={styles.mapDesc}>Blairgowrie Masjid intends to be located at <strong>70 Conrad Drive, Blairgowrie, Randburg.</strong></p>
                <div className={styles.mapWrapper}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd9F6N2YlLBzgtdkD2A9Ky3x2tiI0oB_F0rnhvmWUZCVGoC7a5TD2v2hGP1VHZq4Rck2USEVRC5bqg-3F1UbasAVgfC-iAZZh6DOG0_xpxYbNkOahs_Bq3Z_-6TyB-EhtiuCE2QXL3SWJAEY1xBthk1Gq95sL7KSnj-rAnoMr8JZc9_yvufRGRTmAAhVxrm_tNM9V3DRJMF3qzcUe3YOZtrKRhfGbCI-SDqOlfVMGEm8RmZ9uH2F42tGo7erImKmSbW2tW2yZtsO5O"
                    alt="Map view"
                    className={styles.mapImg}
                  />
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=70+Conrad+Drive+Blairgowrie+Randburg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mapPin}
                  >
                    <span className="material-symbols-outlined">location_on</span>
                    <span>View on Google Maps</span>
                  </a>
                </div>
              </div>
              <div className={styles.mapGhost}>
                <span className="material-symbols-outlined" style={{ fontSize: '8rem', opacity: 0.05 }}>mosque</span>
              </div>
            </div>

            {/* Contact Cards */}
            <div className={styles.contactCards}>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h4 className={styles.contactLabel}>Email Inquiry</h4>
                  <p className={styles.contactValue}>blairgowriemasjid@gmail.com</p>
                </div>
              </div>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <div>
                  <h4 className={styles.contactLabel}>Phone &amp; WhatsApp</h4>
                  <div className={styles.phoneList}>
                    <div>
                      <p className={styles.phoneName}>Hafidh Yaseen Waja</p>
                      <p className={styles.phoneNumber}>072 441 1651</p>
                    </div>
                    <hr className={styles.phoneDivider} />
                    <div>
                      <p className={styles.phoneName}>Brother Mohammed M Khan</p>
                      <p className={styles.phoneNumber}>079 879 7246</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className={styles.rightCol}>
            <div className={styles.formCard}>
              <div className={styles.formGhost}>
                <span className="material-symbols-outlined" style={{ fontSize: '10rem', opacity: 0.1 }}>edit_note</span>
              </div>
              <h2 className={styles.formTitle}>Send a Message</h2>
              <p className={styles.formSub}>Have a specific question? Fill out the form below and we&apos;ll get back to you shortly.</p>

              {submitted ? (
                <div className={styles.successMsg}>
                  <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--secondary-fixed)' }}>check_circle</span>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We&apos;ll get back to you shortly, In Shaa Allah.</p>
                </div>
              ) : (
                <form
                  action="https://formsubmit.co/blairgowriemasjid@gmail.com"
                  method="POST"
                  className={styles.form}
                  onSubmit={() => setSubmitted(true)}
                >
                  {/* FormSubmit config */}
                  <input type="hidden" name="_subject" value="New Contact Form Submission - Blairgowrie Masjid Website" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value={typeof window !== 'undefined' ? `${window.location.origin}/thank-you` : '/thank-you'} />
                  <input type="text" name="_honey" style={{ display: 'none' }} />

                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input type="text" name="name" placeholder="Enter your name" required id="contact-name" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input type="email" name="email" placeholder="your@email.com" required id="contact-email" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Message</label>
                    <textarea name="message" placeholder="How can we help you?" rows="5" required id="contact-message" />
                  </div>
                  <button type="submit" className={styles.submitBtn} id="contact-submit">
                    <span>Send Message</span>
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
