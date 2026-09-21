import { notFound } from 'next/navigation'
import { getProductBySlug, getProducts, getRelatedProducts } from '@/lib/products'
import { SITE_URL } from '@/lib/site'
import ProductDetailClient from './ProductDetailClient'

export async function generateStaticParams() {
  const products = getProducts()
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}

  const price = (product.priceInCents / 100).toFixed(2)
  const imageForMeta = product.imageUrl.startsWith('http')
    ? product.imageUrl
    : `${SITE_URL}${product.imageUrl}`

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `${SITE_URL}/shop/${product.slug}`,
      type: 'website',
      images: [
        {
          url: imageForMeta,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
    },
    other: {
      'product:price:amount': price,
      'product:price:currency': 'EUR',
    },
  }
}

function ProductJsonLd({ product }) {
  const price = (product.priceInCents / 100).toFixed(2)
  const imageForSchema = product.imageUrl.startsWith('http')
    ? product.imageUrl
    : `${SITE_URL}${product.imageUrl}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: imageForSchema,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/shop/${product.slug}`,
    },
  }

  // Escape < to prevent </script> injection in product strings
  const safeJson = JSON.stringify(schema).replace(/</g, '\\u003c')

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  )
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) notFound()

  const relatedProducts = getRelatedProducts(product.id, product.category)

  return (
    <>
      <ProductJsonLd product={product} />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  )
}
