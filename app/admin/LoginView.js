'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';
import styles from './admin.module.css';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    setError('');

    const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/admin` : undefined;

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });

    if (authError) {
      setStatus('error');
      setError(authError.message);
    } else {
      setStatus('sent');
    }
  }

  return (
    <section className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.brandTag}>
          <span className="material-symbols-outlined" aria-hidden="true">shield_person</span>
          <span>Admin Access</span>
        </div>
        <h1 className={styles.authTitle}>Sign in to manage the Masjid</h1>
        <p className={styles.authSub}>
          Enter your registered admin email. We&apos;ll send you a secure sign-in link — no password required.
        </p>

        {status === 'sent' ? (
          <div className={styles.successBox}>
            <span className="material-symbols-outlined" aria-hidden="true">mark_email_read</span>
            <div>
              <strong>Check your inbox</strong>
              <p>We sent a magic link to <b>{email}</b>. Open it on this device to sign in.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <label htmlFor="admin-email" className={styles.label}>Email</label>
            <input
              id="admin-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              autoComplete="email"
              disabled={status === 'sending'}
            />
            {error && <p className={styles.errorText}>{error}</p>}
            <button type="submit" className={styles.primaryBtn} disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send magic link'}
            </button>
          </form>
        )}

        <p className={styles.authFoot}>
          Only pre-approved admin emails can sign in. Contact the mosque committee to request access.
        </p>
      </div>
    </section>
  );
}
