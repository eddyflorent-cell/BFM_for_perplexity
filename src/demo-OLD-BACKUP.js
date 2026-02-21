/**
 * NOUVELLE DÉMO - PRIX RÉELS MARCHÉ EUROPÉEN
 * Salon de thé/bar à jus avec prix cohérents en EUR
 */

export const demoRealistic = {
  settings: {
    businessName: "Le Comptoir Gourmand",
    businessType: "Salon de thé & Bar à jus",
    address: "Paris, France",
    phone: "+33 1 XX XX XX XX",
    email: "contact@comptoir-gourmand.fr"
  },

  // INGRÉDIENTS avec VRAIS PRIX EUR
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
        quantiteInitiale: 25000,
        quantite: 25000,
        prixTotal: 37.50,        // 1.50€/kg × 25kg
        fraisApproche: 0,
        dlc: new Date('2026-12-31').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'F-T45-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === SUCRES ===
    {
      id: 'ing_sucre',
      name: 'Sucre cristallisé',
      category: 'Sucres',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 3000,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_sucre_001',
        quantiteInitiale: 10000,
        quantite: 10000,
        prixTotal: 12.00,        // 1.20€/kg × 10kg
        fraisApproche: 0,
        dlc: new Date('2027-12-31').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'S-CRIST-2026-001',
        receivedBy: '',
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
        quantiteInitiale: 5000,
        quantite: 5000,
        prixTotal: 7.50,         // 1.50€/kg × 5kg
        fraisApproche: 0,
        dlc: new Date('2027-12-31').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'S-CASS-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === MATIÈRES GRASSES ===
    {
      id: 'ing_beurre',
      name: 'Beurre doux 82%',
      category: 'Matières grasses',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 2000,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_beurre_001',
        quantiteInitiale: 5000,
        quantite: 5000,
        prixTotal: 40.00,        // 8.00€/kg × 5kg
        fraisApproche: 0,
        dlc: new Date('2026-04-15').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'B-DX82-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === PRODUITS LAITIERS ===
    {
      id: 'ing_lait',
      name: 'Lait entier UHT',
      category: 'Produits laitiers',
      baseUnit: 'ml',
      displayUnit: 'L',
      alertBaseQty: 2000,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_lait_001',
        quantiteInitiale: 12000,
        quantite: 12000,
        prixTotal: 15.60,        // 1.30€/L × 12L
        fraisApproche: 0,
        dlc: new Date('2026-03-15').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'L-UHT-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_oeufs',
      name: 'Œufs frais calibre M',
      category: 'Produits laitiers',
      baseUnit: 'piece',
      displayUnit: 'piece',
      alertBaseQty: 20,
      yieldPercent: 88,
      wasteType: 'Coquille',
      lots: [{
        id: 'lot_oeufs_001',
        quantiteInitiale: 180,
        quantite: 180,
        prixTotal: 54.00,        // 0.30€/œuf × 180
        fraisApproche: 0,
        dlc: new Date('2026-02-21').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'O-CAL-M-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === CHOCOLATS ===
    {
      id: 'ing_chocolat',
      name: 'Chocolat noir 70% pâtisserie',
      category: 'Chocolats',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 500,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_choco_001',
        quantiteInitiale: 3000,
        quantite: 3000,
        prixTotal: 36.00,        // 12.00€/kg × 3kg
        fraisApproche: 0,
        dlc: new Date('2027-02-01').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Valrhona / Metro',
        numeroLot: 'CH-70-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_cacao',
      name: 'Cacao en poudre non sucré',
      category: 'Chocolats',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 300,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_cacao_001',
        quantiteInitiale: 1000,
        quantite: 1000,
        prixTotal: 15.00,        // 15.00€/kg × 1kg
        fraisApproche: 0,
        dlc: new Date('2027-02-01').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Van Houten / Metro',
        numeroLot: 'CAC-POUD-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === ARÔMES ===
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
        quantiteInitiale: 250,
        quantite: 250,
        prixTotal: 45.00,        // 180€/L → 45€ pour 250ml
        fraisApproche: 0,
        dlc: new Date('2027-02-01').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Vahiné / Metro',
        numeroLot: 'VAN-NAT-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === FRUITS ===
    {
      id: 'ing_citrons',
      name: 'Citrons jaunes',
      category: 'Fruits',
      baseUnit: 'piece',
      displayUnit: 'piece',
      alertBaseQty: 10,
      yieldPercent: 65,
      wasteType: 'Peau + pépins',
      lots: [{
        id: 'lot_citrons_001',
        quantiteInitiale: 50,
        quantite: 50,
        prixTotal: 25.00,        // 0.50€/citron × 50
        fraisApproche: 0,
        dlc: new Date('2026-02-14').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Rungis / Metro',
        numeroLot: 'CIT-FR-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_ananas',
      name: 'Ananas frais Victoria',
      category: 'Fruits',
      baseUnit: 'piece',
      displayUnit: 'piece',
      alertBaseQty: 5,
      yieldPercent: 55,
      wasteType: 'Peau + cœur',
      lots: [{
        id: 'lot_ananas_001',
        quantiteInitiale: 24,
        quantite: 24,
        prixTotal: 72.00,        // 3.00€/ananas × 24
        fraisApproche: 0,
        dlc: new Date('2026-02-10').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Rungis / Metro',
        numeroLot: 'AN-VIC-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_pommes',
      name: 'Pommes Golden',
      category: 'Fruits',
      baseUnit: 'piece',
      displayUnit: 'piece',
      alertBaseQty: 10,
      yieldPercent: 85,
      wasteType: 'Trognon + peau',
      lots: [{
        id: 'lot_pommes_001',
        quantiteInitiale: 40,
        quantite: 40,
        prixTotal: 30.00,        // 0.75€/pomme × 40
        fraisApproche: 0,
        dlc: new Date('2026-02-14').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Rungis / Metro',
        numeroLot: 'POM-GOLD-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_oranges',
      name: 'Oranges à jus',
      category: 'Fruits',
      baseUnit: 'piece',
      displayUnit: 'piece',
      alertBaseQty: 10,
      yieldPercent: 50,
      wasteType: 'Peau + pépins',
      lots: [{
        id: 'lot_oranges_001',
        quantiteInitiale: 60,
        quantite: 60,
        prixTotal: 36.00,        // 0.60€/orange × 60
        fraisApproche: 0,
        dlc: new Date('2026-02-14').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Rungis / Metro',
        numeroLot: 'OR-JUS-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_bananes',
      name: 'Bananes Cavendish',
      category: 'Fruits',
      baseUnit: 'piece',
      displayUnit: 'piece',
      alertBaseQty: 10,
      yieldPercent: 65,
      wasteType: 'Peau',
      lots: [{
        id: 'lot_bananes_001',
        quantiteInitiale: 100,
        quantite: 100,
        prixTotal: 40.00,        // 0.40€/banane × 100
        fraisApproche: 0,
        dlc: new Date('2026-02-10').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Rungis / Metro',
        numeroLot: 'BAN-CAV-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === ÉPICES ===
    {
      id: 'ing_gingembre',
      name: 'Gingembre frais',
      category: 'Épices',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 200,
      yieldPercent: 85,
      wasteType: 'Peau',
      lots: [{
        id: 'lot_gingembre_001',
        quantiteInitiale: 2000,
        quantite: 2000,
        prixTotal: 16.00,        // 8.00€/kg × 2kg
        fraisApproche: 0,
        dlc: new Date('2026-03-01').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Rungis / Metro',
        numeroLot: 'GING-FR-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_sel',
      name: 'Sel fin de Guérande',
      category: 'Épices',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 200,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_sel_001',
        quantiteInitiale: 1000,
        quantite: 1000,
        prixTotal: 4.00,         // 4.00€/kg × 1kg
        fraisApproche: 0,
        dlc: new Date('2028-02-01').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'SEL-GUE-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === LEVURES ===
    {
      id: 'ing_levure',
      name: 'Levure chimique poudre',
      category: 'Additifs',
      baseUnit: 'g',
      displayUnit: 'g',
      alertBaseQty: 100,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_levure_001',
        quantiteInitiale: 500,
        quantite: 500,
        prixTotal: 7.50,         // 15€/kg → 7.50€ pour 500g
        fraisApproche: 0,
        dlc: new Date('2027-02-01').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Vahiné / Metro',
        numeroLot: 'LEV-CHIM-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === LIQUIDES ===
    {
      id: 'ing_eau_source',
      name: 'Eau de source en bouteille',
      category: 'Boissons',
      baseUnit: 'ml',
      displayUnit: 'L',
      alertBaseQty: 5000,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_eau_001',
        quantiteInitiale: 24000,
        quantite: 24000,
        prixTotal: 12.00,        // 0.50€/L × 24L
        fraisApproche: 0,
        dlc: new Date('2027-02-01').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry',
        numeroLot: 'EAU-SRC-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'ing_rhum',
      name: 'Rhum ambré (agricole)',
      category: 'Alcools',
      baseUnit: 'ml',
      displayUnit: 'ml',
      alertBaseQty: 500,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_rhum_001',
        quantiteInitiale: 2000,
        quantite: 2000,
        prixTotal: 50.00,        // 25€/L × 2L
        fraisApproche: 0,
        dlc: new Date('2030-02-01').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Caves & Spiritueux',
        numeroLot: 'RH-AMB-2026-001',
        receivedBy: '',
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
        quantiteInitiale: 2000,
        quantite: 2000,
        prixTotal: 30.00,        // 15€/kg × 2kg
        fraisApproche: 0,
        dlc: new Date('2028-02-01').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Apiculteur local',
        numeroLot: 'MIEL-ACA-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === CARAMEL ===
    {
      id: 'ing_caramel',
      name: 'Caramel au beurre salé maison',
      category: 'Sauces',
      baseUnit: 'g',
      displayUnit: 'g',
      alertBaseQty: 200,
      yieldPercent: 100,
      wasteType: '',
      lots: [{
        id: 'lot_caramel_001',
        quantiteInitiale: 1000,
        quantite: 1000,
        prixTotal: 18.00,        // Coût production maison ~18€/kg
        fraisApproche: 0,
        dlc: new Date('2026-03-01').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Production maison',
        numeroLot: 'CAR-BBS-2026-001',
        receivedBy: '',
        epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    }
  ],

  // RECETTES
  recipes: [
    // === GAUFRES (3 recettes pour 1kg de farine) ===
    {
      id: 'rec_gaufre_chocolat_1kg',
      name: 'Gaufres au Chocolat (1kg farine)',
      category: 'Gaufres',
      producedQty: 40,
      producedUnit: 'piece',
      sellingPrice: 2.50,
      preparationTime: 60,
      instructions: `1. Préchauffer le gaufrier
2. Dans un grand bol, mélanger farine (1kg), sucre (200g), cacao (100g), levure (40g) et sel (10g)
3. Dans un autre bol, battre les œufs (8 pièces) avec le lait (1.2L)
4. Incorporer le beurre fondu (200g)
5. Mélanger progressivement le liquide au sec jusqu'à obtenir une pâte lisse
6. Laisser reposer 10 minutes
7. Verser une louche dans le gaufrier préchauffé
8. Cuire 3-4 minutes jusqu'à doré
9. Décorer avec du chocolat fondu
10. Rendement : environ 40 gaufres`,
      ingredients: [
        { ingredientId: 'ing_farine_t45', ingredientName: 'Farine T45', quantity: 1000, unit: 'g', baseQty: 1000, baseUnit: 'g' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre cristallisé', quantity: 200, unit: 'g', baseQty: 200, baseUnit: 'g' },
        { ingredientId: 'ing_cacao', ingredientName: 'Cacao poudre', quantity: 100, unit: 'g', baseQty: 100, baseUnit: 'g' },
        { ingredientId: 'ing_oeufs', ingredientName: 'Œufs', quantity: 8, unit: 'piece', baseQty: 8, baseUnit: 'piece' },
        { ingredientId: 'ing_lait', ingredientName: 'Lait', quantity: 1200, unit: 'ml', baseQty: 1200, baseUnit: 'ml' },
        { ingredientId: 'ing_beurre', ingredientName: 'Beurre fondu', quantity: 200, unit: 'g', baseQty: 200, baseUnit: 'g' },
        { ingredientId: 'ing_levure', ingredientName: 'Levure chimique', quantity: 40, unit: 'g', baseQty: 40, baseUnit: 'g' },
        { ingredientId: 'ing_chocolat', ingredientName: 'Chocolat noir (décor)', quantity: 200, unit: 'g', baseQty: 200, baseUnit: 'g' },
        { ingredientId: 'ing_sel', ingredientName: 'Sel', quantity: 10, unit: 'g', baseQty: 10, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-02-07').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'rec_gaufre_citron_1kg',
      name: 'Gaufres au Citron (1kg farine)',
      category: 'Gaufres',
      producedQty: 40,
      producedUnit: 'piece',
      sellingPrice: 2.30,
      preparationTime: 60,
      instructions: `1. Préchauffer le gaufrier
2. Zester 4 citrons et presser leur jus
3. Dans un bol, mélanger farine (1kg), sucre (220g), levure (40g), sel (10g) et zestes
4. Dans un autre bol, battre œufs (8) avec lait (1L) et jus de citron (200ml)
5. Incorporer le beurre fondu (200g)
6. Mélanger progressivement jusqu'à pâte lisse
7. Laisser reposer 10 minutes
8. Cuire 3-4 minutes par gaufre
9. Servir avec du sucre glace
10. Rendement : environ 40 gaufres`,
      ingredients: [
        { ingredientId: 'ing_farine_t45', ingredientName: 'Farine T45', quantity: 1000, unit: 'g', baseQty: 1000, baseUnit: 'g' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre cristallisé', quantity: 220, unit: 'g', baseQty: 220, baseUnit: 'g' },
        { ingredientId: 'ing_oeufs', ingredientName: 'Œufs', quantity: 8, unit: 'piece', baseQty: 8, baseUnit: 'piece' },
        { ingredientId: 'ing_lait', ingredientName: 'Lait', quantity: 1000, unit: 'ml', baseQty: 1000, baseUnit: 'ml' },
        { ingredientId: 'ing_beurre', ingredientName: 'Beurre fondu', quantity: 200, unit: 'g', baseQty: 200, baseUnit: 'g' },
        { ingredientId: 'ing_citrons', ingredientName: 'Citrons (zeste + jus)', quantity: 4, unit: 'piece', baseQty: 4, baseUnit: 'piece' },
        { ingredientId: 'ing_levure', ingredientName: 'Levure chimique', quantity: 40, unit: 'g', baseQty: 40, baseUnit: 'g' },
        { ingredientId: 'ing_sel', ingredientName: 'Sel', quantity: 10, unit: 'g', baseQty: 10, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-02-07').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'rec_gaufre_caramel_1kg',
      name: 'Gaufres Caramel Beurre Salé (1kg farine)',
      category: 'Gaufres',
      producedQty: 40,
      producedUnit: 'piece',
      sellingPrice: 2.80,
      preparationTime: 60,
      instructions: `1. Préchauffer le gaufrier
2. Dans un bol, mélanger farine (1kg), cassonade (200g), levure (40g) et sel (15g)
3. Battre œufs (8) avec lait (1.2L) et vanille (10ml)
4. Incorporer beurre fondu (250g)
5. Mélanger jusqu'à pâte homogène
6. Laisser reposer 10 minutes
7. Cuire 3-4 minutes par gaufre
8. Napper généreusement de caramel beurre salé chaud
9. Servir immédiatement
10. Rendement : environ 40 gaufres`,
      ingredients: [
        { ingredientId: 'ing_farine_t45', ingredientName: 'Farine T45', quantity: 1000, unit: 'g', baseQty: 1000, baseUnit: 'g' },
        { ingredientId: 'ing_cassonade', ingredientName: 'Cassonade', quantity: 200, unit: 'g', baseQty: 200, baseUnit: 'g' },
        { ingredientId: 'ing_oeufs', ingredientName: 'Œufs', quantity: 8, unit: 'piece', baseQty: 8, baseUnit: 'piece' },
        { ingredientId: 'ing_lait', ingredientName: 'Lait', quantity: 1200, unit: 'ml', baseQty: 1200, baseUnit: 'ml' },
        { ingredientId: 'ing_beurre', ingredientName: 'Beurre fondu', quantity: 250, unit: 'g', baseQty: 250, baseUnit: 'g' },
        { ingredientId: 'ing_vanille', ingredientName: 'Extrait vanille', quantity: 10, unit: 'ml', baseQty: 10, baseUnit: 'ml' },
        { ingredientId: 'ing_levure', ingredientName: 'Levure chimique', quantity: 40, unit: 'g', baseQty: 40, baseUnit: 'g' },
        { ingredientId: 'ing_caramel', ingredientName: 'Caramel beurre salé', quantity: 400, unit: 'g', baseQty: 400, baseUnit: 'g' },
        { ingredientId: 'ing_sel', ingredientName: 'Sel', quantity: 15, unit: 'g', baseQty: 15, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-02-07').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === NECTARS (2 recettes pour 1L) ===
    {
      id: 'rec_nectar_ananas_ging',
      name: 'Nectar Ananas-Gingembre eau de source (1L)',
      category: 'Nectars',
      producedQty: 1,
      producedUnit: 'L',
      sellingPrice: 4.50,
      preparationTime: 20,
      instructions: `1. Éplucher et découper l'ananas en morceaux (rendement 55%)
2. Peler et râper le gingembre frais
3. Mixer l'ananas avec le gingembre
4. Ajouter l'eau de source (500ml) et le sucre (60g)
5. Mixer à nouveau jusqu'à consistance lisse et homogène
6. Filtrer finement pour retirer les fibres
7. Réfrigérer immédiatement
8. Servir bien frais dans des verres avec glace
9. Conservation : 48h au réfrigérateur
10. Rendement : 1 litre de nectar`,
      ingredients: [
        { ingredientId: 'ing_ananas', ingredientName: 'Ananas frais', quantity: 1, unit: 'piece', baseQty: 1, baseUnit: 'piece' },
        { ingredientId: 'ing_gingembre', ingredientName: 'Gingembre frais', quantity: 30, unit: 'g', baseQty: 30, baseUnit: 'g' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre', quantity: 60, unit: 'g', baseQty: 60, baseUnit: 'g' },
        { ingredientId: 'ing_eau_source', ingredientName: 'Eau de source', quantity: 500, unit: 'ml', baseQty: 500, baseUnit: 'ml' }
      ],
      createdAt: new Date('2026-02-07').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    {
      id: 'rec_nectar_ananas_pomme',
      name: 'Nectar Ananas-Pomme eau de source (1L)',
      category: 'Nectars',
      producedQty: 1,
      producedUnit: 'L',
      sellingPrice: 4.20,
      preparationTime: 20,
      instructions: `1. Éplucher l'ananas et découper en morceaux (rendement 55%)
2. Laver et découper les pommes (avec peau, rendement 85%)
3. Mixer ensemble ananas et pommes
4. Ajouter l'eau de source (400ml) et le sucre (50g)
5. Mixer jusqu'à obtenir une texture lisse
6. Filtrer pour retirer les fibres et pépins
7. Réfrigérer
8. Servir frais avec glaçons
9. Conservation : 48h au réfrigérateur
10. Rendement : 1 litre de nectar`,
      ingredients: [
        { ingredientId: 'ing_ananas', ingredientName: 'Ananas frais', quantity: 1, unit: 'piece', baseQty: 1, baseUnit: 'piece' },
        { ingredientId: 'ing_pommes', ingredientName: 'Pommes Golden', quantity: 3, unit: 'piece', baseQty: 3, baseUnit: 'piece' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre', quantity: 50, unit: 'g', baseQty: 50, baseUnit: 'g' },
        { ingredientId: 'ing_eau_source', ingredientName: 'Eau de source', quantity: 400, unit: 'ml', baseQty: 400, baseUnit: 'ml' }
      ],
      createdAt: new Date('2026-02-07').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    },

    // === COCKTAILS (2 recettes pour 1L) ===
    {
      id: 'rec_punch_tropical',
      name: 'Punch Ananas-Orange-Citron-Banane Rhum (1L)',
      category: 'Cocktails',
      producedQty: 1,
      producedUnit: 'L',
      sellingPrice: 8.50,
      preparationTime: 25,
      instructions: `1. Éplucher l'ananas, découper en morceaux
2. Presser les oranges pour obtenir le jus (rendement 50%)
3. Presser le citron (rendement 65%)
4. Éplucher et découper la banane
5. Mixer tous les fruits ensemble
6. Ajouter le sucre (80g) et l'eau de source (200ml)
7. Filtrer finement
8. Ajouter le rhum ambré (150ml) et mélanger
9. Réfrigérer minimum 2h
10. Servir sur glace avec tranche d'orange
Note : Cocktail alcoolisé (15% vol.)`,
      ingredients: [
        { ingredientId: 'ing_ananas', ingredientName: 'Ananas frais', quantity: 1, unit: 'piece', baseQty: 1, baseUnit: 'piece' },
        { ingredientId: 'ing_oranges', ingredientName: 'Oranges à jus', quantity: 4, unit: 'piece', baseQty: 4, baseUnit: 'piece' },
        { ingredientId: 'ing_citrons', ingredientName: 'Citrons', quantity: 2, unit: 'piece', baseQty: 2, baseUnit: 'piece' },
        { ingredientId: 'ing_bananes', ingredientName: 'Bananes', quantity: 2, unit: 'piece', baseQty: 2, baseUnit: 'piece' },
        { ingredientId: 'ing_rhum', ingredientName: 'Rhum ambré', quantity: 150, unit: 'ml', baseQty: 150, baseUnit: 'ml' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre', quantity: 80, unit: 'g', baseQty: 80, baseUnit: 'g' },
        { ingredientId: 'ing_eau_source', ingredientName: 'Eau de source', quantity: 200, unit: 'ml', baseQty: 200, baseUnit: 'ml' }
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
      sellingPrice: 8.00,
      preparationTime: 25,
      instructions: `1. Éplucher et mixer l'ananas
2. Peler et râper le gingembre frais (40g)
3. Faire infuser le gingembre dans l'eau chaude (300ml) pendant 10 min
4. Filtrer l'infusion et laisser tiédir
5. Mixer l'ananas avec le miel (60g)
6. Mélanger le jus d'ananas avec l'infusion de gingembre
7. Ajouter le rhum ambré (200ml)
8. Compléter avec eau de source jusqu'à 1L
9. Réfrigérer minimum 3h
10. Servir sur glace pilée avec rondelle de gingembre
Note : Cocktail alcoolisé (20% vol.)`,
      ingredients: [
        { ingredientId: 'ing_ananas', ingredientName: 'Ananas frais', quantity: 1, unit: 'piece', baseQty: 1, baseUnit: 'piece' },
        { ingredientId: 'ing_gingembre', ingredientName: 'Gingembre frais', quantity: 40, unit: 'g', baseQty: 40, baseUnit: 'g' },
        { ingredientId: 'ing_miel', ingredientName: 'Miel d\'acacia', quantity: 60, unit: 'g', baseQty: 60, baseUnit: 'g' },
        { ingredientId: 'ing_rhum', ingredientName: 'Rhum ambré', quantity: 200, unit: 'ml', baseQty: 200, baseUnit: 'ml' },
        { ingredientId: 'ing_eau_source', ingredientName: 'Eau de source', quantity: 500, unit: 'ml', baseQty: 500, baseUnit: 'ml' }
      ],
      createdAt: new Date('2026-02-07').toISOString(),
      updatedAt: new Date('2026-02-07').toISOString()
    }
  ],

  // PRODUCTIONS (exemples)
  productions: [],

  // CATEGORIES
  categories: [
    'Farines',
    'Sucres',
    'Matières grasses',
    'Produits laitiers',
    'Chocolats',
    'Arômes',
    'Fruits',
    'Épices',
    'Additifs',
    'Boissons',
    'Alcools',
    'Sauces'
  ],

  // VENDORS
  vendors: [
    { id: 'v1', name: 'Metro Cash & Carry', contact: 'Metro Paris', phone: '01 XX XX XX XX' },
    { id: 'v2', name: 'Rungis Marché', contact: 'MIN Rungis', phone: '01 XX XX XX XX' },
    { id: 'v3', name: 'Apiculteur local', contact: 'Jean Dupont', phone: '06 XX XX XX XX' }
  ],

  // STAFF
  staff: [
    { id: 's1', name: 'Marie Martin', role: 'Chef pâtissier', active: true },
    { id: 's2', name: 'Thomas Dubois', role: 'Barman', active: true }
  ],

  // SALES & EXPENSES
  sales: [],
  expenses: []
};
