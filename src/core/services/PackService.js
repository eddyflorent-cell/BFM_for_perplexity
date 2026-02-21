/**
 * Service Pack - Gestion des packs de produits
 * @module core/services/PackService
 */

import { Pack, PackItem } from '../models/Pack.js';
import { generateUUID } from '../utils/uuid.js';

/**
 * PackService
 * Gère la logique métier des packs
 */
export class PackService {
  
  /**
   * Crée un nouveau pack
   * 
   * @param {Object} data - Données du pack
   * @param {string} data.name - Nom du pack
   * @param {string} [data.description] - Description
   * @param {Array} data.items - Items du pack [{productionId, productionName, quantity, unit}]
   * @param {number} data.price - Prix de vente
   * @param {boolean} [data.allowLoss] - Autoriser création à perte (après warning)
   * @param {Recipe[]} recipes - Liste des recettes pour validation
   * @param {Ingredient[]} [ingredients] - Pour calcul coût (optionnel)
   * @returns {Pack} - Pack créé
   * @throws {Error} Si validation échoue
   */
  static create(data, recipes, ingredients = null) {
    // Validations
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Le nom du pack est requis');
    }
    
    if (!data.items || data.items.length === 0) {
      throw new Error('Le pack doit contenir au moins un produit');
    }
    
    if (data.price <= 0) {
      throw new Error('Le prix doit être supérieur à 0');
    }
    
    // Vérifier que les produits existent
    for (const item of data.items) {
      const recipe = recipes.find(r => r.id === item.productionId);
      if (!recipe) {
        throw new Error(`Produit ${item.productionName} introuvable`);
      }
      
      if (item.quantity <= 0) {
        throw new Error(`Quantité invalide pour ${item.productionName}`);
      }
    }
    
    // Vérifier doublons (même produit plusieurs fois)
    const productIds = data.items.map(i => i.productionId);
    const uniqueIds = new Set(productIds);
    if (productIds.length !== uniqueIds.size) {
      throw new Error('Le pack contient des produits en double. Augmentez plutôt la quantité.');
    }
    
    // Créer le pack
    const packData = {
      id: 'pack_' + Date.now() + '_' + generateUUID().substring(0, 8),
      name: data.name.trim(),
      description: data.description ? data.description.trim() : '',
      items: data.items.map(item => new PackItem({
        productionId: item.productionId,
        productionName: item.productionName,
        quantity: Number(item.quantity),
        unit: item.unit
      })),
      price: Number(data.price),
      active: true,
      createdAt: new Date()
    };
    
    const pack = new Pack(packData);
    
    // 🛡️ PROTECTION ANTI-PERTE
    // Vérifier si prix < coût (vente à perte)
    if (ingredients && ingredients.length > 0) {
      const cost = pack.getCost(recipes, ingredients);
      const margin = pack.price - cost;
      const marginPercent = pack.price > 0 ? (margin / pack.price) * 100 : 0;
      
      // Si vente à perte (marge négative)
      if (margin < 0 && !data.allowLoss) {
        throw new Error(
          `⚠️ ALERTE PERTE DÉTECTÉE\n\n` +
          `Prix de vente: ${pack.price.toFixed(2)} €\n` +
          `Coût réel: ${cost.toFixed(2)} €\n` +
          `Perte: ${Math.abs(margin).toFixed(2)} €\n\n` +
          `Ce pack génère une PERTE de ${Math.abs(marginPercent).toFixed(1)}%.\n` +
          `Prix minimum recommandé: ${cost.toFixed(2)} €\n\n` +
          `Pour créer quand même ce pack (ex: promotion), ` +
          `définissez allowLoss: true dans les données.`
        );
      }
      
      // Si marge très faible (< 5%)
      if (margin >= 0 && marginPercent < 5 && !data.allowLoss) {
        console.warn(
          `⚠️ MARGE TRÈS FAIBLE: Pack "${pack.name}" - Marge ${marginPercent.toFixed(1)}%\n` +
          `Prix: ${pack.price.toFixed(2)} € | Coût: ${cost.toFixed(2)} € | Profit: ${margin.toFixed(2)} €`
        );
      }
    }
    
