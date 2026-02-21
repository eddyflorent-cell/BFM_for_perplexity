/**
 * Service de gestion des ingrédients
 * Corrige les bugs #1, #2, #3, #4 identifiés dans l'audit
 * @module core/services/IngredientService
 */

import { Ingredient } from '../models/Ingredient.js';
import { Lot } from '../models/Lot.js';
import { unitToBase } from '../utils/units.js';
import { generateUUID } from '../utils/uuid.js';

/**
 * Erreur de validation
 */
export class ValidationError extends Error {
  constructor(message, errors = []) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

/**
 * Erreur de stock
 */
export class StockError extends Error {
  constructor(message, context = {}) {
    super(message);
    this.name = 'StockError';
    this.context = context;
  }
}

/**
 * Service de gestion des ingrédients
 * Logique métier pure (zéro dépendances UI/DOM)
 */
export class IngredientService {
  
  /**
   * Crée un nouvel ingrédient avec validation
   * @param {Object} data - Données de l'ingrédient
   * @returns {Ingredient}
   * @throws {ValidationError} Si données invalides
   */
  static create(data) {
    // Validation
    const errors = this.validate(data);
    if (errors.length > 0) {
      throw new ValidationError('Données invalides', errors);
    }
    
    // Normalisation des unités - Accepte 'unit' OU 'baseUnit'
    const unitToUse = data.baseUnit || data.unit;
    const { baseUnit } = unitToBase(1, unitToUse);
    
    // Création de l'ingrédient
    return new Ingredient({
      id: generateUUID(),
      name: data.name.trim(),
      category: data.category || '',
      baseUnit,
      displayUnit: unitToUse,
      alertBaseQty: data.alertBaseQty || 0,
      // v51 : Rendements
      yieldPercent: data.yieldPercent || 100,
      wasteType: data.wasteType || '',
      lots: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  
  /**
   * Valide les données d'un ingrédient
   * @param {Object} data - Données à valider
   * @returns {string[]} - Liste des erreurs
   */
  static validate(data) {
    const errors = [];
    
    if (!data.name || data.name.trim() === '') {
      errors.push('Le nom est obligatoire');
    }
    
    if (data.name && data.name.length > 100) {
      errors.push('Le nom ne peut pas dépasser 100 caractères');
    }
    
    // Accepte 'unit' OU 'baseUnit' (v51 fix)
    if (!data.unit && !data.baseUnit) {
      errors.push('L\'unité est obligatoire');
    }
    
    if (data.alertBaseQty && data.alertBaseQty < 0) {
      errors.push('Le seuil d\'alerte ne peut pas être négatif');
    }
    
    return errors;
  }
  
  /**
   * Ajoute un lot à un ingrédient (réception)
   * ✅ CORRIGE BUG #1 : Stock recalculé depuis les lots
   * 
   * @param {Ingredient} ingredient - Ingrédient
   * @param {Object} lotData - Données du lot
   * @returns {Object} - {ingredient, lot, trace}
   * @throws {ValidationError} Si données invalides
   */
  static addLot(ingredient, lotData) {
    // Validation du lot
    const lotErrors = this.validateLot(lotData);
    if (lotErrors.length > 0) {
      throw new ValidationError('Lot invalide', lotErrors);
    }
    
    // Conversion de la quantité en unité de base
    const { baseQty } = unitToBase(lotData.quantity, lotData.unit);
    
    // Création du lot
    const lot = new Lot({
      id: generateUUID(),
      quantiteInitiale: baseQty,
      quantite: baseQty,
      prixTotal: Number(lotData.price),
      fraisApproche: Number(lotData.fees || 0),
      dlc: new Date(lotData.dlc),
      dateReception: new Date(),
      fournisseur: lotData.fournisseur || '',
      numeroLot: lotData.numeroLot || '',
      epuise: false
    });
    
    // Ajout du lot à l'ingrédient
    ingredient.addLot(lot);
    
    // ✅ Le stock est recalculé automatiquement via les méthodes de l'ingrédient
    // Pas de `ing.baseQtyTotal += ...` qui crée la désynchronisation (Bug #1)
    
    // Trace pour traçabilité HACCP
    const trace = {
      id: generateUUID(),
      type: 'RECEPTION',
      ingredientId: ingredient.id,
      ingredientName: ingredient.name,
      lotId: lot.id,
      quantity: baseQty,
      baseUnit: ingredient.baseUnit,
      cost: lot.getCoutTotal(),
      dlc: lot.dlc,
      timestamp: new Date()
    };
    
    return { ingredient, lot, trace };
  }
  
  /**
   * Valide les données d'un lot
   * @param {Object} lotData - Données à valider
   * @returns {string[]} - Liste des erreurs
   */
  static validateLot(lotData) {
    const errors = [];
    
    if (!lotData.quantity || lotData.quantity <= 0) {
      errors.push('La quantité doit être supérieure à 0');
    }
    
    if (!lotData.unit) {
      errors.push('L\'unité est obligatoire');
    }
    
    if (!lotData.price || lotData.price < 0) {
      errors.push('Le prix ne peut pas être négatif');
    }
    
    if (lotData.fees && lotData.fees < 0) {
      errors.push('Les frais ne peuvent pas être négatifs');
    }
    
    if (!lotData.dlc) {
      errors.push('La DLC est obligatoire');
    } else {
      const dlcDate = new Date(lotData.dlc);
      if (isNaN(dlcDate.getTime())) {
        errors.push('La DLC est invalide');
      }
    }
    
    return errors;
  }
  
  /**
   * Déduit du stock selon FIFO (First In, First Out)
   * ✅ CORRIGE BUG #3 : Stock négatif BLOQUÉ (pas masqué avec Math.max)
   * ✅ CORRIGE BUG #11 : FIFO avec coûts réels de chaque lot
   * 
   * @param {Ingredient} ingredient - Ingrédient
   * @param {number} quantity - Quantité à déduire
   * @returns {Object} - {ingredient, lotsUsed, trace}
   * @throws {StockError} Si stock insuffisant
   */
  static deductStock(ingredient, quantity) {
    const qtyNeeded = Number(quantity);
    
    if (qtyNeeded < 0) {
      throw new ValidationError('La quantité ne peut pas être négative');
    }
    
    if (qtyNeeded === 0) {
      return { ingredient, lotsUsed: [], trace: null };
    }
    
    // ✅ VÉRIFICATION AVANT : Stock négatif BLOQUÉ (pas masqué)
    if (!ingredient.hasStock(qtyNeeded)) {
      throw new StockError('Stock insuffisant', {
        available: ingredient.getBaseQtyRemaining(),
        requested: qtyNeeded,
        ingredientId: ingredient.id,
        ingredientName: ingredient.name
      });
    }
    
    // Trier les lots par FIFO
    ingredient.sortLotsFIFO();
    
    const lotsUsed = [];
    let remaining = qtyNeeded;
    
    // Consommer les lots selon FIFO
    for (const lot of ingredient.getAvailableLots()) {
      if (remaining <= 0) break;
      
      const toDeduct = Math.min(remaining, lot.quantite);
      const costBefore = lot.getValeurActuelle();
      
      // Déduire du lot
      lot.deduct(toDeduct);
      
      const costAfter = lot.getValeurActuelle();
      const costUsed = costBefore - costAfter;
      
      // Enregistrer l'utilisation du lot
      lotsUsed.push({
        lotId: lot.id,
        quantity: toDeduct,
        cost: costUsed,
        unitCost: lot.getCoutUnitaire(),
        dlc: lot.dlc
      });
      
      remaining -= toDeduct;
    }
    
    // ✅ Sécurité : Si on arrive ici, c'est que le stock était suffisant
    // (vérifié au début). Si `remaining > 0`, c'est un bug de logique.
    if (remaining > 0.0001) { // tolérance pour arrondis
      throw new Error(
        `Bug interne : Stock insuffisant après FIFO (reste ${remaining} à déduire)`
      );
    }
    
    // Mise à jour de l'ingrédient
    ingredient.updatedAt = new Date();
    
    // Trace pour traçabilité HACCP
    const trace = {
      id: generateUUID(),
      type: 'DEDUCTION',
      ingredientId: ingredient.id,
      ingredientName: ingredient.name,
      quantity: qtyNeeded,
      baseUnit: ingredient.baseUnit,
      cost: lotsUsed.reduce((sum, l) => sum + l.cost, 0),
      lotsUsed: lotsUsed.map(l => ({
        lotId: l.lotId,
        quantity: l.quantity,
        dlc: l.dlc
      })),
      timestamp: new Date()
    };
    
    // ✅ Le stock est recalculé automatiquement via ingredient.getBaseQtyRemaining()
    // Pas de `ing.baseQtyRemaining -= ...` qui crée la désynchronisation
    
    // ✅ BUG #9 CORRIGÉ : Cleanup automatique des lots épuisés
    ingredient.cleanupEmptyLots();
    
    return { ingredient, lotsUsed, trace };
  }
  
  /**
   * Enregistre une perte avec FIFO
   * ✅ CORRIGE BUG #4 : Coût de perte calculé depuis les lots réels
   * 
   * @param {Ingredient} ingredient - Ingrédient
   * @param {number} quantity - Quantité perdue
   * @param {string} reason - Raison de la perte
   * @returns {Object} - {ingredient, lotsUsed, trace}
   * @throws {StockError} Si stock insuffisant
   */
  static recordLoss(ingredient, quantity, reason = '') {
    // Utilise la même logique FIFO que deductStock
    const result = this.deductStock(ingredient, quantity);
    
    // Trace spécifique pour perte
    const trace = {
      ...result.trace,
      type: 'PERTE',
      reason: reason || 'Non spécifiée',
      cost: result.lotsUsed.reduce((sum, l) => sum + l.cost, 0)
    };
    
    return { ...result, trace };
  }
  
  /**
   * Ajuste le stock lors d'un inventaire
   * ✅ CORRIGE BUG #2 : Inventaire cohérent (pas de double écriture)
   * 
   * @param {Ingredient} ingredient - Ingrédient
   * @param {number} realStock - Stock réel constaté
   * @param {string} note - Note de l'inventaire
   * @returns {Object} - {ingredient, delta, trace}
   */
  static adjustInventory(ingredient, realStock, note = '') {
    const theoricalStock = ingredient.getBaseQtyRemaining();
    const delta = realStock - theoricalStock;
    
    let trace = {
      id: generateUUID(),
      type: 'INVENTAIRE',
      ingredientId: ingredient.id,
      ingredientName: ingredient.name,
      theoricalStock,
      realStock,
      delta,
      note,
      timestamp: new Date()
    };
    
    if (delta === 0) {
      // Stock conforme
      trace.status = 'CONFORME';
      trace.cost = 0;
    } else if (delta < 0) {
      // Manque : perte FIFO
      const lossResult = this.recordLoss(ingredient, Math.abs(delta), 'Inventaire : manque');
      trace.status = 'MANQUE';
      trace.cost = lossResult.lotsUsed.reduce((sum, l) => sum + l.cost, 0);
      trace.lotsUsed = lossResult.lotsUsed;
    } else {
      // Surplus : créer un nouveau lot
      const surplusLot = new Lot({
        id: generateUUID(),
        quantiteInitiale: delta,
        quantite: delta,
        prixTotal: 0, // Surplus sans coût
        fraisApproche: 0,
        dlc: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 jours par défaut
        dateReception: new Date(),
        fournisseur: 'Inventaire',
        numeroLot: `INV-${Date.now()}`,
        epuise: false
      });
      
      ingredient.addLot(surplusLot);
      
      trace.status = 'SURPLUS';
      trace.cost = 0;
      trace.lotCreated = surplusLot.id;
    }
    
    // ✅ Le stock est recalculé automatiquement depuis les lots
    // Pas de `syncIngredientAggregatesAfterDelta(delta)` qui fait double comptage
    
    ingredient.updatedAt = new Date();
    
    return { ingredient, delta, trace };
  }
  
  /**
   * Calcule la valeur totale du stock d'un ingrédient
   * Calcul direct depuis les lots (FIFO)
   * @param {Ingredient} ingredient - Ingrédient
   * @returns {number} - Valeur en FCFA
   */
  static getStockValue(ingredient) {
    let totalValue = 0;
    
    // Si c'est une vraie instance avec getPriceTotal, l'utiliser
    if (typeof ingredient.getPriceTotal === 'function') {
      try {
        return ingredient.getPriceTotal();
      } catch (err) {
        console.warn('getPriceTotal failed, calculating manually:', err);
      }
    }
    
    // Sinon calcul manuel depuis les lots
    if (ingredient.lots && Array.isArray(ingredient.lots)) {
      for (const lot of ingredient.lots) {
        if (!lot.epuise && lot.quantite > 0) {
          // Valeur = quantité restante × coût unitaire
          if (typeof lot.getValeurActuelle === 'function') {
            totalValue += lot.getValeurActuelle();
          } else {
            // Calcul manuel si pas de méthode
            const coutUnitaire = (lot.prixTotal + (lot.fraisApproche || 0)) / lot.quantiteInitiale;
            totalValue += lot.quantite * coutUnitaire;
          }
        }
      }
    }
    
    // Fallback: propriété stockValue si présente
    if (totalValue === 0 && ingredient.stockValue) {
      totalValue = ingredient.stockValue;
    }
    
    return Math.round(totalValue);
  }
  
  /**
   * Récupère les alertes d'un ingrédient
   * @param {Ingredient} ingredient - Ingrédient
   * @returns {Object[]} - Liste des alertes
   */
  static getAlerts(ingredient) {
    return ingredient.getAlerts();
  }
  
  /**
   * Nettoie les lots épuisés anciens (>30 jours)
   * @param {Ingredient} ingredient - Ingrédient
   */
  static cleanupOldLots(ingredient) {
    ingredient.cleanupEmptyLots();
    ingredient.updatedAt = new Date();
  }
}
