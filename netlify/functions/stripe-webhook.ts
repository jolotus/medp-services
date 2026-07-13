import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const sig = event.headers['stripe-signature'] || event.headers['Stripe-Signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
    let stripeEvent;

    if (endpointSecret && sig) {
      stripeEvent = stripe.webhooks.constructEvent(event.body || '', sig, endpointSecret);
    } else {
      stripeEvent = JSON.parse(event.body || '{}');
    }

    // Handle the event
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        const session = stripeEvent.data.object;
        console.log('✅ Payment successful:', session.id, session.customer_email);
        // TODO: Send confirmation email, update order status, notify admin via WhatsApp
        break;
      case 'invoice.payment_succeeded':
        console.log('✅ Subscription payment succeeded');
        break;
      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  } catch (err: any) {
    console.error('Webhook error:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }
};
