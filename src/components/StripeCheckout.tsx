import { useState } from 'react';

interface Props {
  priceId?: string;
  mode?: 'payment' | 'subscription';
  buttonText?: string;
  successUrl?: string;
  cancelUrl?: string;
  className?: string;
}

export default function StripeCheckout({ priceId, mode = 'payment', buttonText = 'Payer maintenant', successUrl = '/success', cancelUrl = '/', className = '' }: Props) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!priceId || priceId === 'sk_test_placeholder' || priceId.includes('placeholder')) {
      // Fallback to WhatsApp if no Stripe configured
      const text = `Bonjour MEDP, je souhaite commander : ${buttonText}. Comment procéder au paiement ?`;
      window.open(`https://wa.me/33759083580?text=${encodeURIComponent(text)}`, '_blank');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/.netlify/functions/create-stripe-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          mode,
          successUrl: window.location.origin + successUrl,
          cancelUrl: window.location.origin + cancelUrl,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Payment failed');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      // Fallback to WhatsApp
      const text = `Bonjour MEDP, je souhaite commander : ${buttonText}. Le paiement en ligne a rencontré un problème, pouvez-vous m'aider ?`;
      window.open(`https://wa.me/33759083580?text=${encodeURIComponent(text)}`, '_blank');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`inline-flex items-center justify-center px-6 py-3 rounded-xl bg-mps-navy text-white font-semibold hover:bg-mps-navy-dark transition-all active:scale-95 disabled:opacity-50 w-full ${className}`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
          Redirection...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          {buttonText}
        </span>
      )}
    </button>
  );
}
