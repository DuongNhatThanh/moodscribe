import EntryCard from '@/components/entry-card'
import EntryForm from '@/components/entry-form'
import { getEntries } from '@/actions/entries'

// Force dynamic rendering so every request fetches fresh data from Supabase.
export const dynamic = 'force-dynamic'

// Server Component — data is fetched from Supabase on every request.
export default async function JournalPage(): Promise<React.ReactElement> {
  const entries = await getEntries()

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
        {entries.length === 0 ? (
          <p className="text-sm text-stone-400">
            No entries yet. Write something above to get started.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {entries.map((entry) => (
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
