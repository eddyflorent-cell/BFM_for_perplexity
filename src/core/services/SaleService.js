/**
 * Service de gestion des ventes
 * Corrige les bugs #15, #16, #17 identifiés dans l'audit
 * @module core/services/SaleService
 */

import { Sale, SaleItem } from '../models/Sale.js';
import { RecipeService } from './RecipeService.js';
import { ValidationError, StockError } from './IngredientService.js';
import { generateUUID } from '../utils/uuid.js';

/**
 * Service de gestion des ventes
 * Logique métier pure (zéro dépendances UI/DOM)
 */
export class SaleService {
  
  /**
   * Valide une vente avant création
   * ✅ CORRIGE BUG #17 : Commission vendeur validée (0-100%)
   * 
   * @param {Object} data - Données de la vente
   * @returns {string[]} - Liste des erreurs
   */
  static validate(data) {
    const errors = [];
    
    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      errors.push('Au moins un produit est requis');
    }
    
    // Valider chaque ligne
    if (Array.isArray(data.items)) {
      data.items.forEach((item, index) => {
        if (!item.itemId) {
          errors.push(`Ligne ${index + 1} : Produit manquant`);
        }
        if (!item.quantity || item.quantity <= 0) {
          errors.push(`Ligne ${index + 1} : Quantité invalide`);
        }
        // ✅ Validation stricte du prix
        const price = Number(item.unitPrice);
        if (item.unitPrice === undefined || isNaN(price) || price < 0) {
          errors.push(`Ligne ${index + 1} : Prix invalide`);
        }
      });
    }
    
    // ✅ BUG #17 CORRIGÉ : Validation commission (0-100%)
    if (data.commissionRate !== undefined) {
      const rate = Number(data.commissionRate);
      if (isNaN(rate) || rate < 0 || rate > 100) {
        errors.push('La commission doit être entre 0% et 100%');
      }
    }
    
