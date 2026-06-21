'use client'
import { AdminMobileMenu, MenuButton } from './MenuButton'
import { CloseButton } from '@heroui/react'
import { useState } from 'react'
import { MenuIcon } from '../icons'
import { LogoutButton } from '../design-system/ProfileAccount'
import { EAdminMenu } from '@/enum'
import { BrandTag } from '../design-system/BrandHeader'

export const NavbarAdmin = ({ menu }: { menu?: string[] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div>
      <div className="fixed top-0 z-[150] w-full shadow backdrop-blur-xl xl:hidden">
        <div className="container mx-auto max-w-7xl px-4 xl:px-0">
          <div className="flex h-16 items-center justify-between lg:h-[72px]">
            <BrandTag />
            <button
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
              className="order-2 flex cursor-pointer p-2 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="bg-background/70 fixed inset-0 z-[200] h-screen px-4 backdrop-blur-lg lg:hidden">
          <div className="flex h-16 w-full items-center justify-between">
            <BrandTag />
            <CloseButton
              onClick={() => setIsMenuOpen(false)}
              className="ml-4 bg-transparent p-2"
            />
          </div>
          <ul className="flex h-[75vh] flex-col justify-between gap-4 px-4 pb-4">
            {menu?.map((menuItem, i) => <MenuButton menu={menuItem} key={i} />)}
            <LogoutButton type="button" className="cursor-pointer" />
          </ul>
        </div>
      )}
    </div>
  )
}
