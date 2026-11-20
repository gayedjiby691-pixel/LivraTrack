# Manuel de Configuration Ultime des Écrans Glide (LivraTrack)

Ce guide détaille le paramétrage chirurgical des deux applications **Glide** reliées à votre base Airtable :
1. **Application 1 : `LivraTrack Ops` (Privée)** — Pour les Gérants et les Livreurs avec gestion des rôles.
2. **Application 2 : `LivraTrack Suivi` (Publique)** — Pour les clients finaux sans connexion.

---

## 📱 APPLICATION 1 : `LivraTrack Ops` (Gérants & Livreurs)

### Étape 1 : Configuration des Utilisateurs & Profils
1. Dans Glide, allez dans la table **`Users`** (sélectionnez la table Airtable **`Livreurs`**).
2. Allez dans **Settings > User Profiles** :
   - **Name :** Colonne `{Nom}`
   - **Email :** Colonne `{Email}`
   - **Image/Avatar :** Colonne `{Photo}` (optionnelle)
   - **Role :** Colonne `{Rôle}` (`Gestionnaire` ou `Livreur`)
   - **Company :** Colonne `{Entreprise}`
3. **Sécurité (Privacy) :**
   - Activez **Public with Email** ou **Users in User Table** pour restreindre l'accès uniquement aux emails listés dans la table `Livreurs`.

---

### Étape 2 : Écrans du Gestionnaire (Visibles uniquement si `User > Rôle = Gestionnaire`)

