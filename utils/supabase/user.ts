import { supabase } from './client'

export const getUserBookings = async (userId: string) => {
  try {
    const { data } = await supabase
      .from('reservations')
      .select('id')
      .eq('user_id', userId)
      .eq('redeem', false)

    return {
      count: data?.length ?? 0,
      deals: data ?? [],
    }
  } catch (error) {
    console.log('getUserBookings err:', error)
    return {
      count: 0,
      deals: [],
    }
  }
}
