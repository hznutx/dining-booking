'use client'

import { useAuth } from '@/context/AuthContext'
import { EUserRole } from '@/enum'
import { getUserBookings } from '@/utils/supabase/user'
import { useTranslations } from 'next-intl'
import { useRef, useState, useEffect } from 'react'

export const useUserMenu = () => {
  const { user } = useAuth()
  const t = useTranslations()
  const [count, setCount] = useState(0)
  const fetchedUserId = useRef<string | null>(null)

  useEffect(() => {
    if (!user?.id) return

    if (fetchedUserId.current === user.id) return

    fetchedUserId.current = user.id

    const loadDeals = async () => {
      const res = await getUserBookings(user.id)
      setCount(res.count || 0)
    }

    loadDeals()
  }, [])

  const guestMenu = [
    {
      label: t('navbar.sign_up'),
      href: '#',
    },
    {
      label: t('navbar.login'),
      href: '/login',
    },
  ]

  const userMenu = [
    {
      label: t('user.menu.booking_deals'),
      href: '',
      prop: count > 0,
      propData: count,
    },
    { label: t('user.menu.setting'), href: '' },
    { label: t('admin.setting'), href: '/admin/dashboard' },
  ]

  return { guestMenu, userMenu }
}
