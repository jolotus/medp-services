# CHECK-LIST PHASE 2 — Fonctionnalités Avancées Activées

## 🎯 BILAN DE LIVRAISON

Votre site `medp-services.netlify.app` est maintenant équipé de **toutes les fonctionnalités avancées** qui surpassent la concurrence. Voici ce qui est en place et comment l'activer.

---

## ✅ CE QUI EST DÉJÀ CONSTRUIT ET FONCTIONNEL

### 1. PAIEMENTS STRIPE NATIFS (Backend serverless)

**Fichiers créés :**
- `netlify/functions/create-stripe-checkout.ts` — Crée une session de paiement Stripe sécurisée
- `netlify/functions/stripe-webhook.ts` — Reçoit les confirmations de paiement Stripe
- `src/components/StripeCheckout.tsx` — Bouton "Payer maintenant" connecté à l'API backend

**Comment ça marche :**
- Quand un client clique "Commander" sur un pack, le site appelle la fonction Netlify
- La fonction crée une session Stripe Checkout (page de paiement sécurisée Stripe)
- Le client paie sur Stripe, puis revient sur votre site
- Le webhook reçoit la confirmation automatiquement

**Activation (une fois votre site sur Netlify) :**
- [ ] Allez dans Netlify Dashboard → **Site Settings** → **Environment variables**
- [ ] Ajoutez ces variables :
  - `STRIPE_SECRET_KEY` = votre clé secrète Stripe (`sk_test_...` ou `sk_live_...`)
  - `STRIPE_PUBLISHABLE_KEY` = votre clé publique (`pk_test_...` ou `pk_live_...`)
  - `STRIPE_WEBHOOK_SECRET` = (optionnel, pour sécurité avancée)
- [ ] Dans le CMS, collez la **Publishable Key** dans les Paramètres Globaux → Stripe
- [ ] Les boutons de paiement deviennent fonctionnels instantanément

### 2. PAIEMENTS PAYPAL NATIFS (Backend serverless)

**Fichiers créés :**
- `netlify/functions/create-paypal-order.ts` — Crée un ordre de paiement PayPal

**Comment ça marche :**
- Alternative PayPal pour les clients sans carte bancaire
- Le client clique, l'API PayPal s'ouvre, il paie avec son compte PayPal

**Activation :**
- [ ] Netlify Dashboard → **Site Settings** → **Environment variables**
- [ ] Ajoutez :
  - `PAYPAL_CLIENT_ID` = votre Client ID PayPal Developer
  - `PAYPAL_CLIENT_SECRET` = votre Secret PayPal Developer
  - `PAYPAL_LIVE` = `false` (test) ou `true` (production)
- [ ] Dans le CMS, collez le **Client ID** dans les Paramètres Globaux → PayPal

### 3. SIMULATEUR INTELLIGENT (Page /simulateur)

**Fichier créé :** `src/pages/simulateur.astro`

**Fonctionnalité :**
- 3 étapes guidées pour identifier le besoin du visiteur
- **Étape 1** : Choix de la situation (Étranger, Famille, Documents, Services à domicile)
- **Étape 2** : Sous-catégorie précise (Titre de séjour, Naturalisation, CAF, APL, Ménage...)
- **Étape 3** : Résultat personnalisé avec le pack MEDP recommandé, prix, inclusions, bouton d'achat et WhatsApp
- **13 résultats** pré-configurés couvrant tous les services MPS
- Responsive, animations fluides, design premium

**Accès :** `https://medp-services.netlify.app/simulateur`

**Déjà dans le menu :** Le lien "Simulateur" avec badge "NOUVEAU" est dans le header de toutes les pages.

### 4. GÉNÉRATEUR DE LETTRES (Page /generateur-lettres)

**Fichier créé :** `src/pages/generateur-lettres.astro`

**Fonctionnalité :**
- **4 modèles de lettres** : Relance préfecture, Recours gracieux, Demande générale, Relance CAF
- **Formulaire interactif** : Nom, adresse, destinataire, objet, détails
- **Prévisualisation en temps réel** : La lettre se met à jour instantanément à chaque frappe
- **Export PDF** : Bouton "Télécharger en PDF" → ouvre une fenêtre d'impression formatée, l'utilisateur enregistre en PDF
- **WhatsApp** : Bouton pour envoyer la lettre directement à MEDP pour relecture/accompagnement

**Accès :** `https://medp-services.netlify.app/generateur-lettres`

