import { ImageSkeleton } from './Icons'

export const SkeletonBlog = () => {
  return (
    <div role='status' className='flex w-full animate-pulse flex-col'>
      <div className='flex h-[206px] w-full items-center justify-center rounded bg-gray-300'>
        <ImageSkeleton />
      </div>
      <div className='flex w-full flex-col gap-2 p-4'>
        <div className='flex items-center justify-between'>
          <div className='h-[10px] w-[80px] rounded-full bg-gray-200'></div>
          <div className='h-[10px] w-[80px] rounded-full bg-gray-200'></div>
        </div>
        <div className='h-3 w-48 rounded-full bg-gray-200'></div>
        <div className='h-[10px] rounded-full bg-gray-200'></div>
        <div className='h-[10px] rounded-full bg-gray-200'></div>
      </div>
    </div>
  )
}
