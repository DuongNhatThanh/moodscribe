'use client'

// Textarea + Analyze button — always a Client Component (event handlers).
// Full implementation in Phase 1.
export default function EntryForm(): React.ReactElement {
  return (
    <div>
      <textarea placeholder="Write your journal entry…" />
      <button type="button">Analyze</button>
    </div>
  )
}
