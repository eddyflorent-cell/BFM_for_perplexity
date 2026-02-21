/**
 * Service de gestion des alertes stock et DLC
 * @module core/services/AlertService
 */

import { generateUUID } from '../utils/uuid.js';

/**
 * Types d'alertes
 */
export const AlertType = {
  STOCK_LOW: 'stock_low',
  STOCK_CRITICAL: 'stock_critical',
  DLC_WARNING: 'dlc_warning',
  DLC_CRITICAL: 'dlc_critical',
  DLC_EXPIRED: 'dlc_expired'
};

/**
 * Niveaux de sévérité
 */
export const AlertSeverity = {
  INFO: 'info',
  WARNING: 'warning',
  CRITICAL: 'critical'
};

/**
 * Service de gestion des alertes
 */
export class AlertService {
  
  /**
   * Vérifie toutes les alertes stock pour les ingrédients
   * @param {Ingredient[]} ingredients - Liste des ingrédients
   * @param {Object} settings - Paramètres alertes
   * @returns {Alert[]}
   */
  static checkStockAlerts(ingredients, settings = {}) {
    const alerts = [];
    const defaultThreshold = settings.defaultStockThreshold || 1000;
    
    ingredients.forEach(ingredient => {
      const stock = ingredient.getTotalStock ? ingredient.getTotalStock() : 0;
      const threshold = ingredient.alertBaseQty || defaultThreshold;
      const criticalThreshold = threshold * 0.3; // 30% du seuil = critique
      
      if (stock === 0) {
        alerts.push({
          id: generateUUID(),
          type: AlertType.STOCK_CRITICAL,
          severity: AlertSeverity.CRITICAL,
          ingredientId: ingredient.id,
          ingredientName: ingredient.name,
          message: `Stock épuisé : ${ingredient.name}`,
          details: `Aucun stock disponible. Réapprovisionnement urgent requis.`,
          currentValue: 0,
          threshold: threshold,
          unit: ingredient.baseUnit,
          createdAt: new Date().toISOString(),
          handledAt: null
        });
      } else if (stock <= criticalThreshold) {
        alerts.push({
          id: generateUUID(),
          type: AlertType.STOCK_CRITICAL,
          severity: AlertSeverity.CRITICAL,
          ingredientId: ingredient.id,
          ingredientName: ingredient.name,
          message: `Stock critique : ${ingredient.name}`,
          details: `Seuil critique atteint : ${stock} ${ingredient.baseUnit} restants (seuil : ${threshold})`,
          currentValue: stock,
          threshold: threshold,
          unit: ingredient.baseUnit,
          createdAt: new Date().toISOString(),
          handledAt: null
        });
      } else if (stock <= threshold) {
        alerts.push({
          id: generateUUID(),
          type: AlertType.STOCK_LOW,
          severity: AlertSeverity.WARNING,
          ingredientId: ingredient.id,
          ingredientName: ingredient.name,
          message: `Stock faible : ${ingredient.name}`,
          details: `Stock : ${stock} ${ingredient.baseUnit} (seuil : ${threshold})`,
          currentValue: stock,
          threshold: threshold,
          unit: ingredient.baseUnit,
          createdAt: new Date().toISOString(),
          handledAt: null
        });
      }
    });
    
    return alerts;
  }
  
  /**
   * Vérifie les alertes DLC pour les ingrédients
   * @param {Ingredient[]} ingredients - Liste des ingrédients
   * @param {Object} settings - Paramètres alertes
   * @returns {Alert[]}
   */
  static checkDLCAlerts(ingredients, settings = {}) {
    const alerts = [];
    const warningDays = settings.dlcWarningDays || 7;
    const criticalDays = settings.dlcCriticalDays || 3;
    const now = new Date();
    
    ingredients.forEach(ingredient => {
      if (!ingredient.lots || ingredient.lots.length === 0) return;
      
      ingredient.lots.forEach(lot => {
        if (lot.epuise || !lot.dlc) return;
        
        const dlcDate = new Date(lot.dlc);
        const daysRemaining = Math.ceil((dlcDate - now) / (1000 * 60 * 60 * 24));
        
        if (daysRemaining < 0) {
          // Périmé
          alerts.push({
            id: generateUUID(),
            type: AlertType.DLC_EXPIRED,
            severity: AlertSeverity.CRITICAL,
            ingredientId: ingredient.id,
            ingredientName: ingredient.name,
            lotId: lot.id,
            lotNumber: lot.numeroLot,
            message: `DLC dépassée : ${ingredient.name}`,
            details: `Lot ${lot.numeroLot} périmé depuis ${Math.abs(daysRemaining)} jour(s). Quantité : ${lot.quantite} ${ingredient.baseUnit}`,
            dlcDate: lot.dlc,
            daysRemaining: daysRemaining,
            quantity: lot.quantite,
            unit: ingredient.baseUnit,
            createdAt: new Date().toISOString(),
            handledAt: null
          });
        } else if (daysRemaining <= criticalDays) {
          // Critique (≤ 3 jours)
          alerts.push({
            id: generateUUID(),
            type: AlertType.DLC_CRITICAL,
            severity: AlertSeverity.CRITICAL,
            ingredientId: ingredient.id,
            ingredientName: ingredient.name,
            lotId: lot.id,
            lotNumber: lot.numeroLot,
            message: `DLC critique : ${ingredient.name}`,
            details: `Lot ${lot.numeroLot} expire dans ${daysRemaining} jour(s). Quantité : ${lot.quantite} ${ingredient.baseUnit}`,
            dlcDate: lot.dlc,
            daysRemaining: daysRemaining,
            quantity: lot.quantite,
            unit: ingredient.baseUnit,
            createdAt: new Date().toISOString(),
            handledAt: null
          });
        } else if (daysRemaining <= warningDays) {
          // Avertissement (≤ 7 jours)
          alerts.push({
            id: generateUUID(),
            type: AlertType.DLC_WARNING,
            severity: AlertSeverity.WARNING,
            ingredientId: ingredient.id,
            ingredientName: ingredient.name,
            lotId: lot.id,
            lotNumber: lot.numeroLot,
            message: `DLC proche : ${ingredient.name}`,
            details: `Lot ${lot.numeroLot} expire dans ${daysRemaining} jour(s). Quantité : ${lot.quantite} ${ingredient.baseUnit}`,
            dlcDate: lot.dlc,
            daysRemaining: daysRemaining,
            quantity: lot.quantite,
            unit: ingredient.baseUnit,
            createdAt: new Date().toISOString(),
            handledAt: null
          });
        }
      });
    });
    
    return alerts;
  }
  
