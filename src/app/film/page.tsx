'use client'

import DifferentContent from '@/components/DifferentContent'
import { useTranslation } from '@/components/TranslationProvider'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { formSchema } from '@/forms/formSchema'
import SubmissionForm from '@/forms/SubmissionForm'
import { FIELD_CONFIGS, TYPE_POST } from '@/lib/contants'
import { removeKeyOfSchema } from '@/utils'
import { removeFields } from '@/utils'
import { useState } from 'react'

const Film = () => {
  const { t } = useTranslation()

  const title = t('Film.title')
  const data = [
    { value: t('Film.accordion.section1.title'), question: t('Film.accordion.section1.title'), answer: "Yes. It comes with default styles that matches the other components' aesthetic." },
    { value: t('Film.accordion.section2.title'), question: t('Film.accordion.section2.title'), answer: "Yes. It comes with default styles that matches the other components' aesthetic." },
    { value: t('Film.accordion.section3.title'), question: t('Film.accordion.section3.title'), answer: "Yes. It comes with default styles that matches the other components' aesthetic." },
    { value: t('Film.accordion.section4.title'), question: t('Film.accordion.section4.title'), answer: "Yes. It comes with default styles that matches the other components' aesthetic." },
    { value: t('Film.accordion.section5.title'), question: t('Film.accordion.section5.title'), answer: "Yes. It comes with default styles that matches the other components' aesthetic." },
    { value: t('Film.accordion.section6.title'), question: t('Film.accordion.section6.title'), answer: <DifferentContent /> },
    { value: t('Film.accordion.section7.title'), question: t('Film.accordion.section7.title'), answer: "Yes. It comes with default styles that matches the other components' aesthetic." },
    { value: t('Film.accordion.section8.title'), question: t('Film.accordion.section8.title'), answer: "Yes. It comes with default styles that matches the other components' aesthetic." }
  ]

  const [activeItem, setActiveItem] = useState<string | null>(data[0].value)
  const fieldsToRemove = ['artworkFile']

  const newConfigs = removeFields(FIELD_CONFIGS, fieldsToRemove)
  const newSchema = removeKeyOfSchema(formSchema, fieldsToRemove)

  return (
    <div className='container mx-5 flex flex-col gap-10 py-24 md:mx-10 lg:mx-auto'>
      <h1 className='text-center text-xl font-bold uppercase text-blue md:text-3xl lg:text-4xl'>{title}</h1>
      <Accordion type='single' defaultValue={data[0].value} collapsible className='flex w-full flex-col gap-4' onValueChange={(value) => setActiveItem(value)}>
        {data.map((item, index) => {
          const isActive = activeItem === item.value
          return (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className={`px-4 py-2 text-base uppercase md:text-lg lg:text-xl ${isActive ? 'rounded-lg bg-yellow font-bold' : 'rounded-lg bg-yellow/20 font-medium'}`}>
                {index + 1}. {item.question}
              </AccordionTrigger>
              <AccordionContent className='pb-4'>{item.answer}</AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
      <SubmissionForm title={title} type={TYPE_POST.VIDEO} fieldConfigs={newConfigs} formSchema={newSchema} />
    </div>
  )
}

export default Film
