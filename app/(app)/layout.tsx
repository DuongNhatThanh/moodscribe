// Authenticated route group layout.
// Auth guard (redirect to /login if no session) added in Phase 4.
export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return <>{children}</>
}
