'use client'

import DifferentContent from '@/components/DifferentContent'
import { useState } from 'react'

import { useTranslation } from '@/components/TranslationProvider'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import { formSchema } from '@/forms/formSchema'
import SubmissionForm from '@/forms/SubmissionForm'
import { FIELD_CONFIGS, TYPE_POST } from '@/lib/contants'
import { removeFields, removeKeyOfSchema } from '@/utils'

const Photo = () => {
  const { t, language } = useTranslation()

  const title = t('Photo.title')
  const dataDifferent =
    language === 'vi'
      ? [
          {
            title: 'Từ ngày 01.01 đến hết ngày 20.06.2025',
            content: {
              title: 'Vòng 1: Nhận bài và sơ tuyển',
              data: [
                'Thí sinh sản xuất phim theo chủ đề của cuộc thi.',
                'Nhấn Thích và Theo dõi Fanpage Vua Thợ - Thợ nào cũng có.',
                'Đăng tải video dự thi lên Facebook cá nhân ở chế độ công khai kèm hashtag #VuaTho #ToaSangCungVuaTho và phần mô tả ngắn gọn.',
                'Điền form đăng ký trên trang web cuộc thi và làm theo hướng dẫn.',
                'Ban Tổ chức kiểm duyệt bài dự thi trong vòng 48 giờ trước khi đăng tải lên cổng bình chọn chính thức.'
              ]
            },
            image: '/1.png'
          },
          {
            title: 'Từ ngày 27.06 đến hết ngày 30.06.2025',
            content: {
              title: 'Vòng 2: Công bố Top 10 và bình chọn',
              data: [
                'Ngày <b>27/06/2025</b>, Ban Tổ chức công bố Top 10 tác phẩm xuất sắc nhất do Ban Giám khảo chọn.',
                'Ban Tổ chức mở cổng bình chọn trên website cuộc thi đến hết ngày <b>30/06/2025</b>.',
                'Đăng tải video dự thi lên Facebook cá nhân ở chế độ công khai kèm hashtag #VuaTho #ToaSangCungVuaTho và phần mô tả ngắn gọn.',
                'Điền form đăng ký trên trang web cuộc thi và làm theo hướng dẫn.',
                'Ban Tổ chức kiểm duyệt bài dự thi trong vòng 48 giờ trước khi đăng tải lên cổng bình chọn chính thức.'
              ]
            },
            image: '/2.png'
          },
          {
            title: 'Ngày 02.07.2025',
            content: {
              title: 'Vòng 3: Công bố kết quả và trao giải',
              data: [
                'Kết quả chung cuộc sẽ được công bố vào ngày <b>02/07/2025</b>.',
                'Các tác giả đạt giải sẽ được Ban Tổ chức mời tham dự Lễ công bố và trao giải thưởng và giấy chứng nhận.',
                'Tiền thưởng sẽ được Ban Tổ chức khấu trừ tiền thuế thu nhập cá nhân theo quy định Việt Nam hiện hành'
              ]
            },
            image: '/3.png'
          }
        ]
      : [
          {
            title: 'From January 1 to June 20, 2025',
            content: {
              title: 'Round 1: Submission and Preliminary Selection',
              data: [
                "Contestants produce a film based on the competition's theme.",
                "Like and follow the 'Vua Thợ - Thợ nào cũng có' Fanpage.",
                'Upload the contest video to personal Facebook in public mode with hashtags #VuaTho #ToaSangCungVuaTho and a brief description.',
                'Fill out the registration form on the competition website and follow the instructions.',
                'The Organizing Committee will review the submission within 48 hours before posting it on the official voting portal.'
              ]
            },
            image: '/1.png'
          },
          {
            title: 'From June 27 to June 30, 2025',
            content: {
              title: 'Round 2: Top 10 Announcement and Voting',
              data: [
                'On <b>June 27, 2025</b>, the Organizing Committee will announce the Top 10 best entries selected by the Judges.',
                'The Organizing Committee will open the voting portal on the competition website until the end of <b>June 30, 2025</b>.',
                'Upload the contest video to personal Facebook in public mode with hashtags #VuaTho #ToaSangCungVuaTho and a brief description.',
                'Fill out the registration form on the competition website and follow the instructions.',
                'The Organizing Committee will review the submission within 48 hours before posting it on the official voting portal.'
              ]
            },
            image: '/2.png'
          },
          {
            title: 'July 2, 2025',
            content: {
              title: 'Round 3: Announcement of Results and Award Ceremony',
              data: [
                'The final results will be announced on <b>July 2, 2025</b>.',
                'Winning authors will be invited by the Organizing Committee to attend the Award Ceremony and receive prizes and certificates.',
                'Prize money will be subject to personal income tax deductions according to current Vietnamese regulations.'
              ]
            },
            image: '/3.png'
          }
        ]

  const data = [
    { value: t('Photo.accordion.section1.title'), question: t('Photo.accordion.section1.title'), answer: <Accordion1Content /> },
    { value: t('Photo.accordion.section2.title'), question: t('Photo.accordion.section2.title'), answer: <Accordion2Content /> },
    { value: t('Photo.accordion.section3.title'), question: t('Photo.accordion.section3.title'), answer: <Accordion3Content /> },
    { value: t('Photo.accordion.section4.title'), question: t('Photo.accordion.section4.title'), answer: <Accordion4Content /> },
    { value: t('Photo.accordion.section5.title'), question: t('Photo.accordion.section5.title'), answer: <Accordion5Content /> },
    { value: t('Photo.accordion.section6.title'), question: t('Photo.accordion.section6.title'), answer: <DifferentContent data={dataDifferent} /> },
    { value: t('Photo.accordion.section7.title'), question: t('Photo.accordion.section7.title'), answer: <Accordion7Content /> },
    { value: t('Photo.accordion.section8.title'), question: t('Photo.accordion.section8.title'), answer: <Accordion8Content /> }
  ]
  const [activeItem, setActiveItem] = useState<string | null>(data[0].value)
  const fieldsToRemove = ['']

  const newConfigs = removeFields(FIELD_CONFIGS(), fieldsToRemove)
  const newSchema = removeKeyOfSchema(formSchema(), fieldsToRemove)

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
              <AccordionContent className='px-5 pb-3 pt-2 text-base'>{item.answer}</AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
      <SubmissionForm title={title} type={TYPE_POST.IMAGE} fieldConfigs={newConfigs} formSchema={newSchema} />
    </div>
  )
}

