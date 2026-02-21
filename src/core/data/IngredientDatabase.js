/**
 * BASE DE DONNÉES - 100 INGRÉDIENTS ESSENTIELS
 * Les plus utilisés en restauration professionnelle
 * Version intégrée directement dans le code
 * @module core/data/IngredientDatabase
 */

export const IngredientDatabase = {
  
  version: "1.0.0",
  lastUpdate: "2026-02-02",
  totalItems: 100,
  description: "100 ingrédients essentiels avec rendements pré-calculés",
  
  // ========================================
  // FRUITS (20 items)
  // ========================================
  fruits: [
    { id: "F001", name: "Pomme", yieldPercent: 85, wasteType: "Peau + cœur + pépins", avgPricePerKg: 2.50 },
    { id: "F002", name: "Banane", yieldPercent: 65, wasteType: "Peau", avgPricePerKg: 2.00 },
    { id: "F003", name: "Orange", yieldPercent: 70, wasteType: "Peau + pépins", avgPricePerKg: 2.50 },
    { id: "F004", name: "Citron", yieldPercent: 85, wasteType: "Peau (si non utilisée)", avgPricePerKg: 3.50 },
    { id: "F005", name: "Fraise", yieldPercent: 92, wasteType: "Queue", avgPricePerKg: 8.00 },
    { id: "F006", name: "Ananas", yieldPercent: 40, wasteType: "Peau + cœur + yeux", avgPricePerKg: 3.50 },
    { id: "F007", name: "Mangue", yieldPercent: 60, wasteType: "Peau + noyau", avgPricePerKg: 6.00 },
    { id: "F008", name: "Avocat", yieldPercent: 75, wasteType: "Peau + noyau", avgPricePerKg: 8.00 },
    { id: "F009", name: "Kiwi", yieldPercent: 80, wasteType: "Peau", avgPricePerKg: 5.00 },
    { id: "F010", name: "Pêche", yieldPercent: 90, wasteType: "Noyau", avgPricePerKg: 4.50 },
    { id: "F011", name: "Poire", yieldPercent: 88, wasteType: "Peau + cœur + pépins", avgPricePerKg: 3.00 },
    { id: "F012", name: "Raisin", yieldPercent: 95, wasteType: "Tige + pépins", avgPricePerKg: 6.00 },
    { id: "F013", name: "Melon", yieldPercent: 55, wasteType: "Écorce + pépins", avgPricePerKg: 2.50 },
    { id: "F014", name: "Pastèque", yieldPercent: 50, wasteType: "Écorce + pépins", avgPricePerKg: 1.50 },
    { id: "F015", name: "Framboise", yieldPercent: 98, wasteType: "Minimal", avgPricePerKg: 15.00 },
    { id: "F016", name: "Myrtille", yieldPercent: 98, wasteType: "Minimal", avgPricePerKg: 18.00 },
    { id: "F017", name: "Cerise", yieldPercent: 90, wasteType: "Queue + noyau", avgPricePerKg: 10.00 },
    { id: "F018", name: "Abricot", yieldPercent: 92, wasteType: "Noyau", avgPricePerKg: 5.50 },
    { id: "F019", name: "Prune", yieldPercent: 93, wasteType: "Noyau", avgPricePerKg: 4.00 },
    { id: "F020", name: "Pamplemousse", yieldPercent: 65, wasteType: "Peau + membranes", avgPricePerKg: 3.00 }
  ],
  
  // ========================================
  // LÉGUMES (25 items)
  // ========================================
  legumes: [
    { id: "L001", name: "Tomate", yieldPercent: 95, wasteType: "Pédoncule", avgPricePerKg: 4.00 },
    { id: "L002", name: "Carotte", yieldPercent: 80, wasteType: "Épluchures + bout", avgPricePerKg: 1.80 },
    { id: "L003", name: "Pomme de terre", yieldPercent: 85, wasteType: "Épluchures", avgPricePerKg: 1.50 },
    { id: "L004", name: "Oignon jaune", yieldPercent: 88, wasteType: "Peau + racines", avgPricePerKg: 2.00 },
    { id: "L005", name: "Poivron rouge", yieldPercent: 85, wasteType: "Pédoncule + graines", avgPricePerKg: 5.00 },
    { id: "L006", name: "Courgette", yieldPercent: 92, wasteType: "Bout", avgPricePerKg: 2.50 },
    { id: "L007", name: "Aubergine", yieldPercent: 90, wasteType: "Bout + pédoncule", avgPricePerKg: 3.50 },
    { id: "L008", name: "Concombre", yieldPercent: 95, wasteType: "Bout", avgPricePerKg: 2.50 },
    { id: "L009", name: "Laitue", yieldPercent: 70, wasteType: "Trognon + feuilles externes", avgPricePerKg: 3.00 },
    { id: "L010", name: "Brocoli", yieldPercent: 65, wasteType: "Tronc épais + feuilles", avgPricePerKg: 4.50 },
    { id: "L011", name: "Chou-fleur", yieldPercent: 60, wasteType: "Feuilles + tronc", avgPricePerKg: 3.50 },
    { id: "L012", name: "Haricot vert", yieldPercent: 90, wasteType: "Bout + fil", avgPricePerKg: 6.00 },
    { id: "L013", name: "Épinard", yieldPercent: 75, wasteType: "Tiges + feuilles abîmées", avgPricePerKg: 5.00 },
    { id: "L014", name: "Champignon de Paris", yieldPercent: 95, wasteType: "Bout terreux", avgPricePerKg: 8.00 },
    { id: "L015", name: "Poireau", yieldPercent: 60, wasteType: "Vert + racines", avgPricePerKg: 3.00 },
    { id: "L016", name: "Céleri branche", yieldPercent: 70, wasteType: "Feuilles + bout", avgPricePerKg: 3.50 },
    { id: "L017", name: "Ail", yieldPercent: 85, wasteType: "Peau", avgPricePerKg: 8.00 },
    { id: "L018", name: "Échalote", yieldPercent: 88, wasteType: "Peau", avgPricePerKg: 6.00 },
    { id: "L019", name: "Navet", yieldPercent: 80, wasteType: "Peau + fanes", avgPricePerKg: 2.50 },
    { id: "L020", name: "Betterave rouge", yieldPercent: 80, wasteType: "Peau + fanes", avgPricePerKg: 2.50 },
    { id: "L021", name: "Courge butternut", yieldPercent: 70, wasteType: "Peau + graines", avgPricePerKg: 2.80 },
    { id: "L022", name: "Potiron", yieldPercent: 65, wasteType: "Peau + graines", avgPricePerKg: 2.00 },
    { id: "L023", name: "Asperge verte", yieldPercent: 75, wasteType: "Bout ligneux", avgPricePerKg: 10.00 },
    { id: "L024", name: "Artichaut", yieldPercent: 40, wasteType: "Feuilles externes + foin", avgPricePerKg: 6.00 },
    { id: "L025", name: "Gingembre", yieldPercent: 85, wasteType: "Peau", avgPricePerKg: 12.00 }
  ],
  
  // ========================================
  // VIANDES (15 items)
  // ========================================
  viandes: [
    { id: "V001", name: "Poulet - Filet", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 12.00 },
    { id: "V002", name: "Poulet - Cuisse", yieldPercent: 70, wasteType: "Os + peau", avgPricePerKg: 8.00 },
    { id: "V003", name: "Bœuf - Entrecôte", yieldPercent: 100, wasteType: "Aucun (paré)", avgPricePerKg: 25.00 },
    { id: "V004", name: "Bœuf - Filet", yieldPercent: 100, wasteType: "Aucun (paré)", avgPricePerKg: 45.00 },
    { id: "V005", name: "Bœuf haché 15% MG", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 12.00 },
    { id: "V006", name: "Porc - Filet mignon", yieldPercent: 100, wasteType: "Aucun (paré)", avgPricePerKg: 15.00 },
    { id: "V007", name: "Porc - Côte", yieldPercent: 65, wasteType: "Os + gras", avgPricePerKg: 10.00 },
    { id: "V008", name: "Agneau - Gigot", yieldPercent: 70, wasteType: "Os + gras", avgPricePerKg: 18.00 },
    { id: "V009", name: "Veau - Escalope", yieldPercent: 100, wasteType: "Aucun (paré)", avgPricePerKg: 28.00 },
    { id: "V010", name: "Canard - Magret", yieldPercent: 85, wasteType: "Gras", avgPricePerKg: 18.00 },
    { id: "V011", name: "Dinde - Escalope", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 10.00 },
    { id: "V012", name: "Lardons fumés", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 10.00 },
    { id: "V013", name: "Jambon blanc", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 12.00 },
    { id: "V014", name: "Saucisse", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 9.00 },
    { id: "V015", name: "Foie de volaille", yieldPercent: 95, wasteType: "Bile + parties vertes", avgPricePerKg: 8.00 }
  ],
  
  // ========================================
  // POISSONS & FRUITS DE MER (15 items)
  // ========================================
  poissons: [
    { id: "P001", name: "Saumon - Filet", yieldPercent: 100, wasteType: "Aucun (paré)", avgPricePerKg: 25.00, allergens: ["poisson"] },
    { id: "P002", name: "Cabillaud - Filet", yieldPercent: 100, wasteType: "Aucun (paré)", avgPricePerKg: 18.00, allergens: ["poisson"] },
    { id: "P003", name: "Thon - Steak", yieldPercent: 100, wasteType: "Aucun (paré)", avgPricePerKg: 30.00, allergens: ["poisson"] },
    { id: "P004", name: "Dorade - Filet", yieldPercent: 100, wasteType: "Aucun (paré)", avgPricePerKg: 22.00, allergens: ["poisson"] },
    { id: "P005", name: "Bar (Loup) - Filet", yieldPercent: 100, wasteType: "Aucun (paré)", avgPricePerKg: 28.00, allergens: ["poisson"] },
    { id: "P006", name: "Crevette - Décortiquée", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 35.00, allergens: ["crustacés"] },
    { id: "P007", name: "Crevette rose - Entière", yieldPercent: 50, wasteType: "Tête + carapace", avgPricePerKg: 25.00, allergens: ["crustacés"] },
    { id: "P008", name: "Moule - Entière", yieldPercent: 40, wasteType: "Coquille + byssus", avgPricePerKg: 5.00, allergens: ["mollusques"] },
    { id: "P009", name: "Calamar - Entier", yieldPercent: 70, wasteType: "Tête + os + peau", avgPricePerKg: 12.00, allergens: ["mollusques"] },
    { id: "P010", name: "Coquille Saint-Jacques - Noix", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 45.00, allergens: ["mollusques"] },
    { id: "P011", name: "Saumon fumé", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 40.00, allergens: ["poisson"] },
    { id: "P012", name: "Anchois - Filet", yieldPercent: 100, wasteType: "Aucun (paré)", avgPricePerKg: 25.00, allergens: ["poisson"] },
    { id: "P013", name: "Sardine - Entière", yieldPercent: 60, wasteType: "Tête + arêtes", avgPricePerKg: 5.00, allergens: ["poisson"] },
    { id: "P014", name: "Truite - Entière", yieldPercent: 55, wasteType: "Tête + arêtes", avgPricePerKg: 12.00, allergens: ["poisson"] },
    { id: "P015", name: "Homard - Entier", yieldPercent: 40, wasteType: "Carapace + tête", avgPricePerKg: 50.00, allergens: ["crustacés"] }
  ],
  
  // ========================================
  // PRODUITS LAITIERS (10 items)
  // ========================================
  laitiers: [
    { id: "D001", name: "Lait entier", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 1.20, allergens: ["lait"] },
    { id: "D002", name: "Crème fraîche liquide 30%", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 3.50, allergens: ["lait"] },
    { id: "D003", name: "Beurre doux", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 7.00, allergens: ["lait"] },
    { id: "D004", name: "Parmesan", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 25.00, allergens: ["lait"] },
    { id: "D005", name: "Mozzarella", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 10.00, allergens: ["lait"] },
    { id: "D006", name: "Gruyère", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 18.00, allergens: ["lait"] },
    { id: "D007", name: "Chèvre frais", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 10.00, allergens: ["lait"] },
    { id: "D008", name: "Mascarpone", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 12.00, allergens: ["lait"] },
    { id: "D009", name: "Yaourt nature", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 2.50, allergens: ["lait"] },
    { id: "D010", name: "Fromage blanc", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 3.00, allergens: ["lait"] }
  ],
  
  // ========================================
  // CÉRÉALES & LÉGUMINEUSES (10 items)
  // ========================================
  cereales: [
    { id: "C001", name: "Riz blanc", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 2.50 },
    { id: "C002", name: "Riz basmati", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 4.00 },
    { id: "C003", name: "Pâtes sèches", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 2.00, allergens: ["gluten"] },
    { id: "C004", name: "Farine de blé T55", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 1.50, allergens: ["gluten"] },
    { id: "C005", name: "Quinoa", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 8.00 },
    { id: "C006", name: "Lentilles vertes", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 4.00 },
    { id: "C007", name: "Pois chiches", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 4.50 },
    { id: "C008", name: "Haricots rouges", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 4.00 },
    { id: "C009", name: "Couscous", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 3.00, allergens: ["gluten"] },
    { id: "C010", name: "Pain de mie", yieldPercent: 95, wasteType: "Croûte (optionnel)", avgPricePerKg: 3.50, allergens: ["gluten"] }
  ],
  
  // ========================================
  // AUTRES ESSENTIELS (5 items)
  // ========================================
  autres: [
    { id: "A001", name: "Œuf", yieldPercent: 88, wasteType: "Coquille", avgPricePerKg: 3.00, allergens: ["œufs"] },
    { id: "A002", name: "Huile d'olive", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 8.00 },
    { id: "A003", name: "Huile de tournesol", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 3.00 },
    { id: "A004", name: "Sucre blanc", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 1.50 },
    { id: "A005", name: "Sel fin", yieldPercent: 100, wasteType: "Aucun", avgPricePerKg: 1.00 }
  ],
  
  /**
   * Récupère tous les ingrédients (toutes catégories)
   */
  getAllIngredients() {
    return [
      ...this.fruits,
      ...this.legumes,
      ...this.viandes,
      ...this.poissons,
      ...this.laitiers,
      ...this.cereales,
      ...this.autres
    ];
  },
  
  /**
   * Recherche un ingrédient par nom
   */
  searchByName(query) {
    const lowerQuery = query.toLowerCase();
    return this.getAllIngredients().filter(ing => 
      ing.name.toLowerCase().includes(lowerQuery)
    );
  },
  
  /**
   * Récupère un ingrédient par ID
   */
  getById(id) {
    return this.getAllIngredients().find(ing => ing.id === id);
  },
  
  /**
   * Récupère les ingrédients par catégorie
   */
  getByCategory(category) {
    const categories = {
      'fruits': this.fruits,
      'legumes': this.legumes,
      'viandes': this.viandes,
      'poissons': this.poissons,
      'laitiers': this.laitiers,
      'cereales': this.cereales,
      'autres': this.autres
    };
    return categories[category] || [];
  }
};
