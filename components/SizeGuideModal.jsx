'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const guides = {
  tshirt: {
    label: 'T-shirt size guide',
    columns: ['Size', 'Chest (cm)', 'Length (cm)'],
    rows: [
      ['S', '96', '71'],
      ['M', '101', '74'],
      ['L', '106', '76'],
      ['XL', '111', '79'],
      ['XXL', '116', '81'],
    ],
    note: 'Measure your chest at its widest point. We recommend sizing up for a relaxed fit.',
  },
  hoodie: {
    label: 'Hoodie size guide',
    columns: ['Size', 'Chest (cm)', 'Length (cm)'],
    rows: [
      ['S', '100', '68'],
      ['M', '105', '71'],
      ['L', '110', '73'],
      ['XL', '115', '76'],
      ['XXL', '120', '78'],
    ],
    note: 'Hoodies are cut with a relaxed fit. Chest measurement taken under the arms.',
  },
  socks: {
    label: 'Socks size guide',
    columns: ['Size', 'UK', 'EU', 'US'],
    rows: [
      ['S/M', '3–6', '36–39', '4–7'],
      ['L/XL', '7–11', '40–46', '8–12'],
    ],
    note: 'When between sizes, we recommend going up.',
  },
  mug: {
    label: 'Mug sizes',
    columns: ['Size', 'Volume', 'Height', 'Diameter'],
    rows: [
      ['8 oz', '240 ml', '8 cm', '7.5 cm'],
      ['12 oz', '355 ml', '9.5 cm', '8.5 cm'],
    ],
    note: 'Both sizes are enamel-coated steel. Dishwasher safe.',
  },
}

export default function SizeGuideModal({ type, onClose }) {
  const guide = guides[type] ?? guides.tshirt

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
        <motion.div
          className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-xl"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          role="dialog"
          aria-modal="true"
          aria-label={guide.label}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[#111111]">{guide.label}</h2>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full text-neutral-400 hover:text-[#111111] hover:bg-neutral-100 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#8B5E3C] focus-visible:outline-none"
              aria-label="Close size guide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100">
                  {guide.columns.map((col) => (
                    <th key={col} className="pb-3 text-left font-medium text-neutral-500 pr-4 last:pr-0">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {guide.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-neutral-50 last:border-0">
                    {row.map((cell, i) => (
                      <td key={i} className={`py-3 pr-4 last:pr-0 ${i === 0 ? 'font-semibold text-[#111111]' : 'text-neutral-500'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {guide.note && (
            <p className="mt-4 text-xs text-neutral-400 leading-relaxed">{guide.note}</p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
