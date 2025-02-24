import { instance } from '@/services/instance'
import { TypePost } from '@/lib/contants'
import { TPostResponse } from '@/types'

export const postServices = {
  getListPost: async (type: TypePost, page: number): Promise<TPostResponse> => {
    const response = await instance.get<TPostResponse>(`/media-competition/contest?type=${type}&page=${page}`)
    return response.data
  },
  getListPostBySearch: async (search: string): Promise<TPostResponse> => {
    const response = await instance.get<TPostResponse>(`/media-competition/contest?&search=${search}`)
    return response.data
  }
}
