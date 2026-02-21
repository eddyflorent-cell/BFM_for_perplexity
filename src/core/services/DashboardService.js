/**
 * Service de calculs dashboard
 * Corrige le bug #18 identifié dans l'audit
 * @module core/services/DashboardService
 */

import { IngredientService } from './IngredientService.js';

/**
 * Service de calculs dashboard
 * Recalcule TOUTES les valeurs depuis les sources (pas d'agrégats)
 */
export class DashboardService {
  
  /**
   * Calcule la valeur du stock ingrédients
   * ✅ CORRIGE BUG #18 : Recalculé depuis les lots (pas agrégats)
   * 
   * @param {Ingredient[]} ingredients - Liste des ingrédients
   * @returns {number} - Valeur totale en FCFA
   */
  static getIngredientsStockValue(ingredients) {
    return ingredients.reduce((total, ing) => {
      // ✅ Utilise IngredientService.getStockValue qui recalcule depuis les lots
      return total + IngredientService.getStockValue(ing);
    }, 0);
  }
  
  /**
   * Calcule la valeur du stock produits finis
   * ✅ CORRIGE BUG #18 : Recalculé depuis les productions (pas agrégats)
   * ✅ ROBUSTE : Gère objets JSON et instances de classe
   * 
   * @param {Production[]} productions - Liste des productions
   * @returns {number} - Valeur totale en FCFA
   */
  static getFinishedGoodsStockValue(productions) {
    return productions.reduce((total, prod) => {
      // ✅ Si c'est une instance avec méthode getRemainingValue
      if (typeof prod.getRemainingValue === 'function') {
        return total + prod.getRemainingValue();
      }
      
      // ✅ Sinon calcul manuel (objet JSON simple)
      const remainingQty = Number(prod.remainingQty) || 0;
      const producedQty = Number(prod.producedQty) || 1;
      const costTotal = Number(prod.costTotal) || 0;
      
      const remainingValue = (remainingQty / producedQty) * costTotal;
      return total + remainingValue;
    }, 0);
  }
  
  /**
   * Calcule le CA (chiffre d'affaires) total
   * 
   * @param {Sale[]} sales - Liste des ventes
   * @param {Date} [startDate] - Date de début (optionnel)
   * @param {Date} [endDate] - Date de fin (optionnel)
   * @returns {number} - CA en FCFA
   */
  static getTotalRevenue(sales, startDate = null, endDate = null) {
    let filteredSales = sales;
    
    if (startDate) {
      filteredSales = filteredSales.filter(s => s.saleDate >= startDate);
    }
    
    if (endDate) {
      filteredSales = filteredSales.filter(s => s.saleDate <= endDate);
    }
    
    return filteredSales.reduce((sum, s) => sum + s.revenue, 0);
  }
  
  /**
   * Calcule le COGS (Cost of Goods Sold) total
   * 
   * @param {Sale[]} sales - Liste des ventes
   * @param {Date} [startDate] - Date de début (optionnel)
   * @param {Date} [endDate] - Date de fin (optionnel)
   * @returns {number} - COGS en FCFA
   */
  static getTotalCOGS(sales, startDate = null, endDate = null) {
    let filteredSales = sales;
    
    if (startDate) {
      filteredSales = filteredSales.filter(s => s.saleDate >= startDate);
    }
    
    if (endDate) {
      filteredSales = filteredSales.filter(s => s.saleDate <= endDate);
    }
    
    return filteredSales.reduce((sum, s) => sum + s.cogs, 0);
  }
  
  /**
   * Calcule la marge brute totale
   * 
   * @param {Sale[]} sales - Liste des ventes
   * @param {Date} [startDate] - Date de début (optionnel)
   * @param {Date} [endDate] - Date de fin (optionnel)
   * @returns {number} - Marge en FCFA
   */
  static getTotalMargin(sales, startDate = null, endDate = null) {
    const revenue = this.getTotalRevenue(sales, startDate, endDate);
    const cogs = this.getTotalCOGS(sales, startDate, endDate);
    return revenue - cogs;
  }
  
  /**
   * Calcule le taux de marge moyen
   * 
   * @param {Sale[]} sales - Liste des ventes
   * @param {Date} [startDate] - Date de début (optionnel)
   * @param {Date} [endDate] - Date de fin (optionnel)
   * @returns {number} - Taux en %
   */
  static getAverageMarginPercent(sales, startDate = null, endDate = null) {
    const revenue = this.getTotalRevenue(sales, startDate, endDate);
    if (revenue === 0) return 0;
    
    const margin = this.getTotalMargin(sales, startDate, endDate);
    return (margin / revenue) * 100;
  }
  
  /**
   * Calcule le total des commissions
   * 
   * @param {Sale[]} sales - Liste des ventes
   * @param {Date} [startDate] - Date de début (optionnel)
   * @param {Date} [endDate] - Date de fin (optionnel)
   * @returns {number} - Commissions en FCFA
   */
  static getTotalCommissions(sales, startDate = null, endDate = null) {
    let filteredSales = sales;
    
    if (startDate) {
      filteredSales = filteredSales.filter(s => s.saleDate >= startDate);
    }
    
    if (endDate) {
      filteredSales = filteredSales.filter(s => s.saleDate <= endDate);
    }
    
    return filteredSales.reduce((sum, s) => sum + s.commission, 0);
  }
  
