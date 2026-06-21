'use client'
import { CloseIcon, Drawer } from '@heroui/react'
import { usePathname, useRouter } from 'next/navigation'
import { Button, Link } from 'react-aria-components'
import { MenuIcon } from '../icons'

export const MenuButton = ({ menu, href }: { menu: string; href?: string }) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <button
      key={menu}
      onClick={() => router.push(href ?? `/admin/${menu}`)}
      className={`non-scale w-full cursor-pointer rounded-3xl px-4 py-2 text-left capitalize ${
        pathname.endsWith(menu)
          ? 'bg-accent-hover text-shadow font-medium text-white'
          : 'hover:bg-accent-soft'
      }`}
    >
      {menu}
    </button>
  )
}

export const AdminMobileMenu = () => {
  return (
    <Drawer>
      <Button className={'cursor-pointer'}>
        <MenuIcon size={24} />
      </Button>
      <Drawer.Backdrop style={{ zIndex: 1000 }}>
        <Drawer.Content placement="bottom">
          <Drawer.Dialog className={'h-[80vh]'}>
            <Drawer.Header>
              <Drawer.Heading className="flex w-full justify-end">
                <Button slot="close" className={'cursor-pointer'}>
                  <CloseIcon />
                </Button>
              </Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body></Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  )
}
