'use client'

import { AuthResponse, User } from '@/types/user'
import { supabase } from '@/utils/supabase/client'
import { Avatar, AvatarRootProps, Badge, Button, Popover } from '@heroui/react'
import { useState } from 'react'

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
      <Avatar.Image alt={data?.id} src={data?.user_metadata?.avatar_url} />
      <Avatar.Fallback>{data?.email.charAt(0).toUpperCase()}</Avatar.Fallback>
    </Avatar>
  )
}

const ProfileAccount: React.FC<AuthResponse> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false)

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
                    <p className="font-xl font-semibold">
                      {user?.user_metadata?.full_name}
                    </p>
                    <p className="text-muted text-sm">{user?.email}</p>
                  </div>
                </div>
              </div>
            </Popover.Heading>
            <Button
              className="rounded-full bg-black text-white"
              fullWidth
              size="sm"
              onPress={async () => {
                supabase.auth.signOut().finally(() => location.reload())
              }}
            >
              Logout
            </Button>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
      <Badge size="sm" color="danger">
        {2}
      </Badge>
    </Badge.Anchor>
  )
}

export default ProfileAccount
