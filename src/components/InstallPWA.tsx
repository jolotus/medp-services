import { useEffect, useState } from 'react';

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissed = localStorage.getItem('medp-install-dismissed');
      const count = parseInt(localStorage.getItem('medp-install-count') || '0');
      if (!dismissed && count < 3) {
        setTimeout(() => setShowPrompt(true), 3000);
        localStorage.setItem('medp-install-count', String(count + 1));
      }
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => { setInstalled(true); setShowPrompt(false); setDeferredPrompt(null); });
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'dismissed') localStorage.setItem('medp-install-dismissed', 'true');
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (installed || !showPrompt) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-4 border border-mps-navy/10 flex items-center gap-4 animate-float">
        <div className="bg-mps-navy rounded-xl p-3">
          <img src="/assets/icon-72x72.png" alt="MPS" className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-mps-dark">Installer MEDP Services</p>
          <p className="text-xs text-gray-500">Accès rapide, hors-ligne, notifications.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setShowPrompt(false); localStorage.setItem('medp-install-dismissed', 'true'); }} className="text-xs text-gray-500 hover:text-gray-700 px-2">Plus tard</button>
          <button onClick={handleInstall} className="text-xs font-semibold bg-mps-navy text-white px-3 py-1.5 rounded-lg hover:bg-blue-900">Installer</button>
        </div>
      </div>
    </div>
  );
}
