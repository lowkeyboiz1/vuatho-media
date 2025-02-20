import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { memo } from 'react'

const SearchInput = memo(({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className='relative flex items-center pt-4'>
    <Search className='absolute right-4 my-auto size-5 text-muted-foreground' />
    <Input autoFocus placeholder='Tìm kiếm bài dự thi...' className='h-12 rounded-full bg-[#DDE9FF] pl-4 pr-10 text-black placeholder:text-black' value={value} onChange={onChange} />
  </div>
))

export default SearchInput
