import { Star } from 'lucide-react'
import React, { useState } from 'react'

export const SelectableStars = ({ onChange }: { onChange?: (score: number) => void }) => {
  const [hovered, setHovered] = useState<number | null>(null)
  const [selected, setSelected] = useState<number>(0)

  const handleMouseEnter = (index: number) => setHovered(index + 1)
  const handleMouseLeave = () => setHovered(null)
  const handleClick = (index: number) => {
    setSelected(index + 1)
    if (onChange) onChange(index + 1)
  }

  return (
    <div className='flex gap-1'>
      {[...Array(10)].map((_, index) => (
        <Star
          key={index}
          className={(hovered !== null ? index < hovered : index < selected) ? 'cursor-pointer fill-yellow text-yellow-500' : 'cursor-pointer text-gray-400'}
          size={24}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  )
}