**Déjà dans le menu :** Le lien "Lettres" avec badge "GRATUIT" est dans le header.

### 5. CHATBOT FAQ INTELLIGENT (Toutes les pages)

**Fichier créé :** `src/components/ChatBot.tsx`

**Fonctionnalité :**
- **Bouton flottant** en bas à droite (icône bulle de discussion)
- **20+ réponses pré-configurées** sur : titre de séjour, naturalisation, CAF, APL, prime d'activité, France Travail, passeport camerounais, visa, ménage, repassage, écrivain public, prix, tarifs, WhatsApp, contact, horaires, confidentialité, crédit impôt, CESU, simulateur, générateur de lettres
- **Commande "aide"** : liste tous les sujets disponibles
- **Fallback intelligent** : si la question n'est pas reconnue, propose WhatsApp
- **Interface premium** : messages style conversation, animations, responsive
- **Disponible sur TOUTES les pages** (intégré dans le Layout global)

### 6. AUTOMATISATION DES ACTUALITÉS (GitHub Actions + Scraping)

**Fichiers créés :**
- `.github/workflows/scrape-news.yml` — Workflow GitHub Actions (CRON quotidien 6h UTC)
- `scripts/scrape-news.js` — Script Node.js de scraping intelligent

**Fonctionnalité :**
- **Exécute automatiquement tous les jours à 6h du matin** (8h France été, 7h France hiver)
- **Sources scrapées** : Service-Public.fr, France Travail, CAF, Diplomatie.gouv.fr
- **Reformulation IA** : si vous avez une clé OpenAI, l'article est reformulé en langage clair accessible
- **Fallback template** : si pas d'IA, le script génère un article structuré avec conseil MEDP
- **Détection doublons** : ne recrée pas un article déjà existant
- **Validation CMS** : les articles générés apparaissent avec statut "À valider" dans le CMS
- **Rebuild auto** : le site se reconstruit automatiquement avec les nouvelles actualités

**Activation :**
- [ ] Le workflow s'active automatiquement une fois le code sur GitHub (branche `main`)
- [ ] **Optionnel (recommandé)** : ajoutez une clé `OPENAI_API_KEY` dans GitHub → Settings → Secrets pour une reformulation IA plus intelligente
- [ ] **Optionnel** : ajoutez `NETLIFY_BUILD_HOOK` dans GitHub Secrets pour forcer le rebuild après scraping

### 7. DESIGN PREMIUM RÉVISÉ (Charte graphique MPS fidèle)

