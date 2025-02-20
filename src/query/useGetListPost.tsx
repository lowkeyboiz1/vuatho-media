import { TYPE_POST, TypePost } from '@/lib/contants'
import { postServices } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_LIST_POST_IMAGE = 'GET_LIST_POST_IMAGE'
const GET_LIST_POST_MEDIA = 'GET_LIST_POST_MEDIA'
const GET_LIST_POST_BY_SEARCH = 'GET_LIST_POST_BY_SEARCH'

export const useGetListPostImage = (page: number = 1) => {
  return useQuery({
    queryKey: [GET_LIST_POST_IMAGE, page],
    queryFn: async () => await postServices.getListPost(TYPE_POST.IMAGE as TypePost, page),
    staleTime: 1000 * 60 // Avoid unnecessary refetches for 60 seconds
  })
}

export const useGetListPostMedia = (page: number = 1) => {
  return useQuery({
    queryKey: [GET_LIST_POST_MEDIA, page],
    queryFn: async () => await postServices.getListPost(TYPE_POST.VIDEO as TypePost, page),
    staleTime: 1000 * 60 // Avoid unnecessary refetches for 60 seconds
  })
}

export const useGetListPostBySearch = (search: string) => {
  return useQuery({
    queryKey: [GET_LIST_POST_BY_SEARCH, search],
    queryFn: async () => await postServices.getListPostBySearch(search),
    staleTime: 1000 * 60 // Avoid unnecessary refetches for 60 seconds
  })
}
