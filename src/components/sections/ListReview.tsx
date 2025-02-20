'use client'

import { memo, useState, useMemo, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import PaginationCustom from '@/components/PaginationCustom'
import ItemReview from '@/components/sections/ItemReview'
import { useGetListPostImage, useGetListPostMedia } from '@/query/useGetListPost'
import { TYPE_POST } from '@/lib/contants'
import { Skeleton } from '@/components/ui/skeleton'
import { useRef } from 'react'
import CountUp from 'react-countup'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      duration: 0.6
    }
  }
}

const ListReview = ({ title, type }: { title: string; type: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  const [page, setPage] = useState({
    image: 1,
    video: 1
  })

  const isImage = type === TYPE_POST.IMAGE
  const { data: listPost, isLoading } = isImage ? useGetListPostImage(page.image) : useGetListPostMedia(page.video)

  useEffect(() => {
    if (!listPost?.data || !isInView) return

    const totalItems = listPost.data.length
    let shown = [...visibleItems]
    let timeouts: NodeJS.Timeout[] = []

    const showNextItem = () => {
      if (shown.length >= totalItems) return

      const remaining = [...Array(totalItems).keys()].filter((i) => !shown.includes(i))
      const randomIndex = Math.floor(Math.random() * remaining.length)
      shown.push(remaining[randomIndex])
      setVisibleItems([...shown])

      if (shown.length < totalItems) {
        timeouts.push(setTimeout(showNextItem, 150))
      }
    }

    showNextItem()

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [listPost?.data, isInView])

  const handleSetPage = useCallback(
    (newPage: number) => {
      setPage((prev) => ({
        ...prev,
        [isImage ? 'image' : 'video']: newPage
      }))
      setVisibleItems([])
    },
    [isImage]
  )

  const renderSkeleton = useMemo(
    () => (
      <>
        {[...Array(8)].map((_, i) => (
          <div key={i} className='group relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-white p-4 pb-6 transition hover:bg-blue'>
            <div className='relative h-[260px] overflow-hidden rounded-2xl bg-gray-200'>
              <Skeleton className='size-full' />
            </div>
            <div className='flex flex-col items-center gap-2'>
              <Skeleton className='h-4 w-8' />
              <Skeleton className='h-6 w-3/4' />
              <Skeleton className='h-5 w-1/2' />
              <Skeleton className='h-4 w-40' />
            </div>
          </div>
        ))}
      </>
    ),
    []
  )

  const renderHeader = useMemo(
    () => (
      <div className='ml-4 flex size-full flex-col justify-center gap-2'>
        <div>
          <p className='text-xl uppercase text-blue/80'>bài dự thi</p>
          <p className='text-4xl font-bold uppercase text-blue'>{title}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-sm'>Số bài dự thi đang có:</p>
          <p className='text-6xl font-bold text-yellow'>
            {isInView && <CountUp end={listPost?.meta?.total || 0} duration={2} separator='.' start={0} />}
            {!isInView && '0'}
          </p>
        </div>
      </div>
    ),
    [isInView, listPost?.meta?.total, title]
  )

  const renderItems = useMemo(
    () =>
      listPost?.data?.map((item, index) => (
        <motion.div key={item.id} variants={itemVariants} initial='hidden' animate={visibleItems.includes(index) ? 'visible' : 'hidden'}>
          <ItemReview item={item as any} />
        </motion.div>
      )),
    [listPost?.data, visibleItems]
  )

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className='grid w-full grid-cols-1 items-start justify-center gap-6 sm:grid-cols-2 lg:grid-cols-4'
    >
      {renderHeader}

      {isLoading ? renderSkeleton : renderItems}

      <div className='col-span-1 mt-10 flex w-full items-center justify-center sm:col-span-2 md:col-span-2 lg:col-span-4'>
        <PaginationCustom page={isImage ? page.image : page.video} totalPages={listPost?.meta?.totalPages || 1} setPage={handleSetPage} />
      </div>
    </motion.div>
  )
}

export default memo(ListReview)
