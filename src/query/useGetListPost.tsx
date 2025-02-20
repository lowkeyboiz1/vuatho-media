import { TYPE_POST } from '@/lib/contants'
import { postServices } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
const GET_LIST_POST_IMAGE = 'GET_LIST_POST_IMAGE'
const GET_LIST_POST_MEDIA = 'GET_LIST_POST_MEDIA'

export const useGetListPostImage = (page: number = 1) => {
  return useQuery({
    queryKey: [GET_LIST_POST_IMAGE, page],
    queryFn: async () => await postServices.getListPost(TYPE_POST.IMAGE, page),
    staleTime: 1000 * 60 // Avoid unnecessary refetches for 60 seconds
  })
}

export const useGetListPostMedia = (page: number = 1) => {
  return useQuery({
    queryKey: [GET_LIST_POST_MEDIA, page],
    queryFn: async () => await postServices.getListPost(TYPE_POST.VIDEO, page),
    staleTime: 1000 * 60 // Avoid unnecessary refetches for 60 seconds
  })
}
