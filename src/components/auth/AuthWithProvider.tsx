'use client'
import { Button } from '@heroui/react'
import { Github, LogIn } from 'lucide-react'
import React from 'react'
import useLogWithProvider from '@/components/auth/hooks/useLogWithProvider'

export default function AuthWithProvider() {
  const [loadingProvider, setLoadingProvider] = React.useState<string | null>(null)
  const { logWithProvider } = useLogWithProvider()

  const handleClick = async (provider: 'google' | 'github') => {
    setLoadingProvider(provider)
    logWithProvider(provider)
  }

  return (
    <div className='w-full flex items-center justify-between gap-2'>
      <Button className='w-full' onClick={() => handleClick('github')} variant='bordered' isLoading={loadingProvider === 'github'} isDisabled={loadingProvider !== null} >{loadingProvider !== 'github' && <Github className="h-4 w-4" radius="sm" />} Github</Button>
      <Button className='w-full' onClick={() => handleClick('google')} variant='bordered' isLoading={loadingProvider === 'google'} isDisabled={loadingProvider !== null} >{loadingProvider !== 'google' && <LogIn className="h-4 w-4" radius="sm" />} Google</Button>
    </div>
  )
}
