import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Services' },
    { href: '/simulateur', label: 'Simulateur', badge: 'NOUVEAU' },
    { href: '/generateur-lettres', label: 'Lettres', badge: 'GRATUIT' },
    { href: '/blog', label: 'Blog & Guides' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,43,92,0.15)]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <a href="/" id="mps-logo" className="flex items-center gap-4 select-none cursor-pointer group" title="Triple-cliquez pour administration">
            <div className="relative">
              <img src="/assets/logo-mps-3d.png" alt="MPS Logo" className="h-14 lg:h-16 w-auto drop-shadow-lg transition-transform duration-300 group-hover:scale-105" loading="eager" />
              <div className="absolute inset-0 rounded-full bg-mps-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-display font-bold text-xl lg:text-2xl leading-tight transition-colors duration-300 ${scrolled ? 'text-mps-navy' : 'text-white'}`}>
                MEDP SERVICES
              </h1>
              <p className={`text-[10px] lg:text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${scrolled ? 'text-mps-red' : 'text-white/80'}`}>
                Meudjieuh Prestation & Services
              </p>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href} className={`relative text-sm font-semibold transition-all duration-300 hover:text-mps-gold group ${scrolled ? 'text-mps-navy' : 'text-white'}`}>
                {l.label}
                {l.badge && (
                  <span className="absolute -top-2.5 -right-6 px-1.5 py-0.5 rounded bg-mps-red text-white text-[9px] font-bold leading-none">{l.badge}</span>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mps-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a href="/contact" className="px-6 py-3 rounded-full bg-mps-red text-white text-sm font-bold hover:bg-mps-red-dark transition-all duration-300 hover:scale-105 shadow-lg shadow-mps-red/30 hover:shadow-mps-red/50">
              Devis gratuit
            </a>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 rounded-lg text-mps-navy" aria-label="Menu">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-mps-navy/10 shadow-2xl">
          <div className="px-6 py-6 space-y-4">
            {links.map(l => (
              <a key={l.href} href={l.href} className="flex items-center justify-between text-mps-navy font-bold text-lg py-2 hover:text-mps-red transition-colors" onClick={() => setMenuOpen(false)}>
                {l.label}
                {l.badge && <span className="px-2 py-1 rounded bg-mps-red text-white text-[10px] font-bold">{l.badge}</span>}
              </a>
            ))}
            <a href="/contact" className="block text-center px-6 py-3 rounded-full bg-mps-red text-white font-bold mt-4" onClick={() => setMenuOpen(false)}>Devis gratuit</a>
          </div>
        </div>
      )}
    </header>
  );
}
