'use client'

import PaginationCustom from '@/components/PaginationCustom'
import ItemReview from '@/components/sections/ItemReview'
import { useGetListPostImage } from '@/query/useGetListPost'
import { useState } from 'react'

function formatNumber(num: number): string {
  return num.toLocaleString('de-DE') // "de-DE" uses dots as thousand separators
}

const ListReview = ({ title, number }: { title: string; number: number }) => {
  const [page, setPage] = useState(1)
  const { data: listPostImage } = useGetListPostImage(page)

  const items = [
    { id: 1, title: 'Phim ngắn 1', author: 'Tác giả 1', score: 4.5, avatarUrl: 'https://via.placeholder.com/150', date: '2024-01-01', href: '#' },
    { id: 2, title: 'Phim ngắn 2', author: 'Tác giả 2', score: 4.5, avatarUrl: 'https://via.placeholder.com/150', date: '2024-01-01', href: '#' },
    { id: 3, title: 'Phim ngắn 3', author: 'Tác giả 3', score: 4.5, avatarUrl: 'https://via.placeholder.com/150', date: '2024-01-01', href: '#' },
    { id: 4, title: 'Phim ngắn 4', author: 'Tác giả 4', score: 4.5, avatarUrl: 'https://via.placeholder.com/150', date: '2024-01-01', href: '#' },
    { id: 5, title: 'Phim ngắn 5', author: 'Tác giả 5', score: 4.5, avatarUrl: 'https://via.placeholder.com/150', date: '2024-01-01', href: '#' },
    { id: 6, title: 'Phim ngắn 6', author: 'Tác giả 6', score: 4.5, avatarUrl: 'https://via.placeholder.com/150', date: '2024-01-01', href: '#' },
    { id: 7, title: 'Phim ngắn 7', author: 'Tác giả 7', score: 4.5, avatarUrl: 'https://via.placeholder.com/150', date: '2024-01-01', href: '#' }
  ]

  return (
    <div className='grid w-full grid-cols-4 items-center justify-center gap-5'>
      <div className='ml-10 flex flex-col gap-2'>
        <div>
          <p className='text-xl uppercase text-blue/80'>bài dự thi</p>
          <p className='text-4xl font-bold uppercase text-blue'>{title}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-sm'>Số bài dự thi đang có:</p>
          <p className='text-4xl font-bold text-yellow'>{formatNumber(number)}</p>
        </div>
      </div>
      {items.map((item) => (
        <ItemReview key={item.id} item={item} />
      ))}
      <div className='col-span-4 mt-4 flex w-full items-center justify-center'>
        <PaginationCustom page={page || 1} totalPages={listPostImage?.meta?.totalPages || 1} setPage={setPage} />
      </div>
    </div>
  )
}

export default ListReview
