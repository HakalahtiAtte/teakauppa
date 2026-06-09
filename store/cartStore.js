'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

function itemMatches(item, productId, size, colorName) {
  return (
    item.product.id === productId &&
    item.size === size &&
    (item.color?.name ?? null) === (colorName ?? null)
  )
}

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem(product, size, color = null) {
        const existing = get().items.find((item) =>
          itemMatches(item, product.id, size, color?.name ?? null)
        )
        if (existing) {
          if (existing.quantity >= 10) return
          set((state) => ({
            items: state.items.map((item) =>
              itemMatches(item, product.id, size, color?.name ?? null)
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }))
        } else {
          set((state) => ({
            items: [...state.items, { product, size, color, quantity: 1 }],
          }))
        }
      },

      removeItem(productId, size, colorName = null) {
        set((state) => ({
          items: state.items.filter(
            (item) => !itemMatches(item, productId, size, colorName)
          ),
        }))
      },

      updateQuantity(productId, size, quantity, colorName = null) {
        if (quantity <= 0) {
          get().removeItem(productId, size, colorName)
          return
        }
        const capped = Math.min(quantity, 10)
        set((state) => ({
          items: state.items.map((item) =>
            itemMatches(item, productId, size, colorName)
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
