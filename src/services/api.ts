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
  },
  createPost: async (data: any): Promise<TPostResponse> => {
    const response = await instance.post<TPostResponse>('/media-competition/contest/submit', data)
    return response.data
  },
  getTypePost: async (type: TypePost): Promise<number | null> => {
    const response = await instance.get<TPostResponse>('/media-competition')
    console.log({ type })
    const typePost = response.data.data.find((item) => item.type === type)
    console.log({ typePost })
    return typePost ? typePost.id : null
  },
  votePost: async (postId: string, vote: number): Promise<TPostResponse> => {
    const response = await instance.post<TPostResponse>(`/media-competition/contest/vote/${postId}`, { vote })
    return response.data
  }
}
