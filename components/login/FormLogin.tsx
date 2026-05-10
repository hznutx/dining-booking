'use client'

import { useState, useEffect } from 'react'
import { Button, Card, Input, toast } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { Icon } from '../design-system/Icon'
import { supabase } from '@/utils/supabase/client'
import { publicUrlSvgFile } from '@/utils'
import { EUserRole } from '@/enum'
import { LogoBrand } from '../layout/navbar'

interface FormLoginProps {
  redirectTo?: string
  requireRole?: EUserRole
}

export default function FormLogin({
  redirectTo = '/',
  requireRole,
}: FormLoginProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [loading, setLoading] = useState(true)
  const [providerLoading, setProviderLoading] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        router.replace(redirectTo)
      } else {
        setMode('login')
      }

      setLoading(false)
    }

    checkSession()
  }, [router, redirectTo])

  const handleAfterLogin = async () => {
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    if (!user) return

    if (requireRole) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!profile || profile.role !== requireRole) {
        toast.warning('Permission denied')
        await supabase.auth.signOut()
        return
      }
    }

    router.replace(redirectTo)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    setLoading(true)

    if (mode === 'login') {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          toast.warning('Login failed')
          return
        }

        toast.success('Login success 🎉')

        await handleAfterLogin()
      } catch {
        toast.danger('Something went wrong')
      } finally {
        setLoading(false)
      }
    } else {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (error) {
          toast.danger(error.message)
          return
        }

        if (!data.user?.identities?.length) {
          toast.warning('User already exists')
          return
        }

        toast.success('Check your email 📩')
      } catch {
        toast.danger('Something went wrong')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleOAuthLogin = async (provider: 'google') => {
    try {
      setProviderLoading(provider)

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        toast.warning('Login failed')
        setProviderLoading(null)
      }
    } catch {
      toast.danger('Something went wrong')
    }
  }

  return (
    <div className="mx-auto flex h-screen w-full items-center justify-center">
      <div className="mx-auto flex flex-col items-center justify-center space-y-6">
        <LogoBrand />
        <Card style={{ width: 400 }}>
          <form onSubmit={onSubmit} className="w-full space-y-8 p-6">
            <h1 className="text-center text-xl font-semibold">
              {requireRole === 'ADMIN'
                ? 'Admin Login'
                : mode === 'login'
                  ? 'Login'
                  : 'Register'}
            </h1>

            <Input
              required
              name="email"
              type="email"
              fullWidth
              placeholder="Enter your email"
            />

            <Input
              required
              name="password"
              type="password"
              fullWidth
              placeholder="Enter your password"
            />

            <Button
              type="submit"
              className="w-full bg-amber-500"
              isDisabled={loading || providerLoading !== null}
            >
              {mode === 'login' ? 'Login' : 'Register'}
            </Button>

            <p className="text-center text-sm">
              {mode === 'login' ? 'No account?' : 'Already have an account?'}
              <button
                type="button"
                className="ml-1 text-blue-500 underline"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              >
                {mode === 'login' ? 'Register' : 'Login'}
              </button>
            </p>

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300" />
              <span className="mx-2 px-2 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300" />
            </div>

            <Button
              className="w-full bg-black text-white hover:bg-gray-700"
              type="button"
              onClick={() => handleOAuthLogin('google')}
              isDisabled={providerLoading === 'google'}
            >
              <div className="flex items-center justify-center gap-2">
                <Icon src={publicUrlSvgFile('google.svg')} size={16} />
                <span>Connect with Google</span>
              </div>
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
