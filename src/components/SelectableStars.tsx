import { Star } from 'lucide-react'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
    <div className='relative flex gap-1'>
      {[...Array(10)].map((_, index) => {
        const activeHover = hovered !== null ? index < hovered : index < selected

        return (
          <div className=''>
            <Star
              key={index}
              className={activeHover ? 'cursor-pointer fill-yellow text-yellow-500' : 'cursor-pointer text-gray-400'}
              size={24}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(index)}
            />
            {hovered === index + 1 && (
              <AnimatePresence>
                <motion.div initial={{ y: 10 }} animate={{ y: 0 }} exit={{ y: -10 }} className='absolute cursor-pointer'>
                  <Star className={'fill-yellow text-yellow-500'} size={24} />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        )
      })}
    </div>
  )
}
