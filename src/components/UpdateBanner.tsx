import { useEffect, useState } from 'react';

export default function UpdateBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    let wb: any;
    let registration: ServiceWorkerRegistration;

    const init = async () => {
      try {
        const { Workbox } = await import('workbox-window');
        wb = new Workbox('/sw.js');
        wb.addEventListener('waiting', () => setShow(true));
        wb.addEventListener('controlling', () => window.location.reload());
        wb.register().then(r => { registration = r; });
      } catch {
        // Fallback: vanilla SW registration for update detection
        navigator.serviceWorker.register('/sw.js').then(reg => {
          registration = reg;
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (!newWorker) return;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setShow(true);
              }
            });
          });
        });
      }
    };

    init();

    return () => {
      if (registration) registration.update();
    };
  }, []);

  const handleUpdate = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(reg => {
        if (reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        } else {
          window.location.reload();
        }
      });
    }
  };

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-mps-gold text-mps-dark px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-3">
      <span>✨ Nouvelle version de l'application disponible</span>
      <button onClick={handleUpdate} className="px-3 py-1 bg-mps-dark text-white rounded-md text-xs font-semibold hover:bg-black transition-colors">Mettre à jour maintenant</button>
    </div>
  );
}
