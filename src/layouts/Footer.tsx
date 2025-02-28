import { LogoIcon2 } from '@/components/Icons'
import ListSocialItem from '@/components/ListSocialItem'
import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import { memo } from 'react'

const Footer = () => {
  const listInfoFooter = [
    {
      title: '32/28 đường 35, P. An Khánh, TP. Thủ Đức, TP. HCM',
      icon: MapPin
    },
    {
      title: 'social@vuatho.com',
      icon: Mail
    },
    {
      title: <b>0912 426 404</b>,
      icon: Phone
    }
  ]
  return (
    <div className='flex flex-col'>
      {/* Background Image */}
      <div className='w-full'>
        <Image src={'/bg-footer.png'} alt='bg-footer' width={3000} height={3000} className='h-full w-full object-cover' />
      </div>

      {/* Footer Content */}
      <div className='mt-[-2px] bg-gradient-to-r from-[#0071BC] to-[#2E3192] py-12 md:py-16 lg:py-24'>
        <div className='container mx-auto flex w-full flex-col items-center gap-8 px-6 md:flex-row md:items-start md:justify-between'>
          {/* Logo */}
          <div className='flex justify-center md:justify-start'>
            <LogoIcon2 />
          </div>

          {/* Company Info */}
          <div className='flex flex-col items-center text-center text-white md:items-start md:text-left'>
            <p className='text-base font-bold lg:text-lg'>Công ty TNHH Công nghệ Vua Thợ</p>
            <div className='mt-3 flex flex-col gap-3'>
              {listInfoFooter.map((item) => (
                <div key={item.title.toString()} className='flex gap-2 text-left lg:items-center'>
                  <item.icon />
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className='flex flex-col items-center md:items-start'>
            <p className='text-base font-bold text-white lg:text-lg'>Kết nối với chúng tôi</p>
            <div className='mt-3'>
              <ListSocialItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Footer)
