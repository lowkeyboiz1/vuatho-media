'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useState } from 'react'

const Film = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const data = [
    { value: 'Đối tượng dự thi', question: 'Is it accessible?', answer: 'Yes. It adheres to the WAI-ARIA design pattern.' },
    { value: 'YÊU CẦU VỀ TÁC PHẨM DỰ THI', question: 'Is it styled?', answer: "Yes. It comes with default styles that matches the other components' aesthetic." },
    { value: 'Is it animated', question: 'Is it animated?', answer: "Yes. It's animated by default, but you can disable it if you prefer." }
  ]
  return (
    <div className='container mx-auto py-24'>
      <h1 className='text-center text-4xl font-bold text-blue'>FORM ĐĂNG KÝ DỰ THI Phim ngắn</h1>
      <Accordion type='single' collapsible className='flex w-full flex-col gap-4' onValueChange={(value) => setActiveItem(value)}>
        {data.map((item, index) => {
          const isActive = activeItem === item.value
          return (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className={`px-4 py-2 uppercase ${isActive ? 'rounded-lg bg-yellow font-bold' : ''}`}>
                {index + 1}. {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

export default Film
