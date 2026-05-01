import Link from 'next/link'

export const metadata = {
  title: 'Page not found',
}

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-40 sm:px-6 flex flex-col items-center gap-6 text-center">
      <p className="text-sm font-medium tracking-widest uppercase text-[#C8956C]">404</p>
      <h1
        className="text-4xl font-bold text-[#111111] sm:text-5xl"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Page not found
      </h1>
      <p className="text-neutral-500 max-w-sm">
        This page steeped too long and disappeared. Let&apos;s get you back.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-full bg-[#C8956C] px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8956C]"
        >
          Browse shirts
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-8 py-3 text-sm font-medium text-[#111111] hover:bg-neutral-50 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8956C]"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
