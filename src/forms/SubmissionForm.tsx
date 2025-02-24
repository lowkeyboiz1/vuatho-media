import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { defaultValues } from '@/forms/formDefaults'
import { formSchema, FormValues } from '@/forms/formSchema'
import { TYPE_INPUT, TypePost } from '@/lib/contants'
import { useCreatePost } from '@/query/useCreatePost'
import { postServices } from '@/services/api'
import { SectionConfig } from '@/types'
import { convertToNewFormat, getRequiredFields, objectToFormData } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Pencil, Plus, Trash } from 'lucide-react'
import React, { memo, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type TSubmissionForm = {
  title: string
  type: TypePost
  fieldConfigs: SectionConfig[]
  formSchema: any
}

const SubmissionForm = ({ title, type, fieldConfigs, formSchema }: TSubmissionForm) => {
  const [imageToUpdateIndex, setImageToUpdateIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const { mutate: createPost, isPending } = useCreatePost({
    onSuccess: () => {
      // form.reset()
      // setPreviewImages([])
      toast('Bài dự thi đã được gửi thành công')
    }
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema as any),
    defaultValues: useMemo(() => defaultValues, [])
  })

  //  Xử lý sự kiện khi chọn file ảnh
  const handleImageUpload = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (!files || files.length === 0) return

      const newFile = files[0]
      const newImageUrl = URL.createObjectURL(newFile)
      const currentFiles = form.getValues('artworkFile') || []

      let updatedFiles = [...currentFiles]
      let updatedImages = [...previewImages]

      if (imageToUpdateIndex !== null) {
        updatedFiles[imageToUpdateIndex] = newFile // Thay thế file cũ
        updatedImages[imageToUpdateIndex] = newImageUrl // Thay thế ảnh cũ
      } else {
        updatedFiles.push(newFile) // Thêm file mới
        updatedImages.push(newImageUrl) // Thêm ảnh mới
      }

      form.setValue('artworkFile', updatedFiles, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
      setPreviewImages(updatedImages)

      setImageToUpdateIndex(null) // Reset state
      event.target.value = ''
    },
    [form, imageToUpdateIndex, previewImages]
  )

  //  Xóa ảnh khỏi danh sách
  const handleRemoveImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
    form.setValue('artworkFile', form.getValues('artworkFile')?.filter((_, i) => i !== index) || [])
  }

  //  Cập nhật ảnh (mở input file)
  const handleUpdateImage = (index: number) => {
    setImageToUpdateIndex(index)
    fileInputRef.current?.click()
  }
  //  Chọn file
  const handleClickFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data)
    const newData = convertToNewFormat(data, type, 1)
    const formData = objectToFormData(newData)
    createPost(formData)
  }

  const requiredFields = React.useMemo(() => getRequiredFields(formSchema), [formSchema])

  return (
    <Card className='mx-auto w-full max-w-4xl p-6'>
      <CardContent>
        <p className='py-5 text-center text-2xl font-bold uppercase text-blue'>{title}</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {fieldConfigs.map((item, index) => {
              return (
                <div key={index}>
                  <h3 className='my-4 text-lg font-semibold'>{item.title}</h3>
                  <div className='flex w-full grid-cols-1 flex-col gap-4 md:grid md:grid-cols-2'>
                    {Object.entries(item.fields).map(([key, config]) => {
                      const isRequired = requiredFields.has(key as keyof FormValues)
                      // Nếu là artworkFile thì render UI upload file
                      if (key === 'artworkFile') {
                        return (
                          <div className='col-span-2 w-full'>
                            <Controller
                              key={key}
                              control={form.control}
                              name='artworkFile'
                              render={({ field }) => (
                                <FormItem>
                                  <div className='w-full space-y-2'>
                                    <FormLabel>Hình ảnh tác phẩm {isRequired && <span className='text-red-500'>*</span>}</FormLabel>
                                    <input type='file' ref={fileInputRef} className='hidden' accept='image/*' multiple onChange={handleImageUpload} />
                                    <div className='mt-2 flex w-full flex-wrap gap-2'>
                                      {previewImages.map((src, index) => (
                                        <div key={index} className='relative size-48 overflow-hidden rounded-lg border'>
                                          <img src={src} alt={`preview ${index}`} className='size-full object-cover' />
                                          <button
                                            type='button'
                                            onClick={() => handleRemoveImage(index)}
                                            className='absolute right-0 top-0 flex-shrink-0 rounded-full bg-red-500 p-2 text-xs text-white hover:bg-red-600'
                                          >
                                            <Trash size={16} />
                                          </button>
                                          <button
                                            type='button'
                                            onClick={() => handleUpdateImage(index)}
                                            className='absolute bottom-0 right-0 flex-shrink-0 rounded-full bg-blue-500 p-2 text-xs text-white hover:bg-blue-600'
                                          >
                                            <Pencil size={16} />
                                          </button>
                                        </div>
                                      ))}
                                      {previewImages.length < 5 && (
                                        <div onClick={handleClickFileInput} className='flex size-48 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed text-gray-400'>
                                          <Plus size={24} />
                                        </div>
                                      )}
                                    </div>
                                    {form.formState.errors.artworkFile && <p className='text-red-500'>{form.formState.errors.artworkFile.message}</p>}
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        )
                      }

                      // Render các field khác bình thường
                      return (
                        <div key={key} className={`${config.halfWidth ? 'col-span-1' : 'col-span-2'} w-full`}>
                          <FormField
                            key={key}
                            control={form.control}
                            name={key as keyof FormValues}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel htmlFor={key} className={`${config.type === TYPE_INPUT.CHECKBOX ? 'w-fit cursor-pointer' : ''}`}>
                                  <div className='flex items-center gap-0.5'>
                                    {/* @ts-ignore */}
                                    {config.type === TYPE_INPUT.CHECKBOX && <Checkbox id={key} name={key} checked={field.value} onCheckedChange={field.onChange} />}
                                    {config.title} {isRequired && <span className='text-red-500'>*</span>}
                                  </div>
                                </FormLabel>
                                <FormControl>
                                  {config.type === TYPE_INPUT.TEXT ? (
                                    //@ts-ignore
                                    <Input name={key} {...field} placeholder={config.placeholder} />
                                  ) : config.type === TYPE_INPUT.TEXTAREA ? (
                                    //@ts-ignore
                                    <Textarea name={key} {...field} className='h-32' placeholder={config.placeholder} />
                                  ) : config.type === TYPE_INPUT.GENDER ? (
                                    //@ts-ignore
                                    <RadioGroup name={key} onValueChange={field.onChange} value={field.value} className='flex gap-6'>
                                      <div className='flex items-center space-x-2'>
                                        <RadioGroupItem value='nam' id='nam' />
                                        <Label htmlFor='nam'>Nam</Label>
                                      </div>
                                      <div className='flex items-center space-x-2'>
                                        <RadioGroupItem value='nữ' id='nữ' />
                                        <Label htmlFor='nữ'>Nữ</Label>
                                      </div>
                                    </RadioGroup>
                                  ) : null}
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
            <Button type='submit' className='w-full'>
              {isPending ? <Loader2 className='size-4 animate-spin' /> : 'Gửi đăng ký'}
            </Button>
          </form>
        </Form>

        <p className='mt-4 text-sm font-bold uppercase'>Lưu ý:</p>
        <ul className='list-disc pl-4 text-sm text-gray-500'>
          <li>Các trường thông tin có dấu (*) là bắt buộc phải điền.</li>
          <li>Người dự thi cần đọc kỹ thể lệ, quy định của cuộc thi trước khi đăng ký.</li>
          <li>Ban Tổ chức có quyền yêu cầu người dự thi cung cấp thêm thông tin hoặc tài liệu liên quan đến tác phẩm dự thi.</li>
        </ul>
      </CardContent>
    </Card>
  )
}

export default memo(SubmissionForm)