#### Onglet 1 : « Aujourd'hui » (Vue Opérationnelle)
* **Composant principal :** `Collection` (Style : *List* ou *Cards*).
* **Source de données :** Table `Livraisons`.
* **Filtres de la collection :**
  - `{Entreprise}` = `User > Entreprise` (Empêche un gérant de voir les colis d'une autre société).
  - Tri : `{Créée le}` du plus récent au plus ancien.
* **Affichage de la carte :**
  - **Titre :** `{Référence}` - `{Client}`
  - **Sous-titre :** `{Livreur}` • `{Colis}`
  - **Détail / Badge :** `{Statut}` (Couleur dynamique : Vert si Livré, Bleu si En route, Rouge si Échec).
* **Bouton d'en-tête (Floating Action Button ou Titre) : « Nouvelle Livraison »**
  - Action : `Show Form Screen` vers table `Livraisons`.
  - **Champs du formulaire :**
    - Client (Text entry)
    - Tel client (Phone entry)
    - Adresse (Text entry)
    - Repère Dakar (Text entry) — *Indispensable !*
    - Colis (Text entry)
    - À encaisser (Number entry)
    - Livreur (Choice entry filtré sur `Rôle = Livreur` et `Entreprise = User > Entreprise`)
  - **Champs masqués (Columns Values auto) :**
    - `{Entreprise}` = `User > Entreprise`
    - `{Statut}` = `À livrer`
    - `{Créée le}` = `Current Date/Time`

#### Onglet 2 : « Récap Caisse » (Clôture de 19h00)
* **Composant principal :** `Collection` (Style : *Grid* ou *Table*).
* **Source de données :** Table `Livreurs`.
* **Filtre :** `{Entreprise}` = `User > Entreprise` ET `{Rôle}` = `Livreur` ET `{Actif}` = `true`.
* **Composants dans la fiche détaillée de chaque livreur :**
  1. **Bloc Chiffres Clés (Big Numbers) :**
     - Total Livrées : `{Livrées du jour}`
     - Total Échecs : `{Échecs du jour}`
     - Total Espèces à verser : `{Encaissé du jour}` FCFA
  2. **Indicateur d'Alerte Écart de Caisse :**
     - Composant `Text` ou `Callout` affichant `{Écart du jour}` FCFA.
     - **Condition de visibilité :** Visible si `{Écart du jour}` est différent de `0`.
     - Couleur de l'alerte : Rouge vif avec texte : *« Attention : Écart de caisse détecté ! Vérifier les reçus. »*
  3. **Collection imbriquée :** Liste des livraisons du jour assignées à ce livreur (`Livraisons` filtrées sur `{Livreur} = ce livreur` et `{Fait aujourd'hui} = 1`).

---

### Étape 3 : Écrans du Livreur (Visibles uniquement si `User > Rôle = Livreur`)

#### Onglet : « Mes Livraisons du Jour »
* **Source :** Table `Livraisons`.
* **Filtre strict :** `{Livreur}` = `User > Nom` ET `{À faire}` = `1`.
* **Écran de détail de la livraison (Action au clic) :**
  1. **Carte d'informations client :**
     - Nom du client, Adresse et Repère précis à Dakar.
     - Montant à encaisser : `{À encaisser}` FCFA.
  2. **Boutons de contact direct :**
     - Bouton **« Appeler le client »** : Action `Open URL` -> `tel:{Tel client}`.
     - Bouton **« WhatsApp »** : Action `Open URL` -> `{Lien WhatsApp}` (ouvre WhatsApp avec le message pré-rempli).
  3. **Boutons d'action statut (Workflow Livreur) :**
     - **Bouton 1 : « 🛵 J'y vais (En route) »**
       - Condition de visibilité : `{Statut}` = `À livrer`.
       - Action : `Set Column Values` -> `{Statut}` = `En route`.
     - **Bouton 2 : « ✅ Colis Livré »**
       - Condition de visibilité : `{Statut}` = `En route`.
       - Action : `Show Form Screen` (ou Custom Action) demandant :
         1. Photo de preuve (Image Picker -> colonne `{Preuve}`)
         2. Montant encaissé (Number entry -> colonne `{Encaissé}`)
         3. Mode de règlement (Choice : Espèces, Wave, Orange Money)
       - À l'envoi : Met `{Statut}` = `Livré` et `{Traitée le}` = `Current Date/Time`.
     - **Bouton 3 : « ❌ Signaler un Échec »**
       - Condition de visibilité : `{Statut}` = `En route`.
       - Action : `Show Form Screen` demandant :
         1. Motif d'échec (Choice : Client absent, Adresse introuvable, Refus du client, Autre).
       - À l'envoi : Met `{Statut}` = `Échec` et `{Traitée le}` = `Current Date/Time`.

---

## 🌐 APPLICATION 2 : `LivraTrack Suivi Client` (Publique)

### Étape 1 : Paramétrage de Confidentialité
* **Settings > Privacy :** `Public` (Aucune connexion requise, aucun email demandé).
* **Données visibles :** Seule la table `Livraisons` est reliée.
* ⚠️ **Règle de sécurité critique :** Ne JAMAIS afficher les colonnes `{Tel client}`, `{Encaissé}`, `{À encaisser}` ou `{Marge}` sur cette application publique.

### Étape 2 : Écran de Recherche & Affichage
1. **Composant de saisie :**
   - Ajoutez une colonne spécifique utilisateur (`User-specific column`) nommée `RechercheCode` dans Glide.
   - Ajoutez un champ de saisie `Text Entry` pointant vers `RechercheCode` avec le placeholder : *« Entrez votre code (ex : LIV-101) »*.
2. **Affichage du résultat :**
   - Composant `Container` filtré sur : `{Référence}` = `RechercheCode` (ou `{Code suivi}` = `RechercheCode`).
   - Affichez :
     - Statut en badge clair (`Commande enregistrée`, `Votre livreur est en route`, `Colis livré`).
     - Message dynamique `{Message client}`.
     - Prénom du coursier assigné (ex : Moussa) et bouton d'appel/WhatsApp direct.
     - Photo de preuve déposée dès que le statut passe à `Livré`.

---

## 🛡️ Résolution des 5 Pièges Fréquents sur Glide

| Problème classique sur Glide | Cause | Solution chirurgicale LivraTrack |
| :--- | :--- | :--- |
| **1. Un livreur voit les livraisons des autres** | Mauvais filtre ou Row Owner absent | Filtrer la collection sur `Livreur = User > Nom` et activer le rôle `Livreur`. |
| **2. Le lien WhatsApp n'ouvre pas le bon texte** | Caractères spéciaux non encodés | Utiliser la formule Airtable avec `ENCODE_URL_COMPONENT()`. |
| **3. L'heure de livraison est décalée de 1h ou 2h** | Fuseau horaire non GMT | Régler Airtable et Glide sur le fuseau horaire `GMT (Dakar / Casablanca)`. |
| **4. Le client voit les montants d'argent sur le lien de suivi** | Colonnes non masquées dans l'app publique | Supprimer les composants de prix de l'écran public de suivi. |
| **5. L'écart de caisse ne se met pas à jour en direct** | Rollup Airtable non rafraîchi | Utiliser une colonne de calcul mathématique directement dans Glide (`Math Column : Encaissé - Attendu`). |
