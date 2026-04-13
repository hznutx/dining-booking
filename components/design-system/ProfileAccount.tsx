'use client'

import { useUserMenu } from '@/services/hooks/useUser'
import { AuthResponse, User } from '@/types/user'
import { supabase } from '@/utils/supabase/client'
import { Avatar, AvatarRootProps, Badge, Button, Popover } from '@heroui/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

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
  const t = useTranslations()
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
          <div key={i} className="inline-flex items-center justify-between">
            <Link href={href}>{label}</Link>
            {i === 0 && Number(propData) > 0 ? (
              <div className="bg-danger aspect-square w-4 rounded-full p-px text-center text-[10px] text-white">
                {Number(propData) > 100 ? '100+' : Number(propData)}
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
      <Button
        className="rounded-full bg-black text-white"
        fullWidth
        size="sm"
        onPress={async () => {
          supabase.auth.signOut().finally(() => location.reload())
        }}
      >
        {t('user.menu.logout')}
      </Button>
    </div>
  )
}

export const ProfileImage: React.FC<IProfileAccount> = ({ ...props }) => {
  const { data } = props

  return (
    <Avatar {...props}>
      <Avatar.Image alt={data?.id} src={data?.user_metadata?.picture} />
      <Avatar.Fallback>{data?.email.charAt(0).toUpperCase()}</Avatar.Fallback>
    </Avatar>
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
