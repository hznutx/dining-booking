'use client'

import { IRestaurant } from '@/types/deal'
import { IReservation } from '@/types/reservations'
import { supabase } from '@/utils/supabase/client'
import { isSameDay } from '@/utils/time-format'
import useSWR from 'swr'

const reservationFetcher = async (restaurantId: number) => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*, deals (*)')
    .eq('restaurant_id', restaurantId)

  if (error) throw error

  return (data ?? []) as IReservation[]
}

export const useReservation = (restaurantId: number) => {
  const {
    data: allBookings = [],
    isLoading,
    mutate,
  } = useSWR(
    restaurantId ? ['reservations', restaurantId] : null,
    () => reservationFetcher(restaurantId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  )

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
    loading: isLoading,
    todayBookings,
    countAll: allBookings.length,
    countTotalSeatsToday,
    allBookings,
    availableBookingList,
    fullBookingList,
    uniqueBookings,
    refresh: mutate,
  }
}

const restaurantFetcher = async (restaurantId: number) => {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*, deals (*)')
    .eq('id', restaurantId)
    .single()

  if (error) throw error

  return data as IRestaurant
}

export const useManageRestaurant = (restaurantId?: number, userId?: string) => {
  const {
    data: restaurant,
    isLoading,
    mutate,
  } = useSWR(
    restaurantId ? ['restaurant', restaurantId] : null,
    () => restaurantFetcher(restaurantId!),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  )

  const createRestaurant = async (payload: Partial<IRestaurant>) => {
    if (!userId) {
      throw new Error('User not found')
    }

    const { data: restaurantSubmit, error } = await supabase
      .from('restaurants')
      .insert(payload)
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        throw new Error('Restaurant name or URL already exists')
      }

      throw error
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        restaurant_id: restaurantSubmit.id,
      })
      .eq('id', userId)

    if (profileError) {
      throw profileError
    }

    await mutate(restaurantSubmit as IRestaurant, false)

    return restaurantSubmit
  }

  const updateRestaurant = async (payload: Partial<IRestaurant>) => {
    if (!restaurantId) {
      throw new Error('Restaurant id is required')
    }

    const { data: updatedRestaurant, error } = await supabase
      .from('restaurants')
      .update(payload)
      .eq('id', restaurantId)
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        throw new Error('Restaurant name or URL already exists')
      }

      throw error
    }

    await mutate(updatedRestaurant as IRestaurant, false)

    return updatedRestaurant
  }

  return {
    loading: isLoading,
    restaurant,
    allDeals: restaurant?.deals ?? [],
    createRestaurant,
    updateRestaurant,
    refresh: mutate,
  }
}
