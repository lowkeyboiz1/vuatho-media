'use client'

import { isOpenModalSearchAtom } from '@/atoms/modal'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useDebounce } from '@/hooks/useDebounce'
import { useGetListPostBySearch } from '@/query/useGetListPost'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useAtom } from 'jotai'
import { Loader2 } from 'lucide-react'
import React, { memo, useCallback, useState } from 'react'
import SearchInput from '@/components/SearchInput'

const SearchResults = memo(({ search, isLoading, debouncedSearch, data }: { search: string; isLoading: boolean; debouncedSearch: string; data?: { data: any[] } }) => {
  if (!search) return null

  return (
    <div className='mt-4 max-h-[60vh] overflow-y-auto rounded-lg border bg-white p-2 shadow-sm'>
      <div className='flex items-center gap-2 p-2 text-sm text-muted-foreground'>
        {isLoading ? (
          <div className='flex items-center gap-2'>
            <Loader2 className='h-4 w-4 animate-spin' />
            <span>Đang tìm kiếm...</span>
          </div>
        ) : (
          <span>{debouncedSearch ? `Kết quả tìm kiếm (${data?.data.length || 0})` : 'Nhập để tìm kiếm'}</span>
        )}
      </div>
    </div>
  )
})

const ModalSearch = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenModalSearchAtom)
  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search, 300)
  const { data, isLoading } = useGetListPostBySearch(debouncedSearch)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle className='hidden'>Tìm kiếm bài dự thi</DialogTitle>
      <DialogContent className='sm:max-w-[600px]'>
        <SearchInput value={search} onChange={handleChange} />
        <SearchResults search={search} isLoading={isLoading} debouncedSearch={debouncedSearch} data={data} />
      </DialogContent>
    </Dialog>
  )
}

export default memo(ModalSearch)
