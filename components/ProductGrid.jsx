'use client'

import { getProducts, getFeaturedProducts } from '@/lib/products'
import ProductCard from './ProductCard'

export default function ProductGrid({ featured = false, filter = 'All', sort = 'default' }) {
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

  if (sorted.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-neutral-500">No products match this filter.</p>
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
