import { DealCard } from '@/components/booking/DealCard'
import NotFound from '@/components/design-system/NotFound'
import { PaginationControlled } from '@/components/design-system/Pagination'
import Header from '@/components/restaurants/Header'
import { EResType } from '@/enum'
import { IDeal } from '@/types/deal'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function ExploreRestaurantsPage({
  searchParams,
}: {
  searchParams: Promise<{
    s?: string
    type?: string
    page?: string
    limit?: string
  }>
}) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { s, type, page = '1', limit = '8' } = await searchParams
  const pageNumber = Number(page)
  const pageSize = Number(limit)

  const from = (pageNumber - 1) * pageSize
  const to = from + pageSize - 1

  let { data: cate } = await supabase.from('categories').select('*')
  const cateId = cate
    ?.find((item) => item.type == String(type))
    ?.id.select(`*, restaurants(*), categories(*)`, { count: 'exact' })

  let query = supabase
    .from('deals')
    .select(`*, restaurants(*), categories(*)`, { count: 'exact' })

  if (s?.trim()) {
    query = query.or(`name.ilike.%${s}%,description.ilike.%${s}%`)
  }

  if (type && type !== EResType.ALL) {
    query = query.eq('type', cateId)
  }

  const { data: exploreData, count, error } = await query.range(from, to)

  if (error) return <NotFound />

  return (
    <section>
      <Header />
      <div className="relative container mx-auto my-10 px-5 xl:px-0">
        {!count ? (
          <NotFound />
        ) : (
          <>
            <div className="mx-auto mb-10 grid min-h-screen w-fit grid-cols-1 place-content-start place-items-center gap-4 md:grid-cols-2 xl:grid-cols-4">
              {exploreData?.map((deal: IDeal, i) => (
                <DealCard key={i} data={deal} />
              ))}
            </div>
            <PaginationControlled
              totalItems={count || 0}
              itemsPerPage={pageSize}
            />
          </>
        )}
      </div>
    </section>
  )
}
