import { translate, useTranslation } from '@/components/TranslationProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { defaultValues } from '@/forms/formDefaults'
import { FormValues } from '@/forms/formSchema'
import { TYPE_INPUT, TypePost } from '@/lib/contants'
import { cn } from '@/lib/utils'
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
  title?: string
  type: TypePost
  fieldConfigs: SectionConfig[]
  formSchema: any
  handleSubmit?: (data: FormValues) => void
  className?: string
  note?: React.ReactNode
  classNameContainer?: string
}

const SubmissionForm = ({ title, type, fieldConfigs, formSchema, handleSubmit, className, note, classNameContainer }: TSubmissionForm) => {
  const [imageToUpdateIndex, setImageToUpdateIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const f = translate('Form.section2')
  const { language } = useTranslation()
  const { mutate: createPost, isPending } = useCreatePost({
    onSuccess: () => {
      form.reset()
      setPreviewImages([])
      toast('Bài dự thi đã được gửi thành công')
    }
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => defaultValues, [])
  })

  //  Xử lý sự kiện khi chọn file ảnh
  const handleImageUpload = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (!files || files.length === 0) return

      const currentFiles = form.getValues('artworkFile') || []
      let updatedFiles = [...currentFiles]
      let updatedImages = [...previewImages]

      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        // Kiểm tra kích thước file (tối đa 6MB)
        if (file.size > 6 * 1024 * 1024) {
          alert('Ảnh vượt quá 6MB, vui lòng chọn ảnh nhỏ hơn!')
          continue
        }

        const imageUrl = URL.createObjectURL(file)

        if (imageToUpdateIndex !== null) {
          // Thay thế ảnh cũ
          updatedFiles[imageToUpdateIndex] = file
          updatedImages[imageToUpdateIndex] = imageUrl
          setImageToUpdateIndex(null) // Reset state sau khi cập nhật
        } else {
          // Chỉ thêm ảnh nếu chưa đạt giới hạn 5 ảnh
          if (updatedFiles.length < 5) {
            updatedFiles.push(file)
            updatedImages.push(imageUrl)
          } else {
            alert('Bạn chỉ có thể tải lên tối đa 5 ảnh!')
            break
          }
        }
      }

      // Cập nhật form
      form.setValue('artworkFile', updatedFiles, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
      setPreviewImages(updatedImages)

      event.target.value = '' // Reset input file để chọn lại
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

  const onSubmit = async (data: FormValues) => {
    if (handleSubmit) {
      handleSubmit(data)
      return
    }
    const res = await postServices.getTypePost(type)
    const newData = convertToNewFormat(data, type, res || 1)
    const formData = objectToFormData(newData)
    createPost(formData)
  }

  const requiredFields = React.useMemo(() => getRequiredFields(formSchema), [formSchema, language])

  return (
    <Card className={cn('mx-auto w-full max-w-4xl p-6', classNameContainer)}>
      <CardContent>
        {title ? <p className='py-5 text-center text-2xl font-bold uppercase text-blue'>{title}</p> : null}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {fieldConfigs.map((item, index) => {
              return (
                <div key={index}>
                  <h3 className='my-4 text-lg font-semibold'>{item.title}</h3>
                  <div className={cn('flex w-full grid-cols-1 flex-col gap-4 md:grid md:grid-cols-2', className)}>
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
                                        <div key={index} className='group relative flex size-48 justify-center overflow-hidden rounded-lg border'>
                                          <img src={src} alt={`preview ${index}`} className='size-full object-cover transition-opacity duration-300 group-hover:opacity-50' />
                                          <div className='absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                                            <button
                                              type='button'
                                              onClick={() => handleRemoveImage(index)}
                                              className='flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white hover:bg-red-600'
                                            >
                                              <Trash size={16} />
                                            </button>
                                            <button
                                              type='button'
                                              onClick={() => handleUpdateImage(index)}
                                              className='flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 p-2 text-xs text-white hover:bg-blue-600'
                                            >
                                              <Pencil size={16} />
                                            </button>
                                          </div>
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
                                        <Label htmlFor='nam'>{language === 'vi' ? 'Nam' : 'Male'}</Label>
                                      </div>
                                      <div className='flex items-center space-x-2'>
                                        <RadioGroupItem value='nữ' id='nữ' />
                                        <Label htmlFor='nữ'>{language === 'vi' ? 'Nữ' : 'Female'}</Label>
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

        {!!note ? (
          note
        ) : (
          <>
            <p className='mt-4 text-sm font-bold uppercase'>{f.note}</p>
            <ul className='list-disc pl-4 text-sm text-gray-500'>
              <li>{f.note1}</li>
              <li>{f.note2}</li>
              <li>{f.note3}</li>
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default memo(SubmissionForm)
