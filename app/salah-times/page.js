'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { supabase } from '../lib/supabase';

const PRAYER_LABELS = {
  fajr: 'Fajr', dhuhr: 'Dhuhr', asr: 'Asr',
  maghrib: 'Maghrib', isha: 'Isha', jumuah: "Jumu'ah",
};

function formatChangeTime(t24) {
  if (!t24) return '';
  const [hStr, mStr] = t24.split(':');
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
}

function formatEffectiveDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: 'long', month: 'long', day: 'numeric',
  });
}

export default function SalahTimesPage() {
  const [times, setTimes] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState({ name: 'Loading...', time: '' });
  const [salahChanges, setSalahChanges] = useState([]);

  // Iqamah offsets (minutes after adhan)
  const iqamahOffsets = { Fajr: 30, Dhuhr: 15, Asr: 15, Maghrib: 5, Isha: 15 };
  const jumuahAdhan = '12:15 PM';
  const jumuahIqamah = '01:00 PM';

  useEffect(() => {
    async function fetchTimes() {
      try {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        // Blairgowrie, Randburg coordinates
        const res = await fetch(
          `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=-26.1076&longitude=28.0075&method=2`
        );
        const data = await res.json();
        if (data.code === 200) {
          setTimes(data.data.timings);
        }
      } catch (err) {
        console.error('Failed to fetch prayer times:', err);
      }
    }
    fetchTimes();

    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  // Load upcoming + recent salah time changes from Supabase
  useEffect(() => {
    async function loadChanges() {
      try {
        const today = new Date();
        const cutoff = new Date(today);
        cutoff.setDate(cutoff.getDate() - 14); // also show recently-effective changes for 14 days
        const cutoffStr = cutoff.toISOString().slice(0, 10);
        const { data, error } = await supabase
          .from('salah_changes')
          .select('id, prayer, new_adhan_time, new_iqamah_time, effective_from, note')
          .eq('is_active', true)
          .gte('effective_from', cutoffStr)
          .order('effective_from', { ascending: true });
        if (error) {
          console.warn('[salah-changes] load failed:', error.message);
          return;
        }
        setSalahChanges(data || []);
      } catch (err) {
        console.warn('[salah-changes] load failed:', err?.message || err);
      }
    }
    loadChanges();
  }, []);

  useEffect(() => {
    if (!times) return;
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const now = currentTime;
    for (const p of prayers) {
      const [h, m] = times[p].split(':').map(Number);
      const prayerDate = new Date(now);
      prayerDate.setHours(h, m, 0);
      if (prayerDate > now) {
        setNextPrayer({ name: p, time: formatTime(times[p]) });
        return;
      }
    }
    setNextPrayer({ name: 'Fajr', time: formatTime(times.Fajr) });
  }, [times, currentTime]);

  function formatTime(t) {
    if (!t) return '';
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
  }

  function addMinutes(t, mins) {
    if (!t) return '';
    const [h, m] = t.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m + mins, 0);
    const ampm = d.getHours() >= 12 ? 'PM' : 'AM';
    const h12 = d.getHours() > 12 ? d.getHours() - 12 : d.getHours() === 0 ? 12 : d.getHours();
    return `${String(h12).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} ${ampm}`;
  }

  const prayerRows = times ? [
    { name: 'Fajr', adhan: formatTime(times.Fajr), iqamah: addMinutes(times.Fajr, iqamahOffsets.Fajr), current: nextPrayer.name === 'Fajr' },
    { name: 'Dhuhr', adhan: formatTime(times.Dhuhr), iqamah: addMinutes(times.Dhuhr, iqamahOffsets.Dhuhr), current: nextPrayer.name === 'Dhuhr' },
    { name: 'Asr', adhan: formatTime(times.Asr), iqamah: addMinutes(times.Asr, iqamahOffsets.Asr), current: nextPrayer.name === 'Asr' },
    { name: 'Maghrib', adhan: formatTime(times.Maghrib), iqamah: addMinutes(times.Maghrib, iqamahOffsets.Maghrib), current: nextPrayer.name === 'Maghrib' },
    { name: 'Isha', adhan: formatTime(times.Isha), iqamah: addMinutes(times.Isha, iqamahOffsets.Isha), current: nextPrayer.name === 'Isha' },
  ] : [];

  const currentTimeStr = currentTime.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Salah Times</h1>
        <p className={styles.heroSubtitle}>
          &ldquo;Indeed, prayer has been decreed upon the believers a decree of specified times.&rdquo; (An-Nisa 4:103)
        </p>
      </section>

      {/* Main Grid */}
      <section className={styles.mainGrid}>
        {/* Active Prayer Card */}
        <div className={styles.activeCard}>
          <div className={styles.activeGhost}>
            <span className="material-symbols-outlined" style={{ fontSize: '12rem' }}>schedule</span>
          </div>
          <div className={styles.activeTop}>
            <p className={styles.activeLabel}>Next Prayer</p>
            <h2 className={styles.activeName}>{nextPrayer.name}</h2>
          </div>
          <div className={styles.activeBottom}>
            <div className={styles.activeTime}>{currentTimeStr}</div>
            <p className={styles.activeIqamah}>
              {nextPrayer.name !== 'Loading...' && times ? `Iqamah will be at ${prayerRows.find(p => p.name === nextPrayer.name)?.iqamah || ''}` : 'Loading times...'}
            </p>
          </div>
        </div>

        {/* Times Table */}
        <div className={styles.tableWrap}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Prayer</th>
                  <th>Adhan</th>
                  <th>Iqamah</th>
                </tr>
              </thead>
              <tbody>
                {prayerRows.map(p => (
                  <tr key={p.name} className={p.current ? styles.currentRow : ''}>
                    <td className={styles.prayerCell}>
                      {p.name}
                      {p.current && <span className={styles.pulseGold} />}
                    </td>
                    <td className={styles.timeCell}>{p.adhan}</td>
                    <td className={styles.iqamahCell}>{p.iqamah}</td>
                  </tr>
                ))}
                <tr className={styles.jumuahRow}>
                  <td className={styles.prayerCell} style={{ color: 'var(--secondary)' }}>Jumu&apos;ah</td>
                  <td className={styles.timeCell}>{jumuahAdhan}</td>
                  <td className={styles.iqamahCell} style={{ color: 'var(--secondary)' }}>{jumuahIqamah}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Upcoming Salah Time Changes */}
      {salahChanges.length > 0 && (
        <section className={styles.changesSection}>
          <div className={styles.changesHeader}>
            <span className={styles.changesLabel}>
              <span className="material-symbols-outlined" aria-hidden="true">schedule</span>
              Iqamah Time Changes
            </span>
            <h2 className={styles.changesTitle}>What&apos;s changing</h2>
          </div>
          <div className={styles.changesList}>
            {salahChanges.map((change) => {
              const effDate = new Date(change.effective_from);
              const today = new Date(new Date().toDateString());
              const inEffect = effDate <= today;
              return (
                <div
                  key={change.id}
                  className={`${styles.changeRow} ${inEffect ? styles.changeInEffect : styles.changeUpcoming}`}
                >
                  <div className={styles.changePillar}>
                    <span className={styles.changeStatus}>
                      {inEffect ? 'In effect' : 'Upcoming'}
                    </span>
                    <span className={styles.changeDate}>{formatEffectiveDate(change.effective_from)}</span>
                  </div>
                  <div className={styles.changeBody}>
                    <h3 className={styles.changePrayer}>
                      {PRAYER_LABELS[change.prayer] || change.prayer}
                    </h3>
                    <div className={styles.changeTimes}>
                      {change.new_adhan_time && (
                        <div className={styles.changeTimeRow}>
                          <span className={styles.changeTimeLabel}>Adhan</span>
                          <span className={styles.changeNewTime}>{formatChangeTime(change.new_adhan_time)}</span>
                        </div>
                      )}
                      {change.new_iqamah_time && (
                        <div className={styles.changeTimeRow}>
                          <span className={styles.changeTimeLabel}>Iqamah</span>
                          <span className={styles.changeNewTime}>{formatChangeTime(change.new_iqamah_time)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {change.note && <p className={styles.changeNote}>{change.note}</p>}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Info Cards */}
      <section className={styles.info}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Adhan vs. Iqamah</h3>
            <p className={styles.infoText}>
              The <strong>Adhan</strong> is the call to prayer, signaling that the time for prayer has begun. The <strong>Iqamah</strong> is the second call given just before the congregation (jama&apos;ah) begins the prayer.
            </p>
            <p className={styles.infoText}>
              Please try to arrive at the Masjid at least 5 minutes before the Iqamah time to ensure you are ready for the congregational prayer.
            </p>
          </div>
          <div className={styles.infoNotices}>
            <div className={styles.notice}>
              <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>info</span>
              <div>
                <h4 className={styles.noticeTitle}>Weekly Changes</h4>
                <p className={styles.noticeText}>Prayer times are updated automatically using the Aladhan API based on the sun&apos;s position for Blairgowrie, Randburg.</p>
              </div>
            </div>
            <div className={styles.notice}>
              <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>groups</span>
              <div>
                <h4 className={styles.noticeTitle}>Ladies Facilities</h4>
                <p className={styles.noticeText}>Separate facilities are available for sisters for all five daily prayers and Jumu&apos;ah.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spiritual Quote */}
      <section className={styles.quoteSection}>
        <div className={styles.quoteDivider} />
        <p className={styles.quoteText}>
          &ldquo;The closest a servant comes to his Lord is when he is prostrating himself, so make many supplications in it.&rdquo;
        </p>
        <p className={styles.quoteSource}>Sahih Muslim</p>
      </section>
    </div>
  );
}
