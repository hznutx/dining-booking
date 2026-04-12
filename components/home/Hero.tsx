'use client'
import { PAGE } from '@/config/site'
import { EResType } from '@/enum'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

export const Hero = () => {
  const t = useTranslations()

  const heroData = {
    title: t('hero.title'),
    subtitle: t('hero.subtitle'),
    cta: {
      label: t('hero.label'),
      href: PAGE.EXPLORE,
    },
    categories: [
      { label: t('hero.categories.all'), href: EResType.ALL },
      { label: t('hero.categories.dining'), href: EResType.FINE_DINING },
      { label: t('hero.categories.cafe'), href: EResType.CAFE },
      { label: t('hero.categories.buffet'), href: EResType.BUFFET },
      { label: t('hero.categories.family'), href: EResType.FAMILY },
    ],
    images: {
      desktop: '/hero.jpg',
      mobile: '/hero_mb.jpg',
    },
  }

  const [isLoading, setIsLoading] = useState(true)

  return (
    <section>
      <div className="relative">
        <div className="absolute inset-0 hidden h-[calc(100svh-72px)] bg-black lg:block">
          {isLoading && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/60 backdrop-blur-sm">
              <div className="h-full w-full animate-pulse bg-black" />
            </div>
          )}
          <Image
            loading="eager"
            fill
            onLoadingComplete={() => setIsLoading(false)}
            className="w-full object-cover object-bottom-right opacity-80"
            src={heroData.images.desktop}
            alt=""
          />
        </div>
        <div className="relative z-50 pt-12 sm:pt-16 lg:pt-36 xl:pt-48">
          <div className="absolute inset-x-0 top-0 hidden lg:block">
            <div className="py-5">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-8">
                  {heroData.categories.map((item) => (
                    <a
                      key={item.label}
                      href={PAGE.EXPLORE + '?type=' + item.href}
                      className="rounded text-sm text-white transition-all duration-200 hover:text-amber-400"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <p className="text-base text-gray-50">{heroData.subtitle}</p>

              <h1 className="my-32 text-[clamp(2rem,3rem,6rem)] leading-tight font-medium text-white sm:mt-8 lg:mb-0 xl:mt-3">
                {heroData.title}
              </h1>

              <div className="mt-8 sm:mt-12">
                <a
                  href={heroData.cta.href}
                  className="inline-flex items-center justify-center rounded-2xl border border-transparent bg-gray-900 px-8 py-3 text-base leading-7 font-medium text-white transition-all duration-200 hover:bg-gray-600 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-[#FFE942] focus:outline-none"
                >
                  {heroData.cta.label}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[calc(100vh-72px)] lg:hidden">
          {isLoading && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/60 backdrop-blur-sm">
              <div className="h-full w-full animate-pulse bg-black" />
            </div>
          )}
          <div className="absolute inset-0 z-[40] h-full bg-black/40" />
          <Image
            loading="eager"
            fill
            onLoadingComplete={() => setIsLoading(false)}
            className="w-full object-cover object-bottom"
            src={heroData.images.mobile}
            alt=""
          />
        </div>
      </div>
    </section>
  )
}
