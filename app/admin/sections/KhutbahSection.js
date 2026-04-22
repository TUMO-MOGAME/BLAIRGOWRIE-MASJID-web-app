'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import styles from '../admin.module.css';

function nextFriday() {
  const d = new Date();
  const offset = (5 - d.getDay() + 7) % 7 || 7;
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

export default function KhutbahSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ for_date: nextFriday(), speaker: '', topic: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    const { data, error: dbError } = await supabase
      .from('khutbah')
      .select('*')
      .order('for_date', { ascending: false });
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
    if (!form.speaker.trim() || !form.topic.trim() || !form.for_date) return;
    setSaving(true);
    setError('');

    const payload = {
      for_date: form.for_date,
      speaker: form.speaker.trim(),
      topic: form.topic.trim(),
    };

    // Upsert by for_date (unique) so re-submitting the same Friday updates in place.
    const { error: dbError } = await supabase
      .from('khutbah')
      .upsert(payload, { onConflict: 'for_date' });

    setSaving(false);

    if (dbError) {
      setError(dbError.message);
    } else {
      setForm({ for_date: nextFriday(), speaker: '', topic: '' });
      load();
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this khutbah entry?')) return;
    const { error: dbError } = await supabase.from('khutbah').delete().eq('id', id);
    if (dbError) setError(dbError.message);
    else load();
  }

  return (
    <div className={styles.section}>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <h2 className={styles.formTitle}>Set Friday khutbah</h2>
        <p className={styles.formHint}>
          Fill this in each week. If a row for the same Friday already exists, it will be updated.
        </p>

        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>For date (Friday)</label>
            <input
              type="date"
              className={styles.input}
              value={form.for_date}
              onChange={(e) => setForm({ ...form, for_date: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={styles.label}>Speaker</label>
            <input
              className={styles.input}
              value={form.speaker}
              onChange={(e) => setForm({ ...form, speaker: e.target.value })}
              placeholder="e.g. Imam Yusuf"
              required
            />
          </div>
        </div>

        <label className={styles.label}>Topic</label>
        <input
          className={styles.input}
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          placeholder="e.g. The Mercy of Ramadan"
          required
        />

        {error && <p className={styles.errorText}>{error}</p>}

        <button type="submit" className={styles.primaryBtn} disabled={saving}>
          {saving ? 'Saving…' : 'Save khutbah'}
        </button>
      </form>

      <div className={styles.listHeader}>
        <h2 className={styles.formTitle}>Previous khutbahs</h2>
        <button className={styles.ghostBtn} onClick={load} disabled={loading}>
          <span className="material-symbols-outlined" aria-hidden="true">refresh</span>
          Refresh
        </button>
      </div>

      {loading ? (
        <p className={styles.muted}>Loading…</p>
      ) : items.length === 0 ? (
        <p className={styles.muted}>No khutbahs yet.</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={styles.listItem}>
              <div className={styles.itemBody}>
                <div className={styles.itemMeta}>
                  <span className={`${styles.badge} ${styles.badge_speaker}`}>
                    {new Date(item.for_date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <h3 className={styles.itemTitle}>{item.topic}</h3>
                <p className={styles.muted}>Speaker: {item.speaker}</p>
              </div>
              <div className={styles.itemActions}>
                <button className={`${styles.iconBtn} ${styles.iconDanger}`} onClick={() => handleDelete(item.id)} title="Delete">
                  <span className="material-symbols-outlined" aria-hidden="true">delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
