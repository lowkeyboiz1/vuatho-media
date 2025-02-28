import { memo } from 'react'

import { useGetArticle } from '@/query/useGetArticle'
import Article, { ArticleOtherUrl } from '@/components/Article'
import { SkeletonBlog } from '@/components/SkeletonBlog'
import Image from 'next/image'

const Blog = () => {
  const lang = localStorage.getItem('lang')

  const { data: listBlog, isLoading } = useGetArticle(lang || 'vi')

  if (!listBlog)
    return (
      <div className='col-span-4 flex w-full flex-col items-center gap-4'>
        <Image src={'/press/no-data.png'} alt='no-data' height={400} width={400} className='size-[200px] w-auto' />
        <p className='text-xl text-[#282828]'>Chưa có dữ liệu</p>
      </div>
    )

  return (
    <div className='flex flex-col gap-4 p-4'>
      <h1 className='text-4xl font-bold uppercase text-blue'>TIN TỨC</h1>
      <div className='blog-home flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden p-1 lg:grid lg:grid-cols-4 lg:gap-5'>
        {isLoading ? (
          Array(4)
            .fill(null)
            .map((_, index: number) => (
              <div className='w-[80%] md:w-[40%] lg:w-full' key={`skeleton-blog-${index}`}>
                <SkeletonBlog />
              </div>
            ))
        ) : !!listBlog?.data?.length ? (
          listBlog.data.map((item: any, index: number) => {
            return !!item?.redirect_url?.length ? (
              <ArticleOtherUrl key={index} item={item} className='block w-[80%] cursor-pointer md:w-[40%] lg:w-full' />
            ) : (
              <Article key={index} item={item} className='w-[80%] cursor-pointer md:w-[40%] lg:w-full' />
            )
          })
        ) : (
          <div className='col-span-4 flex w-full flex-col items-center gap-4'>
            <Image src={'/press/no-data.png'} alt='no-data' height={400} width={400} className='size-[200px] w-auto' />
            <p className='text-xl text-[#282828]'>Chưa có dữ liệu</p>
            {/* <p className='text-xl text-[#282828]'>{t('noData')}</p> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(Blog)
