'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ProductCard({ product }) {
  const { slug, name, category, priceInCents, imageUrl, transparentBg } = product

  const formattedPrice = (priceInCents / 100).toLocaleString('en-GB', {
    style: 'currency',
    currency: 'EUR',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={`/shop/${slug}`}
        className="flex flex-col items-center gap-4 p-4 sm:p-6 group"
        aria-label={`View ${name}, ${formattedPrice}`}
      >
        {transparentBg ? (
          <div
            className="relative w-full aspect-[5/6] transition-transform duration-300 ease-out group-hover:-translate-y-2"
            style={{ filter: 'drop-shadow(0 16px 24px rgba(0,0,0,0.10))' }}
          >
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 30vw"
              className="object-contain"
            />
          </div>
        ) : (
          <div className="relative w-full aspect-[5/6] overflow-hidden rounded-2xl transition-transform duration-300 ease-out group-hover:-translate-y-2">
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 30vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-xs font-medium tracking-widest uppercase text-[#8B5E3C]">
            {category}
          </span>
          <h3 className="font-semibold text-sm sm:text-lg text-[#111111] group-hover:text-[#8B5E3C] transition-colors duration-200 leading-snug">
            {name}
          </h3>
          <p className="text-sm text-neutral-500">{formattedPrice}</p>
        </div>
      </Link>
    </motion.div>
  )
}
