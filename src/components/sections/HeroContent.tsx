import { Button } from '@/components/ui/button'

const HeroContent = () => {
  const content = [
    'Cuộc thi "Sáng tạo không giới hạn, tỏa sáng cùng Vua Thợ" là hành trình khám phá và tôn vinh những người thợ – những người lao động thầm lặng nhưng đầy kiên cường, luôn cống hiến hết mình cho công việc và cuộc sống.',
    'Thông qua hạng mục phim ngắn và nhiếp ảnh, chúng tôi mời gọi các tác giả gửi gắm những câu chuyện đầy cảm hứng, phản ánh vẻ đẹp lao động, sự sáng tạo và tinh thần không ngừng vươn lên của các nghề nghiệp.',
    'Đây là cơ hội để cộng đồng sáng tạo thể hiện tài năng, mang đến những góc nhìn sâu sắc và nhân văn, khẳng định giá trị của người thợ trong xã hội hiện đại.'
  ]
  const videoUrl = 'https://archive.org/download/Popeye_forPresident/Popeye_forPresident_512kb.mp4' // Public domain video URL
  return (
    <div className='grid h-full grid-cols-1 gap-2.5 lg:grid-cols-2'>
      {/* Video Section */}
      <div className='h-full'>
        <video autoPlay loop muted className='aspect-video h-full w-full rounded-lg object-cover'>
          <source src={videoUrl} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Section */}
      <div className='flex h-full flex-col gap-4 p-4'>
        <div className='flex w-full flex-col items-center justify-center text-gray-600'>
          {content.map((item, index) => (
            <div key={index} className='text-gray-600'>
              {item}
            </div>
          ))}
        </div>
        <div className='flex flex-col gap-4 lg:flex-row'>
          <div className='relative flex-1'>
            <div className='absolute inset-0 translate-y-1 rounded-lg bg-[#E8CC3F]'></div>
            <Button className='relative flex h-auto w-full flex-col rounded-lg bg-gradient-to-r from-[#FFE467] via-[#FFF492] to-[#FEDD38] text-blue transition-transform active:translate-y-1'>
              <p className='text-lg font-bold uppercase'>HẠNG MỤC PHIM NGẮN</p>
              <i className='text-sm'>(Chi tiết thể lệ)</i>
            </Button>
          </div>
          <div className='relative flex-1'>
            <div className='absolute inset-0 translate-y-1 rounded-lg bg-[#E8CC3F]'></div>
            <Button className='relative flex h-auto w-full flex-col rounded-lg bg-gradient-to-r from-[#FFE467] via-[#FFF492] to-[#FEDD38] text-blue transition-transform active:translate-y-1'>
              <p className='text-lg font-bold uppercase'>HẠNG MỤC NHIẾP ẢNH</p>
              <i className='text-sm'>(Chi tiết thể lệ)</i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroContent
