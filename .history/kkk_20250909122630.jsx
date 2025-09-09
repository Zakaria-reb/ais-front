<!DOCTYPE html> <html lang="en">   <head>     <meta charset="utf-8" />     <link rel="icon" href="%PUBLIC_URL%/ais_web.png" />     <meta name="viewport" content="width=device-width, initial-scale=1" />     <meta name="theme-color" content="#000000" />     <meta       name="description"       content="Web site created using create-react-app"     />     <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />     <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />          <!-- Tailwind CSS via CDN -->     <script src="https://cdn.tailwindcss.com"></script>          <!-- Google Fonts -->     <link rel="preconnect" href="https://fonts.googleapis.com">     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>     <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet">          <!-- Tailwind Configuration -->     <script>       tailwind.config = {         theme: {           extend: {             fontFamily: {               'orbitron': ['Orbitron', 'monospace'],               'rajdhani': ['Rajdhani', 'sans-serif'],               'jetbrains': ['JetBrains Mono', 'Monaco', 'Menlo', 'monospace'],               'fira': ['Fira Code', 'Monaco', 'Menlo', 'monospace'],             },             colors: {               'cyber-blue': '#00aaff',               'cyber-dark': '#020208',               'cyber-darker': '#0a0f1c',               'cyber-darkest': '#050510',             },             animation: {               'blink': 'blink 1s infinite',               'glow': 'glow 3s ease-in-out infinite alternate',               'bounce-slow': 'bounce 2s ease-in-out infinite',               'spin-slow': 'spin 20s linear infinite',               'spin-reverse': 'spin-reverse 15s linear infinite',               'ring-rotate': 'ring-rotate 10s linear infinite',               'scan-rotate': 'scan-rotate 3s linear infinite',               'grid-move': 'grid-move 20s linear infinite',               'glitch-slide': 'glitch-slide 3s ease-in-out infinite',             },             keyframes: {               blink: {                 '0%, 50%': { opacity: 1 },                 '51%, 100%': { opacity: 0 },               },               glow: {                 '0%': { filter: 'drop-shadow(0 0 30px rgba(0, 170, 255, 0.6))' },                 '100%': { filter: 'drop-shadow(0 0 50px rgba(0, 170, 255, 0.9))' },               },               'ring-rotate': {                 '0%': { transform: 'rotate(0deg)' },                 '100%': { transform: 'rotate(360deg)' },               },               'scan-rotate': {                 '0%': { transform: 'rotate(0deg)' },                 '100%': { transform: 'rotate(360deg)' },               },               'grid-move': {                 '0%': { transform: 'translate(0, 0)' },                 '100%': { transform: 'translate(50px, 50px)' },               },               'glitch-slide': {                 '0%, 90%': { transform: 'translateX(-100%)' },                 '95%': { transform: 'translateX(100%)' },                 '100%': { transform: 'translateX(-100%)' },               },               'spin-reverse': {                 '0%': { transform: 'rotate(360deg)' },                 '100%': { transform: 'rotate(0deg)' },               },             },           },         },       }     </script>      <title>AIS Web</title>   </head>   <body>     <noscript>You need to enable JavaScript to run this app.</noscript>     <div id="root"></div>   </body> </html>///  d1. Accès Administrateur

Qui peut activer les comptes :

Président du club

Trésorier (recommandé pour les paiements)

Secrétaire (pour les adhésions gratuites)

Méthodes d'accès :

Page admin protégée par mot de passe

Accès via ordinateur/téléphone

Interface simple et intuitive

2. Processus d'Activation Étape par Étape

Étape 1 : Réception de l'inscription

L'étudiant s'inscrit en ligne

Notification automatique au bureau

Inscription apparaît avec statut "EN ATTENTE"

Étape 2 : Paiement physique

L'étudiant contacte le membre du bureau

Rendez-vous à l'université

Paiement en espèces + vérification identité

Étape 3 : Activation par l'admin

L'admin se connecte au tableau de bord

Recherche l'étudiant par :

Nom/Prénom

Numéro d'inscription

Email

Numéro étudiant

Clique sur "Voir détails"

Vérifie les informations

Clique sur "ACTIVER LE COMPTE"

Ajoute une note (optionnel)

Confirmation d'activation

3. Fonctionnalités du Système Admin

Tableau de Bord :

✅ Vue d'ensemble des statistiques

✅ Liste complète des inscriptions

✅ Filtres par statut (En attente/Actif/Rejeté)

✅ Recherche instantanée

✅ Export des données

Actions Possibles :

Activer : Confirme le paiement et active le compte

Rejeter : Refuse l'inscription (paiement non reçu, etc.)

Voir détails : Affiche toutes les informations

Export : Télécharge la liste complète

4. Notifications Automatiques

Après activation/rejet, le système peut envoyer :

Email de confirmation à l'étudiant

SMS de bienvenue (optionnel)

Ajout automatique aux groupes WhatsApp du club

5. Avantages de ce Système

Pour l'Administration :

🎯 Interface claire et professionnelle

🔍 Recherche rapide et efficace

📊 Statistiques en temps réel

📱 Accessible sur mobile/ordinateur

💾 Sauvegarde automatique des données

Pour les Étudiants :

📧 Confirmation immédiate par email

🔄 Suivi transparent du statut

⚡ Activation rapide après paiement

6. Cas d'Usage Pratiques

Scénario 1 : Adhésion payante

Ahmed s'inscrit en ligne (Membre Actif - 25 DH)

Il contacte le trésorier pour payer

Après paiement, le trésorier se connecte

Recherche "Ahmed" dans le tableau de bord

Active son compte en 2 clics

Ahmed reçoit un email de confirmation/// donner moi la page de formulaire d incription le table de bd associer et la page de login adabter au style de notre site et adabter la partie de membership pour qu il redirige ver ce page et aussi adabter le navigation 