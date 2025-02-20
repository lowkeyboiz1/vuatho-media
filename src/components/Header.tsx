'use client'
import Image from 'next/image'
import { memo, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { User, Search } from 'lucide-react'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { isOpenModalSearchAtom } from '@/atoms/modal'

const Header = () => {
  const [language, setLanguage] = useState('VN')
  const [, setIsOpenModalSearch] = useAtom(isOpenModalSearchAtom)

  const toggleLanguage = () => {
    const newLanguage = language === 'VN' ? 'EN' : 'VN'
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  const getGoogleAuthUrl = () => {
    const url = 'https://accounts.google.com/o/oauth2/auth'
    const query = {
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
      response_type: 'code',
      scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'].join(' '),
      prompt: 'consent'
    }
    const queryString = new URLSearchParams(query).toString()
    const result = `${url}?${queryString}`
    console.log({ result })
    const reusult1 = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!}&response_type=code&scope=email%20profile`
    console.log({ reusult1 })
    return reusult1
    // return result
  }

  useEffect(() => {
    // Get saved language from localStorage on mount
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  return (
    <header className='fixed left-0 right-0 top-0 z-50 h-full max-h-[60px] bg-blue/10 py-4 shadow-[0px_4px_3.5px_0px_#00000021] backdrop:blur-xl'>
      <div className='container mx-auto flex h-full items-center justify-between px-4'>
        <div className=''>
          <Image src='/300tr.png' alt='logo' width={100} height={100} />
        </div>
        <div className='flex items-center gap-2'>
          <ButtonHeader onClick={() => setIsOpenModalSearch(true)} className='flex w-auto items-center justify-between gap-10 rounded-full bg-[#DDE9FF] px-5 text-sm text-blue/70'>
            <i>Nhập số ID của bạn...</i>
            <Search size={16} className='text-blue' />
          </ButtonHeader>
          <ButtonHeader onClick={toggleLanguage}>{language}</ButtonHeader>
          <Link href={getGoogleAuthUrl()} className='w-auto'>
            <ButtonHeader className='flex w-auto items-center gap-2.5 px-3'>
              <span>
                <User size={16} />
              </span>
              <p>Đăng nhập</p>
            </ButtonHeader>
          </Link>
        </div>
      </div>
    </header>
  )
}

const ButtonHeader = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  return (
    <div onClick={onClick} className={cn('flex size-10 cursor-pointer items-center justify-center rounded-lg bg-[#0051E3] text-sm text-white', className)}>
      {children}
    </div>
  )
}

export default memo(Header)
