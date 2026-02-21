/**
 * DONNÉES DÉMO - W.E SALON DE THÉ
 * Salon de thé à Yaoundé spécialisé en gaufres, jus tropicaux et pâtisseries
 */

export const demoWESalon = {
  settings: {
    businessName: "W.E Salon de Thé",
    businessType: "Salon de thé & Pâtisserie",
    address: "Avenue Kennedy, Yaoundé, Cameroun",
    phone: "+237 6 XX XX XX XX",
    email: "contact@we-salon.cm"
  },

  // INGRÉDIENTS
  ingredients: [
    // === FARINES & CÉRÉALES ===
    {
      id: 'ing_farine_t45',
      name: 'Farine de blé T45',
      category: 'Farines',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 5000,
      lots: [{
        id: 'lot_farine_001',
        quantiteInitiale: 50000,
        quantite: 42000,
        prixTotal: 68.6,
        fraisApproche: 3.05,
        dlc: new Date('2026-12-31').toISOString(),
        dateReception: new Date('2026-01-15').toISOString(),
        fournisseur: 'Minoterie du Cameroun',
        numeroLot: 'MC-T45-2026-001',
        epuise: false
      }],
      createdAt: new Date('2026-01-15').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    // === SUCRES ===
    {
      id: 'ing_sucre',
      name: 'Sucre cristallisé',
      category: 'Sucres',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 3000,
      lots: [{
        id: 'lot_sucre_001',
        quantiteInitiale: 25000,
        quantite: 18500,
        prixTotal: 26.68,
        fraisApproche: 1.52,
        dlc: new Date('2027-01-01').toISOString(),
        dateReception: new Date('2026-01-10').toISOString(),
        fournisseur: 'Sucrerie de Mbandjock',
        numeroLot: 'SBK-2026-015',
        epuise: false
      }],
      createdAt: new Date('2026-01-10').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    {
      id: 'ing_cassonade',
      name: 'Cassonade (sucre roux)',
      category: 'Sucres',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 2000,
      lots: [{
        id: 'lot_cassonade_001',
        quantiteInitiale: 10000,
        quantite: 8200,
        prixTotal: 18.29,
        fraisApproche: 1.22,
        dlc: new Date('2027-01-01').toISOString(),
        dateReception: new Date('2026-01-12').toISOString(),
        fournisseur: 'Sucrerie de Mbandjock',
        numeroLot: 'SBK-CASS-2026-003',
        epuise: false
      }],
      createdAt: new Date('2026-01-12').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    // === MATIÈRES GRASSES ===
    {
      id: 'ing_beurre',
      name: 'Beurre doux 82%',
      category: 'Matières grasses',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 2000,
      lots: [{
        id: 'lot_beurre_001',
        quantiteInitiale: 10000,
        quantite: 7500,
        prixTotal: 83.85,
        fraisApproche: 4.57,
        dlc: new Date('2026-03-15').toISOString(),
        dateReception: new Date('2026-01-20').toISOString(),
        fournisseur: 'Ferme Bovicam',
        numeroLot: 'BVC-BEUR-2026-008',
        epuise: false
      }],
      createdAt: new Date('2026-01-20').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    // === PRODUITS LAITIERS ===
    {
      id: 'ing_lait',
      name: 'Lait entier liquide',
      category: 'Produits laitiers',
      baseUnit: 'ml',
      displayUnit: 'L',
      alertBaseQty: 2000,
      lots: [{
        id: 'lot_lait_001',
        quantiteInitiale: 20000,
        quantite: 15800,
        prixTotal: 18.29,
        fraisApproche: 2.29,
        dlc: new Date('2026-02-05').toISOString(),
        dateReception: new Date('2026-01-22').toISOString(),
        fournisseur: 'Ferme Bovicam',
        numeroLot: 'BVC-LAIT-2026-045',
        epuise: false
      }],
      createdAt: new Date('2026-01-22').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    {
      id: 'ing_oeufs',
      name: 'Œufs frais calibre L',
      category: 'Produits laitiers',
      baseUnit: 'piece',
      displayUnit: 'piece',
      alertBaseQty: 20,
      lots: [{
        id: 'lot_oeufs_001',
        quantiteInitiale: 120,
        quantite: 96,
        prixTotal: 27.44,
        fraisApproche: 1.83,
        dlc: new Date('2026-02-10').toISOString(),
        dateReception: new Date('2026-01-23').toISOString(),
        fournisseur: 'Ferme Bovicam',
        numeroLot: 'BVC-OEF-2026-012',
        epuise: false
      }],
      createdAt: new Date('2026-01-23').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    // === CHOCOLAT & CACAO ===
    {
      id: 'ing_chocolat',
      name: 'Chocolat noir 70% (pâtisserie)',
      category: 'Chocolats',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 1000,
      lots: [{
        id: 'lot_choco_001',
        quantiteInitiale: 5000,
        quantite: 3800,
        prixTotal: 57.17,
        fraisApproche: 3.05,
        dlc: new Date('2026-12-31').toISOString(),
        dateReception: new Date('2026-01-18').toISOString(),
        fournisseur: 'Chococam',
        numeroLot: 'CHC-70-2026-024',
        epuise: false
      }],
      createdAt: new Date('2026-01-18').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    {
      id: 'ing_cacao',
      name: 'Cacao en poudre non sucré',
      category: 'Chocolats',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 500,
      lots: [{
        id: 'lot_cacao_001',
        quantiteInitiale: 3000,
        quantite: 2400,
        prixTotal: 36.59,
        fraisApproche: 2.29,
        dlc: new Date('2026-12-31').toISOString(),
        dateReception: new Date('2026-01-18').toISOString(),
        fournisseur: 'Chococam',
        numeroLot: 'CHC-POUDRE-2026-018',
        epuise: false
      }],
      createdAt: new Date('2026-01-18').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    // === ARÔMES ===
    {
      id: 'ing_vanille',
      name: 'Extrait de vanille naturel',
      category: 'Arômes',
      baseUnit: 'ml',
      displayUnit: 'ml',
      alertBaseQty: 50,
      lots: [{
        id: 'lot_vanille_001',
        quantiteInitiale: 500,
        quantite: 380,
        prixTotal: 68.6,
        fraisApproche: 3.81,
        dlc: new Date('2027-01-01').toISOString(),
        dateReception: new Date('2026-01-16').toISOString(),
        fournisseur: 'Marché Central Yaoundé',
        numeroLot: 'VAN-NAT-2026',
        epuise: false
      }],
      createdAt: new Date('2026-01-16').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    // === FRUITS ===
    {
      id: 'ing_ananas',
      name: 'Ananas frais (cayenne)',
      category: 'Fruits',
      baseUnit: 'piece',
      displayUnit: 'piece',
      alertBaseQty: 5,
      lots: [{
        id: 'lot_ananas_001',
        quantiteInitiale: 30,
        quantite: 22,
        prixTotal: 22.87,
        fraisApproche: 3.05,
        dlc: new Date('2026-02-01').toISOString(),
        dateReception: new Date('2026-01-22').toISOString(),
        fournisseur: 'Marché Central Yaoundé',
        numeroLot: 'AN-FRESH-240126',
        epuise: false
      }],
      createdAt: new Date('2026-01-22').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    {
      id: 'ing_citrons',
      name: 'Citrons jaunes',
      category: 'Fruits',
      baseUnit: 'piece',
      displayUnit: 'piece',
      alertBaseQty: 10,
      lots: [{
        id: 'lot_citrons_001',
        quantiteInitiale: 50,
        quantite: 38,
        prixTotal: 11.43,
        fraisApproche: 1.52,
        dlc: new Date('2026-02-05').toISOString(),
        dateReception: new Date('2026-01-21').toISOString(),
        fournisseur: 'Marché Central Yaoundé',
        numeroLot: 'CIT-FRESH-210126',
        epuise: false
      }],
      createdAt: new Date('2026-01-21').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    {
      id: 'ing_pommes',
      name: 'Pommes Golden',
      category: 'Fruits',
      baseUnit: 'piece',
      displayUnit: 'piece',
      alertBaseQty: 10,
      lots: [{
        id: 'lot_pommes_001',
        quantiteInitiale: 40,
        quantite: 32,
        prixTotal: 18.29,
        fraisApproche: 2.29,
        dlc: new Date('2026-02-10').toISOString(),
        dateReception: new Date('2026-01-20').toISOString(),
        fournisseur: 'Marché Central Yaoundé',
        numeroLot: 'POM-GOLD-200126',
        epuise: false
      }],
      createdAt: new Date('2026-01-20').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    {
      id: 'ing_oranges',
      name: 'Oranges douces',
      category: 'Fruits',
      baseUnit: 'piece',
      displayUnit: 'piece',
      alertBaseQty: 10,
      lots: [{
        id: 'lot_oranges_001',
        quantiteInitiale: 60,
        quantite: 48,
        prixTotal: 13.72,
        fraisApproche: 1.83,
        dlc: new Date('2026-02-08').toISOString(),
        dateReception: new Date('2026-01-21').toISOString(),
        fournisseur: 'Marché Central Yaoundé',
        numeroLot: 'ORA-DOUCE-210126',
        epuise: false
      }],
      createdAt: new Date('2026-01-21').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    {
      id: 'ing_gingembre',
      name: 'Gingembre frais',
      category: 'Épices',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 200,
      lots: [{
        id: 'lot_gingembre_001',
        quantiteInitiale: 2000,
        quantite: 1650,
        prixTotal: 12.2,
        fraisApproche: 1.52,
        dlc: new Date('2026-03-01').toISOString(),
        dateReception: new Date('2026-01-19').toISOString(),
        fournisseur: 'Marché Central Yaoundé',
        numeroLot: 'GING-FRESH-190126',
        epuise: false
      }],
      createdAt: new Date('2026-01-19').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    // === LEVURES & ADDITIFS ===
    {
      id: 'ing_levure',
      name: 'Levure chimique (poudre)',
      category: 'Additifs',
      baseUnit: 'g',
      displayUnit: 'g',
      alertBaseQty: 100,
      lots: [{
        id: 'lot_levure_001',
        quantiteInitiale: 1000,
        quantite: 750,
        prixTotal: 7.62,
        fraisApproche: 0.76,
        dlc: new Date('2027-01-01').toISOString(),
        dateReception: new Date('2026-01-14').toISOString(),
        fournisseur: 'Minoterie du Cameroun',
        numeroLot: 'MC-LEV-2026-002',
        epuise: false
      }],
      createdAt: new Date('2026-01-14').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    {
      id: 'ing_sel',
      name: 'Sel fin',
      category: 'Additifs',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 500,
      lots: [{
        id: 'lot_sel_001',
        quantiteInitiale: 5000,
        quantite: 4200,
        prixTotal: 3.81,
        fraisApproche: 0.46,
        dlc: new Date('2028-01-01').toISOString(),
        dateReception: new Date('2026-01-10').toISOString(),
        fournisseur: 'Marché Central Yaoundé',
        numeroLot: 'SEL-FIN-100126',
        epuise: false
      }],
      createdAt: new Date('2026-01-10').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    // === BOISSONS CHAUDES (stock, pas recettes) ===
    {
      id: 'ing_cafe',
      name: 'Café en grains (Arabica)',
      category: 'Boissons',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 1000,
      lots: [{
        id: 'lot_cafe_001',
        quantiteInitiale: 10000,
        quantite: 8500,
        prixTotal: 129.58,
        fraisApproche: 7.62,
        dlc: new Date('2026-12-31').toISOString(),
        dateReception: new Date('2026-01-12').toISOString(),
        fournisseur: 'Cameroon Coffee',
        numeroLot: 'CAM-ARA-2026-018',
        epuise: false
      }],
      createdAt: new Date('2026-01-12').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    {
      id: 'ing_the',
      name: 'Thé noir (vrac)',
      category: 'Boissons',
      baseUnit: 'g',
      displayUnit: 'kg',
      alertBaseQty: 500,
      lots: [{
        id: 'lot_the_001',
        quantiteInitiale: 5000,
        quantite: 4200,
        prixTotal: 60.98,
        fraisApproche: 4.57,
        dlc: new Date('2026-12-31').toISOString(),
        dateReception: new Date('2026-01-13').toISOString(),
        fournisseur: 'Tea Plantation Mount Cameroon',
        numeroLot: 'TPMC-BLACK-2026-005',
        epuise: false
      }],
      createdAt: new Date('2026-01-13').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    }
  ],

  // RECETTES
  recipes: [
    // === GAUFRES (3) ===
    {
      id: 'rec_gaufre_chocolat',
      name: 'Gaufre au Chocolat',
      category: 'Gaufres',
      producedQty: 4,
      producedUnit: 'piece',
      preparationTime: 20,
      instructions: `1. Préchauffer le gaufrier
2. Mélanger farine, sucre, cacao, levure et sel
3. Battre les œufs avec le lait
4. Incorporer le beurre fondu
5. Mélanger le tout jusqu'à obtenir une pâte lisse
6. Verser une louche dans le gaufrier
7. Cuire 3-4 minutes jusqu'à doré
8. Décorer avec du chocolat fondu`,
      ingredients: [
        { ingredientId: 'ing_farine_t45', ingredientName: 'Farine de blé T45', quantity: 250, unit: 'g', baseQty: 250, baseUnit: 'g' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre cristallisé', quantity: 50, unit: 'g', baseQty: 50, baseUnit: 'g' },
        { ingredientId: 'ing_cacao', ingredientName: 'Cacao en poudre', quantity: 30, unit: 'g', baseQty: 30, baseUnit: 'g' },
        { ingredientId: 'ing_oeufs', ingredientName: 'Œufs frais', quantity: 2, unit: 'piece', baseQty: 2, baseUnit: 'piece' },
        { ingredientId: 'ing_lait', ingredientName: 'Lait', quantity: 300, unit: 'ml', baseQty: 300, baseUnit: 'ml' },
        { ingredientId: 'ing_beurre', ingredientName: 'Beurre fondu', quantity: 50, unit: 'g', baseQty: 50, baseUnit: 'g' },
        { ingredientId: 'ing_levure', ingredientName: 'Levure chimique', quantity: 10, unit: 'g', baseQty: 10, baseUnit: 'g' },
        { ingredientId: 'ing_chocolat', ingredientName: 'Chocolat noir (décor)', quantity: 50, unit: 'g', baseQty: 50, baseUnit: 'g' },
        { ingredientId: 'ing_sel', ingredientName: 'Sel', quantity: 2, unit: 'g', baseQty: 2, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-01-20').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    {
      id: 'rec_gaufre_vanille',
      name: 'Gaufre à la Vanille',
      category: 'Gaufres',
      producedQty: 4,
      producedUnit: 'piece',
      preparationTime: 20,
      instructions: `1. Préchauffer le gaufrier
2. Mélanger farine, sucre, levure et sel
3. Battre les œufs avec le lait et l'extrait de vanille
4. Incorporer le beurre fondu
5. Mélanger jusqu'à obtenir une pâte homogène
6. Verser dans le gaufrier
7. Cuire 3-4 minutes
8. Servir tiède avec du sucre glace`,
      ingredients: [
        { ingredientId: 'ing_farine_t45', ingredientName: 'Farine de blé T45', quantity: 250, unit: 'g', baseQty: 250, baseUnit: 'g' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre cristallisé', quantity: 60, unit: 'g', baseQty: 60, baseUnit: 'g' },
        { ingredientId: 'ing_oeufs', ingredientName: 'Œufs frais', quantity: 2, unit: 'piece', baseQty: 2, baseUnit: 'piece' },
        { ingredientId: 'ing_lait', ingredientName: 'Lait', quantity: 350, unit: 'ml', baseQty: 350, baseUnit: 'ml' },
        { ingredientId: 'ing_beurre', ingredientName: 'Beurre fondu', quantity: 50, unit: 'g', baseQty: 50, baseUnit: 'g' },
        { ingredientId: 'ing_vanille', ingredientName: 'Extrait de vanille', quantity: 10, unit: 'ml', baseQty: 10, baseUnit: 'ml' },
        { ingredientId: 'ing_levure', ingredientName: 'Levure chimique', quantity: 10, unit: 'g', baseQty: 10, baseUnit: 'g' },
        { ingredientId: 'ing_sel', ingredientName: 'Sel', quantity: 2, unit: 'g', baseQty: 2, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-01-20').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    {
      id: 'rec_gaufre_citron',
      name: 'Gaufre au Citron',
      category: 'Gaufres',
      producedQty: 4,
      producedUnit: 'piece',
      preparationTime: 25,
      instructions: `1. Préchauffer le gaufrier
2. Zester 1 citron et presser le jus
3. Mélanger farine, sucre, levure, sel et zeste
4. Battre les œufs avec le lait et le jus de citron
5. Incorporer le beurre fondu
6. Mélanger délicatement
7. Cuire dans le gaufrier 3-4 minutes
8. Servir avec du sucre glace`,
      ingredients: [
        { ingredientId: 'ing_farine_t45', ingredientName: 'Farine de blé T45', quantity: 250, unit: 'g', baseQty: 250, baseUnit: 'g' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre cristallisé', quantity: 60, unit: 'g', baseQty: 60, baseUnit: 'g' },
        { ingredientId: 'ing_oeufs', ingredientName: 'Œufs frais', quantity: 2, unit: 'piece', baseQty: 2, baseUnit: 'piece' },
        { ingredientId: 'ing_lait', ingredientName: 'Lait', quantity: 300, unit: 'ml', baseQty: 300, baseUnit: 'ml' },
        { ingredientId: 'ing_beurre', ingredientName: 'Beurre fondu', quantity: 50, unit: 'g', baseQty: 50, baseUnit: 'g' },
        { ingredientId: 'ing_citrons', ingredientName: 'Citrons (zeste + jus)', quantity: 2, unit: 'piece', baseQty: 2, baseUnit: 'piece' },
        { ingredientId: 'ing_levure', ingredientName: 'Levure chimique', quantity: 10, unit: 'g', baseQty: 10, baseUnit: 'g' },
        { ingredientId: 'ing_sel', ingredientName: 'Sel', quantity: 2, unit: 'g', baseQty: 2, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-01-20').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    // === JUS TROPICAUX (3) ===
    {
      id: 'rec_jus_ananas_gingembre',
      name: 'Nectar Ananas-Gingembre',
      category: 'Jus & Nectars',
      producedQty: 1,
      producedUnit: 'L',
      preparationTime: 15,
      instructions: `1. Éplucher et découper l'ananas en morceaux
2. Peler et râper le gingembre frais
3. Mixer l'ananas avec le gingembre
4. Ajouter l'eau et le sucre
5. Mixer à nouveau jusqu'à consistance lisse
6. Filtrer si désiré
7. Réfrigérer
8. Servir frais avec de la glace`,
      ingredients: [
        { ingredientId: 'ing_ananas', ingredientName: 'Ananas frais', quantity: 2, unit: 'piece', baseQty: 2, baseUnit: 'piece' },
        { ingredientId: 'ing_gingembre', ingredientName: 'Gingembre frais', quantity: 30, unit: 'g', baseQty: 30, baseUnit: 'g' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre', quantity: 80, unit: 'g', baseQty: 80, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-01-21').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    {
      id: 'rec_jus_ananas_pomme',
      name: 'Jus Ananas-Pomme',
      category: 'Jus & Nectars',
      producedQty: 1,
      producedUnit: 'L',
      preparationTime: 15,
      instructions: `1. Éplucher et découper l'ananas
2. Laver et découper les pommes (avec peau)
3. Mixer ensemble l'ananas et les pommes
4. Ajouter un peu d'eau si nécessaire
5. Ajouter le sucre selon goût
6. Filtrer pour retirer les fibres
7. Réfrigérer
8. Servir bien frais`,
      ingredients: [
        { ingredientId: 'ing_ananas', ingredientName: 'Ananas frais', quantity: 1, unit: 'piece', baseQty: 1, baseUnit: 'piece' },
        { ingredientId: 'ing_pommes', ingredientName: 'Pommes Golden', quantity: 4, unit: 'piece', baseQty: 4, baseUnit: 'piece' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre', quantity: 60, unit: 'g', baseQty: 60, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-01-21').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    {
      id: 'rec_jus_ananas_orange',
      name: 'Jus Ananas-Orange',
      category: 'Jus & Nectars',
      producedQty: 1,
      producedUnit: 'L',
      preparationTime: 15,
      instructions: `1. Éplucher et découper l'ananas en morceaux
2. Presser les oranges pour en extraire le jus
3. Mixer l'ananas
4. Mélanger avec le jus d'orange frais
5. Ajouter le sucre si désiré
6. Filtrer légèrement
7. Réfrigérer
8. Servir avec des glaçons et une tranche d'orange`,
      ingredients: [
        { ingredientId: 'ing_ananas', ingredientName: 'Ananas frais', quantity: 1, unit: 'piece', baseQty: 1, baseUnit: 'piece' },
        { ingredientId: 'ing_oranges', ingredientName: 'Oranges douces', quantity: 6, unit: 'piece', baseQty: 6, baseUnit: 'piece' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre', quantity: 50, unit: 'g', baseQty: 50, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-01-21').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    // === GÂTEAUX (3) ===
    {
      id: 'rec_quatre_quarts',
      name: 'Quatre-Quarts Classique',
      category: 'Gâteaux',
      producedQty: 1,
      producedUnit: 'piece',
      preparationTime: 60,
      instructions: `1. Préchauffer le four à 180°C
2. Peser les œufs (ex: 200g)
3. Utiliser le même poids pour farine, sucre et beurre
4. Battre le beurre et le sucre jusqu'à blanchir
5. Ajouter les œufs un à un
6. Incorporer la farine, levure et sel
7. Verser dans un moule beurré
8. Cuire 45-50 minutes
9. Vérifier avec un cure-dent
10. Laisser refroidir avant de démouler`,
      ingredients: [
        { ingredientId: 'ing_farine_t45', ingredientName: 'Farine de blé T45', quantity: 200, unit: 'g', baseQty: 200, baseUnit: 'g' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre cristallisé', quantity: 200, unit: 'g', baseQty: 200, baseUnit: 'g' },
        { ingredientId: 'ing_beurre', ingredientName: 'Beurre doux', quantity: 200, unit: 'g', baseQty: 200, baseUnit: 'g' },
        { ingredientId: 'ing_oeufs', ingredientName: 'Œufs frais', quantity: 4, unit: 'piece', baseQty: 4, baseUnit: 'piece' },
        { ingredientId: 'ing_levure', ingredientName: 'Levure chimique', quantity: 8, unit: 'g', baseQty: 8, baseUnit: 'g' },
        { ingredientId: 'ing_sel', ingredientName: 'Sel', quantity: 2, unit: 'g', baseQty: 2, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-01-22').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    {
      id: 'rec_moelleux_chocolat',
      name: 'Moelleux au Chocolat',
      category: 'Gâteaux',
      producedQty: 8,
      producedUnit: 'piece',
      preparationTime: 30,
      instructions: `1. Préchauffer le four à 200°C
2. Faire fondre le chocolat et le beurre au bain-marie
3. Battre les œufs avec le sucre jusqu'à blanchir
4. Incorporer le chocolat fondu
5. Ajouter la farine tamisée
6. Beurrer des moules individuels
7. Répartir la pâte
8. Cuire 10-12 minutes (cœur coulant)
9. Laisser reposer 1 minute
10. Démouler délicatement et servir tiède`,
      ingredients: [
        { ingredientId: 'ing_chocolat', ingredientName: 'Chocolat noir 70%', quantity: 200, unit: 'g', baseQty: 200, baseUnit: 'g' },
        { ingredientId: 'ing_beurre', ingredientName: 'Beurre doux', quantity: 200, unit: 'g', baseQty: 200, baseUnit: 'g' },
        { ingredientId: 'ing_oeufs', ingredientName: 'Œufs frais', quantity: 4, unit: 'piece', baseQty: 4, baseUnit: 'piece' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre cristallisé', quantity: 100, unit: 'g', baseQty: 100, baseUnit: 'g' },
        { ingredientId: 'ing_farine_t45', ingredientName: 'Farine de blé T45', quantity: 50, unit: 'g', baseQty: 50, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-01-22').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    },

    {
      id: 'rec_crumble_ananas',
      name: 'Crumble à l\'Ananas',
      category: 'Gâteaux',
      producedQty: 6,
      producedUnit: 'piece',
      preparationTime: 45,
      instructions: `1. Préchauffer le four à 180°C
2. Éplucher et découper l'ananas en dés
3. Faire revenir l'ananas avec la cassonade 5 minutes
4. Préparer le crumble: mélanger farine, cassonade, beurre froid
5. Sabler du bout des doigts jusqu'à obtenir une texture sableuse
6. Répartir l'ananas dans des ramequins
7. Couvrir généreusement de crumble
8. Cuire 25-30 minutes jusqu'à doré
9. Laisser tiédir
10. Servir avec une boule de glace vanille`,
      ingredients: [
        { ingredientId: 'ing_ananas', ingredientName: 'Ananas frais', quantity: 2, unit: 'piece', baseQty: 2, baseUnit: 'piece' },
        { ingredientId: 'ing_farine_t45', ingredientName: 'Farine de blé T45', quantity: 150, unit: 'g', baseQty: 150, baseUnit: 'g' },
        { ingredientId: 'ing_cassonade', ingredientName: 'Cassonade', quantity: 120, unit: 'g', baseQty: 120, baseUnit: 'g' },
        { ingredientId: 'ing_beurre', ingredientName: 'Beurre doux froid', quantity: 100, unit: 'g', baseQty: 100, baseUnit: 'g' },
        { ingredientId: 'ing_sucre', ingredientName: 'Sucre (pour l\'ananas)', quantity: 30, unit: 'g', baseQty: 30, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-01-22').toISOString(),
      updatedAt: new Date('2026-01-24').toISOString()
    }
  ],

  // PRODUCTIONS
  productions: [
    {
      id: 'prod_001',
      recipeId: 'rec_gaufre_chocolat',
      recipeName: 'Gaufre au Chocolat',
      multiplier: 5,
      producedQty: 20,
      producedUnit: 'piece',
      remainingQty: 12,
      costTotal: 8650,
      costPerUnit: 433,
      lotsUsed: [],
      productionDate: new Date('2026-01-23').toISOString(),
      operator: 'Marie Fotso',
      notes: 'Production matinale pour le service du midi'
    },
    {
      id: 'prod_002',
      recipeId: 'rec_jus_ananas_gingembre',
      recipeName: 'Nectar Ananas-Gingembre',
      multiplier: 3,
      producedQty: 3,
      producedUnit: 'L',
      remainingQty: 1.5,
      costTotal: 4200,
      costPerUnit: 1400,
      lotsUsed: [],
      productionDate: new Date('2026-01-24').toISOString(),
      operator: 'Jean-Marc Ngono',
      notes: 'Nectar préparé frais ce matin'
    }
  ],

  // VENDEURS
  vendors: [
    {
      id: 'vend_001',
      name: 'Paul Kamdem',
      commissionRate: 5,
      phone: '+237 6 XX XX XX 01',
      email: 'paul.kamdem@we-salon.cm',
      active: true
    },
    {
      id: 'vend_002',
      name: 'Sophie Nkotto',
      commissionRate: 5,
      phone: '+237 6 XX XX XX 02',
      email: 'sophie.nkotto@we-salon.cm',
      active: true
    }
  ],

  // VENTES (exemples)
  sales: [],
  
  // DÉPENSES
  expenses: [],
  
  // PERSONNEL
  staff: [
    {
      id: 'staff_001',
      name: 'Jean-Marc Ngono',
      role: 'Chef cuisinier',
      phone: '+237 6 XX XX XX 03',
      active: true
    },
    {
      id: 'staff_002',
      name: 'Marie Fotso',
      role: 'Pâtissière',
      phone: '+237 6 XX XX XX 04',
      active: true
    },
    {
      id: 'staff_003',
      name: 'Paul Kamdem',
      role: 'Vendeur',
      phone: '+237 6 XX XX XX 01',
      active: true
    },
    {
      id: 'staff_004',
      name: 'Sophie Nkotto',
      role: 'Vendeuse',
      phone: '+237 6 XX XX XX 02',
      active: true
    }
  ],

  // CATÉGORIES
  categories: [
    { id: 'cat_farines', name: 'Farines', parent: null },
    { id: 'cat_sucres', name: 'Sucres', parent: null },
    { id: 'cat_matieres', name: 'Matières grasses', parent: null },
    { id: 'cat_lait', name: 'Produits laitiers', parent: null },
    { id: 'cat_choco', name: 'Chocolats', parent: null },
    { id: 'cat_aromes', name: 'Arômes', parent: null },
    { id: 'cat_fruits', name: 'Fruits', parent: null },
    { id: 'cat_epices', name: 'Épices', parent: null },
    { id: 'cat_additifs', name: 'Additifs', parent: null },
    { id: 'cat_boissons', name: 'Boissons', parent: null }
  ]
};
