/**
 * Modèle Lot - Représente un lot d'ingrédient avec traçabilité HACCP
 * @module core/models/Lot
 */

/**
 * Classe Lot
 * Représente un lot d'ingrédient avec quantité, prix, DLC et traçabilité
 */
export class Lot {
  /**
   * Crée un nouveau lot
   * @param {Object} data - Données du lot
   * @param {string} data.id - ID unique du lot
   * @param {number} data.quantiteInitiale - Quantité initiale reçue
   * @param {number} data.quantite - Quantité restante
   * @param {number} data.prixTotal - Prix d'achat total HT
   * @param {number} data.fraisApproche - Frais d'approche (transport, etc.)
   * @param {string|Date} data.dlc - Date limite de consommation
   * @param {string|Date} data.dateReception - Date de réception
   * @param {string} [data.fournisseur] - Nom du fournisseur
   * @param {string} [data.numeroLot] - Numéro de lot fournisseur
   * @param {string} [data.receivedBy] - Nom du réceptionnaire (OBLIGATOIRE pour traçabilité)
   * @param {boolean} [data.epuise] - Lot épuisé ?
   */
  constructor(data) {
    this.id = data.id;
    this.quantiteInitiale = Number(data.quantiteInitiale) || 0;
    this.quantite = Number(data.quantite) || 0;
    this.prixTotal = Number(data.prixTotal) || 0;
    this.fraisApproche = Number(data.fraisApproche) || 0;
    this.dlc = data.dlc instanceof Date ? data.dlc : new Date(data.dlc);
    this.dateReception = data.dateReception instanceof Date ? data.dateReception : new Date(data.dateReception);
    this.fournisseur = data.fournisseur || '';
    this.numeroLot = data.numeroLot || '';
    this.receivedBy = data.receivedBy || ''; // Réceptionnaire
    this.epuise = Boolean(data.epuise);
  }

  /**
   * Coût total du lot (prix + frais)
   * @returns {number}
   */
  getCoutTotal() {
    return this.prixTotal + this.fraisApproche;
  }

  /**
   * Coût unitaire du lot (coût total / quantité initiale)
   * @returns {number}
   */
  getCoutUnitaire() {
    if (this.quantiteInitiale === 0) return 0;
    return this.getCoutTotal() / this.quantiteInitiale;
  }

  /**
   * Coût unitaire en EUR (avec conversion multi-devises)
   * Rétrocompatible avec anciens lots (v51.3)
   * @returns {number}
   */
  getCoutUnitaireEUR() {
    if (this.quantiteInitiale === 0) return 0;
    
    // Rétrocompatibilité : Si pas de méthode getCoutTotalEUR, calcul manuel
    if (typeof this.getCoutTotalEUR !== 'function') {
      const tauxEUR = this.tauxEUR || 1.0;
      const coutTotalEUR = (this.prixTotal + (this.fraisApproche || 0)) * tauxEUR;
      return coutTotalEUR / this.quantiteInitiale;
    }
    
    return this.getCoutTotalEUR() / this.quantiteInitiale;
  }

  /**
   * Valeur actuelle du lot (coût unitaire × quantité restante)
   * @returns {number}
   */
  getValeurActuelle() {
    return this.getCoutUnitaire() * this.quantite;
  }

  /**
   * Valeur actuelle en EUR (avec conversion multi-devises) - v51
   * @returns {number}
   */
  getValeurActuelleEUR() {
    return this.getCoutUnitaireEUR() * this.quantite;
  }

  /**
   * Vérifie si le lot est expiré
   * ✅ CORRIGE BUG #8 : Comparaison DLC avec heure (pas juste jour)
   * @returns {boolean}
   */
  isExpired() {
    const now = new Date();
    // ✅ Comparaison complète (date + heure)
    return this.dlc < now;
  }

  /**
   * Jours restants avant expiration
   * @returns {number} - Négatif si déjà expiré
   */
  daysUntilExpiry() {
    const now = new Date();
    const diffMs = this.dlc.getTime() - now.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  }

  /**
   * Vérifie si le lot est disponible (non épuisé, quantité > 0)
   * @returns {boolean}
   */
  isAvailable() {
    return !this.epuise && this.quantite > 0;
  }

  /**
   * Déduit une quantité du lot
   * @param {number} quantite - Quantité à déduire
   * @returns {number} - Quantité effectivement déduite
   * @throws {Error} Si quantité demandée > quantité disponible
   */
  deduct(quantite) {
    const qtyToDeduct = Number(quantite);
    
    if (qtyToDeduct < 0) {
      throw new Error('La quantité à déduire ne peut pas être négative');
    }
    
    if (qtyToDeduct > this.quantite) {
      throw new Error(
        `Quantité demandée (${qtyToDeduct}) supérieure à la quantité disponible (${this.quantite})`
      );
    }
    
    this.quantite -= qtyToDeduct;
    
    // Marquer comme épuisé si quantité = 0
    if (this.quantite === 0) {
      this.epuise = true;
    }
    
    return qtyToDeduct;
  }

  /**
   * Ajoute une quantité au lot (cas d'annulation/correction)
   * @param {number} quantite - Quantité à ajouter
   */
  restore(quantite) {
    const qtyToRestore = Number(quantite);
    
    if (qtyToRestore < 0) {
      throw new Error('La quantité à restaurer ne peut pas être négative');
    }
    
    this.quantite += qtyToRestore;
    
    // Démarquer comme épuisé si on restaure
    if (this.quantite > 0) {
      this.epuise = false;
    }
    
    // Ne pas dépasser la quantité initiale
    if (this.quantite > this.quantiteInitiale) {
      this.quantite = this.quantiteInitiale;
    }
  }

  /**
   * Sérialise le lot en objet simple (pour JSON)
   * @returns {Object}
   */
  toJSON() {
    return {
      id: this.id,
      quantiteInitiale: this.quantiteInitiale,
      quantite: this.quantite,
      prixTotal: this.prixTotal,
      fraisApproche: this.fraisApproche,
      dlc: this.dlc.toISOString(),
      dateReception: this.dateReception.toISOString(),
      fournisseur: this.fournisseur,
      numeroLot: this.numeroLot,
      receivedBy: this.receivedBy,
      epuise: this.epuise
    };
  }

  /**
   * Crée un lot à partir d'un objet JSON
   * @param {Object} json - Objet JSON
   * @returns {Lot}
   */
  static fromJSON(json) {
    return new Lot({
      id: json.id,
      quantiteInitiale: json.quantiteInitiale,
      quantite: json.quantite,
      prixTotal: json.prixTotal,
      fraisApproche: json.fraisApproche || 0,
      dlc: json.dlc,
      dateReception: json.dateReception,
      fournisseur: json.fournisseur || '',
      numeroLot: json.numeroLot || '',
      receivedBy: json.receivedBy || '',
      epuise: json.epuise || false
    });
  }

  /**
   * Compare deux lots pour tri FIFO (DLC puis date réception)
   * @param {Lot} a - Premier lot
   * @param {Lot} b - Deuxième lot
   * @returns {number} - -1, 0 ou 1 pour tri
   */
  static compareFIFO(a, b) {
    // Trier par DLC d'abord (le plus proche en premier)
    const dlcDiff = a.dlc.getTime() - b.dlc.getTime();
    if (dlcDiff !== 0) return dlcDiff;
    
    // Si même DLC, trier par date de réception (le plus ancien en premier)
    return a.dateReception.getTime() - b.dateReception.getTime();
  }
}
