import { supabase } from './client'

export const getAvailableDeals = async (userId: string) => {
  try {
    const { data } = await supabase
      .from('reservations')
      .select('id, deal_id,deals (*)')
      .eq('user_id', userId)
      .eq('redeem', false)

    return {
      count: data?.length ?? 0,
      deals: data ?? [],
    }
  } catch (error) {
    console.error('getAvailableDeals err:', error)
    return {
      count: 0,
      deals: [],
    }
  }
}
