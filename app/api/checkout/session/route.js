import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return Response.json({ error: 'Missing session_id' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return Response.json({
      customer_details: session.customer_details,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
    })
  } catch {
    return Response.json({ error: 'Session not found' }, { status: 404 })
  }
}
