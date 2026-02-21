/**
 * Service d'analyse de rentabilité
 * Calcule les marges, identifie les produits à perte, génère des recommandations
 */

import { Recipe } from '../models/Recipe.js';
import { Pack } from '../models/Pack.js';

export class ProfitabilityService {
  
  /**
   * Analyse la rentabilité de tous les produits (recettes + packs)
   */
  static analyzeProfitability(recipes, packs, ingredients, settings = {}) {
    const productsAnalysis = [];
    
    // Analyser les recettes
    for (const recipe of recipes) {
      try {
        const recipeObj = recipe instanceof Recipe ? recipe : Recipe.fromJSON(recipe);
        const analysis = this.analyzeRecipe(recipeObj, ingredients, settings);
        if (analysis) {
          productsAnalysis.push({
            ...analysis,
            classification: analysis.status, // alias pour le template
            type: 'recipe',
            id: recipeObj.id,
            name: recipeObj.name,
            category: recipeObj.category || 'Recettes'
          });
        }
      } catch (e) {
        console.warn('ProfitabilityService: erreur analyse recette', recipe?.id, e.message);
      }
    }
    
    // Analyser les packs
    for (const pack of packs) {
      try {
        const packObj = pack instanceof Pack ? pack : Pack.fromJSON(pack);
        const analysis = this.analyzePack(packObj, recipes, ingredients, settings);
        if (analysis) {
          productsAnalysis.push({
            ...analysis,
            classification: analysis.status, // alias pour le template
            type: 'pack',
            id: packObj.id,
            name: packObj.name,
            category: 'Packs & Menus'
          });
        }
      } catch (e) {
        console.warn('ProfitabilityService: erreur analyse pack', pack?.id, e.message);
      }
    }
    
    // Trier par marge (croissant = pertes en premier)
    productsAnalysis.sort((a, b) => a.marginPercent - b.marginPercent);
    
    // Calculer les statistiques globales
    const stats = this.calculateGlobalStats(productsAnalysis);
    
    return {
      products: productsAnalysis,
      stats,
      recommendations: this.generateRecommendations(productsAnalysis)
    };
  }
  
  /**
   * Analyse une recette
   */
  static analyzeRecipe(recipe, ingredients, settings = {}) {
    // Prix de vente — supporte sellingPrice (démos) et pricePerUnit (ancien format)
    const price = Number(recipe.sellingPrice) || Number(recipe.pricePerUnit) || 0;
    if (price === 0 || isNaN(price)) return null;
    
    // ✅ getCostPerUnit APPLIQUE DÉJÀ L'OVERHEAD si settings fourni
    // Donc on passe settings pour qu'il applique le coefficient
    const rawCost = recipe.getCostPerUnit ? recipe.getCostPerUnit(ingredients, settings) : 0;
    const cost = isNaN(rawCost) ? 0 : Number(rawCost);
    
    // Calcul de la marge (basé sur le coût COMPLET déjà retourné par getCostPerUnit)
    const margin = price - cost;
    const marginPercent = price > 0 ? ((margin / price) * 100) : 0;
    
    // Classification
    const status = this.classifyMargin(marginPercent);
    
    // Prix suggérés pour différentes marges cibles
    const suggestedPrices = {
      margin20: this.calculateSuggestedPrice(cost, 20),
      margin30: this.calculateSuggestedPrice(cost, 30),
      margin40: this.calculateSuggestedPrice(cost, 40),
      margin50: this.calculateSuggestedPrice(cost, 50),
      margin60: this.calculateSuggestedPrice(cost, 60)
    };
    
    return {
      cost: Number(cost.toFixed(2)),
      price: Number(price.toFixed(2)),
      margin: Number(margin.toFixed(2)),
      marginPercent: Number(marginPercent.toFixed(1)),
      status,
      suggestedPrices,
      producedQty: recipe.producedQty || 1,
      unit: recipe.producedUnit || recipe.unit || 'portion'
    };
  }
  
