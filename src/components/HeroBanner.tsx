'use client'
import React from 'react'
import Lottie from 'lottie-react'
import LottieBannerVi from '@/lottie/data-VN.json'
import LottieBannerEn from '@/lottie/data-EN.json'
import { useLanguage } from '@/hooks/useLanguage'

const HeroBanner = () => {
  const { locale } = useLanguage()
  return <Lottie animationData={locale === 'VN' ? LottieBannerVi : LottieBannerEn} loop={true} />
}

export default HeroBanner
