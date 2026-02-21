/**
 * BASE DE DONNÉES COMPACTE - 100 INGRÉDIENTS ESSENTIELS
 * Les ingrédients les plus utilisés en restauration professionnelle
 * Version intégrée pour démarrage rapide
 * @module core/data/IngredientDatabaseCore
 */

export const IngredientDatabaseCore = {
  
  version: "1.0.0",
  lastUpdate: "2026-02-02",
  description: "100 ingrédients essentiels pour démarrage rapide",
  
  // Liste des 100 ingrédients les plus courants
  ingredients: [
    // FRUITS (15)
    { id: "F001", name: "Citron", category: "Fruits", yieldPercent: 85, wasteType: "Peau", baseUnit: "g", avgPricePerKg: 3.50, allergens: [] },
    { id: "F002", name: "Orange", category: "Fruits", yieldPercent: 70, wasteType: "Peau + pépins", baseUnit: "g", avgPricePerKg: 2.50, allergens: [] },
    { id: "F003", name: "Pomme", category: "Fruits", yieldPercent: 85, wasteType: "Peau + cœur", baseUnit: "g", avgPricePerKg: 2.50, allergens: [] },
    { id: "F004", name: "Banane", category: "Fruits", yieldPercent: 65, wasteType: "Peau", baseUnit: "g", avgPricePerKg: 2.00, allergens: [] },
    { id: "F005", name: "Fraise", category: "Fruits", yieldPercent: 92, wasteType: "Queue", baseUnit: "g", avgPricePerKg: 8.00, allergens: [] },
    { id: "F006", name: "Tomate", category: "Fruits", yieldPercent: 95, wasteType: "Pédoncule", baseUnit: "g", avgPricePerKg: 4.00, allergens: [] },
    { id: "F007", name: "Avocat", category: "Fruits", yieldPercent: 75, wasteType: "Peau + noyau", baseUnit: "g", avgPricePerKg: 8.00, allergens: [] },
    { id: "F008", name: "Mangue", category: "Fruits", yieldPercent: 60, wasteType: "Peau + noyau", baseUnit: "g", avgPricePerKg: 6.00, allergens: [] },
    { id: "F009", name: "Ananas", category: "Fruits", yieldPercent: 40, wasteType: "Peau + cœur", baseUnit: "g", avgPricePerKg: 3.50, allergens: [] },
    { id: "F010", name: "Pêche", category: "Fruits", yieldPercent: 90, wasteType: "Noyau", baseUnit: "g", avgPricePerKg: 4.50, allergens: [] },
    { id: "F011", name: "Framboise", category: "Fruits", yieldPercent: 98, wasteType: "Minimal", baseUnit: "g", avgPricePerKg: 15.00, allergens: [] },
    { id: "F012", name: "Myrtille", category: "Fruits", yieldPercent: 98, wasteType: "Minimal", baseUnit: "g", avgPricePerKg: 18.00, allergens: [] },
    { id: "F013", name: "Poire", category: "Fruits", yieldPercent: 88, wasteType: "Peau + cœur", baseUnit: "g", avgPricePerKg: 3.00, allergens: [] },
    { id: "F014", name: "Kiwi", category: "Fruits", yieldPercent: 80, wasteType: "Peau", baseUnit: "g", avgPricePerKg: 5.00, allergens: [] },
    { id: "F015", name: "Melon", category: "Fruits", yieldPercent: 55, wasteType: "Écorce + pépins", baseUnit: "g", avgPricePerKg: 2.50, allergens: [] },
    
    // LÉGUMES (25)
    { id: "L001", name: "Carotte", category: "Légumes", yieldPercent: 80, wasteType: "Épluchures", baseUnit: "g", avgPricePerKg: 1.80, allergens: [] },
    { id: "L002", name: "Oignon jaune", category: "Légumes", yieldPercent: 88, wasteType: "Peau", baseUnit: "g", avgPricePerKg: 2.00, allergens: [] },
    { id: "L003", name: "Ail", category: "Légumes", yieldPercent: 85, wasteType: "Peau", baseUnit: "g", avgPricePerKg: 8.00, allergens: [] },
    { id: "L004", name: "Échalote", category: "Légumes", yieldPercent: 88, wasteType: "Peau", baseUnit: "g", avgPricePerKg: 6.00, allergens: [] },
    { id: "L005", name: "Poireau", category: "Légumes", yieldPercent: 60, wasteType: "Vert + racines", baseUnit: "g", avgPricePerKg: 3.00, allergens: [] },
    { id: "L006", name: "Pomme de terre", category: "Légumes", yieldPercent: 85, wasteType: "Épluchures", baseUnit: "g", avgPricePerKg: 1.50, allergens: [] },
    { id: "L007", name: "Courgette", category: "Légumes", yieldPercent: 92, wasteType: "Bout", baseUnit: "g", avgPricePerKg: 2.50, allergens: [] },
    { id: "L008", name: "Aubergine", category: "Légumes", yieldPercent: 90, wasteType: "Bout", baseUnit: "g", avgPricePerKg: 3.50, allergens: [] },
    { id: "L009", name: "Poivron rouge", category: "Légumes", yieldPercent: 85, wasteType: "Graines", baseUnit: "g", avgPricePerKg: 5.00, allergens: [] },
    { id: "L010", name: "Concombre", category: "Légumes", yieldPercent: 95, wasteType: "Bout", baseUnit: "g", avgPricePerKg: 2.50, allergens: [] },
    { id: "L011", name: "Laitue", category: "Légumes", yieldPercent: 70, wasteType: "Trognon", baseUnit: "g", avgPricePerKg: 3.00, allergens: [] },
    { id: "L012", name: "Champignon de Paris", category: "Légumes", yieldPercent: 95, wasteType: "Bout terreux", baseUnit: "g", avgPricePerKg: 8.00, allergens: [] },
    { id: "L013", name: "Brocoli", category: "Légumes", yieldPercent: 65, wasteType: "Tronc", baseUnit: "g", avgPricePerKg: 4.50, allergens: [] },
    { id: "L014", name: "Chou-fleur", category: "Légumes", yieldPercent: 60, wasteType: "Feuilles + tronc", baseUnit: "g", avgPricePerKg: 3.50, allergens: [] },
    { id: "L015", name: "Épinard", category: "Légumes", yieldPercent: 75, wasteType: "Tiges", baseUnit: "g", avgPricePerKg: 5.00, allergens: [] },
    { id: "L016", name: "Haricot vert", category: "Légumes", yieldPercent: 90, wasteType: "Bout", baseUnit: "g", avgPricePerKg: 6.00, allergens: [] },
    { id: "L017", name: "Petit pois", category: "Légumes", yieldPercent: 40, wasteType: "Cosse", baseUnit: "g", avgPricePerKg: 8.00, allergens: [] },
    { id: "L018", name: "Betterave", category: "Légumes", yieldPercent: 80, wasteType: "Peau", baseUnit: "g", avgPricePerKg: 2.50, allergens: [] },
    { id: "L019", name: "Céleri branche", category: "Légumes", yieldPercent: 70, wasteType: "Feuilles", baseUnit: "g", avgPricePerKg: 3.50, allergens: ["céleri"] },
    { id: "L020", name: "Navet", category: "Légumes", yieldPercent: 80, wasteType: "Peau", baseUnit: "g", avgPricePerKg: 2.50, allergens: [] },
    { id: "L021", name: "Radis", category: "Légumes", yieldPercent: 85, wasteType: "Fanes", baseUnit: "g", avgPricePerKg: 4.00, allergens: [] },
    { id: "L022", name: "Patate douce", category: "Légumes", yieldPercent: 85, wasteType: "Peau", baseUnit: "g", avgPricePerKg: 3.00, allergens: [] },
    { id: "L023", name: "Courge butternut", category: "Légumes", yieldPercent: 70, wasteType: "Peau + graines", baseUnit: "g", avgPricePerKg: 2.80, allergens: [] },
    { id: "L024", name: "Gingembre", category: "Légumes", yieldPercent: 85, wasteType: "Peau", baseUnit: "g", avgPricePerKg: 12.00, allergens: [] },
    { id: "L025", name: "Piment", category: "Légumes", yieldPercent: 90, wasteType: "Graines", baseUnit: "g", avgPricePerKg: 12.00, allergens: [] },
    
    // VIANDES (15)
    { id: "V001", name: "Poulet - Filet", category: "Viandes", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 12.00, allergens: [] },
    { id: "V002", name: "Poulet - Cuisse", category: "Viandes", yieldPercent: 70, wasteType: "Os + peau", baseUnit: "g", avgPricePerKg: 8.00, allergens: [] },
    { id: "V003", name: "Bœuf - Entrecôte", category: "Viandes", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 25.00, allergens: [] },
    { id: "V004", name: "Bœuf - Filet", category: "Viandes", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 45.00, allergens: [] },
    { id: "V005", name: "Bœuf haché 15%", category: "Viandes", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 12.00, allergens: [] },
    { id: "V006", name: "Porc - Filet mignon", category: "Viandes", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 15.00, allergens: [] },
    { id: "V007", name: "Porc - Lardons", category: "Viandes", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 10.00, allergens: [] },
    { id: "V008", name: "Agneau - Gigot", category: "Viandes", yieldPercent: 70, wasteType: "Os + gras", baseUnit: "g", avgPricePerKg: 18.00, allergens: [] },
    { id: "V009", name: "Veau - Escalope", category: "Viandes", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 28.00, allergens: [] },
    { id: "V010", name: "Canard - Magret", category: "Viandes", yieldPercent: 85, wasteType: "Gras", baseUnit: "g", avgPricePerKg: 18.00, allergens: [] },
    { id: "V011", name: "Dinde - Escalope", category: "Viandes", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 10.00, allergens: [] },
    { id: "V012", name: "Jambon blanc", category: "Viandes", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 12.00, allergens: [] },
    { id: "V013", name: "Saucisse", category: "Viandes", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 9.00, allergens: [] },
    { id: "V014", name: "Chorizo", category: "Viandes", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 15.00, allergens: [] },
    { id: "V015", name: "Bacon", category: "Viandes", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 12.00, allergens: [] },
    
    // POISSONS (15)
    { id: "P001", name: "Saumon - Filet", category: "Poissons", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 25.00, allergens: ["poisson"] },
    { id: "P002", name: "Saumon fumé", category: "Poissons", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 40.00, allergens: ["poisson"] },
    { id: "P003", name: "Cabillaud - Filet", category: "Poissons", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 18.00, allergens: ["poisson"] },
    { id: "P004", name: "Thon - Steak", category: "Poissons", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 30.00, allergens: ["poisson"] },
    { id: "P005", name: "Dorade - Filet", category: "Poissons", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 22.00, allergens: ["poisson"] },
    { id: "P006", name: "Bar (Loup)", category: "Poissons", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 28.00, allergens: ["poisson"] },
    { id: "P007", name: "Crevette décortiquée", category: "Poissons", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 35.00, allergens: ["crustacés"] },
    { id: "P008", name: "Gambas", category: "Poissons", yieldPercent: 50, wasteType: "Carapace", baseUnit: "g", avgPricePerKg: 30.00, allergens: ["crustacés"] },
    { id: "P009", name: "Saint-Jacques - Noix", category: "Poissons", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 45.00, allergens: ["mollusques"] },
    { id: "P010", name: "Moule", category: "Poissons", yieldPercent: 40, wasteType: "Coquille", baseUnit: "g", avgPricePerKg: 5.00, allergens: ["mollusques"] },
    { id: "P011", name: "Calamar", category: "Poissons", yieldPercent: 70, wasteType: "Tête + os", baseUnit: "g", avgPricePerKg: 12.00, allergens: ["mollusques"] },
    { id: "P012", name: "Truite", category: "Poissons", yieldPercent: 55, wasteType: "Tête + arêtes", baseUnit: "g", avgPricePerKg: 12.00, allergens: ["poisson"] },
    { id: "P013", name: "Sardine", category: "Poissons", yieldPercent: 60, wasteType: "Tête + arêtes", baseUnit: "g", avgPricePerKg: 5.00, allergens: ["poisson"] },
    { id: "P014", name: "Anchois", category: "Poissons", yieldPercent: 50, wasteType: "Tête + arêtes", baseUnit: "g", avgPricePerKg: 15.00, allergens: ["poisson"] },
    { id: "P015", name: "Maquereau", category: "Poissons", yieldPercent: 55, wasteType: "Tête + arêtes", baseUnit: "g", avgPricePerKg: 6.00, allergens: ["poisson"] },
    
    // PRODUITS LAITIERS (10)
    { id: "D001", name: "Lait entier", category: "Laitiers", yieldPercent: 100, wasteType: "Aucun", baseUnit: "ml", avgPricePerKg: 1.20, allergens: ["lait"] },
    { id: "D002", name: "Crème liquide 30%", category: "Laitiers", yieldPercent: 100, wasteType: "Aucun", baseUnit: "ml", avgPricePerKg: 3.50, allergens: ["lait"] },
    { id: "D003", name: "Beurre doux", category: "Laitiers", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 7.00, allergens: ["lait"] },
    { id: "D004", name: "Fromage blanc", category: "Laitiers", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 3.00, allergens: ["lait"] },
    { id: "D005", name: "Yaourt nature", category: "Laitiers", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 2.50, allergens: ["lait"] },
    { id: "D006", name: "Mozzarella", category: "Laitiers", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 10.00, allergens: ["lait"] },
    { id: "D007", name: "Parmesan", category: "Laitiers", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 25.00, allergens: ["lait"] },
    { id: "D008", name: "Gruyère", category: "Laitiers", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 18.00, allergens: ["lait"] },
    { id: "D009", name: "Chèvre frais", category: "Laitiers", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 10.00, allergens: ["lait"] },
    { id: "D010", name: "Mascarpone", category: "Laitiers", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 12.00, allergens: ["lait"] },
    
    // CÉRÉALES & LÉGUMINEUSES (10)
    { id: "C001", name: "Riz blanc", category: "Céréales", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 2.50, allergens: [] },
    { id: "C002", name: "Pâtes", category: "Céréales", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 2.00, allergens: ["gluten"] },
    { id: "C003", name: "Quinoa", category: "Céréales", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 8.00, allergens: [] },
    { id: "C004", name: "Farine T55", category: "Céréales", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 1.50, allergens: ["gluten"] },
    { id: "C005", name: "Lentilles vertes", category: "Céréales", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 4.00, allergens: [] },
    { id: "C006", name: "Pois chiches", category: "Céréales", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 4.50, allergens: [] },
    { id: "C007", name: "Haricots rouges", category: "Céréales", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 4.00, allergens: [] },
    { id: "C008", name: "Pain de mie", category: "Céréales", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 3.50, allergens: ["gluten"] },
    { id: "C009", name: "Chapelure", category: "Céréales", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 4.00, allergens: ["gluten"] },
    { id: "C010", name: "Couscous", category: "Céréales", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 3.00, allergens: ["gluten"] },
    
    // HERBES & ÉPICES (10)
    { id: "H001", name: "Sel", category: "Épices", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 1.00, allergens: [] },
    { id: "H002", name: "Poivre noir", category: "Épices", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 15.00, allergens: [] },
    { id: "H003", name: "Basilic frais", category: "Herbes", yieldPercent: 80, wasteType: "Tiges", baseUnit: "g", avgPricePerKg: 30.00, allergens: [] },
    { id: "H004", name: "Persil frais", category: "Herbes", yieldPercent: 75, wasteType: "Tiges", baseUnit: "g", avgPricePerKg: 15.00, allergens: [] },
    { id: "H005", name: "Coriandre fraîche", category: "Herbes", yieldPercent: 75, wasteType: "Tiges", baseUnit: "g", avgPricePerKg: 18.00, allergens: [] },
    { id: "H006", name: "Thym", category: "Herbes", yieldPercent: 90, wasteType: "Tiges dures", baseUnit: "g", avgPricePerKg: 40.00, allergens: [] },
    { id: "H007", name: "Romarin", category: "Herbes", yieldPercent: 90, wasteType: "Tiges dures", baseUnit: "g", avgPricePerKg: 35.00, allergens: [] },
    { id: "H008", name: "Paprika", category: "Épices", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 12.00, allergens: [] },
    { id: "H009", name: "Cumin", category: "Épices", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 10.00, allergens: [] },
    { id: "H010", name: "Curry", category: "Épices", yieldPercent: 100, wasteType: "Aucun", baseUnit: "g", avgPricePerKg: 15.00, allergens: ["moutarde"] }
  ],
  
  /**
   * Recherche un ingrédient par nom
   */
  findByName(name) {
    const searchTerm = name.toLowerCase();
    return this.ingredients.find(i => i.name.toLowerCase().includes(searchTerm));
  },
  
  /**
   * Filtre par catégorie
   */
  filterByCategory(category) {
    return this.ingredients.filter(i => i.category === category);
  },
  
  /**
   * Récupère toutes les catégories
   */
  getCategories() {
    return [...new Set(this.ingredients.map(i => i.category))];
  },
  
  /**
   * Exporte en JSON
   */
  exportToJSON() {
    return JSON.stringify(this.ingredients, null, 2);
  }
};
