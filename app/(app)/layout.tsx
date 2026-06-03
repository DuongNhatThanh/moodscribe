import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}): Promise<React.ReactElement> {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  async function handleLogout(): Promise<never> {
    'use server'
    const supabase = await createServerClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

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
            <li>
              <form action={handleLogout}>
                <button
                  type="submit"
                  className="text-sm text-stone-500 hover:text-stone-900 cursor-pointer"
                >
                  Log out
                </button>
              </form>
            </li>
          </ul>
        </nav>
      </header>

      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}
