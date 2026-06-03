import { createBrowserClient } from '@supabase/ssr'

// Browser Supabase client — used only in Client Components (login, signup).
// Reads auth cookies automatically via the browser's cookie store.
export function createBrowserSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      'Supabase env vars are not configured. ' +
      'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.',
    )
  }

  return createBrowserClient(url, key)
}
