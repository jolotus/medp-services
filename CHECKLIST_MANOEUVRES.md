# CHECK-LIST DE MANŒUVRES — Déploiement MEDP Services

## 🎯 MISSION : Votre site `medp-services.netlify.app` en ligne, 100% gérable sans coder.

---

## ✅ ÉTAPE 1 : CRÉER VOTRE COMPTE GITHUB (5 min)

- [ ] Allez sur **https://github.com**
- [ ] Cliquez **Sign up** (en haut à droite)
- [ ] Remplissez : email, mot de passe, nom d'utilisateur (ex: `medp-admin` ou votre nom)
- [ ] Validez l'email reçu → cliquez le lien dans l'email
- [ ] Votre compte GitHub est actif ✅

---

## ✅ ÉTAPE 2 : CRÉER LE DÉPÔT GITHUB (3 min)

- [ ] Sur GitHub, cliquez le **bouton vert +** (en haut à droite) → **New repository**
- [ ] Nom : `medp-services`
- [ ] Description : `Site web Meudjieuh Prestation & Services`
- [ ] Cochez **Public**
- [ ] Cochez **Add a README file**
- [ ] Cliquez **Create repository**
- [ ] Votre dépôt existe ✅

---

## ✅ ÉTAPE 3 : ENVOYER LE CODE SUR GITHUB (10 min)

*Vous avez besoin du dossier `medp-services` fourni par TIT-CS sur votre ordinateur.*

- [ ] Ouvrez un terminal (Windows : `cmd` ou PowerShell ; Mac : Terminal ; Linux : Terminal)
- [ ] Tapez : `cd /chemin/vers/medp-services` (remplacez par votre chemin réel, ex: `cd C:\Users\Vous\Desktop\medp-services`)
- [ ] Tapez : `git init` → appuyez Entrée
- [ ] Tapez : `git add .` → appuyez Entrée
- [ ] Tapez : `git commit -m "Lancement MEDP Services"` → appuyez Entrée
- [ ] Tapez : `git remote add origin https://github.com/VOTRE_NOM/medp-services.git` → remplacez `VOTRE_NOM` par votre nom GitHub
- [ ] Tapez : `git branch -M main` → appuyez Entrée
- [ ] Tapez : `git push -u origin main` → appuyez Entrée → entrez votre email GitHub puis mot de passe (ou token)
- [ ] Rafraîchissez votre page GitHub : le code est là ✅

---

## ✅ ÉTAPE 4 : CRÉER VOTRE COMPTE STRIPE (8 min)

- [ ] Allez sur **https://stripe.com**
- [ ] Cliquez **Sign in** → **Sign up** (ou Start now)
- [ ] Email, mot de passe, pays = **France**, entreprise = `Meudjieuh Prestation & Services`
- [ ] Validez l'email → vous arrivez sur le **Dashboard Stripe**
- [ ] **Restez en mode Test** (toggle orange en haut à droite) pour l'instant
- [ ] Votre compte Stripe est actif ✅

---

## ✅ ÉTAPE 5 : CRÉER VOS PRODUITS ET PRIX DANS STRIPE (10 min)

- [ ] Dans le Dashboard Stripe, menu gauche : **Products** → **Add product**
- [ ] Produit 1 : Name = `Diagnostic Express`, Description = `Consultation 15 min`, Price = **9,00 €** → **Save product**
- [ ] Produit 2 : Name = `Pack Titre de Séjour`, Description = `Accompagnement ANEF complet`, Price = **49,00 €** → **Save product**
- [ ] Produit 3 : Name = `Pack Naturalisation`, Description = `Dossier + entretien + suivi`, Price = **89,00 €** → **Save product**
- [ ] Produit 4 : Name = `MPS Premium`, Description = `Abonnement mensuel`, Price = **9,90 €** → **Save product**
- [ ] Produit 5 : Name = `Pack CAF & APL`, Description = `Démarches allocations`, Price = **29,00 €** → **Save product**
- [ ] Cliquez sur chaque produit → vous voyez un **Price ID** (ex: `price_1ABC123...`) → **copiez-les dans un fichier texte** sur votre ordinateur
- [ ] Vos 5 produits sont créés ✅

---

## ✅ ÉTAPE 6 : RÉCUPÉRER VOS CLÉS STRIPE (2 min)

- [ ] Dans Stripe, menu : **Developers** (en haut à droite) → **API keys**
- [ ] Copiez la **Publishable key** (`pk_test_...`) → collez-la dans votre fichier texte
- [ ] Copiez la **Secret key** (`sk_test_...`) → collez-la aussi (gardez-la secrète)
- [ ] Vos clés sont prêtes ✅

