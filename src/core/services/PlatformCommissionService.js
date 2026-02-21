/**
 * SERVICE COMMISSIONS PLATEFORMES
 * Calcule les marges NETTES après commissions Uber Eats, Deliveroo, etc.
 * @module core/services/PlatformCommissionService
 */

export class PlatformCommissionService {
  
  // Configuration des plateformes de livraison
  static PLATFORMS = {
    direct: {
      name: "Vente directe",
      commission: 0,
      icon: "🏪",
      color: "#10b981"
    },
    uberEats: {
      name: "Uber Eats",
      commission: 30,
      icon: "🛵",
      color: "#06c167"
    },
    deliveroo: {
      name: "Deliveroo",
      commission: 28,
      icon: "🚴",
      color: "#00ccbc"
    },
    justEat: {
      name: "Just Eat",
      commission: 25,
      icon: "🍕",
      color: "#ff8000"
    },
    glovo: {
      name: "Glovo",
      commission: 27,
      icon: "🛴",
      color: "#ffc244"
    }
  };
  
  /**
   * Calcule la marge nette pour chaque plateforme
   * @param {number} price - Prix de vente
   * @param {number} cost - Coût de production
   * @returns {Object} - Marges par plateforme
   */
  static calculateMarginsByPlatform(price, cost) {
    const results = {};
    
    for (const [key, platform] of Object.entries(this.PLATFORMS)) {
      // Prix net après commission
      const netPrice = price * (1 - platform.commission / 100);
      
      // Marge nette
      const netMargin = netPrice - cost;
      const netMarginPercent = netPrice > 0 ? (netMargin / netPrice) * 100 : 0;
      
      // Marge brute (avant commission)
      const grossMargin = price - cost;
      const grossMarginPercent = price > 0 ? (grossMargin / price) * 100 : 0;
      
      results[key] = {
        platformName: platform.name,
        icon: platform.icon,
        color: platform.color,
        commission: platform.commission,
        commissionAmount: price * (platform.commission / 100),
        grossPrice: price,
        netPrice: netPrice,
        cost: cost,
        grossMargin: grossMargin,
        grossMarginPercent: grossMarginPercent,
        netMargin: netMargin,
        netMarginPercent: netMarginPercent,
        profitable: netMargin >= 0
      };
    }
    
    return results;
  }
  
  /**
   * Calcule le prix suggéré pour atteindre une marge cible sur une plateforme
   * @param {number} cost - Coût de production
   * @param {number} targetMarginPercent - Marge cible en %
   * @param {string} platformKey - Clé de la plateforme
   * @returns {number} - Prix suggéré
   */
  static calculateSuggestedPrice(cost, targetMarginPercent, platformKey = 'direct') {
    const platform = this.PLATFORMS[platformKey];
    if (!platform) return cost / (1 - targetMarginPercent / 100);
    
    // Formule : Prix = Coût / ((1 - Commission%) * (1 - Marge%))
    const adjustedMargin = targetMarginPercent / 100;
    const commissionRate = platform.commission / 100;
    
    // Prix nécessaire pour atteindre la marge cible APRÈS commission
    const suggestedPrice = cost / ((1 - commissionRate) * (1 - adjustedMargin));
    
    return suggestedPrice;
  }
  
  /**
   * Analyse la rentabilité d'un produit sur toutes les plateformes
   * @param {string} productName - Nom du produit
   * @param {number} cost - Coût
   * @param {number} price - Prix actuel
   * @returns {Object} - Analyse complète
   */
  static analyzeProduct(productName, cost, price) {
    const margins = this.calculateMarginsByPlatform(price, cost);
    
    // Compter les plateformes rentables
    const profitablePlatforms = Object.values(margins).filter(m => m.profitable).length;
    const totalPlatforms = Object.keys(margins).length;
    
    // Trouver la meilleure et la pire plateforme
    const sortedByMargin = Object.entries(margins).sort((a, b) => 
      b[1].netMarginPercent - a[1].netMarginPercent
    );
    
    const bestPlatform = sortedByMargin[0];
    const worstPlatform = sortedByMargin[sortedByMargin.length - 1];
    
    // Recommandations
    const recommendations = this.generatePlatformRecommendations(margins, cost, price);
    
    return {
      productName,
      cost,
      price,
      margins,
      profitablePlatforms,
      totalPlatforms,
      bestPlatform: {
        key: bestPlatform[0],
        ...bestPlatform[1]
      },
      worstPlatform: {
        key: worstPlatform[0],
        ...worstPlatform[1]
      },
      recommendations
    };
  }
  
