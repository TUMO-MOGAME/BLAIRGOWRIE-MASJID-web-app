'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import styles from '../admin.module.css';

const EMPTY = {
  title: '',
  description: '',
  event_date: '',
  event_time: '',
  location: '',
  image_url: '',
  is_featured: false,
};

export default function EventsSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    const { data, error: dbError } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });
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
    if (!form.title.trim() || !form.event_date) return;
    setSaving(true);
    setError('');

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      event_date: form.event_date,
      event_time: form.event_time.trim() || null,
      location: form.location.trim() || null,
      image_url: form.image_url.trim() || null,
      is_featured: form.is_featured,
    };

    const { error: dbError } = await supabase.from('events').insert(payload);
    setSaving(false);

    if (dbError) {
      setError(dbError.message);
    } else {
      setForm(EMPTY);
      load();
    }
  }

  async function toggleFeatured(item) {
    const { error: dbError } = await supabase
      .from('events')
      .update({ is_featured: !item.is_featured })
      .eq('id', item.id);
    if (dbError) setError(dbError.message);
    else load();
  }

  async function toggleActive(item) {
    const { error: dbError } = await supabase
      .from('events')
      .update({ is_active: !item.is_active })
      .eq('id', item.id);
    if (dbError) setError(dbError.message);
    else load();
  }

  async function handleDelete(id) {
    if (!confirm('Delete this event? This cannot be undone.')) return;
    const { error: dbError } = await supabase.from('events').delete().eq('id', id);
    if (dbError) setError(dbError.message);
    else load();
  }

  return (
    <div className={styles.section}>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <h2 className={styles.formTitle}>New event</h2>

        <label className={styles.label}>Title</label>
        <input
          className={styles.input}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="e.g. Ramadan Kickoff"
          required
        />

        <label className={styles.label}>Description</label>
        <textarea
          className={styles.textarea}
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Short description shown to visitors"
        />

        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Event date</label>
            <input
              type="date"
              className={styles.input}
              value={form.event_date}
              onChange={(e) => setForm({ ...form, event_date: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={styles.label}>Time (free text)</label>
            <input
              className={styles.input}
              value={form.event_time}
              onChange={(e) => setForm({ ...form, event_time: e.target.value })}
              placeholder="e.g. After Isha · 5:30 PM – 7:30 PM"
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Location</label>
            <input
              className={styles.input}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Main Hall"
            />
          </div>
          <div>
            <label className={styles.label}>Image URL (optional)</label>
            <input
              className={styles.input}
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              placeholder="/pictures/..."
            />
          </div>
        </div>

        <label className={styles.checkRow}>
          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
          />
          Show as the featured event
        </label>

        {error && <p className={styles.errorText}>{error}</p>}

        <button type="submit" className={styles.primaryBtn} disabled={saving}>
          {saving ? 'Saving…' : 'Add event'}
        </button>
      </form>

      <div className={styles.listHeader}>
        <h2 className={styles.formTitle}>All events</h2>
        <button className={styles.ghostBtn} onClick={load} disabled={loading}>
          <span className="material-symbols-outlined" aria-hidden="true">refresh</span>
          Refresh
        </button>
      </div>

      {loading ? (
        <p className={styles.muted}>Loading…</p>
      ) : items.length === 0 ? (
        <p className={styles.muted}>No events yet.</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => {
            const past = new Date(item.event_date) < new Date(new Date().toDateString());
            return (
              <li key={item.id} className={`${styles.listItem} ${!item.is_active || past ? styles.itemDim : ''}`}>
                <div className={styles.itemBody}>
                  <div className={styles.itemMeta}>
                    {item.is_featured && <span className={`${styles.badge} ${styles.badge_featured}`}>FEATURED</span>}
                    {past && <span className={styles.badgeMuted}>PAST</span>}
                    {!item.is_active && <span className={styles.badgeMuted}>HIDDEN</span>}
                    <span className={styles.metaDate}>
                      {new Date(item.event_date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                      {item.event_time && ` · ${item.event_time}`}
                    </span>
                  </div>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  {item.description && <p className={styles.itemMessage}>{item.description}</p>}
                  {item.location && <p className={styles.muted}>📍 {item.location}</p>}
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.iconBtn} onClick={() => toggleFeatured(item)} title={item.is_featured ? 'Unfeature' : 'Feature'}>
                    <span className="material-symbols-outlined" aria-hidden="true">
                      {item.is_featured ? 'star' : 'star_outline'}
                    </span>
                  </button>
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
