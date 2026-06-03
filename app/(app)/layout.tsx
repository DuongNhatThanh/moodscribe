import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import AppNav from '@/components/app-nav'

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
        <AppNav logoutAction={handleLogout} />
      </header>

      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}
