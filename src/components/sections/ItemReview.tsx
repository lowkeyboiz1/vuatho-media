'use client'
import Image from 'next/image'
import { memo } from 'react'
interface ItemReviewProps {
  item: {
    id: number
    title: string
    author: string
    score: number
    avatarUrl: string
    date: string
    href: string
  }
}

const ItemReview = memo(({ item }: ItemReviewProps) => {
  const { id, title, author, score, avatarUrl, date, href } = item

  return (
    <div className='group relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-white p-4 pb-6 transition hover:bg-blue'>
      <div className='relative h-[260px] overflow-hidden rounded-2xl bg-gray-200'>
        <div className='absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100' />
        <div className='absolute left-1/2 top-1/2 w-[60%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white py-2.5 text-center text-sm font-bold uppercase opacity-0 transition group-hover:opacity-100'>
          Xem chi tiết
        </div>
        <Image src='/300tr.png' alt='300tr' className='size-full object-contain' height={1000} width={1000} />
      </div>
      <div className='flex flex-col items-center *:text-black *:group-hover:text-white'>
        <i>#{id}</i>
        <p className='text-lg font-bold'>{title}</p>
        <p>{author}</p>
        <i className='text-sm'> Ngày dự thi: {date}</i>
      </div>
    </div>
  )
})

ItemReview.displayName = 'ItemReview'

export default ItemReview
