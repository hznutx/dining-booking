import clsx from 'clsx'
import { LogoBrand } from '@/components/layout/navbar'
import { Card, Chip } from '@heroui/react'
import { IRestaurant } from '@/types/deal'
import { ThemeSwitch } from '../theme-switch'
import LanguageSwitcher from '../i18n/LanguageSwitcher'

export const BrandTag = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(className, 'flex w-full items-center justify-between')}
    >
      <div className="inline-flex items-center gap-2">
        <LogoBrand />
        <Chip size="sm">Admin </Chip>
      </div>
      <div className="mr-4 inline-flex items-center gap-4 xl:hidden">
        <ThemeSwitch />
        <LanguageSwitcher />
      </div>
    </div>
  )
}

const BrandHeader = ({ detail }: { detail?: IRestaurant }) => {
  return (
    <div id="header" className="items-center space-x-6 md:inline-flex">
      <div className="relative aspect-square h-30">
        <img
          alt="brand_logo"
          className="pointer-events-none block aspect-square w-full rounded-full border border-gray-200 object-cover select-none"
          loading="lazy"
          src={detail?.brand_logo}
        />
      </div>
      <div className="mt-4 w-full items-center justify-between md:mt-0 xl:inline-flex">
        <h1 className="mr-6 text-xl font-extrabold whitespace-pre-wrap xl:text-3xl">
          {detail?.name}
        </h1>
      </div>
    </div>
  )
}

export default BrandHeader
