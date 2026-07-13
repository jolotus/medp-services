import settings from '../data/settings.json';

export default function Footer() {
  return (
    <footer className="bg-mps-navy-dark text-white/80 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-mps-navy via-mps-red to-mps-gold" />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src="/assets/logo-mps-3d.png" alt="MPS" className="h-16 w-auto drop-shadow-xl" loading="lazy" />
              <div>
                <h3 className="font-display text-xl font-bold text-white">MEDP SERVICES</h3>
                <p className="text-xs text-mps-red uppercase tracking-wider">Meudjieuh Prestation & Services</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/70 max-w-xs">
              Accompagnement administratif, services à la personne, aide aux étrangers en France. 
              Confidentialité, discrétion et efficacité assurées depuis notre engagement pour votre réussite.
            </p>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-mps-red inline-block" />
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <span className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366]/20 transition-colors flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </span>
                <div>
                  <a href={`https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '') || '33759083580'}`} className="text-white font-semibold hover:text-[#25D366] transition-colors">WhatsApp Principal</a>
                  <p className="text-sm text-white/50">{settings.whatsappDisplay || '+33 7 59 08 35 80'}</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <span className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-mps-gold group-hover:bg-mps-gold/20 transition-colors flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </span>
                <div>
                  <p className="text-white font-semibold">Appel & WhatsApp</p>
                  <p className="text-sm text-white/50">{settings.whatsappDisplay || '+33 7 59 08 35 80'}</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <span className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-mps-gold group-hover:bg-mps-gold/20 transition-colors flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </span>
                <div>
                  <p className="text-white font-semibold">Horaires</p>
                  <p className="text-sm text-white/50">Lundi – Vendredi : 08h00 – 18h00</p>
                  <p className="text-sm text-white/50">Samedi : 09h00 – 14h00</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-mps-gold inline-block" />
              Liens rapides
            </h3>
            <ul className="space-y-3">
              <li><a href="/services" className="text-sm text-white/70 hover:text-mps-gold transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-mps-red group-hover:bg-mps-gold transition-colors"/>Nos services</a></li>
              <li><a href="/blog" className="text-sm text-white/70 hover:text-mps-gold transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-mps-red group-hover:bg-mps-gold transition-colors"/>Blog & guides</a></li>
              <li><a href="/contact" className="text-sm text-white/70 hover:text-mps-gold transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-mps-red group-hover:bg-mps-gold transition-colors"/>Demander un devis</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs text-white/40 text-center md:text-left">
              © {new Date().getFullYear()} Meudjieuh Prestation & Services — Tous droits réservés.
            </p>
            <div className="text-[10px] text-white/30 text-center md:text-right leading-relaxed max-w-lg">
              <p className="mb-1">Site conçu et développé par <strong className="text-white/50">TIT-CS — TIT-CONSULTING SOLUTIONS</strong> du "Prince" <strong className="text-white/50">Joël NOUBISSIE TCHASSOM</strong></p>
              <p>📍 Bafang, Haut-Nkam, Cameroun · <a href="https://wa.me/237695512528" className="text-mps-gold/50 hover:text-mps-gold transition-colors" target="_blank" rel="noopener">WhatsApp +237 695 51 25 28</a> · <a href="mailto:contact@tit-cs.com" className="text-mps-gold/50 hover:text-mps-gold transition-colors">contact@tit-cs.com</a> · <a href="https://tit-cs.netlify.app" className="text-mps-gold/50 hover:text-mps-gold transition-colors" target="_blank" rel="noopener">tit-cs.netlify.app</a></p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative watermark */}
      <div className="absolute bottom-0 right-0 opacity-[0.03] pointer-events-none">
        <img src="/assets/logo-mps-3d.png" alt="" className="w-96 h-96 object-contain" />
      </div>
    </footer>
  );
}
