'use client'

import { useState, forwardRef, Ref } from 'react'
import { twMerge } from 'tailwind-merge'

interface ImageFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

const ImageFallback = forwardRef<HTMLImageElement, ImageFallbackProps>(({ src, alt, className, fallback: customFallback = '/default.webp', ...props }, ref) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(src)

  const handleError = () => {
    setImageSrc(customFallback)
  }

  return <img className={twMerge('rounded-none lg:pointer-events-none lg:select-none', className)} ref={ref} src={imageSrc} alt={alt} onError={handleError} {...props} />
})

export default ImageFallback
