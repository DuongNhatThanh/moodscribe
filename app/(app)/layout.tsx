import Link from 'next/link'

// App shell for all authenticated routes.
// Auth guard (redirect to /login if no session) added in Phase 4.
export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <nav className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4 px-4 py-4">
          <Link
            href="/journal"
            className="text-base font-semibold tracking-tight text-stone-900 hover:text-stone-600"
          >
            MoodScribe
          </Link>
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/journal"
                className="text-sm text-stone-500 hover:text-stone-900"
              >
                Journal
              </Link>
            </li>
            <li>
              <Link
                href="/stats"
                className="text-sm text-stone-500 hover:text-stone-900"
              >
                Stats
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}
