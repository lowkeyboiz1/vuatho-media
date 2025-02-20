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
    const maxVisiblePages = 5
    const halfVisible = Math.floor(maxVisiblePages / 2)

    let startPage = Math.max(1, page - halfVisible)
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    if (startPage > 1) {
      pageNumbers.push(
        <PaginationItem key={1}>
          <PaginationLink
            className='size-[40px] transform cursor-pointer rounded-lg border-2 border-yellow font-medium shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:bg-yellow hover:text-white'
            onClick={() => setPage(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      )
      if (startPage > 2) {
        pageNumbers.push(
          <PaginationItem key='ellipsis1'>
            <span className='pionier px-2 text-yellow'>•••</span>
          </PaginationItem>
        )
      }
    }

    for (let i = startPage; i <= endPage; i++) {
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

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <PaginationItem key='ellipsis2'>
            <span className='pionier px-2 text-yellow'>•••</span>
          </PaginationItem>
        )
      }
      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            className='pionier size-[40px] transform cursor-pointer rounded-lg border-2 border-yellow font-medium shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:bg-yellow hover:text-white'
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
