'use client'

import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

import { ChevronRight } from 'lucide-react'
import ImageFallback from './ImageFallback'

type Props = {
  item: any
  style?: string
}

const Article = ({ item, style, index }: Props & { index: number }) => {
  const locale = useLocale()
  const t = useTranslations('RuleOfBehavior')
  return (
    <motion.div className={twMerge('group flex w-full flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-[0px_4px_8px_0px_#50505029]', style)}>
      <Link href={`/${locale}/${item?.slug}`} className='h-[150px] w-full overflow-hidden object-contain transition hover:scale-105 lg:h-[200px]'>
        <ImageFallback loading='lazy' src={item?.thumb} alt='Article image' height={210} width={350} className={`h-full w-full object-cover transition`} />
      </Link>
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex items-center justify-between text-sm'>
          <Link
            href={`/${locale}/press/${item?.category?.slug}`}
            dangerouslySetInnerHTML={{ __html: !!item?.custom_label?.length ? item?.custom_label : item?.category?.title }}
            className='hover:/80 text-sm text-[#6a6a6a] hover:cursor-pointer'
          />
          <Link href={`/${locale}/${item?.slug}`}>
            <time className='text-sm text-[#6a6a6a]'>{item?.created_at}</time>
          </Link>
        </div>
        <Link href={`/${locale}/${item?.slug}`} className='line-clamp-2 min-h-[56px] text-base font-semibold lg:text-lg' title={item?.title}>
          {item?.title}
        </Link>
        {/* <div className='line-clamp-3 text-lg  text-[#6a6a6a]' dangerouslySetInnerHTML={{ __html: item?.short_description }} /> */}
        {/* khang */}
        <Link href={`/${locale}/${item?.slug}`}>
          <p className='text-primary-yellow text-right font-semibold'>{t('text57')}</p>
        </Link>
      </div>
    </motion.div>
  )
}

export const ArticleOtherUrl = ({ item, style, index }: Props & { index: number }) => {
  const t = useTranslations('RuleOfBehavior')

  return (
    <div className={style}>
      <Link href={item?.redirect_url} target='_blank'>
        <motion.div className={twMerge('group flex w-full flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-[0px_4px_8px_0px_#50505029]')}>
          <ImageFallback
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
            {/* <div className='line-clamp-3 text-lg  text-[#6a6a6a]' dangerouslySetInnerHTML={{ __html: item?.short_description }} /> */}
            <p className='text-primary-yellow text-right font-semibold'>{t('text57')}</p>
          </div>
        </motion.div>
      </Link>
    </div>
  )
}

export default memo(Article)
