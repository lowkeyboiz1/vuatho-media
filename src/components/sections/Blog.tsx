import React, { memo, useCallback, useEffect, useState } from 'react'

import { instance } from '@/services/instance'
import { useTranslation } from '../TranslationProvider'
// import { useLocale, useTranslations } from 'next-intl'

import { SkeletonBlog } from '../SkeletonBlog'
import ImageFallback from '../ImageFallback'
import Article, { ArticleOtherUrl } from '../Article'

const Blog = () => {
  // const t = useTranslation('PressHome')
  // const locale = useLocale()
  const lang = localStorage.getItem('lang')

  const [onFetching, setOnFetching] = useState<boolean>()
  const [listBlog, setListBlog] = useState([])

  const serverFetching = useCallback(async () => {
    try {
      const { data } = await instance.get('/home/blogs', {
        params: {
          lang: lang
        }
      })
    } catch (error) {
      console.log(error)
      setOnFetching(false)
    } finally {
      setOnFetching(false)
    }
  }, [lang])

  useEffect(() => {
    onFetching && serverFetching()
  }, [onFetching, serverFetching])

  useEffect(() => {
    lang && setOnFetching(true)
  }, [lang])

  return (
    <div className='flex flex-col gap-4 p-4'>
      <h1 className='text-4xl font-bold uppercase text-blue'>TIN TỨC</h1>
      <div className='blog-home flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden p-1 lg:grid lg:grid-cols-4 lg:gap-5'>
        {onFetching ? (
          Array(4)
            .fill(null)
            .map((_, index: number) => (
              <div className='w-[80%] md:w-[40%] lg:w-full' key={`skeleton-blog-${index}`}>
                <SkeletonBlog />
              </div>
            ))
        ) : !!listBlog?.length ? (
          listBlog.map((item: any, index: number) => {
            return !!item?.redirect_url?.length ? (
              <ArticleOtherUrl key={index} index={index} item={item} style='block w-[80%] md:w-[40%] lg:w-full cursor-pointer' />
            ) : (
              <Article key={index} index={index} item={item} style='w-[80%] md:w-[40%] lg:w-full cursor-pointer' />
            )
          })
        ) : (
          <div className='col-span-4 flex w-full flex-col items-center gap-4'>
            <ImageFallback src={'/press/no-data.png'} alt='no-data' height={400} width={400} className='size-[200px] w-auto' />
            <p className='text-xl text-[#282828]'>Chưa có dữ liệu</p>
            {/* <p className='text-xl text-[#282828]'>{t('noData')}</p> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(Blog)
