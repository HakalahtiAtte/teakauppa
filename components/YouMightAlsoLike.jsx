'use client'

import ProductCard from './ProductCard'

export default function YouMightAlsoLike({ products }) {
  if (!products?.length) return null

  return (
    <section className="mt-24">
      <h2
        className="mb-10 text-2xl font-bold text-ink sm:text-3xl"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        You might also like
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-8">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  )
}
