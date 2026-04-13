'use client'

import { IDeal } from '@/types/deal'
import { supabase } from '@/utils/supabase/client'
import { useEffect } from 'react'

export const useCalendar = (deal: IDeal) => {
  let calendarBooked = null
  let fullBookingList = null
  let availableBookingList = null

  useEffect(() => {
    if (deal) {
      const getRestaurantLog = async () => {
        const { data } = await supabase
          .from('reservations')
          .select('*')
          .eq('restaurant_id', deal?.res_id)
        calendarBooked = data
      }
      getRestaurantLog()
    }
  }, [])

  return { event: calendarBooked, availableBookingList, fullBookingList }
}
