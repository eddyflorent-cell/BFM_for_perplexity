/**
 * Utilitaires pour la manipulation des dates
 * @module core/utils/date
 */

/**
 * Complète un nombre avec un zéro à gauche si nécessaire
 * @private
 * @param {number} n - Nombre à compléter
 * @returns {string} Nombre avec zéro (ex: "05")
 */
function pad2(n) {
  return String(n).padStart(2, '0');
}

/**
 * Formate une date au format ISO (YYYY-MM-DD)
 * @param {Date} [date=new Date()] - Date à formater
 * @returns {string} Date au format YYYY-MM-DD
 * @example
 * dateISO(new Date('2025-01-13')) // "2025-01-13"
 * dateISO() // Date du jour
 */
export function dateISO(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

/**
 * Formate une heure au format ISO (HH:MM)
 * @param {Date} [date=new Date()] - Date à formater
 * @returns {string} Heure au format HH:MM
 * @example
 * timeISO(new Date('2025-01-13T14:30:00')) // "14:30"
 * timeISO() // Heure actuelle
 */
export function timeISO(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

/**
 * Formate une date au format ISO complet (YYYY-MM-DDTHH:MM:SS.sssZ)
 * @param {Date} [date=new Date()] - Date à formater
 * @returns {string} Date/heure ISO complète
 * @example
 * dateTimeISO() // "2025-01-13T14:30:00.000Z"
 */
export function dateTimeISO(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  return d.toISOString();
}

/**
 * Retourne le timestamp actuel en millisecondes
 * @returns {number} Timestamp (millisecondes depuis 1970)
 * @example
 * nowMs() // 1736779800000
 */
export function nowMs() {
  return Date.now();
}

/**
 * Convertit un timestamp en date ISO
 * @param {number} ms - Timestamp en millisecondes
 * @returns {string} Date au format YYYY-MM-DD
 * @example
 * toISODate(1736779800000) // "2025-01-13"
 */
export function toISODate(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

/**
 * Ajoute des jours à une date
 * @param {Date|string} date - Date de départ
 * @param {number} days - Nombre de jours à ajouter (peut être négatif)
 * @returns {Date} Nouvelle date
 * @example
 * addDays(new Date('2025-01-13'), 7) // 2025-01-20
 * addDays(new Date('2025-01-13'), -3) // 2025-01-10
 */
export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Calcule le nombre de jours entre deux dates
 * @param {Date|string} date1 - Première date
 * @param {Date|string} date2 - Deuxième date
 * @returns {number} Nombre de jours (peut être négatif si date1 > date2)
 * @example
 * daysBetween('2025-01-13', '2025-01-20') // 7
 * daysBetween('2025-01-20', '2025-01-13') // -7
 */
export function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffMs = d2.getTime() - d1.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Vérifie si une date est expirée (DLC dépassée)
 * @param {Date|string} dlc - Date limite de consommation
 * @returns {boolean} True si expirée
 * @example
 * isExpired('2025-01-10') // true (si on est le 13/01/2025)
 * isExpired('2025-01-20') // false
 */
export function isExpired(dlc) {
  const now = new Date();
  const expiryDate = new Date(dlc);
  return expiryDate < now;
}

/**
 * Calcule le nombre de jours restants avant expiration
 * @param {Date|string} dlc - Date limite de consommation
 * @returns {number} Nombre de jours (peut être négatif si déjà expiré)
 * @example
 * daysUntilExpiry('2025-01-20') // 7 (si on est le 13/01/2025)
 * daysUntilExpiry('2025-01-10') // -3 (expiré depuis 3 jours)
 */
export function daysUntilExpiry(dlc) {
  const now = new Date();
  const expiryDate = new Date(dlc);
  return Math.ceil(daysBetween(now, expiryDate));
}

/**
 * Formate une date pour affichage français (JJ/MM/AAAA)
 * @param {Date|string} date - Date à formater
 * @returns {string} Date au format français
 * @example
 * formatDateFR('2025-01-13') // "13/01/2025"
 */
export function formatDateFR(date) {
  const d = new Date(date);
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;
}

/**
 * Formate une date/heure pour affichage français (JJ/MM/AAAA HH:MM)
 * @param {Date|string|number} date - Date à formater
 * @returns {string} Date/heure au format français
 * @example
 * formatDateTimeFR(new Date('2025-01-13T14:30:00')) // "13/01/2025 14:30"
 */
export function formatDateTimeFR(date) {
  const d = new Date(date);
  return `${formatDateFR(d)} ${timeISO(d)}`;
}

/**
 * Vérifie si une date est valide
 * @param {*} date - Date à vérifier
 * @returns {boolean} True si valide
 * @example
 * isValidDate('2025-01-13') // true
 * isValidDate('invalid') // false
 * isValidDate(new Date()) // true
 */
export function isValidDate(date) {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
}

/**
 * Compare deux dates (retourne -1, 0 ou 1)
 * @param {Date|string} date1 - Première date
 * @param {Date|string} date2 - Deuxième date
 * @returns {number} -1 si date1 < date2, 0 si égales, 1 si date1 > date2
 * @example
 * compareDate('2025-01-10', '2025-01-20') // -1
 * compareDate('2025-01-20', '2025-01-10') // 1
 * compareDate('2025-01-13', '2025-01-13') // 0
 */
export function compareDates(date1, date2) {
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();
  if (d1 < d2) {
    return -1;
  }
  if (d1 > d2) {
    return 1;
  }
  return 0;
}
