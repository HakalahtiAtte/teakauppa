'use client'

import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

export default function YouMightAlsoLike({ products }) {
  if (!products?.length) return null

  return (
    <section className="mt-24">
      <h2
        className="mb-10 text-2xl font-bold text-[#111111] sm:text-3xl"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        You might also like
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-8">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
