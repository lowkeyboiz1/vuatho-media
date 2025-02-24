'use client'

import { tokenAtom } from '@/atoms/token'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
export default function Providers({ children }: { children: React.ReactNode }) {
  const setToken = useSetAtom(tokenAtom)
  useEffect(() => {
    const url = new URL(window.location.href)
    const token = url.searchParams.get('token')
    console.log({ token })
    if (token) {
      setToken(token)
      localStorage.setItem('token', token)
    }
  }, [])
  return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
}
