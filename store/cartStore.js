'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem(product, size) {
        const existing = get().items.find(
          (item) => item.product.id === product.id && item.size === size
        )
        if (existing) {
          if (existing.quantity >= 10) return
          set((state) => ({
            items: state.items.map((item) =>
              item.product.id === product.id && item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }))
        } else {
          set((state) => ({
            items: [...state.items, { product, size, quantity: 1 }],
          }))
        }
      },

      removeItem(productId, size) {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.size === size)
          ),
        }))
      },

      updateQuantity(productId, size, quantity) {
        if (quantity <= 0) {
          get().removeItem(productId, size)
          return
        }
        const capped = Math.min(quantity, 10)
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.size === size
              ? { ...item, quantity: capped }
              : item
          ),
        }))
      },

      clearCart() {
        set({ items: [] })
      },
    }),
    {
      name: 'tea-shirts-cart',
    }
  )
)
