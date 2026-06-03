import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Returns a Supabase client using the anon key.
// Phase 3: simple anon client — no cookie handling yet.
// Phase 4 will replace this with an @supabase/ssr cookie-based client once sessions exist.
export function createServerClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      'Supabase env vars are not configured. ' +
      'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.',
    )
  }

  return createClient(url, key)
}
