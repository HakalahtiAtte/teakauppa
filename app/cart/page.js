'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [checkoutError, setCheckoutError] = useState(null)

  const subtotalCents = items.reduce(
    (sum, item) => sum + item.product.priceInCents * item.quantity,
    0
  )

  const formatPrice = (cents) =>
    (cents / 100).toLocaleString('en-GB', { style: 'currency', currency: 'EUR' })

  async function handleCheckout() {
    setIsRedirecting(true)
    setCheckoutError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.id,
            size: item.size,
            quantity: item.quantity,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      window.location.href = data.url
    } catch (err) {
      setCheckoutError(err.message)
      setIsRedirecting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-32 sm:px-6 flex flex-col items-center gap-6 text-center">
        <h1
          className="text-4xl font-bold text-[#111111]"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Your cart is empty
        </h1>
        <p className="text-neutral-500">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-full bg-[#8B5E3C] px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5E3C]"
        >
          Browse shirts
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1
        className="mb-10 text-4xl font-bold text-[#111111]"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Your cart
      </h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={`${item.product.id}-${item.size}`}
            className="flex items-center gap-4 rounded-2xl bg-white border border-neutral-100 p-4 sm:p-5"
          >
            <div className="relative w-20 h-24 shrink-0">
              <Image
                src={item.product.imageUrl}
                alt={item.product.name}
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <h2 className="font-semibold text-[#111111] truncate">{item.product.name}</h2>
              <p className="text-sm text-neutral-500">Size: {item.size}</p>
              <p className="text-sm font-medium text-[#8B5E3C]">
                {formatPrice(item.product.priceInCents * item.quantity)}
                {item.quantity > 1 && (
                  <span className="ml-1 font-normal text-neutral-400">
                    ({formatPrice(item.product.priceInCents)} each)
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2" role="group" aria-label={`Quantity for ${item.product.name}`}>
                <button
                  onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 text-[#111111] hover:bg-neutral-200 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5E3C]"
                  aria-label={`Decrease quantity of ${item.product.name}`}
                >
                  −
                </button>
                <span className="w-6 text-center text-sm font-medium" aria-live="polite">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 text-[#111111] hover:bg-neutral-200 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5E3C]"
                  aria-label={`Increase quantity of ${item.product.name}`}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.product.id, item.size)}
                className="flex items-center justify-center w-8 h-8 rounded-full text-neutral-300 hover:text-red-400 hover:bg-red-50 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                aria-label={`Remove ${item.product.name} from cart`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <div className="flex items-baseline gap-4">
          <span className="text-sm text-neutral-500">Subtotal</span>
          <span className="text-2xl font-bold text-[#111111]">{formatPrice(subtotalCents)}</span>
        </div>
        <p className="text-xs text-neutral-500">
          Test mode — use card number <span className="font-mono">4242 4242 4242 4242</span>
        </p>
        {checkoutError && (
          <p className="text-xs text-red-500" role="alert">{checkoutError}</p>
        )}
        <button
          onClick={handleCheckout}
          disabled={isRedirecting}
          className="inline-flex items-center justify-center rounded-full bg-[#8B5E3C] px-10 py-4 text-sm font-semibold text-white hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5E3C]"
          aria-label="Proceed to Stripe checkout"
        >
          {isRedirecting ? 'Redirecting…' : 'Proceed to checkout'}
        </button>
      </div>
    </div>
  )
}
