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
    title: 'Upload your tea',
    description: 'Open the mockup editor on any product page. Drop in a photo of your favourite brew and position it exactly where you want.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Download & order',
    description: 'Save your preview, add the product to your cart, and check out. Your tea goes where you go.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 3v13.5m0 0l-4.5-4.5M12 16.5l4.5-4.5" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-12 text-center">
        <h2
          className="text-3xl font-bold text-[#111111] sm:text-4xl"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          How it works
        </h2>
        <p className="mt-4 text-neutral-500">From brew to wardrobe in three steps.</p>
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
              <span className="text-xs font-semibold tracking-widest text-[#8B5E3C]">{item.step}</span>
              <div className="h-px flex-1 bg-neutral-100" />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C]">
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold text-[#111111]">{item.title}</h3>
            <p className="text-sm leading-relaxed text-neutral-500">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
