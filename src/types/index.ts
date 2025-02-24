export type TPost = {
  id: number
  author: string
  title: string
  description: string
  nickname: string
  avatar: string
  type: string
  media: string[]
  thumbnail: string
  total_score: number
  created_at: string
}
export type TPostResponse = {
  status: number
  data: TPost[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
