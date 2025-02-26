'use client'
import { TPost } from '@/types'
import Image from 'next/image'
import { memo } from 'react'
import { Button } from '../ui/button'
import { isCanVoteAtom } from '@/atoms/switch'
import { useAtomValue } from 'jotai'
interface ItemReviewProps {
  item: TPost
  onClick: () => void
}

const ItemReview = memo(({ item, onClick }: ItemReviewProps) => {
  const { id, title, author, created_at, total_score } = item
  const isCanVote = useAtomValue(isCanVoteAtom)

  return (
    <div className='group relative flex cursor-pointer flex-col gap-4 overflow-hidden rounded-2xl bg-white p-4 pb-6 transition hover:bg-blue' onClick={onClick}>
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
        <i className='text-sm'> Ngày dự thi: {created_at}</i>
      </div>
      {isCanVote && (
        <>
          <div className='h-px bg-gradient-to-r from-[#054ABA] via-[#279DE7] to-[#054ABA] px-10 opacity-0 transition group-hover:opacity-100' />
          <p className='text-center text-sm group-hover:text-white'>Điểm bình chọn: {total_score.toLocaleString('en-US')}</p>
          <Button
            onClick={onClick}
            className='w-full rounded-full border border-blue bg-transparent font-bold uppercase text-blue shadow-none hover:bg-transparent hover:text-white group-hover:border-white group-hover:text-white'
          >
            Bình chọn ngay
          </Button>
        </>
      )}
    </div>
  )
})

export default ItemReview
