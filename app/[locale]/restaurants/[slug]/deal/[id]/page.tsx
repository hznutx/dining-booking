import { DealBookingPage } from '@/components/restaurants/DealBooking'
import { IDeal } from '@/types/deal'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export default async function PackageByIdPage({ params }: { params: any }) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { id } = await params

  let { data, error } = await supabase
    .from('deals')
    .select('*,restaurants (*)')
    .eq('id', id)
    .maybeSingle()

  if (!data || error) {
    return notFound()
  }

  const dealPackage = data as IDeal

  return <DealBookingPage data={dealPackage} />
}
