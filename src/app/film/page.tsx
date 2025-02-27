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
    { value: t('Film.accordion.section1.title'), question: t('Film.accordion.section1.title'), answer: <Accordion1Content /> },
    { value: t('Film.accordion.section2.title'), question: t('Film.accordion.section2.title'), answer: <Accordion2Content /> },
    { value: t('Film.accordion.section3.title'), question: t('Film.accordion.section3.title'), answer: <Accordion3Content /> },
    { value: t('Film.accordion.section4.title'), question: t('Film.accordion.section4.title'), answer: <Accordion4Content /> },
    { value: t('Film.accordion.section5.title'), question: t('Film.accordion.section5.title'), answer: <Accordion5Content /> },
    { value: t('Film.accordion.section6.title'), question: t('Film.accordion.section6.title'), answer: <DifferentContent /> },
    { value: t('Film.accordion.section7.title'), question: t('Film.accordion.section7.title'), answer: <Accordion7Content /> },
    { value: t('Film.accordion.section8.title'), question: t('Film.accordion.section8.title'), answer: <Accordion8Content /> }
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
              <AccordionContent className='px-5 pb-3 pt-2 text-base'>{item.answer}</AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
      <SubmissionForm title={title} type={TYPE_POST.VIDEO} fieldConfigs={newConfigs} formSchema={newSchema} />
    </div>
  )
}

const Accordion1Content = () => {
  const { t } = useTranslation()

  return (
    <ul className='list-inside list-disc'>
      <li>{t('Film.accordion.section1.content1')}</li>
      <li>{t('Film.accordion.section1.content2')}</li>
      <li>{t('Film.accordion.section1.content3')}</li>
    </ul>
  )
}

const Accordion2Content = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h3 className='mt-2 text-lg font-semibold'>{t('Film.accordion.section2.subTitle1')}</h3>
      <ul className='list-inside list-disc'>
        <li>{t('Film.accordion.section2.content11')}</li>
        <li>{t('Film.accordion.section2.content12')}</li>
        <li>{t('Film.accordion.section2.content13')}</li>
        <li>{t('Film.accordion.section2.content14')}</li>
        <li>{t('Film.accordion.section2.content15')}</li>
      </ul>
      <h3 className='mt-2 text-lg font-semibold'>{t('Film.accordion.section2.subTitle2')}</h3>
      <ul className='list-inside list-disc'>
        <li>{t('Film.accordion.section2.content21')}</li>
        <li>{t('Film.accordion.section2.content22')}</li>
        <li>{t('Film.accordion.section2.content23')}</li>
        <li>{t('Film.accordion.section2.content24')}</li>
        <li>{t('Film.accordion.section2.content25')}</li>
      </ul>
      <h3 className='mt-2 text-lg font-semibold'>{t('Film.accordion.section2.subTitle3')}</h3>
      <ul className='list-inside list-disc'>
        <li>{t('Film.accordion.section2.content31')}</li>
        <li>{t('Film.accordion.section2.content32')}</li>
        <li>{t('Film.accordion.section2.content33')}</li>
        <li>{t('Film.accordion.section2.content34')}</li>
      </ul>
      <p className='mt-2 italic text-gray-600'>{t('Film.accordion.section2.note')}</p>
    </div>
  )
}

const Accordion3Content = () => {
  const { t } = useTranslation()

  return (
    <div>
      <ul className='list-inside list-disc'>
        <li>
          <b>{t('Film.accordion.section3.subTitle1')}</b>
          {t('Film.accordion.section3.content11')}
        </li>
        <li>
          <b>{t('Film.accordion.section3.subTitle2')}</b>
          {t('Film.accordion.section3.content21')}
        </li>
      </ul>
      <h3 className='mt-2 text-lg font-semibold'>{t('Film.accordion.section3.subTitle3')}</h3>
      <ul className='list-inside list-disc'>
        <li>{t('Film.accordion.section3.content31')}</li>
        <li>{t('Film.accordion.section3.content32')}</li>
        <li>{t('Film.accordion.section3.content33')}</li>
        <li>{t('Film.accordion.section3.content34')}</li>
        <li>{t('Film.accordion.section3.content35')}</li>
      </ul>
      <p className='mt-2 italic text-gray-600'>{t('Film.accordion.section3.note')}</p>
    </div>
  )
}

const Accordion4Content = () => {
  const { t } = useTranslation()

  return (
    <ul className='list-inside list-disc'>
      <li>{t('Film.accordion.section4.content1')}</li>
      <li>{t('Film.accordion.section4.content2')}</li>
      <li>{t('Film.accordion.section4.content3')}</li>
      <li>{t('Film.accordion.section4.content4')}</li>
      <li>{t('Film.accordion.section4.content5')}</li>
      <li>{t('Film.accordion.section4.content6')}</li>
      <li>{t('Film.accordion.section4.content7')}</li>
      <li>{t('Film.accordion.section4.content8')}</li>
    </ul>
  )
}

const Accordion5Content = () => {
  const { t } = useTranslation()

  return (
    <ul className='list-inside list-disc'>
      <li>
        <b>{t('Film.accordion.section5.content11')}</b>
        <span>{t('Film.accordion.section5.content12')}</span>
      </li>
      <li>
        <b>{t('Film.accordion.section5.content21')}</b>
        <span>{t('Film.accordion.section5.content22')}</span>
      </li>
      <li>
        <b>{t('Film.accordion.section5.content31')}</b>
        <span>{t('Film.accordion.section5.content32')}</span>
      </li>
      <li>
        <b>{t('Film.accordion.section5.content41')}</b>
        <span>{t('Film.accordion.section5.content42')}</span>
      </li>
    </ul>
  )
}

const Accordion7Content = () => {
  const { t } = useTranslation()

  return (
    <ul className='list-inside list-disc'>
      <li>
        <strong>{t('Film.accordion.section7.content1')}</strong> {t('Film.accordion.section7.content2')}
      </li>
      <li>
        <strong>{t('Film.accordion.section7.content3')}</strong> {t('Film.accordion.section7.content4')}
        <ul className='list-inside list-[circle] pl-6'>
          <li>
            <strong>{t('Film.accordion.section7.criteria1.title')}</strong> {t('Film.accordion.section7.criteria1.description')}
          </li>
          <li>
            <strong>{t('Film.accordion.section7.criteria2.title')}</strong> {t('Film.accordion.section7.criteria2.description')}
          </li>
          <li>
            <strong>{t('Film.accordion.section7.criteria3.title')}</strong> {t('Film.accordion.section7.criteria3.description')}
          </li>
        </ul>
      </li>
    </ul>
  )
}

const Accordion8Content = () => {
  const { t } = useTranslation()

  return (
    <div>
      <p>{t('Film.accordion.section8.content1')}</p>
      <p className='mt-2'>{t('Film.accordion.section8.content2')}</p>
      <ul className='list-inside list-disc pl-3'>
        <li>{t('Film.accordion.section8.case1')}</li>
        <li>{t('Film.accordion.section8.case2')}</li>
        <li>{t('Film.accordion.section8.case3')}</li>
      </ul>
    </div>
  )
}

export default Film
