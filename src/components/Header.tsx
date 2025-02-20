'use client'

import { isOpenModalSearchAtom } from '@/atoms/modal'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { Search, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useCallback, useEffect, useState } from 'react'

const Header = () => {
  const [language, setLanguage] = useState('VN')
  const [, setIsOpenModalSearch] = useAtom(isOpenModalSearchAtom)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const newLanguage = prev === 'VN' ? 'EN' : 'VN'
      localStorage.setItem('language', newLanguage)
      return newLanguage
    })
  }, [])

  const getGoogleAuthUrl = useCallback(() => {
    const url = 'https://accounts.google.com/o/oauth2/auth'
    const query = {
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
      response_type: 'code',
      scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'].join(' '),
      prompt: 'consent'
    }
    return `${url}?${new URLSearchParams(query).toString()}`
  }, [])

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    let rafId: number
    let lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          setIsScrolled(currentScrollY > 100)
          setIsVisible(currentScrollY <= lastScrollY)
          lastScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  const openSearchModal = useCallback(() => {
    setIsOpenModalSearch(true)
  }, [setIsOpenModalSearch])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        openSearchModal()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [openSearchModal])

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 h-[60px] py-2.5 shadow-[0px_4px_3.5px_0px_#00000021] transition-all duration-300 backdrop:blur-xl',
        isScrolled ? 'bg-white' : 'bg-blue/10',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className='container mx-auto flex h-full items-center justify-between px-4'>
        <Link href='/'>
          <Image src='/300tr.png' alt='logo' width={90} height={90} priority className='h-auto w-auto' />
        </Link>

        <div className='flex items-center gap-2'>
          <ButtonHeader
            onClick={openSearchModal}
            className='flex h-10 w-auto min-w-[280px] items-center justify-between gap-3 rounded-full bg-[#DDE9FF] px-4 text-sm text-blue/70 transition-all duration-200 hover:bg-[#CCE0FF] hover:shadow-md'
          >
            <div className='flex items-center gap-2'>
              <Search size={16} className='text-blue' />
              <span className='text-gray-600'>Nhập số ID của bạn...</span>
            </div>
            <div className='flex items-center gap-1'>
              <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-gray-200 bg-white/95 px-1.5 font-mono text-[10px] font-medium text-gray-600 opacity-80'>
                {navigator?.platform?.toLowerCase()?.includes('mac') ? <span className='text-xs'>⌘</span> : <span className='text-xs'>Ctrl</span>}
              </kbd>
              <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-gray-200 bg-white/95 px-1.5 font-mono text-[10px] font-medium text-gray-600 opacity-80'>
                K
              </kbd>
            </div>
          </ButtonHeader>

          <ButtonHeader onClick={toggleLanguage} className='h-10 w-10 bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg'>
            {language}
          </ButtonHeader>

          <Link href={getGoogleAuthUrl()} className='w-auto'>
            <ButtonHeader className='flex h-10 w-10 items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg md:w-auto md:px-4'>
              <User size={16} />
              <p className='hidden font-medium md:block'>Đăng nhập</p>
            </ButtonHeader>
          </Link>
        </div>
      </div>
    </header>
  )
}

const ButtonHeader = memo(({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn('flex cursor-pointer items-center justify-center rounded-lg bg-[#0051E3] text-sm text-white', className)}
    >
      {children}
    </motion.div>
  )
})

export default memo(Header)
