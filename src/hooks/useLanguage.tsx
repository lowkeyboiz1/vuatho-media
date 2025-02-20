'use client'

import { useEffect, useState } from 'react'

export const useLanguage = () => {
  const [locale, setLocale] = useState<'VN' | 'EN'>('VN')

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale === 'VN' || savedLocale === 'EN') {
      setLocale(savedLocale)
    }
  }, [])

  const toggleLocale = () => {
    const newLocale = locale === 'VN' ? 'EN' : 'VN'
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  return { locale, toggleLocale }
}
