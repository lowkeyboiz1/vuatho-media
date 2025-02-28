import Image from 'next/image'

const DifferentContent = ({ data }: { data: any }) => {
  return (
    <div>
      {data.map((item: any) => (
        <div key={item.title} className='flex flex-col gap-4 pt-4 lg:flex-row'>
          <h1 className='lg:w-[200px] lg:min-w-[200px] lg:max-w-[200px]'>{item.title}</h1>
          <div className='hidden size-[50px] flex-shrink-0 lg:flex'>
            <Image src={item.image} alt='logo' width={100} height={100} sizes='size-full object-cover' />
          </div>
          <div className='relative'>
            <div className='border-1 absolute -left-[40px] top-0 z-[-1] hidden h-[calc(100%+40px)] border-l border-yellow lg:block' />
            <h1 className='text-lg font-bold'>{item.content.title}</h1>
            <div className='flex flex-col gap-2'>
              {item.content.data.map((content: any, index: number) => (
                <p key={content}>
                  {index + 1}. <span dangerouslySetInnerHTML={{ __html: content }} />
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DifferentContent
