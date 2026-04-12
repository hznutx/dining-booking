'use client'

import { Card, Separator, ToggleButton } from '@heroui/react'
import { BiHeart } from 'react-icons/bi'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { BreadcrumbsPath } from '../design-system/BreadCrumb'
import { IDeal } from '@/types/deal'
import { PAGE } from '@/config/site'
import { useTranslations } from 'next-intl'
import { TimeController } from '../booking/TimeController'
import { Title } from '../design-system/Typography'
import { AiFillGift } from 'react-icons/ai'
import DealBookingForm from '../booking/DealBookingForm'

export interface IDealBooking {
  data?: IDeal
}

export const DealBookingPage: React.FC<IDealBooking> = ({ data: detail }) => {
  const t = useTranslations()
  const pathname = PAGE.RESTAURANT + `/${detail?.restaurants?.slug}/`

  return (
    <section className="container mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 pb-10 xl:grid-cols-10">
      <div id="blog" className="col-span-1 grid xl:col-span-7">
        <BreadcrumbsPath url={pathname} />
        <div id="header" className="mt-5 items-center space-y-6">
          <div className="w-full items-center justify-between xl:inline-flex">
            <h1 className="mr-6 text-xl font-extrabold xl:text-3xl">
              {detail?.name}
            </h1>
            <ToggleButton size="lg">
              <BiHeart />
            </ToggleButton>
          </div>
          <div className="relative w-full">
            <img
              alt="brand_logo"
              className="pointer-events-none block aspect-video w-full rounded-3xl object-cover select-none"
              loading="lazy"
              src={detail?.image}
            />
          </div>
        </div>
        {detail?.description && (
          <div id="content" className="mt-5 space-y-6">
            <Title
              label={t('deal.information')}
              prefixIcon={<BsFillInfoCircleFill size={20} />}
            />
            <p>{detail?.description}</p>
          </div>
        )}
      </div>

      <div id="side-bar" className="col-span-1 space-y-10 xl:col-span-3">
        <div className="xl:sticky xl:top-8 xl:bottom-auto">
          <Card>
            <Card.Header>
              <Title prefixIcon={<AiFillGift />} label={t('deal.booking')} />
              <Separator />
            </Card.Header>
            <Card.Content>
              <DealBookingForm data={detail} />
            </Card.Content>
          </Card>
        </div>
      </div>
    </section>
  )
}
