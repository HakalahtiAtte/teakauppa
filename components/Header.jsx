'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

export default function Header({ playfairClass }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const menuRef = useRef(null)
  const items = useCartStore((state) => state.items)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    if (!mobileNavOpen) return
    const dialog = menuRef.current
    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (previouslyFocused?.isConnected) previouslyFocused.focus()
    }
  }, [mobileNavOpen])

  return (
    <header className="sticky top-0 z-50 w-full bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className={`${playfairClass} text-xl font-bold text-ink hover:text-brand-text transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded-sm`}
          aria-label="Tea-shirts home"
        >
          Tea-shirts
        </Link>

        <nav className="hidden items-center gap-8 sm:flex" aria-label="Main navigation">
          <Link
            href="/shop"
            className="text-sm font-medium text-ink hover:text-brand-text transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded-sm"
          >
            Shop
          </Link>
          <Link
            href="/#concept"
            className="text-sm font-medium text-ink hover:text-brand-text transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded-sm"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label={`Cart, ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-ink"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.894-7.188a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-brand text-white text-[10px] font-bold" aria-hidden="true">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:hidden"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileNavOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-ink"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {mobileNavOpen && typeof document !== 'undefined' && createPortal(
        <dialog
          ref={menuRef}
          className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none flex-col border-0 bg-canvas px-6 py-8 text-ink open:flex"
          aria-label="Navigation menu"
          onCancel={() => setMobileNavOpen(false)}
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className={`${playfairClass} text-xl font-bold text-ink`}
              onClick={() => setMobileNavOpen(false)}
            >
              Tea-shirts
            </Link>
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-ink"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-6 mt-12" aria-label="Mobile navigation">
            <Link
              href="/shop"
              className="text-2xl font-medium text-ink hover:text-brand-text transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded-sm"
              onClick={() => setMobileNavOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/#concept"
              className="text-2xl font-medium text-ink hover:text-brand-text transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand rounded-sm"
              onClick={() => setMobileNavOpen(false)}
            >
              About
            </Link>
          </nav>
        </dialog>,
        document.body
      )}
    </header>
  )
}
