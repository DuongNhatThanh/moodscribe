export default function EntryListSkeleton(): React.ReactElement {
  return (
    <ul className="flex flex-col gap-4" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <li key={i} className="rounded-2xl border border-stone-200 bg-white p-4">
          <div className="flex flex-col gap-3 animate-pulse">
            <div className="h-3 w-20 rounded-full bg-stone-100" />
            <div className="flex flex-col gap-2">
              <div className="h-3 w-full rounded-full bg-stone-100" />
              <div className="h-3 w-4/5 rounded-full bg-stone-100" />
              <div className="h-3 w-3/5 rounded-full bg-stone-100" />
            </div>
            <div className="h-2.5 w-24 rounded-full bg-stone-100" />
          </div>
        </li>
      ))}
    </ul>
  )
}
