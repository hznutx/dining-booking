import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { EUserRole } from '@/enum'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const supabase = createClient(await cookies())

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile?.role === EUserRole.ADMIN) {
    const destination = profile?.restaurant
      ? '/admin/dashboard'
      : '/admin/setting'
    return NextResponse.redirect(new URL(destination, request.url))
  }

  return NextResponse.redirect(new URL('/', request.url))
}
