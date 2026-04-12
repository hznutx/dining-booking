import { DetailPage } from '@/components/restaurants/DetailPage'
import { IRestaurant } from '@/types/deal'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export default async function RestaurantByIdPage({ params }: { params: any }) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { slug } = await params

  let { data, error } = await supabase
    .from('restaurants')
    .select('*,deals (*)')
    .eq('slug', slug)
    .maybeSingle()

  if (!data || error) {
    return notFound()
  }

  const detail = data as IRestaurant

  return <DetailPage data={detail} />
}
