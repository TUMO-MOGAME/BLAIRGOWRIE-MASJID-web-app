'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import styles from '../admin.module.css';

const PRAYERS = [
  { value: 'fajr',    label: 'Fajr' },
  { value: 'dhuhr',   label: 'Dhuhr' },
  { value: 'asr',     label: 'Asr' },
  { value: 'maghrib', label: 'Maghrib' },
  { value: 'isha',    label: 'Isha' },
  { value: 'jumuah',  label: "Jumu'ah" },
];

function formatTime(t24) {
  if (!t24) return '';
  const [hStr, mStr] = t24.split(':');
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });
}

const EMPTY = { prayer: 'fajr', new_adhan_time: '', new_iqamah_time: '', effective_from: '', note: '' };

export default function SalahChangesSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    const { data, error: dbError } = await supabase
      .from('salah_changes')
      .select('*')
      .order('effective_from', { ascending: true });
    if (dbError) {
      setError(dbError.message);
      setItems([]);
    } else {
      setItems(data || []);
      setError('');
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.prayer || !form.effective_from) return;
    if (!form.new_adhan_time && !form.new_iqamah_time) {
      setError('Enter a new Adhan time, a new Iqamah time, or both.');
      return;
    }
    setSaving(true);
    setError('');

    const payload = {
      prayer: form.prayer,
      new_adhan_time: form.new_adhan_time || null,
      new_iqamah_time: form.new_iqamah_time || null,
      effective_from: form.effective_from,
      note: form.note.trim() || null,
    };

    const { error: dbError } = await supabase.from('salah_changes').insert(payload);
    setSaving(false);

    if (dbError) {
      setError(dbError.message);
    } else {
      setForm(EMPTY);
      load();
    }
  }

  async function toggleActive(item) {
    const { error: dbError } = await supabase
      .from('salah_changes')
      .update({ is_active: !item.is_active })
      .eq('id', item.id);
    if (dbError) setError(dbError.message);
    else load();
  }

  async function handleDelete(id) {
    if (!confirm('Delete this time change? This cannot be undone.')) return;
    const { error: dbError } = await supabase.from('salah_changes').delete().eq('id', id);
    if (dbError) setError(dbError.message);
    else load();
  }

  return (
    <div className={styles.section}>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <h2 className={styles.formTitle}>New salah time change</h2>
        <p className={styles.formHint}>
          Announces an upcoming Adhan and/or Iqamah change on the public Salah Times page.
          Fill in one or both — leave a field blank if it&apos;s not changing.
        </p>

        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Prayer</label>
            <select
              className={styles.input}
              value={form.prayer}
              onChange={(e) => setForm({ ...form, prayer: e.target.value })}
              required
            >
              {PRAYERS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={styles.label}>Effective from (date)</label>
            <input
              type="date"
              className={styles.input}
              value={form.effective_from}
              onChange={(e) => setForm({ ...form, effective_from: e.target.value })}
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>New Adhan time</label>
            <input
              type="time"
              className={styles.input}
              value={form.new_adhan_time}
              onChange={(e) => setForm({ ...form, new_adhan_time: e.target.value })}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.3rem' }}>
              Leave blank if Adhan time isn&apos;t changing.
            </p>
          </div>
          <div>
            <label className={styles.label}>New Iqamah time</label>
            <input
              type="time"
              className={styles.input}
              value={form.new_iqamah_time}
              onChange={(e) => setForm({ ...form, new_iqamah_time: e.target.value })}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.3rem' }}>
              Leave blank if Iqamah time isn&apos;t changing.
            </p>
          </div>
        </div>

        <label className={styles.label}>Note (optional)</label>
        <textarea
          className={styles.textarea}
          rows={2}
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          placeholder="e.g. Seasonal adjustment for summer timings"
        />

        {error && <p className={styles.errorText}>{error}</p>}

        <button type="submit" className={styles.primaryBtn} disabled={saving}>
          {saving ? 'Saving…' : 'Add time change'}
        </button>
      </form>

      <div className={styles.listHeader}>
        <h2 className={styles.formTitle}>All time changes</h2>
        <button className={styles.ghostBtn} onClick={load} disabled={loading}>
          <span className="material-symbols-outlined" aria-hidden="true">refresh</span>
          Refresh
        </button>
      </div>

      {loading ? (
        <p className={styles.muted}>Loading…</p>
      ) : items.length === 0 ? (
        <p className={styles.muted}>No time changes recorded yet.</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => {
            const inEffect = new Date(item.effective_from) <= new Date(new Date().toDateString());
            const prayerLabel = PRAYERS.find(p => p.value === item.prayer)?.label || item.prayer;
            return (
              <li key={item.id} className={`${styles.listItem} ${!item.is_active ? styles.itemDim : ''}`}>
                <div className={styles.itemBody}>
                  <div className={styles.itemMeta}>
                    <span className={`${styles.badge} ${styles.badge_speaker}`}>{prayerLabel}</span>
                    {inEffect && <span className={`${styles.badge} ${styles.badge_general}`}>IN EFFECT</span>}
                    {!inEffect && <span className={`${styles.badge} ${styles.badge_reminder}`}>UPCOMING</span>}
                    {!item.is_active && <span className={styles.badgeMuted}>HIDDEN</span>}
                    <span className={styles.metaDate}>
                      From {formatDate(item.effective_from)}
                    </span>
                  </div>
                  <h3 className={styles.itemTitle}>
                    {prayerLabel}
                  </h3>
                  <p className={styles.itemMessage} style={{ margin: 0 }}>
                    {item.new_adhan_time && <>Adhan → <strong>{formatTime(item.new_adhan_time)}</strong></>}
                    {item.new_adhan_time && item.new_iqamah_time && <> &nbsp;·&nbsp; </>}
                    {item.new_iqamah_time && <>Iqamah → <strong>{formatTime(item.new_iqamah_time)}</strong></>}
                  </p>
                  {item.note && <p className={styles.itemMessage}>{item.note}</p>}
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.iconBtn} onClick={() => toggleActive(item)} title={item.is_active ? 'Hide' : 'Show'}>
                    <span className="material-symbols-outlined" aria-hidden="true">
                      {item.is_active ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                  <button className={`${styles.iconBtn} ${styles.iconDanger}`} onClick={() => handleDelete(item.id)} title="Delete">
                    <span className="material-symbols-outlined" aria-hidden="true">delete</span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
