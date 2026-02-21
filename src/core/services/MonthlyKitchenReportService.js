/**
 * MonthlyKitchenReportService
 * Génère un "Rapport Mensuel de Performance Cuisine" (BFM).
 *
 * Objectif : exploitation back-office (matière -> production -> marge).
 * AUCUNE dépendance au POS.
 */

import { KPIService } from './KPIService.js';

export class MonthlyKitchenReportService {

  /**
   * @param {Object} appState
   * @param {number} month - 1..12
   * @param {number} year
   */
  static generate(appState, month, year) {
    const ingredients = appState?.data?.ingredients || [];
    const recipes = appState?.data?.recipes || [];
    const packs = appState?.data?.packs || [];
    const productions = appState?.data?.productions || [];
    const settings = appState?.data?.settings || {};

    const from = new Date(year, month - 1, 1, 0, 0, 0);
    const to = new Date(year, month, 1, 0, 0, 0);

    const prodMonth = productions.filter(p => {
      const d = new Date(p.productionDate);
      return d >= from && d < to;
    });

    // KPI : Réel vs Théorique
    let realTotal = 0;
    let theoTotal = 0;

    const varianceByRecipe = new Map();

    for (const p of prodMonth) {
      const recipe = recipes.find(r => r.id === p.recipeId);
      if (!recipe) continue;

      const v = KPIService.getTheoreticalVsRealVariance(p, recipe, ingredients, settings, { includeOverhead: false });
      realTotal += v.realTotal;
      theoTotal += v.theoreticalTotal;

      const prev = varianceByRecipe.get(recipe.id) || { name: recipe.name, variance: 0, theo: 0, real: 0, count: 0 };
      prev.variance += v.varianceTotal;
      prev.theo += v.theoreticalTotal;
      prev.real += v.realTotal;
      prev.count += 1;
      varianceByRecipe.set(recipe.id, prev);
    }

    const varianceTotal = realTotal - theoTotal;
    const variancePct = theoTotal > 0 ? (varianceTotal / theoTotal) * 100 : 0;

    const varianceList = [...varianceByRecipe.values()]
      .map(x => ({ ...x, variancePct: x.theo > 0 ? (x.variance / x.theo) * 100 : 0 }))
      .sort((a, b) => Math.abs(b.variance) - Math.abs(a.variance));

    // Alertes fluctuations prix (lots : mois courant vs mois précédent)
    const prevFrom = new Date(year, month - 2, 1, 0, 0, 0);
    const prevTo = from;

    const priceAlerts = [];
    for (const ing of ingredients) {
      const lots = ing.lots || [];
      const curLots = lots.filter(l => {
        const d = new Date(l.dateReception);
        return d >= from && d < to;
      });
      const prevLots = lots.filter(l => {
        const d = new Date(l.dateReception);
        return d >= prevFrom && d < prevTo;
      });

      const avg = (arr) => {
        const vals = arr.map(l => {
          const q = Number(l.quantiteInitiale) || 0;
          const v = (Number(l.prixTotal) || 0) + (Number(l.fraisApproche) || 0);
          return q > 0 ? v / q : 0;
        }).filter(x => x > 0);
        if (!vals.length) return 0;
        return vals.reduce((a, b) => a + b, 0) / vals.length;
      };

      const cur = avg(curLots);
      const prev = avg(prevLots);
      if (cur > 0 && prev > 0) {
        const pct = ((cur - prev) / prev) * 100;
        if (Math.abs(pct) >= 10) {
          priceAlerts.push({
            ingredient: ing.name,
            baseUnit: ing.baseUnit,
            prevUnitCost: prev,
            curUnitCost: cur,
            changePct: pct
          });
        }
      }
    }
    priceAlerts.sort((a, b) => Math.abs(b.changePct) - Math.abs(a.changePct));

    // Top/Flop marges (prix saisis)
    const products = [];
    for (const r of recipes) {
      const price = Number(r.sellingPrice) || 0;
      if (price <= 0) continue;

      // On reste cohérent : si showDirectCost activé, l'app affiche le coût complet
      const includeOverhead = settings?.showDirectCost === true;
      const theo = KPIService.getTheoreticalUnitCost(r, ingredients, settings, { includeOverhead });
      const costUnit = includeOverhead ? theo.unitCostTheoretical : theo.directUnitCostTheoretical;

      const marginPct = price > 0 ? ((price - costUnit) / price) * 100 : 0;
      products.push({ type: 'Recette', name: r.name, price, cost: costUnit, marginPct });
    }

    for (const p of packs) {
      const price = Number(p.price) || 0;
      if (price <= 0) continue;

      const includeOverhead = settings?.showDirectCost === true;
      let cost = 0;
      let valid = true;
      for (const item of (p.items || [])) {
        const r = recipes.find(x => x.id === item.productId);
        if (!r) { valid = false; break; }
        const theo = KPIService.getTheoreticalUnitCost(r, ingredients, settings, { includeOverhead });
        const costUnit = includeOverhead ? theo.unitCostTheoretical : theo.directUnitCostTheoretical;
        cost += costUnit * (Number(item.quantity) || 1);
      }
      if (!valid || cost <= 0) continue;
      const marginPct = ((price - cost) / price) * 100;
      products.push({ type: 'Pack', name: p.name, price, cost, marginPct });
    }

    const top = [...products].sort((a, b) => b.marginPct - a.marginPct).slice(0, 5);
    const flop = [...products].sort((a, b) => a.marginPct - b.marginPct).slice(0, 5);

    // Radar "gaspillage" (proxy) : valeur lots expirés / proches
    const now = new Date();
    const wasteAlerts = [];
    for (const ing of ingredients) {
      let expiredValue = 0;
      let urgentValue = 0;
      for (const lot of (ing.lots || [])) {
        if (lot.epuise) continue;
        const dlc = new Date(lot.dlc);
        const days = Math.ceil((dlc - now) / (1000 * 60 * 60 * 24));
        const q = Number(lot.quantite) || 0;
        const unitCost = (Number(lot.quantiteInitiale) || 0) > 0
          ? (((Number(lot.prixTotal) || 0) + (Number(lot.fraisApproche) || 0)) / (Number(lot.quantiteInitiale) || 1))
          : 0;
        const value = q * unitCost;
        if (days < 0) expiredValue += value;
        else if (days <= 3) urgentValue += value;
      }
      if (expiredValue > 0 || urgentValue > 0) {
        wasteAlerts.push({ ingredient: ing.name, expiredValue, urgentValue });
      }
    }
    wasteAlerts.sort((a, b) => (b.expiredValue + b.urgentValue) - (a.expiredValue + a.urgentValue));

    return {
      period: { month, year, from, to },
      totals: {
        productionsCount: prodMonth.length,
        theoreticalCOGS: theoTotal,
        realCOGS: realTotal,
        varianceTotal,
        variancePct
      },
      top,
      flop,
      priceAlerts: priceAlerts.slice(0, 10),
      varianceByRecipe: varianceList.slice(0, 10),
      wasteAlerts: wasteAlerts.slice(0, 10)
    };
  }
}
