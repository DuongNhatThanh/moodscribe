import EntryCard from '@/components/entry-card'
import { getEntries } from '@/actions/entries'

export default async function EntryList(): Promise<React.ReactElement> {
  const entries = await getEntries()

  if (entries.length === 0) {
    return (
      <p className="text-sm text-stone-400">
        No entries yet. Write something above to get started.
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-4">
      {entries.map((entry) => (
        <li key={entry.id}>
          <EntryCard entry={entry} />
        </li>
      ))}
    </ul>
  )
}