---

## ✅ ÉTAPE 7 : CRÉER VOTRE COMPTE PAYPAL BUSINESS (8 min) — OPTIONNEL MAIS RECOMMANDÉ

- [ ] Allez sur **https://www.paypal.com/fr/business**
- [ ] Cliquez **S'inscrire** ou **Créer un compte**
- [ ] Choisissez **Compte Business** (PAS personnel)
- [ ] Email pro, mot de passe, entreprise = `Meudjieuh Prestation & Services`
- [ ] Validez l'email et confirmez le téléphone
- [ ] Votre compte PayPal Business est actif ✅

---

## ✅ ÉTAPE 8 : RÉCUPÉRER VOTRE CLIENT ID PAYPAL (3 min)

- [ ] Allez sur **https://developer.paypal.com**
- [ ] Cliquez **Log in to Dashboard** (en haut à droite)
- [ ] Connectez-vous avec votre compte PayPal Business
- [ ] Menu gauche : **Apps & Credentials**
- [ ] Cliquez **Create App**
- [ ] Name : `MEDP Services Website`, Type : **Merchant** → **Create App**
- [ ] Copiez le **Client ID** (longue chaîne de caractères, ex: `AYX...`) → collez dans votre fichier texte
- [ ] Votre Client ID PayPal est prêt ✅

---

## ✅ ÉTAPE 9 : CRÉER VOTRE COMPTE NETLIFY (3 min)

