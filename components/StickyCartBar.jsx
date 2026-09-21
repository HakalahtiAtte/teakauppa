'use client'

import { motion, AnimatePresence } from 'framer-motion'

export default function StickyCartBar({
  visible,
  product,
  selectedSize,
  selectedColor,
  sizes,
  colors,
  onSizeChange,
  onColorChange,
  onAddToCart,
  added,
}) {
  const formattedPrice = (product.priceInCents / 100).toLocaleString('en-GB', {
    style: 'currency',
    currency: 'EUR',
  })

  const showSizes = sizes.length > 1
  const showColors = colors.length > 0

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-bar"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-md border-t border-neutral-100 shadow-lg"
        >
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="hidden sm:flex flex-col min-w-0">
                <span className="text-sm font-semibold text-ink truncate">{product.name}</span>
                <span className="text-sm text-brand-text">{formattedPrice}</span>
              </div>

              <div className="flex items-center gap-2 flex-1 overflow-x-auto">
                {showColors && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => onColorChange(color)}
                        title={color.name}
                        aria-label={`Colour: ${color.name}`}
                        aria-pressed={selectedColor?.name === color.name}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none ${
                          selectedColor?.name === color.name
                            ? 'border-brand scale-110'
                            : 'border-transparent hover:border-neutral-300'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                )}

                {showSizes && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => onSizeChange(size)}
                        aria-pressed={selectedSize === size}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none ${
                          selectedSize === size
                            ? 'bg-neutral-800 text-white'
                            : 'bg-neutral-100 text-ink hover:bg-neutral-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={onAddToCart}
                className="shrink-0 inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity duration-200 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none whitespace-nowrap"
              >
                {added ? '✓ Added' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