const Accordion1Content = () => {
  const { t } = useTranslation()

  return (
    <ul className='list-inside list-disc'>
      <li>{t('Photo.accordion.section1.content1')}</li>
      <li>{t('Photo.accordion.section1.content2')}</li>
      <li>{t('Photo.accordion.section1.content3')}</li>
    </ul>
  )
}

const Accordion2Content = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h3 className='mt-2 text-lg font-semibold'>{t('Photo.accordion.section2.subTitle1')}</h3>
      <ul className='list-inside list-disc'>
        <li>{t('Photo.accordion.section2.content11')}</li>
        <li>{t('Photo.accordion.section2.content12')}</li>
        <li>{t('Photo.accordion.section2.content13')}</li>
        <li>{t('Photo.accordion.section2.content14')}</li>
        <li>{t('Photo.accordion.section2.content15')}</li>
      </ul>
      <h3 className='mt-2 text-lg font-semibold'>{t('Photo.accordion.section2.subTitle2')}</h3>
      <ul className='list-inside list-disc'>
        <li>{t('Photo.accordion.section2.content21')}</li>
        <li>{t('Photo.accordion.section2.content22')}</li>
        <li>
          {t('Photo.accordion.section2.content23')}
          <ul className='list-inside list-[circle] pl-6'>
            <li>{t('Photo.accordion.section2.criteria1')}</li>
            <li>{t('Photo.accordion.section2.criteria2')}</li>
            <li>{t('Photo.accordion.section2.criteria3')}</li>
            <li>{t('Photo.accordion.section2.criteria4')}</li>
            <li>{t('Photo.accordion.section2.criteria5')}</li>
          </ul>
        </li>
      </ul>
      <h3 className='mt-2 text-lg font-semibold'>{t('Photo.accordion.section2.subTitle3')}</h3>
      <ul className='list-inside list-disc'>
        <li>
          {t('Photo.accordion.section2.content31')} <b>{t('Photo.accordion.section2.content32')}</b>
        </li>
        <li>
          {t('Photo.accordion.section2.content33')} <b>{t('Photo.accordion.section2.content34')}</b>
          {t('Photo.accordion.section2.content35')}
        </li>
        <li>
          {t('Photo.accordion.section2.content36')} <b>{t('Photo.accordion.section2.content37')}</b>
          {t('Photo.accordion.section2.content38')}
        </li>
      </ul>
      <h3 className='mt-2 text-lg font-semibold'>{t('Photo.accordion.section2.subTitle4')}</h3>
      <ul className='list-inside list-disc'>
        <li>
          <b>{t('Photo.accordion.section2.content41')}</b>
          {t('Photo.accordion.section2.content42')}
        </li>
        <li>
          <b>{t('Photo.accordion.section2.content43')}</b>
          {t('Photo.accordion.section2.content44')}
          <b>{t('Photo.accordion.section2.content45')}</b>
          {t('Photo.accordion.section2.content46')}
        </li>
        <li>
          {t('Photo.accordion.section2.content47')}
          <b>{t('Photo.accordion.section2.content48')}</b>
          {t('Photo.accordion.section2.content49')}
        </li>
      </ul>
    </div>
  )
}

