'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { PAGE } from '@/config/site'
import { CloseButton, Link, Separator } from '@heroui/react'
import NextLink from 'next/link'
import clsx from 'clsx'

import { siteConfig } from '@/config/site'
import { ThemeSwitch } from '@/components/theme-switch'
import { Logo, MenuIcon } from '@/components/icons'
import LanguageSwitcher from '../i18n/LanguageSwitcher'
import ProfileAccount from '../design-system/ProfileAccount'
import { SearchBar } from '../design-system/SearchBar'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/context/AuthContext'

export const LogoBrand = () => {
  return (
    <NextLink className="flex items-center space-x-2" href="/">
      <Logo size={26} />
      <h4 style={{ letterSpacing: 1 }} className="text-xl font-semibold">
        {siteConfig.siteName}
      </h4>
    </NextLink>
  )
}

export const getUserMenu = () => {
  const t = useTranslations()

  const guestMenu = [
    {
      label: t('navbar.sign_up'),
      href: '#',
    },
    {
      label: t('navbar.login'),
      href: '/login',
    },
  ]

  return guestMenu
}

export const UserMenu = () => {
  const { user, loading } = useAuth()

  const guestMenu = getUserMenu()
  const styleLabel = 'text-base transition-all duration-200 hover:text-gray-400'

  if (loading) {
    return <div />
  }

  return user?.id ? (
    <ProfileAccount user={user} />
  ) : (
    <div className="flex items-center space-x-4">
      <a href={guestMenu[0].href} className={styleLabel}>
        {guestMenu[0].label}
      </a>
      <Separator orientation="vertical" />
      <a href={guestMenu[1].href} className={styleLabel}>
        {guestMenu[1].label}
      </a>
    </div>
  )
}

export const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav>
      <header className="top-0 z-[150] w-full backdrop-blur-lg">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between lg:h-[72px]">
            <LogoBrand />
            <div className="flex items-center">
              <div className="mr-5 hidden items-center space-x-5 lg:flex">
                <SearchBar hidden={pathname.includes(PAGE.EXPLORE)} />
                <UserMenu />
                <LanguageSwitcher />
              </div>
              <button
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
                className="order-2 flex cursor-pointer p-2 lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MenuIcon />
              </button>
              <ThemeSwitch className="order-1 lg:order-2" />
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="bg-background/70 fixed inset-0 z-[200] h-screen px-4 backdrop-blur-lg lg:hidden">
          <div className="flex h-16 w-full items-center justify-between">
            <LogoBrand />
            <CloseButton
              onClick={() => setIsMenuOpen(false)}
              className="bg-transparent p-2"
            />
          </div>
          <ul className="flex flex-col gap-2 px-4 pt-10 pb-4">
            {siteConfig.navItems.map((item, index) => (
              <li key={`${index}`}>
                <Link
                  className={clsx(
                    'block py-2 text-lg no-underline',
                    index === 2
                      ? 'text-accent'
                      : index === siteConfig.navItems.length - 1
                        ? 'text-danger'
                        : 'text-foreground',
                  )}
                  href="#"
                >
                  {item.key}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
