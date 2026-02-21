export function normalizeShowDirectCost(value) {
  return value === true || value === 'true';
}

export function normalizeOverheadCoefficient(value) {
  const n = parseFloat(value);
  if (!Number.isFinite(n) || n < 1) return 1;
  return n;
}

export const CostEngine = {
  getSettings(appState) {
    const settings = (appState && appState.data && appState.data.settings) ? appState.data.settings : {};
    const overheadCoefficient = normalizeOverheadCoefficient(settings.overheadCoefficient ?? 1);
    const showDirectCost = normalizeShowDirectCost(settings.showDirectCost);

    return {
      overheadCoefficient,
      showDirectCost,
      overheadOn: overheadCoefficient > 1,
      // BFM UX: overhead impacts calculations/labels ONLY when showDirectCost is enabled
      overheadDisplayOn: overheadCoefficient > 1 && showDirectCost,
    };
  },

  computeRecipe(recipe, ingredients, appState) {
    if (!recipe) return null;
    const { overheadCoefficient, overheadOn, showDirectCost, overheadDisplayOn } = this.getSettings(appState);

    const producedQty = Number(recipe.producedQty || 1) || 1;

    let costDirect = 0;
    (recipe.ingredients || []).forEach(recipeIng => {
      const ing = (ingredients || []).find(i => i.id === recipeIng.ingredientId);
      if (!ing) return;
      const costPerUnit = typeof ing.getPricePerBaseUnit === 'function' ? ing.getPricePerBaseUnit() : 0;
      const baseQty = Number(recipeIng.baseQty ?? 0) || 0;
      costDirect += baseQty * costPerUnit;
    });

    const effectiveCoef = overheadDisplayOn ? overheadCoefficient : 1;
    const costComplete = costDirect * effectiveCoef;

    return {
      costDirect,
      costComplete,
      unitDirect: costDirect / producedQty,
      unitComplete: costComplete / producedQty,
      producedQty,
      overheadCoefficient,
      overheadOn,
      showDirectCost,
      overheadDisplayOn,
      effectiveCoef,
    };
  }
};
