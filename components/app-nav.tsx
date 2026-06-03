'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type AppNavProps = {
  logoutAction: () => Promise<never>
}

export default function AppNav({ logoutAction }: AppNavProps): React.ReactElement {
  const pathname = usePathname()

  function navClass(href: string): string {
    return pathname === href
      ? 'text-sm font-medium text-stone-900'
      : 'text-sm text-stone-500 hover:text-stone-900'
  }

  return (
    <nav className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4 px-4 py-4">
      <Link
        href="/journal"
        className="text-base font-semibold tracking-tight text-stone-900 hover:text-stone-600"
      >
        MoodScribe
      </Link>
      <ul className="flex items-center gap-6">
        <li>
          <Link href="/journal" className={navClass('/journal')}>
            Journal
          </Link>
        </li>
        <li>
          <Link href="/stats" className={navClass('/stats')}>
            Stats
          </Link>
        </li>
        <li>
          <form action={logoutAction}>
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
  )
}
