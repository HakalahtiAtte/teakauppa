'use client'

import { useState } from 'react'
import ProductGrid from '@/components/ProductGrid'
import { getProducts } from '@/lib/products'

const FILTERS = ['All', 'Clothing', 'Accessories']
const SORTS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeSort, setActiveSort] = useState('default')

  const products = getProducts()
  const count = activeFilter === 'All'
    ? products.length
    : products.filter((product) => product.category === activeFilter).length
  const total = products.length

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 flex flex-col gap-1">
        <h1
          className="text-4xl font-bold text-ink sm:text-5xl"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Plain essentials
        </h1>
        <p className="mt-3 max-w-xl text-base text-neutral-500">
          Solid colours. No prints. Everyday clothing and accessories in five colours.
        </p>
        <p className="mt-2 text-sm text-neutral-500" role="status">
          {count === total
            ? `${total} items`
            : `Showing ${count} of ${total}`}
        </p>
      </div>

      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none ${
                activeFilter === filter
                  ? 'bg-brand text-white'
                  : 'bg-neutral-100 text-ink hover:bg-neutral-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-neutral-500" aria-label="Sort products">
          <span className="sr-only">Sort by</span>
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            className="rounded-full border border-neutral-200 bg-surface px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand cursor-pointer"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>
      </div>

      <ProductGrid filter={activeFilter} sort={activeSort} />

      <section className="mt-16 border-t border-neutral-200 pt-8" aria-labelledby="designs-heading">
        <h2 id="designs-heading" className="text-xl font-semibold text-ink">Original designs, coming later</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-500">
          A separate collection of designed shirts is in the works. For now, explore the plain essentials above.
        </p>
      </section>
    </div>
  )
}
