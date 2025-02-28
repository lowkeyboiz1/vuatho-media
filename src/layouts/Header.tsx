'use client'

import { isOpenModalSearchAtom } from '@/atoms/modal'
import { LogoIcon } from '@/components/Icons'
import ToggleVote from '@/components/ToggleVote'
import { translate, useTranslation } from '@/components/TranslationProvider'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { LogOut, Search, User } from 'lucide-react'
import Link from 'next/link'
import { memo, useCallback, useEffect, useState } from 'react'

const Header = () => {
  const { language, changeLanguage } = useTranslation()

  const token = localStorage.getItem('token')
  const [isLogin, setIsLogin] = useState(!!token)
  const [, setIsOpenModalSearch] = useAtom(isOpenModalSearchAtom)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  const t = translate('Header')

  // console.log({ t, title: t.title })

  const toggleLanguage = useCallback(() => {
    console.log({ language })
    changeLanguage((language === 'vi' ? 'En' : 'Vi').toLowerCase())
  }, [changeLanguage, language])

  useEffect(() => {
    const savedLanguage = localStorage.getItem('lang')
    if (savedLanguage) {
      changeLanguage(savedLanguage)
    }
  }, [changeLanguage])

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

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 h-[60px] py-2.5 shadow-[0px_4px_3.5px_0px_#00000021] transition-all duration-300 backdrop:blur-xl',
        isScrolled ? 'bg-white' : 'bg-blue/10',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className='container mx-auto flex h-full items-center justify-between px-4'>
        <Link href='/' className='size-[50px]'>
          <LogoIcon className='size-full object-cover' />
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
                {isMounted && navigator?.platform?.toLowerCase()?.includes('mac') ? <span className='text-xs'>⌘</span> : <span className='text-xs'>Ctrl</span>}
              </kbd>
              <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-gray-200 bg-white/95 px-1.5 font-mono text-[10px] font-medium text-gray-600 opacity-80'>
                K
              </kbd>
            </div>
          </ButtonHeader>

          <ButtonHeader onClick={toggleLanguage} className='h-10 w-10 bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg'>
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </ButtonHeader>
          {isLogin ? (
            <ButtonHeader
              onClick={() => {
                localStorage.removeItem('token')
                setIsLogin(false)
              }}
              className='flex h-10 w-10 items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg md:w-auto md:px-4'
            >
              <LogOut size={16} />
              <p className='hidden font-medium md:block'>Đăng xuất</p>
            </ButtonHeader>
          ) : (
            <Link href={`${process.env.NEXT_PUBLIC_LOGIN_URL}/auth/google`} className='w-auto'>
              <ButtonHeader className='flex h-10 w-10 items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg md:w-auto md:px-4'>
                <User size={16} />
                <p className='hidden font-medium md:block'>Đăng nhập</p>
              </ButtonHeader>
            </Link>
          )}

          <ToggleVote />
        </div>
      </div>
    </header>
  )
}

const ButtonHeader = memo(({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  return (
    <button onClick={onClick} className={cn('flex cursor-pointer items-center justify-center rounded-lg bg-[#0051E3] text-sm text-white active:scale-95', className)}>
      {children}
    </button>
  )
})

export default memo(Header)
