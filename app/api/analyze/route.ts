import { NextRequest, NextResponse } from 'next/server'
import { analyzeEntry } from '@/lib/claude'

// POST /api/analyze
// Input:  { content: string }
// Output: MoodResult JSON — { mood, emoji, affirmation }
// Returns 400 for missing, invalid, or out-of-range content.
export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 })
  }

  if (
    typeof body !== 'object' ||
    body === null ||
    typeof (body as Record<string, unknown>).content !== 'string'
  ) {
    return NextResponse.json({ error: 'Missing required field: content.' }, { status: 400 })
  }

  const trimmed = ((body as Record<string, unknown>).content as string).trim()

  if (trimmed.length === 0) {
    return NextResponse.json({ error: 'Entry cannot be empty.' }, { status: 400 })
  }
  if (trimmed.length < 10) {
    return NextResponse.json(
      { error: 'Entry is too short (minimum 10 characters).' },
      { status: 400 },
    )
  }
  if (trimmed.length > 2000) {
    return NextResponse.json(
      { error: 'Entry is too long (maximum 2000 characters).' },
      { status: 400 },
    )
  }

  try {
    const result = await analyzeEntry(trimmed)
    return NextResponse.json(result, { status: 200 })
  } catch {
    // analyzeEntry catches and returns a fallback for all Claude failures;
    // this outer catch handles any unexpected error that escapes it.
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 },
    )
  }
}
