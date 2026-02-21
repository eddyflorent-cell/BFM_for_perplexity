/**
 * Modèle Production - Représente une production de recette avec traçabilité
 * @module core/models/Production
 */

/**
 * Lot d'ingrédient utilisé dans une production
 */
export class UsedLot {
  /**
   * @param {Object} data
   * @param {string} data.ingredientId - ID de l'ingrédient
   * @param {string} data.lotId - ID du lot
   * @param {number} data.quantity - Quantité consommée
   * @param {number} data.cost - Coût réel du lot consommé
   * @param {Date} data.dlc - DLC du lot
   */
  constructor(data) {
    this.ingredientId = data.ingredientId;
    this.lotId = data.lotId;
    this.quantity = Number(data.quantity);
    this.cost = Number(data.cost);
    this.dlc = data.dlc instanceof Date ? data.dlc : new Date(data.dlc);
  }

  toJSON() {
    return {
      ingredientId: this.ingredientId,
      lotId: this.lotId,
      quantity: this.quantity,
      cost: this.cost,
      dlc: this.dlc.toISOString()
    };
  }

  static fromJSON(json) {
    return new UsedLot(json);
  }
}

/**
 * Classe Production
 * Représente une production de recette avec traçabilité HACCP complète
 */
export class Production {
  /**
   * @param {Object} data
   * @param {string} data.id - ID unique
   * @param {string} data.recipeId - ID de la recette
   * @param {string} data.recipeName - Nom de la recette
   * @param {number} data.multiplier - Multiplicateur (nombre de batches)
   * @param {number} data.producedQty - Quantité totale produite
   * @param {string} data.producedUnit - Unité produite
   * @param {number} data.remainingQty - Quantité restante (non vendue)
   * @param {number} data.costTotal - Coût total de revient (COGS)
   * @param {number} data.costPerUnit - Coût unitaire
   * @param {UsedLot[]} data.lotsUsed - Lots consommés (traçabilité)
   * @param {Date} data.productionDate - Date de production
   * @param {string} [data.operator] - Opérateur qui a produit
   * @param {string} [data.notes] - Notes
   */
  constructor(data) {
    this.id = data.id;
    this.recipeId = data.recipeId;
    this.recipeName = data.recipeName;
    this.multiplier = Number(data.multiplier) || 1;
    this.producedQty = Number(data.producedQty);
    this.producedUnit = data.producedUnit;
    this.remainingQty = Number(data.remainingQty) || Number(data.producedQty);
    this.costTotal = Number(data.costTotal);
    this.costPerUnit = Number(data.costPerUnit);
    this.lotsUsed = Array.isArray(data.lotsUsed) ? data.lotsUsed.map(l =>
      l instanceof UsedLot ? l : UsedLot.fromJSON(l)
    ) : [];
    this.productionDate = data.productionDate instanceof Date ? data.productionDate : new Date(data.productionDate);
    this.operator = data.operator || '';
    this.notes = data.notes || '';
  }

  /**
   * Déduit des unités vendues
   * @param {number} quantity - Quantité vendue
   * @throws {Error} Si quantité > remainingQty
   */
  deduct(quantity) {
    const qty = Number(quantity);
    
    if (qty < 0) {
      throw new Error('La quantité ne peut pas être négative');
    }
    
    if (qty > this.remainingQty) {
      throw new Error(
        `Quantité demandée (${qty}) > quantité restante (${this.remainingQty})`
      );
    }
    
    this.remainingQty -= qty;
  }

  /**
   * Restaure des unités (en cas d'annulation de vente)
   * @param {number} quantity - Quantité à restaurer
   */
  restore(quantity) {
    const qty = Number(quantity);
    
    if (qty < 0) {
      throw new Error('La quantité ne peut pas être négative');
    }
    
    this.remainingQty += qty;
    
    // Ne pas dépasser la quantité produite
    if (this.remainingQty > this.producedQty) {
      this.remainingQty = this.producedQty;
    }
  }

  /**
   * Vérifie si la production a du stock disponible
   * @returns {boolean}
   */
  hasStock() {
    return this.remainingQty > 0;
  }

  /**
   * Vérifie si la production est épuisée
   * @returns {boolean}
   */
  isExhausted() {
    return this.remainingQty === 0;
  }

  /**
   * Valeur restante (coût des unités non vendues)
   * @returns {number}
   */
  getRemainingValue() {
    return (this.remainingQty / this.producedQty) * this.costTotal;
  }

  toJSON() {
    return {
      id: this.id,
      recipeId: this.recipeId,
      recipeName: this.recipeName,
      multiplier: this.multiplier,
      producedQty: this.producedQty,
      producedUnit: this.producedUnit,
      remainingQty: this.remainingQty,
      costTotal: this.costTotal,
      costPerUnit: this.costPerUnit,
      lotsUsed: this.lotsUsed.map(l => l.toJSON()),
      productionDate: this.productionDate.toISOString(),
      operator: this.operator,
      notes: this.notes
    };
  }

  static fromJSON(json) {
    return new Production({
      id: json.id,
      recipeId: json.recipeId,
      recipeName: json.recipeName,
      multiplier: json.multiplier,
      producedQty: json.producedQty,
      producedUnit: json.producedUnit,
      remainingQty: json.remainingQty,
      costTotal: json.costTotal,
      costPerUnit: json.costPerUnit,
      lotsUsed: json.lotsUsed || [],
      productionDate: json.productionDate,
      operator: json.operator,
      notes: json.notes
    });
  }
}
