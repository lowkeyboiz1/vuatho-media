import { postServices } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

const CREATE_POST = 'CREATE_POST'
export const useCreatePost = (options?: { onSuccess?: (data: any) => void }) => {
  return useMutation({
    mutationKey: [CREATE_POST],
    mutationFn: async (data: any) => await postServices.createPost(data),
    onSuccess: (res: any) => {
      // Gọi callback onSuccess tùy chỉnh nếu được cung cấp
      if (options?.onSuccess) {
        options.onSuccess(res)
      }
    }
  })
}
