'use client'

import { motion } from 'framer-motion'

const STEPS = [
  {
    step: '01',
    title: 'Pick your piece',
    description: 'Browse the shop and find your match — tee, hoodie, tote, or something else entirely.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Choose your colour',
    description: 'Find your favourite of five solid colours, then choose a size where available.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <circle cx="8" cy="8" r="4" />
        <circle cx="16" cy="8" r="4" />
        <circle cx="12" cy="16" r="4" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Make it an everyday essential',
    description: 'Add your plain product to the cart and check out. All items in this collection come without printed designs.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-12 text-center">
        <h2
          className="text-3xl font-bold text-ink sm:text-4xl"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          How it works
        </h2>
        <p className="mt-4 text-neutral-500">Find your everyday essentials in three steps.</p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {STEPS.map((item, i) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.1, duration: 0.45 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold tracking-widest text-brand-text">{item.step}</span>
              <div className="h-px flex-1 bg-neutral-100" />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand-text">
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
            <p className="text-sm leading-relaxed text-neutral-500">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
