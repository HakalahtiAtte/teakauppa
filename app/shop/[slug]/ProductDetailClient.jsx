'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import SizeGuideModal from '@/components/SizeGuideModal'
import StickyCartBar from '@/components/StickyCartBar'
import CartToast from '@/components/CartToast'
import YouMightAlsoLike from '@/components/YouMightAlsoLike'

const MockupEditor = dynamic(() => import('@/components/MockupEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 rounded-2xl bg-neutral-100">
      <span className="text-sm text-neutral-500">Loading editor…</span>
    </div>
  ),
})

const TYPES_WITH_GUIDE = ['tshirt', 'hoodie', 'socks', 'mug']

export default function ProductDetailClient({ product, relatedProducts }) {
  const { name, type, category, priceInCents, description, imageUrl, transparentBg, sizes, colors } = product

  const hasColors = colors?.length > 0
  const hasMultipleSizes = sizes.length > 1
  const autoSize = sizes.length === 1 ? sizes[0] : null

  const [selectedSize, setSelectedSize] = useState(autoSize)
  const [selectedColor, setSelectedColor] = useState(hasColors ? colors[0] : null)
  const [qty, setQty] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [added, setAdded] = useState(false)
  const [stickyVisible, setStickyVisible] = useState(false)

  const addItem = useCartStore((state) => state.addItem)
  const timerRef = useRef(null)
  const addToCartRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  useEffect(() => {
    const el = addToCartRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const formattedPrice = (priceInCents / 100).toLocaleString('en-GB', {
    style: 'currency',
    currency: 'EUR',
  })

  const handleAddToCart = useCallback(() => {
    if (hasMultipleSizes && !selectedSize) {
      setSizeError(true)
      return
    }
    setSizeError(false)
    for (let i = 0; i < qty; i++) {
      addItem(product, selectedSize ?? '', selectedColor)
    }
    setAdded(true)
    setToastVisible(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setAdded(false)
      setToastVisible(false)
    }, 2500)
  }, [hasMultipleSizes, selectedSize, selectedColor, qty, addItem, product])

  const handleSizeChange = (size) => {
    setSelectedSize(size)
    setSizeError(false)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Link
        href="/shop"
        className="mb-10 inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-[#8B5E3C] transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        All products
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        {transparentBg ? (
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
        ) : (
          <div className="relative mx-auto w-full max-w-sm aspect-[5/6] overflow-hidden rounded-2xl">
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-cover"
              priority
            />
          </div>
        )}

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

          {hasColors && (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-[#111111]">
                Colour{selectedColor && <span className="font-normal text-[#8B5E3C]"> — {selectedColor.name}</span>}
              </p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Select colour">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    aria-label={`Colour: ${color.name}`}
                    aria-pressed={selectedColor?.name === color.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#8B5E3C] focus-visible:outline-none ${
                      selectedColor?.name === color.name
                        ? 'border-[#8B5E3C] scale-110'
                        : 'border-transparent hover:border-neutral-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {hasMultipleSizes && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-[#111111]" id="size-label">
                  Size{selectedSize && <span className="font-normal text-[#8B5E3C]"> — {selectedSize}</span>}
                </p>
                {TYPES_WITH_GUIDE.includes(type) && (
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs text-neutral-400 underline underline-offset-2 hover:text-[#8B5E3C] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5E3C] rounded"
                  >
                    Size guide
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-labelledby="size-label">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    aria-pressed={selectedSize === size}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#8B5E3C] focus-visible:outline-none ${
                      selectedSize === size
                        ? 'bg-[#111111] text-white'
                        : 'bg-neutral-100 text-[#111111] hover:bg-neutral-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="text-xs text-red-500" role="alert">Please select a size before adding to cart.</p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-[#111111]">Quantity</p>
            <div className="flex items-center gap-3" role="group" aria-label="Quantity">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Decrease quantity"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 text-[#111111] hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#8B5E3C] focus-visible:outline-none"
              >
                −
              </button>
              <span className="w-8 text-center font-semibold text-[#111111]" aria-live="polite">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                disabled={qty >= 10}
                aria-label="Increase quantity"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 text-[#111111] hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#8B5E3C] focus-visible:outline-none"
              >
                +
              </button>
            </div>
          </div>

          <button
            ref={addToCartRef}
            onClick={handleAddToCart}
            aria-label={
              hasMultipleSizes && !selectedSize
                ? 'Select a size to add to cart'
                : `Add ${name} to cart`
            }
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#8B5E3C] px-8 py-4 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#8B5E3C] focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
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
              Upload a photo of your tea and place it on the product. Download your preview when you&apos;re happy with it.
            </p>
          </div>
          <MockupEditor shirtImageUrl={imageUrl} onAddToCart={handleAddToCart} added={added} />
        </div>
      </div>

      <YouMightAlsoLike products={relatedProducts} />

      <StickyCartBar
        visible={stickyVisible}
        product={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        sizes={hasMultipleSizes ? sizes : []}
        colors={colors ?? []}
        onSizeChange={handleSizeChange}
        onColorChange={setSelectedColor}
        onAddToCart={handleAddToCart}
        added={added}
      />

      <CartToast
        visible={toastVisible}
        productName={name}
        colorName={selectedColor?.name}
      />

      {showSizeGuide && (
        <SizeGuideModal
          type={type}
          onClose={() => setShowSizeGuide(false)}
        />
      )}
    </div>
  )
}
