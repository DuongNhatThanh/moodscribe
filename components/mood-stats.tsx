import type { Mood } from '@/lib/types'

type MoodStatsProps = {
  counts: Partial<Record<Mood, number>>
}

// Mood breakdown display for the last 30 days. Implemented in Phase 5.
export default function MoodStats({ counts: _ }: MoodStatsProps): React.ReactElement {
  return <div>Mood stats — coming in Phase 5</div>
}
