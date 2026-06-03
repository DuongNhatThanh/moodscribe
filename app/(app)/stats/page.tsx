import type { Metadata } from 'next'
import MoodStats from '@/components/mood-stats'
import { getMoodCounts } from '@/actions/entries'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Stats' }

export default async function StatsPage(): Promise<React.ReactElement> {
  const counts = await getMoodCounts()
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0)

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-10">
      <section>
        <h1 className="text-xl font-semibold text-stone-900">Mood Stats</h1>
        <p className="mt-1 text-sm text-stone-500">
          A breakdown of your emotional patterns over the last 30 days.
        </p>
      </section>

      <section aria-label="Mood breakdown">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-stone-400">
          Last 30 Days
          {total > 0 && (
            <span className="ml-2 normal-case tracking-normal font-normal text-stone-400">
              — {total} {total === 1 ? 'entry' : 'entries'}
            </span>
          )}
        </h2>
        <MoodStats counts={counts} total={total} />
      </section>
    </main>
  )
}
