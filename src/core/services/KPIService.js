/**
 * KPIService - Algorithmes métier (Food Cost / Contrôle de marge)
 *
 * Contrainte BFM : back-office cuisine uniquement (pas de POS / clients / ventes).
 *
 * KPI couverts :
 * - Prix de Revient Réel (PRR) : basé sur les coûts réels des lots consommés en production
 *   + prise en compte optionnelle des % d'assaisonnement (recette)
 * - Écart Théorique vs Réel : comparaison entre coût théorique (fiche) et coût réel (production)
 * - Seuil de rentabilité par fiche de production : break-even (si prix de vente disponible)
 */

export class KPIService {

  /**
   * Prix de revient réel unitaire d'une production.
   * @param {import('../models/Production.js').Production} production
   * @param {import('../models/Recipe.js').Recipe} recipe
   * @param {Object} [opts]
   * @param {boolean} [opts.includeSeasoning=true] - applique seasoningPercent de la recette
   * @returns {{unitCostReal:number,totalCostReal:number,seasoningMultiplier:number}}
   */
  static getRealCostFromProduction(production, recipe, opts = {}) {
    const includeSeasoning = opts.includeSeasoning !== false;
    const seasoningMultiplier = includeSeasoning ? (1 + ((recipe?.seasoningPercent || 0) / 100)) : 1;

    const producedQty = Number(production?.producedQty) || 0;
    const costTotal = Number(production?.costTotal) || 0;

    const totalCostReal = costTotal * seasoningMultiplier;
    const unitCostReal = producedQty > 0 ? (totalCostReal / producedQty) : 0;

    return { unitCostReal, totalCostReal, seasoningMultiplier };
  }

  /**
   * Coût théorique unitaire (fiche) pour une recette.
   * Utilise Recipe.getCostPerUnit.
   * @param {import('../models/Recipe.js').Recipe} recipe
   * @param {import('../models/Ingredient.js').Ingredient[]} ingredients
   * @param {Object} settings - settings BFM (overheadCoefficient, showDirectCost)
   * @param {Object} [opts]
   * @param {boolean} [opts.includeOverhead=false] - true => inclut overheadCoefficient
   * @returns {{unitCostTheoretical:number, directUnitCostTheoretical:number, coefficient:number}}
   */
  static getTheoreticalUnitCost(recipe, ingredients, settings = {}, opts = {}) {
    const includeOverhead = opts.includeOverhead === true;
    const coefficient = includeOverhead ? (Number(settings?.overheadCoefficient) || 1) : 1;

    const res = recipe.getCostPerUnit(ingredients, {
      overheadCoefficient: coefficient,
      showDirectCost: true
    });

    const directUnitCostTheoretical = Number(res?.direct) || 0;
    const unitCostTheoretical = Number(res?.total) || 0;

    return { unitCostTheoretical, directUnitCostTheoretical, coefficient };
  }

  /**
   * Écart théorique vs réel sur une production.
   * @returns {{varianceTotal:number,variancePct:number,theoreticalTotal:number,realTotal:number}}
   */
  static getTheoreticalVsRealVariance(production, recipe, ingredients, settings = {}, opts = {}) {
    const includeOverhead = opts.includeOverhead === true;

    const producedQty = Number(production?.producedQty) || 0;

    const theo = this.getTheoreticalUnitCost(recipe, ingredients, settings, { includeOverhead });
    const real = this.getRealCostFromProduction(production, recipe, { includeSeasoning: true });

    const theoreticalTotal = theo.unitCostTheoretical * producedQty;
    const realTotal = real.totalCostReal;

    const varianceTotal = realTotal - theoreticalTotal;
    const variancePct = theoreticalTotal > 0 ? (varianceTotal / theoreticalTotal) * 100 : 0;

    return { varianceTotal, variancePct, theoreticalTotal, realTotal };
  }

  /**
   * Seuil de rentabilité (break-even) d'une fiche.
   * Nécessite : prix de vente + charges fixes mensuelles.
   */
  static getBreakEvenForRecipe(recipe, ingredients, settings = {}, opts = {}) {
    const includeOverhead = opts.includeOverhead === true;
    const price = Number(recipe?.sellingPrice) || 0;

    const theo = this.getTheoreticalUnitCost(recipe, ingredients, settings, { includeOverhead });
    const variableCostUnit = theo.unitCostTheoretical;

    const fixedCosts = Number(settings?.fixedCostsMonthly) || 0;
    const contribution = price - variableCostUnit;

    if (price <= 0 || contribution <= 0 || fixedCosts <= 0) {
      return {
        breakEvenUnits: 0,
        contributionMarginUnit: contribution,
        variableCostUnit,
        price,
        fixedCosts,
        note: fixedCosts <= 0
          ? 'Renseignez "Charges fixes mensuelles" (paramètres) pour un seuil de rentabilité exploitable.'
          : (contribution <= 0 ? 'Prix <= coût : produit structurellement non rentable.' : 'Prix manquant.')
      };
    }

    const breakEvenUnits = Math.ceil(fixedCosts / contribution);
    return { breakEvenUnits, contributionMarginUnit: contribution, variableCostUnit, price, fixedCosts, note: '' };
  }
}
