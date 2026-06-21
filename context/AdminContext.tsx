'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { User } from '@/types/user'

type AdminContextType = {
  user: User | null
  loading: boolean
}

const AdminContext = createContext<AdminContextType | null>(null)

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user ?? null)
      setLoading(false)
    }

    init()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      },
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <AdminContext.Provider value={{ user, loading }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const ctx = useContext(AdminContext)
  if (!ctx) console.log('useAdmin must be used within AdminProvider')
  return ctx
}