  /**
   * Analyse un pack
   */
  static analyzePack(pack, recipes, ingredients, settings = {}) {
    // Prix de vente du pack
    const price = Number(pack.price) || 0;
    if (price === 0 || isNaN(price)) return null;
    
    // Coût = somme des coûts des recettes incluses
    // ✅ getCostPerUnit applique déjà l'overhead si settings fourni
    let totalCost = 0;
    
    for (const item of pack.items || []) {
      // Pack.items utilise productionId comme clé de recette (pas recipeId)
      const recipeId = item.recipeId || item.productionId;
      const recipe = recipes.find(r => r.id === recipeId);
      if (recipe) {
        const recipeObj = recipe instanceof Recipe ? recipe : Recipe.fromJSON(recipe);
        const recipeCost = recipeObj.getCostPerUnit ? recipeObj.getCostPerUnit(ingredients, settings) : 0;
        const itemCost = (isNaN(recipeCost) ? 0 : recipeCost) * (item.quantity || 1);
        totalCost += isNaN(itemCost) ? 0 : itemCost;
      }
    }
    
    totalCost = isNaN(totalCost) ? 0 : totalCost;
    
    // Calcul de la marge
    const margin = price - totalCost;
    const marginPercent = price > 0 ? ((margin / price) * 100) : 0;
    
    // Classification
    const status = this.classifyMargin(marginPercent);
    
    // Prix suggérés
    const suggestedPrices = {
      margin20: this.calculateSuggestedPrice(totalCost, 20),
      margin30: this.calculateSuggestedPrice(totalCost, 30),
      margin40: this.calculateSuggestedPrice(totalCost, 40),
      margin50: this.calculateSuggestedPrice(totalCost, 50),
      margin60: this.calculateSuggestedPrice(totalCost, 60)
    };
    
    return {
      cost: Number(totalCost.toFixed(2)),
      price: Number(price.toFixed(2)),
      margin: Number(margin.toFixed(2)),
      marginPercent: Number(marginPercent.toFixed(1)),
      status,
      suggestedPrices,
      producedQty: 1,
      unit: 'pack'
    };
  }
  
  /**
   * Classifie la marge
   */
  static classifyMargin(marginPercent) {
    if (marginPercent < 0) {
      return {
        level: 'loss',
        label: 'PERTE',
        icon: '🔴',
        color: '#dc2626',
        bgColor: '#fee2e2',
        alert: true
      };
    } else if (marginPercent < 25) {
      return {
        level: 'low',
        label: 'Faible',
        icon: '🟡',
        color: '#f59e0b',
        bgColor: '#fef3c7',
        alert: true
      };
    } else if (marginPercent >= 50) {
      return {
        level: 'excellent',
        label: 'Excellent',
        icon: '🟢',
        color: '#16a34a',
        bgColor: '#dcfce7',
        alert: false
      };
    } else {
      return {
        level: 'ok',
        label: 'Correct',
        icon: '⚪',
        color: '#6b7280',
        bgColor: '#f3f4f6',
        alert: false
      };
    }
  }
  
  /**
   * Calcule les statistiques globales
   */
  static calculateGlobalStats(products) {
    const total = products.length;
    const inLoss = products.filter(p => p.status.level === 'loss').length;
    const lowMargin = products.filter(p => p.status.level === 'low').length;
    const excellent = products.filter(p => p.status.level === 'excellent').length;
    const ok = products.filter(p => p.status.level === 'ok').length;
    
    // Marge moyenne
    const avgMargin = total > 0
      ? products.reduce((sum, p) => sum + p.marginPercent, 0) / total
      : 0;
    
    // Produit le plus rentable
    const mostProfitable = products.length > 0 
      ? products[products.length - 1] // Dernier = marge la plus haute
      : null;
    
    // Produit le moins rentable
    const leastProfitable = products.length > 0
      ? products[0] // Premier = marge la plus basse
      : null;
    
    return {
      total,
      inLoss,
      lowMargin,
      ok,
      excellent,
      avgMargin: Number(avgMargin.toFixed(1)),
      mostProfitable,
      leastProfitable
    };
  }
  
