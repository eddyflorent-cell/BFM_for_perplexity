/**
 * SYSTÈME D'IMPORT/EXPORT INGRÉDIENTS
 * Permet d'importer des bases de données externes
 * et d'exporter la base actuelle
 * @module core/services/IngredientImporter
 */

export class IngredientImporter {
  
  /**
   * Importe des ingrédients depuis un fichier JSON
   * @param {File} file - Fichier JSON à importer
   * @param {Array} existingIngredients - Ingrédients existants
   * @returns {Promise<Object>} - Résultat de l'import
   */
  static async importFromJSON(file, existingIngredients = []) {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Validation du format
      const validation = this.validateImportData(data);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.error,
          imported: 0
        };
      }
      
      // Extraction des ingrédients
      let ingredientsToImport = [];
      
      if (Array.isArray(data)) {
        // Format : tableau direct
        ingredientsToImport = data;
      } else if (data.ingredients) {
        // Format : objet avec propriété ingredients
        ingredientsToImport = data.ingredients;
      } else if (data.fruits || data.legumes) {
        // Format : par catégories
        ingredientsToImport = this.extractFromCategories(data);
      }
      
      // Fusion avec existants (évite doublons par ID)
      const merged = this.mergeIngredients(existingIngredients, ingredientsToImport);
      
      return {
        success: true,
        imported: ingredientsToImport.length,
        total: merged.length,
        new: merged.length - existingIngredients.length,
        ingredients: merged
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message,
        imported: 0
      };
    }
  }
  
  /**
   * Valide les données d'import
   */
  static validateImportData(data) {
    // Doit être un objet ou un tableau
    if (!data || (typeof data !== 'object' && !Array.isArray(data))) {
      return {
        valid: false,
        error: "Format invalide : doit être un objet JSON ou un tableau"
      };
    }
    
    // Si tableau, vérifier qu'il contient des ingrédients valides
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return { valid: false, error: "Le fichier ne contient aucun ingrédient" };
      }
      
      const firstItem = data[0];
      if (!firstItem.name || !firstItem.yieldPercent) {
        return {
          valid: false,
          error: "Format d'ingrédient invalide : propriétés 'name' et 'yieldPercent' requises"
        };
      }
    }
    
    // Si objet, vérifier qu'il contient des ingrédients
    if (!Array.isArray(data)) {
      const hasIngredients = data.ingredients || data.fruits || data.legumes;
      if (!hasIngredients) {
        return {
          valid: false,
          error: "Le fichier ne contient aucune liste d'ingrédients"
        };
      }
    }
    
    return { valid: true };
  }
  
  /**
   * Extrait les ingrédients d'un format par catégories
   */
  static extractFromCategories(data) {
    const ingredients = [];
    const categories = ['fruits', 'legumes', 'viandes', 'poissons', 'laitiers', 'cereales', 'herbes', 'epices', 'autres'];
    
    for (const category of categories) {
      if (data[category] && Array.isArray(data[category])) {
        ingredients.push(...data[category]);
      }
    }
    
    return ingredients;
  }
  
  /**
   * Fusionne deux listes d'ingrédients (évite doublons par ID)
   */
  static mergeIngredients(existing, newOnes) {
    const merged = [...existing];
    const existingIds = new Set(existing.map(i => i.id));
    
    for (const ingredient of newOnes) {
      if (!existingIds.has(ingredient.id)) {
        merged.push(ingredient);
        existingIds.add(ingredient.id);
      } else {
        // Mettre à jour l'existant
        const index = merged.findIndex(i => i.id === ingredient.id);
        if (index !== -1) {
          merged[index] = { ...merged[index], ...ingredient };
        }
      }
    }
    
    return merged;
  }
  
  /**
   * Exporte les ingrédients en JSON
   */
  static exportToJSON(ingredients, format = 'array') {
    let data;
    
    if (format === 'array') {
      // Format tableau simple
      data = ingredients;
    } else if (format === 'categories') {
      // Format par catégories
      data = this.groupByCategory(ingredients);
    } else if (format === 'full') {
      // Format complet avec métadonnées
      data = {
        version: "1.0.0",
        exportDate: new Date().toISOString(),
        totalItems: ingredients.length,
        ingredients: ingredients
      };
    }
    
    return JSON.stringify(data, null, 2);
  }
  
  /**
   * Groupe les ingrédients par catégorie
   */
  static groupByCategory(ingredients) {
    const grouped = {};
    
    for (const ingredient of ingredients) {
      const category = ingredient.category || 'autres';
      const categoryKey = category.toLowerCase().replace(/[éè]/g, 'e');
      
      if (!grouped[categoryKey]) {
        grouped[categoryKey] = [];
      }
      
      grouped[categoryKey].push(ingredient);
    }
    
    return grouped;
  }
  
  /**
   * Exporte en CSV
   */
  static exportToCSV(ingredients) {
    const headers = ['ID', 'Nom', 'Catégorie', 'Rendement %', 'Type déchet', 'Unité', 'Prix/kg', 'Allergènes'];
    const rows = [headers];
    
    for (const ing of ingredients) {
      rows.push([
        ing.id || '',
        ing.name || '',
        ing.category || '',
        ing.yieldPercent || '',
        ing.wasteType || '',
        ing.baseUnit || 'g',
        ing.avgPricePerKg || '',
        (ing.allergens || []).join(', ')
      ]);
    }
    
    return rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  }
  
  /**
   * Importe depuis CSV
   */
  static async importFromCSV(file) {
    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        return {
          success: false,
          error: "Le fichier CSV est vide",
          imported: 0
        };
      }
      
      // Ignorer l'en-tête
      const dataLines = lines.slice(1);
      const ingredients = [];
      
      for (const line of dataLines) {
        // Parser CSV (gère les guillemets)
        const cells = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
        const cleanCells = cells.map(cell => cell.replace(/^"|"$/g, '').trim());
        
        if (cleanCells.length < 4) continue; // Ligne invalide
        
        const ingredient = {
          id: cleanCells[0],
          name: cleanCells[1],
          category: cleanCells[2],
          yieldPercent: parseFloat(cleanCells[3]) || 100,
          wasteType: cleanCells[4] || 'Aucun',
          baseUnit: cleanCells[5] || 'g',
          avgPricePerKg: parseFloat(cleanCells[6]) || 0,
          allergens: cleanCells[7] ? cleanCells[7].split(',').map(a => a.trim()) : []
        };
        
        ingredients.push(ingredient);
      }
      
      return {
        success: true,
        imported: ingredients.length,
        ingredients: ingredients
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message,
        imported: 0
      };
    }
  }
  
  /**
   * Télécharge un fichier
   */
  static downloadFile(content, filename, mimeType = 'application/json') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  
  /**
   * Exporte et télécharge en JSON
   */
  static downloadJSON(ingredients, filename = 'ingredients.json', format = 'array') {
    const json = this.exportToJSON(ingredients, format);
    this.downloadFile(json, filename, 'application/json');
  }
  
  /**
   * Exporte et télécharge en CSV
   */
  static downloadCSV(ingredients, filename = 'ingredients.csv') {
    const csv = this.exportToCSV(ingredients);
    this.downloadFile(csv, filename, 'text/csv');
  }
}
