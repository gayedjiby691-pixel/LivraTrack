# Formules Airtable LivraTrack — Guide Sans Erreurs

Ce document récapitule les formules exactes testées pour Airtable, sans décalage de fuseau (GMT Dakar) et adaptées aux encaissements en Francs CFA (XOF) ou en Dollars ($).

---

## 1. Table `Entreprises`

### Champ : `Fin essai`
- **Type :** Formula
- **Formule :**
```airtable
IF({Date début}, DATEADD({Date début}, 30, 'days'), '')
```

### Champ : `Statut compte`
- **Type :** Formula
- **Formule :**
```airtable
IF({Plan} = 'Payant', 'Payant', IF(NOT({Date début}), '', IF(TODAY() > {Fin essai}, 'Essai expiré', 'Essai en cours')))
```

---

## 2. Table `Livraisons`

### Champ : `Référence`
- **Type :** Formula
- **Formule :**
```airtable
'LIV-' & {N°}
```

### Champ : `Code suivi`
- **Type :** Formula
- **Formule :**
```airtable
RECORD_ID()
```

### Champ : `WhatsApp client` (Nettoyage automatique du numéro international)
- **Type :** Formula
- **Formule :**
```airtable
SUBSTITUTE(SUBSTITUTE(SUBSTITUTE({Tel client}, '+', ''), ' ', ''), '-', '')
```

### Champ : `Écart`
- **Type :** Formula
- **Formule :**
```airtable
IF({Statut} = 'Livré', {Encaissé} - {À encaisser}, 0)
```

### Champ : `À faire`
- **Type :** Formula
- **Formule :**
```airtable
IF(OR({Statut} = 'À livrer', {Statut} = 'En route'), 1, 0)
```

### Champ : `Fait aujourd'hui`
- **Type :** Formula
- **Formule :**
```airtable
IF(AND({Traitée le}, IS_SAME({Traitée le}, TODAY(), 'day')), 1, 0)
```

### Champ : `Livrée du jour`
- **Type :** Formula
- **Formule :**
```airtable
IF(AND({Statut} = 'Livré', {Fait aujourd'hui} = 1), 1, 0)
```

### Champ : `Échec du jour`
- **Type :** Formula
- **Formule :**
```airtable
IF(AND({Statut} = 'Échec', {Fait aujourd'hui} = 1), 1, 0)
```

### Champ : `Encaissé du jour`
- **Type :** Formula
- **Formule :**
```airtable
IF({Livrée du jour} = 1, {Encaissé}, 0)
```

### Champ : `Attendu du jour`
- **Type :** Formula
- **Formule :**
```airtable
IF({Livrée du jour} = 1, {À encaisser}, 0)
```

### Champ : `Message client`
- **Type :** Formula
- **Formule :**
```airtable
SWITCH(
  {Statut},
  'À livrer', '📦 Commande enregistrée, préparation en cours.',
  'En route', '🛵 Votre livreur est en route vers votre adresse !',
  'Livré', '✅ Colis livré avec succès. Merci pour votre confiance !',
  'Échec', '⚠️ Livraison non aboutie (' & IF({Motif échec}, {Motif échec}, 'contact en cours') & '). Notre service vous rappelle rapidement.'
)
```

### Champ : `Lien WhatsApp`
- **Type :** Formula
- Remplacez `https://suivi.livratrack.app` par votre URL Glide publique ou votre domaine :
```airtable
IF(
  {WhatsApp client},
  'https://wa.me/' & {WhatsApp client} & '?text=' & ENCODE_URL_COMPONENT(
    'Bonjour ' & {Client} & ', votre livraison ' & {Référence} & ' est prise en charge. ' &
    'Suivez l\'avancement en direct ici : https://suivi.livratrack.app?code=' & {Code suivi}
  ),
  ''
)
```

---

## 3. Table `Livreurs` (Rollups & Récapitulatif Fin de Journée)

Ces champs permettent au gérant de voir en un clin d'œil l'activité de chaque livreur :

| Nom du Rollup | Champ lié | Champ source dans Livraisons | Formule d'agrégation |
| :--- | :--- | :--- | :--- |
| **Livrées du jour** | `Livraisons` | `Livrée du jour` | `SUM(values)` |
| **Échecs du jour** | `Livraisons` | `Échec du jour` | `SUM(values)` |
| **À faire** | `Livraisons` | `À faire` | `SUM(values)` |
| **Attendu du jour** | `Livraisons` | `Attendu du jour` | `SUM(values)` |
| **Encaissé du jour** | `Livraisons` | `Encaissé du jour` | `SUM(values)` |

### Champ : `Écart du jour`
- **Type :** Formula
- **Formule :**
```airtable
{Encaissé du jour} - {Attendu du jour}
```
*Si la valeur est inférieure à 0, le livreur a ramené moins d'argent que prévu (manquant de caisse). Si supérieure à 0, il y a un trop-perçu ou pourboire inclus.*
