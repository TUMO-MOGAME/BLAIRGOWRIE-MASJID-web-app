'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import LoginView from './LoginView';
import AdminPanel from './AdminPanel';
import styles from './admin.module.css';

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    let mounted = true;
    let listener = null;

    try {
      supabase.auth.getSession()
        .then(({ data }) => {
          if (!mounted) return;
          setSession(data.session);
          setLoading(false);
        })
        .catch((err) => {
          if (!mounted) return;
          setInitError(err.message || String(err));
          setLoading(false);
        });

      listener = supabase.auth.onAuthStateChange((_event, newSession) => {
        setSession(newSession);
      }).data;
    } catch (err) {
      // Most common cause: missing env vars in Vercel
      setInitError(err.message || String(err));
      setLoading(false);
    }

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingWrap}>
        <div className={styles.spinner} aria-label="Loading" />
      </div>
    );
  }

  if (initError) {
    return (
      <div className={styles.authPage}>
        <div className={styles.authCard}>
          <div className={styles.brandTag}>
            <span className="material-symbols-outlined" aria-hidden="true">error</span>
            <span>Configuration error</span>
          </div>
          <h1 className={styles.authTitle}>Admin console is not configured</h1>
          <p className={styles.authSub}>{initError}</p>
          <p className={styles.authFoot}>
            If you&apos;re the site owner: check that your Vercel project has the
            <code> NEXT_PUBLIC_SUPABASE_URL </code> and
            <code> NEXT_PUBLIC_SUPABASE_ANON_KEY </code>
            environment variables set, then redeploy.
          </p>
        </div>
      </div>
    );
  }

  return session ? <AdminPanel session={session} /> : <LoginView />;
}
