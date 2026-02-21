# ❓ FAQ - Foire Aux Questions

**BusinessFood Manager v55.6-POLISH**

---

## 🚀 DÉMARRAGE

### Comment installer l'application ?
Aucune installation nécessaire. Double-cliquer sur `index.html` ou utiliser un serveur local.

### Faut-il une connexion Internet ?
Non. L'application fonctionne 100% hors ligne après premier chargement.

### Dois-je créer un compte ?
Non. Aucun compte, aucun serveur. Données stockées localement dans votre navigateur.

### Comment charger les données de démonstration ?
Cliquer sur **"🧇 Démo Salon"** ou **"🍹 Démo Bar"** sur le dashboard.

---

## 💾 DONNÉES & SAUVEGARDE

### Où sont stockées mes données ?
Dans le **localStorage** de votre navigateur (5-10 MB disponibles selon navigateur).

### Mes données sont-elles sécurisées ?
Oui, stockées localement sur VOTRE ordinateur. Jamais envoyées à un serveur.

### Que se passe-t-il si je vide le cache ?
⚠️ **TOUTES vos données sont perdues**. Exportez régulièrement (Paramètres → Exporter).

### À quelle fréquence dois-je sauvegarder ?
**Recommandé** : Export mensuel. **Critique** : Avant mise à jour navigateur ou OS.

### Comment transférer mes données sur un autre ordinateur ?
1. Ancien PC : Paramètres → Exporter données (fichier JSON)
2. Nouveau PC : Paramètres → Importer données → Sélectionner fichier

### Le fichier JSON est-il lisible ?
Oui, format texte. Éditable avec éditeur de texte (déconseillé sauf expert).

---

## 📦 INGRÉDIENTS

### Quelle est la différence entre "unité de base" et "unité d'achat" ?
- **Unité de base** : Unité de calcul (g ou ml)
- **Unité d'achat** : Unité du lot (kg, L, pièce)

**Exemple** : Farine → Base : g | Achat : sac 25 kg

### Comment gérer les conversions (kg → g, L → ml) ?
L'application gère automatiquement :
- 1 kg = 1000 g
- 1 L = 1000 ml
- 1 pièce = prix unitaire

### Puis-je avoir plusieurs lots du même ingrédient ?
✅ Oui ! Chaque lot a sa DLC et son prix. L'application utilise le lot le plus proche de péremption (FIFO).

### Comment marquer un lot périmé ?
Page Alertes → Cliquer 🗑️ sur l'alerte DLC → Lot marqué épuisé et déduit du stock.

### Stock négatif, est-ce grave ?
⚠️ Oui, indique erreur. Signifie production sans stock suffisant. Ajouter lots avant de produire.

---

## 📋 RECETTES

### Le coût n'est pas calculé, pourquoi ?
Vérifiez :
- Ingrédients ont des prix configurés
- Lots disponibles en stock
- Unités cohérentes

### Comment modifier une recette existante ?
Cliquer ✏️ sur la carte → Modifier → Sauvegarder.

### Puis-je dupliquer une recette ?
✅ Oui. Cliquer 📋 sur la carte → Recette dupliquée avec "(copie)" dans le nom.

### La marge est négative, que faire ?
🔴 **Perte** : Prix de vente < Coût. Actions :
- Augmenter prix de vente
- Réduire quantités ingrédients
- Trouver fournisseurs moins chers

### Comment ajouter des instructions de préparation ?
Dans le formulaire recette → Section "Instructions" → Décrire étapes.

---

## 🎁 PACKS

### C'est quoi un pack ?
Offre commerciale groupée (plusieurs recettes/produits vendus ensemble à prix global).

**Exemple** : Menu Duo = 2 plats + 1 dessert = 25€

### Le pack affiche "undefined", pourquoi ?
Bug corrigé en v55.6. Mettre à jour l'application.

### Puis-je mettre un pack dans un pack ?
❌ Non. Packs contiennent uniquement des recettes, pas d'autres packs.

---

## ⚙️ PRODUCTION

