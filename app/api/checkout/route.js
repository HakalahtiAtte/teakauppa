import Stripe from 'stripe'
import { getProductById } from '@/lib/products'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  try {
    const { items } = await req.json()

    if (!Array.isArray(items) || items.length === 0) {
      return Response.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const lineItems = []

    for (const item of items) {
      const product = getProductById(item.productId)

      if (!product) {
        return Response.json(
          { error: `Product not found: ${item.productId}` },
          { status: 400 }
        )
      }

      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        return Response.json({ error: 'Invalid quantity' }, { status: 400 })
      }

      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${product.name} — Size ${item.size}`,
            description: product.description,
          },
          unit_amount: product.priceInCents,
        },
        quantity: item.quantity,
      })
    }

    const origin = req.headers.get('origin') || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      payment_method_types: ['card'],
    })

    return Response.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return Response.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
