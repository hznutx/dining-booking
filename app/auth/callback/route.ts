import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = createClient(await cookies())
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/`)
}
