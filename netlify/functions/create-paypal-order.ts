import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { amount, currency = 'EUR', description } = JSON.parse(event.body || '{}');

    const clientId = process.env.PAYPAL_CLIENT_ID || '';
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
    const isSandbox = !process.env.PAYPAL_LIVE || process.env.PAYPAL_LIVE !== 'true';
    const baseUrl = isSandbox ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

    // Get access token
    const authResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const authData = await authResponse.json();
    if (!authData.access_token) {
      throw new Error('Failed to get PayPal access token');
    }

    // Create order
    const orderResponse = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authData.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: { currency_code: currency, value: String(amount) },
          description: description || 'MEDP Services',
        }],
        application_context: {
          return_url: `${process.env.URL || 'https://medp-services.netlify.app'}/success`,
          cancel_url: `${process.env.URL || 'https://medp-services.netlify.app'}/`,
          brand_name: 'MEDP Services',
          locale: 'fr-FR',
        },
      }),
    });

    const orderData = await orderResponse.json();

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: orderData.id, url: orderData.links?.find((l: any) => l.rel === 'approve')?.href }),
    };
  } catch (err: any) {
    console.error('PayPal order error:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message || 'Internal server error' }),
    };
  }
};
