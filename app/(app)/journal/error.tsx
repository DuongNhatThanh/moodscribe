'use client'

type ErrorProps = {
  error: Error
  reset: () => void
}

export default function JournalError({ reset }: ErrorProps): React.ReactElement {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-10">
      <p className="text-sm text-stone-600">
        Something went wrong loading your entries.
      </p>
      <button
        type="button"
        onClick={reset}
        className="self-start rounded-full border border-stone-200 px-4 py-1.5 text-sm text-stone-600 hover:bg-stone-100"
      >
        Try again
      </button>
    </main>
  )
}
