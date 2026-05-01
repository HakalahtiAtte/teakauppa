'use client'

import { useState } from 'react'
import ProductGrid from '@/components/ProductGrid'

const FILTERS = ['All', 'Classic', 'Minimal', 'Bold']

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1
        className="mb-8 text-4xl font-bold text-[#111111] sm:text-5xl"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        All Shirts
      </h1>

      <div className="mb-12 flex flex-wrap gap-3" role="group" aria-label="Filter shirts by category">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8956C] ${
              activeFilter === filter
                ? 'bg-[#C8956C] text-white'
                : 'bg-neutral-100 text-[#111111] hover:bg-neutral-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <ProductGrid filter={activeFilter} />
    </div>
  )
}
