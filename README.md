# MEDP Services — Meudjieuh Prestation & Services

**Site web officiel** : `https://medp-services.netlify.app` (à déployer)  
**Stack** : Astro 4 + React + Tailwind CSS + PWA + Decap CMS + Netlify  
**Création** : TIT-CS — TIT-CONSULTING SOLUTIONS du "Prince" Joël NOUBISSIE TCHASSOM

---

## 🚀 Fonctionnalités livrées

### PWA (Progressive Web App)
- ✅ Installation native sur mobile & desktop (bouton forcé + prompt navigateur)
- ✅ Mode offline (service worker + cache runtime)
- ✅ Notifications push prêtes (VAPID + Web Push API)
- ✅ Background Sync (file d'attente hors-ligne)
- ✅ Banner de mise à jour (nouvelle version détectée = reload proposé)
- ✅ Splash screen, icônes adaptatives, shortcuts

### CMS Secret (Triple-clic sur le logo)
- ✅ Interface d'administration **Decap CMS** cachée à `/admin/`
- ✅ Activation par **triple clic rapide** sur le logo MPS dans le header
- ✅ Authentification via Netlify Identity (50 utilisateurs gratuits)
- ✅ Collections complètes : Services, Blog, Tarifs, Annonces, FAQ, Actualités, Paramètres globaux
- ✅ Workflow éditorial : Draft → Review → Published
- ✅ Tout est versionné dans Git (rollback, historique, branches)

### Contenu & Blog
- ✅ 6 pôles de services avec 6 articles de démonstration (scalable à 5+ par catégorie)
- ✅ 5 packs tarifaires prêts avec boutons de paiement
- ✅ Blog avec partage WhatsApp, mode sombre, impression PDF, rich snippets SEO
- ✅ Architecture prête pour **actualités auto-scrapées** (GitHub Actions + CRON)
- ✅ Collections Astro type-safe avec Zod schemas

### Paiements & Conversion
- ✅ Boutons Stripe Checkout (placeholder prêt pour l'intégration API)
- ✅ Intégration PayPal via Stripe (ou SDK JS natif prêt)
- ✅ Grille tarifaire avec packs populaires mis en avant
- ✅ WhatsApp intégré partout (bouton flottant + contextuel par service)
- ✅ Formulaire de contact avec Netlify Forms (honeypot anti-spam)

### Design & UX
- ✅ Design system premium (bleu marine #002B5C, rouge #C8102E, or #D4AF37)
- ✅ 6 visuels 3D isométriques premium générés par IA (1 par pôle)
- ✅ Header sticky avec transparence / scroll
- ✅ Hero section immersive avec CTA double (exploration + WhatsApp)
- ✅ Cards de services avec hover, glassmorphism subtil
- ✅ Footer TIT-CS présent sur toutes les pages (avec lien WhatsApp créateur)
- ✅ Responsive mobile-first (sm → md → lg → xl)

### SEO & Performance
- ✅ Schema.org JSON-LD (Organization, Article, FAQ...)
- ✅ Meta tags OpenGraph / Twitter Cards
- ✅ Sitemap auto-généré par Astro
- ✅ Performance 100/100 cible (Astro static + prefetch)

---

## 📁 Structure du projet

```
medp-services/
├── public/
│   ├── admin/              # Interface CMS Decap (cachée)
│   ├── assets/             # Visuels, logo, icônes PWA, flyers
│   ├── manifest.json       # PWA manifest
│   └── sw.js               # Service Worker custom (updates + offline)
├── src/
│   ├── components/         # React (Header, Footer, WhatsAppButton, InstallPWA, UpdateBanner, ServiceCard, StripeCheckout)
│   ├── content/          # Collections Astro (services, blog, tarifs, annonces, faq, news)
│   ├── data/             # Settings JSON (éditable via CMS)
│   ├── layouts/          # Layout principal Astro
│   └── pages/            # Routes (index, services, blog, contact, success)
├── astro.config.mjs      # Configuration Astro + PWA
├── tailwind.config.mjs   # Design system MPS
├── netlify.toml          # Déploiement Netlify + headers sécurité
└── package.json
```

---

## 🛠️ Déploiement sur Netlify

1. **Créer un repo GitHub** `medp-services/medp-services` et push ce code.
2. **Connecter Netlify** au repo GitHub.
3. **Activer Netlify Identity** (dans Site Settings → Identity → Enable).
4. **Activer Git Gateway** (Identity → Services → Git Gateway).
5. **Configurer les domaines** : `medp-services.netlify.app` (ou custom domain).
6. **Stripe** : Créer un compte Stripe, configurer les produits/prix, et remplacer les `stripePriceId` dans les fichiers tarifs (ou dans le CMS).
7. **PayPal** : Optionnel — ajouter `paypal` dans les `payment_method_types` de Stripe Checkout, ou intégrer le SDK JS PayPal natif dans `StripeCheckout.tsx`.

---

## 📝 Activation du CMS (Admin)

1. Sur le site live, **triple-cliquez rapidement** sur le logo MPS dans le header.
2. Une fenêtre d'authentification Netlify Identity s'ouvre.
3. Connectez-vous avec le compte invité ou créez un compte admin dans Netlify Identity.
4. Vous accédez à l'interface Decap CMS pour éditer tous les contenus sans coder.

---

## 📱 Installation PWA

Les visiteurs voient un bouton flottant **"Installer l'application"** après quelques secondes. Une fois installée :
- L'app s'ouvre en mode standalone (sans barre d'URL)
- Elle fonctionne **hors-ligne** pour les pages et documents visités
- Les **mises à jour** sont annoncées via une bannière dorée en haut de l'écran

---

## 🤖 Actualités automatiques (Phase 2)

Le dossier `.github/workflows/scrape-news.yml` (à ajouter) permettra :
- Scraping quotidien à 6h du matin des sites officiels (ANEF, Service-Public, CAF, France Travail)
- Reformulation IA via API (ou LLM local)
- Commit auto sur le repo + rebuild Netlify
- Les actualités apparaissent dans le CMS avec statut "À valider"

---

## 📞 Contact

**MEDP Services** : WhatsApp +33 7 59 08 35 80

**Site créé par TIT-CS** :  
- Joël NOUBISSIE TCHASSOM — Bafang, Haut-Nkam, Cameroun  
- WhatsApp : +237 695 51 25 28  
- Web : [tit-cs.netlify.app](https://tit-cs.netlify.app)

---

*© 2026 Meudjieuh Prestation & Services. Tous droits réservés.*