  /**
   * Calcule le bénéfice net (marge - commissions)
   * 
   * @param {Sale[]} sales - Liste des ventes
   * @param {Date} [startDate] - Date de début (optionnel)
   * @param {Date} [endDate] - Date de fin (optionnel)
   * @returns {number} - Bénéfice net en FCFA
   */
  static getNetProfit(sales, startDate = null, endDate = null) {
    const margin = this.getTotalMargin(sales, startDate, endDate);
    const commissions = this.getTotalCommissions(sales, startDate, endDate);
    return margin - commissions;
  }
  
  /**
   * Calcule les statistiques complètes du dashboard
   * ✅ CORRIGE BUG #18 : Toutes les valeurs recalculées depuis sources
   * 
   * @param {Object} data - Toutes les données
   * @param {Ingredient[]} data.ingredients - Ingrédients
   * @param {Production[]} data.productions - Productions
   * @param {Sale[]} data.sales - Ventes
   * @param {Object[]} [data.expenses] - Dépenses (optionnel)
   * @param {Date} [startDate] - Date de début (optionnel)
   * @param {Date} [endDate] - Date de fin (optionnel)
   * @returns {Object} - Statistiques complètes
   */
  static getDashboardStats(data, startDate = null, endDate = null) {
    const { ingredients = [], productions = [], sales = [], expenses = [] } = data;
    
    // ✅ Stock ingrédients : recalculé depuis lots
    const ingredientsStockValue = this.getIngredientsStockValue(ingredients);
    
    // ✅ Stock produits finis : recalculé depuis productions
    const finishedGoodsStockValue = this.getFinishedGoodsStockValue(productions);
    
    // ✅ Valeur stock totale
    const totalStockValue = ingredientsStockValue + finishedGoodsStockValue;
    
    // ✅ Filtrer les ventes par période
    let filteredSales = sales;
    if (startDate) {
      filteredSales = filteredSales.filter(s => s.saleDate >= startDate);
    }
    if (endDate) {
      filteredSales = filteredSales.filter(s => s.saleDate <= endDate);
    }
    
    // ✅ CA, COGS, marge : recalculés depuis ventes
    const revenue = this.getTotalRevenue(sales, startDate, endDate);
    const cogs = this.getTotalCOGS(sales, startDate, endDate);
    const margin = revenue - cogs;
    const marginPercent = revenue > 0 ? (margin / revenue) * 100 : 0;
    
    // ✅ Commissions
    const commissions = this.getTotalCommissions(sales, startDate, endDate);
    
    // ✅ Dépenses
    let totalExpenses = 0;
    if (expenses.length > 0) {
      totalExpenses = expenses
        .filter(e => {
          if (startDate && new Date(e.date) < startDate) return false;
          if (endDate && new Date(e.date) > endDate) return false;
          return true;
        })
        .reduce((sum, e) => sum + (e.amount || 0), 0);
    }
    
    // ✅ Bénéfice net : marge - commissions - dépenses
    const netProfit = margin - commissions - totalExpenses;
    
    // ✅ Alertes
    const alerts = this.getAlerts(ingredients, productions);
    
    return {
      stock: {
        ingredients: ingredientsStockValue,
        finishedGoods: finishedGoodsStockValue,
        total: totalStockValue
      },
      sales: {
        count: filteredSales.length,
        revenue,
        cogs,
        margin,
        marginPercent
      },
      costs: {
        commissions,
        expenses: totalExpenses,
        total: commissions + totalExpenses
      },
      profit: {
        gross: margin,
        net: netProfit
      },
      alerts
    };
  }
  
  /**
   * Récupère toutes les alertes (stock bas, DLC proches)
   * 
   * @param {Ingredient[]} ingredients - Ingrédients
   * @param {Production[]} productions - Productions
   * @returns {Object[]} - Liste des alertes
   */
  static getAlerts(ingredients, productions) {
    const alerts = [];
    
    // Alertes ingrédients (stock bas, DLC)
    for (const ing of ingredients) {
      const ingAlerts = IngredientService.getAlerts(ing);
      alerts.push(...ingAlerts);
    }
    
    // Alertes productions (DLC proches pour produits finis)
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    for (const prod of productions) {
      if (prod.remainingQty === 0) continue;
      
      // Vérifier DLC des lots utilisés
      for (const usedLot of prod.lotsUsed) {
        if (usedLot.dlc < sevenDaysFromNow) {
          alerts.push({
            type: 'PRODUCTION_DLC',
            severity: usedLot.dlc < now ? 'error' : 'warning',
            message: `Production "${prod.recipeName}" : DLC proche (lot ${usedLot.lotId.slice(0, 8)})`,
            productionId: prod.id,
            dlc: usedLot.dlc
          });
        }
      }
    }
    
    return alerts;
  }
  
  /**
   * Calcule les produits les plus vendus
   * 
   * @param {Sale[]} sales - Liste des ventes
   * @param {number} [limit=10] - Nombre de produits à retourner
   * @returns {Object[]} - [{itemId, itemName, totalQty, totalRevenue}]
   */
  static getTopSellingProducts(sales, limit = 10) {
    const productStats = {};
    
    for (const sale of sales) {
      for (const item of sale.items) {
        if (!productStats[item.itemId]) {
          productStats[item.itemId] = {
            itemId: item.itemId,
            itemName: item.itemName,
            totalQty: 0,
            totalRevenue: 0
          };
        }
        
        productStats[item.itemId].totalQty += item.quantity;
        productStats[item.itemId].totalRevenue += item.revenue;
      }
    }
    
    return Object.values(productStats)
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, limit);
  }
}
