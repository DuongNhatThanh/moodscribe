import type { Mood } from '@/lib/types'

type MoodStatsProps = {
  counts: Record<Mood, number>
  total: number
}

const MOOD_META: Record<Mood, { emoji: string; bar: string }> = {
  happy:       { emoji: '😊', bar: 'bg-yellow-400' },
  sad:         { emoji: '😢', bar: 'bg-blue-400'   },
  anxious:     { emoji: '😰', bar: 'bg-orange-400' },
  calm:        { emoji: '😌', bar: 'bg-teal-400'   },
  angry:       { emoji: '😠', bar: 'bg-red-400'    },
  reflective:  { emoji: '🤔', bar: 'bg-purple-400' },
  grateful:    { emoji: '🙏', bar: 'bg-green-400'  },
  overwhelmed: { emoji: '😵', bar: 'bg-pink-400'   },
} satisfies Record<Mood, { emoji: string; bar: string }>

export default function MoodStats({ counts, total }: MoodStatsProps): React.ReactElement {
  if (total === 0) {
    return (
      <p className="text-sm text-stone-400">No entries in the last 30 days.</p>
    )
  }

  if (total < 3) {
    return (
      <p className="text-sm text-stone-400">
        Write at least 3 entries to see your mood breakdown.
      </p>
    )
  }

  const max = Math.max(...Object.values(counts))
  const activeMoods = (Object.keys(counts) as Mood[]).filter((m) => counts[m] > 0)

  return (
    <div className="flex flex-col gap-3">
      {activeMoods.map((mood) => {
        const count = counts[mood]
        const pct = max > 0 ? Math.round((count / max) * 100) : 0
        const { emoji, bar } = MOOD_META[mood]
        return (
          <div key={mood} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-sm text-stone-600 capitalize">
              {emoji} {mood}
            </span>
            <div className="flex flex-1 items-center gap-2">
              <div className="flex-1 overflow-hidden rounded-full bg-stone-100">
                <div
                  className={`h-2 rounded-full ${bar}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-6 shrink-0 text-right text-xs tabular-nums text-stone-500">
                {count}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
