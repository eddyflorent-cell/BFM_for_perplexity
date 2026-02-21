# 🍔 BusinessFood Manager

**Application web de gestion complète pour restaurants, bars, salons de thé et food trucks.**

Gérez vos ingrédients, recettes, coûts, productions, ventes et analysez votre rentabilité en temps réel.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.txt)
[![Version](https://img.shields.io/badge/version-1.2.1-blue.svg)](CHANGELOG.md)

---

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Démo rapide](#-démo-rapide)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Architecture](#-architecture)
- [Concepts clés](#-concepts-clés)
- [Contribuer](#-contribuer)
- [License](#-license)

---

## ✨ Fonctionnalités

### 📦 Gestion des stocks
- **Ingrédients** : Suivi multi-lots avec FIFO automatique
- **DLC** : Alertes de péremption et gestion des pertes
- **Rendement** : Prise en compte des pertes (épluchage, découpe, cuisson)
- **Multi-devises** : Support EUR, USD, GBP, CHF, MAD
- **Fournisseurs** : Traçabilité complète (numéro de lot, date de réception)

### 📋 Recettes & production
- **Création de recettes** : Ingrédients, instructions, temps de préparation
- **Calcul de coûts** : Coût direct + overhead (charges fixes)
- **Capacité de production** : Combien de fois fabricable avec le stock actuel
- **FIFO production** : Déduction automatique des lots les plus anciens
- **Traçabilité** : Historique complet (ingrédients utilisés, coûts réels)

### 💰 Rentabilité
- **Analyse de marge** : Calcul automatique sur chaque produit
- **Classification** : 🔴 Perte | 🟡 Faible marge | ⚪ Correct | 🟢 Excellent
- **Prix suggérés** : Recommandations pour 30%, 50%, 60% de marge
- **Simulateur de prix** : Testez différents scénarios en temps réel

### 🎁 Packs & menus
- **Création de packs** : Combinez plusieurs recettes
- **Calcul de coût** : Agrégation automatique des coûts unitaires
- **Gestion des ventes** : Suivi des ventes par pack

### 📊 Dashboard & rapports
- **KPI temps réel** : Stock total, recettes actives, ventes du jour
- **Graphiques** : Évolution des ventes, top produits, pertes
- **Exports** : PDF, Excel, CSV

### 🔧 Paramètres avancés
- **Overhead (charges fixes)** : Coefficient global appliqué à tous les coûts
- **Mode admin** : Masquage des modules avancés pour utilisateurs simples
- **Multi-langue** : Interface en français (autres langues à venir)

---

## 🚀 Démo rapide

### Option 1 : Démo en ligne (recommandé)

[**👉 Essayer la démo**](https://votre-github-pages.github.io/businessfood-manager)

Chargez une démo préconfigurée :
- **Le Salon Gourmand** : Salon de thé avec gaufres, nectars, smoothies
- **Le Velvet Bar Lounge** : Bar à cocktails avec 8 recettes signature

### Option 2 : Démo locale

```bash
# Cloner le repo
git clone https://github.com/votre-username/businessfood-manager.git
cd businessfood-manager

# Lancer un serveur local
python3 -m http.server 8000

# Ouvrir dans le navigateur
open http://localhost:8000
```

Ensuite, cliquez sur **"Charger une démo"** dans le menu.

---

## 📥 Installation

### Prérequis

- **Navigateur moderne** : Chrome, Firefox, Safari, Edge (version récente)
- **Serveur HTTP** : Pour servir les fichiers (Python, Node.js, ou tout autre)

### Méthode 1 : Architecture modulaire (développement)

```bash
# Cloner le repository
git clone https://github.com/votre-username/businessfood-manager.git
cd businessfood-manager

# Lancer le serveur
python3 -m http.server 8000

# Ouvrir http://localhost:8000
```

**Structure :**
```
businessfood-manager/
├── index.html              # Shell HTML minimal
├── app.js                  # Point d'entrée principal
├── src/
│   ├── core/
│   │   ├── models/         # Ingredient, Recipe, Production
│   │   ├── services/       # RecipeService, ProfitabilityService
│   │   └── utils/          # Helpers (conversions, UUID, etc.)
│   ├── demo-bar-lounge.js  # Données de démo bar
│   └── demo-we-salon.js    # Données de démo salon
├── bfm/                    # Assets (images, icons)
└── docs/                   # Documentation
```

### Méthode 2 : Bundle standalone (production)

```bash
# Installer esbuild
npm install -g esbuild

# Build du bundle
npm run build

# Le bundle est dans dist/
# Double-clic sur dist/index.html fonctionne !
```

---

## 🎯 Utilisation

### 1️⃣ Premier lancement

Au premier démarrage, l'app est vide. Vous pouvez :

**Option A : Charger une démo**
- Cliquez sur le menu hamburger **☰**
- Choisissez **"Charger une démo"**
- Sélectionnez "Le Salon Gourmand" ou "Le Velvet Bar Lounge"

**Option B : Créer vos données**
1. Allez dans **📦 Ingrédients**
2. Créez vos ingrédients (ex: Farine T45, Lait, Œufs)
3. Allez dans **📋 Recettes**
4. Créez votre première recette

### 2️⃣ Créer une recette

1. **📋 Recettes** → **+ Nouvelle recette**
2. Remplissez :
   - Nom : "Crêpe nature"
   - Catégorie : "Desserts"
   - Rendement : 10 pièces
   - Prix de vente : 3.50€
3. Ajoutez les ingrédients :
   - Farine T45 : 250g
   - Lait : 500ml
   - Œufs : 3 pièces
4. **Enregistrer**

→ Le coût est calculé automatiquement !

### 3️⃣ Comprendre les coûts

**Coût direct** = Somme des ingrédients uniquement
```
Farine (0.80€) + Lait (0.60€) + Œufs (0.90€) = 2.30€
```

**Overhead (coefficient de charges)** = Charges fixes intégrées
```
Coût complet = Coût direct × 1.40 = 2.30€ × 1.40 = 3.22€
```

**Marge** = (Prix vente - Coût complet) / Prix vente
```
Marge = (3.50€ - 3.22€) / 3.50€ = 8% 🟡 Faible marge
```

### 4️⃣ Analyser la rentabilité

1. **📊 Rentabilité**
2. Visualisez tous vos produits avec :
   - 🔴 Produits à perte
   - 🟡 Marges faibles
   - 🟢 Produits rentables
3. Utilisez le **simulateur de prix** pour tester différents scénarios

---

## 🏗️ Architecture

### Stack technique

- **Frontend** : Vanilla JavaScript (ES6+)
- **UI** : HTML5 + CSS3 (variables CSS natives)
- **Storage** : LocalStorage (données persistantes côté client)
- **Bundler** : esbuild (optionnel, pour production)

### Pattern : Service-Oriented

```javascript
// Exemple : Calculer le coût d'une recette
import { RecipeService } from './src/core/services/RecipeService.js';

const cost = RecipeService.calculateCost(recipe, ingredients, settings);
// → { totalCost: 2.30, costPerUnit: 0.23, ingredients: [...] }
```

**Services disponibles :**
- `IngredientService` : Gestion stock, FIFO, déduction
- `RecipeService` : Coûts, capacité, production
- `ProfitabilityService` : Analyse rentabilité, recommandations
- `SaleService` : Gestion ventes, COGS
- `DashboardService` : KPI, statistiques

### Modèles de données

**Ingredient**
```javascript
{
  id: "ing_farine_t45",
  name: "Farine de blé T45",
  category: "Farines",
  baseUnit: "g",
  displayUnit: "kg",
  yieldPercent: 100,  // Rendement (100% = pas de perte)
  lots: [
    {
      id: "lot_001",
      quantiteInitiale: 5000,
      quantite: 3200,  // Stock restant
      prixTotal: 8.50,
      dlc: "2026-06-30",
      fournisseur: "Metro",
      numeroLot: "FAR-2026-001"
    }
  ]
}
```

**Recipe**
```javascript
{
  id: "rec_crepe",
  name: "Crêpe nature",
  category: "Desserts",
  producedQty: 10,
  producedUnit: "pièce",
  sellingPrice: 3.50,
  ingredients: [
    { ingredientId: "ing_farine_t45", quantity: 250, unit: "g", baseQty: 250 },
    { ingredientId: "ing_lait", quantity: 500, unit: "ml", baseQty: 500 }
  ]
}
```

---

## 💡 Concepts clés

### FIFO (First In, First Out)

**Principe :** Utiliser les lots les plus anciens en premier.

**Exemple :**
```
Stock champagne :
- Lot A (reçu 15/01) : 2000ml restants
- Lot B (reçu 20/01) : 3000ml restants

Production de 10 Kir Royal (120ml chacun = 1200ml total) :
→ Utilise 1200ml du Lot A (le plus ancien)
→ Lot A = 800ml | Lot B = 3000ml (intact)
```

### Rendement (Yield)

**Principe :** Prise en compte des pertes lors de la préparation.

**Exemple :**
```
Fraises fraîches : yieldPercent = 95%
→ 5% de perte (queues retirées)

Recette demande 100g de fraises :
→ Coût calculé = 100g / 0.95 = 105.26g
→ On doit acheter plus pour compenser la perte
```

### Overhead (Charges fixes)

**Principe :** Intégrer les charges fixes dans le coût de production.

**Charges typiques :**
- Loyer, électricité, eau
- Salaires (personnel fixe)
- Assurances, licences
- Amortissement du matériel

**Coefficient recommandé :** 1.30 à 1.50 (soit 30% à 50% de charges)

**Exemple :**
```
Coût direct = 10€
Overhead = 1.40
→ Coût complet = 10€ × 1.40 = 14€

Prix vente = 20€
→ Marge = (20 - 14) / 20 = 30%
```

---

## 🔐 Mode Admin

Certaines fonctionnalités peuvent être masquées pour simplifier l'interface.

**Modules masquables :**
- 💰 Ventes
- 💸 Dépenses
- 🏢 Fournisseurs
- 👥 Personnel
- 👤 Clients

**Activer le mode admin :**

**Option 1 : URL**
```
http://localhost:8000?admin=1
```

**Option 2 : Console**
```javascript
localStorage.setItem('BFM_ADMIN', '1');
location.reload();
```

**Désactiver :**
```javascript
localStorage.removeItem('BFM_ADMIN');
location.reload();
```

---

## 🛠️ Développement

### Lancer en dev

```bash
# Cloner le repo
git clone https://github.com/votre-username/businessfood-manager.git
cd businessfood-manager

# Lancer serveur avec watch (optionnel)
npm run dev

# Ou simplement
python3 -m http.server 8000
```

### Build pour production

```bash
# Build bundle standalone
npm run build

# Résultat dans dist/
# - dist/index.html
# - dist/app.bundle.js
```

### Structure des commits

```
feat: Ajouter simulateur de prix
fix: Corriger calcul overhead dans ProfitabilityService
docs: Mettre à jour README avec exemples
refactor: Extraire CostEngine dans service dédié
```

---

## 🐛 Bugs connus & solutions

### "formatMoney is not defined"

**Solution :** Vider le cache localStorage
```javascript
localStorage.clear();
location.reload();
```

### Modal de détails ne s'affiche pas

**Cause :** Erreur JavaScript qui bloque l'exécution

**Solution :** Ouvrir la console (F12) et vérifier les erreurs

### Coûts à 0€ dans Rentabilité

**Cause :** Settings manquants (overheadCoefficient)

**Solution :** Aller dans **⚙️ Paramètres** → Définir le coefficient à 1.40

### Import ES6 ne fonctionne pas

**Cause :** Fichiers ouverts en `file://` au lieu de `http://`

**Solution :** Utiliser un serveur HTTP local

---

## 🤝 Contribuer

Les contributions sont les bienvenues !

### Comment contribuer

1. **Fork** le repository
2. Créez une **branche** : `git checkout -b feature/ma-fonctionnalite`
3. **Committez** : `git commit -am 'feat: Ajouter X'`
4. **Push** : `git push origin feature/ma-fonctionnalite`
5. Ouvrez une **Pull Request**

### Idées de contributions

- [ ] Export Excel avancé (multi-onglets)
- [ ] Impression de fiches recettes
- [ ] API backend (optionnelle)
- [ ] Application mobile (React Native / Flutter)
- [ ] Système de backup automatique
- [ ] Multi-utilisateurs avec authentification
- [ ] Intégration caisse enregistreuse

---

## 📄 License

Ce projet est sous licence **MIT**.

Voir le fichier [LICENSE.txt](LICENSE.txt) pour plus de détails.

---

## 👨‍💻 Auteur

**Développé avec ❤️ pour les restaurateurs et entrepreneurs de la Food.**

---

## 🙏 Remerciements

- **Claude (Anthropic)** : Assistant IA ayant aidé au développement
- **Communauté open-source** : Inspiration et outils
- **Testeurs beta** : Retours précieux

---

## 📞 Support

- **Issues GitHub** : [Ouvrir un ticket](https://github.com/votre-username/businessfood-manager/issues)
- **Documentation** : [Wiki](https://github.com/votre-username/businessfood-manager/wiki)
- **Email** : support@businessfood.app

---

**⭐ Si ce projet vous aide, n'hésitez pas à lui donner une étoile !**