- [ ] Allez sur **https://www.netlify.com**
- [ ] Cliquez **Sign up** → choisissez **GitHub** (c'est le plus simple)
- [ ] Autorisez Netlify à accéder à votre compte GitHub
- [ ] Votre compte Netlify est actif ✅

---

## ✅ ÉTAPE 10 : CONNECTER LE SITE ET DÉPLOYER (5 min)

- [ ] Sur le Dashboard Netlify, cliquez **Add new site** → **Import an existing project**
- [ ] Choisissez **GitHub**
- [ ] Sélectionnez votre dépôt : `medp-services`
- [ ] Netlify détecte automatiquement : Build command = `npm run build`, Publish directory = `dist`
- [ ] Cliquez **Deploy site**
- [ ] Attendez 1-2 minutes (la barre de progression devient verte)
- [ ] Votre site est live sur une URL temporaire (ex: `https://medp-services-123456.netlify.app`) ✅

---

## ✅ ÉTAPE 11 : RENOMMER LE SITE (2 min)

- [ ] Dans Netlify, allez dans **Site settings** (onglet en haut de la page)
- [ ] Cliquez **Change site name**
- [ ] Tapez : `medp-services`
- [ ] Votre site est maintenant : `https://medp-services.netlify.app` ✅

---

## ✅ ÉTAPE 12 : ACTIVER LE CMS — IDENTITY (CRUCIAL)

- [ ] Dans Netlify, menu latéral gauche : **Identity**
- [ ] Cliquez **Enable Identity** → bouton devient vert
- [ ] Allez dans **Settings** (toujours dans Identity) → **Registration** → choisissez **Invite only** → **Save**
- [ ] Allez dans **Services** (dans Identity) → **Git Gateway** → **Enable Git Gateway**
- [ ] Netlify demande d'autoriser GitHub : cliquez **Authorize** → connectez-vous GitHub → autorisez
- [ ] Git Gateway est activé ✅

---

## ✅ ÉTAPE 13 : DEVENIR ADMINISTRATEUR DU CMS (3 min)

- [ ] Dans Netlify, allez dans **Identity** → **Users** → **Invite users**
- [ ] Tapez votre propre email → cliquez **Send invite**
- [ ] Allez sur votre boîte email → ouvrez l'email de Netlify → cliquez **Accept the invite**
- [ ] Créez un mot de passe fort → validez
- [ ] Vous êtes maintenant administrateur du CMS ✅

---

## ✅ ÉTAPE 14 : ACTIVER LES FORMULAIRES DE CONTACT (1 min)

- [ ] Dans Netlify, menu : **Forms** → vous n'avez rien à faire ici pour l'instant
- [ ] Le formulaire est prêt : dès qu'un visiteur envoie un message via le site, il apparaît ici
- [ ] Vous recevez aussi un email automatique ✅

---

## ✅ ÉTAPE 15 : ENTRER VOS PARAMÈTRES DANS LE CMS (15 min)

- [ ] Ouvrez votre site : `https://medp-services.netlify.app`
- [ ] **Triple-cliquez RAPIDEMENT** sur le logo MPS (en haut à gauche de la page)
- [ ] Une fenêtre d'authentification s'ouvre → connectez-vous avec votre email et mot de passe (étape 13)
- [ ] Vous arrivez dans le **tableau de bord Decap CMS** ✅
- [ ] Dans le CMS, cliquez à gauche : **⚙️ Paramètres Globaux du Site**
- [ ] Cliquez sur **🎨 Configuration complète**
- [ ] Modifiez :
  - [ ] **Numéro WhatsApp** : `+33759083580` (votre vrai numéro, format international sans espaces)
  - [ ] **Numéro affiché** : `+33 7 59 08 35 80` (avec espaces)
  - [ ] **Email** : votre vrai email
  - [ ] **Adresse** : votre zone d'intervention réelle
  - [ ] **Horaires** : vos vrais horaires
  - [ ] **Couleurs** : modifiez si vous voulez avec les color pickers
  - [ ] **Texte du Footer** : modifiez les crédits TIT-CS si besoin (mais gardez-les pour honorer la création)
- [ ] Descendez à **💳 Paiements Stripe** :
  - [ ] **Clé publique Stripe** : collez votre `pk_test_...` (étape 6)
  - [ ] **Mode Live** : laissez décoché pour l'instant (test)
- [ ] Descendez à **💰 PayPal** :
  - [ ] **Client ID PayPal** : collez votre `AYX...` (étape 8)
- [ ] Cliquez **Publish** (en haut à droite) → **Publish now**
- [ ] Attendez 1 minute → Netlify rebuild automatiquement
- [ ] Rafraîchissez votre site : les modifications sont en ligne ✅

---

## ✅ ÉTAPE 16 : LIER VOS TARIFS À STRIPE (10 min)

- [ ] Dans le CMS, cliquez à gauche : **💰 Tarifs & Packs à vendre**
- [ ] Ouvrez chaque pack un par un :
  - [ ] **Diagnostic Express** → champ **ID Prix Stripe** → collez le Price ID correspondant (étape 5) → **Publish**
  - [ ] **Pack Titre de Séjour** → même chose → **Publish**
  - [ ] **Pack Naturalisation** → même chose → **Publish**
  - [ ] **MPS Premium** → même chose → **Publish**
  - [ ] **Pack CAF & APL** → même chose → **Publish**
- [ ] Tous vos packs sont liés aux paiements Stripe ✅

---

## ✅ ÉTAPE 17 : TESTER L'APP PWA SUR VOTRE TÉLÉPHONE (5 min)

- [ ] Sur votre téléphone, ouvrez Chrome (Android) ou Safari (iPhone)
- [ ] Allez sur `https://medp-services.netlify.app`
- [ ] Attendez 3-5 secondes → un bouton flottant **"Installer MEDP Services"** apparaît en bas
- [ ] Cliquez **Installer** → l'application se télécharge sur votre écran d'accueil
- [ ] Ouvrez l'app depuis l'écran d'accueil : elle s'ouvre comme une vraie app, sans barre d'adresse
- [ ] L'app fonctionne même sans internet pour les pages déjà visitées ✅

---

## ✅ ÉTAPE 18 : VÉRIFICATIONS FINALES (10 min)

- [ ] Le site s'ouvre en moins de 2 secondes sur `https://medp-services.netlify.app`
- [ ] Le logo MPS est visible en haut de chaque page
- [ ] La page `/services` affiche les 6 pôles avec les visuels premium
- [ ] La page `/blog` affiche les 6 articles de guides
- [ ] La page `/contact` affiche le formulaire + les coordonnées WhatsApp
- [ ] Le bouton WhatsApp vert flottant est visible en bas à droite sur toutes les pages
- [ ] Le footer affiche bien : "TIT-CS du Prince Joël NOUBISSIE TCHASSOM" avec le bon WhatsApp (+237 695 51 25 28)
- [ ] Le triple-clic sur le logo ouvre le CMS (ou vous demande de vous connecter)
- [ ] Vous pouvez vous connecter au CMS avec votre mot de passe
- [ ] Sur mobile, le bouton "Installer l'app" apparaît
- [ ] Vous pouvez modifier un prix dans le CMS → publier → le site se met à jour automatiquement en 1 minute
- [ ] Le site est responsive (s'affiche bien sur téléphone, tablette, ordinateur)

---

## ✅ ÉTAPE 19 : PASSER EN PRODUCTION (QUAND VOUS ÊTES PRÊT)

- [ ] Dans Stripe Dashboard, en haut à droite : toggle **Test mode** → passez en **Live**
- [ ] Stripe vous demande : vérification d'identité (carte d'identité), RIB, informations entreprise
- [ ] Une fois validé (quelques heures à 2 jours), vos clés changent : `pk_live_...` et `sk_live_...`
- [ ] Dans le CMS : **Paramètres Globaux** → **Clé publique Stripe** : remplacez par `pk_live_...`
- [ ] Cochez **Mode Live** → **Publish**
- [ ] Dans le CMS : **Tarifs** → remplacez tous les Price ID par les versions Live (recréez les produits en mode Live si nécessaire)
- [ ] Vous pouvez maintenant recevoir de vrais paiements ✅

- [ ] (Optionnel PayPal) Dans PayPal Developer Dashboard : menu **Apps** → votre app → basculez en **Live**
- [ ] Le Client ID change : mettez à jour dans le CMS → **Publish**

---

## ✅ ÉTAPE 20 : UTILISER LE CMS AU QUOTIDIEN (Votre nouveau super-pouvoir)

### Modifier un prix
- [ ] CMS → **💰 Tarifs** → ouvrez le pack → changez le prix → **Publish** → 1 minute → en ligne

### Ajouter un service
- [ ] CMS → **🛎️ Services** → **New** → remplissez les champs → **Publish** → apparaît automatiquement sur `/services` et l'accueil

### Supprimer un article
- [ ] CMS → **📝 Blog** → cliquez l'article → **Delete** → confirmez → **Publish** → article supprimé

### Modifier le texte du footer
- [ ] CMS → **⚙️ Paramètres Globaux** → **Texte du Footer** → modifiez → **Publish** → changement sur toutes les pages

### Changer les couleurs du site
- [ ] CMS → **⚙️ Paramètres Globaux** → **Palette de couleurs** → utilisez les color pickers → **Publish** → le site change de couleur

### Créer une annonce promo
- [ ] CMS → **📢 Annonces** → **New** → remplissez → activez **Annonce active** → **Publish** → apparaît sur la page d'accueil

### Modifier le numéro WhatsApp partout
- [ ] CMS → **⚙️ Paramètres Globaux** → **Numéro WhatsApp** → changez → **Publish** → tous les boutons du site se mettent à jour automatiquement

---

## 🆘 DÉPANNAGE RAPIDE

| Problème | Solution |
|----------|----------|
| Le CMS ne s'ouvre pas au triple-clic | Vérifiez que Netlify Identity est activé (étape 12) et que vous avez validé l'invitation email (étape 13) |
| Le site ne se met pas à jour après modif CMS | Attendez 1-2 minutes. Netlify rebuild automatiquement. Rafraîchissez. Si rien, allez dans Netlify → **Deploys** → vérifiez que le dernier build est "Published" |
| J'ai oublié mon mot de passe CMS | Netlify → Identity → Users → cliquez sur votre email → **Send password reset** → vérifiez votre email |
| Les images ne s'affichent pas | Vérifiez que vous les avez uploadées dans le CMS (Media) ou dans le dossier `public/assets` avant le push GitHub |
| Le bouton de paiement Stripe ne marche pas | C'est normal en Phase 1. Il redirige vers WhatsApp. La Phase 2 (paiement direct) nécessite une Netlify Function. Contactez TIT-CS. |
| Mon site est sur une URL bizarre | Netlify → Site settings → **Change site name** → tapez `medp-services` → votre site devient `https://medp-services.netlify.app` |

---

## 📞 EN CAS DE BLOCAGE TOTAL

**Contactez TIT-CS immédiatement :**
- **WhatsApp** : +237 695 51 25 28
- **Email** : contact@tit-cs.com
- **Site** : https://tit-cs.netlify.app

---

## 🎉 FÉLICITATIONS

Si vous avez coché toutes les cases ci-dessus, votre site **MEDP Services** est :
- ✅ En ligne sur `https://medp-services.netlify.app`
- ✅ Gérable à 100% sans coder via le CMS (triple-clic sur le logo)
- ✅ Équipé de paiements Stripe + PayPal prêts
- ✅ Installable comme une vraie app sur téléphone
- ✅ Optimisé Google SEO (articles, rich snippets, rapidité)
- ✅ Votre vitrine commerciale surpasse la concurrence

**Votre entreprise Meudjieuh Prestation & Services est désormais digitale et prête à conquérir le marché.**

---

*Check-list rédigée par le Directeur Technique TIT-CS pour Meudjieuh Prestation & Services.*  
*Site créé par TIT-CS — TIT-CONSULTING SOLUTIONS du "Prince" Joël NOUBISSIE TCHASSOM — Bafang, Haut-Nkam, Cameroun.*
