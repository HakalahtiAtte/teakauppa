import Link from 'next/link'
import ProductGrid from '@/components/ProductGrid'
import HowItWorks from '@/components/HowItWorks'

export default function HomePage() {
  return (
    <>
      <section className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-4 text-center">
        <h1
          className="max-w-2xl text-5xl font-bold leading-tight text-ink sm:text-6xl lg:text-7xl"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Keep it simple.
        </h1>
        <p className="mt-6 max-w-md text-lg text-neutral-500 sm:text-xl">
          Plain clothing and everyday accessories. Five solid colours, your choice.
        </p>
        <Link
          href="/shop"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label="Browse the shop"
        >
          Shop plain essentials
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2
          className="mb-12 text-3xl font-bold text-ink sm:text-4xl"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Plain essentials
        </h2>
        <ProductGrid featured />
      </section>

      <HowItWorks />

      <section
        id="concept"
        className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <h2
              className="text-3xl font-bold text-ink sm:text-4xl"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Plain now. Original designs next.
            </h2>
            <p className="text-base leading-relaxed text-neutral-500 sm:text-lg">
              Start with simple clothing and accessories in solid colours.
              We&apos;re working on a separate collection of designed shirts to sit
              alongside these plain essentials.
            </p>
            <Link
              href="/shop"
              className="self-start inline-flex items-center justify-center rounded-full border border-brand px-8 py-3 text-sm font-semibold text-brand-text transition-colors duration-200 hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none"
              aria-label="Explore the plain essentials collection"
            >
              Explore the collection
            </Link>
          </div>

          <div className="flex items-center justify-center rounded-2xl bg-neutral-100 p-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9 text-brand-text"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16 3 5 5-12 12-6 1 1-6L16 3Z M13 6l5 5" />
                </svg>
              </div>
              <p
                className="text-sm font-semibold text-ink tracking-wide uppercase"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Original designs in progress
              </p>
              <p className="text-xs text-neutral-500">A new collection is taking shape.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
