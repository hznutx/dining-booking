'use client'
import { AdminGuard } from '@/components/auth/AdminGuard'
import { EAdminMenu } from '@/enum'
import { LogoBrand } from '@/components/layout/navbar'
import { ThemeSwitch } from '@/components/theme-switch'
import { LogoutButton } from '@/components/design-system/ProfileAccount'
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher'
import { Link, usePathname } from '@/i18n/navigation'
import { Chip } from '@heroui/react'
import clsx from 'clsx'

const BrandTag = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(className, 'flex w-full items-center justify-between')}
    >
      <div className="inline-flex items-center gap-2">
        <LogoBrand />
        <Chip size="sm">Admin </Chip>
      </div>
      <LogoutButton
        type="icon"
        className="cursor-pointer hover:opacity-60 xl:hidden"
      />
    </div>
  )
}

export default function AdminLayout({ children }: { children: any }) {
  const menu = Object.values(EAdminMenu)
  const pathname = usePathname()
  const styleBackdrop = 'glass-bg'

  return (
    <AdminGuard>
      <div
        className={clsx(
          styleBackdrop,
          'mx-auto h-screen w-full justify-between xl:flex',
        )}
      >
        <BrandTag className="p-4 xl:hidden" />
        <div className="hidden-scroll relative flex w-full gap-4 overflow-x-scroll p-4 xl:w-1/6 xl:flex-col xl:overflow-x-hidden xl:p-6">
          <BrandTag className="mb-10 hidden xl:flex" />
          <div className="right-5 bottom-5 z-[50] hidden gap-5 xl:absolute xl:flex">
            <ThemeSwitch />
            <LogoutButton
              type="icon"
              className="cursor-pointer hover:opacity-60"
            />
          </div>
          {menu.map((item) => (
            <Link
              key={item}
              href={`/admin/${item}`}
              className={`non-scale w-full cursor-pointer rounded-3xl px-4 py-2 text-left capitalize ${
                pathname.endsWith(item)
                  ? 'bg-accent-hover text-shadow font-medium text-white'
                  : 'hover:bg-accent-soft'
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
        <div
          id="panel"
          className="w-full flex-1 overflow-y-auto px-6 pt-10 pb-20 xl:w-5/6"
        >
          {children}
        </div>
      </div>
    </AdminGuard>
  )
}
