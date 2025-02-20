'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'
import { useAtom } from 'jotai'
import { isOpenModalSearchAtom } from '@/atoms/modal'

const ModalSearch = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenModalSearchAtom)
  const [search, setSearch] = useState('')
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const debouncedSearch = useDebounce(search, 300)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedSearch) {
      params.set('search', debouncedSearch)
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`)
  }, [debouncedSearch, searchParams, pathname, replace])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className=''>
        <div className='relative'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input placeholder='Search anything...' className='pl-8' value={search} onChange={onChange} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalSearch
