'use client'
import { useState, useEffect } from 'react'

export type Language = 'VN' | 'EN'

export function useLanguage() {
  const [locale, setLocale] = useState<Language>('VN')

  useEffect(() => {
    // Get saved language from localStorage on mount
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage) {
      setLocale(savedLanguage)
    }
  }, [])

  return {
    locale
  }
}
