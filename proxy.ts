import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Supabase session refresh on every request.
// This is the only context where auth cookies can be written —
// Server Components can read cookies but not set them.
export async function proxy(request: NextRequest): Promise<NextResponse> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return NextResponse.next()
  }

  // The response object is reassigned inside setAll so that Set-Cookie headers
  // are forwarded to the browser. This double-assignment is the standard
  // @supabase/ssr middleware pattern.
  let response = NextResponse.next({ request })

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        )
      },
    },
  })

  // Validates the JWT against Supabase servers and refreshes the session
  // cookie if it is close to expiry. getUser() is used over getSession()
  // because it performs server-side JWT verification.
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
