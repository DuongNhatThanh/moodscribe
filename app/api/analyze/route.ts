import { NextResponse } from 'next/server'

// POST /api/analyze
// Input:  { content: string }
// Output: MoodResult JSON — { mood, emoji, affirmation }
// Full implementation in Phase 2.
export async function POST(): Promise<NextResponse> {
  return NextResponse.json({ message: 'Not implemented yet' }, { status: 501 })
}
