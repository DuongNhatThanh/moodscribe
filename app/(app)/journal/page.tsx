import { Suspense } from 'react'
import type { Metadata } from 'next'
import EntryForm from '@/components/entry-form'
import EntryList from '@/components/entry-list'
import EntryListSkeleton from '@/components/entry-list-skeleton'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Journal' }

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
        <Suspense fallback={<EntryListSkeleton />}>
          <EntryList />
        </Suspense>
      </section>
    </main>
  )
}