### Que se passe-t-il lors d'une production ?
1. ✅ Stock produit fini créé (recette × quantité)
2. ❌ Stock ingrédients consommé (FIFO - lots plus anciens d'abord)
3. 💰 Coût unitaire calculé

### Puis-je annuler une production ?
❌ Non, action irréversible. Le stock a déjà été consommé.

### Comment suivre l'historique ?
Page Production → Historique des productions avec dates, quantités, coûts.

---

## 📊 RENTABILITÉ

### Comment est calculée la marge ?
`Marge % = (Prix vente - Coût) / Prix vente × 100`

**Exemple** : Coût 3€, Prix 10€ → Marge = (10-3)/10 × 100 = **70%**

### Qu'est-ce que le coefficient dépenses fixes ?
Multiplicateur pour intégrer charges fixes (loyer, salaires, électricité) dans coûts.

**Défaut** : 1.40 = 40% de charges  
**Exemple** : Coût ingrédients 10€ → Coût réel = 10€ × 1.40 = **14€**

### Les recommandations sont-elles automatiques ?
✅ Oui. Basées sur l'analyse :
- Augmenter prix si marge faible
- Réduire coûts si perte
- Valider prix si excellent

---

## 📤 EXPORT PDF

### Le PDF est vide, pourquoi ?
**Cause** : Recettes sans prix de vente configuré.  
**Solution** : Ajouter prix de vente > 0€ sur les recettes.

### Puis-je modifier le PDF ?
❌ Non directement. Le PDF est généré en lecture seule.  
✅ Alternative : Copier le texte (sélectionnable) vers Word/Excel.

### Le texte est-il sélectionnable ?
✅ Oui ! PDFs avec texte réel, pas des images. Copiable, cherchable.

### Puis-je personnaliser l'en-tête ?
Partiellement. Nom entreprise affiché = celui dans Paramètres → Nom.

---

## 🔔 ALERTES

### Quand apparaissent les alertes stock ?
Quand stock < seuil défini (défaut : 1000 unités de base).  
Configurable : Paramètres → Seuil stock par défaut.

### Quand apparaissent les alertes DLC ?
- **🟢 DLC > 7 jours** : OK
- **🟡 DLC 3-7 jours** : Proche
- **🔴 DLC < 3 jours** : Urgent
- **⚫ DLC passée** : Périmé

Configurable : Paramètres → Jours avant DLC.

### Les notifications navigateur fonctionnent-elles ?
Oui, si autorisées. Cliquer "🔔 Activer notifications" sur page Alertes.

---

## ⌨️ RACCOURCIS & UX

### Ctrl+S ne fonctionne pas ?
Vérifiez :
- JavaScript activé
- Pas de bloqueur script
- Navigateur supporté (Chrome, Firefox, Edge, Safari)

### Comment désactiver les animations ?
Actuellement impossible. Futures versions : option dans Paramètres.

### L'interface est lente, normal ?
❌ Non. Causes possibles :
- localStorage saturé (nettoyer cache)
- Trop de données (supprimer anciennes productions)
- Navigateur obsolète (mettre à jour)

---

## 🔧 PARAMÈTRES

### Comment changer la devise ?
Application fonctionne en EUR uniquement. Configurez taux de change (USD/GBP → EUR).

### Puis-je gérer plusieurs restaurants ?
❌ Non. Une instance = un restaurant.  
✅ Alternative : Exporter données Restaurant A, importer données Restaurant B.

### Comment réinitialiser l'application ?
Paramètres → Zone dangereuse → Effacer toutes les données → Confirmer.  
⚠️ **IRRÉVERSIBLE** - Exportez avant !

---

## 🐛 PROBLÈMES TECHNIQUES

### "localStorage is full" - Que faire ?
1. Paramètres → Nettoyer cache
2. Supprimer anciennes productions (> 6 mois)
3. Exporter données → Réinitialiser → Réimporter

### Les calculs sont incorrects
Vérifiez :
- Unités cohérentes (pas g + kg mélangés)
- Prix unitaires corrects
- Lots disponibles

### Export PDF ne télécharge pas
Causes :
- Bloqueur popup activé → Désactiver
- Navigateur bloque téléchargements → Autoriser
- Données manquantes (prix vente = 0)

### L'application ne charge pas
1. Vider cache navigateur (Ctrl+Shift+Del)
2. Tester en navigation privée
3. Essayer autre navigateur
4. Vérifier console (F12) pour erreurs

---

## 📱 COMPATIBILITÉ

### Fonctionne sur mobile ?
⚠️ Non optimisé. Layout desktop forcé. Utilisable mais inconfortable.

### Fonctionne sur tablette ?
✅ Fonctionnel mais layout desktop. iPad/Galaxy Tab OK.

### Quel navigateur recommandé ?
**Chrome 90+** (meilleur support). Firefox, Edge, Safari OK aussi.

### Fonctionne hors ligne ?
✅ Oui, 100% local. Connexion Internet uniquement pour premier chargement.

---

## 🔐 SÉCURITÉ & CONFIDENTIALITÉ

### Mes recettes sont-elles protégées ?
✅ Oui, stockées localement uniquement. Jamais envoyées nulle part.

### Puis-je partager mes données ?
Fichier JSON exporté peut être partagé. **Attention** : contient TOUTES vos données sensibles.

### Y a-t-il un risque de piratage ?
Risque minimal. Données locales, pas de serveur = pas de piratage réseau.  
Risque principal : vol/perte ordinateur.

---

## 📈 PERFORMANCES

### Combien de recettes puis-je créer ?
Limite = taille localStorage (~10 MB).  
Estimé : **500-1000 recettes** selon complexité.

### L'app devient lente avec beaucoup de données ?
Oui, légèrement. Cleanup automatique mensuel aide.  
Solution : Archiver anciennes productions.

---

## 🆘 SUPPORT

### Où trouver de l'aide ?
1. Ce fichier FAQ
2. USER_GUIDE.md
3. CHANGELOG.md
4. Contacter développeur

### Comment signaler un bug ?
Console navigateur (F12) → Copier erreurs → Envoyer au développeur.

### Puis-je demander une fonctionnalité ?
Oui. Décrire besoin précis → Contacter développeur → Évaluation faisabilité.

---

**FAQ mise à jour** : Février 2026  
**Version** : 55.6-POLISH
