import Stripe from 'stripe'
import { getProductById } from '@/lib/products'
import { SITE_URL } from '@/lib/site'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const MAX_LINE_ITEMS = 20

export async function POST(req) {
  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { items } = body

  if (!Array.isArray(items) || items.length === 0) {
    return Response.json({ error: 'Cart is empty' }, { status: 400 })
  }

  if (items.length > MAX_LINE_ITEMS) {
    return Response.json({ error: 'Too many items in cart' }, { status: 400 })
  }

  const lineItems = []

  for (const item of items) {
    if (!item || typeof item !== 'object') {
      return Response.json({ error: 'Invalid item format' }, { status: 400 })
    }
    if (typeof item.productId !== 'string') {
      return Response.json({ error: 'Invalid item format' }, { status: 400 })
    }

    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 10) {
      return Response.json({ error: 'Invalid quantity' }, { status: 400 })
    }

    const product = getProductById(item.productId)

    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 400 })
    }

    if (product.sizes.length > 0 && !product.sizes.includes(item.size)) {
      return Response.json({ error: 'Invalid size' }, { status: 400 })
    }

    const productColors = product.colors ?? []
    if (productColors.length > 0) {
      if (typeof item.color !== 'string' || !productColors.some((c) => c.name === item.color)) {
        return Response.json({ error: 'Invalid colour' }, { status: 400 })
      }
    }

    const variantParts = []
    if (item.size) variantParts.push(`Size ${item.size}`)
    if (item.color) variantParts.push(item.color)

    lineItems.push({
      price_data: {
        currency: 'eur',
        product_data: {
          name: variantParts.length
            ? `${product.name} — ${variantParts.join(', ')}`
            : product.name,
          description: product.description,
        },
        unit_amount: product.priceInCents,
      },
      quantity: item.quantity,
    })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/cart`,
      payment_method_types: ['card'],
    })

    return Response.json({ url: session.url, sessionId: session.id })
  } catch (err) {
    console.error('Stripe checkout error:', err.type ?? err.message)
    return Response.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
