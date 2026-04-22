'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import styles from '../admin.module.css';

const CATEGORIES = [
  { value: 'general',  label: 'General' },
  { value: 'urgent',   label: 'Urgent' },
  { value: 'reminder', label: 'Reminder' },
  { value: 'event',    label: 'Event' },
  { value: 'speaker',  label: 'Speaker' },
  { value: 'sickness', label: 'Sickness (dua request)' },
  { value: 'death',    label: 'Passing (Inna lillahi…)' },
];

function toLocalDateTimeValue(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function AnnouncementsSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    message: '',
    category: 'general',
    event_at: '',
    expires_at: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    const { data, error: dbError } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });
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
    if (!form.message.trim()) return;
    setSaving(true);
    setError('');

    const payload = {
      message: form.message.trim(),
      category: form.category,
      event_at: form.event_at ? new Date(form.event_at).toISOString() : null,
      expires_at: form.expires_at ? new Date(form.expires_at).toISOString() : null,
    };

    const { error: dbError } = await supabase.from('announcements').insert(payload);
    setSaving(false);

    if (dbError) {
      setError(dbError.message);
    } else {
      setForm({ message: '', category: 'general', event_at: '', expires_at: '' });
      load();
    }
  }

  async function toggleActive(item) {
    const { error: dbError } = await supabase
      .from('announcements')
      .update({ is_active: !item.is_active })
      .eq('id', item.id);
    if (dbError) setError(dbError.message);
    else load();
  }

  async function handleDelete(id) {
    if (!confirm('Delete this announcement? This cannot be undone.')) return;
    const { error: dbError } = await supabase.from('announcements').delete().eq('id', id);
    if (dbError) setError(dbError.message);
    else load();
  }

  return (
    <div className={styles.section}>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <h2 className={styles.formTitle}>New announcement</h2>

        <label className={styles.label}>Message</label>
        <textarea
          className={styles.textarea}
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="e.g. Brother Yusuf is unwell — please keep him in your duas."
          required
        />

        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Category</label>
            <select
              className={styles.input}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={styles.label}>Happens at (optional)</label>
            <input
              type="datetime-local"
              className={styles.input}
              value={form.event_at}
              onChange={(e) => setForm({ ...form, event_at: e.target.value })}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.3rem' }}>
              When the thing is happening (e.g. meeting time). Leave blank if not time-specific.
            </p>
          </div>
        </div>

        <div>
          <label className={styles.label}>Expires at (optional)</label>
          <input
            type="datetime-local"
            className={styles.input}
            value={form.expires_at}
            onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
          />
          <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.3rem' }}>
            When to stop showing this announcement. Leave blank to show indefinitely.
          </p>
        </div>

        {error && <p className={styles.errorText}>{error}</p>}

        <button type="submit" className={styles.primaryBtn} disabled={saving}>
          {saving ? 'Posting…' : 'Post announcement'}
        </button>
      </form>

      <div className={styles.listHeader}>
        <h2 className={styles.formTitle}>All announcements</h2>
        <button className={styles.ghostBtn} onClick={load} disabled={loading}>
          <span className="material-symbols-outlined" aria-hidden="true">refresh</span>
          Refresh
        </button>
      </div>

      {loading ? (
        <p className={styles.muted}>Loading…</p>
      ) : items.length === 0 ? (
        <p className={styles.muted}>No announcements yet.</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => {
            const expired = item.expires_at && new Date(item.expires_at) < new Date();
            return (
              <li key={item.id} className={`${styles.listItem} ${!item.is_active || expired ? styles.itemDim : ''}`}>
                <div className={styles.itemBody}>
                  <div className={styles.itemMeta}>
                    <span className={`${styles.badge} ${styles['badge_' + item.category]}`}>
                      {item.category}
                    </span>
                    {expired && <span className={styles.badgeMuted}>EXPIRED</span>}
                    {!item.is_active && <span className={styles.badgeMuted}>HIDDEN</span>}
                    <span className={styles.metaDate}>
                      {item.event_at
                        ? `📅 ${new Date(item.event_at).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}`
                        : `Posted ${new Date(item.created_at).toLocaleDateString()}`}
                      {item.expires_at && ` · expires ${new Date(item.expires_at).toLocaleDateString()}`}
                    </span>
                  </div>
                  <p className={styles.itemMessage}>{item.message}</p>
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
