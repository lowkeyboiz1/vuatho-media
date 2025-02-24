import Image from 'next/image'

const DifferentContent = () => {
  const data = [
    {
      title: 'Từ ngày 01.01 đến hết ngày 20.06.2025',
      content: {
        title: 'Vòng 1: Nhận bài và sơ tuyển',
        data: [
          'Thí sinh sản xuất video theo chủ đề của cuộc thi.',
          'Nhấn Thích và Theo dõi Fanpage Vua Thợ - Thợ nào cũng có.',
          'Đăng tải hình ảnh dự thi lên Facebook cá nhân ở chế độ công khai kèm hashtag #VuaTho #ToaSangCungVuaTho và phần mô tả ngắn gọn.',
          'Điền form đăng ký trên trang web cuộc thi và làm theo hướng dẫn.',
          'Ban Tổ chức kiểm duyệt bài dự thi trong vòng 48 giờ trước khi đăng tải lên cổng bình chọn chính thức.'
        ]
      },
      image: '/1.png'
    },
    {
      title: 'Từ ngày 01.01 đến hết ngày 20.06.2025',
      content: {
        title: 'Vòng 1: Nhận bài và sơ tuyển',
        data: [
          'Thí sinh sản xuất video theo chủ đề của cuộc thi.',
          'Nhấn Thích và Theo dõi Fanpage Vua Thợ - Thợ nào cũng có.',
          'Đăng tải hình ảnh dự thi lên Facebook cá nhân ở chế độ công khai kèm hashtag #VuaTho #ToaSangCungVuaTho và phần mô tả ngắn gọn.',
          'Điền form đăng ký trên trang web cuộc thi và làm theo hướng dẫn.',
          'Ban Tổ chức kiểm duyệt bài dự thi trong vòng 48 giờ trước khi đăng tải lên cổng bình chọn chính thức.'
        ]
      },
      image: '/1.png'
    }
  ]
  return (
    <div>
      {data.map((item) => (
        <div key={item.title} className='flex gap-4 pt-4'>
          <h1>{item.title}</h1>
          <div className='flex size-[50px] flex-shrink-0'>
            <Image src={item.image} alt='logo' width={100} height={100} sizes='size-full object-cover' />
          </div>
          <div className='relative'>
            <div className='border-1 absolute -left-[40px] top-0 z-[-1] h-[calc(100%+40px)] border-l border-yellow' />
            <h1 className='text-lg font-bold'>{item.content.title}</h1>
            <div className='flex flex-col gap-2'>
              {item.content.data.map((content, index) => (
                <p key={content}>
                  {index + 1}. {content}
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
