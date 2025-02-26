'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import vi from '@/messages/vi.json'

// Create context
const TranslationContext = createContext<any>({})

// Custom hook to use TranslationContext
export const useTranslation = () => useContext(TranslationContext)

export const translate = (key: string) => {
  const { t } = useContext(TranslationContext)
  return t(key)
}
// Context Provider component
export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  //convert lang to locale
  const lang = localStorage.getItem('lang')
  const [language, setLanguage] = useState(lang || 'vi')
  const [trans, setTranslations] = useState<any>(vi)
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translateFile = (await import(`@/messages/${language}.json`))?.default
        console.log({ translateFile })
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
