'use client'

import { useFormStatus } from 'react-dom'

export default function DeleteButton(): React.ReactElement {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      aria-label="Delete entry"
      disabled={pending}
      className="text-xs text-stone-400 hover:text-red-500 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? 'Deleting…' : 'Delete'}
    </button>
  )
}
