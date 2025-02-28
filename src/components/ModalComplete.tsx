'use client'

import { isOpenModalCompleteAtom, isOpenModalDetailAtom } from '@/atoms/modal'
import { formSchema, FormValues } from '@/forms/formSchema'
import SubmissionForm from '@/forms/SubmissionForm'
import { FIELD_CONFIGS, TYPE_POST } from '@/lib/contants'
import { postServices } from '@/services/api'
import { pickFields, pickKeysOfSchema } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { memo } from 'react'
import { toast } from 'sonner'
import { useTranslation } from './TranslationProvider'
import { Dialog, DialogContent, DialogTitle } from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'
const ModalComplete = () => {
  const [isOpenUpdateUser, setIsOpenUpdateUser] = useAtom(isOpenModalDetailAtom)
  const [isOpenComplete, setIsOpenComplete] = useAtom(isOpenModalCompleteAtom)
  const { language } = useTranslation()
  const fieldsToKeep = ['name', 'phone']
  const newConfigs = pickFields(FIELD_CONFIGS(), fieldsToKeep)
  const newSchema = pickKeysOfSchema(formSchema(), fieldsToKeep)
  const { mutate: mutateUserInfo } = useMutation({
    mutationFn: (data: { name: string; phone: string }) => postServices.userInfo(data),
    onSuccess: () => {
      //reset form
      setIsOpenComplete(false)
      setIsOpenUpdateUser(false)
      toast.success('Cập nhật thông tin thành công')
    },
    onError: () => {
      toast.error('Cập nhật thông tin thất bại')
    }
  })
  const [isOpen, setIsOpen] = useAtom(isOpenModalCompleteAtom)
  const handleSubmit = (data: FormValues) => {
    mutateUserInfo({ name: data.name, phone: data.phone })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <ScrollArea>
        <DialogTitle className='hidden'>Bài dự thi</DialogTitle>
        <DialogContent className='max-w-[600px] p-4 lg:px-8 lg:py-4 lg:pb-8'>
          <div className='flex flex-col gap-4'>
            <p className='text-center text-2xl font-bold uppercase text-blue'>Cám ơn bạn đã bình chọn</p>
            <p className='font-meidum text-center text-xl'>
              Cơ hội nhận
              <span className='font-bold text-[#E92424]'> 1.000.000Đ </span>
              <br />
              dành cho khán giả bình chọn may mắn nhất
            </p>
            <p className='text-center text-xl font-bold uppercase'>Nhập thông tin để tham gia nhận thưởng</p>
          </div>
          <SubmissionForm
            classNameContainer='border-none shadow-none p-0'
            type={TYPE_POST.IMAGE}
            fieldConfigs={newConfigs}
            formSchema={newSchema}
            handleSubmit={handleSubmit}
            className='md:flex'
            note={<i className='text-center text-xs text-[#E92424]'>*Vui lòng nhập đúng số điện thoại để BTC liên hệ khi may mắn trúng giải.</i>}
          />
        </DialogContent>
      </ScrollArea>
    </Dialog>
  )
}

export default memo(ModalComplete)
