'use client'

import { useState } from 'react'
import { CloseButton, Link, Separator } from '@heroui/react'
import NextLink from 'next/link'
import clsx from 'clsx'

import { siteConfig } from '@/config/site'
import { ThemeSwitch } from '@/components/theme-switch'
import { Logo, MenuIcon } from '@/components/icons'
import LanguageSwitcher from '../i18n'
import ProfileAccount from '../design-system/ProfileAccount'
import { SearchBar } from '../design-system/SearchBar'
import { useTranslations } from 'next-intl'

const LogoBrand = () => {
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
      label: t('navbar.signup'),
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
  const getUser = () => true
  const guestMenu = getUserMenu()
  const styleLabel = 'text-base transition-all duration-200 hover:text-gray-400'

  return (
    <>
      {getUser() ? (
        <div className="flex items-center space-x-4">
          <a
            key={guestMenu[0].label}
            href={guestMenu[0].href}
            className={styleLabel}
          >
            {guestMenu[0].label}
          </a>
          <Separator orientation="vertical" />
          <a
            key={guestMenu[1].label}
            href={guestMenu[1].href}
            className={styleLabel}
          >
            {guestMenu[1].label}
          </a>
        </div>
      ) : (
        <ProfileAccount />
      )}
    </>
  )
}

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav>
      <header className="bg-background top-0 z-[150] w-screen backdrop-blur-lg">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between lg:h-[72px]">
            <LogoBrand />
            <div className="flex items-center">
              <div className="mr-5 hidden items-center space-x-5 lg:flex">
                <SearchBar />
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