    return pack;
  }
  
  /**
   * Met à jour un pack existant
   * 
   * @param {Pack} pack - Pack à modifier
   * @param {Object} updates - Modifications
   * @param {Recipe[]} recipes - Liste des recettes pour validation
   * @param {Ingredient[]} [ingredients] - Pour calcul coût (optionnel)
   * @param {boolean} [allowLoss] - Autoriser modification à perte
   * @returns {Pack} - Pack modifié
   */
  static update(pack, updates, recipes, ingredients = null, allowLoss = false) {
    if (!pack) {
      throw new Error('Pack introuvable');
    }
    
    // Mettre à jour les champs autorisés
    if (updates.name !== undefined) {
      if (!updates.name || updates.name.trim().length === 0) {
        throw new Error('Le nom du pack est requis');
      }
      pack.name = updates.name.trim();
    }
    
    if (updates.description !== undefined) {
      pack.description = updates.description ? updates.description.trim() : '';
    }
    
    if (updates.price !== undefined) {
      const price = Number(updates.price);
      if (price <= 0) {
        throw new Error('Le prix doit être supérieur à 0');
      }
      
      // 🛡️ PROTECTION ANTI-PERTE lors modification prix
      if (ingredients && ingredients.length > 0) {
        const cost = pack.getCost(recipes, ingredients);
        const margin = price - cost;
        const marginPercent = price > 0 ? (margin / price) * 100 : 0;
        
        if (margin < 0 && !allowLoss) {
          throw new Error(
            `⚠️ ALERTE PERTE DÉTECTÉE\n\n` +
            `Nouveau prix: ${price.toFixed(2)} €\n` +
            `Coût réel: ${cost.toFixed(2)} €\n` +
            `Perte: ${Math.abs(margin).toFixed(2)} €\n\n` +
            `Cette modification génère une PERTE de ${Math.abs(marginPercent).toFixed(1)}%.\n` +
            `Prix minimum recommandé: ${cost.toFixed(2)} €`
          );
        }
        
        if (margin >= 0 && marginPercent < 5 && !allowLoss) {
          console.warn(
            `⚠️ MARGE TRÈS FAIBLE après modification: ${marginPercent.toFixed(1)}%`
          );
        }
      }
      
      pack.price = price;
    }
    
    if (updates.items !== undefined) {
      if (!updates.items || updates.items.length === 0) {
        throw new Error('Le pack doit contenir au moins un produit');
      }
      
      // Vérifier que les produits existent
      for (const item of updates.items) {
        const recipe = recipes.find(r => r.id === item.productionId);
        if (!recipe) {
          throw new Error(`Produit ${item.productionName} introuvable`);
        }
        
        if (item.quantity <= 0) {
          throw new Error(`Quantité invalide pour ${item.productionName}`);
        }
      }
      
      // Vérifier doublons
      const productIds = updates.items.map(i => i.productionId);
      const uniqueIds = new Set(productIds);
      if (productIds.length !== uniqueIds.size) {
        throw new Error('Le pack contient des produits en double');
      }
      
      pack.items = updates.items.map(item => new PackItem({
        productionId: item.productionId,
        productionName: item.productionName,
        quantity: Number(item.quantity),
        unit: item.unit
      }));
    }
    
    if (updates.active !== undefined) {
      pack.active = Boolean(updates.active);
    }
    
    return pack;
  }
  
  /**
   * Supprime un pack (vérifications avant)
   * 
   * @param {Pack} pack - Pack à supprimer
   * @param {Sale[]} sales - Ventes pour vérifier si pack vendu
   * @returns {boolean} - true si suppression OK
   */
  static delete(pack, sales) {
    if (!pack) {
      throw new Error('Pack introuvable');
    }
    
    // Vérifier si le pack a été vendu
    const hasSales = sales.some(s => s.packId === pack.id);
    
    if (hasSales) {
      throw new Error(
        'Impossible de supprimer ce pack car il a déjà été vendu. ' +
        'Vous pouvez le désactiver à la place.'
      );
    }
    
    return true;
  }
  
  /**
   * Vend un pack (consomme productions en FIFO)
   * 
   * @param {Pack} pack - Pack à vendre
   * @param {number} quantity - Quantité de packs vendus
   * @param {Production[]} productions - Productions disponibles
   * @param {Recipe[]} recipes - Recettes
   * @returns {Object} - {consumed: [{productionId, qty}], totalCost}
   * @throws {Error} Si stock insuffisant
   */
  static sell(pack, quantity, productions, recipes) {
    if (!pack.active) {
      throw new Error('Ce pack est désactivé et ne peut être vendu');
    }
    
    if (quantity <= 0) {
      throw new Error('Quantité de vente invalide');
    }
    
    // Vérifier disponibilité pour TOUS les items
    const availability = this.checkAvailability(pack, quantity, productions);
    
    if (!availability.available) {
      const missing = availability.items
        .filter(item => !item.available)
        .map(item => `${item.productionName}: besoin ${item.required} ${item.unit}, dispo ${item.available} ${item.unit}`)
        .join('\n');
      
      throw new Error(`Stock insuffisant:\n${missing}`);
    }
    
    // Consommer les productions en FIFO
    const consumed = [];
    let totalCost = 0;
    
    for (const packItem of pack.items) {
      const recipe = recipes.find(r => r.id === packItem.productionId);
      if (!recipe) continue;
      
      const qtyNeeded = packItem.quantity * quantity;
      let qtyRemaining = qtyNeeded;
      
      // Trier productions par date FIFO (plus anciennes en premier)
      const availableProds = productions
        .filter(p => 
          p.recipeId === packItem.productionId && 
          p.remainingQty > 0
        )
        .sort((a, b) => new Date(a.productionDate) - new Date(b.productionDate));
      
      for (const prod of availableProds) {
        if (qtyRemaining <= 0) break;
        
        const qtyToConsume = Math.min(qtyRemaining, prod.remainingQty);
        
        // Consommer
        prod.remainingQty -= qtyToConsume;
        qtyRemaining -= qtyToConsume;
        
        // Calculer coût
        const costPerUnit = prod.totalCost / prod.producedQty;
        totalCost += costPerUnit * qtyToConsume;
        
        consumed.push({
          productionId: prod.id,
          recipeId: prod.recipeId,
          recipeName: recipe.name,
          quantity: qtyToConsume,
          unit: packItem.unit,
          cost: costPerUnit * qtyToConsume
        });
      }
      
      if (qtyRemaining > 0) {
        throw new Error(`Erreur consommation stock ${packItem.productionName}`);
      }
    }
    
    return {
      consumed,
      totalCost
    };
  }
  
  /**
   * Vérifie la disponibilité du stock pour un pack
   * 
   * @param {Pack} pack - Pack à vérifier
   * @param {number} quantity - Quantité souhaitée
   * @param {Production[]} productions - Productions disponibles
   * @returns {Object} - {available: boolean, items: [{...}]}
   */
  static checkAvailability(pack, quantity, productions) {
    const items = pack.items.map(packItem => {
      const availableProds = productions.filter(p => 
        p.recipeId === packItem.productionId && 
        p.remainingQty > 0
      );
      
      const totalAvailable = availableProds.reduce((sum, p) => sum + p.remainingQty, 0);
      const required = packItem.quantity * quantity;
      
      return {
        productionId: packItem.productionId,
        productionName: packItem.productionName,
        required,
        available: totalAvailable,
        unit: packItem.unit,
        sufficient: totalAvailable >= required
      };
    });
    
    const available = items.every(item => item.sufficient);
    
    return {
      available,
      items
    };
  }
  
  /**
   * Calcule le prix suggéré basé sur le coût + marge standard
   * 
   * @param {Pack} pack - Pack
   * @param {Recipe[]} recipes - Recettes
   * @param {Ingredient[]} ingredients - Ingrédients
   * @param {number} [marginPercent=30] - Marge souhaitée en %
   * @param {Object} [settings] - Paramètres (overheadCoefficient)
   * @returns {number} - Prix suggéré
   */
  static calculateSuggestedPrice(pack, recipes, ingredients, marginPercent = 30, settings = null) {
    return pack.getSuggestedPrice(recipes, ingredients, marginPercent, settings);
  }
  
  /**
   * Calcule les statistiques d'un pack
   * 
   * @param {Pack} pack - Pack
   * @param {Sale[]} sales - Ventes
   * @param {Recipe[]} recipes - Recettes
   * @param {Ingredient[]} ingredients - Ingrédients
   * @returns {Object} - Statistiques
   */
  static getStatistics(pack, sales, recipes, ingredients) {
    // Ventes de ce pack
    const packSales = sales.filter(s => s.packId === pack.id);
    
    const totalSold = packSales.reduce((sum, s) => sum + (s.quantity || 0), 0);
    const totalRevenue = packSales.reduce((sum, s) => sum + (s.amount || 0), 0);
    
    // Coûts et marges
    const costPerUnit = pack.getCost(recipes, ingredients);
    const totalCost = costPerUnit * totalSold;
    const totalProfit = totalRevenue - totalCost;
    
    const avgMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
    
    // Dernière vente
    const lastSale = packSales.length > 0 
      ? new Date(Math.max(...packSales.map(s => new Date(s.date).getTime())))
      : null;
    
    return {
      totalSold,
      totalRevenue,
      totalCost,
      totalProfit,
      avgMargin,
      lastSale,
      salesCount: packSales.length
    };
  }
  
  /**
   * Récupère les packs actifs avec stock disponible
   * 
   * @param {Pack[]} packs - Tous les packs
   * @param {Production[]} productions - Productions
   * @returns {Pack[]} - Packs disponibles
   */
  static getAvailablePacks(packs, productions) {
    return packs.filter(pack => {
      if (!pack.active) return false;
      
      const availability = this.checkAvailability(pack, 1, productions);
      return availability.available;
    });
  }
  
  /**
   * Valide qu'un pack peut être créé/modifié
   * 
   * @param {Object} packData - Données du pack
   * @param {Recipe[]} recipes - Recettes disponibles
   * @returns {Object} - {valid: boolean, errors: string[]}
   */
  static validate(packData, recipes) {
    const errors = [];
    
    if (!packData.name || packData.name.trim().length === 0) {
      errors.push('Le nom du pack est requis');
    }
    
    if (packData.name && packData.name.length > 100) {
      errors.push('Le nom du pack est trop long (max 100 caractères)');
    }
    
    if (!packData.items || packData.items.length === 0) {
      errors.push('Le pack doit contenir au moins un produit');
    }
    
    if (packData.items && packData.items.length > 20) {
      errors.push('Un pack ne peut contenir plus de 20 produits');
    }
    
    if (packData.price !== undefined) {
      const price = Number(packData.price);
      if (isNaN(price) || price <= 0) {
        errors.push('Le prix doit être un nombre supérieur à 0');
      }
      if (price > 1000000) {
        errors.push('Prix trop élevé (max 1,000,000)');
      }
    }
    
    if (packData.items) {
      // Vérifier que les produits existent
      for (const item of packData.items) {
        const recipe = recipes.find(r => r.id === item.productionId);
        if (!recipe) {
          errors.push(`Produit "${item.productionName}" introuvable`);
        }
        
        if (item.quantity <= 0) {
          errors.push(`Quantité invalide pour "${item.productionName}"`);
        }
        
        if (item.quantity > 1000) {
          errors.push(`Quantité trop élevée pour "${item.productionName}" (max 1000)`);
        }
      }
      
      // Vérifier doublons
      const productIds = packData.items.map(i => i.productionId);
      const uniqueIds = new Set(productIds);
      if (productIds.length !== uniqueIds.size) {
        errors.push('Le pack contient des produits en double');
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Calcule le tableau de marges pour différents prix
   * Aide à fixer le prix optimal
   * 
   * @param {Pack} pack - Pack
   * @param {Recipe[]} recipes - Recettes
   * @param {Ingredient[]} ingredients - Ingrédients
   * @returns {Array} - [{price, cost, margin, marginPercent}]
   */
  static getPricingTable(pack, recipes, ingredients) {
    const cost = pack.getCost(recipes, ingredients);
    
    if (cost === 0) {
      return [];
    }
    
    const margins = [10, 20, 30, 40, 50, 60, 70, 80];
    
    return margins.map(marginPercent => {
      const price = cost / (1 - marginPercent / 100);
      const margin = price - cost;
      
      return {
        price: Math.round(price * 100) / 100,
        cost: Math.round(cost * 100) / 100,
        margin: Math.round(margin * 100) / 100,
        marginPercent
      };
    });
  }
}
