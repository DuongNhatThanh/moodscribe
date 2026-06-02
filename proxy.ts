import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Supabase session refresh on every request. Full implementation in Phase 4.
export function proxy(_request: NextRequest): NextResponse {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
