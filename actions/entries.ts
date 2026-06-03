'use server'

import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'
import type { Entry, Mood, MoodResult } from '@/lib/types'

const ALL_MOODS: readonly Mood[] = [
  'happy', 'sad', 'anxious', 'calm', 'angry', 'reflective', 'grateful', 'overwhelmed',
]

/** Save a new journal entry to Supabase after mood analysis. */
export async function saveEntry(
  content: string,
  result: MoodResult,
): Promise<void> {
  const supabase = await createServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated.')

  const { error } = await supabase.from('entries').insert({
    content,
    mood: result.mood,
    mood_emoji: result.emoji,
    affirmation: result.affirmation,
    user_id: user.id,
  })

  if (error) {
    console.error('saveEntry failed:', error.message)
    throw new Error('Failed to save entry.')
  }

  revalidatePath('/journal')
}

/** Fetch all entries for the authenticated user, ordered by most recent first. */
export async function getEntries(): Promise<Entry[]> {
  const supabase = await createServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated.')

  // RLS enforces the user_id filter at the database layer.
  const { data, error } = await supabase
    .from('entries')
    .select('id, user_id, content, mood, mood_emoji, affirmation, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getEntries failed:', error.message)
    throw new Error('Failed to load entries.')
  }

  return (data ?? []) as Entry[]
}

/** Return per-mood entry counts for the last 30 days. All 8 moods are always present (0 if none). */
export async function getMoodCounts(): Promise<Record<Mood, number>> {
  const supabase = await createServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated.')

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const { data, error } = await supabase
    .from('entries')
    .select('mood')
    .gte('created_at', thirtyDaysAgo.toISOString())

  if (error) {
    console.error('getMoodCounts failed:', error.message)
    throw new Error('Failed to load mood counts.')
  }

  const counts = Object.fromEntries(ALL_MOODS.map((m) => [m, 0])) as Record<Mood, number>
  for (const row of data ?? []) {
    if (row.mood in counts) {
      counts[row.mood as Mood] += 1
    }
  }
  return counts
}

/** Delete an entry by id. RLS enforces ownership at the database layer. */
export async function deleteEntry(id: string): Promise<void> {
  const supabase = await createServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated.')

  const { error } = await supabase.from('entries').delete().eq('id', id)

  if (error) {
    console.error('deleteEntry failed:', error.message)
    throw new Error('Failed to delete entry.')
  }

  revalidatePath('/journal')
}
