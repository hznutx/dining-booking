'use client'
import { AdminGuard } from '@/components/auth/AdminGuard'
import { EAdminMenu } from '@/enum'
import { LogoBrand } from '@/components/layout/navbar'
import { ThemeSwitch } from '@/components/theme-switch'
import { LogoutButton } from '@/components/design-system/ProfileAccount'
import { Card, Chip } from '@heroui/react'
import clsx from 'clsx'
import { MenuButton } from '@/components/admin/MenuButton'
import { useAuth } from '@/context/AuthContext'
import { NavbarAdmin } from '@/components/admin/NavbarAdmin'
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher'
import { usePathname } from 'next/navigation'

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

export default function AdminLayout({ children }: { children: any }) {
  const { profile } = useAuth()
  const pathname = usePathname()
  const menu = profile?.restaurants
    ? [...Object.values(EAdminMenu), 'setting']
    : ['setting']
  const styleBackdrop = 'glass-bg'

  return (
    <AdminGuard>
      <div
        className={clsx(
          styleBackdrop,
          'mx-auto h-screen w-full justify-between xl:flex',
        )}
      >
        <NavbarAdmin menu={menu} />
        <div className="relative hidden w-full flex-col gap-4 overflow-x-hidden p-6 xl:flex xl:w-1/6">
          <BrandTag className="mb-5 hidden xl:flex" />
          <div className="right-5 bottom-5 z-[50] hidden gap-5 xl:absolute xl:flex">
            <ThemeSwitch />
            <LogoutButton
              type="icon"
              className="cursor-pointer hover:opacity-60"
            />
          </div>
          {menu.map((item, i) => {
            return <MenuButton menu={item} key={i} />
          })}
        </div>
        <div
          id="panel"
          className={`${pathname.includes(EAdminMenu.dashboard) ? 'px-0' : 'px-6'} w-full flex-1 overflow-y-auto pt-25 xl:w-5/6 xl:pt-10`}
        >
          <div className="h-[90vh]">{children}</div>
        </div>
        <div className="absolute top-5 right-5 z-[100] hidden xl:flex">
          <LanguageSwitcher />
        </div>
      </div>
    </AdminGuard>
  )
}
