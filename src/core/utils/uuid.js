/**
 * Générateur d'UUID avec fallback pour compatibilité
 * @module core/utils/uuid
 */

/**
 * Génère un UUID v4 avec fallback si crypto.randomUUID n'existe pas
 * @returns {string} UUID
 */
export function generateUUID() {
  // Essayer crypto.randomUUID (Node 14+, navigateurs modernes)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback : générer un UUID simple mais suffisant
  // Format : xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Alias pour compatibilité
 */
export const uuid = generateUUID;
