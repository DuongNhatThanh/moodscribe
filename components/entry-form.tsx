'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Mood, MoodResult } from '@/lib/types'
import MoodBadge from '@/components/mood-badge'
import { saveEntry } from '@/actions/entries'

const MIN_LENGTH = 10
const MAX_LENGTH = 2000
const WARN_LENGTH = 1800

const VALID_MOODS: readonly Mood[] = [
  'happy', 'sad', 'anxious', 'calm', 'angry', 'reflective', 'grateful', 'overwhelmed',
]

function isMoodResult(value: unknown): value is MoodResult {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v.mood === 'string' &&
    typeof v.emoji === 'string' &&
    typeof v.affirmation === 'string' &&
    VALID_MOODS.includes(v.mood as Mood)
  )
}

export default function EntryForm(): React.ReactElement {
  const router = useRouter()

  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<MoodResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [limitError, setLimitError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  const length = content.length
  const tooShort = length < MIN_LENGTH
  const tooLong = length > MAX_LENGTH
  const isDisabled = tooShort || tooLong || isLoading

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setContent(e.target.value)
    // Clear stale analysis result and all error states when the user edits
    if (result !== null) setResult(null)
    if (error !== null) setError(null)
    if (limitError !== null) setLimitError(null)
    if (saveError !== null) setSaveError(null)
  }

  async function handleAnalyze(): Promise<void> {
    if (isDisabled) return
    setIsLoading(true)
    setResult(null)
    setError(null)
    setLimitError(null)
    setSaveError(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })

      const data: unknown = await response.json()

      if (!response.ok) {
        const message =
          typeof data === 'object' &&
          data !== null &&
          typeof (data as Record<string, unknown>).error === 'string'
            ? (data as Record<string, unknown>).error as string
            : 'Something went wrong. Please try again.'
        if (response.status === 429) {
          setLimitError(message)
        } else {
          setError(message)
        }
        return
      }

      if (!isMoodResult(data)) {
        setError('Received an unexpected response. Please try again.')
        return
      }

      // Analysis succeeded — display the result immediately, then persist
      setResult(data)

      try {
        await saveEntry(content, data)
        // Revalidate the Server Component tree so the new entry appears in the list
        router.refresh()
        // Only clear the textarea when both analysis and save succeed
        setContent('')
      } catch {
        // Save failure is non-blocking: the mood result stays visible
        setSaveError('Your entry was analysed but could not be saved. Please try again.')
      }
    } catch {
      setError('Could not reach the server. Check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const counterColor =
    tooLong
      ? 'text-red-500'
      : length >= WARN_LENGTH
        ? 'text-amber-500'
        : 'text-stone-400'

  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={content}
        onChange={handleContentChange}
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

      {error !== null && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {limitError !== null && (
        <p role="alert" className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
          {limitError}
        </p>
      )}

      {result !== null && (
        <div className="flex flex-col gap-2 rounded-2xl border border-stone-200 bg-white p-4">
          <MoodBadge mood={result.mood} emoji={result.emoji} />
          <p className="text-sm leading-relaxed text-stone-600">{result.affirmation}</p>
        </div>
      )}

      {saveError !== null && (
        <p role="alert" className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
          {saveError}
        </p>
      )}
    </div>
  )
}
