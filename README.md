# 🛵 LivraTrack — SaaS de Suivi de Livraisons & Contrôle de Caisse (Dakar & International)

> **LivraTrack : sachez où en est chaque livraison, et où est votre argent.**  
> Fini les appels *« vous êtes où ? »*, les litiges *« je n'ai rien reçu »* et les erreurs de caisse le soir.

---

## 🌟 Points Forts du Système

1. **Preuve Photo Horodatée :** Le livreur ne peut clôturer une livraison qu'en prenant une photo du colis remis ou du bon signé. Zéro litige client de mauvaise foi.
2. **Rapprochement Cash & Mobile Money (Wave / Orange Money) :** Suivi instantané des encaissements physiques et mobiles. Bilan automatique de fin de journée à 19h avec alerte rouge en cas d'écart.
3. **Suivi Client WhatsApp Sans Application :** Le client reçoit un lien direct (`wa.me` puis domaine) pour suivre son coursier en temps réel avec repère GPS / quartier Dakar.
4. **Zéro friction pour les livreurs :** Fonctionne directement sur le navigateur Chrome d'un téléphone d'entrée de gamme, sans rien installer depuis le Play Store. Consommation data minime (< 2 Mo / jour).

---

## 📁 Structure du Projet

```text
├── automations/
│   └── make_scenario_guide.md       # Scénarios Make.com (webhook WhatsApp & récap 19h)
├── commercial_kit/
│   ├── 15_entreprises_dakar.md      # 15 cibles réelles à Dakar & messages d'approche
│   └── scripts_objections.md        # Guide de traitement des objections terrain
├── data/
│   ├── Entreprises.csv              # Schéma & données de test Entreprises
│   ├── Livreurs.csv                 # Schéma & données de test Livreurs / Gestionnaires
│   ├── Livraisons.csv               # Schéma & données de test Livraisons complètes
│   └── airtable_formulas.md         # Formules Airtable prêtes à copier-coller
├── public/                          # Fichiers statiques
├── src/
│   ├── App.jsx                      # Application web & simulateur interactif complet
│   ├── index.css                    # Styles Tailwind CSS & polices
│   └── main.jsx                     # Point d'entrée React 19
├── index.html                       # HTML principal
├── preview.html                     # Démo autonome exécutable par double-clic
├── package.json                     # Dépendances nettoyées
├── vercel.json                      # Configuration de déploiement Vercel (SPA clean routing)
└── vite.config.js                   # Configuration Vite
```

---

## 🚀 Démarrage Rapide

### Option A — Aperçu Direct (Sans installation)
Double-cliquez directement sur **`preview.html`** pour ouvrir la présentation et le simulateur dans votre navigateur web sans ligne de commande.

### Option B — Lancement en Mode Développement
```bash
# Lancer le serveur local
npm run dev
```
Rendez-vous sur `http://localhost:3000`.

### Option C — Compilation Production
```bash
npm run build
```
Les fichiers compilés et optimisés se trouvent dans le dossier `dist/`.

---

## 🇸🇳 Déploiement Vercel
Le fichier `vercel.json` est prêt. Connectez votre dépôt GitHub à Vercel pour déployer en 1 clic.
