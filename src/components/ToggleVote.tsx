'use client'

import { Switch } from '@/components/ui/switch'
import { isCanVoteAtom } from '@/atoms/switch'
import { useAtom } from 'jotai'

const ToggleVote = () => {
  const [isChecked, setIsChecked] = useAtom(isCanVoteAtom)

  return (
    <div className='flex items-center gap-3'>
      <span className='text-sm'>{isChecked ? 'Can vote' : "Can't vote"}</span>
      <Switch checked={isChecked} onCheckedChange={setIsChecked} />
    </div>
  )
}

export default ToggleVote
