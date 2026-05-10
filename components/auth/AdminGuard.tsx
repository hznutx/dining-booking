'use client'

import { useAuth } from '@/context/AuthContext'
import { EUserRole } from '@/enum'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (!user || profile?.role !== EUserRole.ADMIN) {
      router.replace('/login')
    }
  }, [user, profile, loading])

  if (!user || profile?.role !== EUserRole.ADMIN || loading) return

  return <>{children}</>
}
