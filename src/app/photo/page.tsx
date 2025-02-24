'use client'

import DifferentContent from '@/components/DifferentContent'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { formSchema } from '@/forms/formSchema'
import SubmissionForm from '@/forms/SubmissionForm'
import { FIELD_CONFIGS, TYPE_POST } from '@/lib/contants'
import { removeFields, removeKeyOfSchema } from '@/utils'
import { useState } from 'react'

const Photo = () => {
  const title = 'FORM ĐĂNG KÝ DỰ THI NHIẾP ẢNH'
  const data = [
    { value: 'Đối tượng dự thi', question: 'Is it accessible?', answer: <DifferentContent /> },
    { value: 'YÊU CẦU VỀ TÁC PHẨM DỰ THI', question: 'Is it styled?', answer: "Yes. It comes with default styles that matches the other components' aesthetic." },
    { value: 'Is it animated', question: 'Is it animated?', answer: "Yes. It's animated by default, but you can disable it if you prefer." }
  ]
  const [activeItem, setActiveItem] = useState<string | null>(data[0].value)
  const fieldsToRemove = ['artworkFile']

  const newConfigs = removeFields(FIELD_CONFIGS, fieldsToRemove)
  const newSchema = removeKeyOfSchema(formSchema, fieldsToRemove)

  return (
    <div className='container mx-auto flex flex-col gap-10 py-24'>
      <h1 className='text-center text-4xl font-bold uppercase text-blue'>{title}</h1>
      <Accordion type='single' defaultValue={data[0].value} collapsible className='flex w-full flex-col gap-4' onValueChange={(value) => setActiveItem(value)}>
        {data.map((item, index) => {
          const isActive = activeItem === item.value
          return (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className={`px-4 py-2 text-xl uppercase ${isActive ? 'rounded-lg bg-yellow font-bold' : 'rounded-lg bg-yellow/20'}`}>
                {index + 1}. {item.question}
              </AccordionTrigger>
              <AccordionContent className='pb-4'>{item.answer}</AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
      <SubmissionForm title={title} type={TYPE_POST.IMAGE} fieldConfigs={newConfigs} formSchema={newSchema} />
    </div>
  )
}

export default Photo
