'use client';

import { createClient } from '@supabase/supabase-js';

// NOTE: Next.js statically prerenders client pages at build time, which evaluates
// this module. We can't throw or call createClient() here if env vars are missing
// (e.g. on a Preview deploy that wasn't configured yet) — that kills the build.
// Instead we lazy-initialise and proxy all access, so the error surfaces at
// actual runtime use with a clear message.

let _client = null;

function getClient() {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
      'Set them in Vercel → Project → Settings → Environment Variables ' +
      '(enable for Production, Preview, and Development), then redeploy.'
    );
  }
  _client = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return _client;
}

export const supabase = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getClient();
      const value = client[prop];
      return typeof value === 'function' ? value.bind(client) : value;
    },
  }
);
