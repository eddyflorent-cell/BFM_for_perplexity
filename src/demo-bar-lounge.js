/**
 * DÉMO - LE VELVET BAR LOUNGE
 * Bar lounge mixte : cocktails, vins, softs
 * Prix réels grossiste France 2025 (EUR)
 * Stock total calculé : 399.36 €
 */

export const demoBarLounge = {
  settings: {
    businessName: "Le Velvet Bar Lounge",
    businessType: "Bar Lounge — Cocktails · Vins · Softs",
    address: "Paris, France",
    currency: "EUR",
    overheadCoefficient: 1.40,
    showDirectCost: true
  },

  categories: [
    'Spiritueux', 'Vins & Champagne', 'Sirops', 'Fruits frais',
    'Softs & Eaux', 'Garnitures'
  ],

  // ============================================================
  // INGRÉDIENTS — 29 références, prix réels grossiste 2025
  // ============================================================
  ingredients: [

    // ── SPIRITUEUX ──────────────────────────────────────────────
    {
      id: 'bl_vodka',
      name: 'Vodka premium 40°',
      category: 'Spiritueux',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 1000, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_vodka_001',
        quantiteInitiale: 6000, quantite: 4200,
        prixTotal: 72.00, fraisApproche: 0,
        dlc: new Date('2030-12-31').toISOString(),
        dateReception: new Date('2026-01-20').toISOString(),
        fournisseur: 'Metro Cash & Carry', numeroLot: 'VOD-2026-001',
        receivedBy: 'Karim Benali', epuise: false
      }],
      createdAt: new Date('2026-01-20').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_gin',
      name: 'Gin London Dry 40°',
      category: 'Spiritueux',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 500, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_gin_001',
        quantiteInitiale: 3000, quantite: 2100,
        prixTotal: 45.00, fraisApproche: 0,
        dlc: new Date('2030-12-31').toISOString(),
        dateReception: new Date('2026-01-20').toISOString(),
        fournisseur: 'Metro Cash & Carry', numeroLot: 'GIN-2026-001',
        receivedBy: 'Karim Benali', epuise: false
      }],
      createdAt: new Date('2026-01-20').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_rhum',
      name: 'Rhum blanc agricole 50°',
      category: 'Spiritueux',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 500, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_rhum_001',
        quantiteInitiale: 3000, quantite: 1800,
        prixTotal: 42.00, fraisApproche: 0,
        dlc: new Date('2030-12-31').toISOString(),
        dateReception: new Date('2026-01-20').toISOString(),
        fournisseur: 'Metro Cash & Carry', numeroLot: 'RHU-2026-001',
        receivedBy: 'Karim Benali', epuise: false
      }],
      createdAt: new Date('2026-01-20').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_whisky',
      name: 'Whisky Scotch blend 40°',
      category: 'Spiritueux',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 500, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_whisky_001',
        quantiteInitiale: 3000, quantite: 2400,
        prixTotal: 60.00, fraisApproche: 0,
        dlc: new Date('2030-12-31').toISOString(),
        dateReception: new Date('2026-01-22').toISOString(),
        fournisseur: 'Nicolas Drinks Pro', numeroLot: 'WHI-2026-001',
        receivedBy: 'Karim Benali', epuise: false
      }],
      createdAt: new Date('2026-01-22').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_tequila',
      name: 'Tequila silver 38°',
      category: 'Spiritueux',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 300, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_tequila_001',
        quantiteInitiale: 2000, quantite: 1200,
        prixTotal: 34.00, fraisApproche: 0,
        dlc: new Date('2030-12-31').toISOString(),
        dateReception: new Date('2026-01-22').toISOString(),
        fournisseur: 'Nicolas Drinks Pro', numeroLot: 'TEQ-2026-001',
        receivedBy: 'Karim Benali', epuise: false
      }],
      createdAt: new Date('2026-01-22').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_amaretto',
      name: 'Amaretto 28°',
      category: 'Spiritueux',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 300, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_amaretto_001',
        quantiteInitiale: 1500, quantite: 1000,
        prixTotal: 18.00, fraisApproche: 0,
        dlc: new Date('2030-12-31').toISOString(),
        dateReception: new Date('2026-01-22').toISOString(),
        fournisseur: 'Nicolas Drinks Pro', numeroLot: 'AMA-2026-001',
        receivedBy: 'Léa Fontaine', epuise: false
      }],
      createdAt: new Date('2026-01-22').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_triplesec',
      name: 'Triple sec 40°',
      category: 'Spiritueux',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 200, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_triplesec_001',
        quantiteInitiale: 1500, quantite: 900,
        prixTotal: 15.00, fraisApproche: 0,
        dlc: new Date('2030-12-31').toISOString(),
        dateReception: new Date('2026-01-22').toISOString(),
        fournisseur: 'Nicolas Drinks Pro', numeroLot: 'TRI-2026-001',
        receivedBy: 'Léa Fontaine', epuise: false
      }],
      createdAt: new Date('2026-01-22').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_bitters',
      name: 'Angostura bitters',
      category: 'Spiritueux',
      baseUnit: 'ml', displayUnit: 'ml',
      alertBaseQty: 50, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_bitters_001',
        quantiteInitiale: 200, quantite: 150,
        prixTotal: 12.00, fraisApproche: 0,
        dlc: new Date('2030-12-31').toISOString(),
        dateReception: new Date('2026-01-25').toISOString(),
        fournisseur: 'Metro Cash & Carry', numeroLot: 'BIT-2026-001',
        receivedBy: 'Léa Fontaine', epuise: false
      }],
      createdAt: new Date('2026-01-25').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    // ── VINS & CHAMPAGNE ─────────────────────────────────────────
    {
      id: 'bl_champagne',
      name: 'Champagne brut',
      category: 'Vins & Champagne',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 750, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_champagne_001',
        quantiteInitiale: 3000, quantite: 2250,
        prixTotal: 45.00, fraisApproche: 0,
        dlc: new Date('2028-12-31').toISOString(),
        dateReception: new Date('2026-01-25').toISOString(),
        fournisseur: 'Nicolas Drinks Pro', numeroLot: 'CHA-2026-001',
        receivedBy: 'Léa Fontaine', epuise: false
      }],
      createdAt: new Date('2026-01-25').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_vin_rouge',
      name: 'Vin rouge AOP',
      category: 'Vins & Champagne',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 750, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_vinrouge_001',
        quantiteInitiale: 6000, quantite: 4500,
        prixTotal: 36.00, fraisApproche: 0,
        dlc: new Date('2028-12-31').toISOString(),
        dateReception: new Date('2026-01-25').toISOString(),
        fournisseur: 'Nicolas Drinks Pro', numeroLot: 'VRG-2026-001',
        receivedBy: 'Léa Fontaine', epuise: false
      }],
      createdAt: new Date('2026-01-25').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_vin_blanc',
      name: 'Vin blanc sec AOP',
      category: 'Vins & Champagne',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 750, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_vinblanc_001',
        quantiteInitiale: 4500, quantite: 3000,
        prixTotal: 27.00, fraisApproche: 0,
        dlc: new Date('2028-12-31').toISOString(),
        dateReception: new Date('2026-01-25').toISOString(),
        fournisseur: 'Nicolas Drinks Pro', numeroLot: 'VBL-2026-001',
        receivedBy: 'Léa Fontaine', epuise: false
      }],
      createdAt: new Date('2026-01-25').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    // ── SIROPS ───────────────────────────────────────────────────
    {
      id: 'bl_sirop_sucre',
      name: 'Sirop de sucre de canne',
      category: 'Sirops',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 500, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_sirsucre_001',
        quantiteInitiale: 3000, quantite: 2200,
        prixTotal: 12.00, fraisApproche: 0,
        dlc: new Date('2028-12-31').toISOString(),
        dateReception: new Date('2026-01-28').toISOString(),
        fournisseur: 'Metro Cash & Carry', numeroLot: 'SSC-2026-001',
        receivedBy: 'Karim Benali', epuise: false
      }],
      createdAt: new Date('2026-01-28').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_sirop_grenadine',
      name: 'Sirop de grenadine',
      category: 'Sirops',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 300, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_grenadine_001',
        quantiteInitiale: 2000, quantite: 1400,
        prixTotal: 10.00, fraisApproche: 0,
        dlc: new Date('2028-12-31').toISOString(),
        dateReception: new Date('2026-01-28').toISOString(),
        fournisseur: 'Metro Cash & Carry', numeroLot: 'GRN-2026-001',
        receivedBy: 'Karim Benali', epuise: false
      }],
      createdAt: new Date('2026-01-28').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_sirop_citron',
      name: 'Sirop de citron',
      category: 'Sirops',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 200, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_sircitron_001',
        quantiteInitiale: 1500, quantite: 1000,
        prixTotal: 7.50, fraisApproche: 0,
        dlc: new Date('2028-12-31').toISOString(),
        dateReception: new Date('2026-01-28').toISOString(),
        fournisseur: 'Metro Cash & Carry', numeroLot: 'SCT-2026-001',
        receivedBy: 'Karim Benali', epuise: false
      }],
      createdAt: new Date('2026-01-28').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_sirop_menthe',
      name: 'Sirop de menthe verte',
      category: 'Sirops',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 200, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_sirmenthe_001',
        quantiteInitiale: 1000, quantite: 700,
        prixTotal: 5.00, fraisApproche: 0,
        dlc: new Date('2028-12-31').toISOString(),
        dateReception: new Date('2026-01-28').toISOString(),
        fournisseur: 'Metro Cash & Carry', numeroLot: 'SMT-2026-001',
        receivedBy: 'Karim Benali', epuise: false
      }],
      createdAt: new Date('2026-01-28').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    // ── FRUITS FRAIS ──────────────────────────────────────────────
    {
      id: 'bl_citrons',
      name: 'Citrons jaunes',
      category: 'Fruits frais',
      baseUnit: 'piece', displayUnit: 'piece',
      alertBaseQty: 10, yieldPercent: 85, wasteType: 'Zestes/pépins (15%)',
      lots: [{
        id: 'lot_citrons_001',
        quantiteInitiale: 60, quantite: 42,
        prixTotal: 9.00, fraisApproche: 0,
        dlc: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        dateReception: new Date('2026-02-07').toISOString(),
        fournisseur: 'Rungis Express', numeroLot: 'CIT-2026-001',
        receivedBy: 'Léa Fontaine', epuise: false
      }],
      createdAt: new Date('2026-02-07').toISOString(),
      updatedAt: new Date('2026-02-10').toISOString()
    },

    {
      id: 'bl_limes',
      name: 'Limes (citrons verts)',
      category: 'Fruits frais',
      baseUnit: 'piece', displayUnit: 'piece',
      alertBaseQty: 10, yieldPercent: 85, wasteType: 'Zestes/pépins (15%)',
      lots: [{
        id: 'lot_limes_001',
        quantiteInitiale: 60, quantite: 35,
        prixTotal: 9.00, fraisApproche: 0,
        dlc: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
        dateReception: new Date('2026-02-07').toISOString(),
        fournisseur: 'Rungis Express', numeroLot: 'LIM-2026-001',
        receivedBy: 'Léa Fontaine', epuise: false
      }],
      createdAt: new Date('2026-02-07').toISOString(),
      updatedAt: new Date('2026-02-10').toISOString()
    },

    {
      id: 'bl_oranges',
      name: 'Oranges à jus',
      category: 'Fruits frais',
      baseUnit: 'piece', displayUnit: 'piece',
      alertBaseQty: 8, yieldPercent: 90, wasteType: 'Écorce (10%)',
      lots: [{
        id: 'lot_oranges_001',
        quantiteInitiale: 40, quantite: 28,
        prixTotal: 8.00, fraisApproche: 0,
        dlc: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        dateReception: new Date('2026-02-07').toISOString(),
        fournisseur: 'Rungis Express', numeroLot: 'ORA-2026-001',
        receivedBy: 'Léa Fontaine', epuise: false
      }],
      createdAt: new Date('2026-02-07').toISOString(),
      updatedAt: new Date('2026-02-10').toISOString()
    },

    {
      id: 'bl_fraises',
      name: 'Fraises fraîches',
      category: 'Fruits frais',
      baseUnit: 'g', displayUnit: 'kg',
      alertBaseQty: 500, yieldPercent: 95, wasteType: 'Queues (5%)',
      lots: [{
        id: 'lot_fraises_001',
        quantiteInitiale: 3000, quantite: 1800,
        prixTotal: 18.00, fraisApproche: 0,
        dlc: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        dateReception: new Date('2026-02-09').toISOString(),
        fournisseur: 'Rungis Express', numeroLot: 'FRS-2026-001',
        receivedBy: 'Léa Fontaine', epuise: false
      }],
      createdAt: new Date('2026-02-09').toISOString(),
      updatedAt: new Date('2026-02-10').toISOString()
    },

    {
      id: 'bl_mangue',
      name: 'Mangue fraîche',
      category: 'Fruits frais',
      baseUnit: 'g', displayUnit: 'kg',
      alertBaseQty: 500, yieldPercent: 80, wasteType: 'Noyau + peau (20%)',
      lots: [{
        id: 'lot_mangue_001',
        quantiteInitiale: 5000, quantite: 3000,
        prixTotal: 15.00, fraisApproche: 0,
        dlc: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        dateReception: new Date('2026-02-08').toISOString(),
        fournisseur: 'Rungis Express', numeroLot: 'MNG-2026-001',
        receivedBy: 'Léa Fontaine', epuise: false
      }],
      createdAt: new Date('2026-02-08').toISOString(),
      updatedAt: new Date('2026-02-10').toISOString()
    },

    {
      id: 'bl_menthe',
      name: 'Menthe fraîche',
      category: 'Fruits frais',
      baseUnit: 'g', displayUnit: 'g',
      alertBaseQty: 100, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_menthe_001',
        quantiteInitiale: 1000, quantite: 700,
        prixTotal: 8.00, fraisApproche: 0,
        dlc: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        dateReception: new Date('2026-02-09').toISOString(),
        fournisseur: 'Rungis Express', numeroLot: 'MNT-2026-001',
        receivedBy: 'Léa Fontaine', epuise: false
      }],
      createdAt: new Date('2026-02-09').toISOString(),
      updatedAt: new Date('2026-02-10').toISOString()
    },

    // ── SOFTS & EAUX ──────────────────────────────────────────────
    {
      id: 'bl_tonic',
      name: 'Eau tonique premium',
      category: 'Softs & Eaux',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 2000, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_tonic_001',
        quantiteInitiale: 12000, quantite: 9000,
        prixTotal: 12.00, fraisApproche: 0,
        dlc: new Date('2027-06-30').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry', numeroLot: 'TON-2026-001',
        receivedBy: 'Karim Benali', epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_eau_source',
      name: 'Eau de source 50cl',
      category: 'Softs & Eaux',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 5000, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_eau_001',
        quantiteInitiale: 24000, quantite: 18000,
        prixTotal: 9.60, fraisApproche: 0,
        dlc: new Date('2028-12-31').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry', numeroLot: 'EAU-2026-001',
        receivedBy: 'Karim Benali', epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_jus_orange',
      name: "Jus d'orange 100% pur jus",
      category: 'Softs & Eaux',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 1000, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_jusorange_001',
        quantiteInitiale: 6000, quantite: 4500,
        prixTotal: 9.00, fraisApproche: 0,
        dlc: new Date('2026-04-30').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry', numeroLot: 'JOR-2026-001',
        receivedBy: 'Karim Benali', epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_cola',
      name: 'Cola premium',
      category: 'Softs & Eaux',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 2000, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_cola_001',
        quantiteInitiale: 12000, quantite: 8000,
        prixTotal: 12.00, fraisApproche: 0,
        dlc: new Date('2027-12-31').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry', numeroLot: 'COL-2026-001',
        receivedBy: 'Karim Benali', epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_limonade',
      name: 'Limonade artisanale',
      category: 'Softs & Eaux',
      baseUnit: 'ml', displayUnit: 'L',
      alertBaseQty: 1000, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_limonade_001',
        quantiteInitiale: 6000, quantite: 4000,
        prixTotal: 9.00, fraisApproche: 0,
        dlc: new Date('2027-06-30').toISOString(),
        dateReception: new Date('2026-02-01').toISOString(),
        fournisseur: 'Metro Cash & Carry', numeroLot: 'LIM-2026-001',
        receivedBy: 'Karim Benali', epuise: false
      }],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    // ── GARNITURES ────────────────────────────────────────────────
    {
      id: 'bl_sucre',
      name: 'Sucre en poudre',
      category: 'Garnitures',
      baseUnit: 'g', displayUnit: 'kg',
      alertBaseQty: 500, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_sucre_001',
        quantiteInitiale: 5000, quantite: 4000,
        prixTotal: 3.75, fraisApproche: 0,
        dlc: new Date('2028-12-31').toISOString(),
        dateReception: new Date('2026-01-28').toISOString(),
        fournisseur: 'Metro Cash & Carry', numeroLot: 'SUC-2026-001',
        receivedBy: 'Karim Benali', epuise: false
      }],
      createdAt: new Date('2026-01-28').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_sel',
      name: 'Sel fin',
      category: 'Garnitures',
      baseUnit: 'g', displayUnit: 'g',
      alertBaseQty: 100, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_sel_001',
        quantiteInitiale: 1000, quantite: 900,
        prixTotal: 0.90, fraisApproche: 0,
        dlc: new Date('2030-12-31').toISOString(),
        dateReception: new Date('2026-01-28').toISOString(),
        fournisseur: 'Metro Cash & Carry', numeroLot: 'SEL-2026-001',
        receivedBy: 'Karim Benali', epuise: false
      }],
      createdAt: new Date('2026-01-28').toISOString(),
      updatedAt: new Date('2026-02-05').toISOString()
    },

    {
      id: 'bl_glace',
      name: 'Glaçons (kg)',
      category: 'Garnitures',
      baseUnit: 'g', displayUnit: 'kg',
      alertBaseQty: 2000, yieldPercent: 100, wasteType: '',
      lots: [{
        id: 'lot_glace_001',
        quantiteInitiale: 20000, quantite: 15000,
        prixTotal: 10.00, fraisApproche: 0,
        dlc: new Date('2027-12-31').toISOString(),
        dateReception: new Date('2026-02-05').toISOString(),
        fournisseur: 'IcePro France', numeroLot: 'GLA-2026-001',
        receivedBy: 'Léa Fontaine', epuise: false
      }],
      createdAt: new Date('2026-02-05').toISOString(),
      updatedAt: new Date('2026-02-10').toISOString()
    }
  ],

  // ============================================================
  // RECETTES — 6 cocktails + 2 softs signatures
  // ============================================================
  recipes: [
    // ── COCKTAILS CLASSIQUES ──────────────────────────────────────
    {
      id: 'rec_mojito',
      name: 'Mojito (verre 30cl)',
      category: 'Cocktails',
      producedQty: 1, producedUnit: 'verre',
      sellingPrice: 10.00, preparationTime: 5,
      instructions: `1. Couper 1 lime en quartiers et les placer dans le verre
2. Ajouter 2 feuilles de menthe fraîche
3. Verser 20ml de sirop de sucre de canne
4. Écraser délicatement (muddler)
5. Ajouter 50ml de rhum blanc
6. Remplir de glaçons
7. Compléter avec 100ml d'eau de source gazeuse
8. Remuer doucement, garnir d'une branche de menthe`,
      ingredients: [
        { ingredientId: 'bl_rhum',         ingredientName: 'Rhum blanc agricole', quantity: 50,  unit: 'ml',    baseQty: 50,  baseUnit: 'ml' },
        { ingredientId: 'bl_sirop_sucre',  ingredientName: 'Sirop sucre de canne', quantity: 20, unit: 'ml',    baseQty: 20,  baseUnit: 'ml' },
        { ingredientId: 'bl_limes',        ingredientName: 'Lime',                 quantity: 1,  unit: 'piece', baseQty: 1,   baseUnit: 'piece' },
        { ingredientId: 'bl_menthe',       ingredientName: 'Menthe fraîche',       quantity: 5,  unit: 'g',     baseQty: 5,   baseUnit: 'g' },
        { ingredientId: 'bl_glace',        ingredientName: 'Glaçons',              quantity: 100, unit: 'g',    baseQty: 100, baseUnit: 'g' },
        { ingredientId: 'bl_eau_source',   ingredientName: 'Eau de source',        quantity: 100, unit: 'ml',   baseQty: 100, baseUnit: 'ml' }
      ],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-01').toISOString()
    },

    {
      id: 'rec_cosmopolitan',
      name: 'Cosmopolitan (verre 20cl)',
      category: 'Cocktails',
      producedQty: 1, producedUnit: 'verre',
      sellingPrice: 12.00, preparationTime: 4,
      instructions: `1. Remplir le shaker de glaçons
2. Verser 40ml de vodka premium
3. Ajouter 20ml de triple sec
4. Ajouter 30ml de jus de cranberry (sirop grenadine + eau)
5. Presser le jus d'1/2 citron vert (lime)
6. Shaker énergiquement 15 secondes
7. Filtrer dans un verre à martini givré
8. Garnir d'un zeste de citron vert`,
      ingredients: [
        { ingredientId: 'bl_vodka',            ingredientName: 'Vodka premium',      quantity: 40, unit: 'ml',    baseQty: 40, baseUnit: 'ml' },
        { ingredientId: 'bl_triplesec',        ingredientName: 'Triple sec',          quantity: 20, unit: 'ml',    baseQty: 20, baseUnit: 'ml' },
        { ingredientId: 'bl_sirop_grenadine',  ingredientName: 'Sirop de grenadine', quantity: 20, unit: 'ml',    baseQty: 20, baseUnit: 'ml' },
        { ingredientId: 'bl_limes',            ingredientName: 'Lime',                quantity: 1,  unit: 'piece', baseQty: 1,  baseUnit: 'piece' },
        { ingredientId: 'bl_glace',            ingredientName: 'Glaçons',             quantity: 150, unit: 'g',   baseQty: 150, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-01').toISOString()
    },

    {
      id: 'rec_gin_tonic',
      name: 'Gin Tonic Premium (verre 35cl)',
      category: 'Cocktails',
      producedQty: 1, producedUnit: 'verre',
      sellingPrice: 11.00, preparationTime: 3,
      instructions: `1. Remplir un grand verre à vin de glaçons
2. Verser 50ml de gin London Dry
3. Compléter avec 150ml d'eau tonique bien froide
4. Remuer très doucement (2 tours de cuillère max)
5. Garnir d'une rondelle de citron et d'un quartier de lime
6. Servir immédiatement sans attendre`,
      ingredients: [
        { ingredientId: 'bl_gin',     ingredientName: 'Gin London Dry',     quantity: 50,  unit: 'ml', baseQty: 50,  baseUnit: 'ml' },
        { ingredientId: 'bl_tonic',   ingredientName: 'Eau tonique',         quantity: 150, unit: 'ml', baseQty: 150, baseUnit: 'ml' },
        { ingredientId: 'bl_citrons', ingredientName: 'Citron jaune',        quantity: 1,   unit: 'piece', baseQty: 1, baseUnit: 'piece' },
        { ingredientId: 'bl_glace',   ingredientName: 'Glaçons',             quantity: 120, unit: 'g',  baseQty: 120, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-01').toISOString()
    },

    {
      id: 'rec_old_fashioned',
      name: 'Old Fashioned (verre 15cl)',
      category: 'Cocktails',
      producedQty: 1, producedUnit: 'verre',
      sellingPrice: 13.00, preparationTime: 5,
      instructions: `1. Placer 1 carré de sucre dans un verre old fashioned
2. Ajouter 2-3 traits d'Angostura bitters
3. Écraser le sucre avec un muddler
4. Ajouter 60ml de whisky Scotch
5. Ajouter un grand glaçon
6. Remuer 30 secondes dans le verre
7. Zester une orange sur le verre et garnir du zeste
8. Servir tel quel`,
      ingredients: [
        { ingredientId: 'bl_whisky',  ingredientName: 'Whisky Scotch',       quantity: 60, unit: 'ml', baseQty: 60, baseUnit: 'ml' },
        { ingredientId: 'bl_bitters', ingredientName: 'Angostura bitters',   quantity: 5,  unit: 'ml', baseQty: 5,  baseUnit: 'ml' },
        { ingredientId: 'bl_sucre',   ingredientName: 'Sucre en poudre',     quantity: 5,  unit: 'g',  baseQty: 5,  baseUnit: 'g' },
        { ingredientId: 'bl_oranges', ingredientName: 'Orange (zeste)',       quantity: 1,  unit: 'piece', baseQty: 1, baseUnit: 'piece' },
        { ingredientId: 'bl_glace',   ingredientName: 'Glaçons',             quantity: 80, unit: 'g',  baseQty: 80, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-01').toISOString()
    },

    {
      id: 'rec_tequila_sunrise',
      name: 'Tequila Sunrise (verre 25cl)',
      category: 'Cocktails',
      producedQty: 1, producedUnit: 'verre',
      sellingPrice: 10.50, preparationTime: 4,
      instructions: `1. Remplir un verre hurricane de glaçons
2. Verser 50ml de tequila silver
3. Ajouter 100ml de jus d'orange
4. Verser doucement 15ml de sirop de grenadine sur le bord
5. Ne pas remuer — laisser la grenadine descendre
6. Garnir d'une rondelle d'orange et d'une cerise
7. Servir avec une paille`,
      ingredients: [
        { ingredientId: 'bl_tequila',         ingredientName: 'Tequila silver',     quantity: 50,  unit: 'ml', baseQty: 50,  baseUnit: 'ml' },
        { ingredientId: 'bl_jus_orange',      ingredientName: "Jus d'orange",       quantity: 100, unit: 'ml', baseQty: 100, baseUnit: 'ml' },
        { ingredientId: 'bl_sirop_grenadine', ingredientName: 'Sirop de grenadine', quantity: 15,  unit: 'ml', baseQty: 15,  baseUnit: 'ml' },
        { ingredientId: 'bl_glace',           ingredientName: 'Glaçons',            quantity: 100, unit: 'g',  baseQty: 100, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-01').toISOString()
    },

    {
      id: 'rec_kir_royal',
      name: 'Kir Royal (flûte 15cl)',
      category: 'Vins & Champagne',
      producedQty: 1, producedUnit: 'flûte',
      sellingPrice: 9.00, preparationTime: 2,
      instructions: `1. Verser 15ml de sirop de grenadine dans une flûte à champagne bien froide
2. Incliner légèrement la flûte
3. Verser délicatement 120ml de champagne brut très froid
4. Laisser les bulles faire le mélange naturellement
5. Ne pas remuer
6. Garnir optionnellement d'une fraise fraîche sur le bord`,
      ingredients: [
        { ingredientId: 'bl_champagne',       ingredientName: 'Champagne brut',      quantity: 120, unit: 'ml', baseQty: 120, baseUnit: 'ml' },
        { ingredientId: 'bl_sirop_grenadine', ingredientName: 'Sirop de grenadine',  quantity: 15,  unit: 'ml', baseQty: 15,  baseUnit: 'ml' },
        { ingredientId: 'bl_fraises',         ingredientName: 'Fraise fraîche',      quantity: 10,  unit: 'g',  baseQty: 10,  baseUnit: 'g' }
      ],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-01').toISOString()
    },

    // ── SOFTS SIGNATURES ─────────────────────────────────────────
    {
      id: 'rec_virgin_mojito',
      name: 'Virgin Mojito (verre 30cl)',
      category: 'Softs',
      producedQty: 1, producedUnit: 'verre',
      sellingPrice: 7.00, preparationTime: 4,
      instructions: `1. Couper 1 lime en quartiers dans le verre
2. Ajouter 6-8 feuilles de menthe fraîche
3. Verser 20ml de sirop de sucre de canne
4. Écraser délicatement avec un muddler
5. Remplir de glaçons pilés
6. Compléter avec 150ml de limonade artisanale
7. Remuer doucement
8. Garnir d'une branche de menthe et d'une rondelle de lime`,
      ingredients: [
        { ingredientId: 'bl_sirop_sucre', ingredientName: 'Sirop sucre de canne', quantity: 20,  unit: 'ml',    baseQty: 20,  baseUnit: 'ml' },
        { ingredientId: 'bl_limes',       ingredientName: 'Lime',                  quantity: 1,   unit: 'piece', baseQty: 1,   baseUnit: 'piece' },
        { ingredientId: 'bl_menthe',      ingredientName: 'Menthe fraîche',        quantity: 8,   unit: 'g',     baseQty: 8,   baseUnit: 'g' },
        { ingredientId: 'bl_limonade',    ingredientName: 'Limonade artisanale',   quantity: 150, unit: 'ml',    baseQty: 150, baseUnit: 'ml' },
        { ingredientId: 'bl_glace',       ingredientName: 'Glaçons',              quantity: 100, unit: 'g',     baseQty: 100, baseUnit: 'g' }
      ],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-01').toISOString()
    },

    {
      id: 'rec_smoothie_mango',
      name: 'Smoothie Mangue-Fraise (verre 25cl)',
      category: 'Softs',
      producedQty: 1, producedUnit: 'verre',
      sellingPrice: 8.00, preparationTime: 5,
      instructions: `1. Éplucher et couper 100g de mangue fraîche en morceaux
2. Ajouter 80g de fraises fraîches équeutées
3. Presser le jus d'1/2 citron jaune
4. Verser 10ml de sirop de sucre de canne
5. Ajouter 50ml de jus d'orange
6. Mixer jusqu'à consistance lisse et crémeuse
7. Goûter et ajuster le sucre
8. Verser sur glaçons, garnir d'une fraise`,
      ingredients: [
        { ingredientId: 'bl_mangue',      ingredientName: 'Mangue fraîche',      quantity: 100, unit: 'g',     baseQty: 100, baseUnit: 'g' },
        { ingredientId: 'bl_fraises',     ingredientName: 'Fraises fraîches',    quantity: 80,  unit: 'g',     baseQty: 80,  baseUnit: 'g' },
        { ingredientId: 'bl_jus_orange',  ingredientName: "Jus d'orange",        quantity: 50,  unit: 'ml',    baseQty: 50,  baseUnit: 'ml' },
        { ingredientId: 'bl_sirop_sucre', ingredientName: 'Sirop sucre de canne', quantity: 10, unit: 'ml',    baseQty: 10,  baseUnit: 'ml' },
        { ingredientId: 'bl_citrons',     ingredientName: 'Citron jaune',         quantity: 1,  unit: 'piece', baseQty: 1,   baseUnit: 'piece' },
        { ingredientId: 'bl_glace',       ingredientName: 'Glaçons',             quantity: 80,  unit: 'g',     baseQty: 80,  baseUnit: 'g' }
      ],
      createdAt: new Date('2026-02-01').toISOString(),
      updatedAt: new Date('2026-02-01').toISOString()
    }
  ],

  // ============================================================
  // PRODUCTIONS — vendredi soir & samedi
  // ============================================================
  productions: [
    {
      id: 'prod_bl_001',
      recipeId: 'rec_mojito',
      recipeName: 'Mojito (verre 30cl)',
      producedQty: 25, producedUnit: 'verre',
      remainingQty: 8,
      costPerUnit: 1.28,
      productionDate: new Date('2026-02-07T20:00:00').toISOString(),
      operatorName: 'Karim Benali',
      notes: 'Service vendredi soir',
      lotReferences: ['lot_rhum_001', 'lot_limes_001', 'lot_menthe_001']
    },
    {
      id: 'prod_bl_002',
      recipeId: 'rec_cosmopolitan',
      recipeName: 'Cosmopolitan (verre 20cl)',
      producedQty: 18, producedUnit: 'verre',
      remainingQty: 4,
      costPerUnit: 1.52,
      productionDate: new Date('2026-02-07T20:00:00').toISOString(),
      operatorName: 'Léa Fontaine',
      notes: 'Service vendredi soir',
      lotReferences: ['lot_vodka_001', 'lot_triplesec_001']
    },
    {
      id: 'prod_bl_003',
      recipeId: 'rec_gin_tonic',
      recipeName: 'Gin Tonic Premium (verre 35cl)',
      producedQty: 30, producedUnit: 'verre',
      remainingQty: 10,
      costPerUnit: 1.11,
      productionDate: new Date('2026-02-08T19:00:00').toISOString(),
      operatorName: 'Karim Benali',
      notes: 'Service samedi soir',
      lotReferences: ['lot_gin_001', 'lot_tonic_001']
    },
    {
      id: 'prod_bl_004',
      recipeId: 'rec_kir_royal',
      recipeName: 'Kir Royal (flûte 15cl)',
      producedQty: 20, producedUnit: 'flûte',
      remainingQty: 5,
      costPerUnit: 0.78,
      productionDate: new Date('2026-02-08T19:00:00').toISOString(),
      operatorName: 'Léa Fontaine',
      notes: 'Service samedi soir — événement anniversaire',
      lotReferences: ['lot_champagne_001', 'lot_grenadine_001']
    },
    {
      id: 'prod_bl_005',
      recipeId: 'rec_virgin_mojito',
      recipeName: 'Virgin Mojito (verre 30cl)',
      producedQty: 15, producedUnit: 'verre',
      remainingQty: 6,
      costPerUnit: 0.62,
      productionDate: new Date('2026-02-08T19:00:00').toISOString(),
      operatorName: 'Léa Fontaine',
      notes: 'Service samedi — demande non-alcool forte',
      lotReferences: ['lot_limes_001', 'lot_limonade_001']
    },
    {
      id: 'prod_bl_006',
      recipeId: 'rec_smoothie_mango',
      recipeName: 'Smoothie Mangue-Fraise (verre 25cl)',
      producedQty: 12, producedUnit: 'verre',
      remainingQty: 3,
      costPerUnit: 0.94,
      productionDate: new Date('2026-02-09T15:00:00').toISOString(),
      operatorName: 'Léa Fontaine',
      notes: 'Service dimanche après-midi',
      lotReferences: ['lot_mangue_001', 'lot_fraises_001']
    }
  ],

  // ============================================================
  // VENTES — vendredi, samedi, dimanche
  // ============================================================
  sales: [
    // Vendredi soir
    {
      id: 'sale_bl_001',
      saleDate: new Date('2026-02-07T21:30:00').toISOString(),
      items: [
        { productionId: 'prod_bl_001', itemName: 'Mojito', quantity: 10, unit: 'verre', unitPrice: 10.00, costPerUnit: 1.28 },
        { productionId: 'prod_bl_002', itemName: 'Cosmopolitan', quantity: 7, unit: 'verre', unitPrice: 12.00, costPerUnit: 1.52 }
      ],
      revenue: 184.00,   // (10×10) + (7×12)
      cogs: 23.44,       // (10×1.28) + (7×1.52)
      margin: 160.56,
      marginPercent: 87.3,
      vendorId: 'vendor_karim', vendorName: 'Karim Benali',
      commission: 9.20,  // 5% de 184€
      notes: 'Vendredi soir — Happy Hour'
    },
    {
      id: 'sale_bl_002',
      saleDate: new Date('2026-02-07T23:00:00').toISOString(),
      items: [
        { productionId: 'prod_bl_001', itemName: 'Mojito', quantity: 7, unit: 'verre', unitPrice: 10.00, costPerUnit: 1.28 },
        { productionId: 'prod_bl_002', itemName: 'Cosmopolitan', quantity: 7, unit: 'verre', unitPrice: 12.00, costPerUnit: 1.52 }
      ],
      revenue: 154.00,   // (7×10) + (7×12)
      cogs: 19.60,       // (7×1.28) + (7×1.52)
      margin: 134.40,
      marginPercent: 87.3,
      vendorId: 'vendor_lea', vendorName: 'Léa Fontaine',
      commission: 7.70,
      notes: 'Vendredi soir — fin de service'
    },
    // Samedi soir
    {
      id: 'sale_bl_003',
      saleDate: new Date('2026-02-08T20:30:00').toISOString(),
      items: [
        { productionId: 'prod_bl_003', itemName: 'Gin Tonic Premium', quantity: 12, unit: 'verre', unitPrice: 11.00, costPerUnit: 1.11 },
        { productionId: 'prod_bl_004', itemName: 'Kir Royal', quantity: 8, unit: 'flûte', unitPrice: 9.00, costPerUnit: 0.78 },
        { productionId: 'prod_bl_005', itemName: 'Virgin Mojito', quantity: 5, unit: 'verre', unitPrice: 7.00, costPerUnit: 0.62 }
      ],
      revenue: 239.00,   // (12×11) + (8×9) + (5×7)
      cogs: 19.54,
      margin: 219.46,
      marginPercent: 91.8,
      vendorId: 'vendor_karim', vendorName: 'Karim Benali',
      commission: 11.95,  // 5%
      notes: 'Samedi soir — groupe anniversaire 15 personnes'
    },
    {
      id: 'sale_bl_004',
      saleDate: new Date('2026-02-08T22:45:00').toISOString(),
      items: [
        { productionId: 'prod_bl_003', itemName: 'Gin Tonic Premium', quantity: 8, unit: 'verre', unitPrice: 11.00, costPerUnit: 1.11 },
        { productionId: 'prod_bl_004', itemName: 'Kir Royal', quantity: 7, unit: 'flûte', unitPrice: 9.00, costPerUnit: 0.78 },
        { productionId: 'prod_bl_005', itemName: 'Virgin Mojito', quantity: 4, unit: 'verre', unitPrice: 7.00, costPerUnit: 0.62 }
      ],
      revenue: 179.00,   // (8×11) + (7×9) + (4×7)
      cogs: 17.84,
      margin: 161.16,
      marginPercent: 90.0,
      vendorId: 'vendor_lea', vendorName: 'Léa Fontaine',
      commission: 8.95,
      notes: 'Samedi soir — fin de service'
    },
    // Dimanche après-midi
    {
      id: 'sale_bl_005',
      saleDate: new Date('2026-02-09T16:00:00').toISOString(),
      items: [
        { productionId: 'prod_bl_006', itemName: 'Smoothie Mangue-Fraise', quantity: 9, unit: 'verre', unitPrice: 8.00, costPerUnit: 0.94 }
      ],
      revenue: 72.00,
      cogs: 8.46,
      margin: 63.54,
      marginPercent: 88.3,
      vendorId: 'vendor_lea', vendorName: 'Léa Fontaine',
      commission: 3.60,
      notes: 'Dimanche après-midi — clientèle brunch'
    }
  ],

  // ============================================================
  // DÉPENSES
  // ============================================================
  expenses: [
    {
      id: 'exp_bl_001', label: 'Loyer bar lounge', category: 'Loyer',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      amount: 2200, currency: 'EUR',
      notes: 'Loyer mensuel — local 80m² Paris centre',
      createdAt: new Date().toISOString()
    },
    {
      id: 'exp_bl_002', label: 'Électricité + climatisation', category: 'Énergie',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 5).toISOString().split('T')[0],
      amount: 380, currency: 'EUR',
      notes: 'Facture énergie mensuelle',
      createdAt: new Date().toISOString()
    },
    {
      id: 'exp_bl_003', label: 'Licence IV', category: 'Administratif',
      date: new Date(new Date().getFullYear(), 0, 15).toISOString().split('T')[0],
      amount: 450, currency: 'EUR',
      notes: 'Renouvellement annuel licence débit de boissons',
      createdAt: new Date().toISOString()
    }
  ],

  // ============================================================
  // FOURNISSEURS
  // ============================================================
  suppliers: [
    {
      id: 'sup_bl_001', name: 'Metro Cash & Carry', category: 'Grossiste',
      contact: 'Service Pro Boissons', phone: '+33 1 47 42 00 00',
      email: 'pro@metro.fr', address: '2 rue du Pont de Lutèce, 75004 Paris',
      notes: 'Softs, sirops, garnitures, spiritueux entrée de gamme. Livraison J+1.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'sup_bl_002', name: 'Nicolas Drinks Pro', category: 'Caviste pro',
      contact: 'Attaché commercial', phone: '+33 1 53 20 00 00',
      email: 'pro@nicolas.fr', address: '23 avenue de Wagram, 75008 Paris',
      notes: 'Spiritueux premium, vins AOP, champagnes. Commande min. 200€.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'sup_bl_003', name: 'Rungis Express', category: 'Primeur',
      contact: 'Service frais', phone: '+33 1 41 73 00 00',
      email: 'commandes@rungis-express.fr', address: 'MIN Rungis, Hall fruits, 94550 Chevilly-Larue',
      notes: 'Fruits frais, menthe, agrumes. Livraison quotidienne 5h-7h.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'sup_bl_004', name: 'IcePro France', category: 'Spécialisé',
      contact: 'Livraison', phone: '+33 1 44 00 11 22',
      email: 'contact@icepro.fr', address: '15 rue Madeleine Vionnet, 93300 Aubervilliers',
      notes: 'Glaçons professionnels, glace pilée. Livraison 3×/semaine.',
      createdAt: new Date().toISOString()
    }
  ],

  // ============================================================
  // CLIENTS
  // ============================================================
  clients: [
    {
      id: 'cli_bl_001', name: 'Agence Events & Co', phone: '+33 1 55 00 11 22',
      email: 'events@eventsandco.fr', tags: ['VIP', 'Événementiel'],
      notes: 'Organisation de soirées privées. 2-3 événements/mois. Facturation fin de mois.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'cli_bl_002', name: 'Hôtel Le Marais Palace', phone: '+33 1 42 00 33 44',
      email: 'f&b@maraspalace.fr', tags: ['Professionnel', 'Récurrent'],
      notes: 'Bar de l\'hôtel sous-traité. Commande hebdomadaire spiritueux et softs.',
      createdAt: new Date().toISOString()
    }
  ],

  // ============================================================
  // PERTES
  // ============================================================
  lossHistory: [
    {
      id: 'loss_bl_001',
      timestamp: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1).toISOString(),
      ingredientId: 'bl_fraises', ingredientName: 'Fraises fraîches',
      quantity: 200, unit: 'g', reason: 'dlc_depassee',
      notes: 'Barquette ouverte depuis 3 jours — texture dégradée',
      value: 1.20  // 200g × 6.00€/kg
    },
    {
      id: 'loss_bl_002',
      timestamp: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1).toISOString(),
      ingredientId: 'bl_champagne', ingredientName: 'Champagne brut',
      quantity: 375, unit: 'ml', reason: 'casse',
      notes: 'Bouteille renversée en service — samedi soir',
      value: 5.63  // 375ml × 15.00€/L
    }
  ],

  // ============================================================
  // VENDEURS
  // ============================================================
  vendors: [
    { id: 'vendor_karim', name: 'Karim Benali', commissionRate: 5, active: true, createdAt: new Date('2026-01-10').toISOString() },
    { id: 'vendor_lea',   name: 'Léa Fontaine', commissionRate: 5, active: true, createdAt: new Date('2026-01-10').toISOString() },
    { id: 'vendor_003',   name: 'Hugo Marchand', commissionRate: 6, active: true, createdAt: new Date('2026-01-20').toISOString() }
  ],

  // ============================================================
  // ÉQUIPE
  // ============================================================
  staff: [
    { id: 'staff_bl_001', name: 'Karim Benali',  role: 'Head Bartender',      active: true, createdAt: new Date('2026-01-05').toISOString() },
    { id: 'staff_bl_002', name: 'Léa Fontaine',  role: 'Barman',              active: true, createdAt: new Date('2026-01-05').toISOString() },
    { id: 'staff_bl_003', name: 'Hugo Marchand', role: 'Serveur',             active: true, createdAt: new Date('2026-01-20').toISOString() },
    { id: 'staff_bl_004', name: 'Noémie Vidal',  role: 'Responsable caisse',  active: true, createdAt: new Date('2026-01-20').toISOString() }
  ],

  movements: [],
  packs: [
    // ── PACK 1 : APÉRO COCKTAILS CLASSIQUES ───────────────────────
    {
      id: 'pack_apero_classic',
      name: 'Apéro Cocktails Classiques (4 pers.)',
      description: 'Sélection de 4 cocktails incontournables pour vos soirées entre amis',
      price: 40.00,
      active: true,
      items: [
        { productType: 'recipe', productId: 'rec_mojito', productName: 'Mojito (verre 30cl)', quantity: 1 },
        { productType: 'recipe', productId: 'rec_cosmopolitan', productName: 'Cosmopolitan (verre 20cl)', quantity: 1 },
        { productType: 'recipe', productId: 'rec_gin_tonic', productName: 'Gin Tonic Premium (verre 35cl)', quantity: 1 },
        { productType: 'recipe', productId: 'rec_old_fashioned', productName: 'Old Fashioned (verre 20cl)', quantity: 1 }
      ],
      createdAt: new Date('2026-02-10').toISOString(),
      updatedAt: new Date('2026-02-10').toISOString()
    },

    // ── PACK 2 : SOIRÉE MOJITOS (Groupe) ──────────────────────────
    {
      id: 'pack_mojito_party',
      name: 'Pack Mojito Party (6 mojitos)',
      description: 'Pour les fans du cocktail cubain — économisez 10% sur la commande groupée',
      price: 54.00,
      active: true,
      items: [
        { productType: 'recipe', productId: 'rec_mojito', productName: 'Mojito (verre 30cl)', quantity: 6 }
      ],
      createdAt: new Date('2026-02-10').toISOString(),
      updatedAt: new Date('2026-02-10').toISOString()
    },

    // ── PACK 3 : DUO ROMANCE ──────────────────────────────────────
    {
      id: 'pack_duo_romance',
      name: 'Duo Romance (2 cocktails + 1 Kir Royal)',
      description: 'Formule spéciale couples : 2 cocktails signature + 1 Kir Royal offert',
      price: 28.00,
      active: true,
      items: [
        { productType: 'recipe', productId: 'rec_cosmopolitan', productName: 'Cosmopolitan (verre 20cl)', quantity: 1 },
        { productType: 'recipe', productId: 'rec_tequila_sunrise', productName: 'Tequila Sunrise (verre 30cl)', quantity: 1 },
        { productType: 'recipe', productId: 'rec_kir_royal', productName: 'Kir Royal (coupe 15cl)', quantity: 1 }
      ],
      createdAt: new Date('2026-02-10').toISOString(),
      updatedAt: new Date('2026-02-10').toISOString()
    },

    // ── PACK 4 : SOFT DETOX (Sans alcool) ─────────────────────────
    {
      id: 'pack_soft_detox',
      name: 'Pack Soft Detox (2 virg. mojito + 1 smoothie)',
      description: 'Formule bien-être sans alcool — Virgin Mojitos + Smoothie mangue',
      price: 18.00,
      active: true,
      items: [
        { productType: 'recipe', productId: 'rec_virgin_mojito', productName: 'Virgin Mojito (verre 30cl)', quantity: 2 },
        { productType: 'recipe', productId: 'rec_smoothie_mango', productName: 'Smoothie Mangue-Ananas (verre 40cl)', quantity: 1 }
      ],
      createdAt: new Date('2026-02-10').toISOString(),
      updatedAt: new Date('2026-02-10').toISOString()
    }
  ]
};
