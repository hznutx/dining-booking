'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type CartItem = {
  id: number
  name: string
  price: number
  qty: number
}

type CartState = {
  items: CartItem[]
  expiredAt: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

const STORAGE_KEY = 'cart'
const EXPIRE_MS = 1000 * 60 * 60 * 24 * 7

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return

    try {
      const parsed: CartState = JSON.parse(raw)

      if (Date.now() > parsed.expiredAt) {
        localStorage.removeItem(STORAGE_KEY)
        return
      }

      setCart(parsed.items)
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    const payload: CartState = {
      items: cart,
      expiredAt: Date.now() + EXPIRE_MS,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id)

      if (exist) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + item.qty } : i,
        )
      }

      return [...prev, item]
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
