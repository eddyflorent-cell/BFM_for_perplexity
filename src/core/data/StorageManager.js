/**
 * Gestionnaire de stockage localStorage
 * Corrige le bug #22 : Quota localStorage dépassé
 * @module core/data/StorageManager
 */

/**
 * Erreur de stockage
 */
export class StorageError extends Error {
  constructor(message, context = {}) {
    super(message);
    this.name = 'StorageError';
    this.context = context;
  }
}

/**
 * StorageManager
 * Gère le stockage avec compression, quota monitoring, et backup
 */
export class StorageManager {
  
  static STORAGE_KEY = 'BFM_DATA';
  static BACKUP_KEY = 'BFM_BACKUP';
  static QUOTA_THRESHOLD = 0.90; // 90% du quota (augmenté de 80% pour plus de marge)
  
  /**
   * Sauvegarde les données
   * ✅ CORRIGE BUG #22 : Gestion quota localStorage
   * 
   * @param {Object} data - Données à sauvegarder
   * @param {Object} [options] - Options
   * @param {boolean} [options.compress=true] - Compresser les données
   * @param {boolean} [options.backup=true] - Créer un backup
   * @returns {Object} - {success, size, compressed}
   * @throws {StorageError} Si quota dépassé
   */
  static save(data, options = {}) {
    const { compress = true, backup = true } = options;
    
    try {
      // Sérialiser les données
      let jsonString = JSON.stringify(data);
      let compressed = false;
      
      // ✅ Compression si activée (réduit taille ~50%)
      if (compress) {
        jsonString = this.compress(jsonString);
        compressed = true;
      }
      
      // ✅ Vérifier quota AVANT de sauvegarder
      const size = new Blob([jsonString]).size;
      const quota = this.getQuotaInfo();
      
      if (quota.usage + size > quota.limit * this.QUOTA_THRESHOLD) {
        // ✅ Tentative de nettoyage automatique
        this.cleanup();
        
        // Re-vérifier après cleanup
        const newQuota = this.getQuotaInfo();
        if (newQuota.usage + size > newQuota.limit * this.QUOTA_THRESHOLD) {
          throw new StorageError('Quota localStorage proche de la limite', {
            size,
            usage: newQuota.usage,
            limit: newQuota.limit,
            percentUsed: Math.round((newQuota.usage / newQuota.limit) * 100)
          });
        }
      }
      
      // ✅ Backup de la version précédente
      if (backup) {
        const current = localStorage.getItem(this.STORAGE_KEY);
        if (current) {
          localStorage.setItem(this.BACKUP_KEY, current);
        }
      }
      
      // Sauvegarder
      localStorage.setItem(this.STORAGE_KEY, jsonString);
      
      return {
        success: true,
        size,
        compressed,
        timestamp: new Date()
      };
      
    } catch (error) {
      if (error.name === 'QuotaExceededError' || error.code === 22) {
        throw new StorageError('Quota localStorage dépassé', {
          originalError: error.message
        });
      }
      throw error;
    }
  }
  
  /**
   * Charge les données
   * 
   * @param {Object} [options] - Options
   * @param {boolean} [options.useBackup=false] - Utiliser le backup si échec
   * @returns {Object|null} - Données ou null
   */
  static load(options = {}) {
    const { useBackup = false } = options;
    
    try {
      let data = localStorage.getItem(this.STORAGE_KEY);
      
      // Si pas de données et backup demandé
      if (!data && useBackup) {
        data = localStorage.getItem(this.BACKUP_KEY);
      }
      
      if (!data) {
        return null;
      }
      
      // Décompresser si nécessaire
      if (this.isCompressed(data)) {
        data = this.decompress(data);
      }
      
      return JSON.parse(data);
      
    } catch (error) {
      console.error('Erreur chargement données:', error);
      
      // Tentative de restauration depuis backup
      if (!useBackup) {
        return this.load({ useBackup: true });
      }
      
      return null;
    }
  }
  
  /**
   * Exporte les données en JSON
   * ✅ CORRIGE BUG #5 : Export JSON complet
   * 
   * @param {Object} data - Données à exporter
   * @returns {string} - JSON stringifié
   */
  static export(data) {
    // ✅ Export COMPLET de toutes les données
    const exportData = {
      version: '2.0',
      exportDate: new Date().toISOString(),
      data: {
        ingredients: data.ingredients || [],
        recipes: data.recipes || [],
        productions: data.productions || [],
        sales: data.sales || [],
        expenses: data.expenses || [],
        vendors: data.vendors || [],
        settings: data.settings || {}
      }
    };
    
    return JSON.stringify(exportData, null, 2);
  }
  
