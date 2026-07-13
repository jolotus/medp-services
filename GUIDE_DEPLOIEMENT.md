# GUIDE DE DÉPLOIEMENT COMPLET — MEDP Services

## 🎯 OBJECTIF : Votre site `medp-services.netlify.app` en ligne, fonctionnel, avec CMS activé, paiements prêts, et vous administrez tout sans coder.

---

## PARTIE 1 : GITHUB (Stockage du code)

### Étape 1.1 — Créer un compte GitHub (si pas déjà fait)

1. Allez sur **https://github.com**
2. Cliquez **Sign up** (en haut à droite)
3. Remplissez : email, mot de passe, nom d'utilisateur (ex: `medp-admin`)
4. Validez l'email reçu → compte activé

### Étape 1.2 — Créer le dépôt (repository)

1. Sur GitHub, cliquez le **+** vert (en haut à droite) → **New repository**
2. Nom du dépôt : `medp-services`
3. Description : `Site web Meudjieuh Prestation & Services`
4. Cochez **Public** (sinon Netlify ne pourra pas le voir facilement)
5. Cochez **Add a README file** (optionnel)
6. Cliquez **Create repository**

### Étape 1.3 — Envoyer le code du site sur GitHub

1. Ouvrez votre ordinateur. Allez dans le dossier du projet (ou demandez à TIT-CS de vous envoyer le ZIP).
2. Ouvrez un terminal (ou invite de commandes) dans ce dossier.
3. Tapez ces commandes UNE PAR UNE (appuyez sur Entrée après chaque) :

```bash
# Se placer dans le dossier (remplacez le chemin par le vôtre)
cd /chemin/vers/medp-services

# Initialiser Git
git init

# Ajouter tout le code
git add .

# Créer le premier commit
git commit -m "Lancement MEDP Services"

# Connecter au dépôt GitHub (remplacez VOTRE_NOM par votre nom GitHub)
git remote add origin https://github.com/VOTRE_NOM/medp-services.git

# Envoyer le code
git branch -M main
git push -u origin main
```

4. Rafraîchissez votre page GitHub : le code apparaît.

---

## PARTIE 2 : STRIPE (Paiements en ligne)

### Étape 2.1 — Créer un compte Stripe

1. Allez sur **https://stripe.com** (ou https://dashboard.stripe.com/register)
2. Cliquez **Start now** ou **Sign in** → **Sign up**
3. Remplissez : email, mot de passe, pays (France), nom de l'entreprise : `Meudjieuh Prestation & Services`
4. Validez l'email → vous arrivez sur le **Dashboard Stripe**

### Étape 2.2 — Passer en mode "Live" (vrai argent)

