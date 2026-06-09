'use client'

import { useState, useEffect } from 'react'
import { getProducts, getFeaturedProducts } from '@/lib/products'
import ProductCard from './ProductCard'
import ProductSkeleton from './ProductSkeleton'

export default function ProductGrid({ featured = false, filter = 'All', sort = 'default' }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const allProducts = featured ? getFeaturedProducts() : getProducts()

  const filtered =
    filter === 'All'
      ? allProducts
      : allProducts.filter((p) => p.category === filter)

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.priceInCents - b.priceInCents
    if (sort === 'price-desc') return b.priceInCents - a.priceInCents
    return 0
  })

  const skeletonCount = featured ? 3 : 6

  if (!mounted) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {sorted.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
