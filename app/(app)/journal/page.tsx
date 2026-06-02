import type { Entry } from '@/lib/types'
import EntryCard from '@/components/entry-card'
import EntryForm from '@/components/entry-form'

// Hardcoded mock data — replaced with real Supabase queries in Phase 3.
// Kept local to this page; not exported or shared.
const MOCK_ENTRIES: Entry[] = [
  {
    id: '1',
    user_id: null,
    content:
      'Had a genuinely wonderful day today. Went for a long walk in the park and bumped into an old friend I hadn\'t seen in years. We grabbed coffee and laughed for hours. It reminded me how much I value those unexpected moments of connection.',
    mood: 'happy',
    mood_emoji: '😊',
    affirmation: 'Joy like this is worth holding onto.',
    created_at: '2026-05-30T10:14:00Z',
  },
  {
    id: '2',
    user_id: null,
    content:
      'Can\'t stop thinking about the presentation tomorrow. I\'ve prepared as much as I can, but my mind keeps spinning through worst-case scenarios. Even breathing exercises aren\'t helping much tonight. I just need to get through it.',
    mood: 'anxious',
    mood_emoji: '😰',
    affirmation: 'Preparation is its own form of courage.',
    created_at: '2026-05-28T22:03:00Z',
  },
  {
    id: '3',
    user_id: null,
    content:
      'Spent the morning journaling by the window with tea. No plans, no pressure. There\'s something deeply restorative about a slow, quiet morning when the world feels like it can wait. I want more days that start like this.',
    mood: 'calm',
    mood_emoji: '😌',
    affirmation: 'Rest is not wasted time — it is how you refill.',
    created_at: '2026-05-26T08:47:00Z',
  },
  {
    id: '4',
    user_id: null,
    content:
      'My manager dismissed my idea in the meeting without even letting me finish the sentence. I know I shouldn\'t take it personally, but it\'s hard not to feel disrespected. I worked on that proposal for two weeks. It stings.',
    mood: 'angry',
    mood_emoji: '😠',
    affirmation: 'Your ideas have value, even when they go unheard.',
    created_at: '2026-05-24T17:31:00Z',
  },
  {
    id: '5',
    user_id: null,
    content:
      'Looking back at my entries from six months ago, I barely recognise the person writing them. So much has shifted — my outlook, my habits, the things I worry about. I\'m not sure if I\'ve grown or just changed. Probably both.',
    mood: 'reflective',
    mood_emoji: '🤔',
    affirmation: 'Noticing change is the first step in understanding it.',
    created_at: '2026-05-21T20:15:00Z',
  },
  {
    id: '6',
    user_id: null,
    content:
      'My sister flew in as a surprise for my birthday. I had no idea she was coming — she coordinated with my partner for weeks apparently. I felt completely overwhelmed in the best possible way. Grateful doesn\'t even cover it.',
    mood: 'grateful',
    mood_emoji: '🙏',
    affirmation: 'Being loved like this is something to carry with you.',
    created_at: '2026-05-18T13:55:00Z',
  },
]

// Server Component — data is static in Phase 1; fetched from Supabase in Phase 3.
export default function JournalPage(): React.ReactElement {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-10">
      <section aria-label="New entry">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-stone-400">
          New Entry
        </h2>
        <EntryForm />
      </section>

      <section aria-label="Past entries">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-stone-400">
          Past Entries
        </h2>
        {MOCK_ENTRIES.length === 0 ? (
          <p className="text-sm text-stone-400">
            No entries yet. Write something above to get started.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {MOCK_ENTRIES.map((entry) => (
              <li key={entry.id}>
                <EntryCard entry={entry} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
