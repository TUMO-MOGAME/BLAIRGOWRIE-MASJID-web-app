'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';
import AnnouncementsSection from './sections/AnnouncementsSection';
import EventsSection from './sections/EventsSection';
import KhutbahSection from './sections/KhutbahSection';
import SalahChangesSection from './sections/SalahChangesSection';
import styles from './admin.module.css';

const TABS = [
  { id: 'announcements', label: 'Announcements', icon: 'campaign' },
  { id: 'events',        label: 'Events',        icon: 'event' },
  { id: 'khutbah',       label: 'Friday Khutbah',icon: 'mosque' },
  { id: 'salah',         label: 'Salah Times',   icon: 'schedule' },
];

export default function AdminPanel({ session }) {
  const [activeTab, setActiveTab] = useState('announcements');

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <section className={styles.panel}>
      <header className={styles.panelHeader}>
        <div>
          <span className={styles.brandTag}>
            <span className="material-symbols-outlined" aria-hidden="true">shield_person</span>
            <span>Admin Console</span>
          </span>
          <h1 className={styles.panelTitle}>Masjid Content</h1>
          <p className={styles.panelSub}>Signed in as <b>{session.user.email}</b></p>
        </div>
        <button className={styles.ghostBtn} onClick={handleSignOut}>
          <span className="material-symbols-outlined" aria-hidden="true">logout</span>
          Sign out
        </button>
      </header>

      <nav className={styles.tabs} role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="material-symbols-outlined" aria-hidden="true">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      <div className={styles.tabContent}>
        {activeTab === 'announcements' && <AnnouncementsSection />}
        {activeTab === 'events' && <EventsSection />}
        {activeTab === 'khutbah' && <KhutbahSection />}
        {activeTab === 'salah' && <SalahChangesSection />}
      </div>
    </section>
  );
}