  /**
   * Génère des recommandations automatiques
   */
  static generateRecommendations(products) {
    const recommendations = [];
    
    // Recommandations pour les produits à perte ou faible marge
    const problematicProducts = products.filter(p => 
      p.status.level === 'loss' || p.status.level === 'low'
    );
    
    for (const product of problematicProducts) {
      const reco = this.generateProductRecommendation(product);
      if (reco) {
        recommendations.push(reco);
      }
    }
    
    return recommendations;
  }
  
  /**
   * Génère une recommandation pour un produit
   */
  static generateProductRecommendation(product) {
    if (product.status.level === 'loss') {
      // Produit à perte : calculer prix minimum viable
      const targetMargin = 20; // Objectif 20% de marge
      const suggestedPrice = product.cost / (1 - (targetMargin / 100));
      
      return {
        productId: product.id,
        productName: product.name,
        type: 'price_increase',
        severity: 'critical',
        icon: '🔴',
        title: `${product.name} : PERTE de ${Math.abs(product.marginPercent)}%`,
        message: `Actuellement vendu ${product.price}€ pour un coût de ${product.cost}€. Perte de ${Math.abs(product.margin)}€ par unité.`,
        action: `Augmenter le prix à ${suggestedPrice.toFixed(2)}€ pour obtenir 20% de marge`,
        suggestedPrice: Number(suggestedPrice.toFixed(2))
      };
    } else if (product.status.level === 'low') {
      // Marge faible : suggérer amélioration
      const targetMargin = 30; // Objectif 30% de marge
      const suggestedPrice = product.cost / (1 - (targetMargin / 100));
      
      return {
        productId: product.id,
        productName: product.name,
        type: 'margin_improvement',
        severity: 'warning',
        icon: '🟡',
        title: `${product.name} : Marge faible (${product.marginPercent}%)`,
        message: `Prix actuel ${product.price}€ génère seulement ${product.marginPercent}% de marge.`,
        action: `Envisager ${suggestedPrice.toFixed(2)}€ pour 30% de marge, ou négocier avec les fournisseurs`,
        suggestedPrice: Number(suggestedPrice.toFixed(2))
      };
    }
    
    return null;
  }
  
  /**
   * Calcule le prix suggéré pour une marge cible
   */
  static calculateSuggestedPrice(cost, targetMarginPercent) {
    if (targetMarginPercent >= 100) return cost * 10; // Sécurité
    return cost / (1 - (targetMarginPercent / 100));
  }
  
  /**
   * Filtre les produits selon des critères
   */
  static filterProducts(products, filters = {}) {
    let filtered = [...products];
    
    // Filtre par type (recipe / pack)
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(p => p.type === filters.type);
    }
    
    // Filtre par classification (loss / low / ok / excellent)
    if (filters.classification && filters.classification !== 'all') {
      filtered = filtered.filter(p => p.status.level === filters.classification);
    }
    
    // Filtre par recherche textuelle
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  }
  
  /**
   * Trie les produits
   */
  static sortProducts(products, field, order = 'asc') {
    const sorted = [...products];
    
    sorted.sort((a, b) => {
      let valA, valB;
      
      switch (field) {
        case 'margin':
          valA = a.marginPercent;
          valB = b.marginPercent;
          break;
        case 'name':
          valA = a.name.toLowerCase();
          valB = b.name.toLowerCase();
          break;
        case 'cost':
          valA = a.cost;
          valB = b.cost;
          break;
        case 'price':
          valA = a.price;
          valB = b.price;
          break;
        default:
          valA = a.marginPercent;
          valB = b.marginPercent;
      }
      
      if (order === 'asc') {
        return valA > valB ? 1 : (valA < valB ? -1 : 0);
      } else {
        return valA < valB ? 1 : (valA > valB ? -1 : 0);
      }
    });
    
    return sorted;
  }
}
