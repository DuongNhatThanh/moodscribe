'use server'

import type { Entry, MoodResult } from '@/lib/types'

/** Save a new journal entry to Supabase. Implemented in Phase 3. */
export async function saveEntry(
  _content: string,
  _result: MoodResult,
): Promise<void> {
  throw new Error('Not implemented yet')
}

/** Fetch all entries for the current user. Implemented in Phase 3. */
export async function getEntries(): Promise<Entry[]> {
  throw new Error('Not implemented yet')
}

/** Delete an entry by id. Implemented in Phase 3. */
export async function deleteEntry(_id: string): Promise<void> {
  throw new Error('Not implemented yet')
}
