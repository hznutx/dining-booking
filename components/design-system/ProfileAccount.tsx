'use client'

import { AuthResponse, User } from '@/types/user'
import { supabase } from '@/utils/supabase/client'
import { getAvailableDeals } from '@/utils/supabase/user'
import { Avatar, AvatarRootProps, Badge, Button, Popover } from '@heroui/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

const mockUser = {
  id: 4554,
  name: 'Sarah Johnson',
  src: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=1',
  username: 'sarahohio',
}

interface IProfileAccount extends AvatarRootProps {
  data?: User
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
  const hasFetched = useRef(false)
  const t = useTranslations()
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const loadDeals = async () => {
      const res = await getAvailableDeals(String(user.id))
      setCount(res.count)
    }

    loadDeals()
  }, [user.id])

  const menu = [
    {
      label: t('user.menu.booking_deals'),
      href: '',
      prop:
        count > 0 ? (
          <div className="bg-danger aspect-square w-4 rounded-full p-px text-center text-[10px] text-white">
            {count > 100 ? '100+' : count}
          </div>
        ) : (
          <></>
        ),
    },
    { label: t('user.menu.setting'), href: '' },
  ]

  return (
    <Badge.Anchor>
      <Popover>
        <Popover.Trigger aria-label="User profile">
          <ProfileImage size="sm" data={user} />
        </Popover.Trigger>
        <Popover.Content className="w-[320px]" placement="bottom right">
          <Popover.Dialog>
            <Popover.Heading>
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ProfileImage data={user} />
                  <div>
                    <p className="text-base font-semibold">
                      {user?.user_metadata?.full_name}
                    </p>
                    <p className="text-muted line-clamp-1 h-5 text-sm">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Heading>
            <div className="mb-4 flex flex-col space-y-2">
              {menu.map(({ label, href, prop }, i) => (
                <div
                  key={i}
                  className="inline-flex items-center justify-between"
                >
                  <Link href={href}>{label}</Link>
                  {prop && prop}
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
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
      {count > 0 && (
        <Badge size="sm" color="danger">
          {count > 100 ? '100+' : count}
        </Badge>
      )}
    </Badge.Anchor>
  )
}

export default ProfileAccount
