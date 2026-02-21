/**
 * NOUVELLE DÉMO - SALON MODERNE
 * Prix réels du marché européen (EUR)
 * Recettes cohérentes avec rendements calculés
 */

export const demoSalonModerne = {
  settings: {
    businessName: "Le Salon Gourmand",
    businessType: "Salon de thé & Bar à jus",
    address: "Paris, France",
    currency: "EUR",
    overheadCoefficient: 1.40,
    showDirectCost: true
  },

  // INGRÉDIENTS avec PRIX RÉELS du marché européen
  ingredients: [
    // === FARINES ===
    {
      id: 'ing_farine_t45',
      name: 'Farine de blé T45',
      category: 'Farines',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 5000,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_farine_001',
        quantiteInitiale: 25000, // 25kg
        quantite: 25000,
        prixTotal: 37.50, // 1.50€/kg
        fraisApproche: 0,
        dlc: new Date('2026-12-31').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'FAR-T45-2026-001',
        receivedBy: 'Julie Moreau',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === SUCRES ===
    {
      id: 'ing_sucre',
      name: 'Sucre cristallisé blanc',
      category: 'Sucres',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 3000,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_sucre_001',
        quantiteInitiale: 10000, // 10kg
        quantite: 10000,
        prixTotal: 12.00, // 1.20€/kg
        fraisApproche: 0,
        dlc: new Date('2027-12-31').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'SUC-2026-001',
        receivedBy: 'Julie Moreau',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_cassonade',
      name: 'Cassonade (sucre roux)',
      category: 'Sucres',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 2000,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_cassonade_001',
        quantiteInitiale: 5000, // 5kg
        quantite: 5000,
        prixTotal: 8.50, // 1.70€/kg
        fraisApproche: 0,
        dlc: new Date('2027-12-31').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'CASS-2026-001',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === MATIÈRES GRASSES ===
    {
      id: 'ing_beurre',
      name: 'Beurre doux 82% MG',
      category: 'Matières grasses',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 2000,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_beurre_001',
        quantiteInitiale: 5000, // 5kg
        quantite: 5000,
        prixTotal: 40.00, // 8.00€/kg
        fraisApproche: 0,
        dlc: new Date('2026-04-01').toISOString(),
        dateReception: new Date('2026-02-03').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'BEU-2026-003',
        receivedBy: 'Thomas Petit',
        epuise: false
      }],
      createdAt: new Date('2026-02-03').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_beurre_sale',
      name: 'Beurre demi-sel (pour caramel)',
      category: 'Matières grasses',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 1000,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_beurre_sale_001',
        quantiteInitiale: 2000, // 2kg
        quantite: 2000,
        prixTotal: 17.00, // 8.50€/kg
        fraisApproche: 0,
        dlc: new Date('2026-04-01').toISOString(),
        dateReception: new Date('2026-02-03').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'BEU-DS-2026-003',
        epuise: false
      }],
      createdAt: new Date('2026-02-03').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === PRODUITS LAITIERS ===
    {
      id: 'ing_lait',
      name: 'Lait entier UHT',
      category: 'Produits laitiers',
      baseUnit: 'ml',
      displayUnit: 'L',
      alertBaseQty: 5000,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_lait_001',
        quantiteInitiale: 20000, // 20L
        quantite: 20000,
        prixTotal: 22.00, // 1.10€/L
        fraisApproche: 0,
        dlc: new Date('2026-06-01').toISOString(),
        dateReception: new Date('2026-02-02').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'LAIT-2026-002',
        epuise: false
      }],
      createdAt: new Date('2026-02-02').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_oeufs',
      name: 'Œufs frais calibre M (53-63g)',
      category: 'Produits laitiers',
      baseUnit: 'piece',
      displayUnit: 'piece',
      alertBaseQty: 30,
      yieldPercent: 88,
      wasteType: 'Coquilles (12%)',
      lots: [{
        id: 'lot_oeufs_001',
        quantiteInitiale: 180, // 180 œufs (30 boîtes de 6)
        quantite: 180,
        prixTotal: 45.00, // 0.25€/œuf
        fraisApproche: 0,
        dlc: new Date('2026-02-28').toISOString(),
        dateReception: new Date('2026-02-05').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'OEU-2026-005',
        epuise: false
      }],
      createdAt: new Date('2026-02-05').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_creme',
      name: 'Crème liquide entière 30% MG',
      category: 'Produits laitiers',
      baseUnit: 'ml',
      displayUnit: 'L',
      alertBaseQty: 1000,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_creme_001',
        quantiteInitiale: 5000, // 5L
        quantite: 5000,
        prixTotal: 17.50, // 3.50€/L
        fraisApproche: 0,
        dlc: new Date('2026-03-15').toISOString(),
        dateReception: new Date('2026-02-04').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'CRE-2026-004',
        epuise: false
      }],
      createdAt: new Date('2026-02-04').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === CHOCOLATS ===
    {
      id: 'ing_chocolat_noir',
      name: 'Chocolat noir 70% (pâtisserie)',
      category: 'Chocolats',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 1000,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_choco_001',
        quantiteInitiale: 3000, // 3kg
        quantite: 3000,
        prixTotal: 36.00, // 12.00€/kg
        fraisApproche: 0,
        dlc: new Date('2027-12-31').toISOString(),
        dateReception: new Date('2026-02-02').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'CHO-70-2026-002',
        epuise: false
      }],
      createdAt: new Date('2026-02-02').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_cacao',
      name: 'Cacao en poudre non sucré',
      category: 'Chocolats',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 500,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_cacao_001',
        quantiteInitiale: 1000, // 1kg
        quantite: 1000,
        prixTotal: 15.00, // 15.00€/kg
        fraisApproche: 0,
        dlc: new Date('2027-12-31').toISOString(),
        dateReception: new Date('2026-02-02').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'CAC-2026-002',
        epuise: false
      }],
      createdAt: new Date('2026-02-02').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === FRUITS FRAIS ===
    {
      id: 'ing_citrons',
      name: 'Citrons jaunes (calibre 4)',
      category: 'Fruits',
      baseUnit: 'piece',
      displayUnit: 'piece',
      alertBaseQty: 20,
      yieldPercent: 60,
      wasteType: 'Zeste et pépins (40%)',
      lots: [{
        id: 'lot_citrons_001',
        quantiteInitiale: 100, // 100 citrons (~15kg)
        quantite: 100,
        prixTotal: 40.00, // 0.40€/pièce
        fraisApproche: 0,
        dlc: new Date('2026-02-20').toISOString(),
        dateReception: new Date('2026-02-06').toISOString(),
        fournisseur: 'Rungis',
        numeroLot: 'CIT-2026-006',
        epuise: false
      }],
      createdAt: new Date('2026-02-06').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_oranges',
      name: 'Oranges à jus (calibre 3)',
      category: 'Fruits',
      baseUnit: 'piece',
      displayUnit: 'piece',
      alertBaseQty: 30,
      yieldPercent: 55,
      wasteType: 'Écorce et membranes (45%)',
      lots: [{
        id: 'lot_oranges_001',
        quantiteInitiale: 150, // 150 oranges (~30kg)
        quantite: 150,
        prixTotal: 52.50, // 0.35€/pièce
        fraisApproche: 0,
        dlc: new Date('2026-02-20').toISOString(),
        dateReception: new Date('2026-02-06').toISOString(),
        fournisseur: 'Rungis',
        numeroLot: 'ORA-2026-006',
        epuise: false
      }],
      createdAt: new Date('2026-02-06').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_ananas',
      name: 'Ananas Victoria (1-1.5kg)',
      category: 'Fruits',
      baseUnit: 'piece',
      displayUnit: 'piece',
      alertBaseQty: 10,
      yieldPercent: 52,
      wasteType: 'Peau et cœur (48%)',
      lots: [{
        id: 'lot_ananas_001',
        quantiteInitiale: 50, // 50 ananas
        quantite: 50,
        prixTotal: 125.00, // 2.50€/pièce
        fraisApproche: 0,
        dlc: new Date('2026-02-15').toISOString(),
        dateReception: new Date('2026-02-05').toISOString(),
        fournisseur: 'Rungis',
        numeroLot: 'ANA-2026-005',
        epuise: false
      }],
      createdAt: new Date('2026-02-05').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_pommes',
      name: 'Pommes Golden (calibre 2)',
      category: 'Fruits',
      baseUnit: 'piece',
      displayUnit: 'piece',
      alertBaseQty: 20,
      yieldPercent: 85,
      wasteType: 'Trognon et pépins (15%)',
      lots: [{
        id: 'lot_pommes_001',
        quantiteInitiale: 100, // 100 pommes (~20kg)
        quantite: 100,
        prixTotal: 35.00, // 0.35€/pièce
        fraisApproche: 0,
        dlc: new Date('2026-03-01').toISOString(),
        dateReception: new Date('2026-02-04').toISOString(),
        fournisseur: 'Rungis',
        numeroLot: 'POM-2026-004',
        epuise: false
      }],
      createdAt: new Date('2026-02-04').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_bananes',
      name: 'Bananes Cavendish',
      category: 'Fruits',
      baseUnit: 'piece',
      displayUnit: 'piece',
      alertBaseQty: 30,
      yieldPercent: 65,
      wasteType: 'Peau (35%)',
      lots: [{
        id: 'lot_bananes_001',
        quantiteInitiale: 150, // 150 bananes (~25kg)
        quantite: 150,
        prixTotal: 30.00, // 0.20€/pièce
        fraisApproche: 0,
        dlc: new Date('2026-02-14').toISOString(),
        dateReception: new Date('2026-02-06').toISOString(),
        fournisseur: 'Rungis',
        numeroLot: 'BAN-2026-006',
        epuise: false
      }],
      createdAt: new Date('2026-02-06').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === ÉPICES & ARÔMES ===
    {
      id: 'ing_gingembre',
      name: 'Gingembre frais',
      category: 'Épices',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 200,
      yieldPercent: 85,
      wasteType: 'Peau (15%)',
      lots: [{
        id: 'lot_gingembre_001',
        quantiteInitiale: 2000, // 2kg
        quantite: 2000,
        prixTotal: 20.00, // 10.00€/kg
        fraisApproche: 0,
        dlc: new Date('2026-03-01').toISOString(),
        dateReception: new Date('2026-02-03').toISOString(),
        fournisseur: 'Rungis',
        numeroLot: 'GIN-2026-003',
        epuise: false
      }],
      createdAt: new Date('2026-02-03').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_vanille',
      name: 'Extrait de vanille naturel',
      category: 'Arômes',
      baseUnit: 'ml',
      displayUnit: 'ml',
      alertBaseQty: 50,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_vanille_001',
        quantiteInitiale: 250, // 250ml
        quantite: 250,
        prixTotal: 35.00, // 140€/L (produit premium)
        fraisApproche: 0,
        dlc: new Date('2028-12-31').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'VAN-2026-001',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_sel',
      name: 'Sel fin de mer',
      category: 'Épices',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 200,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_sel_001',
        quantiteInitiale: 2000, // 2kg
        quantite: 2000,
        prixTotal: 3.00, // 1.50€/kg
        fraisApproche: 0,
        dlc: new Date('2030-12-31').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'SEL-2026-001',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_levure',
      name: 'Levure chimique (poudre)',
      category: 'Additifs',
      baseUnit: 'g',
      displayUnit: 'g',
      alertBaseQty: 100,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_levure_001',
        quantiteInitiale: 500, // 500g
        quantite: 500,
        prixTotal: 8.00, // 16€/kg
        fraisApproche: 0,
        dlc: new Date('2027-12-31').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'LEV-2026-001',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === ALCOOLS ===
    {
      id: 'ing_rhum_ambre',
      name: 'Rhum ambré agricole 40°',
      category: 'Alcools',
      baseUnit: 'ml',
      displayUnit: 'L',
      alertBaseQty: 500,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_rhum_001',
        quantiteInitiale: 3000, // 3L (3 bouteilles 1L)
        quantite: 3000,
        prixTotal: 54.00, // 18€/L
        fraisApproche: 0,
        dlc: new Date('2030-12-31').toISOString(),
        dateReception: new Date('2026-02-02').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'RHU-2026-002',
        epuise: false
      }],
      createdAt: new Date('2026-02-02').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === AUTRES ===
    {
      id: 'ing_eau_source',
      name: 'Eau de source en bouteille 1.5L',
      category: 'Boissons',
      baseUnit: 'ml',
      displayUnit: 'L',
      alertBaseQty: 10000,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_eau_001',
        quantiteInitiale: 60000, // 60L (40 bouteilles 1.5L)
        quantite: 60000,
        prixTotal: 12.00, // 0.20€/L
        fraisApproche: 0,
        dlc: new Date('2028-12-31').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'EAU-2026-001',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_miel',
      name: 'Miel d\'acacia liquide',
      category: 'Sucres',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 500,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_miel_001',
        quantiteInitiale: 2000, // 2kg
        quantite: 2000,
        prixTotal: 24.00, // 12€/kg
        fraisApproche: 0,
        dlc: new Date('2028-12-31').toISOString(),
        dateReception: new Date('2026-02-02').toISOString(),
        fournisseur: 'Apiculteur local',
        numeroLot: 'MIE-2026-002',
        epuise: false
      }],
      createdAt: new Date('2026-02-02').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    }
  ],

  // RECETTES avec QUANTITÉS DEMANDÉES
  recipes: [
    // === GAUFRES (pour 1kg de farine chacune) ===
    {
      id: 'rec_gaufre_chocolat',
      name: 'Gaufres au Chocolat (1kg farine)',
      category: 'Gaufres',
      producedQty: 50,
      producedUnit: 'piece',
      sellingPrice: 2.50,
      preparationTime: 60,
      instructions: `1. Mélanger la farine, le cacao, le sucre et la levure
2. Battre les œufs avec le lait
3. Incorporer le beurre fondu
4. Mélanger jusqu'à obtenir une pâte lisse
5. Laisser reposer 30 minutes
6. Préchauffer le gaufrier
7. Cuire 3-4 minutes par gaufre
8. Décorer avec du chocolat fondu`,
      ingredients: [
        { ingredientId: 'ing_farine_t45', ingredientName: 'Farine T45', quantity: 1000, unit: 'g', baseQty: 1000, baseUnit: 'g' },
        { ingredientId: 'ing_cacao', ingredientName: 'Cacao poudre', quantity: 80, unit: 'g', baseQty: 80, baseUnit: 'g' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre', quantity: 200, unit: 'g', baseQty: 200, baseUnit: 'g' },
        { ingredientId: 'ing_oeufs', ingredientName: 'Œufs', quantity: 8, unit: 'piece', baseQty: 8, baseUnit: 'piece' },
        { ingredientId: 'ing_lait', ingredientName: 'Lait', quantity: 1200, unit: 'ml', baseQty: 1200, baseUnit: 'ml' },
        { ingredientId: 'ing_beurre', ingredientName: 'Beurre fondu', quantity: 200, unit: 'g', baseQty: 200, baseUnit: 'g' },
        { ingredientId: 'ing_levure', ingredientName: 'Levure chimique', quantity: 20, unit: 'g', baseQty: 20, baseUnit: 'g' },
        { ingredientId: 'ing_chocolat_noir', ingredientName: 'Chocolat noir (décor)', quantity: 200, unit: 'g', baseQty: 200, baseUnit: 'g' },
        { ingredientId: 'ing_sel', ingredientName: 'Sel', quantity: 5, unit: 'g', baseQty: 5, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-02-07').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'rec_gaufre_citron',
      name: 'Gaufres au Citron (1kg farine)',
      category: 'Gaufres',
      producedQty: 50,
      producedUnit: 'piece',
      sellingPrice: 2.30,
      preparationTime: 60,
      instructions: `1. Zester 4 citrons
2. Presser le jus de 4 citrons
3. Mélanger farine, sucre, levure, sel et zeste
4. Battre les œufs avec le lait et le jus de citron
5. Incorporer le beurre fondu
6. Mélanger délicatement
7. Laisser reposer 30 minutes
8. Cuire dans le gaufrier 3-4 minutes`,
      ingredients: [
        { ingredientId: 'ing_farine_t45', ingredientName: 'Farine T45', quantity: 1000, unit: 'g', baseQty: 1000, baseUnit: 'g' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre', quantity: 220, unit: 'g', baseQty: 220, baseUnit: 'g' },
        { ingredientId: 'ing_oeufs', ingredientName: 'Œufs', quantity: 8, unit: 'piece', baseQty: 8, baseUnit: 'piece' },
        { ingredientId: 'ing_lait', ingredientName: 'Lait', quantity: 1100, unit: 'ml', baseQty: 1100, baseUnit: 'ml' },
        { ingredientId: 'ing_beurre', ingredientName: 'Beurre', quantity: 200, unit: 'g', baseQty: 200, baseUnit: 'g' },
        { ingredientId: 'ing_citrons', ingredientName: 'Citrons (zeste + jus)', quantity: 8, unit: 'piece', baseQty: 8, baseUnit: 'piece' },
        { ingredientId: 'ing_levure', ingredientName: 'Levure', quantity: 20, unit: 'g', baseQty: 20, baseUnit: 'g' },
        { ingredientId: 'ing_sel', ingredientName: 'Sel', quantity: 5, unit: 'g', baseQty: 5, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-02-07').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'rec_gaufre_caramel',
      name: 'Gaufres Caramel Beurre Salé (1kg farine)',
      category: 'Gaufres',
      producedQty: 50,
      producedUnit: 'piece',
      sellingPrice: 3.00,
      preparationTime: 90,
      instructions: `CARAMEL BEURRE SALÉ:
1. Faire chauffer 300g de sucre à sec jusqu'à caramélisation
2. Ajouter 150g de beurre demi-sel et 200ml de crème
3. Mélanger et laisser refroidir

PÂTE À GAUFRES:
4. Mélanger farine, cassonade, levure, sel
5. Battre les œufs avec le lait
6. Incorporer le beurre fondu et 100g de caramel
7. Laisser reposer 30 minutes
8. Cuire les gaufres 3-4 minutes
9. Napper avec le caramel restant`,
      ingredients: [
        { ingredientId: 'ing_farine_t45', ingredientName: 'Farine T45', quantity: 1000, unit: 'g', baseQty: 1000, baseUnit: 'g' },
        { ingredientId: 'ing_cassonade', ingredientName: 'Cassonade (pâte)', quantity: 180, unit: 'g', baseQty: 180, baseUnit: 'g' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre (caramel)', quantity: 300, unit: 'g', baseQty: 300, baseUnit: 'g' },
        { ingredientId: 'ing_oeufs', ingredientName: 'Œufs', quantity: 8, unit: 'piece', baseQty: 8, baseUnit: 'piece' },
        { ingredientId: 'ing_lait', ingredientName: 'Lait', quantity: 1200, unit: 'ml', baseQty: 1200, baseUnit: 'ml' },
        { ingredientId: 'ing_beurre', ingredientName: 'Beurre doux (pâte)', quantity: 150, unit: 'g', baseQty: 150, baseUnit: 'g' },
        { ingredientId: 'ing_beurre_sale', ingredientName: 'Beurre salé (caramel)', quantity: 150, unit: 'g', baseQty: 150, baseUnit: 'g' },
        { ingredientId: 'ing_creme', ingredientName: 'Crème liquide', quantity: 200, unit: 'ml', baseQty: 200, baseUnit: 'ml' },
        { ingredientId: 'ing_levure', ingredientName: 'Levure', quantity: 20, unit: 'g', baseQty: 20, baseUnit: 'g' },
        { ingredientId: 'ing_sel', ingredientName: 'Sel', quantity: 5, unit: 'g', baseQty: 5, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-02-07').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === NECTARS (1L chacun) ===
    {
      id: 'rec_nectar_ananas_gingembre',
      name: 'Nectar Ananas-Gingembre (1L)',
      category: 'Nectars',
      producedQty: 1,
      producedUnit: 'L',
      sellingPrice: 4.50,
      preparationTime: 20,
      instructions: `1. Éplucher et découper 2 ananas en morceaux
2. Peler et râper 30g de gingembre frais
3. Mixer l'ananas avec le gingembre
4. Ajouter 700ml d'eau de source
5. Ajouter 80g de sucre
6. Mixer à nouveau jusqu'à consistance lisse
7. Filtrer légèrement
8. Réfrigérer et servir frais`,
      ingredients: [
        { ingredientId: 'ing_ananas', ingredientName: 'Ananas frais', quantity: 2, unit: 'piece', baseQty: 2, baseUnit: 'piece' },
        { ingredientId: 'ing_gingembre', ingredientName: 'Gingembre', quantity: 30, unit: 'g', baseQty: 30, baseUnit: 'g' },
        { ingredientId: 'ing_eau_source', ingredientName: 'Eau de source', quantity: 700, unit: 'ml', baseQty: 700, baseUnit: 'ml' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre', quantity: 80, unit: 'g', baseQty: 80, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-02-07').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'rec_nectar_ananas_pomme',
      name: 'Nectar Ananas-Pomme (1L)',
      category: 'Nectars',
      producedQty: 1,
      producedUnit: 'L',
      sellingPrice: 4.20,
      preparationTime: 20,
      instructions: `1. Éplucher et découper 1 ananas
2. Laver et découper 4 pommes (avec peau)
3. Mixer ensemble l'ananas et les pommes
4. Ajouter 600ml d'eau de source
5. Ajouter 60g de sucre
6. Mixer jusqu'à consistance homogène
7. Filtrer pour retirer les fibres
8. Réfrigérer et servir bien frais`,
      ingredients: [
        { ingredientId: 'ing_ananas', ingredientName: 'Ananas frais', quantity: 1, unit: 'piece', baseQty: 1, baseUnit: 'piece' },
        { ingredientId: 'ing_pommes', ingredientName: 'Pommes Golden', quantity: 4, unit: 'piece', baseQty: 4, baseUnit: 'piece' },
        { ingredientId: 'ing_eau_source', ingredientName: 'Eau de source', quantity: 600, unit: 'ml', baseQty: 600, baseUnit: 'ml' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre', quantity: 60, unit: 'g', baseQty: 60, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-02-07').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === COCKTAILS (1L chacun) ===
    {
      id: 'rec_punch',
      name: 'Punch Ananas-Orange-Citron-Banane-Rhum (1L)',
      category: 'Cocktails',
      producedQty: 1,
      producedUnit: 'L',
      sellingPrice: 8.50,
      preparationTime: 25,
      instructions: `1. Éplucher et mixer 1 ananas
2. Presser le jus de 3 oranges
3. Presser le jus de 2 citrons
4. Mixer 2 bananes
5. Mélanger tous les fruits mixés
6. Ajouter 200ml de rhum ambré
7. Ajouter 100g de sucre
8. Compléter avec de l'eau de source jusqu'à 1L
9. Bien mélanger et réfrigérer
10. Servir avec des glaçons et une tranche d'orange`,
      ingredients: [
        { ingredientId: 'ing_ananas', ingredientName: 'Ananas', quantity: 1, unit: 'piece', baseQty: 1, baseUnit: 'piece' },
        { ingredientId: 'ing_oranges', ingredientName: 'Oranges', quantity: 3, unit: 'piece', baseQty: 3, baseUnit: 'piece' },
        { ingredientId: 'ing_citrons', ingredientName: 'Citrons', quantity: 2, unit: 'piece', baseQty: 2, baseUnit: 'piece' },
        { ingredientId: 'ing_bananes', ingredientName: 'Bananes', quantity: 2, unit: 'piece', baseQty: 2, baseUnit: 'piece' },
        { ingredientId: 'ing_rhum_ambre', ingredientName: 'Rhum ambré', quantity: 200, unit: 'ml', baseQty: 200, baseUnit: 'ml' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre', quantity: 100, unit: 'g', baseQty: 100, baseUnit: 'g' },
        { ingredientId: 'ing_eau_source', ingredientName: 'Eau de source', quantity: 300, unit: 'ml', baseQty: 300, baseUnit: 'ml' }
      ],
      createdAt: new Date('2026-02-07').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'rec_planteur',
      name: 'Planteur Ananas-Gingembre-Miel (1L)',
      category: 'Cocktails',
      producedQty: 1,
      producedUnit: 'L',
      sellingPrice: 9.00,
      preparationTime: 25,
      instructions: `1. Éplucher et mixer 2 ananas
2. Peler et râper 40g de gingembre
3. Presser le jus et filtrer
4. Ajouter 150g de miel liquide
5. Ajouter 250ml de rhum ambré
6. Compléter avec eau de source jusqu'à 1L
7. Mélanger énergiquement
8. Laisser infuser 1h au frais
9. Filtrer finement
10. Servir frais avec glaçons et une tranche d'ananas`,
      ingredients: [
        { ingredientId: 'ing_ananas', ingredientName: 'Ananas', quantity: 2, unit: 'piece', baseQty: 2, baseUnit: 'piece' },
        { ingredientId: 'ing_gingembre', ingredientName: 'Gingembre', quantity: 40, unit: 'g', baseQty: 40, baseUnit: 'g' },
        { ingredientId: 'ing_miel', ingredientName: 'Miel', quantity: 150, unit: 'g', baseQty: 150, baseUnit: 'g' },
        { ingredientId: 'ing_rhum_ambre', ingredientName: 'Rhum ambré', quantity: 250, unit: 'ml', baseQty: 250, baseUnit: 'ml' },
        { ingredientId: 'ing_eau_source', ingredientName: 'Eau de source', quantity: 300, unit: 'ml', baseQty: 300, baseUnit: 'ml' }
      ],
      createdAt: new Date('2026-02-07').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    }
  ],

  productions: [
    // Production de Gaufres au Chocolat
    {
      id: 'prod_001',
      recipeId: 'rec_gaufre_chocolat',
      recipeName: 'Gaufres au Chocolat (1kg farine)',
      producedQty: 50,
      producedUnit: 'piece',
      remainingQty: 15, // Il en reste 15 (35 vendues)
      costPerUnit: 0.58, // Coût calculé
      productionDate: new Date('2026-02-09').toISOString(),
      operatorName: 'Sophie Durand',
      notes: 'Production du matin',
      lotReferences: ['lot_farine_001', 'lot_cacao_001']
    },
    // Production de Gaufres au Citron
    {
      id: 'prod_002',
      recipeId: 'rec_gaufre_citron',
      recipeName: 'Gaufres au Citron (1kg farine)',
      producedQty: 50,
      producedUnit: 'piece',
      remainingQty: 28, // Il en reste 28 (22 vendues)
      costPerUnit: 0.52,
      productionDate: new Date('2026-02-09').toISOString(),
      operatorName: 'Sophie Durand',
      notes: 'Production après-midi',
      lotReferences: ['lot_farine_001', 'lot_citrons_001']
    },
    // Production de Smoothie Framboise
    {
      id: 'prod_003',
      recipeId: 'rec_smoothie_framboise',
      recipeName: 'Smoothie Framboise Banane (10 portions)',
      producedQty: 10,
      producedUnit: 'portion',
      remainingQty: 2, // Il en reste 2 (8 vendues)
      costPerUnit: 1.85,
      productionDate: new Date('2026-02-10').toISOString(),
      operatorName: 'Marc Petit',
      notes: 'Préparation fraîche du jour',
      lotReferences: ['lot_framboises_001', 'lot_bananes_001']
    }
  ],
  
  sales: [
    // Vente 1 : 10 Gaufres Chocolat
    {
      id: 'sale_001',
      saleDate: new Date('2026-02-09T10:30:00').toISOString(),
      items: [
        {
          productionId: 'prod_001',
          itemName: 'Gaufres au Chocolat',
          quantity: 10,
          unit: 'piece',
          unitPrice: 2.50,
          costPerUnit: 0.58
        }
      ],
      revenue: 25.00, // 10 × 2.50
      cogs: 5.80, // 10 × 0.58
      margin: 19.20,
      marginPercent: 76.8,
      vendorId: 'vendor_sophie',
      vendorName: 'Sophie Durand',
      commission: 1.25, // 5% de 25€
      notes: 'Vente matinée - Client régulier'
    },
    // Vente 2 : 5 Gaufres Citron
    {
      id: 'sale_002',
      saleDate: new Date('2026-02-09T14:15:00').toISOString(),
      items: [
        {
          productionId: 'prod_002',
          itemName: 'Gaufres au Citron',
          quantity: 5,
          unit: 'piece',
          unitPrice: 2.30,
          costPerUnit: 0.52
        }
      ],
      revenue: 11.50,
      cogs: 2.60,
      margin: 8.90,
      marginPercent: 77.4,
      vendorId: 'vendor_marc',
      vendorName: 'Marc Petit',
      commission: 0.92, // 8% de 11.50
      notes: 'Vente après-midi'
    },
    // Vente 3 : Mix Gaufres + Smoothies
    {
      id: 'sale_003',
      saleDate: new Date('2026-02-10T11:00:00').toISOString(),
      items: [
        {
          productionId: 'prod_001',
          itemName: 'Gaufres au Chocolat',
          quantity: 15,
          unit: 'piece',
          unitPrice: 2.50,
          costPerUnit: 0.58
        },
        {
          productionId: 'prod_003',
          itemName: 'Smoothie Framboise Banane',
          quantity: 5,
          unit: 'portion',
          unitPrice: 4.50,
          costPerUnit: 1.85
        }
      ],
      revenue: 60.00, // (15×2.50) + (5×4.50)
      cogs: 17.95, // (15×0.58) + (5×1.85)
      margin: 42.05,
      marginPercent: 70.1,
      vendorId: 'vendor_sophie',
      vendorName: 'Sophie Durand',
      commission: 3.00, // 5% de 60€
      notes: 'Commande groupe - Événement'
    },
    // Vente 4 : Gaufres Citron
    {
      id: 'sale_004',
      saleDate: new Date('2026-02-10T15:30:00').toISOString(),
      items: [
        {
          productionId: 'prod_002',
          itemName: 'Gaufres au Citron',
          quantity: 12,
          unit: 'piece',
          unitPrice: 2.30,
          costPerUnit: 0.52
        }
      ],
      revenue: 27.60,
      cogs: 6.24,
      margin: 21.36,
      marginPercent: 77.4,
      vendorId: 'vendor_marc',
      vendorName: 'Marc Petit',
      commission: 2.21, // 8% de 27.60
      notes: 'Vente classique'
    },
    // Vente 5 : Smoothies
    {
      id: 'sale_005',
      saleDate: new Date('2026-02-10T16:45:00').toISOString(),
      items: [
        {
          productionId: 'prod_003',
          itemName: 'Smoothie Framboise Banane',
          quantity: 3,
          unit: 'portion',
          unitPrice: 4.50,
          costPerUnit: 1.85
        }
      ],
      revenue: 13.50,
      cogs: 5.55,
      margin: 7.95,
      marginPercent: 58.9,
      vendorId: 'vendor_sophie',
      vendorName: 'Sophie Durand',
      commission: 0.68, // 5% de 13.50
      notes: 'Fin de journée'
    },
    // Vente 6 : Gaufres Chocolat (dernière vente)
    {
      id: 'sale_006',
      saleDate: new Date('2026-02-10T17:20:00').toISOString(),
      items: [
        {
          productionId: 'prod_001',
          itemName: 'Gaufres au Chocolat',
          quantity: 10,
          unit: 'piece',
          unitPrice: 2.50,
          costPerUnit: 0.58
        },
        {
          productionId: 'prod_002',
          itemName: 'Gaufres au Citron',
          quantity: 5,
          unit: 'piece',
          unitPrice: 2.30,
          costPerUnit: 0.52
        }
      ],
      revenue: 36.50, // (10×2.50) + (5×2.30)
      cogs: 8.40, // (10×0.58) + (5×0.52)
      margin: 28.10,
      marginPercent: 77.0,
      vendorId: 'vendor_marc',
      vendorName: 'Marc Petit',
      commission: 2.92, // 8% de 36.50
      notes: 'Dernière vente de la journée'
    }
  ],
  expenses: [],
  categories: ['Farines', 'Sucres', 'Matières grasses', 'Produits laitiers', 'Chocolats', 'Fruits', 'Épices', 'Arômes', 'Alcools', 'Boissons'],
  
  // VENDEURS - Exemples avec commissions
  vendors: [
    {
      id: 'vendor_001',
      name: 'Sophie Martin',
      commissionRate: 5,
      active: true,
      createdAt: new Date('2026-01-15').toISOString()
    },
    {
      id: 'vendor_002',
      name: 'Lucas Dubois',
      commissionRate: 7,
      active: true,
      createdAt: new Date('2026-01-15').toISOString()
    },
    {
      id: 'vendor_003',
      name: 'Emma Bernard',
      commissionRate: 6,
      active: true,
      createdAt: new Date('2026-01-20').toISOString()
    }
  ],
  
  // ÉQUIPE - Exemples de personnel
  staff: [
    {
      id: 'staff_001',
      name: 'Marie Lefevre',
      role: 'Chef Pâtissier',
      active: true,
      createdAt: new Date('2026-01-10').toISOString()
    },
    {
      id: 'staff_002',
      name: 'Thomas Petit',
      role: 'Commis',
      active: true,
      createdAt: new Date('2026-01-10').toISOString()
    },
    {
      id: 'staff_003',
      name: 'Julie Moreau',
      role: 'Responsable Réception',
      active: true,
      createdAt: new Date('2026-01-15').toISOString()
    },
    {
      id: 'staff_004',
      name: 'Alexandre Roux',
      role: 'Vendeur',
      active: true,
      createdAt: new Date('2026-01-20').toISOString()
    }
  ]
};
