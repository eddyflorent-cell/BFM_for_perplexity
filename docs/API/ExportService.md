# 📤 ExportService - Documentation API

**Fichier** : `/src/core/services/ExportService.js`  
**Version** : 55.6-POLISH  
**Lignes** : ~750

---

## 📖 Description

Service d'export PDF professionnel pour BusinessFood Manager. Génère 4 types de rapports imprimables avec texte sélectionnable (pas capture écran).

**Dépendances :**
- jsPDF 2.5.1
- jspdf-autotable 3.5.31

---

## 🎯 Méthodes publiques

### `exportInventory(ingredients, settings)`

Exporte l'inventaire complet des ingrédients en stock.

**Paramètres :**
```javascript
ingredients: Array<Ingredient>
settings: {
  businessName?: string  // Nom entreprise (optionnel)
}
```

**Retour :**
```javascript
Promise<void>  // PDF téléchargé automatiquement
```

**Contenu PDF :**
- En-tête avec nom entreprise + date
- Liste tous ingrédients avec :
  - Nom
  - Catégorie
  - Stock actuel
  - Unité
  - Valeur stock (€)
  - Statut stock (OK / FAIBLE / CRITIQUE / ÉPUISÉ)
  - Statut DLC (OK / PROCHE / URGENT / PÉRIMÉ)
- Pied de page : Résumé (total ingrédients, valeur totale, alertes critiques)

**Nom fichier :** `Inventaire_Stock_YYYY-MM-DD.pdf`

**Exemple :**
```javascript
await ExportService.exportInventory(
  appState.data.ingredients,
  { businessName: 'Le Salon Gourmand' }
);
```

---

### `exportRecipe(recipe, ingredients, settings)`

Exporte la fiche technique d'une recette.

**Paramètres :**
```javascript
recipe: Recipe
ingredients: Array<Ingredient>
settings: Object
```

**Contenu PDF :**
- Titre recette + rendement
- Informations générales :
  - Catégorie
  - Temps préparation
  - Rendement (quantité + unité)
- Tableau ingrédients :
  - Nom
  - Quantité
  - Unité
  - Coût unitaire
  - Coût total
- Analyse financière :
  - Coût total
  - Coût unitaire
  - Prix vente
  - Marge %
  - Indicateur visuel (⚠ Perte / ✓ Rentable)
- Instructions préparation (si définies)

**Nom fichier :** `Fiche_{RecipeName}_YYYY-MM-DD.pdf`

**Exemple :**
```javascript
const recipe = appState.data.recipes.find(r => r.id === 'rec_123');
await ExportService.exportRecipe(
  recipe,
  appState.data.ingredients,
  settings
);
```

---

### `exportProfitabilityReport(recipes, packs, ingredients, settings)`

Exporte le rapport de rentabilité complet.

**Paramètres :**
```javascript
recipes: Array<Recipe>
packs: Array<Pack>
ingredients: Array<Ingredient>
settings: Object
```

**Contenu PDF :**
- Synthèse globale :
  - Produits analysés
  - Produits avec prix
  - Marge moyenne
- Répartition par rentabilité :
  - Excellents (>=50%)
  - Corrects (25-50%)
  - Faibles (<25%)
  - En perte (<0%)
- Tableau détaillé :
  - Produit
  - Type (Recette / Pack)
  - Coût
  - Prix
  - Marge %
  - Statut
- Tri par marge décroissante

**Nom fichier :** `Rapport_Rentabilite_YYYY-MM-DD.pdf`

**Calculs :**
```javascript
// Coût recette = Somme (qté × prix unitaire ingrédient) / producedQty
// Coût pack = Somme (coût recette × quantité)
// Marge % = (prix - coût) / prix × 100
```

**Exemple :**
```javascript
await ExportService.exportProfitabilityReport(
  appState.data.recipes,
  appState.data.packs,
  appState.data.ingredients,
  settings
);
```

---

### `exportStockValuation(ingredients, productions, settings)`

Exporte le bilan de valorisation du stock.

**Paramètres :**
```javascript
ingredients: Array<Ingredient>
productions: Array<Production>
settings: Object
```

**Contenu PDF :**
- Valeur totale stock (affichage large)
- Répartition :
  - Ingrédients (valeur totale)
  - Produits finis (valeur totale)
- Top 10 ingrédients par valeur :
  - Nom
  - Stock
  - Prix unitaire
  - Valeur totale

**Nom fichier :** `Bilan_Valorisation_YYYY-MM-DD.pdf`

**Calculs :**
```javascript
// Valeur ingrédient = stock × prix unitaire
// Valeur produit fini = quantité × coût production unitaire
// Valeur totale = Somme toutes valeurs
```

