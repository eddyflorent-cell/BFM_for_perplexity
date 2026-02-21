/**
 * Modèle Expense - Représente une dépense
 * @module core/models/Expense
 */

/**
 * Classe Expense
 * Représente une dépense avec catégorie, montant, date
 */
export class Expense {
  /**
   * @param {Object} data
   * @param {string} data.id - ID unique
   * @param {string} data.category - Catégorie (loyer, électricité, salaires...)
   * @param {string} data.description - Description
   * @param {number} data.amount - Montant en FCFA
   * @param {Date} data.date - Date de la dépense
   * @param {string} [data.paymentMethod] - Mode de paiement (cash, mobile, bank)
   * @param {string} [data.notes] - Notes
   */
  constructor(data) {
    this.id = data.id;
    this.category = data.category;
    this.description = data.description || '';
    this.amount = Number(data.amount);
    this.date = data.date instanceof Date ? data.date : new Date(data.date);
    this.paymentMethod = data.paymentMethod || '';
    this.notes = data.notes || '';
  }

  /**
   * Vérifie si la dépense est valide
   * @returns {boolean}
   */
  isValid() {
    return (
      this.category && 
      this.category.trim() !== '' && 
      this.amount > 0 && 
      this.date instanceof Date && 
      !isNaN(this.date.getTime())
    );
  }

  toJSON() {
    // Robuste : date peut être un objet Date ou une string selon le contexte
    const dateValue = this.date instanceof Date
      ? this.date.toISOString().slice(0, 10)
      : (typeof this.date === 'string' ? this.date.slice(0, 10) : String(this.date).slice(0, 10));
    return {
      id: this.id,
      category: this.category,
      description: this.description,
      amount: this.amount,
      date: dateValue,
      paymentMethod: this.paymentMethod,
      notes: this.notes
    };
  }

  static fromJSON(json) {
    return new Expense({
      id: json.id,
      category: json.category,
      description: json.description,
      amount: json.amount,
      date: json.date,
      paymentMethod: json.paymentMethod,
      notes: json.notes
    });
  }
}
