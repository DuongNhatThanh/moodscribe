import { createServerClient as createSSRClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Returns a Supabase client that reads and writes auth cookies.
// Used in Server Components, Server Actions, API Routes, and proxy.ts.
// In Next.js 16 / React 19, cookies() is async and must be awaited.
export async function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      'Supabase env vars are not configured. ' +
      'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.',
    )
  }

  const cookieStore = await cookies()

  return createSSRClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          // setAll called from a Server Component — cookies cannot be set here.
          // proxy.ts handles session refresh and is the only context where
          // cookies can be written.
        }
      },
    },
  })
}