**Exemple :**
```javascript
await ExportService.exportStockValuation(
  appState.data.ingredients,
  appState.data.productions,
  settings
);
```

---

## 🛠️ Méthodes utilitaires

### `createPDF()`

Crée instance jsPDF avec configuration standard.

**Retour :**
```javascript
jsPDF  // Instance configurée (A4, portrait, mm)
```

---

### `addHeader(doc, title, subtitle, settings)`

Ajoute en-tête standardisé au PDF.

**Paramètres :**
```javascript
doc: jsPDF
title: string           // Ex: "RAPPORT RENTABILITÉ"
subtitle: string        // Ex: "Période : février 2026"
settings: { businessName?: string }
```

**Rendu :**
```
[Logo] Nom Entreprise                        [Date]

TITRE
Subtitle
─────────────────────────────────────────────────────
```

---

### `addFooter(doc, pageNumber, totalPages)`

Ajoute pied de page avec numérotation.

**Paramètres :**
```javascript
doc: jsPDF
pageNumber: number
totalPages: number
```

**Rendu :**
```
─────────────────────────────────────────────────────
BusinessFood Manager - Page X / Y - JJ/MM/AAAA
```

---

### `formatCurrency(value)`

Formate valeur en euros.

**Paramètres :**
```javascript
value: number
```

**Retour :**
```javascript
string  // Ex: "12.50 €"
```

---

## 📊 Utilisation dans l'app

### 1. Export depuis page Ingrédients

```javascript
async function exportInventoryPDF() {
  showToast('Génération PDF en cours...', 'info');
  
  try {
    await ExportService.exportInventory(
      appState.data.ingredients,
      appState.data.settings
    );
    showToast('✓ PDF exporté avec succès', 'success');
  } catch (error) {
    console.error('Export error:', error);
    showToast('✗ Erreur lors de l\'export', 'error');
  }
}
```

### 2. Export fiche recette depuis carte

```javascript
async function exportRecipePDF(recipeId) {
  const recipe = appState.data.recipes.find(r => r.id === recipeId);
  if (!recipe) return;
  
  await ExportService.exportRecipe(
    recipe,
    appState.data.ingredients,
    appState.data.settings
  );
}
```

### 3. Export rapport depuis Rentabilité

```javascript
async function exportProfitabilityPDF() {
  await ExportService.exportProfitabilityReport(
    appState.data.recipes,
    appState.data.packs,
    appState.data.ingredients,
    appState.data.settings
  );
}
```

---

## 🎨 Personnalisation

### Couleurs

```javascript
// En-tête tableau
headStyles: { 
  fillColor: [255, 107, 53],  // Orange #FF6B35
  textColor: [255, 255, 255]   // Blanc
}

// Lignes alternées
alternateRowStyles: { 
  fillColor: [245, 245, 245]   // Gris clair
}
```

### Police

```javascript
doc.setFont('helvetica', 'normal');  // Défaut
doc.setFont(undefined, 'bold');      // Gras
doc.setFontSize(12);                  // Taille
```

---

## ⚠️ Limitations connues

### 1. PDF vide si pas de prix
Si recettes n'ont pas `sellingPrice > 0`, le tableau sera vide dans rapport rentabilité.

**Solution :** Vérifier prix avant export.

### 2. Caractères spéciaux
Certains caractères Unicode (≥, ©, etc.) peuvent mal s'afficher.

**Solution :** Utiliser équivalents ASCII (>=, (c), etc.)

### 3. Taille fichier
PDFs lourds si beaucoup de données.

**Solution :** Limiter à 100-200 lignes par tableau, sinon paginer.

---

## 🔍 Détails techniques

### Structure table autoTable

```javascript
doc.autoTable({
  startY: number,           // Position Y départ
  head: [[string, ...]],    // Headers
  body: [[string, ...]],    // Données
  theme: 'striped',         // Style table
  headStyles: {...},        // Styles headers
  alternateRowStyles: {...},// Styles lignes alternées
  margin: { top: number },  // Marges
  didDrawPage: (data) => {} // Callback pagination
});
```

### Pagination automatique

jsPDF-autoTable gère automatiquement :
- Saut de page si tableau trop long
- En-tête répété sur chaque page
- Numérotation pages

---

## 📋 Types de retour

Toutes les méthodes d'export retournent `Promise<void>`.

Le PDF est téléchargé automatiquement via :
```javascript
doc.save(filename);
```

---

## 🚀 Performance

- **Génération** : ~100-500ms selon taille
- **Limite recommandée** : 500 lignes max par tableau
- **Optimisation** : Pré-calculer données avant génération

---

## 🔧 Dépendances CDN

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>
```

---

**Documentation mise à jour** : Février 2026
