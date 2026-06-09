'use client'

import { motion, AnimatePresence } from 'framer-motion'

export default function CartToast({ visible, productName, colorName }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-center gap-3 rounded-full bg-[#111111] px-5 py-3 shadow-lg"
          role="status"
          aria-live="polite"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8B5E3C] shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </span>
          <span className="text-sm font-medium text-white whitespace-nowrap">
            {productName}{colorName ? ` (${colorName})` : ''} added to cart
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
