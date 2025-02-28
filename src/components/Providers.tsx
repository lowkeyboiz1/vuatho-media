'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { TranslationProvider } from '@/components/TranslationProvider'

// Create a single QueryClient instance
const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      const token = url.searchParams.get('token')
      if (token) {
        localStorage.setItem('token', token)
      }
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>{children}</TranslationProvider>
    </QueryClientProvider>
  )
}
