import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroGradient} />
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnfefumQ3Ju1BweQZkOn715vW2EpvNv9EvGBsN-BqNGRBsHiqVNSZT32FwzXfHwc2t1T_8QFbWfj9npZmJ4EKR5iX2voIJRpwvcQaDm5Xvgt3t8cVtgY0Q3tjTF7MvT7xMnNE44OWJj17fhIao4bo8DpON03mv3HmLf6DqNnYmvRrNrndU7yHbgoM3gNpCbmmN9VvPNK9GPIoPxSZJuN_KU3l50rGj6gM0aB8ml2hdlQ1OtLkYtfiZR5HSpbkmAzTKEe3CKy9yF0QU"
            alt="Masjid Architecture"
            className={styles.heroImg}
          />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Welcome to Blairgowrie Masjid
            </h1>
            <p className={styles.heroSubtitle}>
              Serving the community with spiritual growth and educational excellence
            </p>
            <div className={styles.heroBtns}>
              <Link href="/salah-times" className="btn-filled">View Salah Times</Link>
              <Link href="/about" className="btn">Our Mission</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Times Strip */}
      <section className={styles.prayerStrip}>
        <div className={styles.prayerStripInner}>
          <div className={styles.prayerCurrent}>
            <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: '1.75rem' }}>schedule</span>
            <div>
              <p className={styles.prayerLabel}>Current Prayer</p>
              <h3 className={styles.prayerName}>Dhuhr</h3>
            </div>
          </div>
          <div className={styles.prayerTimes}>
            {[
              { name: 'Fajr', time: '04:15' },
              { name: 'Sunrise', time: '05:42' },
              { name: 'Asr', time: '15:45' },
              { name: 'Maghrib', time: '18:22' },
              { name: 'Isha', time: '19:45' },
            ].map(p => (
              <div key={p.name} className={styles.prayerTimeItem}>
                <p className={styles.prayerTimeLabel}>{p.name}</p>
                <p className={styles.prayerTimeValue}>{p.time}</p>
              </div>
            ))}
          </div>
          <Link href="/salah-times" className={styles.prayerFullBtn}>Full Schedule</Link>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.mission}>
        <div className={styles.missionGrid}>
          <div className={styles.missionImgWrap}>
            <div className={styles.missionGlow} />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM2KuOxXVsDq-vdscdD8AxUZC06xHtH9LQtiaOGuqLsf9VSYsFm4FHgaRpknLfVCFyEkdJ34hdbIxuxmQFvMMPjBOmW7t_9beE7bvGFvbyUA5svBNSiXd-XDaL-C-DIFweEIeGCbMXoP3uNjbwagBYRggyggbuy4cUbdYf13c6G3pOXgdqGYyrkur71r72xTYMJKlzCfL5IaAu73lYLTdPOc0_T2PxQipUjfaPCDwJYIPZ1-6v1y0HeTNeGdrwSSWo9cnAmJmXKzIN"
              alt="Community gathering"
              className={styles.missionImg}
            />
          </div>
          <div className={styles.missionText}>
            <h2 className={styles.sectionTitle}>A Sanctuary for Spiritual Growth &amp; Collective Excellence</h2>
            <p className={styles.bodyText}>
              The Blairgowrie Masjid is dedicated to establishing a vibrant spiritual home that nurtures the soul and empowers the mind. We strive to be more than just a place of prayer; we are a center for learning, community service, and bridge-building.
            </p>
            <p className={styles.bodyText}>
              Our mission is to foster an environment where every individual, regardless of their stage in life, can find peace, guidance, and a sense of belonging through the timeless values of Islam.
            </p>
            <div className={styles.pillars}>
              <div>
                <h4 className={styles.pillarTitle}>Education</h4>
                <p className={styles.pillarText}>Formal and informal programs for all ages to deepen religious understanding.</p>
              </div>
              <div>
                <h4 className={styles.pillarTitle}>Community</h4>
                <p className={styles.pillarText}>Welfare initiatives and social support systems for our local neighbors.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className={styles.news}>
        <div className={styles.newsContainer}>
          <div className={styles.newsHeader}>
            <div>
              <h2 className={styles.sectionTitle}>News &amp; Community Updates</h2>
              <p style={{color:'var(--muted)',fontSize:'0.78rem'}}>Stay connected with the latest happenings at our Masjid.</p>
            </div>
            <a href="#" className={styles.viewAll}>
              View All News <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
          <div className={styles.newsGrid}>
            {[
              { cat: 'Event', title: 'Ramadan Preparation Workshop', desc: 'Join us this Saturday for a comprehensive guide on preparing spiritually and physically for the holy month.', date: 'Oct 24, 2024' },
              { cat: 'Education', title: 'Evening Madrasah Enrollment', desc: 'Registration is now open for the new term. Limited spots available for the primary and intermediate levels.', date: 'Oct 20, 2024' },
              { cat: 'Announcement', title: 'Fundraising Drive: New Library', desc: 'Help us build a state-of-the-art community library. Contribution goals and progress updates inside.', date: 'Oct 15, 2024' },
            ].map((item, i) => (
              <div key={i} className={styles.newsCard}>
                <div className={styles.newsCardCat}>{item.cat}</div>
                <h3 className={styles.newsCardTitle}>{item.title}</h3>
                <p className={styles.newsCardDesc}>{item.desc}</p>
                <div className={styles.newsCardDate}>
                  <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>calendar_today</span>
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className={styles.location}>
        <div className={styles.locationGrid}>
          <div className={styles.locationInfo}>
            <h2 className={styles.locationTitle}>Sayyidina Ubay bin Ka'b (RA) - Musalla & Madressa</h2>
            <p className={styles.locationDesc}>
              Our Musalla & Madressa is located at 70 Conrad Dr, Blairgowrie, Randburg, 2195. A central beacon for the community, designed for accessibility and peace.
            </p>
            <div className={styles.locationDetails}>
              <div className={styles.locationItem}>
                <div className={styles.locationIcon}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--accent)' }}>location_on</span>
                </div>
                <span>70 Conrad Dr, Blairgowrie, Randburg, 2195</span>
              </div>
              <div className={styles.locationItem}>
                <div className={styles.locationIcon}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--accent)' }}>mail</span>
                </div>
                <span>blairgowriemasjid@gmail.com</span>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Sayyidina+Ubay+bin+Ka'b+(RA)+-+Musalla+%26+Madressa,+70+Conrad+Dr,+Blairgowrie,+Randburg,+2195,+South+Africa"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsBtn}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>directions</span>
              Get Directions
            </a>
          </div>
          <div className={styles.locationMap}>
            <iframe
              src="https://maps.google.com/maps?q=Sayyidina+Ubay+bin+Ka'b+(RA)+-+Musalla+%26+Madressa,+70+Conrad+Dr,+Blairgowrie,+Randburg,+2195,+South+Africa&z=16&output=embed&hl=en"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sayyidina Ubay bin Ka'b (RA) - Musalla & Madressa Location"
            />
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Sayyidina+Ubay+bin+Ka'b+(RA)+-+Musalla+%26+Madressa,+70+Conrad+Dr,+Blairgowrie,+Randburg,+2195,+South+Africa"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapOverlay}
              aria-label="Click to get directions in Google Maps"
            >
              <div className={styles.mapOverlayBadge}>
                <span className="material-symbols-outlined">near_me</span>
                Open in Google Maps
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
