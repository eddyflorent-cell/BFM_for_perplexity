/**
 * Service de gestion des recettes et productions
 * Corrige les bugs #11, #12, #13, #14 identifiés dans l'audit
 * @module core/services/RecipeService
 */

import { Recipe, RecipeIngredient } from '../models/Recipe.js';
import { Production, UsedLot } from '../models/Production.js';
import { IngredientService, ValidationError, StockError } from './IngredientService.js';
import { unitToBase } from '../utils/units.js';
import { generateUUID } from '../utils/uuid.js';

/**
 * Service de gestion des recettes
 * Logique métier pure (zéro dépendances UI/DOM)
 */
export class RecipeService {
  
  /**
   * Crée une nouvelle recette avec validation
   * @param {Object} data - Données de la recette
   * @returns {Recipe}
   * @throws {ValidationError} Si données invalides
   */
  static create(data) {
    const errors = this.validate(data);
    if (errors.length > 0) {
      throw new ValidationError('Recette invalide', errors);
    }
    
    return new Recipe({
      id: generateUUID(),
      name: data.name.trim(),
      category: data.category || '',
      ingredients: [],
      producedQty: data.producedQty || 1,
      producedUnit: data.producedUnit || 'piece',
      preparationTime: data.preparationTime || 0,
      instructions: data.instructions || '',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  
  /**
   * Valide les données d'une recette
   */
  static validate(data) {
    const errors = [];
    
    if (!data.name || data.name.trim() === '') {
      errors.push('Le nom est obligatoire');
    }
    
    if (data.producedQty && data.producedQty <= 0) {
      errors.push('La quantité produite doit être > 0');
    }
    
    return errors;
  }
  
  /**
   * Ajoute un ingrédient à une recette
   * @param {Recipe} recipe - Recette
   * @param {Object} data - Données de l'ingrédient
   * @returns {Recipe}
   */
  static addIngredient(recipe, data) {
    const errors = [];
    
    if (!data.ingredientId) {
      errors.push('L\'ingrédient est obligatoire');
    }
    
    if (!data.quantity || data.quantity <= 0) {
      errors.push('La quantité doit être > 0');
    }
    
    if (!data.unit) {
      errors.push('L\'unité est obligatoire');
    }
    
    if (errors.length > 0) {
      throw new ValidationError('Ingrédient invalide', errors);
    }
    
    // Conversion en unité de base
    const { baseQty, baseUnit } = unitToBase(data.quantity, data.unit);
    
    const ingredient = new RecipeIngredient({
      ingredientId: data.ingredientId,
      ingredientName: data.ingredientName,
      quantity: data.quantity,
      unit: data.unit,
      baseQty,
      baseUnit
    });
    
    recipe.addIngredient(ingredient);
    
    return recipe;
  }
  
  /**
   * Calcule la capacité de production (combien de batches possibles)
   * ✅ CORRIGE BUG #13 : Formule correcte
   * 
   * @param {Recipe} recipe - Recette
   * @param {Ingredient[]} ingredients - Liste des ingrédients disponibles
   * @returns {Object} - {batches, units, limitingIngredient}
   */
  static calculateCapacity(recipe, ingredients) {
    if (!recipe.isValid()) {
      return { batches: 0, units: 0, limitingIngredient: null, missingIngredients: [] };
    }
    
    let minBatches = Infinity;
    let limitingIngredient = null;
    const missingIngredients = [];
    
    for (const recipeIng of recipe.ingredients) {
      // Trouver l'ingrédient dans le stock
      const ingredient = ingredients.find(i => i.id === recipeIng.ingredientId);
      
      if (!ingredient) {
        missingIngredients.push({
          name: recipeIng.ingredientName || 'Inconnu',
          missing: recipeIng.quantity,
          unit: recipeIng.unit
        });
        return { batches: 0, units: 0, limitingIngredient: recipeIng.ingredientName, missingIngredients };
      }
      
      const available = ingredient.getBaseQtyRemaining();
      const required = recipeIng.baseQty;
      
      if (required === 0) continue;
      
      // Vérifier si stock insuffisant
      if (available < required) {
        const missingInBaseUnit = required - available;
        // Convertir en unité d'affichage
        let missingDisplay = missingInBaseUnit;
        let displayUnit = ingredient.baseUnit;
        
        if (ingredient.baseUnit === 'g' && missingInBaseUnit >= 1000) {
          missingDisplay = missingInBaseUnit / 1000;
          displayUnit = 'kg';
        } else if (ingredient.baseUnit === 'ml' && missingInBaseUnit >= 1000) {
          missingDisplay = missingInBaseUnit / 1000;
          displayUnit = 'L';
        }
        
        missingIngredients.push({
          name: ingredient.name,
          missing: missingDisplay,
          unit: displayUnit
        });
      }
      
      // Nombre de batches possibles avec cet ingrédient
      const batchesForThisIngredient = Math.floor(available / required);
      
      if (batchesForThisIngredient < minBatches) {
        minBatches = batchesForThisIngredient;
        limitingIngredient = recipeIng.ingredientName;
      }
    }
    
    if (!Number.isFinite(minBatches)) {
      minBatches = 0;
    }
    
    // ✅ Calcul correct : batches × quantité produite par batch
    const units = minBatches * recipe.producedQty;
    
    return {
      batches: minBatches,
      units,
      limitingIngredient,
      missingIngredients: missingIngredients
    };
  }
  
  /**
   * Calcule le coût total d'une recette
   * @param {Recipe} recipe - Recette
   * @param {Ingredient[]} ingredients - Liste des ingrédients disponibles
   * @returns {Object} - {totalCost, costPerUnit, ingredients: [{name, cost, quantity, unit}]}
   */
  static calculateCost(recipe, ingredients) {
    if (!recipe || !recipe.ingredients || recipe.ingredients.length === 0) {
      return {
        totalCost: 0,
        costPerUnit: 0,
        ingredients: []
      };
    }
    
    let totalCost = 0;
    const ingredientCosts = [];
    
    for (const recipeIng of recipe.ingredients) {
      const ingredient = ingredients.find(i => i.id === recipeIng.ingredientId);
      
      if (!ingredient) {
        ingredientCosts.push({
          name: recipeIng.ingredientName || 'Inconnu',
          cost: 0,
          quantity: recipeIng.quantity,
          unit: recipeIng.unit
        });
        continue;
      }
      
      // Obtenir le prix par unité de base
      const pricePerBaseUnit = ingredient.getPricePerBaseUnit ? ingredient.getPricePerBaseUnit() : 0;
      
      // Calculer le coût pour cet ingrédient (en utilisant baseQty qui est déjà convertie)
      const baseQty = Number(recipeIng.baseQty) || Number(recipeIng.quantity) || 0;
      const cost = isNaN(pricePerBaseUnit) ? 0 : pricePerBaseUnit * baseQty;
      
      totalCost += isNaN(cost) ? 0 : cost;
      
      ingredientCosts.push({
        name: ingredient.name,
        cost: cost,
        quantity: recipeIng.quantity,
        unit: recipeIng.unit,
        pricePerBaseUnit: pricePerBaseUnit
      });
    }
    
    const producedQty = recipe.producedQty || 1;
    const costPerUnit = totalCost / producedQty;
    
    return {
      totalCost: totalCost,
      costPerUnit: costPerUnit,
      ingredients: ingredientCosts
    };
  }
  
  /**
   * Produit une recette avec FIFO et traçabilité complète
   * ✅ CORRIGE BUG #11 : FIFO avec coûts réels
   * ✅ CORRIGE BUG #14 : Multiplicateur xN géré correctement
   * 
   * @param {Recipe} recipe - Recette
   * @param {Ingredient[]} ingredients - Liste des ingrédients
   * @param {number} multiplier - Multiplicateur (nombre de batches)
   * @param {Object} options - Options (operator, notes)
   * @returns {Object} - {production, ingredientUpdates, trace}
   * @throws {StockError} Si stock insuffisant
   */
  static produce(recipe, ingredients, multiplier = 1, options = {}) {
    const mult = Number(multiplier);
    
    if (mult <= 0) {
      throw new ValidationError('Le multiplicateur doit être > 0');
    }
    
    if (!recipe.isValid()) {
      throw new ValidationError('Recette invalide (aucun ingrédient ou quantité produite = 0)');
    }
    
    // Vérifier le stock AVANT de déduire
    for (const recipeIng of recipe.ingredients) {
      const ingredient = ingredients.find(i => i.id === recipeIng.ingredientId);
      
      if (!ingredient) {
        throw new StockError(`Ingrédient introuvable : ${recipeIng.ingredientName}`, {
          ingredientId: recipeIng.ingredientId
        });
      }
      
      const required = recipeIng.baseQty * mult;
      
      if (!ingredient.hasStock(required)) {
        throw new StockError(
          `Stock insuffisant pour ${ingredient.name}`,
          {
            ingredientId: ingredient.id,
            ingredientName: ingredient.name,
            available: ingredient.getBaseQtyRemaining(),
            required
          }
        );
      }
    }
    
    // ✅ Déduire les ingrédients avec FIFO et collecter les coûts RÉELS
    const allLotsUsed = [];
    let costTotal = 0;
    const ingredientUpdates = [];
    
    for (const recipeIng of recipe.ingredients) {
      const ingredient = ingredients.find(i => i.id === recipeIng.ingredientId);
      const quantityNeeded = recipeIng.baseQty * mult;
      
      // ✅ Utiliser IngredientService.deductStock (FIFO avec coûts réels)
      const result = IngredientService.deductStock(ingredient, quantityNeeded);
      
      // Accumuler le coût RÉEL des lots consommés
      const costForThisIngredient = result.lotsUsed.reduce((sum, l) => sum + l.cost, 0);
      costTotal += costForThisIngredient;
      
      // Convertir lotsUsed en UsedLot pour la production
      for (const lotUsed of result.lotsUsed) {
        allLotsUsed.push(new UsedLot({
          ingredientId: ingredient.id,
          lotId: lotUsed.lotId,
          quantity: lotUsed.quantity,
          cost: lotUsed.cost,
          dlc: lotUsed.dlc
        }));
      }
      
      ingredientUpdates.push({
        ingredientId: ingredient.id,
        ingredient: result.ingredient
      });
    }
    
    // ✅ Quantité totale produite (multiplicateur géré correctement)
    const producedQty = recipe.producedQty * mult;
    
    // ✅ Coût unitaire (coût total / quantité produite)
    const costPerUnit = producedQty > 0 ? costTotal / producedQty : 0;
    
    // Créer la production avec traçabilité complète
    const production = new Production({
      id: generateUUID(),
      recipeId: recipe.id,
      recipeName: recipe.name,
      multiplier: mult,
      producedQty,
      producedUnit: recipe.producedUnit,
      remainingQty: producedQty,
      costTotal,
      costPerUnit,
      lotsUsed: allLotsUsed,
      productionDate: new Date(),
      operator: options.operator || '',
      notes: options.notes || ''
    });
    
    // Trace pour historique
    const trace = {
      id: generateUUID(),
      type: 'PRODUCTION',
      recipeId: recipe.id,
      recipeName: recipe.name,
      productionId: production.id,
      multiplier: mult,
      producedQty,
      producedUnit: recipe.producedUnit,
      costTotal,
      costPerUnit,
      ingredientsUsed: allLotsUsed.map(l => ({
        ingredientId: l.ingredientId,
        lotId: l.lotId,
        quantity: l.quantity,
        cost: l.cost
      })),
      timestamp: new Date()
    };
    
    return { production, ingredientUpdates, trace };
  }
  
  /**
   * Annule une production (rollback complet)
   * ✅ CORRIGE BUG #12 : Rollback avec restauration des lots
   * 
   * @param {Production} production - Production à annuler
   * @param {Ingredient[]} ingredients - Liste des ingrédients
   * @returns {Object} - {ingredientUpdates, trace}
   */
  static rollback(production, ingredients) {
    const ingredientUpdates = [];
    
    // ✅ Restaurer chaque lot consommé
    for (const usedLot of production.lotsUsed) {
      const ingredient = ingredients.find(i => i.id === usedLot.ingredientId);
      
      if (!ingredient) {
        console.warn(`Ingrédient ${usedLot.ingredientId} introuvable lors du rollback`);
        continue;
      }
      
      // Trouver le lot dans l'ingrédient
      const lot = ingredient.lots.find(l => l.id === usedLot.lotId);
      
      if (!lot) {
        console.warn(`Lot ${usedLot.lotId} introuvable lors du rollback`);
        continue;
      }
      
      // ✅ Restaurer la quantité dans le lot
      lot.restore(usedLot.quantity);
      
      ingredient.updatedAt = new Date();
      
      ingredientUpdates.push({
        ingredientId: ingredient.id,
        ingredient
      });
    }
    
    // Trace pour historique
    const trace = {
      id: generateUUID(),
      type: 'ROLLBACK_PRODUCTION',
      productionId: production.id,
      recipeName: production.recipeName,
      producedQty: production.producedQty,
      costTotal: production.costTotal,
      lotsRestored: production.lotsUsed.map(l => ({
        ingredientId: l.ingredientId,
        lotId: l.lotId,
        quantity: l.quantity
      })),
      timestamp: new Date()
    };
    
    return { ingredientUpdates, trace };
  }
  
  /**
   * Calcule le COGS (Cost of Goods Sold) pour une quantité vendue
   * Utilise FIFO sur les productions (la plus ancienne en premier)
   * 
   * @param {Production[]} productions - Productions disponibles (triées par date)
   * @param {number} quantitySold - Quantité vendue
   * @returns {Object} - {cogs, productionsUsed}
   * @throws {StockError} Si stock insuffisant
   */
  static calculateCOGS(productions, quantitySold) {
    const qty = Number(quantitySold);
    
    if (qty <= 0) {
      return { cogs: 0, productionsUsed: [] };
    }
    
    // Vérifier le stock total
    const totalAvailable = productions.reduce((sum, p) => sum + p.remainingQty, 0);
    
    if (qty > totalAvailable) {
      throw new StockError('Stock de produits finis insuffisant', {
        available: totalAvailable,
        requested: qty
      });
    }
    
    // Consommer les productions FIFO (plus ancienne en premier)
    const productionsUsed = [];
    let remaining = qty;
    let cogs = 0;
    
    for (const production of productions) {
      if (remaining <= 0) break;
      if (production.remainingQty === 0) continue;
      
      const toDeduct = Math.min(remaining, production.remainingQty);
      const costForThis = toDeduct * production.costPerUnit;
      
      productionsUsed.push({
        productionId: production.id,
        quantity: toDeduct,
        cost: costForThis
      });
      
      cogs += costForThis;
      remaining -= toDeduct;
    }
    
    return { cogs, productionsUsed };
  }
  
  /**
   * Déduit du stock de produits finis après une vente
   * @param {Production[]} productions - Productions
   * @param {number} quantitySold - Quantité vendue
   */
  static deductFinishedGoods(productions, quantitySold) {
    const result = this.calculateCOGS(productions, quantitySold);
    
    // Déduire des productions
    for (const used of result.productionsUsed) {
      const production = productions.find(p => p.id === used.productionId);
      if (production) {
        production.deduct(used.quantity);
      }
    }
    
    return result;
  }
}
