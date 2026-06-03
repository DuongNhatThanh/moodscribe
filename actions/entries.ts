'use server'

import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'
import type { Entry, MoodResult } from '@/lib/types'

/** Save a new journal entry to Supabase after mood analysis. */
export async function saveEntry(
  content: string,
  result: MoodResult,
): Promise<void> {
  const supabase = createServerClient()

  const { error } = await supabase.from('entries').insert({
    content,
    mood: result.mood,
    // MoodResult uses 'emoji'; the entries table column is 'mood_emoji'
    mood_emoji: result.emoji,
    affirmation: result.affirmation,
    user_id: null, // Phase 3: no auth yet; tightened to NOT NULL in Phase 4
  })

  if (error) {
    console.error('saveEntry failed:', error.message)
    throw new Error('Failed to save entry.')
  }

  revalidatePath('/journal')
}

/** Fetch all entries ordered by most recent first. */
export async function getEntries(): Promise<Entry[]> {
  const supabase = createServerClient()

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

/** Delete an entry by id. */
export async function deleteEntry(id: string): Promise<void> {
  const supabase = createServerClient()

  const { error } = await supabase.from('entries').delete().eq('id', id)

  if (error) {
    console.error('deleteEntry failed:', error.message)
    throw new Error('Failed to delete entry.')
  }

  revalidatePath('/journal')
}
