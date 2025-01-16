'use client'

import { getError } from '@/utils/errorCache'

export default function ErrorMessage({ context }: { context: string }) {
    console.log(context)
  const error = getError(context)

  if (!error) return null

  return <p style={{ color: 'red' }}>{error.message}</p>
}