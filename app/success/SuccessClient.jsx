'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

export default function SuccessClient() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const clearCart = useCartStore((state) => state.clearCart)
  const [session, setSession] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      return
    }

    fetch(`/api/checkout/session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setStatus('error')
          return
        }
        setSession(data)
        setStatus('success')
        clearCart()
      })
      .catch(() => setStatus('error'))
  }, [sessionId, clearCart])

  if (status === 'loading') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-32 text-center">
        <p className="text-neutral-500">Confirming your order…</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-32 flex flex-col items-center gap-6 text-center">
        <h1
          className="text-3xl font-bold text-[#111111]"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Something went wrong
        </h1>
        <p className="text-neutral-500">We couldn&apos;t confirm your order. If you were charged, please get in touch.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#8B5E3C] px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity duration-200"
        >
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#8B5E3C]/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9 text-[#8B5E3C]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <div className="flex flex-col gap-3">
          <h1
            className="text-4xl font-bold text-[#111111] sm:text-5xl"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Order confirmed
          </h1>
          <p className="text-neutral-500 text-lg">
            Thanks{session?.customer_details?.name ? `, ${session.customer_details.name}` : ''}. Your tea shirts are on their way.
          </p>
        </div>

        {session?.customer_details?.email && (
          <p className="text-sm text-neutral-500">
            Confirmation sent to <span className="text-[#111111] font-medium">{session.customer_details.email}</span>
          </p>
        )}

        <div className="w-full rounded-2xl bg-neutral-50 border border-neutral-100 p-6 text-left">
          <p className="text-xs font-medium tracking-widest uppercase text-[#8B5E3C] mb-4">Order summary</p>
          <div className="flex items-baseline justify-between border-t border-neutral-100 pt-4">
            <span className="text-sm text-neutral-500">Total paid</span>
            <span className="text-lg font-bold text-[#111111]">
              {session?.amount_total
                ? (session.amount_total / 100).toLocaleString('en-GB', {
                    style: 'currency',
                    currency: session.currency?.toUpperCase() ?? 'EUR',
                  })
                : '—'}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full bg-[#8B5E3C] px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5E3C]"
          >
            Keep shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-8 py-3 text-sm font-medium text-[#111111] hover:bg-neutral-50 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5E3C]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
