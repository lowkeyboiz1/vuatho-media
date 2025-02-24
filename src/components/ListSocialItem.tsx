'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { FacebookIcon, TiktokIcon, YoutubeIcon, ZaloIcon } from '@/components/Icons'
type SocialNetwork = {
  id: string
  link: string
  icon: any | React.ReactNode
  background: string
  color: string
}

const ListSocialItem: React.FC = () => {
  const socialNetworkList: SocialNetwork[] = [
    {
      id: 'Facebook',
      icon: <FacebookIcon />,
      link: 'https://www.facebook.com/vuathovietnam',
      background: 'bg-[#0068FF]',
      color: '#0068FF'
    },
    {
      id: 'Tiktok',
      icon: <TiktokIcon />,
      link: 'https://www.tiktok.com/@vuatho.official',
      background: 'bg-[#000000]',
      color: '#000000'
    },
    {
      id: 'Youtube',
      icon: <YoutubeIcon />,
      link: 'https://www.youtube.com/@Vuatho.official/',
      background: 'bg-[#FF3131]',
      color: '#FF3131'
    },
    {
      id: 'Zalo',
      icon: <ZaloIcon />,
      link: 'https://zalo.me/622166130485793859',
      background: 'bg-[#0068FF]',
      color: '#0068FF'
    }
  ]

  return (
    <ul className='flex items-center justify-center'>
      {socialNetworkList.map((network) => (
        <SocialIcon key={network.id} {...network} />
      ))}
    </ul>
  )
}

const SocialIcon: React.FC<SocialNetwork> = ({ icon: icon, link, id, background }) => {
  const [onHover, setOnHover] = useState(false)
  return (
    <li className='group relative mx-1' key={id} onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
      <Link
        href={link}
        target='_blank'
        className='relative flex size-10 items-center justify-center overflow-hidden rounded-[20%] bg-white text-[#4d4d4d] duration-300 hover:text-white hover:shadow-[3px_2px_45px_0px_rgb(0_0_0_/_50%)]'
      >
        <div className={`absolute bottom-0 left-0 top-auto h-0 w-full duration-300 group-hover:h-full ${background}`} />
        {id === 'Zalo'
          ? React.cloneElement(icon, {
              fill: onHover ? 'white' : '#0D308C',
              className: 'text-black relative z-[10] size-[24px]',
              fillHover: onHover ? '#0068FF' : '#fff'
            })
          : React.cloneElement(icon, {
              className: '*:group-hover:fill-white text-black relative z-[10] size-[24px]'
            })}
      </Link>
    </li>
  )
}

export default ListSocialItem
