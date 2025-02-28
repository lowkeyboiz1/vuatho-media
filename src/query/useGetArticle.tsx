import { articleServices } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_LIST_ARTICLE = 'GET_LIST_ARTICLE'

export const useGetArticle = (locale: string = 'vi') => {
  return useQuery({
    queryKey: [GET_LIST_ARTICLE, locale],
    queryFn: async () => await articleServices.getListArticle(locale),
    staleTime: 1000 * 60 // Avoid unnecessary refetches for 60 seconds
  })
}
