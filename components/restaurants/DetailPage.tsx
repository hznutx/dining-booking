'use client'

import { ToggleButton } from '@heroui/react'
import { BiHeart } from 'react-icons/bi'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { BreadcrumbsPath } from '../design-system/BreadCrumb'
import SwiperCardDeals from './SwiperCardDeals'
import { IDeal, IRestaurant } from '@/types/deal'
import { PAGE } from '@/config/site'
import { useTranslations } from 'next-intl'
import BrandHeader from '../design-system/BrandHeader'

interface IDetailPage {
  data?: IRestaurant
}

export const DetailPage: React.FC<IDetailPage> = ({ data: detail }) => {
  const t = useTranslations()
  const pathname = PAGE.RESTAURANT + `/${detail?.name}`

  const detailCard = detail?.deals?.map((deal) => ({
    ...deal,
    restaurants: { slug: detail?.slug },
  })) as IDeal[]

  return (
    <section className="container mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 pb-10 xl:grid-cols-10 xl:px-0">
      <div id="blog" className="col-span-1 grid xl:col-span-7">
        <BreadcrumbsPath url={pathname} />
        <BrandHeader detail={detail} />
        {detail?.description && (
          <div id="content" className="mt-5">
            <p className="mb-5 inline-flex items-center gap-2 text-xl font-[600] text-slate-400">
              <BsFillInfoCircleFill
                size={20}
                className="text-[var(--color-accent-hover)]"
              />
              {t('restaurant.information')}
            </p>
            <p>{detail?.description}</p>
          </div>
        )}
      </div>

      <div id="side-bar" className="col-span-1 xl:col-span-3">
        <SwiperCardDeals data={detailCard} />
      </div>
    </section>
  )
}
