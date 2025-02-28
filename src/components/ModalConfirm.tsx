'use client'

import { isOpenModalCompleteAtom, isOpenModalConfirmAtom, isOpenModalDetailAtom, postSelectedAtom } from '@/atoms/modal'
import { Button } from '@/components/ui/button'
import { useAtom, useAtomValue } from 'jotai'
import { Dialog, DialogContent, DialogTitle } from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'
import { useMutation } from '@tanstack/react-query'
import { postServices } from '@/services/api'
import { scoreAtom } from '@/atoms/vote'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const ModalConfirm = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenModalConfirmAtom)
  const [isOpenComplete, setIsOpenComplete] = useAtom(isOpenModalCompleteAtom)
  const [isOpenUpdateUser, setIsOpenUpdateUser] = useAtom(isOpenModalDetailAtom)

  const [postSelected, setPostSelected] = useAtom(postSelectedAtom)
  const [score, setScore] = useAtom(scoreAtom)
  const { mutate: mutateVote, isPending } = useMutation({
    mutationFn: ({ postId, vote }: { postId: string; vote: number }) => postServices.votePost(postId, vote),
    onSuccess: (res: any) => {
      toast.success('Bình chọn thành công')
      setIsOpen(false)
      setScore(0)
      setPostSelected(null)
      setIsOpenComplete(res.data.isUpdateUser)
      setIsOpenUpdateUser(res.data.isUpdateUser)
    }
  })

  if (!postSelected) return null

  const handleVote = () => {
    mutateVote({ postId: String(postSelected.id), vote: score })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <ScrollArea>
        <DialogTitle className='hidden'>Bài dự thi</DialogTitle>
        <DialogContent className='max-w-[600px] p-4 lg:px-8 lg:py-4 lg:pb-8'>
          <p className='text-center text-base font-bold lg:text-2xl'>Bạn xác nhận bình chọn bài dự thi này?</p>
          <div className='grid grid-cols-2 items-center justify-center gap-2'>
            <Button className='w-full rounded-full bg-[#D9D9D9] text-blue hover:bg-[#D9D9D9]/80'>Chọn lại</Button>
            <Button className='w-full rounded-full bg-yellow font-bold text-black hover:bg-yellow/80' onClick={handleVote} disabled={isPending}>
              {isPending ? <Loader2 className='size-4 animate-spin' /> : 'Xác nhận'}
            </Button>
          </div>
        </DialogContent>
      </ScrollArea>
    </Dialog>
  )
}

export default ModalConfirm
