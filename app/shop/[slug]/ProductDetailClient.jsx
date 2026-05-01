'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'

const MockupEditor = dynamic(() => import('@/components/MockupEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 rounded-2xl bg-neutral-100">
      <span className="text-sm text-neutral-500">Loading editor…</span>
    </div>
  ),
})

export default function ProductDetailClient({ product }) {
  const { name, category, priceInCents, description, imageUrl, sizes } = product
  const [selectedSize, setSelectedSize] = useState(null)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const formattedPrice = (priceInCents / 100).toLocaleString('en-GB', {
    style: 'currency',
    currency: 'EUR',
  })

  function handleAddToCart() {
    if (!selectedSize) return
    addItem(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div
          className="relative mx-auto w-full max-w-sm aspect-[5/6]"
          style={{ filter: 'drop-shadow(0 24px 32px rgba(0,0,0,0.12))' }}
        >
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 1024px) 80vw, 40vw"
            className="object-contain"
            priority
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium tracking-widest uppercase text-[#8B5E3C]">
              {category}
            </span>
            <h1
              className="text-4xl font-bold text-[#111111] sm:text-5xl"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {name}
            </h1>
            <p className="text-2xl font-semibold text-[#111111]">{formattedPrice}</p>
          </div>

          <p className="text-base leading-relaxed text-neutral-500">{description}</p>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-[#111111]" id="size-label">
              Size {selectedSize && <span className="font-normal text-[#8B5E3C]">— {selectedSize}</span>}
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="size-label">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={selectedSize === size}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5E3C] ${
                    selectedSize === size
                      ? 'bg-[#111111] text-white'
                      : 'bg-neutral-100 text-[#111111] hover:bg-neutral-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            aria-label={
              !selectedSize
                ? 'Select a size to add to cart'
                : `Add ${name} in size ${selectedSize} to cart`
            }
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#8B5E3C] px-8 py-4 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5E3C] sm:w-auto"
          >
            {added ? 'Added to cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>

      <div className="mt-24">
        <div className="rounded-2xl bg-neutral-50 border border-neutral-100 p-8 sm:p-12">
          <div className="mb-8 text-center">
            <h2
              className="mb-3 text-2xl font-bold text-[#111111] sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Customize with your tea
            </h2>
            <p className="text-neutral-500 max-w-md mx-auto">
              Upload a photo of your tea and place it on the shirt. Download your preview when you&apos;re happy with it.
            </p>
          </div>
          <MockupEditor shirtImageUrl={imageUrl} />
        </div>
      </div>
    </div>
  )
}
