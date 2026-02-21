# 🔔 AlertService - Documentation API

**Fichier** : `/src/core/services/AlertService.js`  
**Version** : 55.6-POLISH  
**Lignes** : ~330

---

## 📖 Description

Service de gestion des alertes stock et DLC pour BusinessFood Manager. Analyse automatique des ingrédients et génération d'alertes selon critères configurables.

---

## 🎯 Méthodes publiques

### `checkStockAlerts(ingredients, settings)`

Analyse les alertes de stock pour tous les ingrédients.

**Paramètres :**
```javascript
ingredients: Array<Ingredient>  // Liste ingrédients
settings: {
  defaultStockThreshold: number  // Seuil stock défaut (ex: 1000)
}
```

**Retour :**
```javascript
Array<{
  id: string,              // ID unique alerte
  type: 'stock',           // Type alerte
  severity: string,        // 'critical' | 'warning' | 'low'
  ingredientId: string,    // ID ingrédient concerné
  ingredientName: string,  // Nom ingrédient
  message: string,         // Message descriptif
  currentStock: number,    // Stock actuel
  threshold: number,       // Seuil configuré
  timestamp: string        // ISO datetime
}>
```

**Logique :**
- `stock === 0` → **critical** (Stock épuisé)
- `stock > 0 && stock <= threshold * 0.5` → **critical** (Stock ≤ 50% seuil)
- `stock <= threshold` → **warning** (Stock ≤ seuil)
- Sinon → OK (pas d'alerte)

**Exemple :**
```javascript
const alerts = AlertService.checkStockAlerts(
  appState.data.ingredients,
  appState.data.settings
);

console.log(`${alerts.length} alertes stock détectées`);
```

---

### `checkDLCAlerts(ingredients, settings)`

Analyse les alertes DLC (Date Limite Consommation) pour tous les lots.

**Paramètres :**
```javascript
ingredients: Array<Ingredient>
settings: {
  dlcWarningDays: number,   // Jours avant alerte warning (ex: 7)
  dlcCriticalDays: number   // Jours avant alerte critique (ex: 3)
}
```

**Retour :**
```javascript
Array<{
  id: string,
  type: 'dlc',
  severity: string,        // 'expired' | 'critical' | 'warning'
  ingredientId: string,
  ingredientName: string,
  lotId: string,           // ID lot concerné
  message: string,
  dlc: string,             // Date DLC (ISO)
  daysRemaining: number,   // Jours restants
  quantity: number,        // Quantité lot
  timestamp: string
}>
```

**Logique :**
- DLC passée → **expired** (Périmé)
- DLC ≤ criticalDays → **critical** (Urgent)
- DLC ≤ warningDays → **warning** (Proche)
- Sinon → OK (pas d'alerte)

**Exemple :**
```javascript
const dlcAlerts = AlertService.checkDLCAlerts(
  appState.data.ingredients,
  appState.data.settings
);

const expired = dlcAlerts.filter(a => a.severity === 'expired');
console.log(`${expired.length} lots périmés`);
```

---

### `getAllAlerts(ingredients, settings)`

Retourne TOUTES les alertes (stock + DLC) combinées.

**Paramètres :**
```javascript
ingredients: Array<Ingredient>
settings: Object
```

**Retour :**
```javascript
Array<Alert>  // Fusion checkStockAlerts + checkDLCAlerts
```

**Exemple :**
```javascript
const allAlerts = AlertService.getAllAlerts(
  appState.data.ingredients,
  appState.data.settings
);

const critical = allAlerts.filter(a => 
  a.severity === 'critical' || a.severity === 'expired'
);
```

---

### `getAlertStats(alerts)`

Calcule statistiques sur un tableau d'alertes.

**Paramètres :**
```javascript
alerts: Array<Alert>  // Tableau alertes
```

**Retour :**
```javascript
{
  total: number,           // Total alertes
  critical: number,        // Alertes critiques + périmées
  warning: number,         // Alertes warning
  stockLow: number,        // Alertes stock uniquement
  dlcNear: number,         // Alertes DLC uniquement
  byType: {
    stock: number,
    dlc: number
  },
  bySeverity: {
    critical: number,
    expired: number,
    warning: number,
    low: number
  }
}
```

**Exemple :**
```javascript
const alerts = AlertService.getAllAlerts(...);
const stats = AlertService.getAlertStats(alerts);

console.log(`${stats.critical} alertes critiques`);
console.log(`${stats.stockLow} stocks faibles`);
```

---

### `filterAlerts(alerts, filterType)`

Filtre les alertes par type.

**Paramètres :**
```javascript
alerts: Array<Alert>
filterType: 'all' | 'stock' | 'dlc'
```

**Retour :**
```javascript
Array<Alert>  // Alertes filtrées
```

**Exemple :**
```javascript
const allAlerts = AlertService.getAllAlerts(...);
const stockOnly = AlertService.filterAlerts(allAlerts, 'stock');
const dlcOnly = AlertService.filterAlerts(allAlerts, 'dlc');
```

---

### `sortAlerts(alerts, sortBy = 'severity')`

Trie les alertes.

**Paramètres :**
```javascript
alerts: Array<Alert>
sortBy: 'severity' | 'date' | 'name'
```

**Ordre de priorité (severity) :**
1. expired (périmé)
2. critical (critique)
3. warning (avertissement)
4. low (faible)

**Exemple :**
```javascript
const sorted = AlertService.sortAlerts(alerts, 'severity');
// expired d'abord, puis critical, puis warning
```

---

## 📊 Cas d'usage

### 1. Dashboard KPIs

```javascript
const alerts = AlertService.getAllAlerts(ingredients, settings);
const stats = AlertService.getAlertStats(alerts);

// Afficher badges
document.getElementById('criticalCount').textContent = stats.critical;
document.getElementById('warningCount').textContent = stats.warning;
```

### 2. Page Alertes avec filtres

```javascript
let currentFilter = 'all';

function renderAlerts() {
  const alerts = AlertService.getAllAlerts(ingredients, settings);
  const filtered = AlertService.filterAlerts(alerts, currentFilter);
  const sorted = AlertService.sortAlerts(filtered, 'severity');
  
  // Afficher cartes alertes
  sorted.forEach(alert => displayAlertCard(alert));
}
```

### 3. Notifications navigateur

```javascript
const alerts = AlertService.getAllAlerts(ingredients, settings);
const critical = alerts.filter(a => 
  a.severity === 'critical' || a.severity === 'expired'
);

if (critical.length > 0 && Notification.permission === 'granted') {
  new Notification('Alertes critiques !', {
    body: `${critical.length} alertes nécessitent votre attention`,
    icon: '/icon.png'
  });
}
```

---

## ⚙️ Configuration

### Paramètres par défaut

```javascript
settings: {
  defaultStockThreshold: 1000,  // Unités de base (g ou ml)
  dlcWarningDays: 7,            // 1 semaine avant
  dlcCriticalDays: 3            // 3 jours avant
}
```

### Personnalisation

```javascript
// Réduire sensibilité stock
settings.defaultStockThreshold = 500;

// Alertes DLC plus tôt
settings.dlcWarningDays = 14;  // 2 semaines
settings.dlcCriticalDays = 5;   // 5 jours
```

---

## 🔍 Détails techniques

### Calcul jours restants DLC

```javascript
const now = new Date();
const dlcDate = new Date(lot.dlc);
const daysRemaining = Math.ceil(
  (dlcDate - now) / (1000 * 60 * 60 * 24)
);
```

### ID unique alerte

```javascript
const alertId = `${type}_${ingredientId}_${Date.now()}`;
// Exemple : "stock_ing_123_1708012345678"
```

### Exclusions

- Lots épuisés (`lot.epuise === true`) → Ignorés
- Ingrédients sans lots → Alerte stock si aucun lot trouvé

---

## 📋 Structure Alert

```typescript
interface Alert {
  id: string;                    // Unique ID
  type: 'stock' | 'dlc';         // Type
  severity: 'critical' | 'expired' | 'warning' | 'low';
  ingredientId: string;          // Ingrédient concerné
  ingredientName: string;
  lotId?: string;                // Si DLC
  message: string;               // Message lisible
  currentStock?: number;         // Si stock
  threshold?: number;            // Si stock
  dlc?: string;                  // Si DLC (ISO date)
  daysRemaining?: number;        // Si DLC
  quantity?: number;             // Si DLC (quantité lot)
  timestamp: string;             // ISO datetime création
}
```

---

## 🚀 Performance

- **Temps d'exécution** : O(n×m) où n = ingrédients, m = lots moyens
- **Optimisation** : Cache résultats si données inchangées
- **Recommandation** : Appeler uniquement au chargement page + après modifications

---

**Documentation mise à jour** : Février 2026
