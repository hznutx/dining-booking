'use client'

import { useTranslations } from 'next-intl'
import { SearchBar } from '../design-system/SearchBar'

const imgUrl =
  'https://i.ibb.co/CGKb0H9/dinner-set-with-sushi-soup-fried-chicken-noodles-cake.jpg'

const Header = () => {
  const t = useTranslations()

  return (
    <div>
      <div className="relative h-72 w-full">
        <div className="absolute bottom-10 z-10 w-full px-5">
          <div className="mx-auto max-w-3xl space-y-6">
            <div id="header" className="leading-tight">
              <h1 className="text-[6vw] font-bold text-white">
                {t('explore.header')}
              </h1>
              <h4 className="text-[3vw] font-bold text-white">
                {t('explore.subtitle')}
              </h4>
            </div>
            <SearchBar />
          </div>
        </div>
        <div className="absolute z-5 h-72 w-full bg-black/60" />
        <img
          src={imgUrl}
          alt="hero"
          fetchPriority="high"
          className="absolute z-0 h-72 w-full object-cover"
        />
      </div>
    </div>
  )
}

export default Header