- En haut à droite du Dashboard, vous voyez **Test mode** (toggle orange)
- Quand vous serez prêt : cliquez pour passer en **Live mode** (nécessite vérification d'identité et RIB)
- **Pour l'instant, restez en Test mode** pour tester.

### Étape 2.3 — Créer vos produits et prix

1. Dans le Dashboard Stripe, menu de gauche : **Products** → **Add product**
2. Pour chaque pack de votre site, créez un produit :

| Produit | Prix | Description |
|---------|------|------------|
| Diagnostic Express | 9,00 € | Consultation rapide 15 min |
| Pack Titre de Séjour | 49,00 € | Accompagnement ANEF complet |
| Pack Naturalisation | 89,00 € | Dossier + entretien + suivi |
| MPS Premium (mois) | 9,90 € | Abonnement mensuel |
| Pack CAF & APL | 29,00 € | Démarches allocations |

3. Cliquez **Add product** :
   - Name : `Pack Titre de Séjour`
   - Description : `Accompagnement complet ANEF`
   - Price : 49,00 €
   - Cliquez **Save product**
4. Une fois sauvé, cliquez sur le produit → vous voyez un **Price ID** (ex: `price_1ABC123...`)
5. **Copiez chaque Price ID** dans un fichier texte sur votre ordinateur.

### Étape 2.4 — Récupérer vos clés API Stripe

1. Dans Stripe Dashboard, menu : **Developers** → **API keys**
2. Vous voyez :
   - **Publishable key** : `pk_test_...` (copiez-la)
   - **Secret key** : `sk_test_...` (copiez-la, elle est confidentielle)
3. Pour le mode Live : les clés commenceront par `pk_live_` et `sk_live_`

---

## PARTIE 3 : PAYPAL (Option de paiement alternatif)

### Étape 3.1 — Créer un compte PayPal Business

1. Allez sur **https://www.paypal.com/fr/business**
2. Cliquez **S'inscrire** ou **Créer un compte**
3. Choisissez **Compte Business** (pas personnel)
4. Remplissez : email pro, mot de passe, nom de l'entreprise : `Meudjieuh Prestation & Services`
5. Validez l'email et confirmez votre téléphone

### Étape 3.2 — Récupérer votre Client ID (pour le site)

1. Connectez-vous au compte PayPal Business
2. Allez sur **https://developer.paypal.com**
3. Cliquez **Log in to Dashboard** (en haut à droite)
4. Dans le menu **Apps & Credentials** (à gauche)
5. Cliquez **Create App**
   - Name : `MEDP Services Website`
   - Type : **Merchant** (vendeur)
6. Cliquez **Create App**
7. Vous arrivez sur la page de l'application :
   - **Client ID** : copiez la longue chaîne de caractères (ex: `AYX...`)
   - **Secret** : copiez aussi (cliquez **Show**)
8. Pour l'instant vous êtes en **Sandbox** (test). Quand vous serez prêt, basculez en **Live**.

---

## PARTIE 4 : NETLIFY (Mise en ligne du site)

### Étape 4.1 — Créer un compte Netlify

1. Allez sur **https://www.netlify.com**
2. Cliquez **Sign up** → choisissez **GitHub** (plus simple, ça connecte directement)
3. Autorisez Netlify à accéder à votre compte GitHub

### Étape 4.2 — Connecter le site

1. Sur le Dashboard Netlify, cliquez **Add new site** → **Import an existing project**
2. Choisissez **GitHub**
3. Sélectionnez votre dépôt : `medp-services`
4. Netlify détecte automatiquement la configuration :
   - **Build command** : `npm run build` (laissez tel quel)
   - **Publish directory** : `dist` (laissez tel quel)
5. Cliquez **Deploy site**
6. Netlify construit le site (1-2 minutes) → vous voyez une URL temporaire du type `https://medp-services-123456.netlify.app`

### Étape 4.3 — Renommer le site avec le bon nom

1. Dans Netlify, allez dans **Site settings** (onglet en haut)
2. Cliquez **Change site name**
3. Tapez : `medp-services`
4. Votre site est maintenant : `https://medp-services.netlify.app`

### Étape 4.4 — Activer le CMS (IDENTITY + GIT GATEWAY) — CRUCIAL

1. Dans Netlify, allez dans **Identity** (menu latéral gauche)
2. Cliquez **Enable Identity**
3. Allez dans **Settings** (toujours dans Identity) → **Registration** → **Set to Invite only** (très important pour la sécurité)
4. Allez dans **Services** (dans Identity) → **Git Gateway** → **Enable Git Gateway**
5. Netlify vous demande peut-être d'autoriser l'accès à GitHub : cliquez **Authorize**
6. Allez dans **Identity** → **Users** → **Invite users**
7. Envoyez une invitation à **votre propre email** → vous deviendrez admin
8. Validez l'invitation depuis votre email → créez un mot de passe

### Étape 4.5 — Activer les formulaires Netlify (contact)

1. Dans Netlify, allez dans **Forms** → le formulaire contact apparaîtra automatiquement dès qu'un visiteur envoie le premier message.
2. Vous recevrez les soumissions dans l'onglet **Forms** et par email.

---

## PARTIE 5 : CONFIGURER LE CMS (Triple-clic sur le logo)

### Étape 5.1 — Accéder au CMS

1. Allez sur votre site live : `https://medp-services.netlify.app`
2. **Triple-cliquez RAPIDEMENT** sur le logo MPS (en haut à gauche)
3. Une fenêtre d'authentification apparaît
4. Connectez-vous avec l'email et le mot de passe que vous avez créés dans Netlify Identity
5. Vous arrivez dans le **tableau de bord Decap CMS**

### Étape 5.2 — Modifier les paramètres globaux (couleurs, téléphone, texte...)

1. Dans le CMS, cliquez à gauche sur **⚙️ Paramètres Globaux du Site**
2. Cliquez sur **🎨 Configuration complète**
3. Modifiez ce que vous voulez :
   - **Titre du site** : le nom dans l'onglet du navigateur
   - **Description SEO** : le texte que Google affiche
   - **Numéro WhatsApp** : mettez le vôtre (format : +33759083580)
   - **Numéro affiché** : avec espaces (+33 7 59 08 35 80)
   - **Couleurs** : cliquez sur le color picker pour changer le bleu, le rouge, l'or...
   - **Texte du Footer** : modifiez les crédits TIT-CS, ajoutez des liens...
   - **Clés Stripe/PayPal** : collez vos clés récupérées aux étapes 2 et 3
4. Cliquez **Publish** (en haut à droite) → **Publish now**
5. Netlify reconstruit le site automatiquement (1 minute) → les modifications sont en ligne

### Étape 5.3 — Modifier un service (ex: changer le prix du Pack Titre de Séjour)

1. Dans le CMS, cliquez à gauche sur **🛎️ Services / Pôles**
2. Vous voyez la liste des services. Cliquez sur **Pack Titre de Séjour**
3. Modifiez le prix, la description, le texte WhatsApp...
4. Cliquez **Publish** → **Publish now**
5. Le site se reconstruit et le nouveau prix est en ligne

### Étape 5.4 — Ajouter un article de blog

1. Dans le CMS, cliquez **📝 Blog & Articles**
2. Cliquez le bouton **New Blog & Articles** (en haut à droite)
3. Remplissez :
   - Titre : `Nouvel article`
   - Description : Résumé pour Google
   - Date : aujourd'hui
   - Catégorie : choisissez
   - Contenu : rédigez votre article (éditeur Markdown avec preview)
4. Cliquez **Publish** → **Publish now**
5. L'article apparaît automatiquement sur `/blog` et son URL est `/blog/YYYY-MM-DD-nouvel-article`

### Étape 5.5 — Ajouter un nouveau tarif / pack

1. Dans le CMS, cliquez **💰 Tarifs & Packs à vendre**
2. **New Tarifs & Packs**
3. Remplissez : nom, prix, description, liste des inclusions...
4. Si vous avez configuré Stripe : collez le **Price ID** dans le champ correspondant
5. **Publish** → le pack apparaît sur la page d'accueil

### Étape 5.6 — Créer une annonce (promo, recrutement...)

1. Dans le CMS, cliquez **📢 Annonces & Offres spéciales**
2. **New Annonces**
3. Remplissez titre, type, dates, couleur du badge...
4. Activez/désactivez l'annonce avec la case **Annonce active**
5. **Publish** → l'annonce apparaît en haut de la page d'accueil

### Étape 5.7 — Ajouter une question à la FAQ

1. Dans le CMS, cliquez **❓ FAQ**
2. **New FAQ**
3. Remplissez question + réponse + catégorie
4. **Publish** → la question apparaît sur la page contact

---

## PARTIE 6 : PAIEMENTS STRIPE (rendre les boutons fonctionnels)

### Étape 6.1 — Où mettre vos clés Stripe dans le CMS

1. CMS → **⚙️ Paramètres Globaux** → **🎨 Configuration complète**
2. Descendez jusqu'à la section **💳 Paiements Stripe**
3. **Clé publique Stripe** : collez votre `pk_test_...` (ou `pk_live_...` en production)
4. **Mode Live** : cochez ou décochez selon que vous voulez recevoir de vrai argent
5. **Publish**

### Étape 6.2 — Lier chaque tarif à un Price ID Stripe

1. CMS → **💰 Tarifs & Packs**
2. Ouvrez chaque pack (ex: Diagnostic Express)
3. Dans le champ **ID Prix Stripe**, collez le Price ID correspondant (ex: `price_1ABC123...`)
4. **Publish**
5. Répétez pour chaque pack.

> **IMPORTANT** : Le bouton de paiement Stripe nécessite une **Netlify Function** (code serveur) pour créer la session de paiement de manière sécurisée. C'est la **Phase 2** que TIT-CS peut ajouter. Pour l'instant, le bouton redirige vers WhatsApp avec le détail du pack.

---

## PARTIE 7 : PAIEMENTS PAYPAL (optionnel mais recommandé)

1. CMS → **⚙️ Paramètres Globaux** → **🎨 Configuration complète**
2. Descendez à **💰 PayPal**
3. **Client ID PayPal** : collez votre Client ID (ex: `AYX...`)
4. **Publish**

> **Note** : L'intégration complète du bouton PayPal nécessite également un code JavaScript côté serveur (Phase 2). Pour l'instant, le site est prêt à l'intégrer.

---

## PARTIE 8 : TESTER L'INSTALLATION APP (PWA)

1. Sur votre téléphone, ouvrez Chrome ou Safari et allez sur `https://medp-services.netlify.app`
2. Attendez 3-5 secondes → un bouton flottant **"Installer MEDP Services"** apparaît en bas
3. Cliquez **Installer** → l'application se télécharge sur votre écran d'accueil
4. Ouvrez l'app : elle fonctionne comme une vraie application native, même sans internet (pour les pages déjà visitées)
5. Quand vous mettrez à jour le site via le CMS, les utilisateurs verront une bannière dorée : **"Nouvelle version disponible — Mettre à jour maintenant"**

---

## PARTIE 9 : VÉRIFICATIONS FINALES (check-list)

- [ ] Site accessible sur `https://medp-services.netlify.app`
- [ ] Le logo MPS s'affiche en haut
- [ ] Triple-clic sur le logo → le CMS s'ouvre (ou vous demande de vous connecter)
- [ ] Vous pouvez vous connecter au CMS avec votre email/mot de passe Netlify Identity
- [ ] Page `/services` affiche les 6 pôles
- [ ] Page `/blog` affiche les articles
- [ ] Page `/contact` affiche le formulaire + WhatsApp
- [ ] Bouton WhatsApp flottant vert présent en bas à droite sur toutes les pages
- [ ] Footer affiche "TIT-CS du Prince Joël NOUBISSIE TCHASSOM" avec le bon WhatsApp
- [ ] Le site est rapide (s'ouvre en moins de 2 secondes)
- [ ] Sur mobile, le bouton "Installer l'app" apparaît

---

## 🆘 EN CAS DE PROBLÈME

| Problème | Solution |
|----------|----------|
| Le CMS ne s'ouvre pas au triple-clic | Vérifiez que Netlify Identity est bien activé et que vous avez validé l'invitation par email |
| Le site ne se met pas à jour après modification CMS | Attendez 1-2 minutes. Netlify rebuild automatiquement. Rafraîchissez la page. |
| J'ai oublié mon mot de passe CMS | Netlify → Identity → Users → cliquez sur votre email → **Send password reset** |
| Les images ne s'affichent pas | Vérifiez que vous les avez bien uploadées dans le CMS (section Media) ou dans le dossier `public/assets` |
| Le bouton de paiement ne marche pas | C'est normal en Phase 1. Il faut la Phase 2 (Netlify Function Stripe). Pour l'instant, le bouton redirige WhatsApp. |

---

## 📞 CONTACT TIT-CS EN CAS DE BLOCAGE

**WhatsApp** : +237 695 51 25 28  
**Email** : contact@tit-cs.com  
**Site** : https://tit-cs.netlify.app

*Ce guide a été rédigé par le Directeur Technique TIT-CS pour Meudjieuh Prestation & Services.*
