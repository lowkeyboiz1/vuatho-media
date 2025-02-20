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
  const renderPageNumbers = () => {
    const pageNumbers = []

    // Always show first page
    pageNumbers.push(
      <PaginationItem key={1}>
        <PaginationLink
          className={`size-[40px] transform cursor-pointer rounded-lg border-2 border-yellow font-medium shadow-sm transition-all duration-300 ease-in-out hover:scale-105 ${
            page === 1 ? 'bg-yellow text-white hover:border-yellow/90 hover:bg-yellow/90' : 'hover:bg-yellow hover:text-white'
          }`}
          onClick={() => setPage(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    )

    // Show ellipsis if needed
    if (page > 3) {
      pageNumbers.push(
        <PaginationItem key='ellipsis1'>
          <span className='pionier px-2 text-yellow'>•••</span>
        </PaginationItem>
      )
    }

    // Show current page and neighbors
    for (let i = Math.max(2, page - 1); i <= Math.min(page + 1, totalPages - 1); i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              className={`size-[40px] transform cursor-pointer rounded-lg border-2 border-yellow font-medium shadow-sm transition-all duration-300 ease-in-out hover:scale-105 ${
                page === i ? 'bg-yellow text-white hover:border-yellow/90 hover:bg-yellow/90' : 'hover:bg-yellow hover:text-white'
              }`}
              onClick={() => setPage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    }

    // Show ellipsis if needed
    if (page < totalPages - 2) {
      pageNumbers.push(
        <PaginationItem key='ellipsis2'>
          <span className='pionier px-2 text-yellow'>•••</span>
        </PaginationItem>
      )
    }

    // Always show last page
    if (totalPages > 1) {
      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            className={`size-[40px] transform cursor-pointer rounded-lg border-2 border-yellow font-medium shadow-sm transition-all duration-300 ease-in-out hover:scale-105 ${
              page === totalPages ? 'bg-yellow text-white hover:border-yellow/90 hover:bg-yellow/90' : 'hover:bg-yellow hover:text-white'
            }`}
            onClick={() => setPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return pageNumbers
  }

  return (
    <PaginationRoot>
      <PaginationContent className='gap-2'>
        <PaginationItem>
          <PaginationLink
            className={`size-[40px] transform rounded-lg border-2 border-yellow shadow-sm transition-all duration-300 ease-in-out hover:scale-105 ${
              page <= 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-yellow hover:text-white'
            }`}
            onClick={() => page > 1 && setPage(page - 1)}
          >
            <ChevronRight className='rotate-180' />
          </PaginationLink>
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem>
          <PaginationLink
            className={`size-[40px] transform rounded-lg border-2 border-yellow shadow-sm transition-all duration-300 ease-in-out hover:scale-105 ${
              page >= totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-yellow hover:text-white'
            }`}
            onClick={() => page < totalPages && setPage(page + 1)}
          >
            <ChevronRight />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  )
}

export default memo(PaginationCustom)
