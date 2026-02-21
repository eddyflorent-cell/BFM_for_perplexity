/**
 * Modèle Sale - Représente une vente
 * @module core/models/Sale
 */

/**
 * Ligne de vente (produit vendu)
 */
export class SaleItem {
  /**
   * @param {Object} data
   * @param {string} data.type - Type (recipe, pack)
   * @param {string} data.itemId - ID de la recette ou du pack
   * @param {string} data.itemName - Nom du produit
   * @param {number} data.quantity - Quantité vendue
   * @param {string} data.unit - Unité
   * @param {number} data.unitPrice - Prix unitaire
   * @param {number} data.revenue - CA (quantity × unitPrice)
   * @param {number} data.cogs - Coût de revient
   * @param {number} data.margin - Marge (revenue - cogs)
   */
  constructor(data) {
    this.type = data.type; // 'recipe' ou 'pack'
    this.itemId = data.itemId;
    this.itemName = data.itemName;
    this.quantity = Number(data.quantity);
    this.unit = data.unit;
    this.unitPrice = Number(data.unitPrice);
    this.revenue = Number(data.revenue);
    this.cogs = Number(data.cogs);
    this.margin = Number(data.margin);
  }

  /**
   * Marge en pourcentage
   * @returns {number}
   */
  getMarginPercent() {
    if (this.revenue === 0) return 0;
    return (this.margin / this.revenue) * 100;
  }

  toJSON() {
    return {
      type: this.type,
      itemId: this.itemId,
      itemName: this.itemName,
      quantity: this.quantity,
      unit: this.unit,
      unitPrice: this.unitPrice,
      revenue: this.revenue,
      cogs: this.cogs,
      margin: this.margin
    };
  }

  static fromJSON(json) {
    return new SaleItem(json);
  }
}

/**
 * Classe Sale
 * Représente une vente avec lignes, CA, COGS, marge, commission
 */
export class Sale {
  /**
   * @param {Object} data
   * @param {string} data.id - ID unique
   * @param {SaleItem[]} data.items - Lignes de vente
   * @param {number} data.revenue - CA total
   * @param {number} data.cogs - Coût de revient total
   * @param {number} data.margin - Marge totale
   * @param {number} data.marginPercent - Marge en %
   * @param {string} [data.vendorId] - ID du vendeur
   * @param {string} [data.vendorName] - Nom du vendeur
   * @param {number} [data.commissionRate] - Taux de commission (%)
   * @param {number} [data.commission] - Commission vendeur
   * @param {Date} data.saleDate - Date de vente
   * @param {string} [data.notes] - Notes
   */
  constructor(data) {
    this.id = data.id;
    this.items = Array.isArray(data.items) ? data.items.map(i =>
      i instanceof SaleItem ? i : SaleItem.fromJSON(i)
    ) : [];
    this.revenue = Number(data.revenue);
    this.cogs = Number(data.cogs);
    this.margin = Number(data.margin);
    this.marginPercent = Number(data.marginPercent);
    this.vendorId = data.vendorId || null;
    this.vendorName = data.vendorName || '';
    this.commissionRate = Number(data.commissionRate) || 0;
    this.commission = Number(data.commission) || 0;
    this.saleDate = data.saleDate instanceof Date ? data.saleDate : new Date(data.saleDate);
    this.notes = data.notes || '';
  }

  /**
   * Ajoute une ligne de vente
   * @param {SaleItem} item
   */
  addItem(item) {
    if (!(item instanceof SaleItem)) {
      throw new Error('L\'item doit être une instance de SaleItem');
    }
    this.items.push(item);
    this.recalculate();
  }

  /**
   * Recalcule les totaux
   */
  recalculate() {
    this.revenue = this.items.reduce((sum, i) => sum + i.revenue, 0);
    this.cogs = this.items.reduce((sum, i) => sum + i.cogs, 0);
    this.margin = this.revenue - this.cogs;
    this.marginPercent = this.revenue > 0 ? (this.margin / this.revenue) * 100 : 0;
    
    // Recalculer commission (même si rate = 0)
    if (this.commissionRate > 0) {
      this.commission = Math.round((this.revenue * this.commissionRate) / 100);
    } else {
      this.commission = 0;
    }
  }

  /**
   * Bénéfice net (marge - commission)
   * @returns {number}
   */
  getNetProfit() {
    return this.margin - this.commission;
  }

  toJSON() {
    return {
      id: this.id,
      items: this.items.map(i => i.toJSON()),
      revenue: this.revenue,
      cogs: this.cogs,
      margin: this.margin,
      marginPercent: this.marginPercent,
      vendorId: this.vendorId,
      vendorName: this.vendorName,
      commissionRate: this.commissionRate,
      commission: this.commission,
      saleDate: this.saleDate.toISOString(),
      notes: this.notes
    };
  }

  static fromJSON(json) {
    return new Sale({
      id: json.id,
      items: json.items || [],
      revenue: json.revenue,
      cogs: json.cogs,
      margin: json.margin,
      marginPercent: json.marginPercent,
      vendorId: json.vendorId,
      vendorName: json.vendorName,
      commissionRate: json.commissionRate,
      commission: json.commission,
      saleDate: json.saleDate,
      notes: json.notes
    });
  }
}
