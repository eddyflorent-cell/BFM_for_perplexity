/**
 * Service d'export PDF professionnels
 * Génère des rapports avec texte sélectionnable et extractible
 * @module core/services/ExportService
 */

export class ExportService {
  
  /**
   * Crée un PDF vierge avec en-tête standard
   */
  static createPDF(orientation = 'portrait') {
    const { jsPDF } = window.jspdf;
    return new jsPDF(orientation);
  }
  
  /**
   * Ajoute un en-tête professionnel
   */
  static addHeader(doc, title, subtitle = '', settings = {}) {
    // Logo / Nom business (si fourni)
    if (settings.businessName) {
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(settings.businessName, 14, 15);
    }
    
    // Titre principal
    doc.setFontSize(18);
    doc.setTextColor(0);
    doc.setFont(undefined, 'bold');
    doc.text(title, 14, 25);
    
    // Sous-titre
    if (subtitle) {
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.setFont(undefined, 'normal');
      doc.text(subtitle, 14, 32);
    }
    
    // Ligne de séparation
    doc.setDrawColor(200);
    doc.setLineWidth(0.5);
    doc.line(14, 36, 196, 36);
  }
  
  /**
   * Ajoute un pied de page
   */
  static addFooter(doc, pageNumber = 1) {
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `BusinessFood Manager - Page ${pageNumber} - ${new Date().toLocaleDateString('fr-FR')}`,
      14,
      pageHeight - 10
    );
  }
  
  /**
   * Formate un montant en euros
   */
  static formatCurrency(amount) {
    return `${amount.toFixed(2)} €`;
  }
  
  /**
   * EXPORT 1 : Inventaire Stock
   */
  static async exportInventory(ingredients, settings = {}) {
    const doc = this.createPDF();
    
    // En-tête
    this.addHeader(doc, 'INVENTAIRE STOCK', `Édité le ${new Date().toLocaleDateString('fr-FR')}`, settings);
    
    // Préparer données tableau
    const tableData = [];
    let totalValue = 0;
    let criticalCount = 0;
    
    ingredients.forEach(ing => {
      const stock = ing.getTotalStock ? ing.getTotalStock() : 0;
      const pricePerUnit = ing.getPricePerBaseUnit ? ing.getPricePerBaseUnit() : 0;
      const value = stock * pricePerUnit;
      totalValue += value;
      
      // Statut DLC
      let dlcStatus = 'OK';
      if (ing.lots && ing.lots.length > 0) {
        const now = new Date();
        ing.lots.forEach(lot => {
          if (lot.dlc && !lot.epuise) {
            const dlcDate = new Date(lot.dlc);
            const days = Math.ceil((dlcDate - now) / (1000 * 60 * 60 * 24));
            if (days < 0) dlcStatus = 'PERIME';
            else if (days <= 3) { dlcStatus = 'URGENT'; criticalCount++; }
            else if (days <= 7) dlcStatus = 'PROCHE';
          }
        });
      }
      
      // Statut stock
      let stockStatus = 'OK';
      if (stock === 0) {
        stockStatus = 'EPUISE';
        criticalCount++;
      } else if (ing.alertBaseQty && stock <= ing.alertBaseQty * 0.3) {
        stockStatus = 'CRITIQUE';
        criticalCount++;
      } else if (ing.alertBaseQty && stock <= ing.alertBaseQty) {
        stockStatus = 'FAIBLE';
      }
      
      tableData.push([
        ing.name,
        ing.category || '-',
        `${stock.toFixed(2)} ${ing.baseUnit}`,
        stockStatus,
        this.formatCurrency(value),
        dlcStatus
      ]);
    });
    
    // Résumé avant tableau
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Résumé', 14, 45);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(`Total ingrédients : ${ingredients.length}`, 14, 52);
    doc.text(`Valeur totale stock : ${this.formatCurrency(totalValue)}`, 14, 58);
    doc.text(`Alertes critiques : ${criticalCount}`, 14, 64);
    
    // Tableau principal
    doc.autoTable({
      startY: 72,
      head: [['Ingrédient', 'Catégorie', 'Stock', 'Statut Stock', 'Valeur', 'Statut DLC']],
      body: tableData,
      foot: [['', '', '', 'TOTAL', this.formatCurrency(totalValue), '']],
      theme: 'striped',
      headStyles: { 
        fillColor: [255, 107, 53], 
        textColor: 255, 
        fontStyle: 'bold',
        fontSize: 10
      },
      footStyles: { 
        fillColor: [240, 240, 240], 
        textColor: 0, 
        fontStyle: 'bold',
        fontSize: 10
      },
      styles: { 
        fontSize: 9, 
        cellPadding: 4,
        overflow: 'linebreak'
      },
      columnStyles: {
        0: { cellWidth: 45 },
        1: { cellWidth: 30 },
        2: { cellWidth: 25, halign: 'right' },
        3: { cellWidth: 25, halign: 'center' },
        4: { cellWidth: 25, halign: 'right' },
        5: { cellWidth: 25, halign: 'center' }
      }
    });
    
    // Pied de page
    this.addFooter(doc, 1);
    
    // Téléchargement
    const filename = `Inventaire_Stock_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
    
    return { success: true, filename };
  }
  
  /**
   * EXPORT 2 : Fiche Recette
   */
  static async exportRecipe(recipe, ingredients, settings = {}) {
    const doc = this.createPDF();
    
    // En-tête
    this.addHeader(doc, 'FICHE TECHNIQUE', recipe.name, settings);
    
    let y = 45;
    
    // Informations générales
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Informations générales', 14, y);
    y += 7;
    
    // Bloc d'informations avec fond coloré
    doc.setFillColor(245, 245, 245);
    doc.rect(14, y - 3, 182, 24, 'F');
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(80, 80, 80);
    doc.text('Rendement :', 16, y + 2);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(`${recipe.producedQty} ${recipe.producedUnit}`, 50, y + 2);
    
    y += 8;
    doc.setFont(undefined, 'bold');
    doc.setTextColor(80, 80, 80);
    doc.text('Catégorie :', 16, y);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(recipe.category || 'Non catégorisée', 50, y);
    
    if (recipe.preparationTime) {
      y += 8;
      doc.setFont(undefined, 'bold');
      doc.setTextColor(80, 80, 80);
      doc.text('Temps :', 16, y);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(`${recipe.preparationTime} minutes`, 50, y);
    }
    
    y += 12;
    
    // Calcul coûts
    const RecipeService = window.RecipeService;
    let costData = null;
    if (RecipeService) {
      costData = RecipeService.calculateCost(recipe, ingredients);
    }
    
    // Tableau ingrédients
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Ingrédients', 14, y);
    y += 7;
    
    const ingredientsData = recipe.ingredients.map(ing => {
      const ingredient = ingredients.find(i => i.id === ing.ingredientId);
      const cost = costData ? costData.ingredients.find(c => c.name === (ingredient?.name || ing.ingredientName)) : null;
      
      return [
        ingredient?.name || ing.ingredientName || 'Inconnu',
        `${ing.quantity} ${ing.unit}`,
        cost ? this.formatCurrency(cost.cost) : '-'
      ];
    });
    
    doc.autoTable({
      startY: y,
      head: [['Ingrédient', 'Quantité', 'Coût']],
      body: ingredientsData,
      theme: 'striped',
      headStyles: { 
        fillColor: [255, 107, 53], 
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 11,
        halign: 'left'
      },
      styles: { 
        fontSize: 10, 
        cellPadding: 4,
        lineColor: [220, 220, 220],
        lineWidth: 0.1
      },
      columnStyles: {
        0: { cellWidth: 100, halign: 'left' },
        1: { cellWidth: 45, halign: 'right' },
        2: { cellWidth: 35, halign: 'right', fontStyle: 'bold' }
      },
      margin: { left: 14, right: 14 }
    });
    
    y = doc.lastAutoTable.finalY + 10;
    
    // Coûts et marges
    if (costData) {
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Analyse financière', 14, y);
      y += 7;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`Coût total matières premières : ${this.formatCurrency(costData.totalCost)}`, 14, y);
      y += 6;
      doc.text(`Coût unitaire : ${this.formatCurrency(costData.costPerUnit)}`, 14, y);
      y += 6;
      
      if (recipe.sellingPrice && recipe.sellingPrice > 0) {
        const margin = ((recipe.sellingPrice - costData.costPerUnit) / recipe.sellingPrice) * 100;
        doc.text(`Prix de vente unitaire : ${this.formatCurrency(recipe.sellingPrice)}`, 14, y);
        y += 6;
        doc.text(`Marge : ${margin.toFixed(1)}%`, 14, y);
        y += 6;
        
        // Indicateur visuel marge
        doc.setFont(undefined, 'bold');
        if (margin < 0) {
          doc.setTextColor(220, 38, 38);
          doc.text('⚠ PERTE - Prix de vente insuffisant', 14, y);
        } else if (margin < 25) {
          doc.setTextColor(234, 88, 12);
          doc.text('⚠ Marge faible', 14, y);
        } else if (margin >= 50) {
          doc.setTextColor(34, 197, 94);
          doc.text('✓ Excellente rentabilité', 14, y);
        } else {
          doc.setTextColor(34, 197, 94);
          doc.text('✓ Rentabilité correcte', 14, y);
        }
        doc.setTextColor(0);
        doc.setFont(undefined, 'normal');
        y += 10;
      }
    }
    
    // Instructions
    if (recipe.instructions && recipe.instructions.trim()) {
      y += 5;
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Instructions de préparation', 14, y);
      y += 7;
      
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      
      // Découper instructions en lignes
      const instructions = recipe.instructions.split('\n');
      instructions.forEach(line => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        const splitLines = doc.splitTextToSize(line.trim(), 180);
        doc.text(splitLines, 14, y);
        y += splitLines.length * 5;
      });
    }
    
    // Pied de page
    this.addFooter(doc, 1);
    
    // Téléchargement
    const filename = `Fiche_${recipe.name.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
    
    return { success: true, filename };
  }
  
  /**
   * EXPORT 3 : Rapport Rentabilité
   */
  static async exportProfitabilityReport(recipes, packs, ingredients, settings = {}) {
    const doc = this.createPDF();
    
    // En-tête
    this.addHeader(doc, 'RAPPORT RENTABILITÉ', `Période : ${new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`, settings);
    
    let y = 45;
    
    // Analyser tous les produits SANS RecipeService
    let analysis = [];
    
    // Fonction helper pour calculer coût recette
    const calculateRecipeCost = (recipe) => {
      let totalCost = 0;
      
      if (!recipe.ingredients || recipe.ingredients.length === 0) return 0;
      
      recipe.ingredients.forEach(recipeIng => {
        const ingredient = ingredients.find(ing => ing.id === recipeIng.ingredientId);
        if (!ingredient) return;
        
        const pricePerUnit = ingredient.getPricePerBaseUnit ? ingredient.getPricePerBaseUnit() : 0;
        
        // Convertir quantité en baseUnit
        let qtyInBaseUnit = recipeIng.quantity;
        if (recipeIng.unit !== ingredient.baseUnit) {
          // Conversions courantes
          if (ingredient.baseUnit === 'g' && recipeIng.unit === 'kg') qtyInBaseUnit *= 1000;
          if (ingredient.baseUnit === 'ml' && recipeIng.unit === 'l') qtyInBaseUnit *= 1000;
        }
        
        totalCost += qtyInBaseUnit * pricePerUnit;
      });
      
      const producedQty = recipe.producedQty || 1;
      return totalCost / producedQty;
    };
    
    // Analyser recettes
    recipes.forEach(recipe => {
      if (!recipe.sellingPrice || recipe.sellingPrice <= 0) return;
      
      const costPerUnit = calculateRecipeCost(recipe);
      if (costPerUnit > 0) {
        const margin = ((recipe.sellingPrice - costPerUnit) / recipe.sellingPrice) * 100;
        
        analysis.push({
          name: recipe.name,
          type: 'Recette',
          cost: costPerUnit,
          price: recipe.sellingPrice,
          margin: margin,
          status: margin >= 50 ? 'Excellent' : margin >= 25 ? 'Correct' : margin >= 0 ? 'Faible' : 'Perte'
        });
      }
    });
    
    // Analyser packs
    packs.forEach(pack => {
      if (!pack.price || pack.price <= 0 || !pack.items || pack.items.length === 0) return;
      
      let totalCost = 0;
      let valid = true;
      
      pack.items.forEach(item => {
        const recipe = recipes.find(r => r.id === item.productId);
        if (recipe) {
          const recipeCost = calculateRecipeCost(recipe);
          if (recipeCost > 0) {
            totalCost += recipeCost * item.quantity;
          } else {
            valid = false;
          }
        } else {
          valid = false;
        }
      });
      
      if (valid && totalCost > 0) {
        const margin = ((pack.price - totalCost) / pack.price) * 100;
        
        analysis.push({
          name: pack.name,
          type: 'Pack',
          cost: totalCost,
          price: pack.price,
          margin: margin,
          status: margin >= 50 ? 'Excellent' : margin >= 25 ? 'Correct' : margin >= 0 ? 'Faible' : 'Perte'
        });
      }
    });
    
    // Statistiques globales
    const withPrice = analysis.filter(a => a.price > 0);
    const avgMargin = withPrice.length > 0 
      ? withPrice.reduce((sum, a) => sum + a.margin, 0) / withPrice.length 
      : 0;
    const excellent = withPrice.filter(a => a.margin >= 50).length;
    const correct = withPrice.filter(a => a.margin >= 25 && a.margin < 50).length;
    const faible = withPrice.filter(a => a.margin >= 0 && a.margin < 25).length;
    const perte = withPrice.filter(a => a.margin < 0).length;
    
    // Résumé
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Synthèse', 14, y);
    y += 7;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Produits analysés : ${analysis.length}`, 14, y);
    y += 6;
    doc.text(`Produits avec prix : ${withPrice.length}`, 14, y);
    y += 6;
    doc.text(`Marge moyenne : ${avgMargin.toFixed(1)}%`, 14, y);
    y += 10;
    
    // Répartition
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Répartition par rentabilité', 14, y);
    y += 7;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Excellents (>=50%) : ${excellent} (${withPrice.length > 0 ? ((excellent/withPrice.length)*100).toFixed(0) : 0}%)`, 14, y);
    y += 6;
    doc.text(`Corrects (25-50%) : ${correct} (${withPrice.length > 0 ? ((correct/withPrice.length)*100).toFixed(0) : 0}%)`, 14, y);
    y += 6;
    doc.text(`Faibles (<25%) : ${faible} (${withPrice.length > 0 ? ((faible/withPrice.length)*100).toFixed(0) : 0}%)`, 14, y);
    y += 6;
    doc.text(`En perte (<0%) : ${perte} (${withPrice.length > 0 ? ((perte/withPrice.length)*100).toFixed(0) : 0}%)`, 14, y);
    y += 12;
    
    // Tableau détaillé
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Détail par produit', 14, y);
    y += 7;
    
    const tableData = withPrice
      .sort((a, b) => b.margin - a.margin)
      .map((item, index) => {
        let statusLabel = '';
        if (item.margin < 0) statusLabel = 'PERTE';
        else if (item.margin < 25) statusLabel = 'Faible';
        else if (item.margin < 50) statusLabel = 'Correct';
        else statusLabel = 'Excellent';
        
        return [
          (index + 1).toString(),
          item.name,
          item.type,
          this.formatCurrency(item.cost),
          this.formatCurrency(item.price),
          `${item.margin.toFixed(1)}%`,
          statusLabel
        ];
      });
    
    doc.autoTable({
      startY: y,
      head: [['#', 'Produit', 'Type', 'Coût', 'Prix', 'Marge', 'Statut']],
      body: tableData,
      theme: 'striped',
      headStyles: { 
        fillColor: [255, 107, 53], 
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 9
      },
      styles: { fontSize: 8, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 55 },
        2: { cellWidth: 20 },
        3: { cellWidth: 25, halign: 'right' },
        4: { cellWidth: 25, halign: 'right' },
        5: { cellWidth: 20, halign: 'right' },
        6: { cellWidth: 20, halign: 'center' }
      }
    });
    
    // Pied de page
    this.addFooter(doc, 1);
    
    // Téléchargement
    const filename = `Rapport_Rentabilite_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
    
    return { success: true, filename };
  }
  
  /**
   * EXPORT 4 : Bilan Valorisation Stock
   */
  static async exportStockValuation(ingredients, productions, settings = {}) {
    const doc = this.createPDF();
    
    // En-tête
    this.addHeader(doc, 'BILAN VALORISATION', `Au ${new Date().toLocaleDateString('fr-FR')}`, settings);
    
    let y = 45;
    
    // Calcul valorisation ingrédients
    let totalIngredients = 0;
    ingredients.forEach(ing => {
      const stock = ing.getTotalStock ? ing.getTotalStock() : 0;
      const price = ing.getPricePerBaseUnit ? ing.getPricePerBaseUnit() : 0;
      totalIngredients += stock * price;
    });
    
    // Calcul valorisation produits finis
    let totalProductions = 0;
    if (productions && productions.length > 0) {
      productions.forEach(prod => {
        if (prod.quantityRemaining && prod.costPerUnit) {
          totalProductions += prod.quantityRemaining * prod.costPerUnit;
        }
      });
    }
    
    const totalValue = totalIngredients + totalProductions;
    
    // Synthèse
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('VALEUR TOTALE DU STOCK', 14, y);
    y += 10;
    
    doc.setFontSize(20);
    doc.setTextColor(255, 107, 53);
    doc.text(this.formatCurrency(totalValue), 14, y);
    doc.setTextColor(0);
    y += 15;
    
    // Détail
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Détail de valorisation', 14, y);
    y += 7;
    
    const valuationData = [
      ['Ingrédients en stock', this.formatCurrency(totalIngredients)],
      ['Produits finis', this.formatCurrency(totalProductions)],
      ['', ''],
      ['TOTAL', this.formatCurrency(totalValue)]
    ];
    
    doc.autoTable({
      startY: y,
      body: valuationData,
      theme: 'plain',
      styles: { fontSize: 10, cellPadding: 4 },
      columnStyles: {
        0: { cellWidth: 100, fontStyle: 'bold' },
        1: { cellWidth: 60, halign: 'right', fontStyle: 'bold' }
      }
    });
    
    y = doc.lastAutoTable.finalY + 15;
    
    // Top 10 ingrédients par valeur
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Top 10 ingrédients par valeur', 14, y);
    y += 7;
    
    const ingredientValues = ingredients.map(ing => {
      const stock = ing.getTotalStock ? ing.getTotalStock() : 0;
      const price = ing.getPricePerBaseUnit ? ing.getPricePerBaseUnit() : 0;
      return {
        name: ing.name,
        value: stock * price,
        stock: `${stock.toFixed(2)} ${ing.baseUnit}`
      };
    })
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);
    
    const top10Data = ingredientValues.map((item, index) => [
      (index + 1).toString(),
      item.name,
      item.stock,
      this.formatCurrency(item.value)
    ]);
    
    doc.autoTable({
      startY: y,
      head: [['#', 'Ingrédient', 'Stock', 'Valeur']],
      body: top10Data,
      theme: 'striped',
      headStyles: { 
        fillColor: [255, 107, 53], 
        textColor: 255,
        fontStyle: 'bold'
      },
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 80 },
        2: { cellWidth: 40, halign: 'right' },
        3: { cellWidth: 40, halign: 'right' }
      }
    });
    
    // Pied de page
    this.addFooter(doc, 1);
    
    // Téléchargement
    const filename = `Bilan_Valorisation_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
    
    return { success: true, filename };
  }

  /**
   * Rapport Mensuel de Performance Cuisine (BFM)
   * @param {Object} report - données préparées par MonthlyKitchenReportService.generate
   * @param {Object} settings
   */
  static async exportMonthlyKitchenReport(report, settings = {}) {
    const doc = this.createPDF();

    const monthLabel = new Date(report.period.year, report.period.month - 1, 1)
      .toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

    this.addHeader(doc, 'RAPPORT MENSUEL PERFORMANCE CUISINE', `Période : ${monthLabel}`, settings);

    let y = 45;
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Synthèse KPI', 14, y);
    y += 7;

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Productions (mois) : ${report.totals.productionsCount}`, 14, y); y += 6;
    doc.text(`COGS théorique : ${this.formatCurrency(report.totals.theoreticalCOGS || 0)}`, 14, y); y += 6;
    doc.text(`COGS réel (lots) : ${this.formatCurrency(report.totals.realCOGS || 0)}`, 14, y); y += 6;
    doc.text(`Écart (réel - théorique) : ${this.formatCurrency(report.totals.varianceTotal || 0)} (${(report.totals.variancePct || 0).toFixed(1)}%)`, 14, y);
    y += 10;

    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Top / Flop marges (sur prix saisis)', 14, y);
    y += 7;

    const topRows = (report.top || []).map((p, i) => [
      (i + 1).toString(), p.type, p.name,
      this.formatCurrency(p.cost), this.formatCurrency(p.price), `${p.marginPct.toFixed(1)}%`
    ]);

    doc.autoTable({
      startY: y,
      head: [['#', 'Type', 'Produit', 'Coût', 'Prix', 'Marge %'] ],
      body: topRows,
      theme: 'striped',
      headStyles: { fillColor: [46, 204, 113], textColor: 255, fontStyle: 'bold', fontSize: 10 },
      styles: { fontSize: 9, cellPadding: 4 }
    });

    y = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Flop marges', 14, y);
    const flopRows = (report.flop || []).map((p, i) => [
      (i + 1).toString(), p.type, p.name,
      this.formatCurrency(p.cost), this.formatCurrency(p.price), `${p.marginPct.toFixed(1)}%`
    ]);
    doc.autoTable({
      startY: y + 6,
      head: [['#', 'Type', 'Produit', 'Coût', 'Prix', 'Marge %'] ],
      body: flopRows,
      theme: 'striped',
      headStyles: { fillColor: [231, 76, 60], textColor: 255, fontStyle: 'bold', fontSize: 10 },
      styles: { fontSize: 9, cellPadding: 4 }
    });

    y = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Alertes fluctuations prix (>= 10%)', 14, y);
    y += 7;
    const priceRows = (report.priceAlerts || []).map(a => [
      a.ingredient,
      `${a.prevUnitCost.toFixed(4)} €/${a.baseUnit}`,
      `${a.curUnitCost.toFixed(4)} €/${a.baseUnit}`,
      `${a.changePct.toFixed(1)}%`
    ]);
    doc.autoTable({
      startY: y,
      head: [['Ingrédient', 'M-1', 'M', 'Δ%']],
      body: priceRows,
      theme: 'striped',
      headStyles: { fillColor: [255, 107, 53], textColor: 255, fontStyle: 'bold', fontSize: 10 },
      styles: { fontSize: 9, cellPadding: 4 }
    });

    y = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Radar gaspillage (proxy : valeur lots DLC)', 14, y);
    y += 7;
    const wasteRows = (report.wasteAlerts || []).map(w => [
      w.ingredient,
      this.formatCurrency(w.urgentValue || 0),
      this.formatCurrency(w.expiredValue || 0),
      this.formatCurrency((w.urgentValue || 0) + (w.expiredValue || 0))
    ]);
    doc.autoTable({
      startY: y,
      head: [['Ingrédient', 'DLC <= 3j', 'Périmé', 'Total']],
      body: wasteRows,
      theme: 'striped',
      headStyles: { fillColor: [52, 152, 219], textColor: 255, fontStyle: 'bold', fontSize: 10 },
      styles: { fontSize: 9, cellPadding: 4 }
    });

    this.addFooter(doc, 1);
    const filename = `Rapport_Performance_Cuisine_${report.period.year}-${String(report.period.month).padStart(2,'0')}.pdf`;
    doc.save(filename);
    return { success: true, filename };
  }
}
