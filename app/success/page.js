import { Suspense } from 'react'
import SuccessClient from './SuccessClient'

export const metadata = {
  title: 'Order confirmed — Tea-shirts',
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-2xl px-4 py-32 text-center">
        <p className="text-neutral-400">Loading your order…</p>
      </div>
    }>
      <SuccessClient />
    </Suspense>
  )
}
