'use client'
import { supabase } from '@/utils/supabase/client'

const useFavorite = () => {
  const addFavorite = async (itemId: string) => {
    const { error } = await supabase
      .from('favorites')
      .insert([{ item_id: itemId }])

    if (error) console.error(error)
  }

  const removeFavorite = async (itemId: string) => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('item_id', itemId)

    if (error) console.error(error)
  }

  const checkFavoriteSinglePage = async (itemId: string) => {
    const { data } = await supabase
      .from('favorites')
      .select('id')
      .eq('item_id', itemId)
      .maybeSingle()

    return !!data
  }

  const getFavoriteList = async () => {
    try {
      const { data: favorites } = await supabase
        .from('favorites')
        .select('item_id')
      return {
        count: favorites?.length,
        list: favorites,
      }
    } catch (error) {
      return { count: 0, list: [] }
    }
  }

  const toggleFavorite = async (itemId: string, isFav: boolean) => {
    if (isFav) {
      await removeFavorite(itemId)
    } else {
      await addFavorite(itemId)
    }
  }

  return {
    addFavorite,
    checkFavoriteSinglePage,
    getFavoriteList,
    removeFavorite,
    toggleFavorite,
  }
}

export default useFavorite
