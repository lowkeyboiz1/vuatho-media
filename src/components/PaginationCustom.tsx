'use client'

import React, { memo } from 'react'
import { ChevronRight } from 'lucide-react'
import { Pagination as PaginationRoot, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination'

interface PaginationProps {
  page: number
  totalPages: number
  setPage: (page: number) => void
}

const PaginationCustom = ({ page, totalPages, setPage }: PaginationProps) => {
  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink className='size-[40px] border border-yellow' style={{ opacity: page <= 1 ? 0.5 : 1 }} onClick={() => page > 1 && setPage(page - 1)}>
            <ChevronRight className='rotate-180' />
          </PaginationLink>
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink className={`size-[40px] border border-yellow ${page === index + 1 ? 'bg-yellow text-white hover:bg-yellow/90' : ''}`} onClick={() => setPage(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink className='size-[40px] border border-yellow' style={{ opacity: page >= totalPages ? 0.5 : 1 }} onClick={() => page < totalPages && setPage(page + 1)}>
            <ChevronRight />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  )
}

export default memo(PaginationCustom)
