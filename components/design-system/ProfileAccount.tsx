'use client'

import { useUserMenu } from '@/services/hooks/useUser'
import { AuthResponse, User } from '@/types/user'
import { supabase } from '@/utils/supabase/client'
import {
  Avatar,
  AvatarRootProps,
  Badge,
  Button,
  Popover,
  Tooltip,
} from '@heroui/react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LuLogOut } from 'react-icons/lu'

interface IProfileAccount extends AvatarRootProps {
  data?: User
}

interface IMenuItem {
  label: string
  href: string
  prop?: boolean
  propData?: number | string
}

type IProfileMenu = { menu: IMenuItem[]; user?: User }

export const ProfileMenu: React.FC<IProfileMenu> = ({ menu, user }) => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ProfileImage data={user} />
          <div>
            <p className="text-base font-semibold">
              {user?.user_metadata?.full_name}
            </p>
            <p className="text-muted line-clamp-1 h-5 text-sm">{user?.email}</p>
          </div>
        </div>
      </div>
      <div className="mb-4 flex flex-col space-y-2">
        {menu.map(({ label, href, propData }, i) => (
          <Link
            href={href}
            key={i}
            className="inline-flex items-center justify-between"
          >
            {label}
            {i === 0 && Number(propData) > 0 ? (
              <div className="bg-danger aspect-square w-4 rounded-full p-px text-center text-[10px] text-white">
                {Number(propData) > 100 ? '100+' : Number(propData)}
              </div>
            ) : (
              <></>
            )}
          </Link>
        ))}
      </div>
      <LogoutButton />
    </div>
  )
}

export const ProfileImage: React.FC<IProfileAccount> = ({ ...props }) => {
  const { data } = props

  return (
    <Avatar {...props}>
      <Avatar.Image alt={data?.id} src={data?.user_metadata?.avatar_url} />
      <Avatar.Fallback>{data?.email.charAt(0).toUpperCase()}</Avatar.Fallback>
    </Avatar>
  )
}

export const LogoutButton = ({
  type,
  className,
}: {
  type?: 'icon' | 'button'
  className?: string
}) => {
  const t = useTranslations()
  const handleLogOut = async () => {
    supabase.auth.signOut().finally(() => location.reload())
  }

  if (type === 'icon') {
    return (
      <div className={clsx(className)}>
        <Tooltip delay={0}>
          <Button isIconOnly variant="ghost" onPress={handleLogOut}>
            <LuLogOut onClick={handleLogOut} size={24} />
          </Button>
          <Tooltip.Content>
            <p>{t('user.menu.logout')}</p>
          </Tooltip.Content>
        </Tooltip>
      </div>
    )
  }

  return (
    <Button
      className={clsx(className, 'rounded-full bg-black text-white')}
      fullWidth
      size="sm"
      onPress={handleLogOut}
    >
      {t('user.menu.logout')}
    </Button>
  )
}

const ProfileAccount: React.FC<AuthResponse> = ({ user }) => {
  const { userMenu } = useUserMenu()
  return (
    <Badge.Anchor>
      <Popover>
        <Popover.Trigger aria-label="User profile">
          <ProfileImage size="sm" data={user} />
        </Popover.Trigger>
        <Popover.Content className="w-[320px]" placement="bottom right">
          <Popover.Dialog>
            <ProfileMenu menu={userMenu as IMenuItem[]} user={user} />
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
      {userMenu[0].prop && (
        <Badge size="sm" color="danger">
          {userMenu[0].propData > 100 ? '100+' : userMenu[0].propData}
        </Badge>
      )}
    </Badge.Anchor>
  )
}

export default ProfileAccount
