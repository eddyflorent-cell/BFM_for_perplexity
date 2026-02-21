/**
 * Utilitaires mathématiques et financiers
 * @module core/utils/math
 */

/**
 * Formate un nombre en monnaie FCFA
 * @param {number|string} n - Montant à formater
 * @returns {string} Montant formaté (ex: "1 500 FCFA")
 * @example
 * money(1500) // "1 500 FCFA"
 * money("2500.50") // "2 501 FCFA" (arrondi)
 */
export function money(n) {
  const value = Math.round(toNumber(n, 0));
  try {
    return value.toLocaleString('fr-FR') + ' FCFA';
  } catch {
    return `${value} FCFA`;
  }
}

/**
 * Convertit une valeur en nombre
 * @param {*} v - Valeur à convertir
 * @param {number} defaultValue - Valeur par défaut si conversion échoue
 * @returns {number} Nombre converti
 * @example
 * toNumber("123.45") // 123.45
 * toNumber("abc", 0) // 0
 * toNumber("1,5", 0) // 1.5 (gère la virgule française)
 */
export function toNumber(v, defaultValue = 0) {
  // Gère les virgules françaises (1,5 → 1.5)
  const str = String(v ?? '').replace(',', '.');
  const n = Number(str);
  return Number.isFinite(n) ? n : defaultValue;
}

/**
 * Arrondit un nombre intelligemment
 * - Si < 10 : 2 décimales
 * - Si < 100 : 1 décimale
 * - Si >= 100 : 0 décimale
 * @param {number} n - Nombre à arrondir
 * @returns {number} Nombre arrondi
 * @example
 * roundSmart(1.2345) // 1.23
 * roundSmart(12.345) // 12.3
 * roundSmart(123.45) // 123
 */
export function roundSmart(n) {
  const num = toNumber(n, 0);
  if (num < 10) {
    return Math.round(num * 100) / 100;
  }
  if (num < 100) {
    return Math.round(num * 10) / 10;
  }
  return Math.round(num);
}

/**
 * Arrondit un nombre à N décimales
 * @param {number} n - Nombre à arrondir
 * @param {number} decimals - Nombre de décimales (défaut: 2)
 * @returns {number} Nombre arrondi
 * @example
 * round(1.2345, 2) // 1.23
 * round(1.2345, 0) // 1
 */
export function round(n, decimals = 2) {
  const num = toNumber(n, 0);
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

/**
 * Contraint un nombre entre min et max
 * @param {number} n - Nombre à contraindre
 * @param {number} min - Valeur minimale
 * @param {number} max - Valeur maximale
 * @returns {number} Nombre contraint
 * @example
 * clamp(5, 0, 10) // 5
 * clamp(-5, 0, 10) // 0
 * clamp(15, 0, 10) // 10
 */
export function clamp(n, min, max) {
  const num = toNumber(n, 0);
  return Math.min(max, Math.max(min, num));
}

/**
 * Calcule un pourcentage
 * @param {number} value - Valeur
 * @param {number} total - Total
 * @returns {number} Pourcentage (0-100)
 * @example
 * percentage(25, 100) // 25
 * percentage(1, 3) // 33.33
 */
export function percentage(value, total) {
  const v = toNumber(value, 0);
  const t = toNumber(total, 0);
  if (t === 0) {
    return 0;
  }
  return round((v / t) * 100, 2);
}

/**
 * Calcule la marge en pourcentage
 * @param {number} selling - Prix de vente
 * @param {number} cost - Coût de revient
 * @returns {number} Marge en % (0-100)
 * @example
 * margin(1000, 600) // 40 (marge de 40%)
 */
export function margin(selling, cost) {
  const s = toNumber(selling, 0);
  const c = toNumber(cost, 0);
  if (s === 0) {
    return 0;
  }
  return round(((s - c) / s) * 100, 2);
}

/**
 * Calcule le prix de vente à partir du coût et de la marge souhaitée
 * @param {number} cost - Coût de revient
 * @param {number} marginPercent - Marge souhaitée en % (ex: 40 pour 40%)
 * @returns {number} Prix de vente
 * @example
 * sellingPrice(600, 40) // 1000 (coût + 40% de marge)
 */
export function sellingPrice(cost, marginPercent) {
  const c = toNumber(cost, 0);
  const m = toNumber(marginPercent, 0);
  if (m >= 100) {
    throw new Error('La marge ne peut pas être >= 100%');
  }
  return round(c / (1 - m / 100), 0);
}

/**
 * Somme un tableau de nombres
 * @param {number[]} numbers - Tableau de nombres
 * @returns {number} Somme
 * @example
 * sum([1, 2, 3]) // 6
 * sum([10, 20, 30]) // 60
 */
export function sum(numbers) {
  return numbers.reduce((acc, n) => acc + toNumber(n, 0), 0);
}

/**
 * Moyenne d'un tableau de nombres
 * @param {number[]} numbers - Tableau de nombres
 * @returns {number} Moyenne
 * @example
 * average([1, 2, 3]) // 2
 * average([10, 20, 30]) // 20
 */
export function average(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  return sum(numbers) / numbers.length;
}
