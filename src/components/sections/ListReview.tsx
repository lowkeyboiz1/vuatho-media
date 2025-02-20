'use client'

import PaginationCustom from '@/components/PaginationCustom'
import ItemReview from '@/components/sections/ItemReview'
import { useGetListPostImage, useGetListPostMedia } from '@/query/useGetListPost'
import { TYPE_POST } from '@/lib/contants'
import { useState } from 'react'

function formatNumber(num: number): string {
  return num.toLocaleString('de-DE') // "de-DE" uses dots as thousand separators
}

const ListReview = ({ title, type }: { title: string; type: string }) => {
  const [page, setPage] = useState({
    image: 1,
    video: 1
  })
  const isImage = type === TYPE_POST.IMAGE
  const { data: listPost } = isImage ? useGetListPostImage(page.image) : useGetListPostMedia(page.video)

  const handleSetPage = (newPage: number) => {
    setPage((prev) => ({
      ...prev,
      [isImage ? 'image' : 'video']: newPage
    }))
  }

  return (
    <div className='grid w-full grid-cols-4 items-center justify-center gap-5'>
      <div className='ml-10 flex flex-col gap-2'>
        <div>
          <p className='text-xl uppercase text-blue/80'>bài dự thi</p>
          <p className='text-4xl font-bold uppercase text-blue'>{title}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-sm'>Số bài dự thi đang có:</p>
          <p className='text-4xl font-bold text-yellow'>{formatNumber(listPost?.meta?.total || 0)}</p>
        </div>
      </div>
      {listPost?.data?.map((item) => <ItemReview key={item.id} item={item as any} />)}
      <div className='col-span-4 mt-4 flex w-full items-center justify-center'>
        <PaginationCustom page={isImage ? page.image : page.video} totalPages={listPost?.meta?.totalPages || 1} setPage={handleSetPage} />
      </div>
    </div>
  )
}

export default ListReview
