# Architecture & Guide Automatisations Make.com

Ce guide détaille la mise en place des flux automatiques pour LivraTrack avec [Make.com](https://make.com) et les passerelles WhatsApp.

---

## 1. Vue d'Ensemble des Flux

```
[Nouveau Colis dans Airtable] ────> [Make.com Webhook] ────> [WhatsApp au Client : Lien de suivi]
[Statut passe à "Livré"]      ────> [Make.com Webhook] ────> [WhatsApp au Client : Reçu & Photo]
[Chaque soir à 19h00 GMT]     ────> [Make.com Cron]    ────> [WhatsApp au Gérant : Bilan de caisse]
```

---

## 2. Scénario 1 : Alerte Client "Colis en route" (Webhook Airtable -> WhatsApp)

### Déclencheur (Trigger) : Airtable "Watch Records"
- **Base :** LivraTrack
- **Table :** `Livraisons`
- **View :** Vue filtrée où `Statut` = `En route` et `Message envoyé` = `Non coché`.

### Action : Envoi WhatsApp
- **Option Débutante (Gratuite) :** Utilisation du champ calculé `{Lien WhatsApp}` de la table Airtable que le livreur clique sur Glide.
- **Option Pro (Automatique sans action humaine) :**
  - **Module HTTP Make.com :** Appel API vers une passerelle WhatsApp (ex : Green-API ou Wasapi).
  - **Endpoint :** `POST https://api.green-api.com/waInstance{{ID}}/sendMessage/{{TOKEN}}`
  - **Body JSON :**
  ```json
  {
    "chatId": "{{WhatsApp client}}@c.us",
    "message": "Bonjour {{Client}}, votre colis (Réf: {{Référence}}) est en route avec notre livreur {{Livreur}}. Vous pouvez suivre son arrivée en direct ici : https://suivi.livratrack.app?code={{Code suivi}}"
  }
  ```

---

## 3. Scénario 2 : Bilan Journalier de 19h00 (Cron Gérant)

### Déclencheur : Make "Schedule"
- **Heure d'exécution :** Tous les jours à `19:00` (Fuseau horaire : `Africa/Dakar` ou `GMT`).

### Étape 1 : Airtable "Search Records"
- **Table :** `Livreurs`
- **Filtre formule :** `{Actif} = 1`

### Étape 2 : Text Aggregator
- **Contenu du récapitulatif généré pour chaque livreur :**
```text
👤 Livreur : {{Nom}}
• Livrées : {{Livrées du jour}}
• Échecs : {{Échecs du jour}}
• Encaissé : {{Encaissé du jour}} FCFA
• Attendu : {{Attendu du jour}} FCFA
• Écart de caisse : {{Écart du jour}} FCFA {{if Écart du jour != 0 then "⚠️ VÉRIFIER" else "✅ OK"}}
────────────────────────
```

### Étape 3 : Envoi au Gérant
- Envoi du message global agrégé sur le WhatsApp du gestionnaire de l'entreprise.

---

## 4. Recommandations Pratiques de Scalabilité

1. **Phase 1 (1 à 5 clients, 10 à 25 livreurs) :**
   - Utiliser les liens `wa.me` natifs intégrés dans l'interface Glide.
   - Zéro frais de logiciel externe (100% gratuit).
2. **Phase 2 (5 à 20 clients, 50 à 100 livreurs) :**
   - Activer Make.com formule Core ($9/mois) avec une instance Green-API ($12/mois).
   - Automatisation totale : ni le gérant ni le livreur n'ont besoin de manipuler l'envoi de messages WhatsApp.
