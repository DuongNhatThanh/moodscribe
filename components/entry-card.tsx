import type { Entry } from '@/lib/types'

type EntryCardProps = {
  entry: Entry
}

// Single journal entry: content, mood badge, date, delete button. Implemented in Phase 1.
export default function EntryCard({ entry }: EntryCardProps): React.ReactElement {
  return (
    <div>
      <p>{entry.content}</p>
    </div>
  )
}
