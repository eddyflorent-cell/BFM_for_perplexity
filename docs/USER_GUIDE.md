# 👤 GUIDE UTILISATEUR - BusinessFood Manager

**Version** : 55.6-POLISH  
**Public** : Restaurateurs, traiteurs, professionnels food

---

## 🚀 DÉMARRAGE RAPIDE

### Première utilisation (5 min)

#### 1. Ouvrir l'application
- Double-cliquer sur `index.html`
- OU serveur local : `python3 -m http.server 8000`

#### 2. Charger une démo
**Option A : Restaurant pâtisserie**
- Cliquer **"🧇 Démo Salon"**
- Confirmer → 29 ingrédients, 12 recettes chargées

**Option B : Bar à cocktails**
- Cliquer **"🍹 Démo Bar"**
- Confirmer → 29 ingrédients, 8 recettes cocktails

#### 3. Explorer
- **Dashboard** → Vue d'ensemble
- **Ingrédients** → Stocks, alertes DLC
- **Recettes** → Fiches techniques
- **Rentabilité** → Analyse marges

---

## 📦 MODULE INGRÉDIENTS

### Ajouter un ingrédient

1. **Ingrédients** → **"+ Nouvel ingrédient"**
2. Remplir :
   - Nom (ex: Farine T45)
   - Catégorie (Farines)
   - Unité de base (g ou ml)
   - Prix unitaire (€/g ou €/ml)
3. **Sauvegarder**

### Ajouter un lot

1. Cliquer **"+ Ajouter lot"** sur un ingrédient
2. Remplir :
   - Quantité (ex: 10000 g = 10 kg)
   - DLC (Date Limite Consommation)
   - Prix total lot
3. **Enregistrer**

### Gérer les alertes

- **Stock faible** → Badge rouge sur ingrédient
- **DLC proche** → Alerte automatique
- Page **🔔 Alertes** → Voir toutes les alertes

---

## 📋 MODULE RECETTES

### Créer une recette

1. **Recettes** → **"+ Nouvelle recette"**
2. Remplir :
   - Nom (ex: Gaufres au Chocolat)
   - Catégorie
   - Rendement (50 pièces)
   - Prix de vente unitaire (1.00 €)

### Ajouter ingrédients

1. Dans la recette → **"+ Ingrédient"**
2. Choisir ingrédient dans liste
3. Quantité (ex: 1000 g)
4. **Ajouter**

**Le coût est calculé automatiquement !**

### Voir la rentabilité

- **Marge %** affichée sur la carte
- Indicateurs :
  - 🟢 Excellent (≥50%)
  - 🟡 Correct (25-50%)
  - 🔴 Faible (<25%)
  - ⚫ Perte (<0%)

---

## 🎁 MODULE PACKS

### Créer un pack

1. **Packs** → **"+ Créer Pack"**
2. Nom (ex: Menu Duo)
3. Prix global (15.00 €)
4. Ajouter produits :
   - Recette 1 × quantité
   - Recette 2 × quantité
5. **Enregistrer**

**La rentabilité du pack est calculée automatiquement !**

---

## ⚙️ MODULE PRODUCTION

### Lancer une production

1. **Production** → **"⚙️ Nouvelle production"**
2. Choisir recette
3. Quantité à produire
4. **Produire**

**Effet** :
- ✅ Stock produit fini créé
- ❌ Stock ingrédients consommé
- 💰 Coût unitaire calculé

---

## 📊 MODULE RENTABILITÉ

### Analyser les marges

1. **Rentabilité** → Vue globale
2. KPIs affichés :
   - Produits analysés
   - Marge moyenne
   - Répartition (Excellent/Correct/Faible/Perte)

3. **Tableau détaillé** :
   - Produits triés par marge
   - Recommandations automatiques

### Export rapport PDF

- **📤 Export PDF** → Rapport professionnel imprimable

---

## 🔔 MODULE ALERTES

### Consulter les alertes

1. **🔔 Alertes** → Dashboard
2. KPIs :
   - Critiques
   - Warnings
   - Stock low
   - DLC near

### Filtres

- **All** - Toutes
- **Stock** - Stocks uniquement
- **DLC** - DLC uniquement

### Actions rapides

- **➕** sur alerte stock → Ajouter lot
- **🗑️** sur alerte DLC → Marquer lot périmé