const Accordion3Content = () => {
  const { t } = useTranslation()

  return (
    <div>
      <ul className='list-inside list-disc'>
        <li>
          <b>{t('Photo.accordion.section3.content1')}</b>
          {t('Photo.accordion.section3.content2')}
          <b>{t('Photo.accordion.section3.content3')}</b>
          {t('Photo.accordion.section3.content4')}
          <b>{t('Photo.accordion.section3.content5')}</b>
        </li>
        <li>
          <b>{t('Photo.accordion.section3.content7')}</b>
          {t('Photo.accordion.section3.content8')}
        </li>
        <li>
          <b>{t('Photo.accordion.section3.content9')}</b>
          <ul className='list-inside list-disc pl-6'>
            <li>{t('Photo.accordion.section3.criteria1')}</li>
            <li>{t('Photo.accordion.section3.criteria2')}</li>
            <li>
              {t('Photo.accordion.section3.criteria3')}
              <b>{t('Photo.accordion.section3.criteria4')}</b>
              {t('Photo.accordion.section3.criteria5')}
            </li>
            <li>{t('Photo.accordion.section3.criteria6')}</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

const Accordion4Content = () => {
  const { t } = useTranslation()

  return (
    <ul className='list-inside list-disc'>
      <li>{t('Photo.accordion.section4.content1')}</li>
      <li>{t('Photo.accordion.section4.content2')}</li>
      <li>{t('Photo.accordion.section4.content3')}</li>
      <li>{t('Photo.accordion.section4.content4')}</li>
      <li>{t('Photo.accordion.section4.content5')}</li>
      <li>{t('Photo.accordion.section4.content6')}</li>
      <li>
        {t('Photo.accordion.section4.content7')}
        <b>{t('Photo.accordion.section4.content8')}</b>
        {t('Photo.accordion.section4.content9')}
      </li>
      <li>
        {t('Photo.accordion.section4.content10')}
        <b>{t('Photo.accordion.section4.content11')}</b>
        {t('Photo.accordion.section4.content12')}
      </li>
      <li>{t('Photo.accordion.section4.content13')}</li>
      <li>{t('Photo.accordion.section4.content14')}</li>
    </ul>
  )
}

const Accordion5Content = () => {
  const { t } = useTranslation()

  return (
    <ul className='list-inside list-disc'>
      <li>
        <b>{t('Photo.accordion.section5.content1')}</b>
        <span>{t('Photo.accordion.section5.content2')}</span>
      </li>
      <li>
        <b>{t('Photo.accordion.section5.content3')}</b>
        <span>{t('Photo.accordion.section5.content4')}</span>
      </li>
      <li>
        <b>{t('Photo.accordion.section5.content5')}</b>
        <span>{t('Photo.accordion.section5.content6')}</span>
      </li>
      <li>
        <b>{t('Photo.accordion.section5.content7')}</b>
        <span>{t('Photo.accordion.section5.content8')}</span>
      </li>
    </ul>
  )
}

const Accordion7Content = () => {
  const { t } = useTranslation()

  return (
    <ul className='list-inside list-disc'>
      <li>
        <strong>{t('Photo.accordion.section7.content1')}</strong> {t('Photo.accordion.section7.content2')}
      </li>
      <li>
        <strong>{t('Photo.accordion.section7.content3')}</strong> {t('Photo.accordion.section7.content4')}
        <ul className='list-inside list-[circle] pl-6'>
          <li>
            <strong>{t('Photo.accordion.section7.criteria1.title')}</strong> {t('Photo.accordion.section7.criteria1.description')}
          </li>
          <li>
            <strong>{t('Photo.accordion.section7.criteria2.title')}</strong> {t('Photo.accordion.section7.criteria2.description')}
          </li>
          <li>
            <strong>{t('Photo.accordion.section7.criteria3.title')}</strong> {t('Photo.accordion.section7.criteria3.description')}
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
      <p>{t('Photo.accordion.section8.content1')}</p>
      <p className='mt-2'>{t('Photo.accordion.section8.content2')}</p>
      <ul className='list-inside list-disc pl-3'>
        <li>{t('Photo.accordion.section8.case1')}</li>
        <li>{t('Photo.accordion.section8.case2')}</li>
        <li>{t('Photo.accordion.section8.case3')}</li>
      </ul>
    </div>
  )
}

export default Photo
