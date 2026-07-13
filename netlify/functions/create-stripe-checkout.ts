import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { priceId, mode = 'payment', successUrl, cancelUrl, customerEmail } = JSON.parse(event.body || '{}');

    if (!priceId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Price ID is required' }) };
    }

    // Dynamic import of stripe to avoid bundling issues
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: mode as 'payment' | 'subscription',
      success_url: successUrl || `${process.env.URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.URL}/`,
      customer_email: customerEmail || undefined,
      metadata: {
        source: 'medp-services-website',
        timestamp: new Date().toISOString(),
      },
    });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url, sessionId: session.id }),
    };
  } catch (err: any) {
    console.error('Stripe checkout error:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message || 'Internal server error' }),
    };
  }
};
