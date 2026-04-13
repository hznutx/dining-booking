'use client'

import { useAuth } from '@/context/AuthContext'
import { getAvailableDeals } from '@/utils/supabase/user'
import { useTranslations } from 'next-intl'
import { useRef, useState, useEffect } from 'react'

export const useUserMenu = () => {
  const { user } = useAuth()
  const hasFetched = useRef(false)
  const t = useTranslations()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const loadDeals = async () => {
      const res = await getAvailableDeals(String(user?.id))
      setCount(res.count)
    }

    loadDeals()
  }, [user?.id])

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
  ]

  return { guestMenu, userMenu }
}