---

## 📤 EXPORT PDF

### Types disponibles

#### 1. Inventaire Stock
**Page** : Ingrédients → **"📤 Export PDF"**

**Contenu** :
- Liste tous ingrédients
- Stock actuel
- Valorisation €
- Statuts DLC

#### 2. Fiche Recette
**Page** : Recettes → Sur une carte → **"📤"**

**Contenu** :
- Ingrédients + quantités
- Coûts détaillés
- Marge rentabilité
- Instructions

**Usage** : Affichage cuisine, classeur recettes

#### 3. Rapport Rentabilité
**Page** : Rentabilité → **"📤 Export PDF"**

**Contenu** :
- Synthèse globale
- Répartition par statut
- Tableau tous produits
- Classement par marge

#### 4. Bilan Valorisation
**Page** : Dashboard → **"📤 Export Bilan"**

**Contenu** :
- Valeur totale stock
- Top 10 ingrédients
- Détail valorisation

---

## ⌨️ RACCOURCIS CLAVIER

| Raccourci | Action |
|-----------|--------|
| **Ctrl/Cmd + S** | Sauvegarder + indicateur visuel |
| **Esc** | Fermer modal ouverte |
| **Ctrl/Cmd + F** | Focus barre recherche |

Compatible Windows (Ctrl), Mac (Cmd), Linux (Ctrl).

---

## ⚙️ PARAMÈTRES

### Taux de change

**Accès** : Paramètres → Taux de change

**Configurer** :
- USD → EUR
- GBP → EUR

**Usage** : Lots achetés en devises étrangères

### Coefficient dépenses fixes

**Accès** : Paramètres → Coefficient

**Défaut** : 1.40 (40% overhead)

**Usage** : Intégrer charges fixes (loyer, salaires) dans coûts

### Gestion stockage

**Accès** : Paramètres → Stockage

**Actions** :
- Voir quota utilisé
- Nettoyer cache
- Exporter données
- Réinitialiser

---

## 💾 SAUVEGARDE & EXPORT

### Auto-save

✅ Automatique à chaque modification  
✅ Indicateur visuel (Ctrl+S)

### Export manuel

1. **Paramètres** → **"📥 Exporter les données"**
2. Fichier JSON téléchargé
3. **Conserver ce fichier** = backup complet

### Import données

1. **Paramètres** → **"📤 Importer les données"**
2. Sélectionner fichier JSON
3. Confirmer écrasement
4. Rechargement automatique

---

## ❓ FAQ

### Q: Mes données sont-elles perdues au rechargement ?
**R:** Non, stockées dans localStorage du navigateur. SAUF si cache vidé.

### Q: Comment sauvegarder mes données ?
**R:** Paramètres → Exporter données (fichier JSON). Backup mensuel recommandé.

### Q: Le PDF est vide, pourquoi ?
**R:** Vérifier que les recettes ont des **prix de vente > 0**.

### Q: Comment calculer marge ?
**R:** Automatique ! Marge = (Prix - Coût) / Prix × 100

### Q: Stock négatif, normal ?
**R:** Non. Ajouter des lots avant de produire.

### Q: DLC passée, que faire ?
**R:** Alertes → 🗑️ Marquer lot périmé → Stock déduit

### Q: Import CSV ingrédients ?
**R:** Ingrédients → 📥 Import CSV → Suivre template

### Q: Changer devise ?
**R:** Paramètres → Taux de change → Configurer conversions

---

## 🐛 PROBLÈMES COURANTS

### Données disparues
**Cause** : Cache navigateur vidé  
**Solution** : Importer backup JSON

### localStorage plein
**Cause** : Trop de données  
**Solution** : Nettoyer cache OU Supprimer anciennes productions

### Calculs incorrects
**Cause** : Unités incohérentes (g vs kg)  
**Solution** : Vérifier unités de base ingrédients

### Export PDF ne marche pas
**Cause** : Bloqueur popup  
**Solution** : Autoriser téléchargements depuis le site

---

## 📞 SUPPORT

**Problème non résolu ?**
- Consulter CHANGELOG.md
- Vérifier console navigateur (F12)
- Contacter développeur

---

**Guide mis à jour** : Février 2026  
**Version app** : 55.6-POLISH
