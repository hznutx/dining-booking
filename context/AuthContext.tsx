'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { EUserRole } from '@/enum'
import { IRestaurant } from '@/types/deal'

interface Profile {
  id: string
  role: EUserRole
  restaurant_id: number
  restaurants: IRestaurant
}

const AuthContext = createContext<{
  user: any
  profile: Profile | null
  loading: boolean
}>({
  user: null,
  profile: null,
  loading: true,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser()
      const user = data.user

      setUser(user)

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*,restaurants (*)')
          .eq('id', user.id)
          .single()

        setProfile(profile)
      }

      setLoading(false)
    }

    load()
  }, [])

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
