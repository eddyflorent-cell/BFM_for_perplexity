/**
 * Utilitaires pour la conversion d'unités
 * @module core/utils/units
 */

import { toNumber } from './math.js';

/**
 * Unités de base supportées
 * @enum {string}
 */
export const BaseUnit = {
  GRAM: 'g',
  MILLILITER: 'ml',
  PIECE: 'piece'
};

/**
 * Convertit une quantité en unité de base
 * ✅ CORRIGE BUG #6 : Précision préservée (pas d'arrondis prématurés)
 * @param {number|string} qty - Quantité à convertir
 * @param {string} unit - Unité source (g, kg, ml, L, piece, etc.)
 * @returns {{baseQty: number, baseUnit: string}} Quantité et unité de base
 * @example
 * unitToBase(5, 'kg') // { baseQty: 5000, baseUnit: 'g' }
 * unitToBase(2, 'L') // { baseQty: 2000, baseUnit: 'ml' }
 * unitToBase(10, 'piece') // { baseQty: 10, baseUnit: 'piece' }
 */
export function unitToBase(qty, unit) {
  const q = toNumber(qty, 0);
  const u = String(unit || '').toLowerCase();
  
  // Poids : g, kg
  if (u === 'kg') {
    // ✅ Utilise précision maximale (pas d'arrondis)
    return { baseQty: q * 1000, baseUnit: BaseUnit.GRAM };
  }
  if (u === 'g') {
    return { baseQty: q, baseUnit: BaseUnit.GRAM };
  }
  
  // Volume : ml, l
  if (u === 'l') {
    return { baseQty: q * 1000, baseUnit: BaseUnit.MILLILITER };
  }
  if (u === 'ml') {
    return { baseQty: q, baseUnit: BaseUnit.MILLILITER };
  }
  
  // Par défaut : pièce (sachet, boîte, unité, etc.)
  return { baseQty: q, baseUnit: BaseUnit.PIECE };
}

/**
 * Convertit une quantité de base vers une unité d'affichage
 * @param {number} baseQty - Quantité en unité de base
 * @param {string} baseUnit - Unité de base (g, ml, piece)
 * @param {string} displayUnit - Unité d'affichage souhaitée
 * @returns {number} Quantité convertie
 * @example
 * baseToDisplay(5000, 'g', 'kg') // 5
 * baseToDisplay(2000, 'ml', 'L') // 2
 * baseToDisplay(100, 'g', 'g') // 100
 */
export function baseToDisplay(baseQty, baseUnit, displayUnit) {
  const q = toNumber(baseQty, 0);
  const u = String(displayUnit || '').toLowerCase();
  
  if (baseUnit === BaseUnit.GRAM) {
    if (u === 'kg') {
      return q / 1000;
    }
    return q; // g
  }
  
  if (baseUnit === BaseUnit.MILLILITER) {
    if (u === 'l') {
      return q / 1000;
    }
    return q; // ml
  }
  
  // piece
  return q;
}

/**
 * Retourne l'unité d'affichage par défaut pour une unité de base
 * @param {string} baseUnit - Unité de base
 * @returns {string} Unité d'affichage par défaut
 * @example
 * getDefaultDisplayUnit('g') // 'g'
 * getDefaultDisplayUnit('ml') // 'ml'
 * getDefaultDisplayUnit('piece') // 'piece'
 */
export function getDefaultDisplayUnit(baseUnit) {
  switch (baseUnit) {
    case BaseUnit.GRAM:
      return 'g';
    case BaseUnit.MILLILITER:
      return 'ml';
    case BaseUnit.PIECE:
      return 'piece';
    default:
      return 'piece';
  }
}

/**
 * Détecte l'unité de base à partir d'une unité source
 * @param {string} unit - Unité source
 * @returns {string} Unité de base (g, ml, ou piece)
 * @example
 * detectBaseUnit('kg') // 'g'
 * detectBaseUnit('L') // 'ml'
 * detectBaseUnit('sachet') // 'piece'
 */
export function detectBaseUnit(unit) {
  const u = String(unit || '').toLowerCase();
  
  if (u === 'kg' || u === 'g') {
    return BaseUnit.GRAM;
  }
  
  if (u === 'l' || u === 'ml') {
    return BaseUnit.MILLILITER;
  }
  
  return BaseUnit.PIECE;
}

/**
 * Convertit directement entre deux unités quelconques
 * @param {number} qty - Quantité à convertir
 * @param {string} fromUnit - Unité source
 * @param {string} toUnit - Unité cible
 * @returns {number} Quantité convertie
 * @throws {Error} Si conversion impossible (unités incompatibles)
 * @example
 * convert(5, 'kg', 'g') // 5000
 * convert(2000, 'ml', 'L') // 2
 * convert(100, 'g', 'ml') // Erreur (incompatible)
 */
export function convert(qty, fromUnit, toUnit) {
  // Convertir en base
  const base = unitToBase(qty, fromUnit);
  
  // Vérifier compatibilité
  const targetBaseUnit = detectBaseUnit(toUnit);
  if (base.baseUnit !== targetBaseUnit) {
    throw new Error(
      `Conversion impossible : ${fromUnit} (${base.baseUnit}) → ${toUnit} (${targetBaseUnit})`
    );
  }
  
  // Convertir vers unité cible
  return baseToDisplay(base.baseQty, base.baseUnit, toUnit);
}

/**
 * Formate une quantité avec son unité
 * @param {number} qty - Quantité
 * @param {string} unit - Unité
 * @param {object} options - Options de formatage
 * @param {number} [options.decimals=2] - Nombre de décimales
 * @param {boolean} [options.smart=true] - Utiliser formatage intelligent (kg si >1000g)
 * @returns {string} Quantité formatée (ex: "5.2 kg", "250 g")
 * @example
 * formatQuantity(5000, 'g') // "5 kg" (smart)
 * formatQuantity(5000, 'g', {smart: false}) // "5000 g"
 * formatQuantity(250, 'g') // "250 g"
 */
export function formatQuantity(qty, unit, options = {}) {
  const { decimals = 2, smart = true } = options;
  
  let q = toNumber(qty, 0);
  let u = unit;
  
  // Formatage intelligent : convertir en unité supérieure si > 1000
  if (smart) {
    const baseUnit = detectBaseUnit(unit);
    
    if (baseUnit === BaseUnit.GRAM && q >= 1000) {
      q = q / 1000;
      u = 'kg';
    } else if (baseUnit === BaseUnit.MILLILITER && q >= 1000) {
      q = q / 1000;
      u = 'L';
    }
  }
  
  // Arrondir intelligemment
  const rounded = q < 10 
    ? Math.round(q * Math.pow(10, decimals)) / Math.pow(10, decimals)
    : Math.round(q);
  
  return `${rounded} ${u}`;
}

/**
 * Vérifie si deux unités sont compatibles (même type de base)
 * @param {string} unit1 - Première unité
 * @param {string} unit2 - Deuxième unité
 * @returns {boolean} True si compatibles
 * @example
 * areUnitsCompatible('kg', 'g') // true
 * areUnitsCompatible('L', 'ml') // true
 * areUnitsCompatible('kg', 'L') // false
 */
export function areUnitsCompatible(unit1, unit2) {
  const base1 = detectBaseUnit(unit1);
  const base2 = detectBaseUnit(unit2);
  return base1 === base2;
}

/**
 * Liste des unités supportées par type
 * @enum {string[]}
 */
export const SupportedUnits = {
  WEIGHT: ['g', 'kg'],
  VOLUME: ['ml', 'L'],
  PIECE: ['piece', 'sachet', 'boîte', 'unité']
};
