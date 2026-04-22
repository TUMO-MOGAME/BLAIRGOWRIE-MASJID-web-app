'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { supabase } from '../lib/supabase';

// How often the featured card rotates between close-together events
const ROTATION_MS = 15000;
// Events within this window rotate as featured; events further apart stay as "next up"
const CLOSE_WINDOW_DAYS = 7;

function toLocalDateIso(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function daysBetween(a, b) {
  const ms = Math.abs(new Date(a).getTime() - new Date(b).getTime());
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function formatMonth(dateStr) { return new Date(dateStr).toLocaleDateString('en-US', { month: 'short' }); }
function formatDay(dateStr)   { return new Date(dateStr).getDate(); }
function formatLongDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
}

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredIdx, setFeaturedIdx] = useState(0);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const todayStr = toLocalDateIso(new Date());
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .gte('event_date', todayStr)
        .order('event_date', { ascending: true })
        .order('created_at', { ascending: true });
      if (!mounted) return;
      if (error) console.error('[events] load failed:', error.message);
      setEvents(data || []);
      setLoading(false);
    }
    load();
    return () => { mounted = false; };
  }, []);

  // Events eligible for the rotating "featured" spot: the nearest one plus
  // anything else within 7 days of it. Further-out events stay in the calendar.
  const rotationSet = useMemo(() => {
    if (events.length === 0) return [];
    const anchor = events[0].event_date;
    return events.filter(e => daysBetween(e.event_date, anchor) <= CLOSE_WINDOW_DAYS);
  }, [events]);

  // Rotate the featured index only if there are 2+ close-together events.
  useEffect(() => {
    if (rotationSet.length < 2) {
      setFeaturedIdx(0);
      return;
    }
    const id = setInterval(() => {
      setFeaturedIdx(i => (i + 1) % rotationSet.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, [rotationSet.length]);

  const featured = rotationSet[featuredIdx] || null;

  // Group all upcoming events by date for the "All upcoming" section below.
  const dayGroups = useMemo(() => {
    const groups = [];
    const byDate = new Map();
    events.forEach(e => {
      if (!byDate.has(e.event_date)) {
        const group = { date: e.event_date, items: [] };
        byDate.set(e.event_date, group);
        groups.push(group);
      }
      byDate.get(e.event_date).items.push(e);
    });
    return groups;
  }, [events]);

  // Sidebar calendar — up to 5 nearest events
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
        <div className={styles.eventsCol}>
          <div className={styles.eventsHeader}>
            <span className={styles.eventsLabel}>The Calendar</span>
            <h2 className={styles.eventsTitle}>Upcoming Gatherings</h2>
          </div>

          {loading ? (
            <p style={{ color: 'var(--muted)' }}>Loading events…</p>
          ) : !featured ? (
            <EmptyEvents />
          ) : (
            <>
              {/* Featured event — rotates if multiple events fall within 7 days */}
              <div className={styles.featuredEvent} key={featured.id}>
                <div className={styles.featuredImg}>
                  <img
                    src={featured.image_url || '/pictures/ramadan-eid-history.webp'}
                    alt={featured.title}
                  />
                </div>
                <div className={styles.featuredContent}>
                  <div className={styles.eventMeta}>
                    <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>calendar_today</span>
                    <span>{formatLongDate(featured.event_date)}{featured.event_time ? ` · ${featured.event_time}` : ''}</span>
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

              {/* Rotation indicator — only shown when we're rotating */}
              {rotationSet.length > 1 && (
                <div style={{
                  display: 'flex', gap: '0.5rem', justifyContent: 'center',
                  margin: '-0.5rem 0 1.5rem', fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.1em',
                }}>
                  <span>{featuredIdx + 1} / {rotationSet.length} · this week</span>
                  <span style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                    {rotationSet.map((_, i) => (
                      <span
                        key={i}
                        style={{
                          width: i === featuredIdx ? '1.1rem' : '0.45rem',
                          height: '0.45rem',
                          background: i === featuredIdx ? 'var(--accent)' : 'var(--muted)',
                          borderRadius: '999px',
                          opacity: i === featuredIdx ? 1 : 0.4,
                          transition: 'all 0.3s',
                        }}
                      />
                    ))}
                  </span>
                </div>
              )}

              {/* All upcoming events, grouped by day */}
              {dayGroups.length > 0 && (
                <div>
                  {dayGroups.map((group) => (
                    <div key={group.date} style={{ marginBottom: '2rem' }}>
                      <h4 style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--muted)',
                        marginBottom: '1rem',
                        borderBottom: '1px solid var(--card-border)',
                        paddingBottom: '0.5rem',
                      }}>
                        {formatLongDate(group.date)}
                        {group.items.length > 1 && (
                          <span style={{ color: 'var(--accent)', marginLeft: '0.75rem' }}>
                            · {group.items.length} events
                          </span>
                        )}
                      </h4>
                      <div className={styles.smallEvents}>
                        {group.items.map((ev) => (
                          <div key={ev.id} className={styles.smallCard}>
                            <div className={styles.smallCardHeader}>
                              <div className={styles.smallCardIcon}>
                                <span className="material-symbols-outlined">event</span>
                              </div>
                              {ev.event_time && <span className={styles.badge}>{ev.event_time}</span>}
                            </div>
                            <h3 className={styles.smallCardTitle}>{ev.title}</h3>
                            {ev.description && <p className={styles.smallCardDesc}>{ev.description}</p>}
                            {ev.location && (
                              <span className={styles.smallCardLink}>
                                <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>location_on</span>
                                {ev.location}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.calendarCard}>
            <h3 className={styles.calendarTitle}>
              <span className="material-symbols-outlined" style={{ marginRight: '0.5rem' }}>event</span> Quick Calendar
            </h3>
            <div className={styles.calendarList}>
              {calendarEvents.length === 0 ? (
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>No upcoming events posted yet.</p>
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
