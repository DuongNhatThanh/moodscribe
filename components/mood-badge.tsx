import type { Mood } from '@/lib/types'

type MoodBadgeProps = {
  mood: Mood
  emoji: string
}

// Record<Mood, string> forces every Mood variant to have an entry.
// TypeScript will produce a compile error if a new mood is added to the
// union in lib/types.ts but not listed here — no runtime fallback needed.
const MOOD_STYLES = {
  happy:       'bg-yellow-100 text-yellow-800 ring-yellow-200',
  sad:         'bg-blue-100   text-blue-800   ring-blue-200',
  anxious:     'bg-orange-100 text-orange-800 ring-orange-200',
  calm:        'bg-teal-100   text-teal-800   ring-teal-200',
  angry:       'bg-red-100    text-red-800    ring-red-200',
  reflective:  'bg-purple-100 text-purple-800 ring-purple-200',
  grateful:    'bg-green-100  text-green-800  ring-green-200',
  overwhelmed: 'bg-pink-100   text-pink-800   ring-pink-200',
} satisfies Record<Mood, string>

export default function MoodBadge({ mood, emoji }: MoodBadgeProps): React.ReactElement {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${MOOD_STYLES[mood]}`}
    >
      {emoji} {mood}
    </span>
  )
}
