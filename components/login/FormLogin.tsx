'use client'

import { useState, useEffect } from 'react'
import { Button, Card, Input, Spinner, toast } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { Icon } from '../design-system/Icon'
import { supabase } from '@/utils/supabase/client'

export default function FormLogin() {
  const [mode, setMode] = useState<'login' | 'register' | 'active' | undefined>(
    undefined,
  )
  const [loading, setLoading] = useState(true)
  const [providerLoading, setProviderLoading] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        setMode('active')
        router.push('/')
      } else {
        setMode('login')
      }

      setLoading(false)
    }

    checkSession()
  }, [router])

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

        router.replace('/')
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
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        })

        if (error) {
          if (error.code === 'over_email_send_rate_limit') {
            toast.danger('Something went wrong')
          } else {
            toast.danger(`${error.message}`)
          }
          return
        }

        if (!data.user?.identities?.length) {
          toast.warning('User exists')
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
          redirectTo: `${location.origin}/auth/callback`,
        },
      })

      if (error) {
        toast.warning('fail login with other service')

        setProviderLoading(null)
      }
    } catch {
      toast.danger('Something went wrong')
    }
  }

  return (
    <div className="mx-auto flex h-screen w-full items-center justify-center">
      <Card style={{ width: 400 }}>
        <div>
          <form onSubmit={onSubmit} className="w-full space-y-8 p-6">
            <h1 className="text-center text-xl font-semibold">
              {mode === 'login' ? 'Login' : 'Register'}
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
                className="ml-1 cursor-pointer text-blue-500 underline"
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
                <Icon src="/icons/google.svg" size={16} />
                <span className="mt-0.5">Connect with Google</span>
              </div>
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
