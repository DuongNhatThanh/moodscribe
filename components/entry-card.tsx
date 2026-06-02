import type { Entry } from '@/lib/types'
import MoodBadge from '@/components/mood-badge'

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

// Server Component — no interactivity needed for display.
// Delete wiring is added in Phase 3 once Supabase is in place.
export default function EntryCard({ entry }: EntryCardProps): React.ReactElement {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <MoodBadge mood={entry.mood} emoji={entry.mood_emoji} />
        {/* Delete button is intentionally inert until Phase 3 */}
        <button
          type="button"
          disabled
          aria-label="Delete entry"
          className="text-xs text-stone-300 cursor-not-allowed"
        >
          Delete
        </button>
      </div>

      {/* line-clamp truncates visually; the full text stays in the DOM */}
      <p className="line-clamp-3 text-sm leading-relaxed text-stone-700">
        {entry.content}
      </p>

      <p className="text-xs text-stone-400">{formatDate(entry.created_at)}</p>
    </article>
  )
}
