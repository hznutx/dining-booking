import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(`${url.origin}/login`)
  }

  const supabase = createClient(await cookies())

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(`${url.origin}/login?error=auth`)
  }

  return NextResponse.redirect(`${url.origin}`)
}
