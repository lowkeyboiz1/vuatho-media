import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { memo } from 'react'

const SearchInput = memo(({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className='relative flex items-center pt-4'>
    <Search className='absolute right-4 my-auto hidden size-5 text-muted-foreground lg:block' />
    <Input
      autoFocus
      placeholder='Tìm kiếm bài dự thi...'
      className='h-12 rounded-none border-l-0 border-r-0 border-t-0 pl-4 pr-10 text-black placeholder:text-black lg:rounded-full lg:bg-[#DDE9FF]'
      value={value}
      onChange={onChange}
    />
  </div>
))

export default SearchInput
