import { useTranslation } from '@/components/TranslationProvider'
import { useEffect, useMemo, useState } from 'react'
import { z } from 'zod'

// Định nghĩa các thông báo lỗi cho từng ngôn ngữ
export const errorMessages = {
  vi: {
    nameRequired: 'Họ và tên là bắt buộc',
    birthYearRequired: 'Năm sinh là bắt buộc',
    phoneRequired: 'Số điện thoại là bắt buộc',
    phoneFormat: 'Số điện thoại phải có 10 chữ số',
    addressRequired: 'Địa chỉ liên hệ là bắt buộc',
    artworkNameRequired: 'Tên tác phẩm là bắt buộc',
    minFile: 'Tối thiểu 1 file',
    maxFile: 'Tối đa 5 file',
    maxWords: 'Tối đa 500 từ',
    descriptionRequired: 'Mô tả tác phẩm là bắt buộc',
    videoLinkRequired: 'Link phim là bắt buộc',
    invalidVideoLink: 'Link phim không hợp lệ',
    policyAgreement: 'Bạn phải đồng ý với điều khoản này'
  },
  en: {
    nameRequired: 'Full name is required',
    birthYearRequired: 'Birth year is required',
    phoneRequired: 'Phone number is required',
    phoneFormat: 'Phone number must be 10 digits',
    addressRequired: 'Contact address is required',
    artworkNameRequired: 'Artwork name is required',
    minFile: 'Minimum 1 file',
    maxFile: 'Maximum 5 files',
    maxWords: 'Maximum 500 words',
    descriptionRequired: 'Artwork description is required',
    videoLinkRequired: 'Video link is required',
    invalidVideoLink: 'Invalid video link',
    policyAgreement: 'You must agree to this policy'
  }
}

// Định nghĩa schema cơ bản (không phụ thuộc vào ngôn ngữ)
// Schema này được sử dụng để tạo kiểu FormValues
const baseSchema = z.object({
  name: z.string(),
  gender: z.enum(['nam', 'nữ']),
  alias: z.string().optional(),
  birthYear: z.string(),
  phone: z.string(),
  address: z.string(),
  facebook: z.string().optional(),
  artworkName: z.string(),
  artworkFile: z.array(z.instanceof(File)),
  artworkDescription: z.string(),
  videoLink: z.string(),
  ekip: z.string().optional(),
  drive_link: z.string().optional(),
  policies: z.object({
    policy1: z.boolean(),
    policy2: z.boolean(),
    policy3: z.boolean()
  })
})

// Kiểu dữ liệu của form
export type FormValues = z.infer<typeof baseSchema>

// Hàm tạo schema dựa trên ngôn ngữ đã chọn
export const formSchema = () => {
  const { language } = useTranslation()
  const messages = useMemo(() => errorMessages[language as 'vi' | 'en'], [language])
  return z.object({
    name: z.string().min(1, messages.nameRequired),
    gender: z.enum(['nam', 'nữ']),
    alias: z.string().optional(),
    birthYear: z.string().min(1, messages.birthYearRequired),
    phone: z
      .string()
      .min(1, messages.phoneRequired)
      .refine((val) => /^\d{10}$/.test(val), messages.phoneFormat),
    address: z.string().min(1, messages.addressRequired),
    facebook: z.string().optional(),
    artworkName: z.string().min(1, messages.artworkNameRequired),
    artworkFile: z.array(z.instanceof(File)).min(1, messages.minFile).max(5, messages.maxFile),
    artworkDescription: z.string().max(500, messages.maxWords).min(1, messages.descriptionRequired),
    videoLink: z.string().min(1, messages.videoLinkRequired).url(messages.invalidVideoLink),
    ekip: z.string().optional(),
    drive_link: z.string().optional(),
    policies: z.object({
      policy1: z.boolean().refine((val) => val === true, {
        message: messages.policyAgreement
      }),
      policy2: z.boolean().refine((val) => val === true, {
        message: messages.policyAgreement
      }),
      policy3: z.boolean().refine((val) => val === true, {
        message: messages.policyAgreement
      })
    })
  })
}
