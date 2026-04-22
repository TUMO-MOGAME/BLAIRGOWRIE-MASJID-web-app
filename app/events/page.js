import styles from './page.module.css';
import Link from 'next/link';
import { supabaseServer } from '../lib/supabaseServer';

export const metadata = { title: 'Events', description: 'Join community events at Blairgowrie Masjid. Spiritual growth, education, and shared experiences.' };

// Revalidate the page every 60 seconds so admin changes reflect quickly without hammering the DB.
export const revalidate = 60;

function todayIsoDate() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatMonth(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short' });
}

function formatDay(dateStr) {
  return new Date(dateStr).getDate();
}

function formatFullDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

async function loadEvents() {
  try {
    const supabase = supabaseServer();
    const today = todayIsoDate();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .gte('event_date', today)
      .order('event_date', { ascending: true });

    if (error) {
      console.error('[events] Supabase error:', error.message);
      return [];
    }
    return data || [];
  } catch (e) {
    // Missing env vars at build time, network issues, etc. — render an
    // empty page rather than failing the whole build.
    console.error('[events] load failed:', e.message);
    return [];
  }
}

export default async function EventsPage() {
  const events = await loadEvents();

  const featured = events.find((e) => e.is_featured) || events[0] || null;
  const smallEvents = events.filter((e) => e.id !== featured?.id).slice(0, 4);
  const calendarEvents = events.slice(0, 5);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroBg}>
          <img src="/pictures/mosque-interior.webp" alt="Events" className={styles.heroImg} />
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

          {!featured ? (
            <EmptyEvents />
          ) : (
            <>
              {/* Featured Event */}
              <div className={styles.featuredEvent}>
                <div className={styles.featuredImg}>
                  <img
                    src={featured.image_url || '/pictures/ramadan-eid-history.webp'}
                    alt={featured.title}
                  />
                </div>
                <div className={styles.featuredContent}>
                  <div className={styles.eventMeta}>
                    <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>calendar_today</span>
                    <span>{formatFullDate(featured.event_date)}{featured.event_time ? ` · ${featured.event_time}` : ''}</span>
                  </div>
                  <h3 className={styles.featuredTitle}>{featured.title}</h3>
                  {featured.description && <p className={styles.featuredDesc}>{featured.description}</p>}
                  <div className={styles.featuredActions}>
                    {featured.location && (
                      <span className={styles.eventLocation}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>location_on</span>
                        {featured.location.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Small Event Cards */}
              {smallEvents.length > 0 && (
                <div className={styles.smallEvents}>
                  {smallEvents.map((ev) => (
                    <div key={ev.id} className={styles.smallCard}>
                      <div className={styles.smallCardHeader}>
                        <div className={styles.smallCardIcon}>
                          <span className="material-symbols-outlined">event</span>
                        </div>
                        <span className={styles.badge}>
                          {new Date(ev.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <h3 className={styles.smallCardTitle}>{ev.title}</h3>
                      {ev.description && <p className={styles.smallCardDesc}>{ev.description}</p>}
                      {ev.event_time && (
                        <span className={styles.smallCardLink}>
                          <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>schedule</span>
                          {ev.event_time}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* Calendar */}
          <div className={styles.calendarCard}>
            <h3 className={styles.calendarTitle}>
              <span className="material-symbols-outlined" style={{ marginRight: '0.5rem' }}>event</span> Quick Calendar
            </h3>
            <div className={styles.calendarList}>
              {calendarEvents.length === 0 ? (
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
                  No upcoming events posted yet.
                </p>
              ) : (
                calendarEvents.map((e, i) => (
                  <div key={e.id} className={styles.calendarItem}>
                    <div className={`${styles.calendarDate} ${i === 0 ? styles.calendarDateHighlight : ''}`}>
                      <span className={styles.calendarMonth}>{formatMonth(e.event_date)}</span>
                      <span className={styles.calendarDay}>{formatDay(e.event_date)}</span>
                    </div>
                    <div>
                      <h4 className={styles.calendarEventTitle}>{e.title}</h4>
                      <p className={styles.calendarEventTime}>{e.event_time || new Date(e.event_date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Host CTA */}
          <div className={styles.hostCard}>
            <div className={styles.hostGhost}>
              <span className="material-symbols-outlined" style={{ fontSize: '6rem', opacity: 0.1 }}>volunteer_activism</span>
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

function EmptyEvents() {
  return (
    <div className={styles.featuredEvent} style={{ padding: '2rem' }}>
      <div className={styles.featuredContent}>
        <div className={styles.eventMeta}>
          <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>info</span>
          <span>Check back soon</span>
        </div>
        <h3 className={styles.featuredTitle}>No upcoming events posted yet</h3>
        <p className={styles.featuredDesc}>
          The committee will share new gatherings here as they&apos;re announced.
          For now, join us for daily prayers and our regular weekly programs.
        </p>
      </div>
    </div>
  );
}
