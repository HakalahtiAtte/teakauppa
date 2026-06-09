import Link from 'next/link'
import ProductGrid from '@/components/ProductGrid'
import HowItWorks from '@/components/HowItWorks'

export default function HomePage() {
  return (
    <>
      <section className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-4 text-center">
        <h1
          className="max-w-2xl text-5xl font-bold leading-tight text-[#111111] sm:text-6xl lg:text-7xl"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Wear your obsession.
        </h1>
        <p className="mt-6 max-w-md text-lg text-neutral-500 sm:text-xl">
          Premium tees for the tea-obsessed — and a few other things.
        </p>
        <Link
          href="/shop"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[#8B5E3C] px-8 py-3 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#8B5E3C] focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label="Browse the shop"
        >
          Shop now
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2
          className="mb-12 text-3xl font-bold text-[#111111] sm:text-4xl"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Our favourites
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
              className="text-3xl font-bold text-[#111111] sm:text-4xl"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Your tea. Your way.
            </h2>
            <p className="text-base leading-relaxed text-neutral-500 sm:text-lg">
              Upload a photo of your tea — your morning cup, your favourite stash,
              a perfectly-lit flat lay. Place it on any product, resize it, download
              your preview. Every tea has a story; this is how you wear yours.
            </p>
            <Link
              href="/shop"
              className="self-start inline-flex items-center justify-center rounded-full border border-[#8B5E3C] px-8 py-3 text-sm font-semibold text-[#8B5E3C] transition-colors duration-200 hover:bg-[#8B5E3C] hover:text-white focus-visible:ring-2 focus-visible:ring-[#8B5E3C] focus-visible:ring-offset-2 focus-visible:outline-none"
              aria-label="Try the customiser on any product"
            >
              Try it on a product
            </Link>
          </div>

          <div className="flex items-center justify-center rounded-2xl bg-neutral-100 p-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#8B5E3C]/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9 text-[#8B5E3C]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <p
                className="text-sm font-semibold text-[#111111] tracking-wide uppercase"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Live on every product page
              </p>
              <p className="text-xs text-neutral-500">Pick a product and try it</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