**Modifications apportées :**
- **Logo 3D transparent** fidèle au MPS original (bleu marine #002B5C, rouge #C8102E, ellipse rouge)
- **6 visuels de pôles** régénérés en 3D isométrique premium avec la charte MPS
- **Hero section** : logo 3D en grand, effets de particules animées, gradient navy profond, glow doré sur le titre
- **Header** : logo 3D avec glow au hover, navigation avec badges "NOUVEAU" et "GRATUIT"
- **Footer** : barre de couleur gradient (bleu → rouge → or), watermark logo 3D en fond, crédits TIT-CS en doré
- **PWA** : toutes les icônes utilisent le logo 3D transparent

---

## 📋 CHECK-LIST D'ACTIVATION PHASE 2 (sur Netlify)

### Variables d'environnement à ajouter dans Netlify

Allez sur **Netlify Dashboard** → votre site → **Site settings** → **Environment variables** → **Add a variable**

| Variable | Valeur | Où la trouver |
|----------|--------|---------------|
| `STRIPE_SECRET_KEY` | `sk_test_...` ou `sk_live_...` | Stripe Dashboard → Developers → API Keys |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_...` ou `pk_live_...` | Stripe Dashboard → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Stripe Dashboard → Developers → Webhooks (ajoutez `https://medp-services.netlify.app/.netlify/functions/stripe-webhook`) |
| `PAYPAL_CLIENT_ID` | `AYX...` | PayPal Developer → Apps & Credentials → votre app |
| `PAYPAL_CLIENT_SECRET` | `EBY...` | PayPal Developer → Apps & Credentials → votre app → Secret |
| `PAYPAL_LIVE` | `false` (test) ou `true` (prod) | À basculer quand vous êtes prêt |
| `URL` | `https://medp-services.netlify.app` | Votre URL de site |

### Configuration dans le CMS (Decap)

- [ ] Allez sur votre site live → **Triple-clic sur le logo MPS** → connectez-vous au CMS
- [ ] **Paramètres Globaux** → **Stripe** → collez la Publishable Key
- [ ] **Paramètres Globaux** → **PayPal** → collez le Client ID
- [ ] **Tarifs & Packs** → ouvrez chaque pack → collez le **Price ID Stripe** correspondant
- [ ] **Publish** → le site se reconstruit avec les paiements actifs

### GitHub Actions (actualités auto)

- [ ] Une fois le code sur GitHub, allez dans votre repo → **Actions** → vous verrez le workflow "Auto-scrape Actualités Administratives"
- [ ] Il s'exécutera automatiquement tous les jours à 6h UTC
- [ ] Pour le tester manuellement : GitHub → Actions → cliquez le workflow → **Run workflow**
- [ ] **Optionnel** : GitHub repo → Settings → Secrets → **New repository secret** → `OPENAI_API_KEY` = votre clé OpenAI (obtenue sur openai.com)

---

## 🎯 CE QUE VOS CLIENTS VOIENT MAINTENANT

| Fonctionnalité | Ce que le client vit | Avantage concurrentiel |
|----------------|---------------------|----------------------|
| **Simulateur** | 3 questions → pack recommandé avec prix | Aucun concurrent ne propose ça gratuitement |
| **Générateur de lettres** | Remplit un formulaire → lettre pro en PDF gratuit | Francetranger facture les lettres, vous les offrez |
| **Chatbot** | Pose une question → réponse instantanée 24/7 | Support automatisé sans coût humain |
| **Paiement Stripe** | Clique → page Stripe sécurisée → paiement | Aussi professionnel que les grandes plateformes |
| **Paiement PayPal** | Alternative sans carte bancaire | Capture les clients sans CB (commun diaspora) |
| **Actualités auto** | Nouveaux articles tous les matins | Votre site est toujours frais, SEO boosté |
| **PWA installable** | "Ajouter à l'écran d'accueil" → app native | Aucun concurrent n'a ça dans ce secteur |
| **WhatsApp contextuel** | Chaque page a son message pré-rempli | Conversion maximale, proximité immédiate |

---

## 🆘 DÉPANNAGE PHASE 2

| Problème | Cause probable | Solution |
|----------|-------------|----------|
| Le paiement Stripe ne marche pas | Variable `STRIPE_SECRET_KEY` manquante sur Netlify | Allez dans Netlify → Env vars → ajoutez-la |
| Le paiement PayPal ne marche pas | Variables PayPal manquantes ou `PAYPAL_LIVE` mal configuré | Vérifiez les 3 variables PayPal dans Netlify |
| Les actualités ne se génèrent pas | GitHub Actions non activé ou secret manquant | Allez sur GitHub → Actions → vérifiez que le workflow est actif |
| Le chatbot ne répond pas | React non chargé | Vérifiez que JavaScript est activé dans le navigateur (c'est standard) |
| Le simulateur reste bloqué | JavaScript désactivé ou erreur | Rafraîchissez la page, ou contactez TIT-CS |

---

## 📞 CONTACT TIT-CS (Phase 2)

Si vous bloquez sur l'activation des paiements, des variables d'environnement, ou du scraping :
- **WhatsApp** : +237 695 51 25 28
- **Email** : contact@tit-cs.com
- **Site** : https://tit-cs.netlify.app

---

## 🚀 PROCHAINES ÉTAPES (Phase 3 — si vous le souhaitez)

| Amélioration | Description |
|-------------|-------------|
| **Newsletter automatique** | Collecte emails → envoi hebdomadaire des nouveaux articles (Mailchimp gratuit) |
| **Tableau de bord client** | Espace minimal où le client voit ses commandes et l'état de ses dossiers |
| **Rappels WhatsApp automatiques** | Netlify Function + Twilio pour relancer les clients sur rendez-vous |
| **Traduction multilingue** | Anglais, Espagnol, version simplifiée pour primo-arrivants |
| **Marketplace SAP** | Mise en relation prestataires de ménage ↔ clients avec commission |
| **Blog auto-SEO** | Mots-clés auto, meta descriptions générées par IA, sitemap dynamique |

---

*Check-list Phase 2 rédigée par le Directeur Technique TIT-CS pour Meudjieuh Prestation & Services.*  
*Site créé par TIT-CS — TIT-CONSULTING SOLUTIONS du "Prince" Joël NOUBISSIE TCHASSOM — Bafang, Haut-Nkam, Cameroun.*