  /**
   * Génère des recommandations par plateforme
   */
  static generatePlatformRecommendations(margins, cost, currentPrice) {
    const recommendations = [];
    
    for (const [key, margin] of Object.entries(margins)) {
      if (!margin.profitable && key !== 'direct') {
        // Produit non rentable sur cette plateforme
        const suggestedPrice = this.calculateSuggestedPrice(cost, 30, key);
        
        recommendations.push({
          platform: key,
          platformName: margin.platformName,
          type: 'loss',
          severity: 'critical',
          icon: '🔴',
          message: `Perte de ${Math.abs(margin.netMargin).toFixed(2)}€ par vente sur ${margin.platformName}`,
          action: `Augmenter le prix à ${suggestedPrice.toFixed(2)}€ ou retirer de cette plateforme`,
          currentPrice: currentPrice,
          suggestedPrice: suggestedPrice
        });
      } else if (margin.netMarginPercent < 20 && key !== 'direct') {
        // Marge faible
        const suggestedPrice = this.calculateSuggestedPrice(cost, 30, key);
        
        recommendations.push({
          platform: key,
          platformName: margin.platformName,
          type: 'low_margin',
          severity: 'warning',
          icon: '🟡',
          message: `Marge faible (${margin.netMarginPercent.toFixed(1)}%) sur ${margin.platformName}`,
          action: `Envisager ${suggestedPrice.toFixed(2)}€ pour 30% de marge nette`,
          currentPrice: currentPrice,
          suggestedPrice: suggestedPrice
        });
      }
    }
    
    return recommendations;
  }
  
  /**
   * Compare les plateformes pour un produit
   * @returns {String} - HTML de comparaison
   */
  static generateComparisonTable(analysis) {
    const rows = Object.entries(analysis.margins).map(([key, margin]) => {
      const statusClass = margin.profitable ? 'profitable' : 'loss';
      const statusIcon = margin.profitable ? '✅' : '❌';
      
      return `
        <tr class="${statusClass}">
          <td>${margin.icon} ${margin.platformName}</td>
          <td>${margin.commission}%</td>
          <td>${margin.commissionAmount.toFixed(2)}€</td>
          <td><strong>${margin.netPrice.toFixed(2)}€</strong></td>
          <td style="color: ${margin.netMargin >= 0 ? '#10b981' : '#ef4444'};">
            <strong>${margin.netMargin >= 0 ? '+' : ''}${margin.netMargin.toFixed(2)}€</strong>
          </td>
          <td style="color: ${margin.netMargin >= 0 ? '#10b981' : '#ef4444'};">
            <strong>${margin.netMarginPercent >= 0 ? '+' : ''}${margin.netMarginPercent.toFixed(1)}%</strong>
          </td>
          <td>${statusIcon}</td>
        </tr>
      `;
    }).join('');
    
    return rows;
  }
  
  /**
   * Calcule l'impact financier des commissions
   * @param {Array} products - Liste des produits avec volumes
   * @returns {Object} - Impact financier global
   */
  static calculateFinancialImpact(products) {
    let totalRevenue = 0;
    let totalCommissions = 0;
    let totalNetRevenue = 0;
    let totalCost = 0;
    
    for (const product of products) {
      const revenue = product.price * product.volume;
      const cost = product.cost * product.volume;
      const commissionAmount = revenue * (product.platformCommission / 100);
      const netRevenue = revenue - commissionAmount;
      
      totalRevenue += revenue;
      totalCommissions += commissionAmount;
      totalNetRevenue += netRevenue;
      totalCost += cost;
    }
    
    const grossProfit = totalRevenue - totalCost;
    const netProfit = totalNetRevenue - totalCost;
    const commissionImpact = grossProfit - netProfit;
    
    return {
      totalRevenue,
      totalCommissions,
      totalNetRevenue,
      totalCost,
      grossProfit,
      netProfit,
      commissionImpact,
      commissionImpactPercent: (commissionImpact / grossProfit) * 100
    };
  }
}
