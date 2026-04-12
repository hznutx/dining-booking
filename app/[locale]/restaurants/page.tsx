import { RestaurantCard } from '@/components/restaurants/RestaurantCard'
import { createClient } from '@/utils/supabase/server'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

export default async function ExploreRestaurantsPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  let { data: restaurants, error } = await supabase
    .from('restaurants')
    .select(`*,deals (*),categories (*)`)

  if (error) return <></>

  return (
    <section>
      <div className="container mx-auto mt-10 flex space-y-6 space-x-6">
        {restaurants?.map((item, i) => <RestaurantCard key={i} data={item} />)}
      </div>
    </section>
  )
}
