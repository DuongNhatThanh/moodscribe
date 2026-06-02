import Link from 'next/link'

// Root landing page — links to the journal for unauthenticated visitors.
// Auth-aware redirect (to /journal or /login) added in Phase 4.
export default function Home(): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-6">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900">
          MoodScribe
        </h1>
        <p className="text-lg leading-relaxed text-stone-500">
          A calm space to write, reflect, and understand your emotions over time.
        </p>
        <Link
          href="/journal"
          className="mt-2 rounded-full bg-stone-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700"
        >
          Open Journal
        </Link>
      </div>
    </main>
  )
}
