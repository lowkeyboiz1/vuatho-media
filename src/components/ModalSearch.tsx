'use client'
import { isOpenModalSearchAtom } from '@/atoms/modal'
import SearchInput from '@/components/SearchInput'
import { SelectableStars } from '@/components/SelectableStars'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useDebounce } from '@/hooks/useDebounce'
import { TYPE_POST } from '@/lib/contants'
import { useGetListPostBySearch } from '@/query/useGetListPost'
import { TPost } from '@/types'
import { getYoutubeId } from '@/utils'
import { DialogTitle } from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'
import { useAtom, useAtomValue } from 'jotai'
import { Search } from 'lucide-react'
import Image from 'next/image'
import React, { memo, useCallback, useState } from 'react'
import { isCanVoteAtom } from '@/atoms/switch'

const SearchResults = memo(({ search, isLoading, data }: { search: string; isLoading: boolean; data: TPost[] }) => {
  const isCanVote = useAtomValue(isCanVoteAtom)
  if (!search) return null

  return (
    <div className='flex flex-col gap-4 overflow-y-auto bg-white p-2 lg:max-h-[60vh]'>
      {isLoading ? (
        <div className='grid grid-cols-2 items-center gap-2'>
          <div className='h-[260px] w-full animate-pulse overflow-hidden rounded-2xl bg-gray-300'></div>
          <div className='flex flex-col gap-2 p-4'>
            <div className='h-4 w-20 animate-pulse rounded bg-gray-300'></div>
            <div className='h-6 w-2/3 animate-pulse rounded bg-gray-300'></div>
            <div className='h-4 w-1/2 animate-pulse rounded bg-gray-300'></div>
            <div className='h-4 w-3/4 animate-pulse rounded bg-gray-300'></div>
            <div className='h-4 w-3/4 animate-pulse rounded bg-gray-300'></div>
          </div>
        </div>
      ) : data?.length > 0 ? (
        data?.map((item) => (
          <div key={item?.id} className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
            {/* Hình ảnh */}
            {item?.type === TYPE_POST.IMAGE ? (
              <div className='h-full max-h-[300px] overflow-hidden rounded-2xl lg:max-h-[260px]'>
                <Image src={item?.thumbnail} alt={item?.thumbnail} width={1000} height={1000} className='h-full w-full object-cover' />
              </div>
            ) : (
              <iframe
                className='h-[300px] w-full overflow-hidden rounded-2xl lg:h-[260px]'
                src={`https://www.youtube.com/embed/${getYoutubeId(item?.thumbnail)}`}
                title={item?.title}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            )}

            {/* Nội dung */}
            <div className='flex h-full flex-col justify-center gap-2 p-4'>
              <div>
                <p>#{item?.id}</p>
                <p className='text-xl font-bold'>{item?.title}</p>
                <div className='flex items-center gap-2 text-sm'>
                  <p>{item?.author}</p> | <p>Ngày dự thi: {item?.created_at}</p>
                </div>
              </div>
              <p className='line-clamp-4 min-h-[80px]'>{item.description}</p>
              {isCanVote && (
                <div className='flex flex-col lg:flex-row lg:items-center lg:gap-2'>
                  <p className='font-bold'>Bình chọn:</p>
                  <SelectableStars />
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <motion.div className='flex flex-col items-center justify-center p-6 text-gray-500' initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
          <Search size={48} className='text-gray-400' />
          <p className='mt-2 text-lg font-medium'>Không tìm thấy kết quả</p>
          <p className='text-sm text-gray-400'>Thử tìm kiếm với từ khóa khác.</p>
        </motion.div>
      )}
    </div>
  )
})

const ModalSearch = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenModalSearchAtom)
  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search, 300)
  const { data: dataPost, isLoading } = useGetListPostBySearch(debouncedSearch)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <ScrollArea>
        <DialogTitle className='hidden'>Tìm kiếm bài dự thi</DialogTitle>
        <DialogContent className='max-w-[900px] p-0 pt-4 lg:p-4'>
          <div className='-mt-8 lg:mt-2'>
            <SearchInput value={search} onChange={handleChange} />
          </div>
          <div className='min-h-[400px]'>
            <SearchResults search={search} isLoading={isLoading} data={dataPost?.data || []} />
          </div>
        </DialogContent>
      </ScrollArea>
    </Dialog>
  )
}

export default memo(ModalSearch)
