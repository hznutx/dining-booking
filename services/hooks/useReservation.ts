'use client'

import { IDeal, IRestaurant } from '@/types/deal'
import { IReservation } from '@/types/reservations'
import { supabase } from '@/utils/supabase/client'
import { isSameDay } from '@/utils/time-format'
import { useEffect, useState } from 'react'

export const useReservation = (resId: number) => {
  const [allBookings, setAllBookings] = useState<IReservation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getRestaurantLog = async () => {
      try {
        const { data, error } = await supabase
          .from('reservations')
          .select('*, deals (*)')
          .eq('restaurant_id', resId)

        if (error) {
          console.log(error)
          return
        }

        setAllBookings(data as IReservation[])
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (resId) {
      getRestaurantLog()
    }
  }, [resId])

  const fullBookingList = allBookings.filter((item) => item.redeem)
  const availableBookingList = allBookings.filter((item) => !item.redeem)

  const todayBookings = allBookings.filter((item) =>
    isSameDay(String(item.created_at)),
  )
  const uniqueBookings = allBookings.filter(
    (item, index, self) =>
      index ===
      self.findIndex((booking) => booking.guest_email === item.guest_email),
  )
  const countTotalSeatsToday = todayBookings.reduce(
    (sum, item) => sum + item.guest_count,
    0,
  )

  return {
    loading,
    todayBookings,
    countAll: allBookings.length,
    countTotalSeatsToday,
    allBookings,
    availableBookingList,
    fullBookingList,
    uniqueBookings,
  }
}

export const useManageRestaurant = (resId: number) => {
  const [data, setData] = useState<IRestaurant | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getRestaurantLog = async () => {
      try {
        const { data, error } = await supabase
          .from('restaurants')
          .select('*, deals (*)')
          .eq('id', resId)
          .single()
        if (error) {
          console.log(error)
          return
        }
        setData(data as IRestaurant)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (resId) {
      getRestaurantLog()
    }
  }, [resId])

  return {
    loading,
    restaurant: data,
    allDeals: data?.deals,
  }
}
