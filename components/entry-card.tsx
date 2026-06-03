import type { Entry } from '@/lib/types'
import MoodBadge from '@/components/mood-badge'
import DeleteButton from '@/components/delete-button'
import { deleteEntry } from '@/actions/entries'

type EntryCardProps = {
  entry: Entry
}

// Date is formatted server-side using a fixed locale so it is stable between
// server and client renders — avoids hydration mismatches.
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Server Component — delete is wired via a form action so no "use client" is needed.
export default function EntryCard({ entry }: EntryCardProps): React.ReactElement {
  async function handleDelete(): Promise<void> {
    'use server'
    await deleteEntry(entry.id)
  }

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <MoodBadge mood={entry.mood} emoji={entry.mood_emoji} />
        <form action={handleDelete}>
          <DeleteButton />
        </form>
      </div>

      {/* line-clamp truncates visually; the full text stays in the DOM */}
      <p className="line-clamp-3 text-sm leading-relaxed text-stone-700">
        {entry.content}
      </p>

      <p className="text-xs text-stone-400">{formatDate(entry.created_at)}</p>
    </article>
  )
}
