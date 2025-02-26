'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { TranslationProvider } from '@/components/TranslationProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const url = new URL(window.location.href)
    const token = url.searchParams.get('token')
    if (token) {
      localStorage.setItem('token', token)
    }
  }, [])

  return (
    <QueryClientProvider client={new QueryClient()}>
      <TranslationProvider>{children}</TranslationProvider>
    </QueryClientProvider>
  )
}
