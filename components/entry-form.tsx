'use client'

import { useState } from 'react'

const MIN_LENGTH = 10
const MAX_LENGTH = 2000
const WARN_LENGTH = 1800

// EntryForm is the only Client Component in Phase 1 — it owns textarea
// state and the Analyze button interaction. API wiring is added in Phase 2.
export default function EntryForm(): React.ReactElement {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const length = content.length
  const tooShort = length < MIN_LENGTH
  const tooLong = length > MAX_LENGTH
  const isDisabled = tooShort || tooLong || isLoading

  // Simulated loading: only resets isLoading — content is intentionally kept.
  // Real API call replaces this stub in Phase 2.
  async function handleAnalyze(): Promise<void> {
    if (isDisabled) return
    setIsLoading(true)
    await new Promise<void>((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const counterColor =
    tooLong
      ? 'text-red-500'
      : length >= WARN_LENGTH
        ? 'text-amber-500'
        : 'text-stone-400'

  return (
    <div className="flex flex-col gap-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your journal entry…"
        rows={6}
        className="w-full resize-none rounded-2xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-800 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none"
      />

      <div className="flex items-center justify-between">
        <span className={`text-xs tabular-nums ${counterColor}`}>
          {length} / {MAX_LENGTH}
        </span>

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={isDisabled}
          className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLoading && (
            <span
              aria-hidden="true"
              className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent"
            />
          )}
          {isLoading ? 'Analyzing…' : 'Analyze'}
        </button>
      </div>
    </div>
  )
}