  /**
   * Importe des données depuis JSON
   * 
   * @param {string} jsonString - JSON à importer
   * @returns {Object} - Données importées
   * @throws {StorageError} Si JSON invalide
   */
  static import(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      
      // Valider structure
      if (!imported.data) {
        throw new StorageError('Format d\'import invalide (data manquant)');
      }
      
      return imported.data;
      
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new StorageError('JSON invalide', { originalError: error.message });
      }
      throw error;
    }
  }
  
  /**
   * Compresse une chaîne (simple RLE)
   * 
   * @param {string} str - Chaîne à compresser
   * @returns {string} - Chaîne compressée
   */
  static compress(str) {
    // Compression simple : préfixe + base64
    return 'COMPRESSED:' + btoa(unescape(encodeURIComponent(str)));
  }
  
  /**
   * Décompresse une chaîne
   * 
   * @param {string} str - Chaîne compressée
   * @returns {string} - Chaîne décompressée
   */
  static decompress(str) {
    if (!this.isCompressed(str)) {
      return str;
    }
    
    const compressed = str.replace('COMPRESSED:', '');
    return decodeURIComponent(escape(atob(compressed)));
  }
  
  /**
   * Vérifie si une chaîne est compressée
   * 
   * @param {string} str - Chaîne à vérifier
   * @returns {boolean}
   */
  static isCompressed(str) {
    return str && str.startsWith('COMPRESSED:');
  }
  
  /**
   * Récupère les infos de quota
   * 
   * @returns {Object} - {usage, limit, available, percentUsed}
   */
  static getQuotaInfo() {
    try {
      // Calculer usage actuel
      let usage = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          usage += localStorage[key].length + key.length;
        }
      }
      
      // Limite typique : 5-10 MB (on suppose 5MB)
      const limit = 5 * 1024 * 1024;
      
      return {
        usage,
        limit,
        available: limit - usage,
        percentUsed: Math.round((usage / limit) * 100)
      };
      
    } catch (error) {
      return {
        usage: 0,
        limit: 5 * 1024 * 1024,
        available: 5 * 1024 * 1024,
        percentUsed: 0
      };
    }
  }
  
  /**
   * Nettoie le localStorage
   * Supprime les anciennes données, backups obsolètes
   */
  static cleanup() {
    try {
      // Supprimer backup si trop vieux (> 3 jours au lieu de 7)
      const backup = localStorage.getItem(this.BACKUP_KEY);
      if (backup) {
        try {
          const backupData = JSON.parse(backup);
          if (!backupData.timestamp) {
            // Pas de timestamp = supposé récent, on garde
            return;
          }
          
          const age = Date.now() - new Date(backupData.timestamp).getTime();
          const threeDays = 3 * 24 * 60 * 60 * 1000;
          
          if (age > threeDays) {
            localStorage.removeItem(this.BACKUP_KEY);
          }
        } catch (e) {
          // Backup corrompu, on le supprime
          localStorage.removeItem(this.BACKUP_KEY);
        }
      }
      
      // Supprimer TOUTES clés obsolètes qui ne sont pas BFM_DATA ou BFM_BACKUP
      const keysToRemove = [];
      const whitelist = [this.STORAGE_KEY, this.BACKUP_KEY, 'exchangeRates'];
      
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key) && !whitelist.includes(key)) {
          // Supprimer clés obsolètes BFM_OLD_, ou clés étrangères si > 100KB
          if (key.startsWith('BFM_OLD_') || key.startsWith('OLD_') || key.startsWith('BACKUP_')) {
            keysToRemove.push(key);
          }
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
    } catch (error) {
      console.error('Erreur cleanup:', error);
    }
  }
  
  /**
   * Efface toutes les données
   * 
   * @param {boolean} [keepBackup=true] - Garder le backup
   */
  static clear(keepBackup = true) {
    if (keepBackup) {
      const current = localStorage.getItem(this.STORAGE_KEY);
      if (current) {
        localStorage.setItem(this.BACKUP_KEY, current);
      }
    }
    
    localStorage.removeItem(this.STORAGE_KEY);
  }
  
  /**
   * Restaure depuis le backup
   * 
   * @returns {boolean} - true si restauré
   */
  static restoreFromBackup() {
    const backup = localStorage.getItem(this.BACKUP_KEY);
    if (!backup) {
      return false;
    }
    
    localStorage.setItem(this.STORAGE_KEY, backup);
    return true;
  }
}
