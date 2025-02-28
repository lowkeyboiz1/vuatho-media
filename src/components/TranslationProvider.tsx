'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import vi from '@/messages/vi.json'

// Create context
const TranslationContext = createContext<any>({})

// Custom hook to use TranslationContext
export const useTranslation = (): { language: string; changeLanguage: (newLanguage: string) => void; t: (key: string) => string } => useContext(TranslationContext)

export const translate = (key: string) => {
  const { t } = useContext(TranslationContext)
  return t(key)
}
// Context Provider component
export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  //convert lang to locale
  const [language, setLanguage] = useState('vi')
  const [trans, setTranslations] = useState<any>(vi)

  useEffect(() => {
    const lang = localStorage.getItem('lang') || 'vi'
    setLanguage(lang)
  }, [])
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translateFile = (await import(`@/messages/${language}.json`))?.default
        setTranslations(translateFile)
      } catch (error) {
        console.error('Error loading translations:', error)
      }
    }

    loadTranslations()
  }, [language])

  // Function to get messages
  const getMessages = (key: string) => {
    const keys = key?.split('.')
    let result = trans
    for (const k of keys) {
      result = result[k]
      if (!result) {
        return null // Trả về null nếu không tìm thấy key
      }
    }
    return result
  }

  // Function to change language
  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage)
    localStorage.setItem('lang', newLanguage)
  }

  return <TranslationContext.Provider value={{ language, changeLanguage, t: getMessages }}>{children}</TranslationContext.Provider>
}
