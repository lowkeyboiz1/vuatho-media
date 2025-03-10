'use client'

import HeroBanner from '@/components/HeroBanner'
import Blog from '@/components/sections/Blog'
import HeroContent from '@/components/sections/HeroContent'
import ListReview from '@/components/sections/ListReview'
import { translate } from '@/components/TranslationProvider'
import { TYPE_POST } from '@/lib/contants'
import Image from 'next/image'

export default function Home() {
  const s = translate('Header')

  return (
    <div className='flex flex-col'>
      <div className='relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]'>
        <div className='z-1 absolute inset-0'>
          <HeroBanner />
        </div>
      </div>

      <div className='container mx-auto *:py-10 lg:py-24 *:lg:py-24'>
        <HeroContent />
        <div className='flex items-center justify-center'>
          <div className='w-[800px]'>
            <Image src='/300tr.png' alt='300tr' width={1000} height={1000} />
          </div>
        </div>
        <ListReview title='phim ngắn' type={TYPE_POST.VIDEO} />
        <ListReview title='nhiếp ảnh' type={TYPE_POST.IMAGE} />
        <Blog />
      </div>
    </div>
  )
}
