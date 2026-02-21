/**
 * Modèle Ingredient - Représente un ingrédient avec ses lots
 * @module core/models/Ingredient
 */

import { Lot } from './Lot.js';
import { BaseUnit } from '../utils/units.js';

/**
 * Classe Ingredient
 * Représente un ingrédient avec gestion multi-lots (FIFO)
 */
export class Ingredient {
  /**
   * Crée un nouvel ingrédient
   * @param {Object} data - Données de l'ingrédient
   * @param {string} data.id - ID unique
   * @param {string} data.name - Nom de l'ingrédient
   * @param {string} [data.category] - Catégorie (Sec, Frais, etc.)
   * @param {string} data.baseUnit - Unité de base (g, ml, piece)
   * @param {string} [data.displayUnit] - Unité d'affichage (kg, L, piece)
   * @param {number} [data.alertBaseQty] - Seuil d'alerte stock bas
   * @param {Lot[]} [data.lots] - Liste des lots
   * @param {Date} [data.createdAt] - Date de création
   * @param {Date} [data.updatedAt] - Date de dernière modification
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.category = data.category || '';
    this.baseUnit = data.baseUnit;
    this.displayUnit = data.displayUnit || data.baseUnit;
    this.alertBaseQty = Number(data.alertBaseQty) || 0;
    this.yieldPercent = Number(data.yieldPercent) || 100; // Rendement (100% = pas de perte)
    this.wasteType = data.wasteType || ''; // Type de déchet (épluchures, os, etc.)
    this.lots = Array.isArray(data.lots) ? data.lots.map(l => 
      l instanceof Lot ? l : Lot.fromJSON(l)
    ) : [];
    this.createdAt = data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt || Date.now());
    this.updatedAt = data.updatedAt instanceof Date ? data.updatedAt : new Date(data.updatedAt || Date.now());
  }

  /**
   * Quantité totale initiale (somme de tous les lots initiaux)
   * @returns {number}
   */
  getBaseQtyTotal() {
    return this.lots.reduce((sum, lot) => sum + lot.quantiteInitiale, 0);
  }

  /**
   * Quantité restante (somme de tous les lots restants)
   * @returns {number}
   */
  getBaseQtyRemaining() {
    return this.lots.reduce((sum, lot) => sum + lot.quantite, 0);
  }

  /**
   * Prix total (somme des coûts de tous les lots restants)
   * Calcul en EUR base pour multi-devises (v51)
   * @returns {number}
   */
  getPriceTotal() {
    return this.lots.reduce((sum, lot) => {
      // v51 : Utilise la valeur en EUR (conversion automatique)
      const valeurEUR = lot.getValeurActuelleEUR ? lot.getValeurActuelleEUR() : lot.getValeurActuelle();
      return sum + valeurEUR;
    }, 0);
  }

  /**
   * Prix unitaire moyen actuel (prix total / quantité restante)
   * @returns {number}
   */
  getPricePerBaseUnit() {
    const remaining = this.getBaseQtyRemaining();
    if (remaining === 0) return 0;
    return this.getPriceTotal() / remaining;
  }

  /**
   * Ajoute un lot à l'ingrédient
   * @param {Lot} lot - Lot à ajouter
   */
  addLot(lot) {
    if (!(lot instanceof Lot)) {
      throw new Error('Le lot doit être une instance de Lot');
    }
    
    this.lots.push(lot);
    this.updatedAt = new Date();
    
    // Trier les lots par FIFO après ajout
    this.sortLotsFIFO();
  }

  /**
   * Trie les lots selon FIFO (DLC puis date réception)
   */
  sortLotsFIFO() {
    this.lots.sort(Lot.compareFIFO);
  }

  /**
   * Récupère les lots disponibles (non épuisés, quantité > 0)
   * @returns {Lot[]}
   */
  getAvailableLots() {
    return this.lots.filter(lot => lot.isAvailable());
  }

  /**
   * Récupère les lots expirés
   * @returns {Lot[]}
   */
  getExpiredLots() {
    return this.lots.filter(lot => lot.isExpired() && lot.isAvailable());
  }

  /**
   * Vérifie si l'ingrédient a des alertes
   * @returns {Object[]} - Liste des alertes
   */
  getAlerts() {
    const alerts = [];
    
    // Alerte stock bas
    const remaining = this.getBaseQtyRemaining();
    if (remaining < this.alertBaseQty) {
      alerts.push({
        type: 'LOW_STOCK',
        severity: 'warning',
        message: `Stock bas : ${remaining} ${this.baseUnit} (seuil : ${this.alertBaseQty})`
      });
    }
    
    // Alertes DLC proches (< 7 jours)
    const now = new Date();
    for (const lot of this.getAvailableLots()) {
      const days = lot.daysUntilExpiry();
      if (days < 7 && days >= 0) {
        alerts.push({
          type: 'DLC_WARNING',
          severity: days < 3 ? 'error' : 'warning',
          message: `DLC proche : lot ${lot.numeroLot || lot.id.slice(0, 8)} expire dans ${days} jour(s)`,
          lotId: lot.id,
          dlc: lot.dlc
        });
      } else if (days < 0) {
        alerts.push({
          type: 'DLC_EXPIRED',
          severity: 'error',
          message: `DLC DÉPASSÉE : lot ${lot.numeroLot || lot.id.slice(0, 8)} expiré depuis ${Math.abs(days)} jour(s)`,
          lotId: lot.id,
          dlc: lot.dlc
        });
      }
    }
    
    return alerts;
  }

  /**
   * Vérifie si l'ingrédient a assez de stock
   * @param {number} quantity - Quantité demandée
   * @returns {boolean}
   */
  hasStock(quantity) {
    return this.getBaseQtyRemaining() >= quantity;
  }

  /**
   * Nettoie les lots épuisés (garde l'historique des 30 derniers jours)
   */
  cleanupEmptyLots() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    this.lots = this.lots.filter(lot => {
      // Garder les lots non épuisés
      if (lot.quantite > 0) return true;
      
      // Garder les lots épuisés récents (< 30 jours)
      return lot.dateReception >= thirtyDaysAgo;
    });
  }

  /**
   * Sérialise l'ingrédient en objet simple (pour JSON)
   * @returns {Object}
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      baseUnit: this.baseUnit,
      displayUnit: this.displayUnit,
      alertBaseQty: this.alertBaseQty,
      yieldPercent: this.yieldPercent,
      wasteType: this.wasteType,
      lots: this.lots.map(lot => lot.toJSON()),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      // Propriétés dérivées (calculées, pas stockées)
      baseQtyTotal: this.getBaseQtyTotal(),
      baseQtyRemaining: this.getBaseQtyRemaining(),
      priceTotal: this.getPriceTotal(),
      pricePerBaseUnit: this.getPricePerBaseUnit()
    };
  }

  /**
   * Crée un ingrédient à partir d'un objet JSON
   * @param {Object} json - Objet JSON
   * @returns {Ingredient}
   */
  static fromJSON(json) {
    return new Ingredient({
      id: json.id,
      name: json.name,
      category: json.category || '',
      baseUnit: json.baseUnit,
      displayUnit: json.displayUnit,
      alertBaseQty: json.alertBaseQty || 0,
      yieldPercent: json.yieldPercent || 100,
      wasteType: json.wasteType || '',
      lots: json.lots || [],
      createdAt: json.createdAt,
      updatedAt: json.updatedAt
    });
  }
}
