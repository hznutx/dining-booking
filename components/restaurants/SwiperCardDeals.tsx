'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import Link from 'next/link'
import { IDeal } from '@/types/deal'
import { DealCard } from '../booking/DealCard'

const DEFAULT_CONTENT_IMAGE = '/images/homepage/instructors/01.png'

const fallbackSlides: any[] = [
  {
    id: 'fallback-1',
    background_color: '#292D32',
    button_color: '#7F80D8',
    image_url: DEFAULT_CONTENT_IMAGE,
    button_label: 'ค้นหาคอร์สที่ใช่',
    content: 'Upgrade Your\nIncome with\nHigh-Income Skills',
    link_url: '/courses',
    display_order: 1,
    is_active: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'fallback-2',
    background_color: '#7F80D8',
    button_color: '#000000',
    image_url: DEFAULT_CONTENT_IMAGE,
    button_label: 'ค้นหาคอร์สที่ใช่',
    content: 'Upgrade Your\nIncome with\nHigh-Income Skills',
    link_url: '/courses',
    display_order: 2,
    is_active: true,
    created_at: '',
    updated_at: '',
  },
]

interface ISwiperCardDeals {
  data: IDeal[]
}

const SwiperCardDeals: React.FC<ISwiperCardDeals> = ({ data: slides }) => {
  const loading = slides?.length == 0

  const renderSlides = () => {
    const resolvedSlides = slides?.length > 0 ? slides : fallbackSlides

    if (!resolvedSlides.length) {
      return (
        <SwiperSlide className="overflow-x-hidden">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[#ccc]"></div>
            <p className="text-gray-600">...</p>
          </div>
        </SwiperSlide>
      )
    }

    return resolvedSlides.map((slide: IDeal) => (
      <SwiperSlide key={slide.id} className="mb-10 px-5">
        <DealCard data={slide} />
      </SwiperSlide>
    ))
  }

  return (
    <section className="relative w-full px-4 xl:px-0">
      {loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center backdrop-blur-sm" />
      )}

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000 }}
        loop
        pagination={{
          clickable: true,
        }}
        className="relative container mx-auto my-20 w-full overflow-clip px-5"
      >
        {renderSlides()}
      </Swiper>
    </section>
  )
}

export default SwiperCardDeals
