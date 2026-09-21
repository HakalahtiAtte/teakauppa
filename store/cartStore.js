'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { normalizeCartItem, normalizeCartItems, normalizeCheckouts, serializeCartItem } from '@/lib/cart'

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
      pendingCheckouts: [],

      addItem(product, size, color = null, quantity = 1) {
        const normalized = normalizeCartItem({ product, size, color, quantity })
        if (!normalized) return
        const existing = get().items.find((item) =>
          itemMatches(item, product.id, size, color?.name ?? null)
        )
        if (existing) {
          const next = Math.min(existing.quantity + quantity, 10)
          if (next === existing.quantity) return
          set((state) => ({
            items: state.items.map((item) =>
              itemMatches(item, product.id, size, color?.name ?? null)
                ? { ...item, quantity: next }
                : item
            ),
          }))
        } else {
          set((state) => ({
            items: [
              ...state.items,
              normalized,
            ],
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
        if (!Number.isInteger(quantity)) return
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

      rememberCheckout(sessionId, items) {
        const [checkout] = normalizeCheckouts([{ sessionId, items }])
        if (!checkout) return
        set((state) => ({
          pendingCheckouts: [...state.pendingCheckouts.filter((entry) => entry.sessionId !== sessionId), checkout].slice(-20),
        }))
      },

      clearCartForSession(sessionId) {
        const checkout = get().pendingCheckouts.find((entry) => entry.sessionId === sessionId)
        if (!checkout) return
        set((state) => ({
          items: state.items.flatMap((item) => {
            const purchased = checkout.items.find((entry) => entry.lineId === item.lineId &&
              itemMatches(item, entry.productId, entry.size, entry.colorName))
            if (!purchased) return [item]
            const quantity = item.quantity - purchased.quantity
            return quantity > 0 ? [{ ...item, quantity, lineId: crypto.randomUUID() }] : []
          }),
          pendingCheckouts: state.pendingCheckouts.filter((entry) => entry.sessionId !== sessionId),
        }))
      },
    }),
    {
      name: 'tea-shirts-cart',
      partialize: (state) => ({
        items: state.items.map(serializeCartItem),
        pendingCheckouts: state.pendingCheckouts,
      }),
      merge: (persisted, current) => ({
        ...current,
        items: normalizeCartItems(persisted?.items),
        pendingCheckouts: normalizeCheckouts(persisted?.pendingCheckouts),
      }),
    }
  )
)
