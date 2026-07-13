import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const FAQ_RESPONSES: Record<string, string> = {
  'titre de séjour': 'Pour demander ou renouveler un titre de séjour en France, vous devez utiliser la plateforme ANEF (Administration Numérique pour les Étrangers en France) sur administration-etrangers-en-france.interieur.gouv.fr. Notre **Pack Titre de Séjour à 49€** vous accompagne dans toutes les étapes. Contactez-nous par WhatsApp !',
  'naturalisation': 'La naturalisation française nécessite une demande auprès de la préfecture, un dossier complet et un entretien d\'assimilation. Notre **Pack Naturalisation à 89€** inclut la préparation intensive à l\'entretien avec quiz et fiches.',
  'caf': 'La CAF (Caisse d\'Allocations Familiales) gère les APL, ALS, et la prime d\'activité. Vous pouvez faire vos démarches sur caf.fr. Notre **Pack CAF & APL à 29€** vous accompagne dans la simulation, le remplissage des formulaires et le suivi.',
  'apl': 'L\'APL (Aide Personnalisée au Logement) est une allocation pour les locataires. Demandez-la sur votre compte caf.fr. Notre Pack CAF & APL à 29€ vous accompagne.',
  'prime d\'activité': 'La prime d\'activité complète vos revenus d\'activité. Demandez-la sur caf.fr ou via votre espace France Travail. Notre Pack CAF & APL à 29€ inclut cette démarche.',
  'france travail': 'France Travail (anciennement Pôle emploi) gère l\'actualisation mensuelle des demandeurs d\'emploi. Actualisez votre situation sur france-travail.fr. Nous pouvons vous accompagner dans cette démarche.',
  'passeport camerounais': 'Pour renouveler votre passeport camerounais en France, contactez l\'ambassade du Cameroun à Paris ou les consulats honoraires. Les délais sont de 2 à 6 mois. Notre équipe vous accompagne dans les démarches consulaires.',
  'visa': 'Pour un visa pour le Cameroun ou un autre pays, les démarches se font auprès des consulats ou ambassades. Nous vous accompagnons dans la constitution du dossier et la prise de rendez-vous.',
  'ménage': 'Nos services de ménage à domicile sont facturés entre 22€ et 35€/heure. Vous bénéficiez du **crédit d\'impôt de 50%** via CESU. Contactez-nous par WhatsApp pour un devis personnalisé !',
  'repassage': 'Notre service de repassage à domicile est facturé entre 22€ et 35€/heure, avec crédit d\'impôt de 50%.',
  'écrivain public': 'Notre écrivain public rédige vos lettres administratives, remplit vos formulaires et constitue vos dossiers. Tarifs à partir de 15€ la lettre simple. Essayez aussi notre **Générateur de Lettres** gratuit sur le site !',
  'prix': 'Nos packs : Diagnostic Express 9€ | Titre de Séjour 49€ | Naturalisation 89€ | CAF & APL 29€ | MPS Premium 9,90€/mois. Les services à la personne sont entre 22€ et 35€/heure. Consultez la page Tarifs pour plus de détails.',
  'tarif': 'Consultez notre page Tarifs pour voir tous nos packs. Nous proposons des forfaits clairs et transparents sans frais cachés.',
  'whatsapp': 'Vous pouvez nous contacter par WhatsApp au **+33 7 59 08 35 80**. Nous répondons rapidement et en toute confidentialité !',
  'contact': 'Contactez-nous par WhatsApp au +33 7 59 08 35 80, ou via le formulaire de contact sur la page Contact. Nous répondons sous 24h maximum.',
  'horaires': 'Nos horaires : Lundi – Vendredi 08h00–18h00 | Samedi 09h00–14h00. Support WhatsApp : 7j/7.',
  'confidentialité': 'Toutes vos informations sont strictement confidentielles. Nous ne partageons jamais vos données avec des tiers. C\'est au cœur de notre éthique.',
  'crédit impôt': 'Nos services à la personne (ménage, repassage, courses...) ouvrent droit au **crédit d\'impôt de 50%**. Vous payez par CESU ou chèque emploi service. Nous vous accompagnons dans les démarches fiscales.',
  'cesu': 'Le CESU (Chèque Emploi Service Universel) permet de déclarer facilement un emploi à domicile et de bénéficier du crédit d\'impôt de 50%.',
  'simulateur': 'Essayez notre **Simulateur Intelligent** ! En quelques questions, il détermine quel pack et quelle démarche vous correspondent. C\'est gratuit et sans engagement.',
  'lettre': 'Utilisez notre **Générateur de Lettres** gratuit ! Choisissez un modèle (relance, recours, demande...), remplissez vos infos, et téléchargez en PDF. C\'est rapide et professionnel.',
};

function findResponse(input: string): string | null {
  const lower = input.toLowerCase();
  for (const [keyword, response] of Object.entries(FAQ_RESPONSES)) {
    if (lower.includes(keyword)) return response;
  }
  return null;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Bonjour ! Je suis l\'assistant virtuel MEDP. Posez-moi vos questions sur les titres de séjour, la naturalisation, la CAF, nos services... ou tapez "aide" pour voir les sujets disponibles.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    setTimeout(() => {
      let response = findResponse(userMsg);
      if (!response) {
        if (userMsg.toLowerCase().includes('aide') || userMsg.toLowerCase().includes('help')) {
          response = 'Je peux vous aider sur : titre de séjour, naturalisation, CAF/APL, prime d\'activité, France Travail, passeport camerounais, visa, ménage, repassage, écrivain public, tarifs, WhatsApp, horaires, confidentialité, crédit d\'impôt, CESU, simulateur, générateur de lettres. Posez votre question !';
        } else {
          response = 'Je n\'ai pas trouvé de réponse exacte à cette question. Essayez de reformuler, ou tapez "aide" pour voir les sujets que je connais. Vous pouvez aussi nous contacter directement par WhatsApp au +33 7 59 08 35 80 pour un accompagnement personnalisé !';
        }
      }
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setLoading(false);
    }, 800);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-mps-navy text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform hover:bg-mps-navy-light"
        aria-label="Chatbot"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden" style={{ maxHeight: '500px' }}>
      <div className="bg-mps-navy text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <img src="/assets/logo-mps-3d.png" alt="MPS" className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Assistant MEDP</h3>
            <p className="text-xs text-white/60">Répond instantanément</p>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: '350px' }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
              msg.role === 'user' 
                ? 'bg-mps-navy text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              <div dangerouslySetInnerHTML={{ 
                __html: msg.content
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                  .replace(/\n/g, '<br/>')
              }} />
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-none px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Posez votre question..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-mps-navy focus:ring-2 focus:ring-mps-navy/20 outline-none transition-all"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2.5 rounded-xl bg-mps-navy text-white hover:bg-mps-navy-dark transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
