'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

import { translate, useTranslation } from '@/components/TranslationProvider'
import Image from 'next/image'

type ArticleProps = {
  item: any
  className?: string
}
const Article = ({ item, className }: ArticleProps) => {
  const { language } = useTranslation()
  const t = translate('Article')
  const prefix = `https://vuatho.com/${language}`
  return (
    <motion.div className={twMerge('group flex w-full flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl bg-white', className)}>
      <Link target='_blank' href={`${prefix}/${item?.slug}`} className='h-[150px] w-full overflow-hidden object-contain transition hover:scale-105 lg:h-[200px]'>
        <Image loading='lazy' src={item?.thumb} alt={item?.thumb} height={210} width={350} className={`h-full w-full object-cover transition`} />
      </Link>
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex items-center justify-between text-sm'>
          <Link
            target='_blank'
            href={`${prefix}/press/${item?.category?.slug}`}
            dangerouslySetInnerHTML={{ __html: !!item?.custom_label?.length ? item?.custom_label : item?.category?.title }}
            className='hover:/80 text-sm text-[#6a6a6a] hover:cursor-pointer'
          />
          <Link target='_blank' href={`${prefix}/${item?.slug}`}>
            <time className='text-sm text-[#6a6a6a]'>{item?.created_at}</time>
          </Link>
        </div>
        <Link target='_blank' href={`${prefix}/${item?.slug}`} className='line-clamp-2 min-h-[56px] text-base font-semibold lg:text-lg' title={item?.title}>
          {item?.title}
        </Link>

        <Link target='_blank' href={`${prefix}/${item?.slug}`}>
          <p className='text-primary-yellow text-center font-semibold text-yellow'>{t.text1}</p>
        </Link>
      </div>
    </motion.div>
  )
}

export const ArticleOtherUrl = ({ item, className }: ArticleProps) => {
  const t = translate('Article')

  return (
    <div className={className}>
      <Link target='_blank' href={item?.redirect_url}>
        <motion.div className={twMerge('group flex w-full flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl bg-white')}>
          <Image
            loading='lazy'
            src={item?.thumb}
            alt='Article image'
            height={210}
            width={350}
            className='h-[150px] w-full min-w-[350px] overflow-hidden object-contain transition hover:scale-105 lg:h-[200px]'
          />
          <div className='flex flex-col gap-4 p-4'>
            <div className='flex items-center justify-between text-sm'>
              <p dangerouslySetInnerHTML={{ __html: !!item?.custom_label?.length ? item?.custom_label : item?.category?.title }} className='hover:/80 text-sm text-[#6a6a6a] hover:cursor-pointer' />
              <time className='text-sm text-[#6a6a6a]'>{item?.created_at}</time>
            </div>
            <p className='line-clamp-2 text-base font-semibold lg:text-lg'>{item?.title}</p>
            <p className='text-primary-yellow text-right font-semibold'>{t.text1}</p>
          </div>
        </motion.div>
      </Link>
    </div>
  )
}

export default memo(Article)
