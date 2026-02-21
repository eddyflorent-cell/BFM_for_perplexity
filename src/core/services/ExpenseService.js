/**
 * Service de gestion des dépenses
 * Corrige le bug #19 : Validation dates faible
 * @module core/services/ExpenseService
 */

import { Expense } from '../models/Expense.js';
import { ValidationError } from './IngredientService.js';
import { generateUUID } from '../utils/uuid.js';

/**
 * Service de gestion des dépenses
 */
export class ExpenseService {
  
  /**
   * Valide une dépense
   * ✅ CORRIGE BUG #19 : Validation dates stricte
   * 
   * @param {Object} data - Données de la dépense
   * @returns {string[]} - Liste des erreurs
   */
  static validate(data) {
    const errors = [];
    
    if (!data.category || data.category.trim() === '') {
      errors.push('La catégorie est obligatoire');
    }
    
    // Validation montant (optimisée)
    const amount = Number(data.amount);
    if (data.amount === undefined || isNaN(amount) || amount <= 0) {
      errors.push('Le montant doit être > 0');
    }
    
    // ✅ BUG #19 CORRIGÉ : Validation date stricte
    if (!data.date) {
      errors.push('La date est obligatoire');
    } else {
      const date = new Date(data.date);
      if (isNaN(date.getTime())) {
        errors.push('Date invalide');
      } else {
        // Vérifier que la date n'est pas dans le futur
        const now = new Date();
        if (date > now) {
          errors.push('La date ne peut pas être dans le futur');
        }
        
        // Vérifier que la date n'est pas trop ancienne (> 10 ans)
        const tenYearsAgo = new Date();
        tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
        if (date < tenYearsAgo) {
          errors.push('La date ne peut pas être antérieure à 10 ans');
        }
      }
    }
    
    return errors;
  }
  
  /**
   * Crée une nouvelle dépense
   * 
   * @param {Object} data - Données de la dépense
   * @returns {Object} - {expense, trace}
   * @throws {ValidationError} Si données invalides
   */
  static create(data) {
    const errors = this.validate(data);
    if (errors.length > 0) {
      throw new ValidationError('Dépense invalide', errors);
    }
    
    const expense = new Expense({
      id: generateUUID(),
      category: data.category.trim(),
      description: data.description || '',
      amount: Number(data.amount),
      date: new Date(data.date),
      paymentMethod: data.paymentMethod || '',
      notes: data.notes || ''
    });
    
    // Trace
    const trace = {
      id: generateUUID(),
      type: 'EXPENSE_CREATE',
      expenseId: expense.id,
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
      timestamp: new Date()
    };
    
    return { expense, trace };
  }
  
  /**
   * Modifie une dépense
   * 
   * @param {Expense} expense - Dépense à modifier
   * @param {Object} updates - Modifications
   * @returns {Object} - {expense, trace}
   * @throws {ValidationError} Si données invalides
   */
  static update(expense, updates) {
    const data = {
      category: updates.category !== undefined ? updates.category : expense.category,
      description: updates.description !== undefined ? updates.description : expense.description,
      amount: updates.amount !== undefined ? updates.amount : expense.amount,
      date: updates.date !== undefined ? updates.date : expense.date,
      paymentMethod: updates.paymentMethod !== undefined ? updates.paymentMethod : expense.paymentMethod,
      notes: updates.notes !== undefined ? updates.notes : expense.notes
    };
    
    const errors = this.validate(data);
    if (errors.length > 0) {
      throw new ValidationError('Modifications invalides', errors);
    }
    
    // Appliquer modifications
    expense.category = data.category.trim();
    expense.description = data.description;
    expense.amount = Number(data.amount);
    expense.date = new Date(data.date);
    expense.paymentMethod = data.paymentMethod;
    expense.notes = data.notes;
    
    // Trace
    const trace = {
      id: generateUUID(),
      type: 'EXPENSE_UPDATE',
      expenseId: expense.id,
      updates,
      timestamp: new Date()
    };
    
    return { expense, trace };
  }
  
  /**
   * Supprime une dépense
   * 
   * @param {Expense} expense - Dépense à supprimer
   * @returns {Object} - {trace}
   */
  static delete(expense) {
    const trace = {
      id: generateUUID(),
      type: 'EXPENSE_DELETE',
      expenseId: expense.id,
      category: expense.category,
      amount: expense.amount,
      timestamp: new Date()
    };
    
    return { trace };
  }
  
  /**
   * Calcule le total des dépenses
   * 
   * @param {Expense[]} expenses - Liste des dépenses
   * @param {Date} [startDate] - Date de début
   * @param {Date} [endDate] - Date de fin
   * @param {string} [category] - Filtrer par catégorie
   * @returns {number} - Total en FCFA
   */
  static getTotal(expenses, startDate = null, endDate = null, category = null) {
    let filtered = expenses;
    
    if (startDate) {
      filtered = filtered.filter(e => e.date >= startDate);
    }
    
    if (endDate) {
      filtered = filtered.filter(e => e.date <= endDate);
    }
    
    if (category) {
      filtered = filtered.filter(e => e.category === category);
    }
    
    return filtered.reduce((sum, e) => sum + e.amount, 0);
  }
  
  /**
   * Groupe les dépenses par catégorie
   * 
   * @param {Expense[]} expenses - Liste des dépenses
   * @param {Date} [startDate] - Date de début
   * @param {Date} [endDate] - Date de fin
   * @returns {Object[]} - [{category, total, count}]
   */
  static groupByCategory(expenses, startDate = null, endDate = null) {
    let filtered = expenses;
    
    if (startDate) {
      filtered = filtered.filter(e => e.date >= startDate);
    }
    
    if (endDate) {
      filtered = filtered.filter(e => e.date <= endDate);
    }
    
    const groups = {};
    
    for (const expense of filtered) {
      if (!groups[expense.category]) {
        groups[expense.category] = {
          category: expense.category,
          total: 0,
          count: 0
        };
      }
      
      groups[expense.category].total += expense.amount;
      groups[expense.category].count++;
    }
    
    return Object.values(groups).sort((a, b) => b.total - a.total);
  }
  
  /**
   * Trouve les dépenses d'une période
   * 
   * @param {Expense[]} expenses - Liste des dépenses
   * @param {Date} startDate - Date de début
   * @param {Date} endDate - Date de fin
   * @returns {Expense[]}
   */
  static findByPeriod(expenses, startDate, endDate) {
    return expenses.filter(e => 
      e.date >= startDate && e.date <= endDate
    );
  }
  
  /**
   * Trouve les dépenses par catégorie
   * 
   * @param {Expense[]} expenses - Liste des dépenses
   * @param {string} category - Catégorie
   * @returns {Expense[]}
   */
  static findByCategory(expenses, category) {
    return expenses.filter(e => e.category === category);
  }
}
