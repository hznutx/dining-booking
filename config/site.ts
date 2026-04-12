import { FaPhoneVolume } from 'react-icons/fa6'

export type ISiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Booking Dinner with Gelato',
  siteName: 'GELATO',
  description: 'Booking your next precious dinner in Italy with Gelato',
  navItems: [
    {
      key: 'percent_of',
      href: '/percent-of',
      type: 'menu',
    },
    {
      key: 'angel_number',
      href: '/percent-of',
      type: 'dropdown',
    },
  ],
  navMenuItems: [
    {
      key: 'percent_of',
      href: '/',
      parent: 'angel_number',
      icon: FaPhoneVolume,
    },

    {
      key: 'percent_of',
      href: '/projects',
      parent: 'angel_number',
      icon: FaPhoneVolume,
    },
  ],
  links: {
    twitter: 'https://github.com/hznutx',
    sponsor: 'https://i.ibb.co/8LhJnyht/image0.jpg',
  },
}

export const PAGE = {
  LOGIN: '/login',
  EXPLORE: '/explore',
  RESTAURANT: '/restaurants',
  USER_DEALS: '/my-booking',
  SETTING: '/setting',
}
