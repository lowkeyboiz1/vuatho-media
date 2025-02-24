import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(1, 'Họ và tên là bắt buộc'),
  gender: z.enum(['nam', 'nữ']),
  alias: z.string().optional(),
  birthYear: z.string().min(1, 'Năm sinh là bắt buộc'),
  phone: z
    .string()
    .min(1, 'Số điện thoại là bắt buộc')
    .refine((val) => /^\d{10}$/.test(val), 'Số điện thoại phải có 10 chữ số'),
  address: z.string().min(1, 'Địa chỉ liên hệ là bắt buộc'),
  facebook: z.string().optional(),
  artworkName: z.string().min(1, 'Tên tác phẩm là bắt buộc'),
  artworkFile: z.array(z.instanceof(File)).min(1, 'Tối thiểu 1 file').max(5, 'Tối đa 5 file'),
  artworkDescription: z.string().max(500, 'Tối đa 500 từ').min(1, 'Mô tả tác phẩm là bắt buộc'),
  videoLink: z.string().min(1, 'Link phim là bắt buộc').url('Link phim không hợp lệ'),
  ekip: z.string().optional(),
  driveFile: z.string().optional(),
  policies: z.object({
    policy1: z.boolean().refine((val) => val === true, {
      message: 'Bạn phải đồng ý với điều khoản này'
    }),
    policy2: z.boolean().refine((val) => val === true, {
      message: 'Bạn phải đồng ý với điều khoản này'
    }),
    policy3: z.boolean().refine((val) => val === true, {
      message: 'Bạn phải đồng ý với điều khoản này'
    })
  })
})
// Kiểu dữ liệu của form
export type FormValues = z.infer<typeof formSchema>
