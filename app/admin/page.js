'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import LoginView from './LoginView';
import AdminPanel from './AdminPanel';
import styles from './admin.module.css';

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

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

  return session ? <AdminPanel session={session} /> : <LoginView />;
}
