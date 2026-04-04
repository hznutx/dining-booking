'use client';

import { Avatar, AvatarRootProps, Badge, Button, Popover } from '@heroui/react';
import { useState } from 'react';

const data = {
  id: 4554,
  name: 'Sarah Johnson',
  src: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=1',
  username: 'sarahohio',
};

export const ProfileImage: React.FC<AvatarRootProps> = ({ ...props }) => {
  return (
    <Avatar {...props}>
      <Avatar.Image
        alt={data.name}
        src={data.src}
      />
      <Avatar.Fallback>{data.name.charAt(0).toUpperCase()}</Avatar.Fallback>
    </Avatar>
  );
};

const ProfileAccount = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <Badge.Anchor>
      <Popover>
        <Popover.Trigger aria-label='User profile'>
          <ProfileImage size='sm' />
        </Popover.Trigger>
        <Popover.Content
          className='w-[320px]'
          placement='bottom right'
        >
          <Popover.Dialog>
            <Popover.Heading>
              <div className='flex items-center justify-between mb-5'>
                <div className='flex items-center gap-3'>
                  <ProfileImage />
                  <div>
                    <p className='font-semibold'>{data.name}</p>
                    <p className='text-sm text-muted'>@{data.username}</p>
                  </div>
                </div>
              </div>
            </Popover.Heading>
            <Button
              className='rounded-full'
              fullWidth
              size='sm'
              variant={isFollowing ? 'tertiary' : 'primary'}
              onPress={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? 'Logout' : 'Login'}
            </Button>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
      <Badge
        size='sm'
        color='danger'
      >
        {2}
      </Badge>
    </Badge.Anchor>
  );
};

export default ProfileAccount;
