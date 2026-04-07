import styles from './page.module.css';
import Link from 'next/link';

export const metadata = { title: 'Events', description: 'Join community events at Blairgowrie Masjid. Spiritual growth, education, and shared experiences.' };

export default function EventsPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroBg}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjOGmkpMmSVsYKcZhLwuAtFeRx5T3e18wh-iOpndyNjtIn2k4z67lcvzpLrim5_XMGoO_M1HQEvQs59OX_SWk9-m7Ugo8HDNRlMQpRcI9ns_1gyKJTWdIyhk43gbmqbkKIwT9cMTRVnRxvDPNUXxAH4PPO7gmW7hclTh7cNG9zhgQhrAIlXwpAuOvBJOlD2lAdCxceE5dVxwXpNu6psqTAITqjrlhf0PvXhqfXQvxS05UwFpyJibuhf_TiscJfmctgsPUYF-oV8tpW" alt="" className={styles.heroImg} />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Community Events</h1>
          <p className={styles.heroSub}>Join us for spiritual growth, community connection, and shared experiences in the heart of Blairgowrie.</p>
        </div>
      </header>

      <div className={styles.mainGrid}>
        {/* Events Column */}
        <div className={styles.eventsCol}>
          <div className={styles.eventsHeader}>
            <span className={styles.eventsLabel}>The Calendar</span>
            <h2 className={styles.eventsTitle}>Upcoming Gatherings</h2>
          </div>

          {/* Featured Event */}
          <div className={styles.featuredEvent}>
            <div className={styles.featuredImg}>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnEtM1ZmUJoVeSKolAOjX3Dwxhn3QR27KGWiVh9eL-bhoAMFeMWAaJ3PHqhhd0mFt4DODEQxpucAbb-O_GT_vEd-V83Cv5ggQ8By-mwGBN8vptkl29u2kd8PrawK5MiMmQnLrj7eiv51FH8QzailMDWgrDz7qZsI2H73GPZi9hJlDVojzqH2fLDBdmpRsMatS7KqzjJv9mzlxmXx9FoIOb-xtfnPnEwQsw-6VueqPqeE8kbRXCgSjEduvjAVtNBI37jYyB1LpHHxog" alt="Ramadan event" />
            </div>
            <div className={styles.featuredContent}>
              <div className={styles.eventMeta}>
                <span className="material-symbols-outlined" style={{fontSize:'0.875rem'}}>calendar_today</span>
                <span>March 2024</span>
              </div>
              <h3 className={styles.featuredTitle}>Ramadan 2024: Spiritual Excellence</h3>
              <p className={styles.featuredDesc}>Join our community for Taraweeh prayers, weekend Iftars, and nightly lectures throughout the holy month.</p>
              <div className={styles.featuredActions}>
                <button className="btn-filled">View Schedule</button>
                <span className={styles.eventLocation}>
                  <span className="material-symbols-outlined" style={{fontSize:'1rem'}}>location_on</span> Main Prayer Hall
                </span>
              </div>
            </div>
          </div>

          {/* Small Event Cards */}
          <div className={styles.smallEvents}>
            <div className={styles.smallCard}>
              <div className={styles.smallCardHeader}>
                <div className={styles.smallCardIcon}><span className="material-symbols-outlined">groups</span></div>
                <span className={styles.badge}>Weekly</span>
              </div>
              <h3 className={styles.smallCardTitle}>Weekly Halaqa</h3>
              <p className={styles.smallCardDesc}>A deep dive into Prophetic biographies every Thursday after Maghrib.</p>
              <a href="#" className={styles.smallCardLink}>Learn More <span className="material-symbols-outlined" style={{fontSize:'0.875rem'}}>arrow_forward</span></a>
            </div>
            <div className={styles.smallCard}>
              <div className={styles.smallCardHeader}>
                <div className={styles.smallCardIcon}><span className="material-symbols-outlined">celebration</span></div>
                <span className={styles.badgeGrey}>Annual</span>
              </div>
              <h3 className={styles.smallCardTitle}>Eid-ul-Fitr Prayers</h3>
              <p className={styles.smallCardDesc}>Unified community prayers followed by a festive family breakfast in the park.</p>
              <a href="#" className={styles.smallCardLink}>Save the Date <span className="material-symbols-outlined" style={{fontSize:'0.875rem'}}>arrow_forward</span></a>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* Calendar */}
          <div className={styles.calendarCard}>
            <h3 className={styles.calendarTitle}>
              <span className="material-symbols-outlined" style={{marginRight:'0.5rem'}}>event</span> Quick Calendar
            </h3>
            <div className={styles.calendarList}>
              {[
                { month: 'Feb', day: '15', title: 'Community Cleanup', time: '09:00 AM — 12:00 PM', highlight: false },
                { month: 'Feb', day: '22', title: "Sisters' Tea Evening", time: '05:30 PM — 07:30 PM', highlight: true },
                { month: 'Mar', day: '11', title: 'Ramadan Kickoff', time: 'After Isha Prayers', highlight: false },
              ].map((e, i) => (
                <div key={i} className={styles.calendarItem}>
                  <div className={`${styles.calendarDate} ${e.highlight ? styles.calendarDateHighlight : ''}`}>
                    <span className={styles.calendarMonth}>{e.month}</span>
                    <span className={styles.calendarDay}>{e.day}</span>
                  </div>
                  <div>
                    <h4 className={styles.calendarEventTitle}>{e.title}</h4>
                    <p className={styles.calendarEventTime}>{e.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.downloadBtn}>Download Full Calendar (PDF)</button>
          </div>

          {/* Host CTA */}
          <div className={styles.hostCard}>
            <div className={styles.hostGhost}>
              <span className="material-symbols-outlined" style={{fontSize:'6rem',opacity:0.1}}>volunteer_activism</span>
            </div>
            <h3 className={styles.hostTitle}>Want to Host an Event?</h3>
            <p className={styles.hostDesc}>The Masjid is a space for everyone. If you have an idea for a community program or workshop, we&apos;d love to hear it.</p>
            <Link href="/contact" className={styles.hostBtn}>Propose an Event</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
