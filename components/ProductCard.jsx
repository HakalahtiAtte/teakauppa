'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product }) {
  const { slug, name, category, priceInCents, imageUrl } = product

  const formattedPrice = (priceInCents / 100).toLocaleString('en-GB', {
    style: 'currency',
    currency: 'EUR',
  })

  return (
    <Link
      href={`/shop/${slug}`}
      className="flex flex-col items-center gap-4 p-6 group"
      aria-label={`View ${name}, ${formattedPrice}`}
    >
      <div
        className="relative w-full aspect-[5/6] transition-transform duration-300 ease-out group-hover:-translate-y-2"
        style={{ filter: 'drop-shadow(0 16px 24px rgba(0,0,0,0.10))' }}
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-contain"
        />
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-xs font-medium tracking-widest uppercase text-[#8B5E3C]">
          {category}
        </span>
        <h3 className="font-semibold text-lg text-[#111111] group-hover:text-[#8B5E3C] transition-colors duration-200">
          {name}
        </h3>
        <p className="text-sm text-neutral-500">{formattedPrice}</p>
      </div>
    </Link>
  )
}
