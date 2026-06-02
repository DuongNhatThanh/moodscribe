import type { Mood } from '@/lib/types'

type MoodBadgeProps = {
  mood: Mood
  emoji: string
}

// Emoji + label chip, color-coded per mood. Implemented in Phase 1.
export default function MoodBadge({ mood, emoji }: MoodBadgeProps): React.ReactElement {
  return (
    <span>
      {emoji} {mood}
    </span>
  )
}