  /**
   * Récupère toutes les alertes actives
   * @param {Ingredient[]} ingredients
   * @param {Object} settings
   * @returns {Object} - {stock: [], dlc: [], all: []}
   */
  static getActiveAlerts(ingredients, settings = {}) {
    const stockAlerts = this.checkStockAlerts(ingredients, settings);
    const dlcAlerts = this.checkDLCAlerts(ingredients, settings);
    
    return {
      stock: stockAlerts,
      dlc: dlcAlerts,
      all: [...stockAlerts, ...dlcAlerts].sort((a, b) => {
        // Trier par sévérité puis par date
        const severityOrder = { critical: 0, warning: 1, info: 2 };
        if (severityOrder[a.severity] !== severityOrder[b.severity]) {
          return severityOrder[a.severity] - severityOrder[b.severity];
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    };
  }
  
  /**
   * Marque une alerte comme traitée
   * @param {Alert[]} alerts
   * @param {string} alertId
   * @returns {Alert[]}
   */
  static markAsHandled(alerts, alertId) {
    return alerts.map(alert => {
      if (alert.id === alertId) {
        return {
          ...alert,
          handledAt: new Date().toISOString()
        };
      }
      return alert;
    });
  }
  
  /**
   * Nettoie les alertes traitées de plus de X jours
   * @param {Alert[]} alerts
   * @param {number} daysToKeep - Nombre de jours à conserver (défaut: 30)
   * @returns {Alert[]}
   */
  static cleanupOldAlerts(alerts, daysToKeep = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    return alerts.filter(alert => {
      if (!alert.handledAt) return true; // Garder alertes non traitées
      return new Date(alert.handledAt) > cutoffDate;
    });
  }
  
  /**
   * Envoie une notification navigateur
   * @param {Alert} alert
   */
  static async sendBrowserNotification(alert) {
    if (!('Notification' in window)) {
      console.warn('Notifications non supportées par ce navigateur');
      return false;
    }
    
    if (Notification.permission === 'granted') {
      const notification = new Notification(alert.message, {
        body: alert.details,
        icon: '/icon.png', // Si vous avez une icône
        tag: alert.id,
        requireInteraction: alert.severity === AlertSeverity.CRITICAL
      });
      
      notification.onclick = () => {
        window.focus();
        // Naviguer vers la page alertes
        if (window.showPage) {
          window.showPage('alerts');
        }
      };
      
      return true;
    }
    
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        return this.sendBrowserNotification(alert);
      }
    }
    
    return false;
  }
  
  /**
   * Statistiques alertes
   * @param {Alert[]} alerts
   * @returns {Object}
   */
  static getStatistics(alerts) {
    const now = new Date();
    const last30Days = alerts.filter(a => {
      const createdDate = new Date(a.createdAt);
      const daysDiff = (now - createdDate) / (1000 * 60 * 60 * 24);
      return daysDiff <= 30;
    });
    
    return {
      total: alerts.length,
      active: alerts.filter(a => !a.handledAt).length,
      handled: alerts.filter(a => a.handledAt).length,
      last30Days: last30Days.length,
      bySeverity: {
        critical: alerts.filter(a => a.severity === AlertSeverity.CRITICAL && !a.handledAt).length,
        warning: alerts.filter(a => a.severity === AlertSeverity.WARNING && !a.handledAt).length,
        info: alerts.filter(a => a.severity === AlertSeverity.INFO && !a.handledAt).length
      },
      byType: {
        stock: alerts.filter(a => a.type.includes('stock') && !a.handledAt).length,
        dlc: alerts.filter(a => a.type.includes('dlc') && !a.handledAt).length
      }
    };
  }
}
