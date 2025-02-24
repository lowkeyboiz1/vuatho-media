'use client'

import { isOpenModalConfirmAtom, isOpenModalDetailAtom, postSelectedAtom } from '@/atoms/modal'
import { scoreAtom } from '@/atoms/vote'
import { SelectableStars } from '@/components/SelectableStars'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TYPE_POST } from '@/lib/contants'
import { getYoutubeId } from '@/utils'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useAtom, useAtomValue } from 'jotai'
import Image from 'next/image'
import { memo } from 'react'

const ModalDetail = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenModalDetailAtom)
  const postSelected = useAtomValue(postSelectedAtom)
  const [score, setScore] = useAtom(scoreAtom)
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useAtom(isOpenModalConfirmAtom)

  const handleVote = (score: number) => {
    setScore(score)
    setIsOpenModalConfirm(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <ScrollArea>
        <DialogTitle className='hidden'>Bài dự thi</DialogTitle>
        <DialogContent className='max-w-[900px] p-4 lg:px-8 lg:py-4 lg:pb-8'>
          <div className='flex flex-col gap-1'>
            <p>#{postSelected?.id}</p>
            <p className='text-xl font-bold'>{postSelected?.title}</p>
            <div className='flex items-center gap-2'>
              <p>{postSelected?.author}</p>|<p>Ngày dự thi: {postSelected?.created_at}</p>
            </div>
            <div className='my-2'>
              {postSelected?.type === TYPE_POST.IMAGE ? (
                <div className='h-[400px] overflow-hidden rounded-2xl'>
                  <Image src={postSelected?.thumbnail} alt={postSelected?.thumbnail} width={1000} height={1000} className='h-full w-full object-cover' />
                </div>
              ) : (
                <iframe
                  className='h-[400px] w-full overflow-hidden rounded-2xl'
                  src={`https://www.youtube.com/embed/${getYoutubeId(postSelected?.thumbnail || '')}`}
                  title={postSelected?.title}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              )}
            </div>
            <p className='text-sm text-gray-500'>{postSelected?.description}</p>
            <div className='mt-10 flex flex-col items-center justify-center gap-1 lg:flex-row'>
              <p>Bình chọn:</p>
              <SelectableStars onChange={handleVote} />
            </div>
          </div>
        </DialogContent>
      </ScrollArea>
    </Dialog>
  )
}

export default memo(ModalDetail)
