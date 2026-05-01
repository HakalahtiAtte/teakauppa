'use client'

import { getProducts, getFeaturedProducts } from '@/lib/products'
import ProductCard from './ProductCard'

export default function ProductGrid({ featured = false, filter = 'All' }) {
  const allProducts = featured ? getFeaturedProducts() : getProducts()

  const visibleProducts =
    filter === 'All'
      ? allProducts
      : allProducts.filter((p) => p.category === filter)

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {visibleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