    return errors;
  }
  
  /**
   * Crée une vente avec COGS FIFO et validation
   * ✅ CORRIGE BUG #15 : COGS basé sur FIFO productions (pas moyenne)
   * ✅ CORRIGE BUG #16 : Vérifie stock productions avant vente
   * 
   * @param {Object} data - Données de la vente
   * @param {Production[]} productions - Productions disponibles
   * @param {Object} [vendor] - Vendeur (optionnel)
   * @returns {Object} - {sale, productionUpdates, trace}
   * @throws {ValidationError} Si données invalides
   * @throws {StockError} Si stock insuffisant
   */
  static create(data, productions, vendor = null) {
    // Validation
    const errors = this.validate(data);
    if (errors.length > 0) {
      throw new ValidationError('Vente invalide', errors);
    }
    
    const saleItems = [];
    const productionUpdates = [];
    let totalRevenue = 0;
    let totalCOGS = 0;
    
    // ✅ Traiter chaque ligne de vente
    for (const itemData of data.items) {
      const quantity = Number(itemData.quantity);
      const unitPrice = Number(itemData.unitPrice);
      const revenue = quantity * unitPrice;
      
      // ✅ BUG #15 CORRIGÉ : COGS FIFO depuis productions (pas moyenne globale)
      // ✅ BUG #16 CORRIGÉ : Vérifie le stock des productions avant de vendre
      
      // Filtrer les productions pour ce produit
      const productionsForItem = productions.filter(p => 
        p.recipeId === itemData.itemId && p.remainingQty > 0
      );
      
      // Vérifier stock disponible AVANT de vendre
      const availableQty = productionsForItem.reduce((sum, p) => sum + p.remainingQty, 0);
      
      if (quantity > availableQty) {
        throw new StockError(
          `Stock insuffisant pour ${itemData.itemName}`,
          {
            itemId: itemData.itemId,
            itemName: itemData.itemName,
            available: availableQty,
            requested: quantity
          }
        );
      }
      
      // Calculer COGS avec FIFO sur les productions
      const cogsResult = RecipeService.calculateCOGS(productionsForItem, quantity);
      const cogs = cogsResult.cogs;
      const margin = revenue - cogs;
      
      // Créer la ligne de vente
      const saleItem = new SaleItem({
        type: itemData.type || 'recipe',
        itemId: itemData.itemId,
        itemName: itemData.itemName,
        quantity,
        unit: itemData.unit || 'piece',
        unitPrice,
        revenue,
        cogs,
        margin
      });
      
      saleItems.push(saleItem);
      totalRevenue += revenue;
      totalCOGS += cogs;
      
      // Déduire des productions
      for (const used of cogsResult.productionsUsed) {
        const production = productionsForItem.find(p => p.id === used.productionId);
        if (production) {
          production.deduct(used.quantity);
          
          productionUpdates.push({
            productionId: production.id,
            production
          });
        }
      }
    }
    
    const totalMargin = totalRevenue - totalCOGS;
    const marginPercent = totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0;
    
    // ✅ BUG #17 CORRIGÉ : Commission validée et calculée correctement
    let commissionRate = 0;
    let commission = 0;
    
    if (vendor) {
      commissionRate = Number(vendor.commissionRate) || 0;
      
      // Clamper entre 0 et 100
      commissionRate = Math.max(0, Math.min(100, commissionRate));
      
      // Calculer commission sur le CA
      commission = Math.round((totalRevenue * commissionRate) / 100);
    }
    
    // Créer la vente
    const sale = new Sale({
      id: generateUUID(),
      items: saleItems,
      revenue: totalRevenue,
      cogs: totalCOGS,
      margin: totalMargin,
      marginPercent,
      vendorId: vendor?.id || null,
      vendorName: vendor?.name || '',
      commissionRate,
      commission,
      saleDate: new Date(),
      notes: data.notes || ''
    });
    
    // Trace pour historique
    const trace = {
      id: generateUUID(),
      type: 'VENTE',
      saleId: sale.id,
      items: saleItems.map(i => ({
        itemId: i.itemId,
        itemName: i.itemName,
        quantity: i.quantity,
        revenue: i.revenue,
        cogs: i.cogs,
        margin: i.margin
      })),
      revenue: totalRevenue,
      cogs: totalCOGS,
      margin: totalMargin,
      commission,
      vendorName: vendor?.name || '',
      timestamp: new Date()
    };
    
    return { sale, productionUpdates, trace };
  }
  
  /**
   * Annule une vente (rollback)
   * Restaure le stock des productions
   * 
   * @param {Sale} sale - Vente à annuler
   * @param {Production[]} productions - Productions
   * @returns {Object} - {productionUpdates, trace}
   */
  static cancel(sale, productions) {
    const productionUpdates = [];
    
    // Pour chaque ligne, retrouver et restaurer les productions
    // NOTE: Simplifié ici car on n'a pas stocké le détail des productions utilisées
    // Dans une vraie implémentation, il faudrait stocker productionsUsed dans Sale
    
    for (const item of sale.items) {
      const productionsForItem = productions
        .filter(p => p.recipeId === item.itemId)
        .sort((a, b) => a.productionDate.getTime() - b.productionDate.getTime());
      
      let remaining = item.quantity;
      
      for (const production of productionsForItem) {
        if (remaining <= 0) break;
        
        const toRestore = Math.min(remaining, production.producedQty - production.remainingQty);
        
        if (toRestore > 0) {
          production.restore(toRestore);
          remaining -= toRestore;
          
          productionUpdates.push({
            productionId: production.id,
            production
          });
        }
      }
    }
    
    // Trace
    const trace = {
      id: generateUUID(),
      type: 'ANNULATION_VENTE',
      saleId: sale.id,
      revenue: sale.revenue,
      cogs: sale.cogs,
      timestamp: new Date()
    };
    
    return { productionUpdates, trace };
  }
  
  /**
   * Calcule les statistiques de ventes
   * 
   * @param {Sale[]} sales - Liste des ventes
   * @param {Date} [startDate] - Date de début (optionnel)
   * @param {Date} [endDate] - Date de fin (optionnel)
   * @returns {Object} - Statistiques
   */
  static getStatistics(sales, startDate = null, endDate = null) {
    // Filtrer par date si nécessaire
    let filteredSales = sales;
    
    if (startDate) {
      filteredSales = filteredSales.filter(s => s.saleDate >= startDate);
    }
    
    if (endDate) {
      filteredSales = filteredSales.filter(s => s.saleDate <= endDate);
    }
    
    if (filteredSales.length === 0) {
      return {
        count: 0,
        revenue: 0,
        cogs: 0,
        margin: 0,
        marginPercent: 0,
        commission: 0,
        netProfit: 0
      };
    }
    
    const revenue = filteredSales.reduce((sum, s) => sum + s.revenue, 0);
    const cogs = filteredSales.reduce((sum, s) => sum + s.cogs, 0);
    const margin = revenue - cogs;
    const marginPercent = revenue > 0 ? (margin / revenue) * 100 : 0;
    const commission = filteredSales.reduce((sum, s) => sum + s.commission, 0);
    const netProfit = margin - commission;
    
    return {
      count: filteredSales.length,
      revenue,
      cogs,
      margin,
      marginPercent,
      commission,
      netProfit
    };
  }
  
  /**
   * Trouve les ventes d'une période
   * 
   * @param {Sale[]} sales - Liste des ventes
   * @param {Date} startDate - Date de début
   * @param {Date} endDate - Date de fin
   * @returns {Sale[]}
   */
  static findByPeriod(sales, startDate, endDate) {
    return sales.filter(s => 
      s.saleDate >= startDate && s.saleDate <= endDate
    );
  }
  
  /**
   * Trouve les ventes d'un vendeur
   * 
   * @param {Sale[]} sales - Liste des ventes
   * @param {string} vendorId - ID du vendeur
   * @returns {Sale[]}
   */
  static findByVendor(sales, vendorId) {
    return sales.filter(s => s.vendorId === vendorId);
  }
}
