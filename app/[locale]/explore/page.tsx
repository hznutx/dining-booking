import { DealCard } from '@/components/booking/DealCard'
import Header from '@/components/restaurants/Header'
import { EResType } from '@/enum'
import { IDeal } from '@/types/deal'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function ExploreRestaurantsPage({
  searchParams,
}: {
  searchParams: { type?: string }
}) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { type } = await searchParams

  let { data: cate } = await supabase.from('categories').select('*')
  const cateId = cate?.find((item, i) => item.type == String(type))?.id
  let { data: allDeals, error } = await supabase
    .from('deals')
    .select(`*,restaurants (*),categories (*)`)

  const exploreData =
    !type || type === EResType.ALL
      ? allDeals
      : allDeals?.filter((list) => list.type === cateId)

  if (error) return <></>

  return (
    <section>
      <Header />
      <div className="container mx-auto mt-10 grid h-screen grid-flow-col gap-4">
        {exploreData?.map((deal: IDeal, i) => <DealCard key={i} data={deal} />)}
      </div>
    </section>
  )
}
