import { instance } from '@/services/instance'
import { TypePost } from '@/lib/contants'

interface Post {
  id: number
  user_google_id: number
  type: string
  title: string
  // Add other post fields as needed
}

interface PostResponse {
  status: number
  data: Post[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const postServices = {
  getListPost: async (type: TypePost, page: number): Promise<PostResponse> => {
    const response = await instance.get<PostResponse>(`/media-competition?type=${type}&page=${page}`)
    return response.data
  }
}
