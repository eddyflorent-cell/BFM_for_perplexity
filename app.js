        // Import CORE services (v53.0 - Nouvelle démo réaliste)
        import { IngredientService } from './src/core/services/IngredientService.js?v=55.6';
        import { RecipeService } from './src/core/services/RecipeService.js?v=55.6';
        import { SaleService } from './src/core/services/SaleService.js?v=55.6';
        import { DashboardService } from './src/core/services/DashboardService.js?v=55.6';
        import { ExpenseService } from './src/core/services/ExpenseService.js?v=55.6';
        import { ProfitabilityService } from './src/core/services/ProfitabilityService.js?v=55.6';
        import { PlatformCommissionService } from './src/core/services/PlatformCommissionService.js?v=55.6';
        import { IngredientImporter } from './src/core/services/IngredientImporter.js?v=55.6';
        import { PackService } from './src/core/services/PackService.js?v=55.6';
        import { AlertService, AlertType, AlertSeverity } from './src/core/services/AlertService.js?v=55.6';
        import { ExportService } from './src/core/services/ExportService.js?v=55.6';
        import { StorageManager } from './src/core/data/StorageManager.js?v=55.6';

        // BFM Architecture (Sprint 1.2+) — central engines
        import { CostEngine } from './bfm/core/costEngine.js';
        import { isAdminMode, applyAdminOnlyUI, guardAdminOnlyNavigation } from './bfm/ui/adminMode.js';

        
        // Import CORE models
        import { Ingredient } from './src/core/models/Ingredient.js?v=55.6';
        import { Lot } from './src/core/models/Lot.js?v=55.6';
        import { Recipe, RecipeIngredient } from './src/core/models/Recipe.js?v=55.6';
        import { Production, UsedLot } from './src/core/models/Production.js?v=55.6';
        import { Sale, SaleItem } from './src/core/models/Sale.js?v=55.6';
        import { Expense } from './src/core/models/Expense.js?v=55.6';
        import { Pack, PackItem } from './src/core/models/Pack.js?v=55.6';
        
        // Import DEMO DATA
        import { demoSalonModerne as demoWESalon } from './src/demo-we-salon.js?v=55.6';
        import { demoBarLounge } from './src/demo-bar-lounge.js?v=55.6';
        // Exposer les recettes démo pour récupération sellingPrice dans loadData
        window.demoWESalonRecipes = demoWESalon.recipes || [];
        window.demoBarLoungeRecipes = demoBarLounge.recipes || [];
        
        // Make classes available globally for demo data conversion and loadData
        window.Ingredient = Ingredient;
        window.Lot = Lot;
        window.Recipe = Recipe;
        window.RecipeIngredient = RecipeIngredient;
        window.Production = Production;
        window.UsedLot = UsedLot;
        window.Sale = Sale;
        window.SaleItem = SaleItem;
        window.Expense = Expense;
        window.Pack = Pack;
        window.PackItem = PackItem;
        
        
        // ========================================
        // I18N & TRANSLATIONS
        // ========================================

        // i18n Translations
        const translations = {
            fr: {
                app_name: 'BusinessFood Manager',
                dashboard: 'Tableau de bord',
                ingredients: 'Ingrédients',
                recipes: 'Recettes',
                production: 'Production',
                sales: 'Ventes',
                expenses: 'Dépenses',
                suppliers: 'Fournisseurs',
                personnel: 'Personnel',
                clients: 'Clients',
                settings: 'Paramètres',
                search_placeholder: 'Rechercher...',
                welcome: 'Bienvenue',
                today_overview: 'Aperçu d\'aujourd\'hui',
                total_revenue: 'Chiffre d\'affaires',
                total_margin: 'Marge brute',
                stock_value: 'Valeur stock',
                alerts: 'Alertes',
                quick_actions: 'Actions rapides',
                add_ingredient: 'Ajouter ingrédient',
                new_recipe: 'Nouvelle recette',
                record_sale: 'Enregistrer vente',
                add_expense: 'Ajouter dépense'
            },
            en: {
                app_name: 'BusinessFood Manager',
                dashboard: 'Dashboard',
                ingredients: 'Ingredients',
                recipes: 'Recipes',
                production: 'Production',
                sales: 'Sales',
                expenses: 'Expenses',
                suppliers: 'Suppliers',
                personnel: 'Staff',
                clients: 'Clients',
                settings: 'Settings',
                search_placeholder: 'Search...',
                welcome: 'Welcome',
                today_overview: 'Today\'s overview',
                total_revenue: 'Total Revenue',
                total_margin: 'Gross Margin',
                stock_value: 'Stock Value',
                alerts: 'Alerts',
                quick_actions: 'Quick Actions',
                add_ingredient: 'Add ingredient',
                new_recipe: 'New recipe',
                record_sale: 'Record sale',
                add_expense: 'Add expense'
            }
        };

        // Currency Formats
        const currencyFormats = {
            EUR: { symbol: '€', position: 'after', decimals: 2, separator: ',' },
            GBP: { symbol: '£', position: 'before', decimals: 2, separator: ',' },
            USD: { symbol: '$', position: 'before', decimals: 2, separator: ',' }
        };
        
        // Taux de change (base: EUR)
        const exchangeRates = {
            EUR: 1,           // 1 EUR = 1 EUR (devise de référence)
            GBP: 0.85,        // 1 GBP = 0.85 EUR (1 EUR = 1.18 GBP)
            USD: 1.09         // 1 USD = 1.09 EUR (1 EUR = 0.92 USD)
        };
        
        // Convertir montant de EUR vers devise cible
        function convertCurrency(amountInEUR, targetCurrency) {
            if (targetCurrency === 'EUR') return amountInEUR;
            return amountInEUR / exchangeRates[targetCurrency];
        }
        
        // Convertir montant de devise source vers EUR
        function convertToEUR(amount, sourceCurrency) {
            if (sourceCurrency === 'EUR') return amount;
            return amount * exchangeRates[sourceCurrency];
        }

        // App State
        const appState = {
            currentLang: 'fr',
            currentCurrency: 'EUR',
            currentPage: 'dashboard',
            exchangeRates: {
                'EUR': 1.0,
                'GBP': 0.85,
                'USD': 1.09
            },
            data: {
                ingredients: [],
                recipes: [],
                productions: [],
                sales: [],
                expenses: [],
                packs: [],
                staff: [],
                suppliers: [],
                clients: [],
                lossHistory: [],
                movements: [],
                categories: [
                    // Catégories par défaut
                    { id: 'cat1', name: 'Farines', parent: null },
                    { id: 'cat2', name: 'Farine T55', parent: 'Farines' },
                    { id: 'cat3', name: 'Farine T65', parent: 'Farines' },
                    { id: 'cat4', name: 'Sucres', parent: null },
                    { id: 'cat5', name: 'Sucre blanc', parent: 'Sucres' },
                    { id: 'cat6', name: 'Sucre roux', parent: 'Sucres' },
                    { id: 'cat7', name: 'Matières grasses', parent: null },
                    { id: 'cat8', name: 'Oeufs & Lait', parent: null },
                    { id: 'cat9', name: 'Additifs', parent: null }
                ],
                settings: {
                    // 💰 COEFFICIENT DÉPENSES FIXES
                    // Prend en compte loyer, salaires, électricité, etc.
                    // Formule : Coût réel = Coût ingrédients × coefficient
                    // Exemple : 1.40 = 40% de dépenses fixes
                    overheadCoefficient: 1.40,  // Par défaut 40%
                    
                    // Affichage
                    showDirectCost: false,  // Décoché par défaut
                    
                    // Pour calcul auto (futur module Dépenses)
                    autoCalculateCoefficient: false
                }
            },
            customDlcFilter: null
        };

        // Load data from StorageManager
        function loadData() {
            const saved = StorageManager.load();
            if (saved) {
                // Convert ingredients back to class instances
                if (saved.ingredients && window.Ingredient && window.Ingredient.fromJSON) {
                    saved.ingredients = saved.ingredients.map(ing => {
                        try {
                            return window.Ingredient.fromJSON(ing);
                        } catch (err) {
                            console.error('Error converting ingredient on load:', err);
                            return ing;
                        }
                    });
                }
                
                // Convert recipes back to class instances
                if (saved.recipes && window.Recipe && window.Recipe.fromJSON) {
                    // Construire un index sellingPrice depuis les démos (pour corriger anciens saves)
                    const demoPrices = {};
                    const allDemoRecipes = [
                        ...(window.demoWESalonRecipes || []),
                        ...(window.demoBarLoungeRecipes || [])
                    ];
                    allDemoRecipes.forEach(r => { if (r.sellingPrice) demoPrices[r.id] = r.sellingPrice; });

                    saved.recipes = saved.recipes.map(recipe => {
                        try {
                            // Récupérer sellingPrice depuis démo si absent
                            if (!recipe.sellingPrice && demoPrices[recipe.id]) {
                                recipe.sellingPrice = demoPrices[recipe.id];
                            }
                            return window.Recipe.fromJSON(recipe);
                        } catch (err) {
                            console.error('Error converting recipe on load:', err);
                            return recipe;
                        }
                    });
                }
                
                // Convert productions back to class instances
                if (saved.productions && window.Production && window.Production.fromJSON) {
                    saved.productions = saved.productions.map(prod => {
                        try {
                            return window.Production.fromJSON(prod);
                        } catch (err) {
                            console.error('Error converting production on load:', err);
                            return prod;
                        }
                    });
                }
                
                // Convert sales back to class instances
                if (saved.sales && window.Sale && window.Sale.fromJSON) {
                    saved.sales = saved.sales.map(sale => {
                        try {
                            return window.Sale.fromJSON(sale);
                        } catch (err) {
                            console.error('Error converting sale on load:', err);
                            return sale;
                        }
                    });
                }
                
                // Convert expenses back to class instances
                if (saved.expenses && window.Expense && window.Expense.fromJSON) {
                    saved.expenses = saved.expenses.map(expense => {
                        try {
                            return window.Expense.fromJSON(expense);
                        } catch (err) {
                            console.error('Error converting expense on load:', err);
                            return expense;
                        }
                    });
                }
                
                // Convert packs back to class instances
                if (saved.packs && window.Pack && window.Pack.fromJSON) {
                    saved.packs = saved.packs.map(pack => {
                        try {
                            return window.Pack.fromJSON(pack);
                        } catch (err) {
                            console.error('Error converting pack on load:', err);
                            return pack;
                        }
                    });
                }
                
                appState.data = saved;
                // Ensure new fields exist (migration for older saves)
                if (!appState.data.suppliers) appState.data.suppliers = [];
                if (!appState.data.clients) appState.data.clients = [];
                if (!appState.data.lossHistory) appState.data.lossHistory = [];
                if (!appState.data.movements) appState.data.movements = [];
                // Normalize settings (migration for older saves / string booleans)
                if (!appState.data.settings) appState.data.settings = { overheadCoefficient: 1.40, showDirectCost: false };
                const _sdc = appState.data.settings.showDirectCost;
                appState.data.settings.showDirectCost = (_sdc === true || _sdc === 'true');
                const _oc = parseFloat(appState.data.settings.overheadCoefficient);
                appState.data.settings.overheadCoefficient = (isFinite(_oc) && _oc >= 1) ? _oc : 1;

            }
        }
        
        // Save data to StorageManager
        function saveData() {
            StorageManager.save(appState.data);
            // Sauvegarder aussi les taux de change
            localStorage.setItem('exchangeRates', JSON.stringify(appState.exchangeRates));
        }
        
        // Charger les taux de change
        function loadExchangeRates() {
            const saved = localStorage.getItem('exchangeRates');
            if (saved) {
                try {
                    appState.exchangeRates = JSON.parse(saved);
                } catch (e) {
                    console.error('Error loading exchange rates:', e);
                }
            }
        }

        // i18n Translation function
        function t(key) {
            return translations[appState.currentLang][key] || key;
        }

        // Update UI translations
        function updateTranslations() {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                el.textContent = t(key);
            });

            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                el.placeholder = t(key);
            });
        }

        // Format currency
        function formatCurrency(amount) {
            // Tous les montants sont stockés en EUR (devise de référence)
            // On convertit selon la devise sélectionnée
            const convertedAmount = convertCurrency(amount, appState.currentCurrency);
            const format = currencyFormats[appState.currentCurrency];
            const value = convertedAmount.toFixed(format.decimals).replace('.', format.separator);
            
            if (format.position === 'before') {
                return `${format.symbol}${value}`;
            } else {
                return `${value} ${format.symbol}`;
            }
        }
        
        // Format date FR (JJ/MM/AAAA)
        function formatDateFR(date) {
            const d = date instanceof Date ? date : new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
        }

        // Render Dashboard
                function renderDashboard() {
                    const stats = DashboardService.getDashboardStats(appState.data);
                    const now = new Date();
                    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

                    // ── Données de base ──
                    const ingredients  = appState.data.ingredients  || [];
                    const productions  = appState.data.productions  || [];
                    const recipes      = appState.data.recipes      || [];
                    const packs        = appState.data.packs        || [];
                    const lossHistory  = appState.data.lossHistory  || [];
                    const expenses     = appState.data.expenses     || [];

                    // ── Pertes du mois ──
                    const monthLosses     = lossHistory.filter(l => new Date(l.timestamp) >= startOfMonth);
                    const monthLossValue  = monthLosses.reduce((s, l) => s + (l.value || 0), 0);
                    const totalLossValue  = lossHistory.reduce((s, l) => s + (l.value || 0), 0);

                    // ── Stocks ──
                    const stockIngValue   = stats.stock.ingredients || 0;
                    const stockProdValue  = stats.stock.finishedGoods || 0;
                    const stockTotal      = stats.stock.total || 0;

                    // ── Lots DLC urgents (J ≤ 3) ──
                    const urgentLots = [];
                    ingredients.forEach(ing => {
                        if (!ing.lots) return;
                        ing.lots.forEach(lot => {
                            if (lot.epuise || !lot.dlc) return;
                            const daysLeft = Math.ceil((new Date(lot.dlc) - now) / 86400000);
                            if (daysLeft <= 3 && (lot.quantite || 0) > 0)
                                urgentLots.push({ name: ing.name, daysLeft, qty: lot.quantite, unit: ing.baseUnit });
                        });
                    });

                    // ── Productions actives (stock > 0) ──
                    const activeProds = productions.filter(p => (p.remainingQty || 0) > 0);
                    const totalProduced = productions.reduce((s, p) => s + (p.producedQty || 0), 0);

                    // ── Recettes : top 6 par marge % (si sellingPrice défini) ──
                    const recipeMargins = recipes.map(r => {
                        const sp = r.sellingPrice || 0;
                        if (sp === 0) return null;
                        try {
                            const cost = RecipeService.calculateCost(r, ingredients);
                            const cpu = cost.costPerUnit || 0;
                            const pct = sp > 0 ? ((sp - cpu) / sp * 100) : 0;
                            return { name: r.name, sellingPrice: sp, costPerUnit: cpu, marginPct: isNaN(pct) ? 0 : pct, category: r.category || '' };
                        } catch(e) { return null; }
                    }).filter(Boolean).sort((a,b) => b.marginPct - a.marginPct);
                    const topRecipes   = recipeMargins.slice(0, 6);
                    const maxMarginPct = Math.max(...topRecipes.map(r => r.marginPct), 1);

                    // ── Dépenses du mois ──
                    const monthExpenses = expenses.filter(e => new Date(e.date || e.createdAt) >= startOfMonth);
                    const monthExpAmt   = monthExpenses.reduce((s, e) => s + (e.amount || 0), 0);

                    // ── Répartition stock : donut SVG ──
                    const donutTotal = stockTotal || 1;
                    const ingShare   = stockIngValue  / donutTotal;
                    const prodShare  = stockProdValue / donutTotal;
                    const R = 40, CX = 54, CY = 54, SW = 14;
                    const circ = 2 * Math.PI * R;
                    const d1 = ingShare * circ * 0.97;
                    const d2 = prodShare * circ * 0.97;
                    const off2 = -(ingShare * circ);

                    // ── Graphique barres coût recettes : 7 premières recettes ──
                    const costRecipes = [...recipes].filter(r => {
                        try { return RecipeService.calculateCost(r, ingredients).totalCost > 0; } catch(e) { return false; }
                    }).slice(0, 7).map(r => {
                        try {
                            const cost = RecipeService.calculateCost(r, ingredients);
                            return { name: r.name.length > 16 ? r.name.slice(0,14)+'…' : r.name, cpu: cost.costPerUnit || 0 };
                        } catch(e) { return { name: r.name, cpu: 0 }; }
                    });
                    const maxCpu = Math.max(...costRecipes.map(r => r.cpu), 0.01);

                    // ── Alertes ──
                    const alertCount = stats.alerts ? stats.alerts.length : 0;
                    const dateStr    = now.toLocaleDateString('fr-FR', {weekday:'long', day:'numeric', month:'long'});

                    const html = `
                    <style>
                      .db-kpi{background:white;border-radius:var(--radius-lg);padding:18px 22px;box-shadow:var(--shadow-sm);position:relative;overflow:hidden;transition:transform .2s,box-shadow .2s}
                      .db-kpi:hover{transform:translateY(-3px);box-shadow:var(--shadow-md)}
                      .db-kpi-lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--gray);margin-bottom:5px}
                      .db-kpi-val{font-family:var(--font-display);font-size:30px;line-height:1;color:var(--dark);margin-bottom:3px}
                      .db-kpi-sub{font-size:12px;color:var(--gray)}
                      .db-kpi-stripe{height:3px;border-radius:2px;margin-top:10px}
                      .db-kpi-ghost{position:absolute;right:14px;top:50%;transform:translateY(-50%);font-size:38px;opacity:.06}
                      .db-htile{border-radius:var(--radius-lg);padding:18px 22px;color:white;position:relative;overflow:hidden;box-shadow:var(--shadow-md);transition:transform .2s}
                      .db-htile:hover{transform:translateY(-3px)}
                      .db-htile-lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;opacity:.8;margin-bottom:8px}
                      .db-htile-val{font-family:var(--font-display);font-size:32px;line-height:1.1;margin-bottom:2px}
                      .db-htile-sub{font-size:12px;opacity:.85}
                      .db-htile-ghost{position:absolute;right:14px;bottom:10px;font-size:48px;opacity:.12}
                      .db-card{background:white;border-radius:var(--radius-lg);padding:22px;box-shadow:var(--shadow-sm)}
                      .db-sec{font-family:var(--font-display);font-size:19px;letter-spacing:.5px;color:var(--dark);margin-bottom:12px}
                      .db-act{background:white;border-radius:var(--radius-md);padding:14px 12px;text-align:center;cursor:pointer;box-shadow:var(--shadow-sm);transition:all .2s;border:2px solid transparent}
                      .db-act:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:var(--shadow-md)}
                      .db-act-icon{font-size:26px;margin-bottom:5px}
                      .db-act-lbl{font-size:11px;font-weight:600;color:var(--dark)}
                      .db-bar-row{display:flex;align-items:center;gap:10px;margin-bottom:10px}
                      .db-bar-name{font-size:12px;font-weight:600;color:var(--dark);width:120px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex-shrink:0}
                      .db-bar-track{flex:1;background:var(--light);border-radius:4px;height:8px;overflow:hidden}
                      .db-bar-fill{height:8px;border-radius:4px;transition:width .6s cubic-bezier(.4,0,.2,1)}
                      .db-bar-val{font-size:11px;font-weight:700;width:52px;text-align:right;flex-shrink:0}
                      @keyframes dbFU{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
                      .db-ani{animation:dbFU .35s ease both}
                      .db-ani-2{animation:dbFU .35s .07s ease both}
                      .db-ani-3{animation:dbFU .35s .14s ease both}
                      .db-ani-4{animation:dbFU .35s .21s ease both}

                    </style>

                    <!-- ══ EN-TÊTE ══ -->
                    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:20px;" class="db-ani">
                      <div>
                        <h1 style="font-family:var(--font-display);font-size:38px;letter-spacing:1px;line-height:1;color:var(--dark);margin-bottom:3px;">Tableau de bord</h1>
                        <p style="color:var(--gray);font-size:13px;text-transform:capitalize;">${dateStr}</p>
                      </div>
                      <div style="display:flex;gap:8px;">
                        <button onclick="showPage('production')" style="background:var(--dark);color:white;border:none;border-radius:var(--radius-md);padding:9px 16px;font-family:var(--font-body);font-size:12px;font-weight:600;cursor:pointer;">⚙️ Nouvelle production</button>
                        <button onclick="showPage('ingredients')" style="background:var(--primary);color:white;border:none;border-radius:var(--radius-md);padding:9px 16px;font-family:var(--font-body);font-size:12px;font-weight:600;cursor:pointer;">📦 Stock ingrédients</button>
                      </div>
                    </div>

                    <!-- ══ HERO TILES ══ -->
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:16px;" class="db-ani-2">

                      <!-- Stock ingrédients -->
                      <div class="db-htile" style="background:linear-gradient(135deg,#26DE81,#4ECDC4);" onclick="showPage('ingredients')" title="Voir les ingrédients">
                        <div class="db-htile-lbl">📦 Stock ingrédients</div>
                        <div class="db-htile-val">${formatCurrency(stockIngValue)}</div>
                        <div class="db-htile-sub">${ingredients.length} réf. en stock</div>
                        <div class="db-htile-ghost">📦</div>
                      </div>

                      <!-- Stock produits finis -->
                      <div class="db-htile" style="background:linear-gradient(135deg,#4ECDC4,#45AAF2);" onclick="showPage('production')" title="Voir les productions">
                        <div class="db-htile-lbl">🍽️ Produits finis</div>
                        <div class="db-htile-val">${formatCurrency(stockProdValue)}</div>
                        <div class="db-htile-sub">${activeProds.length} lot${activeProds.length!==1?'s':''} disponible${activeProds.length!==1?'s':''}</div>
                        <div class="db-htile-ghost">🍽️</div>
                      </div>

                      <!-- Pertes du mois -->
                      <div class="db-htile" style="background:linear-gradient(135deg,#FC5C65,#FF6B35);" onclick="showPage('ingredients')">
                        <div class="db-htile-lbl">🗑 Pertes (mois)</div>
                        <div class="db-htile-val">${formatCurrency(monthLossValue)}</div>
                        <div class="db-htile-sub">${monthLosses.length} perte${monthLosses.length!==1?'s':''} enregistrée${monthLosses.length!==1?'s':''}</div>
                        <div class="db-htile-ghost">🗑</div>
                      </div>

                      <!-- Alertes DLC -->
                      <div class="db-htile" onclick="showPage('ingredients')" style="background:${urgentLots.length>0?'linear-gradient(135deg,#FFA502,#FFE66D)':'linear-gradient(135deg,#45AAF2,#4ECDC4)'};cursor:pointer;">
                        <div class="db-htile-lbl">⚠️ Lots DLC ≤ 3j</div>
                        <div class="db-htile-val">${urgentLots.length}</div>
                        <div class="db-htile-sub">${urgentLots.length>0 ? urgentLots.slice(0,2).map(l=>`${l.name.split(' ')[0]} J${l.daysLeft<=0?'expiré':'-'+l.daysLeft}`).join(' · ')+(urgentLots.length>2?'…':'') : 'Aucun lot critique'}</div>
                        <div class="db-htile-ghost">⚠️</div>
                      </div>
                    </div>

                    <!-- ══ LIGNE 2 : KPIs secondaires ══ -->
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:20px;" class="db-ani-3">
                      <div class="db-kpi">
                        <div class="db-kpi-ghost">📋</div>
                        <div class="db-kpi-lbl">Recettes</div>
                        <div class="db-kpi-val">${recipes.length}</div>
                        <div class="db-kpi-sub">${recipeMargins.length} avec prix de vente</div>
                        <div class="db-kpi-stripe" style="background:var(--primary);width:${Math.min(recipes.length*10,100)}%"></div>
                      </div>
                      <div class="db-kpi">
                        <div class="db-kpi-ghost">🎁</div>
                        <div class="db-kpi-lbl">Packs</div>
                        <div class="db-kpi-val">${packs.length}</div>
                        <div class="db-kpi-sub">${packs.filter(p=>p.active!==false).length} actif${packs.filter(p=>p.active!==false).length!==1?'s':''}</div>
                        <div class="db-kpi-stripe" style="background:var(--secondary);width:${Math.min(packs.length*20,100)}%"></div>
                      </div>
                      <div class="db-kpi">
                        <div class="db-kpi-ghost">⚙️</div>
                        <div class="db-kpi-lbl">Productions</div>
                        <div class="db-kpi-val">${productions.length}</div>
                        <div class="db-kpi-sub">${totalProduced} unités produites</div>
                        <div class="db-kpi-stripe" style="background:var(--info);width:${Math.min(productions.length*8,100)}%"></div>
                      </div>
                      <div class="db-kpi">
                        <div class="db-kpi-ghost">💸</div>
                        <div class="db-kpi-lbl">Dépenses (mois)</div>
                        <div class="db-kpi-val">${formatCurrency(monthExpAmt)}</div>
                        <div class="db-kpi-sub">${monthExpenses.length} dépense${monthExpenses.length!==1?'s':''}</div>
                        <div class="db-kpi-stripe" style="background:var(--danger);width:${Math.min(monthExpenses.length*15,100)}%"></div>
                      </div>
                      <div class="db-kpi" onclick="showPage('profitability')" style="cursor:pointer;">
                        <div class="db-kpi-ghost">📊</div>
                        <div class="db-kpi-lbl">Marge moy. recettes</div>
                        <div class="db-kpi-val" style="color:${recipeMargins.length>0 && (recipeMargins.reduce((s,r)=>s+r.marginPct,0)/recipeMargins.length)>=50?'var(--success)':'var(--warning)'}">
                          ${recipeMargins.length>0 ? (recipeMargins.reduce((s,r)=>s+r.marginPct,0)/recipeMargins.length).toFixed(1)+'%' : '—'}
                        </div>
                        <div class="db-kpi-sub">Sur ${recipeMargins.length} produit${recipeMargins.length!==1?'s':''} analysés</div>
                        <div class="db-kpi-stripe" style="background:var(--success);width:${recipeMargins.length>0?Math.min(recipeMargins.reduce((s,r)=>s+r.marginPct,0)/recipeMargins.length,100):0}%"></div>
                      </div>
                      <div class="db-kpi">
                        <div class="db-kpi-ghost">🗑</div>
                        <div class="db-kpi-lbl">Pertes totales</div>
                        <div class="db-kpi-val" style="color:${totalLossValue>0?'var(--danger)':'var(--success)'}">${formatCurrency(totalLossValue)}</div>
                        <div class="db-kpi-sub">${lossHistory.length} événement${lossHistory.length!==1?'s':''} total</div>
                        <div class="db-kpi-stripe" style="background:${totalLossValue>0?'var(--danger)':'var(--success)'};width:${totalLossValue>0?'60%':'10%'}"></div>
                      </div>
                    </div>

                    <!-- ══ GRAPHIQUES ══ -->
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;" class="db-ani-4">

                      <!-- Top recettes par marge % -->
                      <div class="db-card">
                        <div class="db-sec">🏆 Top recettes — marge %</div>
                        ${topRecipes.length === 0 ? `
                          <div style="text-align:center;padding:32px 0;color:var(--gray);font-size:13px;">
                            <div style="font-size:36px;margin-bottom:8px;">📋</div>
                            Ajoutez des prix de vente à vos recettes<br>pour voir leur rentabilité ici
                          </div>
                        ` : topRecipes.map(r => {
                            const w = Math.max((r.marginPct / maxMarginPct) * 100, 2);
                            const color = r.marginPct >= 50 ? 'var(--success)' : r.marginPct >= 25 ? 'var(--warning)' : 'var(--danger)';
                            const icon  = r.marginPct >= 50 ? '🟢' : r.marginPct >= 25 ? '🟡' : '🔴';
                            return `<div class="db-bar-row">
                              <div class="db-bar-name" title="${r.name}">${icon} ${r.name.length>16?r.name.slice(0,14)+'…':r.name}</div>
                              <div class="db-bar-track"><div class="db-bar-fill" style="width:${w}%;background:${color}"></div></div>
                              <div class="db-bar-val" style="color:${color}">${r.marginPct.toFixed(1)}%</div>
                            </div>`;
                          }).join('')}
                      </div>

                      <!-- Coût / unité par recette -->
                      <div class="db-card">
                        <div class="db-sec">💰 Coût unitaire par recette</div>
                        ${costRecipes.length === 0 ? `
                          <div style="text-align:center;padding:32px 0;color:var(--gray);font-size:13px;">
                            <div style="font-size:36px;margin-bottom:8px;">⚙️</div>
                            Créez des productions pour voir<br>le coût par unité de chaque recette
                          </div>
                        ` : costRecipes.map(r => {
                            const w = Math.max((r.cpu / maxCpu) * 100, 2);
                            return `<div class="db-bar-row">
                              <div class="db-bar-name" title="${r.name}">${r.name}</div>
                              <div class="db-bar-track"><div class="db-bar-fill" style="width:${w}%;background:linear-gradient(90deg,var(--primary),var(--accent))"></div></div>
                              <div class="db-bar-val" style="color:var(--dark)">${formatCurrency(r.cpu)}</div>
                            </div>`;
                          }).join('')}
                      </div>

                      <!-- Répartition stock donut SVG -->
                      <div class="db-card" style="display:flex;align-items:center;gap:24px;">
                        <div>
                          <div class="db-sec" style="margin-bottom:6px;">📊 Répartition stock</div>
                          <svg width="108" height="108" viewBox="0 0 108 108">
                            <!-- fond gris -->
                            <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="var(--light)" stroke-width="${SW}"/>
                            <!-- ingrédients -->
                            <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="#26DE81"
                              stroke-width="${SW}" stroke-dasharray="${d1} ${circ - d1}"
                              stroke-dashoffset="0" stroke-linecap="round"
                              transform="rotate(-90 ${CX} ${CY})"/>
                            <!-- produits finis -->
                            <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="#45AAF2"
                              stroke-width="${SW}" stroke-dasharray="${d2} ${circ - d2}"
                              stroke-dashoffset="${off2}" stroke-linecap="round"
                              transform="rotate(-90 ${CX} ${CY})"/>
                            <!-- centre -->
                            <text x="${CX}" y="${CY - 4}" text-anchor="middle" font-family="Bebas Neue,sans-serif" font-size="13" fill="var(--dark)">${(ingShare*100).toFixed(0)}%</text>
                            <text x="${CX}" y="${CY + 12}" text-anchor="middle" font-size="9" fill="var(--gray)">ingréd.</text>
                          </svg>
                        </div>
                        <div style="flex:1;">
                          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                            <div style="width:12px;height:12px;border-radius:50%;background:#26DE81;flex-shrink:0;"></div>
                            <div>
                              <div style="font-size:12px;font-weight:600;color:var(--dark);">Ingrédients</div>
                              <div style="font-size:13px;font-weight:700;color:#26DE81;">${formatCurrency(stockIngValue)}</div>
                            </div>
                          </div>
                          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                            <div style="width:12px;height:12px;border-radius:50%;background:#45AAF2;flex-shrink:0;"></div>
                            <div>
                              <div style="font-size:12px;font-weight:600;color:var(--dark);">Produits finis</div>
                              <div style="font-size:13px;font-weight:700;color:#45AAF2;">${formatCurrency(stockProdValue)}</div>
                            </div>
                          </div>
                          <div style="border-top:1px solid var(--light);padding-top:8px;margin-top:2px;">
                            <div style="font-size:11px;color:var(--gray);font-weight:700;text-transform:uppercase;letter-spacing:1px;">Total stock</div>
                            <div style="font-size:18px;font-weight:800;font-family:var(--font-display);color:var(--dark);">${formatCurrency(stockTotal)}</div>
                          </div>
                        </div>
                      </div>

                      <!-- Alertes DLC urgentes détail -->
                      <div class="db-card">
                        <div class="db-sec">⚠️ Alertes DLC urgentes</div>
                        ${urgentLots.length === 0 ? `
                          <div style="display:flex;align-items:center;gap:12px;padding:12px 0;">
                            <div style="font-size:32px;">✅</div>
                            <div>
                              <div style="font-weight:600;color:var(--dark);">Aucun lot critique</div>
                              <div style="font-size:12px;color:var(--gray);">Tous les stocks sont sains</div>
                            </div>
                          </div>
                        ` : urgentLots.slice(0, 6).map(l => {
                            const color = l.daysLeft <= 0 ? 'var(--danger)' : l.daysLeft <= 1 ? '#FC5C65' : 'var(--warning)';
                            const badge = l.daysLeft <= 0 ? 'EXPIRÉ' : `J-${l.daysLeft}`;
                            return `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--light);">
                              <div style="font-size:13px;font-weight:600;color:var(--dark);">${l.name}</div>
                              <div style="display:flex;align-items:center;gap:8px;">
                                <span style="font-size:11px;color:var(--gray);">${l.qty} ${l.unit}</span>
                                <span style="background:${color};color:white;font-size:10px;font-weight:700;padding:2px 7px;border-radius:8px;">${badge}</span>
                              </div>
                            </div>`;
                          }).join('') + (urgentLots.length > 6 ? `<div style="text-align:center;font-size:12px;color:var(--gray);padding-top:8px;">+${urgentLots.length-6} autre${urgentLots.length-6>1?'s':''}</div>` : '')}
                      </div>
                    </div>

                    <!-- ══ ACTIONS RAPIDES ══ -->
                    <div class="db-sec" style="margin-bottom:10px;">⚡ Actions rapides</div>
                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;">
                      <div class="db-act" onclick="showPage('ingredients')"><div class="db-act-icon">📦</div><div class="db-act-lbl">Ingrédients</div></div>
                      <div class="db-act" onclick="showPage('recipes')"><div class="db-act-icon">📋</div><div class="db-act-lbl">Recettes</div></div>
                      <div class="db-act" onclick="showPage('production')"><div class="db-act-icon">🏭</div><div class="db-act-lbl">Production</div></div>
                      <div class="db-act" onclick="showPage('profitability')"><div class="db-act-icon">📊</div><div class="db-act-lbl">Rentabilité</div></div>
                      <div class="db-act" onclick="showPage('packs')"><div class="db-act-icon">🎁</div><div class="db-act-lbl">Packs</div></div>
                      <div class="db-act" onclick="showPage('alerts')"><div class="db-act-icon">🔔</div><div class="db-act-lbl">Alertes</div></div>
                      <div class="db-act" onclick="showPage('expenses')"><div class="db-act-icon">💸</div><div class="db-act-lbl">Dépenses</div></div>
                      <div class="db-act" onclick="loadDemoWE()" style="border:2px dashed var(--primary);"><div class="db-act-icon">🧇</div><div class="db-act-lbl">Démo Salon</div></div>
                      <div class="db-act" onclick="loadDemoBar()" style="border:2px dashed var(--warning);"><div class="db-act-icon">🍹</div><div class="db-act-lbl">Démo Bar</div></div>
                      <div class="db-act" onclick="exportStockValuationPDF()" style="border:2px solid var(--accent);background:var(--accent-soft);"><div class="db-act-icon">📤</div><div class="db-act-lbl">Export Bilan</div></div>
                    </div>
                    `;

                    document.getElementById('mainContent').innerHTML = html;
                    updateTranslations();
                }

// ─────────────────────────────────────────────────────────────
        // Admin-only UI (v2) — Masquer des modules non coeur de métier
        // Source de vérité : ADMIN_ONLY_PAGES (bfm/core/constants.js)
        // Activation : UNIQUEMENT via URL ?admin=1
        // ─────────────────────────────────────────────────────────────
        window.isAdminMode = isAdminMode;
        window.applyAdminOnlyUI = applyAdminOnlyUI;

        // Appliquer le masquage au chargement + tout de suite
        document.addEventListener('DOMContentLoaded', () => {
            try { window.applyAdminOnlyUI(); } catch(e) {}
        });
        try { window.applyAdminOnlyUI(); } catch(e) {}

        // Language switcher
        document.querySelectorAll('[data-lang]').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                appState.currentLang = lang;
                
                // Update active button
                btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update translations
                updateTranslations();
                renderDashboard();
            });
        });

        // Currency switcher
        document.querySelectorAll('[data-currency]').forEach(btn => {
            btn.addEventListener('click', () => {
                const currency = btn.getAttribute('data-currency');
                appState.currentCurrency = currency;
                
                // Update active button
                btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Re-render to update currency
                renderDashboard();
            });
        });

        // Initialize app
        // Load W.E Salon de Thé demo data
        window.loadDemoWE = function() {
            if (confirm('⚠️ Charger la démo "Le Salon Moderne" ?\n\nCeci va remplacer toutes vos données par :\n- 21 ingrédients avec VRAIS PRIX EUR du marché\n- 7 recettes COHÉRENTES (gaufres 1kg, nectars, cocktails)\n- Rendements RÉALISTES appliqués\n- Coûts calculés avec pertes\n\nContinuer ?')) {
                try {
                    // Vider localStorage
                    console.log('🧹 Nettoyage localStorage...');
                    localStorage.clear();
                    
                    // Convertir les données
                    const convertedIngredients = demoWESalon.ingredients.map(ing => Ingredient.fromJSON(ing));
                    const convertedRecipes = demoWESalon.recipes.map(rec => Recipe.fromJSON(rec));
                    const convertedProductions = demoWESalon.productions.map(prod => Production.fromJSON(prod));
                    
                    // Mettre à jour appState
                    appState.data = {
                        ingredients: convertedIngredients,
                        recipes: convertedRecipes,
                        productions: convertedProductions,
                        sales: demoWESalon.sales || [],
                        expenses: demoWESalon.expenses || [],
                        categories: demoWESalon.categories || [],
                        suppliers: demoWESalon.suppliers || [],
                        clients: demoWESalon.clients || [],
                        lossHistory: demoWESalon.lossHistory || [],
                        movements: demoWESalon.movements || [],
                        vendors: demoWESalon.vendors || [],
                        staff: demoWESalon.staff || [],
                        packs: demoWESalon.packs || [],
                        settings: demoWESalon.settings || appState.data.settings || {}
                    };
                    
                    // Sauvegarder
                    saveData();
                    
                    // Recharger
                    showToast('✅ Démo "Le Salon Moderne" chargée avec succès !', 'success');
                    // ✅ Flag pour bloquer l'auto-init de la base
                    setTimeout(() => location.reload(), 1000);
                    
                } catch (error) {
                    console.error('Erreur chargement démo:', error);
                    showToast('❌ Erreur: ' + error.message, 'error');
                }
            }
        };

        window.loadDemoBar = function() {
            if (!confirm('🍹 Charger la démo "Le Velvet Bar Lounge" ?\n\nCeci remplacera toutes vos données par :\n- 29 ingrédients (spiritueux, vins, sirops, fruits, softs)\n- 8 recettes cocktails & softs\n- 6 productions (weekend)\n- 5 ventes avec marges ~87-92%\n- Fournisseurs & clients pro\n\nContinuer ?')) {
                return;
            }
            try {
                localStorage.clear();

                const convertedIngredients = demoBarLounge.ingredients.map(ing => Ingredient.fromJSON(ing));
                const convertedRecipes = demoBarLounge.recipes.map(rec => Recipe.fromJSON(rec));
                const convertedProductions = demoBarLounge.productions.map(prod => Production.fromJSON(prod));
                const convertedPacks = (demoBarLounge.packs || []).map(pack => Pack.fromJSON(pack));
                
                // Résoudre les noms de produits dans les packs
                convertedPacks.forEach(pack => pack.resolveProductNames(convertedRecipes, convertedProductions));

                appState.data = {
                    ingredients: convertedIngredients,
                    recipes: convertedRecipes,
                    productions: convertedProductions,
                    sales: demoBarLounge.sales || [],
                    expenses: demoBarLounge.expenses || [],
                    categories: demoBarLounge.categories || [],
                    suppliers: demoBarLounge.suppliers || [],
                    clients: demoBarLounge.clients || [],
                    lossHistory: demoBarLounge.lossHistory || [],
                    movements: demoBarLounge.movements || [],
                    vendors: demoBarLounge.vendors || [],
                    staff: demoBarLounge.staff || [],
                    packs: convertedPacks,
                    settings: demoBarLounge.settings || appState.data.settings || {}
                };

                saveData();
                showToast('🍹 Démo "Le Velvet Bar Lounge" chargée avec succès !', 'success');
                setTimeout(() => location.reload(), 1000);

            } catch (error) {
                console.error('Erreur chargement démo bar:', error);
                showToast('❌ Erreur: ' + error.message, 'error');
            }
        };

        function initApp() {
            loadData();
            
            // Charger les taux de change personnalisés
            loadExchangeRates();
            
            // Initialiser automatiquement la base de 100 ingrédients si nécessaire
            
            // Load saved currency preference
            const savedCurrency = localStorage.getItem('selectedCurrency');
            if (savedCurrency && currencyFormats[savedCurrency]) {
                appState.currentCurrency = savedCurrency;
            }
            
            // Setup currency switcher
            document.querySelectorAll('[data-currency]').forEach(btn => {
                // Update active state on load
                if (btn.getAttribute('data-currency') === appState.currentCurrency) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
                
                // Add click handler
                btn.addEventListener('click', () => {
                    const newCurrency = btn.getAttribute('data-currency');
                    
                    // Update state
                    appState.currentCurrency = newCurrency;
                    
                    // Save preference
                    localStorage.setItem('selectedCurrency', newCurrency);
                    
                    // Update active button
                    document.querySelectorAll('[data-currency]').forEach(b => {
                        b.classList.remove('active');
                    });
                    btn.classList.add('active');
                    
                    // Re-render current page to update all amounts
                    const currentPage = appState.currentPage;
                    if (currentPage === 'dashboard') {
                        renderDashboard();
                    } else if (currentPage === 'ingredients') {
                        renderIngredientsPage();
                    } else if (currentPage === 'recipes') {
                        renderRecipesPage();
                    } else if (currentPage === 'production') {
                        renderProductionsPage();
                    } else if (currentPage === 'sales') {
                        renderSalesPage();
                    } else if (currentPage === 'expenses') {
                        renderExpensesPage();
                    } else if (currentPage === 'suppliers') {
                        renderSuppliersPage();
                    } else if (currentPage === 'clients') {
                        renderClientsPage();
                    }
                    
                    // Show toast
                    const currencyName = {
                        'EUR': 'Euro (€)',
                        'GBP': 'Livre Sterling (£)',
                        'USD': 'Dollar ($)'
                    };
                    showToast(`💱 Devise changée : ${currencyName[newCurrency]}`, 'info');
                });
            });
            
            renderDashboard();
            updateAlertsBadge();
        }
        
        

// ---- Badge alertes (sidebar) ----
// Met à jour le badge rouge sur "Ingrédients" (stock faible + DLC proches)
function updateAlertsBadge() {
    try {
        const badgeEl = document.getElementById('ingredientsAlertBadge');
        if (!badgeEl) return;

        const ingredients = (appState && appState.data && appState.data.ingredients) ? appState.data.ingredients : [];
        const settings = {
            defaultStockThreshold: appState?.data?.settings?.defaultStockThreshold || 1000,
            dlcWarningDays: appState?.data?.settings?.dlcWarningDays || 7,
            dlcCriticalDays: appState?.data?.settings?.dlcCriticalDays || 3,
            enableNotifications: appState?.data?.settings?.enableNotifications !== false
        };

        if (typeof AlertService === 'undefined' || !AlertService.getActiveAlerts) {
            // Si le module alertes n'est pas chargé, on évite de crasher
            badgeEl.textContent = '';
            badgeEl.style.display = 'none';
            return;
        }

        const alertsData = AlertService.getActiveAlerts(ingredients, settings);
        const count = (alertsData && alertsData.all) ? alertsData.all.length : 0;

        if (count > 0) {
            badgeEl.textContent = String(count);
            badgeEl.style.display = 'inline-flex';
        } else {
            badgeEl.textContent = '';
            badgeEl.style.display = 'none';
        }
    } catch (e) {
        // Ne jamais casser l'app pour un badge
        console.warn('updateAlertsBadge failed:', e);
    }
}

// Exposer au global (utilisé par d'autres handlers)
window.updateAlertsBadge = updateAlertsBadge;

// ========================================
        // FONCTIONS UTILITAIRES v55.3
        // ========================================
        
        /**
         * Confirmation avant effacement de tous les ingrédients
         */
        window.confirmDeleteAllIngredients = function() {
            const count = (appState.data.ingredients || []).length;
            if (count === 0) {
                showToast('ℹ️ Aucun ingrédient à effacer', 'info');
                return;
            }
            
            const confirmed = confirm(
                `⚠️ ATTENTION !\n\n` +
                `Vous êtes sur le point de supprimer ${count} ingrédient${count > 1 ? 's' : ''}.\n\n` +
                `Cette action est IRRÉVERSIBLE.\n\n` +
                `Voulez-vous vraiment continuer ?`
            );
            
            if (confirmed) {
                appState.data.ingredients = [];
                StorageManager.save(appState.data);
                renderIngredientsPage();
                showToast(`✅ ${count} ingrédient${count > 1 ? 's' : ''} supprimé${count > 1 ? 's' : ''}`, 'success');
            }
        };
        
        /**
         * Télécharger le modèle CSV vierge pour les ingrédients
         */
        window.downloadIngredientCSVTemplate = function() {
            // Version simplifiée avec seulement les champs essentiels
            const csvContent = [
                // En-têtes (6 colonnes seulement)
                'Nom,Catégorie,Unité,Quantité,Prix (EUR),Fournisseur',
                // Exemples simples
                'Farine T45,Farines,kg,25,37.50,Metro',
                'Beurre doux,Matières grasses,kg,5,40.00,Metro',
                'Sucre blanc,Sucres,kg,10,12.00,Metro',
                'Œufs frais,Produits laitiers,pièce,180,0.25,Ferme locale',
                'Lait entier,Produits laitiers,L,20,1.50,Lactalis',
                '',
                '# Instructions:',
                '# - Nom: Nom de l\'ingrédient',
                '# - Catégorie: Farines, Sucres, Matières grasses, Produits laitiers, etc.',
                '# - Unité: kg, g, L, ml, pièce',
                '# - Quantité: Quantité du lot',
                '# - Prix (EUR): Prix total du lot en euros',
                '# - Fournisseur: Nom du fournisseur (optionnel)'
            ].join('\n');
            
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'BFM_Modele_Simple_Ingredients.csv';
            link.click();
            
            showToast('📄 Modèle CSV simplifié téléchargé', 'success');
        };
        
        /**
         * Télécharger le modèle CSV vierge pour les recettes
         */
        window.downloadRecipeCSVTemplate = function() {
            const csvContent = [
                'Nom recette,Catégorie,Rendement,Unité,Temps préparation (min),Instructions,Ingrédients (ID:Quantité:Unité séparés par |)',
                'Croissant au beurre,Viennoiserie,10,pièce,120,Détrempe puis tourage 3 fois,ing_farine_t45:500:g|ing_beurre:250:g|ing_sucre:50:g',
                'Pain au chocolat,Viennoiserie,8,pièce,130,Détrempe puis tourage avec chocolat,ing_farine_t45:500:g|ing_beurre:200:g|ing_chocolat:100:g'
            ].join('\n');
            
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'BFM_Modele_Recettes.csv';
            link.click();
            
            showToast('📄 Modèle CSV téléchargé', 'success');
        };
        
        /**
         * Assistant d'import guidé (wizard)
         */
        window.showImportWizard = function() {
            // State de l'assistant (GLOBAL pour être accessible partout)
            window.wizardState = {
                step: 1,
                ingredients: [],
                currentIngredient: {}
            };
            
            // Définir les fonctions internes D'ABORD
            window.renderWizardStep = function(state) {
                const body = document.getElementById('wizardBody');
                
                if (state.step === 1) {
                    // Étape 1 : Choix du mode
                    body.innerHTML = `
                        <div style="text-align: center; padding: var(--space-xl);">
                            <div style="font-size: 64px; margin-bottom: var(--space-lg);">🧙‍♂️</div>
                            <h2 style="margin-bottom: var(--space-md);">Bienvenue dans l'Assistant d'Import</h2>
                            <p style="color: var(--gray); font-size: 16px; margin-bottom: var(--space-xl); max-width: 500px; margin-left: auto; margin-right: auto;">
                                Choisissez votre mode d'import selon votre situation
                            </p>
                            
                            <!-- Choix du mode -->
                            <div style="display: grid; gap: var(--space-lg); max-width: 700px; margin: 0 auto var(--space-xl);">
                                <!-- Mode Rapide -->
                                <div onclick="selectWizardMode('quick')" style="cursor: pointer; padding: var(--space-lg); border: 3px solid var(--light); border-radius: var(--radius-lg); text-align: left; transition: all 0.3s; background: white;">
                                    <div style="display: flex; align-items: start; gap: var(--space-md);">
                                        <div style="font-size: 48px;">⚡</div>
                                        <div style="flex: 1;">
                                            <h3 style="margin: 0 0 var(--space-sm) 0; color: var(--primary);">Mode Rapide</h3>
                                            <p style="margin: 0 0 var(--space-sm) 0; color: var(--gray); font-size: 14px;">
                                                Pour tester ou importer rapidement
                                            </p>
                                            <div style="display: flex; gap: var(--space-md); font-size: 13px; color: var(--gray);">
                                                <span>📝 5 champs</span>
                                                <span>⏱️ 30 sec/produit</span>
                                            </div>
                                            <div style="margin-top: var(--space-sm); padding: var(--space-sm); background: #fff9e6; border-radius: var(--radius-sm); font-size: 13px;">
                                                ⚠️ Frais et DLC = valeurs par défaut
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Mode Facture (RECOMMANDÉ) -->
                                <div onclick="selectWizardMode('invoice')" style="cursor: pointer; padding: var(--space-lg); border: 3px solid var(--success); border-radius: var(--radius-lg); text-align: left; transition: all 0.3s; background: linear-gradient(135deg, #f0fff4 0%, #ffffff 100%); position: relative;">
                                    <div style="position: absolute; top: -12px; right: 16px; background: var(--success); color: white; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600;">
                                        RECOMMANDÉ
                                    </div>
                                    <div style="display: flex; align-items: start; gap: var(--space-md);">
                                        <div style="font-size: 48px;">📄</div>
                                        <div style="flex: 1;">
                                            <h3 style="margin: 0 0 var(--space-sm) 0; color: var(--success);">Mode Facture</h3>
                                            <p style="margin: 0 0 var(--space-sm) 0; color: var(--gray); font-size: 14px;">
                                                Avec votre facture fournisseur sous les yeux
                                            </p>
                                            <div style="display: flex; gap: var(--space-md); font-size: 13px; color: var(--gray);">
                                                <span>📝 8 champs</span>
                                                <span>⏱️ 1 min/produit</span>
                                            </div>
                                            <div style="margin-top: var(--space-sm); padding: var(--space-sm); background: #e6f7ed; border-radius: var(--radius-sm); font-size: 13px;">
                                                ✅ Données complètes (frais, DLC réels)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <button class="btn" style="background: var(--gray); color: white;" onclick="closeModal('importWizard')">
                                Annuler
                            </button>
                        </div>
                    `;
                } else if (state.step === 2) {
                    // Étape 2 : Ajout d'ingrédients (adapté selon le mode)
                    const isInvoiceMode = state.mode === 'invoice';
                    const modeLabel = isInvoiceMode ? '📄 Mode Facture' : '⚡ Mode Rapide';
                    const modeHint = isInvoiceMode ? 'Gardez votre facture sous les yeux' : 'Import rapide avec valeurs par défaut';
                    
                    body.innerHTML = `
                        <div style="padding: var(--space-md);">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-md);">
                                <div>
                                    <h3>📦 Ajout d'ingrédients</h3>
                                    <p style="font-size: 13px; color: var(--gray); margin: 4px 0 0 0;">${modeLabel} • ${modeHint}</p>
                                </div>
                                <span style="color: var(--gray);">${state.ingredients.length} ingrédient${state.ingredients.length > 1 ? 's' : ''} ajouté${state.ingredients.length > 1 ? 's' : ''}</span>
                            </div>
                            
                            <!-- Formulaire adaptatif -->
                            <form id="wizardIngredientForm" style="background: var(--light); padding: var(--space-lg); border-radius: var(--radius-lg); margin-bottom: var(--space-lg);">
                                <!-- Ligne 1 : Nom + Catégorie -->
                                <div class="form-row">
                                    <div class="form-group" style="flex: 2;">
                                        <label>Nom de l'ingrédient *</label>
                                        <input type="text" name="name" required placeholder="Ex: Farine T45">
                                    </div>
                                    <div class="form-group">
                                        <label>Catégorie *</label>
                                        <select name="category" required>
                                            <option value="">Choisir...</option>
                                            <option value="Farines">Farines</option>
                                            <option value="Sucres">Sucres</option>
                                            <option value="Matières grasses">Matières grasses</option>
                                            <option value="Produits laitiers">Produits laitiers</option>
                                            <option value="Œufs">Œufs</option>
                                            <option value="Levures">Levures</option>
                                            <option value="Chocolats">Chocolats</option>
                                            <option value="Fruits">Fruits</option>
                                            <option value="Épices">Épices</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <!-- Ligne 2 : Quantité + Unité + Prix -->
                                <div class="form-row">
                                    <div class="form-group">
                                        <label>Quantité *</label>
                                        <input type="number" name="quantity" required min="0.01" step="0.01" placeholder="25">
                                    </div>
                                    <div class="form-group">
                                        <label>Unité *</label>
                                        <select name="unit" required>
                                            <option value="">Choisir...</option>
                                            <option value="kg">kg</option>
                                            <option value="g">g</option>
                                            <option value="L">L</option>
                                            <option value="ml">ml</option>
                                            <option value="piece">pièce</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Prix HT (€) *</label>
                                        <input type="number" name="price" required min="0" step="0.01" placeholder="37.50">
                                    </div>
                                </div>
                                
                                ${isInvoiceMode ? `
                                    <!-- Mode Facture : Champs supplémentaires -->
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label>Frais approche (€) *</label>
                                            <input type="number" name="approachCost" required min="0" step="0.01" placeholder="2.50" value="0">
                                            <small style="color: var(--gray); font-size: 12px;">Transport, livraison (sur facture)</small>
                                        </div>
                                        <div class="form-group" style="flex: 2;">
                                            <label>DLC *</label>
                                            <input type="date" name="dlc" required>
                                            <small style="color: var(--gray); font-size: 12px;">Date sur l'étiquette produit</small>
                                        </div>
                                    </div>
                                    
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label>Date réception</label>
                                            <input type="date" name="receptionDate" value="${new Date().toISOString().split('T')[0]}">
                                        </div>
                                        <div class="form-group" style="flex: 2;">
                                            <label>Fournisseur</label>
                                            <input type="text" name="supplier" placeholder="Metro, Carrefour...">
                                        </div>
                                    </div>
                                ` : `
                                    <!-- Mode Rapide : Seul Fournisseur -->
                                    <div class="form-group">
                                        <label>Fournisseur (optionnel)</label>
                                        <input type="text" name="supplier" placeholder="Metro, Carrefour, Leclerc...">
                                    </div>
                                `}
                                
                                <div style="display: flex; gap: var(--space-md); margin-top: var(--space-md);">
                                    <button type="submit" class="btn btn-primary" style="flex: 1;">
                                        ➕ Ajouter cet ingrédient
                                    </button>
                                </div>
                            </form>
                            
                            <!-- Liste des ingrédients ajoutés -->
                            ${state.ingredients.length > 0 ? `
                                <div style="background: white; border-radius: var(--radius-lg); padding: var(--space-md); margin-bottom: var(--space-lg);">
                                    <h4 style="margin-bottom: var(--space-md);">📋 Ingrédients ajoutés</h4>
                                    <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
                                        ${state.ingredients.map((ing, idx) => `
                                            <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-sm); background: var(--light); border-radius: var(--radius-md);">
                                                <div>
                                                    <strong>${ing.name}</strong>
                                                    <span style="color: var(--gray); font-size: 14px; margin-left: var(--space-sm);">
                                                        ${ing.category} • ${ing.quantity} ${ing.unit} • ${ing.price}€
                                                    </span>
                                                </div>
                                                <button class="btn" style="background: var(--danger); color: white; padding: 6px 12px;" onclick="removeWizardIngredient(${idx})">
                                                    ✕
                                                </button>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : `
                                <div style="text-align: center; padding: var(--space-xl); color: var(--gray);">
                                    <div style="font-size: 48px; margin-bottom: var(--space-md);">📦</div>
                                    <p>Aucun ingrédient ajouté pour le moment</p>
                                </div>
                            `}
                            
                            <!-- Boutons de navigation -->
                            <div style="display: flex; gap: var(--space-md); margin-top: var(--space-lg);">
                                <button class="btn" style="flex: 1; background: var(--gray); color: white;" onclick="previousWizardStep()">
                                    ← Retour
                                </button>
                                <button class="btn btn-primary" style="flex: 1;" onclick="finishWizard()" ${state.ingredients.length === 0 ? 'disabled' : ''}>
                                    ✅ Terminer (${state.ingredients.length})
                                </button>
                            </div>
                        </div>
                    `;
                    
                    // Event listener pour le formulaire
                    document.getElementById('wizardIngredientForm').addEventListener('submit', (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const ingredient = {
                            name: formData.get('name'),
                            category: formData.get('category'),
                            quantity: parseFloat(formData.get('quantity')),
                            unit: formData.get('unit'),
                            price: parseFloat(formData.get('price')),
                            supplier: formData.get('supplier') || ''
                        };
                        
                        // Champs supplémentaires du mode facture
                        if (state.mode === 'invoice') {
                            ingredient.approachCost = parseFloat(formData.get('approachCost')) || 0;
                            ingredient.dlc = formData.get('dlc');
                            ingredient.receptionDate = formData.get('receptionDate') || new Date().toISOString().split('T')[0];
                        }
                        
                        state.ingredients.push(ingredient);
                        e.target.reset();
                        
                        // Réinitialiser la date de réception à aujourd'hui
                        if (state.mode === 'invoice') {
                            const receptionInput = e.target.querySelector('[name="receptionDate"]');
                            if (receptionInput) {
                                receptionInput.value = new Date().toISOString().split('T')[0];
                            }
                        }
                        
                        renderWizardStep(state);
                        showToast(`✅ ${ingredient.name} ajouté !`, 'success');
                    });
                }
            };
            
            window.selectWizardMode = function(mode) {
                window.wizardState.mode = mode;
                window.wizardState.step = 2;
                renderWizardStep(window.wizardState);
            };
            
            window.nextWizardStep = function() {
                window.wizardState.step++;
                renderWizardStep(window.wizardState);
            };
            
            window.previousWizardStep = function() {
                window.wizardState.step--;
                renderWizardStep(window.wizardState);
            };
            
            window.removeWizardIngredient = function(index) {
                window.wizardState.ingredients.splice(index, 1);
                renderWizardStep(window.wizardState);
                showToast('🗑️ Ingrédient retiré', 'info');
            };
            
            window.finishWizard = function() {
                if (window.wizardState.ingredients.length === 0) {
                    showToast('❌ Ajoutez au moins un ingrédient', 'error');
                    return;
                }
                
                // Convertir en format BFM avec les BONS noms de propriétés
                const ingredients = window.wizardState.ingredients.map(ing => {
                    // Convertir unité en baseUnit
                    let baseUnit, quantityInBaseUnit;
                    if (ing.unit === 'kg') {
                        baseUnit = 'g';
                        quantityInBaseUnit = ing.quantity * 1000;
                    } else if (ing.unit === 'L') {
                        baseUnit = 'ml';
                        quantityInBaseUnit = ing.quantity * 1000;
                    } else {
                        baseUnit = ing.unit;
                        quantityInBaseUnit = ing.quantity;
                    }
                    
                    // Créer le lot avec les BONS noms (selon Lot.js)
                    // Utiliser vraies valeurs si mode facture, sinon valeurs par défaut
                    const dlcDate = ing.dlc ? new Date(ing.dlc) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
                    const receptionDate = ing.receptionDate ? new Date(ing.receptionDate) : new Date();
                    const approachCost = ing.approachCost !== undefined ? ing.approachCost : 0;
                    
                    const lot = new Lot({
                        id: 'lot_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                        quantiteInitiale: quantityInBaseUnit,  // ✅ Nom correct
                        quantite: quantityInBaseUnit,           // ✅ Nom correct
                        prixTotal: ing.price,                   // ✅ Nom correct
                        fraisApproche: approachCost,            // ✅ Vraie valeur ou 0
                        dlc: dlcDate,                           // ✅ Vraie DLC ou +1 an
                        dateReception: receptionDate,           // ✅ Vraie date ou aujourd'hui
                        fournisseur: ing.supplier || '',        // ✅ Nom correct
                        numeroLot: `WIZARD-${Date.now()}`,      // ✅ Nom correct
                        receivedBy: ''                          // ✅ Optionnel
                    });
                    
                    // Créer l'ingrédient avec les BONS noms (selon Ingredient.js)
                    return new Ingredient({
                        id: 'ing_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                        name: ing.name,
                        category: ing.category,
                        baseUnit: baseUnit,                     // ✅ g, ml, ou piece
                        displayUnit: ing.unit,                  // ✅ kg, L, ou piece
                        yieldPercent: 100,                      // ✅ Pas de perte par défaut
                        wasteType: '',                          // ✅ Pas de déchet
                        alertBaseQty: baseUnit === 'g' ? 1000 : (baseUnit === 'ml' ? 1000 : 5),
                        lots: [lot]
                    });
                });
                
                // Ajouter à la base
                appState.data.ingredients = appState.data.ingredients || [];
                appState.data.ingredients.push(...ingredients);
                StorageManager.save(appState.data);
                
                closeModal('importWizard');
                renderIngredientsPage();
                showToast(`✅ ${ingredients.length} ingrédient${ingredients.length > 1 ? 's' : ''} importé${ingredients.length > 1 ? 's' : ''} !`, 'success');
            };
            
            // Créer le modal APRÈS avoir défini toutes les fonctions
            const modal = document.createElement('div');
            modal.id = 'importWizard';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 800px; max-height: 90vh; overflow-y: auto;">
                    <div class="modal-header">
                        <h2>🧙 Assistant d'Import</h2>
                        <button class="modal-close" onclick="closeModal('importWizard')">✕</button>
                    </div>
                    <div class="modal-body" id="wizardBody">
                        <!-- Contenu dynamique -->
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Maintenant on peut appeler renderWizardStep
            renderWizardStep(window.wizardState);
        };
        
        /**
         * Confirmation avant effacement de toutes les recettes
         */
        window.confirmDeleteAllRecipes = function() {
            const count = (appState.data.recipes || []).length;
            if (count === 0) {
                showToast('ℹ️ Aucune recette à effacer', 'info');
                return;
            }
            
            const confirmed = confirm(
                `⚠️ ATTENTION !\n\n` +
                `Vous êtes sur le point de supprimer ${count} recette${count > 1 ? 's' : ''}.\n\n` +
                `Cette action est IRRÉVERSIBLE.\n\n` +
                `Voulez-vous vraiment continuer ?`
            );
            
            if (confirmed) {
                appState.data.recipes = [];
                StorageManager.save(appState.data);
                renderRecipesPage();
                showToast(`✅ ${count} recette${count > 1 ? 's' : ''} supprimée${count > 1 ? 's' : ''}`, 'success');
            }
        };

        // ========================================
        // FICHE INGRÉDIENT (Edit)
        // ========================================
        window.showEditIngredientModal = function(ingredientId) {
            const ing = appState.data.ingredients.find(i => i.id === ingredientId);
            if (!ing) return;
            const modal = document.createElement('div');
            modal.id = 'editIngModal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>✎ Fiche : ${ing.name}</h2>
                        <button class="modal-close" onclick="closeModal('editIngModal')">✕</button>
                    </div>
                    <div class="modal-body">
                        <form id="editIngForm">
                            <input type="hidden" name="id" value="${ing.id}">
                            <div class="form-group"><label>Nom *</label>
                                <input type="text" name="name" value="${ing.name}" required></div>
                            <div class="form-row">
                                <div class="form-group"><label>Catégorie</label>
                                    <input type="text" name="category" value="${ing.category || ''}"></div>
                                <div class="form-group"><label>Seuil alerte</label>
                                    <input type="number" name="alertBaseQty" value="${ing.alertBaseQty || 0}" min="0" step="0.01" inputmode="decimal"></div>
                            </div>
                            <div class="form-row">
                                <div class="form-group"><label>Rendement (%)</label>
                                    <input type="number" name="yieldPercent" value="${ing.yieldPercent || 100}" min="1" max="100" inputmode="decimal"></div>
                                <div class="form-group"><label>Type déchet</label>
                                    <input type="text" name="wasteType" value="${ing.wasteType || ''}"></div>
                            </div>
                            <div style="display:flex;gap:var(--space-md);margin-top:var(--space-lg);">
                                <button type="button" class="btn" style="flex:1" onclick="closeModal('editIngModal')">Annuler</button>
                                <button type="submit" class="btn btn-primary" style="flex:1">💾 Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>`;
            document.body.appendChild(modal);
            modal.querySelector('#editIngForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const fd = new FormData(e.target);
                const idx = appState.data.ingredients.findIndex(i => i.id === fd.get('id'));
                if (idx !== -1) {
                    appState.data.ingredients[idx].name = fd.get('name');
                    appState.data.ingredients[idx].category = fd.get('category');
                    appState.data.ingredients[idx].alertBaseQty = Number(fd.get('alertBaseQty')) || 0;
                    appState.data.ingredients[idx].yieldPercent = Number(fd.get('yieldPercent')) || 100;
                    appState.data.ingredients[idx].wasteType = fd.get('wasteType');
                    appState.data.ingredients[idx].updatedAt = new Date().toISOString();
                    saveData();
                    closeModal('editIngModal');
                    renderIngredientsPage();
                    showToast('✅ Fiche mise à jour', 'success');
                }
            });
        };

        // ========================================
        // MODULE DÉPENSES
        // ========================================

        /** Convertit n'importe quel type de date en string ISO (ex: "2026-01-09") */
        function dateStr(v) {
            if (!v) return "";
            if (typeof v === "string") return v;
            if (v instanceof Date) return v.toISOString();
            if (typeof v === "number") return new Date(v).toISOString();
            return String(v);
        }

        // ========================================
        // MODULE ALERTES
        // ========================================
        
        function renderAlertsPage() {
            const ingredients = appState.data.ingredients || [];
            const settings = {
                defaultStockThreshold: appState.data.settings?.defaultStockThreshold || 1000,
                dlcWarningDays: appState.data.settings?.dlcWarningDays || 7,
                dlcCriticalDays: appState.data.settings?.dlcCriticalDays || 3,
                enableNotifications: appState.data.settings?.enableNotifications !== false
            };
            
            // Récupérer alertes actives
            const alertsData = AlertService.getActiveAlerts(ingredients, settings);
            const stats = AlertService.getStatistics(alertsData.all);
            
            // Filtrage
            const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
            const filterType = urlParams.get('filter') || 'all';
            
            let filteredAlerts = alertsData.all;
            if (filterType === 'stock') {
                filteredAlerts = alertsData.stock;
            } else if (filterType === 'dlc') {
                filteredAlerts = alertsData.dlc;
            }
            
            const html = `
                <div class="page-container">
                    <h1 class="page-title">🔔 Alertes & Notifications</h1>
                    <p style="color:var(--muted);margin-bottom:var(--space-lg);">Surveillez votre stock et les dates de péremption en temps réel</p>
                    
                    <!-- Statistiques -->
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:var(--space-md);margin-bottom:var(--space-lg);">
                        <div style="background:linear-gradient(135deg,#fee2e2,#fecaca);padding:var(--space-md);border-radius:var(--radius-lg);border-left:4px solid var(--danger);">
                            <div style="font-size:12px;text-transform:uppercase;color:var(--danger);margin-bottom:4px;font-weight:600;">Critiques</div>
                            <div style="font-size:28px;font-weight:700;color:var(--danger);">${stats.bySeverity.critical}</div>
                        </div>
                        <div style="background:linear-gradient(135deg,#fef3c7,#fde68a);padding:var(--space-md);border-radius:var(--radius-lg);border-left:4px solid var(--warning);">
                            <div style="font-size:12px;text-transform:uppercase;color:var(--warning);margin-bottom:4px;font-weight:600;">Avertissements</div>
                            <div style="font-size:28px;font-weight:700;color:var(--warning);">${stats.bySeverity.warning}</div>
                        </div>
                        <div style="background:linear-gradient(135deg,#e0f2fe,#bae6fd);padding:var(--space-md);border-radius:var(--radius-lg);border-left:4px solid var(--primary);">
                            <div style="font-size:12px;text-transform:uppercase;color:var(--primary);margin-bottom:4px;font-weight:600;">Stock faible</div>
                            <div style="font-size:28px;font-weight:700;color:var(--primary);">${stats.byType.stock}</div>
                        </div>
                        <div style="background:linear-gradient(135deg,#f3e8ff,#e9d5ff);padding:var(--space-md);border-radius:var(--radius-lg);border-left:4px solid #9333ea;">
                            <div style="font-size:12px;text-transform:uppercase;color:#9333ea;margin-bottom:4px;font-weight:600;">DLC proches</div>
                            <div style="font-size:28px;font-weight:700;color:#9333ea;">${stats.byType.dlc}</div>
                        </div>
                    </div>
                    
                    <!-- Filtres & Actions -->
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-lg);flex-wrap:wrap;gap:var(--space-sm);">
                        <div style="display:flex;gap:var(--space-sm);">
                            <button class="btn ${filterType === 'all' ? 'btn-primary' : ''}" onclick="showPage('alerts')">
                                Toutes (${alertsData.all.length})
                            </button>
                            <button class="btn ${filterType === 'stock' ? 'btn-primary' : ''}" onclick="showPage('alerts?filter=stock')">
                                📦 Stock (${alertsData.stock.length})
                            </button>
                            <button class="btn ${filterType === 'dlc' ? 'btn-primary' : ''}" onclick="showPage('alerts?filter=dlc')">
                                📅 DLC (${alertsData.dlc.length})
                            </button>
                        </div>
                        <div style="display:flex;gap:var(--space-sm);">
                            ${settings.enableNotifications ? `
                                <button class="btn" onclick="requestNotificationPermission()">
                                    🔔 Activer notifications
                                </button>
                            ` : ''}
                            <button class="btn" onclick="showPage('settings')">
                                ⚙️ Paramètres
                            </button>
                        </div>
                    </div>
                    
                    <!-- Liste des alertes -->
                    ${filteredAlerts.length === 0 ? `
                        <div style="text-align:center;padding:var(--space-xl);background:var(--light);border-radius:var(--radius-lg);">
                            <div style="font-size:48px;margin-bottom:var(--space-md);">✅</div>
                            <h3>Aucune alerte active</h3>
                            <p style="color:var(--muted);">Tous vos stocks et DLC sont sous contrôle</p>
                        </div>
                    ` : `
                        <div style="display:flex;flex-direction:column;gap:var(--space-md);">
                            ${filteredAlerts.map(alert => renderAlertCard(alert)).join('')}
                        </div>
                    `}
                </div>
            `;
            
            document.getElementById('mainContent').innerHTML = html;
            updateTranslations();
        }
        
        function renderAlertCard(alert) {
            const severityColors = {
                critical: { bg: '#fee2e2', border: '#dc2626', text: '#991b1b' },
                warning: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
                info: { bg: '#e0f2fe', border: '#0284c7', text: '#075985' }
            };
            
            const colors = severityColors[alert.severity] || severityColors.info;
            const icon = alert.severity === 'critical' ? '🔴' : alert.severity === 'warning' ? '🟡' : 'ℹ️';
            
            return `
                <div style="background:${colors.bg};border-left:4px solid ${colors.border};padding:var(--space-md);border-radius:var(--radius-md);">
                    <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:var(--space-sm);">
                        <div style="flex:1;">
                            <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:4px;">
                                <span style="font-size:20px;">${icon}</span>
                                <strong style="color:${colors.text};font-size:16px;">${alert.message}</strong>
                            </div>
                            <p style="margin:4px 0;color:${colors.text};font-size:14px;">${alert.details}</p>
                            ${alert.lotNumber ? `<p style="margin:4px 0;color:${colors.text};font-size:12px;opacity:0.8;">Lot : ${alert.lotNumber}</p>` : ''}
                        </div>
                        <div style="display:flex;gap:var(--space-xs);">
                            ${alert.type.includes('stock') ? `
                                <button class="btn btn-sm" onclick="showAddLotModal('${alert.ingredientId}')" title="Ajouter un lot">
                                    ➕
                                </button>
                            ` : ''}
                            ${alert.type.includes('dlc') && alert.lotId ? `
                                <button class="btn btn-sm" style="background:var(--danger);color:white;" onclick="handleExpiredLot('${alert.ingredientId}', '${alert.lotId}')" title="Marquer périmé">
                                    🗑️
                                </button>
                            ` : ''}
                        </div>
                    </div>
                    <div style="font-size:11px;color:${colors.text};opacity:0.7;">
                        ${new Date(alert.createdAt).toLocaleString('fr-FR')}
                    </div>
                </div>
            `;
        }
        
        window.requestNotificationPermission = async function() {
            if (!('Notification' in window)) {
                showToast('❌ Notifications non supportées par ce navigateur', 'error');
                return;
            }
            
            if (Notification.permission === 'granted') {
                showToast('✅ Notifications déjà activées', 'success');
                return;
            }
            
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                showToast('✅ Notifications activées', 'success');
                // Envoyer notification de test
                new Notification('BusinessFood Manager', {
                    body: 'Les notifications sont maintenant activées !',
                    icon: '/icon.png'
                });
            } else {
                showToast('❌ Permission refusée', 'error');
            }
        };
        
        window.handleExpiredLot = function(ingredientId, lotId) {
            if (!confirm('Marquer ce lot comme périmé et le déduire du stock ?')) return;
            
            const ingredient = appState.data.ingredients.find(i => i.id === ingredientId);
            if (!ingredient) return;
            
            const lot = ingredient.lots.find(l => l.id === lotId);
            if (!lot) return;
            
            // Marquer comme épuisé
            lot.epuise = true;
            lot.quantite = 0;
            
            saveData();
            showToast('✅ Lot marqué comme périmé', 'success');
            renderAlertsPage();
        };


        function renderExpensesPage() {
            const expenses = (appState.data.expenses || []).sort((a,b) => new Date(b.date) - new Date(a.date));
            const now = new Date();
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            const monthExpenses = expenses.filter(e => new Date(e.date) >= monthStart);
            const monthTotal = monthExpenses.reduce((s, e) => s + (e.amount || 0), 0);
            
            const CATEGORIES = ['Loyer','Énergie','Salaires','Équipement','Emballages','Livraison','Marketing','Assurance','Maintenance','Autre'];
            
            const filterMonth = document.getElementById('expFilterMonth') ? 
                document.getElementById('expFilterMonth').value : (now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0'));
            
            const displayExpenses = expenses.filter(e => {
                if (!filterMonth) return true;
                return dateStr(e.date).startsWith(filterMonth);
            });
            const displayTotal = displayExpenses.reduce((s,e) => s + (e.amount||0), 0);
            
            document.getElementById('mainContent').innerHTML = `
                <div class="page-header">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <h1 class="page-title">💸 Dépenses</h1>
                            <p class="page-subtitle">${expenses.length} dépense${expenses.length!==1?'s':''} • Mois en cours : ${formatCurrency(monthTotal)}</p>
                        </div>
                        <button class="btn btn-primary" onclick="showNewExpenseModal()">➕ Nouvelle dépense</button>
                    </div>
                </div>
                
                <!-- Filtres + total mois -->
                <div style="background:white;padding:var(--space-md);border-radius:var(--radius-lg);margin-bottom:var(--space-md);box-shadow:var(--shadow-sm);display:flex;gap:var(--space-md);align-items:center;flex-wrap:wrap;">
                    <div>
                        <label style="font-size:12px;font-weight:600;color:var(--gray);display:block;margin-bottom:4px;">Mois</label>
                        <input type="month" id="expFilterMonth" value="${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}" 
                            onchange="renderExpensesPage()" 
                            style="padding:10px 14px;border:2px solid var(--light);border-radius:var(--radius-md);font-family:var(--font-body);">
                    </div>
                    <div style="margin-left:auto;background:linear-gradient(135deg,#ff6b35,#ffe66d);padding:12px 24px;border-radius:var(--radius-lg);color:white;font-weight:700;">
                        Total affiché : ${formatCurrency(displayTotal)}
                    </div>
                </div>
                
                <!-- Liste dépenses -->
                ${displayExpenses.length === 0 ? `
                    <div style="text-align:center;padding:var(--space-xl);background:white;border-radius:var(--radius-lg);">
                        <div style="font-size:56px;margin-bottom:var(--space-md);">💸</div>
                        <h3>Aucune dépense pour cette période</h3>
                        <p style="color:var(--gray);margin-bottom:var(--space-md);">Ajoutez vos charges fixes et variables</p>
                        <button class="btn btn-primary" onclick="showNewExpenseModal()">➕ Ajouter une dépense</button>
                    </div>
                ` : `
                    <div style="background:white;border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);overflow:hidden;">
                        <table style="width:100%;border-collapse:collapse;">
                            <thead>
                                <tr style="background:var(--light);">
                                    <th style="padding:14px 16px;text-align:left;font-size:12px;text-transform:uppercase;color:var(--gray);">Date</th>
                                    <th style="padding:14px 16px;text-align:left;font-size:12px;text-transform:uppercase;color:var(--gray);">Libellé</th>
                                    <th style="padding:14px 16px;text-align:left;font-size:12px;text-transform:uppercase;color:var(--gray);">Catégorie</th>
                                    <th style="padding:14px 16px;text-align:right;font-size:12px;text-transform:uppercase;color:var(--gray);">Montant</th>
                                    <th style="padding:14px 16px;text-align:center;font-size:12px;text-transform:uppercase;color:var(--gray);">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${displayExpenses.map(e => `
                                    <tr style="border-top:1px solid var(--light);transition:background 0.2s;" onmouseover="this.style.background='#f9f9f9'" onmouseout="this.style.background=''">
                                        <td style="padding:12px 16px;font-size:14px;">${new Date(e.date).toLocaleDateString('fr-FR')}</td>
                                        <td style="padding:12px 16px;font-weight:600;">${e.label || e.description || '—'}</td>
                                        <td style="padding:12px 16px;">
                                            <span style="background:var(--light);padding:4px 10px;border-radius:12px;font-size:12px;font-weight:600;">${e.category || 'Autre'}</span>
                                        </td>
                                        <td style="padding:12px 16px;text-align:right;font-weight:700;color:var(--danger);">${formatCurrency(e.amount || 0)}</td>
                                        <td style="padding:12px 16px;text-align:center;">
                                            <button onclick="editExpense('${e.id}')" style="background:none;border:none;cursor:pointer;font-size:18px;margin:0 4px;" title="Modifier">✏️</button>
                                            <button onclick="deleteExpense('${e.id}')" style="background:none;border:none;cursor:pointer;font-size:18px;margin:0 4px;" title="Supprimer">🗑️</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `}
            `;
        }
        
        window.showNewExpenseModal = function() {
            const modal = document.createElement('div');
            modal.id = 'newExpenseModal'; modal.className = 'modal';
            const today = new Date().toISOString().split('T')[0];
            const cats = ['Loyer','Énergie','Salaires','Équipement','Emballages','Livraison','Marketing','Assurance','Maintenance','Autre'];
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>💸 Nouvelle dépense</h2>
                        <button class="modal-close" onclick="closeModal('newExpenseModal')">✕</button>
                    </div>
                    <div class="modal-body">
                        <form id="newExpenseForm">
                            <div class="form-group"><label>Libellé *</label>
                                <input type="text" id="expLabel" required placeholder="Ex: Loyer janvier"></div>
                            <div class="form-row">
                                <div class="form-group"><label>Catégorie *</label>
                                    <select id="expCat" required>
                                        ${cats.map(c => `<option value="${c}">${c}</option>`).join('')}
                                    </select>
                                </div>
                                <div class="form-group"><label>Date *</label>
                                    <input type="date" id="expDate" value="${today}" required></div>
                            </div>
                            <div class="form-group"><label>Montant (${appState.currentCurrency}) *</label>
                                <input type="number" id="expAmount" required min="0.01" step="0.01" inputmode="decimal" placeholder="0.00"></div>
                            <div class="form-group"><label>Notes</label>
                                <textarea id="expNotes" rows="2" style="width:100%;padding:12px;border:2px solid var(--light);border-radius:var(--radius-md);font-family:var(--font-body);" placeholder="Informations complémentaires..."></textarea></div>
                            <div style="display:flex;gap:var(--space-md);margin-top:var(--space-lg);">
                                <button type="button" class="btn" style="flex:1" onclick="closeModal('newExpenseModal')">Annuler</button>
                                <button type="submit" class="btn btn-primary" style="flex:1">💾 Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>`;
            document.body.appendChild(modal);
            modal.querySelector('#newExpenseForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const label = document.getElementById('expLabel').value;
                const amount = Number(document.getElementById('expAmount').value);
                if (!confirm(`Confirmer l'enregistrement ?\n\n📝 ${label}\n💰 ${formatCurrency(amount)}`)) return;
                const exp = {
                    id: 'exp_' + Date.now(),
                    label: label,
                    category: document.getElementById('expCat').value,
                    date: dateStr(document.getElementById('expDate').value).slice(0, 10),
                    amount: amount,
                    currency: appState.currentCurrency,
                    notes: document.getElementById('expNotes').value,
                    createdAt: new Date().toISOString()
                };
                if (!appState.data.expenses) appState.data.expenses = [];
                appState.data.expenses.push(exp);
                saveData();
                closeModal('newExpenseModal');
                renderExpensesPage();
                showToast('✅ Dépense enregistrée', 'success');
            });
        };
        
        window.editExpense = function(id) {
            const exp = (appState.data.expenses || []).find(e => e.id === id);
            if (!exp) return;
            const cats = ['Loyer','Énergie','Salaires','Équipement','Emballages','Livraison','Marketing','Assurance','Maintenance','Autre'];
            const modal = document.createElement('div');
            modal.id = 'editExpenseModal'; modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>✏️ Modifier dépense</h2>
                        <button class="modal-close" onclick="closeModal('editExpenseModal')">✕</button>
                    </div>
                    <div class="modal-body">
                        <form id="editExpenseForm">
                            <input type="hidden" id="editExpId" value="${exp.id}">
                            <div class="form-group"><label>Libellé *</label>
                                <input type="text" id="editExpLabel" value="${exp.label || exp.description || ''}" required></div>
                            <div class="form-row">
                                <div class="form-group"><label>Catégorie</label>
                                    <select id="editExpCat">
                                        ${cats.map(c => `<option value="${c}" ${exp.category===c?'selected':''}>${c}</option>`).join('')}
                                    </select>
                                </div>
                                <div class="form-group"><label>Date *</label>
                                    <input type="date" id="editExpDate" value="${exp.date || ''}" required></div>
                            </div>
                            <div class="form-group"><label>Montant *</label>
                                <input type="number" id="editExpAmount" value="${exp.amount || 0}" required min="0.01" step="0.01" inputmode="decimal"></div>
                            <div style="display:flex;gap:var(--space-md);margin-top:var(--space-lg);">
                                <button type="button" class="btn" style="flex:1" onclick="closeModal('editExpenseModal')">Annuler</button>
                                <button type="submit" class="btn btn-primary" style="flex:1">💾 Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>`;
            document.body.appendChild(modal);
            modal.querySelector('#editExpenseForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const idx = (appState.data.expenses||[]).findIndex(ex => ex.id === document.getElementById('editExpId').value);
                if (idx !== -1) {
                    const label = document.getElementById('editExpLabel').value;
                    const amount = Number(document.getElementById('editExpAmount').value);
                    if (!confirm(`Confirmer la modification ?\n\n📝 ${label}\n💰 ${formatCurrency(amount)}`)) return;
                    appState.data.expenses[idx].label = label;
                    appState.data.expenses[idx].category = document.getElementById('editExpCat').value;
                    appState.data.expenses[idx].date = dateStr(document.getElementById('editExpDate').value).slice(0, 10);
                    appState.data.expenses[idx].amount = amount;
                    saveData(); closeModal('editExpenseModal'); renderExpensesPage();
                    showToast('✅ Dépense modifiée', 'success');
                }
            });
        };
        
        window.deleteExpense = function(id) {
            if (!confirm('Supprimer cette dépense ?')) return;
            appState.data.expenses = (appState.data.expenses||[]).filter(e => e.id !== id);
            saveData(); renderExpensesPage();
            showToast('🗑️ Dépense supprimée', 'success');
        };
        
        // ========================================
        // MODULE FOURNISSEURS
        // ========================================
        function renderSuppliersPage() {
            const suppliers = appState.data.suppliers || [];
            document.getElementById('mainContent').innerHTML = `
                <div class="page-header">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <h1 class="page-title">🚚 Fournisseurs</h1>
                            <p class="page-subtitle">${suppliers.length} fournisseur${suppliers.length!==1?'s':''}</p>
                        </div>
                        <div style="display:flex;gap:var(--space-sm);">
                            <button class="btn" style="background:var(--secondary);color:white;" onclick="exportSuppliers()">📤 Exporter</button>
                            <button class="btn btn-primary" onclick="showNewSupplierModal()">➕ Nouveau fournisseur</button>
                        </div>
                    </div>
                </div>
                
                ${suppliers.length === 0 ? `
                    <div style="text-align:center;padding:var(--space-xl);background:white;border-radius:var(--radius-lg);">
                        <div style="font-size:56px;margin-bottom:var(--space-md);">🚚</div>
                        <h3>Aucun fournisseur</h3>
                        <p style="color:var(--gray);margin-bottom:var(--space-md);">Ajoutez vos fournisseurs pour gérer vos approvisionnements</p>
                        <button class="btn btn-primary" onclick="showNewSupplierModal()">➕ Ajouter un fournisseur</button>
                    </div>
                ` : `
                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:var(--space-md);">
                        ${suppliers.map(s => `
                            <div class="ingredient-card">
                                <div class="ingredient-header">
                                    <div>
                                        <h3 class="ingredient-name">🚚 ${s.name}</h3>
                                        <span class="ingredient-category">${s.category || 'Général'}</span>
                                    </div>
                                </div>
                                <div style="font-size:13px;color:var(--gray);margin-bottom:var(--space-sm);">
                                    ${s.contact ? `<div>👤 ${s.contact}</div>` : ''}
                                    ${s.phone ? `<div>📞 ${s.phone}</div>` : ''}
                                    ${s.email ? `<div>📧 ${s.email}</div>` : ''}
                                    ${s.address ? `<div>📍 ${s.address}</div>` : ''}
                                </div>
                                ${s.notes ? `<div style="font-size:12px;color:var(--gray);font-style:italic;margin-bottom:var(--space-sm);">${s.notes}</div>` : ''}
                                <div class="ingredient-actions">
                                    <button class="action-btn" onclick="editSupplier('${s.id}')" title="Modifier">✏️</button>
                                    <button class="action-btn" onclick="deleteSupplier('${s.id}')" title="Supprimer" style="color:var(--danger);">🗑️</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            `;
        }
        
        window.showNewSupplierModal = function() {
            const modal = document.createElement('div');
            modal.id = 'newSupplierModal'; modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>🚚 Nouveau fournisseur</h2>
                        <button class="modal-close" onclick="closeModal('newSupplierModal')">✕</button>
                    </div>
                    <div class="modal-body">
                        <form id="newSupplierForm">
                            <div class="form-group"><label>Nom *</label>
                                <input type="text" id="supName" required placeholder="Ex: Metro France"></div>
                            <div class="form-row">
                                <div class="form-group"><label>Catégorie</label>
                                    <select id="supCat">
                                        <option value="Grossiste">Grossiste</option>
                                        <option value="Producteur">Producteur local</option>
                                        <option value="Épicerie">Épicerie / Cash</option>
                                        <option value="Boucherie">Boucherie</option>
                                        <option value="Marché">Marché</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>
                                <div class="form-group"><label>Contact</label>
                                    <input type="text" id="supContact" placeholder="Nom du représentant"></div>
                            </div>
                            <div class="form-row">
                                <div class="form-group"><label>Téléphone</label>
                                    <input type="tel" id="supPhone"></div>
                                <div class="form-group"><label>Email</label>
                                    <input type="email" id="supEmail"></div>
                            </div>
                            <div class="form-group"><label>Adresse</label>
                                <input type="text" id="supAddress"></div>
                            <div class="form-group"><label>Notes</label>
                                <textarea id="supNotes" rows="2" style="width:100%;padding:12px;border:2px solid var(--light);border-radius:var(--radius-md);font-family:var(--font-body);"></textarea></div>
                            <div style="display:flex;gap:var(--space-md);margin-top:var(--space-lg);">
                                <button type="button" class="btn" style="flex:1" onclick="closeModal('newSupplierModal')">Annuler</button>
                                <button type="submit" class="btn btn-primary" style="flex:1">💾 Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>`;
            document.body.appendChild(modal);
            modal.querySelector('#newSupplierForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const sup = {
                    id: 'sup_' + Date.now(),
                    name: document.getElementById('supName').value,
                    category: document.getElementById('supCat').value,
                    contact: document.getElementById('supContact').value,
                    phone: document.getElementById('supPhone').value,
                    email: document.getElementById('supEmail').value,
                    address: document.getElementById('supAddress').value,
                    notes: document.getElementById('supNotes').value,
                    createdAt: new Date().toISOString()
                };
                if (!appState.data.suppliers) appState.data.suppliers = [];
                appState.data.suppliers.push(sup);
                saveData(); closeModal('newSupplierModal'); renderSuppliersPage();
                showToast('✅ Fournisseur ajouté', 'success');
            });
        };
        
        window.editSupplier = function(id) {
            const s = (appState.data.suppliers||[]).find(x => x.id === id);
            if (!s) return;
            const modal = document.createElement('div');
            modal.id = 'editSupplierModal'; modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header"><h2>✏️ Modifier fournisseur</h2>
                        <button class="modal-close" onclick="closeModal('editSupplierModal')">✕</button></div>
                    <div class="modal-body">
                        <form id="editSupplierForm">
                            <input type="hidden" id="editSupId" value="${s.id}">
                            <div class="form-group"><label>Nom *</label><input type="text" id="editSupName" value="${s.name}" required></div>
                            <div class="form-row">
                                <div class="form-group"><label>Contact</label><input type="text" id="editSupContact" value="${s.contact||''}"></div>
                                <div class="form-group"><label>Téléphone</label><input type="tel" id="editSupPhone" value="${s.phone||''}"></div>
                            </div>
                            <div class="form-row">
                                <div class="form-group"><label>Email</label><input type="email" id="editSupEmail" value="${s.email||''}"></div>
                                <div class="form-group"><label>Adresse</label><input type="text" id="editSupAddress" value="${s.address||''}"></div>
                            </div>
                            <div class="form-group"><label>Notes</label>
                                <textarea id="editSupNotes" rows="2" style="width:100%;padding:12px;border:2px solid var(--light);border-radius:var(--radius-md);font-family:var(--font-body);">${s.notes||''}</textarea></div>
                            <div style="display:flex;gap:var(--space-md);margin-top:var(--space-lg);">
                                <button type="button" class="btn" style="flex:1" onclick="closeModal('editSupplierModal')">Annuler</button>
                                <button type="submit" class="btn btn-primary" style="flex:1">💾 Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>`;
            document.body.appendChild(modal);
            modal.querySelector('#editSupplierForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const idx = (appState.data.suppliers||[]).findIndex(x => x.id === document.getElementById('editSupId').value);
                if (idx !== -1) {
                    appState.data.suppliers[idx] = {
                        ...appState.data.suppliers[idx],
                        name: document.getElementById('editSupName').value,
                        contact: document.getElementById('editSupContact').value,
                        phone: document.getElementById('editSupPhone').value,
                        email: document.getElementById('editSupEmail').value,
                        address: document.getElementById('editSupAddress').value,
                        notes: document.getElementById('editSupNotes').value
                    };
                    saveData(); closeModal('editSupplierModal'); renderSuppliersPage();
                    showToast('✅ Fournisseur modifié', 'success');
                }
            });
        };
        
        window.deleteSupplier = function(id) {
            if (!confirm('Supprimer ce fournisseur ?')) return;
            appState.data.suppliers = (appState.data.suppliers||[]).filter(s => s.id !== id);
            saveData(); renderSuppliersPage();
            showToast('🗑️ Fournisseur supprimé', 'success');
        };
        
        window.exportSuppliers = function() {
            const suppliers = appState.data.suppliers || [];
            const rows = [['Nom','Catégorie','Contact','Téléphone','Email','Adresse','Notes']];
            suppliers.forEach(s => rows.push([s.name||'',s.category||'',s.contact||'',s.phone||'',s.email||'',s.address||'',s.notes||'']));
            const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
            const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
            const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
            a.download = 'BFM_Fournisseurs.csv'; a.click();
            showToast('📤 Export fournisseurs téléchargé', 'success');
        };
        
        // ========================================
        // MODULE CLIENTS
        // ========================================
        function renderClientsPage() {
            const clients = appState.data.clients || [];
            const sales = appState.data.sales || [];
            
            document.getElementById('mainContent').innerHTML = `
                <div class="page-header">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <h1 class="page-title">👤 Clients</h1>
                            <p class="page-subtitle">${clients.length} client${clients.length!==1?'s':''}</p>
                        </div>
                        <div style="display:flex;gap:var(--space-sm);">
                            <button class="btn" style="background:var(--secondary);color:white;" onclick="exportClients()">📤 Exporter</button>
                            <button class="btn btn-primary" onclick="showNewClientModal()">➕ Nouveau client</button>
                        </div>
                    </div>
                </div>
                
                ${clients.length === 0 ? `
                    <div style="text-align:center;padding:var(--space-xl);background:white;border-radius:var(--radius-lg);">
                        <div style="font-size:56px;margin-bottom:var(--space-md);">👤</div>
                        <h3>Aucun client enregistré</h3>
                        <p style="color:var(--gray);margin-bottom:var(--space-md);">Gérez vos clients professionnels et habituels</p>
                        <button class="btn btn-primary" onclick="showNewClientModal()">➕ Ajouter un client</button>
                    </div>
                ` : `
                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:var(--space-md);">
                        ${clients.map(c => {
                            const clientSales = sales.filter(s => s.clientId === c.id);
                            const totalCA = clientSales.reduce((sum, s) => sum + (s.revenue || 0), 0);
                            return `
                                <div class="ingredient-card">
                                    <div class="ingredient-header">
                                        <div>
                                            <h3 class="ingredient-name">👤 ${c.name}</h3>
                                            <span class="ingredient-category">${(c.tags||[]).join(', ') || 'Client'}</span>
                                        </div>
                                        ${totalCA > 0 ? `<div style="font-weight:700;color:var(--success);">${formatCurrency(totalCA)}</div>` : ''}
                                    </div>
                                    <div style="font-size:13px;color:var(--gray);margin-bottom:var(--space-sm);">
                                        ${c.phone ? `<div>📞 ${c.phone}</div>` : ''}
                                        ${c.email ? `<div>📧 ${c.email}</div>` : ''}
                                        ${clientSales.length > 0 ? `<div>🛒 ${clientSales.length} commande${clientSales.length!==1?'s':''}</div>` : ''}
                                    </div>
                                    ${c.notes ? `<div style="font-size:12px;color:var(--gray);font-style:italic;margin-bottom:var(--space-sm);">${c.notes}</div>` : ''}
                                    <div class="ingredient-actions">
                                        <button class="action-btn" onclick="editClient('${c.id}')" title="Modifier">✏️</button>
                                        <button class="action-btn" onclick="deleteClient('${c.id}')" title="Supprimer" style="color:var(--danger);">🗑️</button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `}
            `;
        }
        
        window.showNewClientModal = function() {
            const modal = document.createElement('div');
            modal.id = 'newClientModal'; modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header"><h2>👤 Nouveau client</h2>
                        <button class="modal-close" onclick="closeModal('newClientModal')">✕</button></div>
                    <div class="modal-body">
                        <form id="newClientForm">
                            <div class="form-group"><label>Nom / Raison sociale *</label>
                                <input type="text" id="cliName" required placeholder="Ex: Restaurant Le Gourmet"></div>
                            <div class="form-row">
                                <div class="form-group"><label>Téléphone</label><input type="tel" id="cliPhone"></div>
                                <div class="form-group"><label>Email</label><input type="email" id="cliEmail"></div>
                            </div>
                            <div class="form-group"><label>Tags (séparés par virgule)</label>
                                <input type="text" id="cliTags" placeholder="VIP, Professionnel, Habituel"></div>
                            <div class="form-group"><label>Notes</label>
                                <textarea id="cliNotes" rows="2" style="width:100%;padding:12px;border:2px solid var(--light);border-radius:var(--radius-md);font-family:var(--font-body);"></textarea></div>
                            <div style="display:flex;gap:var(--space-md);margin-top:var(--space-lg);">
                                <button type="button" class="btn" style="flex:1" onclick="closeModal('newClientModal')">Annuler</button>
                                <button type="submit" class="btn btn-primary" style="flex:1">💾 Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>`;
            document.body.appendChild(modal);
            modal.querySelector('#newClientForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const cli = {
                    id: 'cli_' + Date.now(),
                    name: document.getElementById('cliName').value,
                    phone: document.getElementById('cliPhone').value,
                    email: document.getElementById('cliEmail').value,
                    tags: document.getElementById('cliTags').value.split(',').map(t=>t.trim()).filter(Boolean),
                    notes: document.getElementById('cliNotes').value,
                    createdAt: new Date().toISOString()
                };
                if (!appState.data.clients) appState.data.clients = [];
                appState.data.clients.push(cli);
                saveData(); closeModal('newClientModal'); renderClientsPage();
                showToast('✅ Client ajouté', 'success');
            });
        };
        
        window.editClient = function(id) {
            const c = (appState.data.clients||[]).find(x => x.id === id);
            if (!c) return;
            const modal = document.createElement('div');
            modal.id = 'editClientModal'; modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header"><h2>✏️ Modifier client</h2>
                        <button class="modal-close" onclick="closeModal('editClientModal')">✕</button></div>
                    <div class="modal-body">
                        <form id="editClientForm">
                            <input type="hidden" id="editCliId" value="${c.id}">
                            <div class="form-group"><label>Nom *</label><input type="text" id="editCliName" value="${c.name}" required></div>
                            <div class="form-row">
                                <div class="form-group"><label>Téléphone</label><input type="tel" id="editCliPhone" value="${c.phone||''}"></div>
                                <div class="form-group"><label>Email</label><input type="email" id="editCliEmail" value="${c.email||''}"></div>
                            </div>
                            <div class="form-group"><label>Tags</label><input type="text" id="editCliTags" value="${(c.tags||[]).join(', ')}"></div>
                            <div class="form-group"><label>Notes</label>
                                <textarea id="editCliNotes" rows="2" style="width:100%;padding:12px;border:2px solid var(--light);border-radius:var(--radius-md);font-family:var(--font-body);">${c.notes||''}</textarea></div>
                            <div style="display:flex;gap:var(--space-md);margin-top:var(--space-lg);">
                                <button type="button" class="btn" style="flex:1" onclick="closeModal('editClientModal')">Annuler</button>
                                <button type="submit" class="btn btn-primary" style="flex:1">💾 Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>`;
            document.body.appendChild(modal);
            modal.querySelector('#editClientForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const idx = (appState.data.clients||[]).findIndex(x => x.id === document.getElementById('editCliId').value);
                if (idx !== -1) {
                    appState.data.clients[idx] = {
                        ...appState.data.clients[idx],
                        name: document.getElementById('editCliName').value,
                        phone: document.getElementById('editCliPhone').value,
                        email: document.getElementById('editCliEmail').value,
                        tags: document.getElementById('editCliTags').value.split(',').map(t=>t.trim()).filter(Boolean),
                        notes: document.getElementById('editCliNotes').value
                    };
                    saveData(); closeModal('editClientModal'); renderClientsPage();
                    showToast('✅ Client modifié', 'success');
                }
            });
        };
        
        window.deleteClient = function(id) {
            if (!confirm('Supprimer ce client ?')) return;
            appState.data.clients = (appState.data.clients||[]).filter(c => c.id !== id);
            saveData(); renderClientsPage();
            showToast('🗑️ Client supprimé', 'success');
        };
        
        window.exportClients = function() {
            const clients = appState.data.clients || [];
            const rows = [['Nom','Téléphone','Email','Tags','Notes']];
            clients.forEach(c => rows.push([c.name||'',c.phone||'',c.email||'',(c.tags||[]).join('|'),c.notes||'']));
            const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
            const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
            const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
            a.download = 'BFM_Clients.csv'; a.click();
            showToast('📤 Export clients téléchargé', 'success');
        };

        // ========================================
        // DIAGNOSTIC & VERSION
        // ========================================
        window.exportDiagnostic = function() {
            const diag = {
                version: 'v55.6-POLISH',
                schemaVersion: '55.6',
                buildDate: '2026-02-10',
                timestamp: new Date().toISOString(),
                counts: {
                    ingredients: (appState.data.ingredients||[]).length,
                    recipes: (appState.data.recipes||[]).length,
                    productions: (appState.data.productions||[]).length,
                    sales: (appState.data.sales||[]).length,
                    expenses: (appState.data.expenses||[]).length,
                    suppliers: (appState.data.suppliers||[]).length,
                    clients: (appState.data.clients||[]).length,
                    staff: (appState.data.staff||[]).length,
                    lossHistory: (appState.data.lossHistory||[]).length
                },
                currency: appState.currentCurrency,
                lang: appState.currentLang
            };
            const blob = new Blob([JSON.stringify(diag, null, 2)], {type:'application/json'});
            const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
            a.download = 'BFM_Diagnostic.json'; a.click();
            showToast('📊 Diagnostic exporté', 'success');
        };

        // Start app
        initApp();
        // ========================================
        // FONCTIONS EXPORT PDF
        // ========================================
        
        window.exportInventoryPDF = async function() {
            try {
                showToast('📄 Génération du PDF...', 'info');
                
                const ingredients = appState.data.ingredients || [];
                const settings = {
                    businessName: appState.data.settings?.businessName || 'BusinessFood Manager'
                };
                
                await ExportService.exportInventory(ingredients, settings);
                showToast('✅ Inventaire exporté avec succès', 'success');
            } catch (error) {
                console.error('Export error:', error);
                showToast('❌ Erreur lors de l\'export : ' + error.message, 'error');
            }
        };
        
        window.exportRecipePDF = async function(recipeId) {
            try {
                showToast('📄 Génération du PDF...', 'info');
                
                const recipe = appState.data.recipes.find(r => r.id === recipeId);
                if (!recipe) {
                    showToast('❌ Recette introuvable', 'error');
                    return;
                }
                
                const ingredients = appState.data.ingredients || [];
                const settings = {
                    businessName: appState.data.settings?.businessName || 'BusinessFood Manager'
                };
                
                await ExportService.exportRecipe(recipe, ingredients, settings);
                showToast('✅ Fiche recette exportée avec succès', 'success');
            } catch (error) {
                console.error('Export error:', error);
                showToast('❌ Erreur lors de l\'export : ' + error.message, 'error');
            }
        };
        
        window.exportProfitabilityPDF = async function() {
            try {
                showToast('📄 Génération du PDF...', 'info');
                
                const recipes = appState.data.recipes || [];
                const packs = appState.data.packs || [];
                const ingredients = appState.data.ingredients || [];
                const settings = {
                    businessName: appState.data.settings?.businessName || 'BusinessFood Manager'
                };
                
                await ExportService.exportProfitabilityReport(recipes, packs, ingredients, settings);
                showToast('✅ Rapport rentabilité exporté avec succès', 'success');
            } catch (error) {
                console.error('Export error:', error);
                showToast('❌ Erreur lors de l\'export : ' + error.message, 'error');
            }
        };
        
        window.exportStockValuationPDF = async function() {
            try {
                showToast('📄 Génération du PDF...', 'info');
                
                const ingredients = appState.data.ingredients || [];
                const productions = appState.data.productions || [];
                const settings = {
                    businessName: appState.data.settings?.businessName || 'BusinessFood Manager'
                };
                
                await ExportService.exportStockValuation(ingredients, productions, settings);
                showToast('✅ Bilan valorisation exporté avec succès', 'success');
            } catch (error) {
                console.error('Export error:', error);
                showToast('❌ Erreur lors de l\'export : ' + error.message, 'error');
            }
        };

        // ========================================
        // RESPONSIVE & MODE SOMBRE
        // ========================================
        
        // Mode sombre uniquement
        

        // ========================================
        // MODE SOMBRE
        // ========================================
        
        

        // ========================================
        // PERFORMANCE & UX UTILITIES
        // ========================================
        
        // Debounce pour optimiser recherche
        window.debounce = function(func, wait = 300) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };
        
        // Throttle pour scroll events
        window.throttle = function(func, limit = 100) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        };
        
        // Cleanup automatique données anciennes
        window.cleanupOldData = function() {
            const now = new Date();
            const sixMonthsAgo = new Date(now.getTime() - (180 * 24 * 60 * 60 * 1000));
            
            let cleaned = 0;
            
            // Nettoyer lots périmés anciens
            appState.data.ingredients.forEach(ing => {
                if (ing.lots) {
                    const initialLength = ing.lots.length;
                    ing.lots = ing.lots.filter(lot => {
                        if (lot.epuise && lot.dlc) {
                            const dlcDate = new Date(lot.dlc);
                            return dlcDate > sixMonthsAgo;
                        }
                        return true;
                    });
                    cleaned += initialLength - ing.lots.length;
                }
            });
            
            if (cleaned > 0) {
                saveData();
                console.log(`🧹 Cleaned ${cleaned} old lots`);
                return cleaned;
            }
            return 0;
        };
        
        // Auto-save indicator
        window.showSaveIndicator = function(success = true) {
            const indicator = document.createElement('div');
            indicator.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 20px;
                background: ${success ? 'var(--success)' : 'var(--danger)'};
                color: white;
                border-radius: 8px;
                font-weight: 600;
                z-index: 10000;
                animation: slideInModal 0.3s ease-out;
            `;
            indicator.textContent = success ? '✓ Sauvegardé' : '✗ Erreur sauvegarde';
            document.body.appendChild(indicator);
            
            setTimeout(() => {
                indicator.style.opacity = '0';
                indicator.style.transform = 'translateY(-20px)';
                indicator.style.transition = 'all 0.3s ease';
                setTimeout(() => indicator.remove(), 300);
            }, 2000);
        };
        
        // Shortcuts clavier
        window.initKeyboardShortcuts = function() {
            document.addEventListener('keydown', function(e) {
                // Ctrl/Cmd + S : Save (preventDefault pour ne pas sauvegarder la page)
                if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                    e.preventDefault();
                    saveData();
                    showSaveIndicator(true);
                    return false;
                }
                
                // Esc : Fermer modal ouverte
                if (e.key === 'Escape') {
                    const openModal = document.querySelector('.modal-overlay[style*="flex"]');
                    if (openModal) {
                        const modalId = openModal.id.replace('Overlay', '');
                        if (window['close' + modalId.charAt(0).toUpperCase() + modalId.slice(1)]) {
                            window['close' + modalId.charAt(0).toUpperCase() + modalId.slice(1)]();
                        }
                    }
                }
                
                // Ctrl/Cmd + F : Focus search
                if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                    e.preventDefault();
                    const searchInput = document.querySelector('input[type="text"][placeholder*="echerch"]');
                    if (searchInput) {
                        searchInput.focus();
                        searchInput.select();
                    }
                    return false;
                }
            });
        };
        
        // Améliorer la fonction saveData existante pour montrer l'indicateur
        const originalSaveData = window.saveData;
        window.saveData = function() {
            try {
                originalSaveData();
                // Note: pas de showSaveIndicator ici car déjà dans le shortcut
                return true;
            } catch (error) {
                console.error('Save error:', error);
                showSaveIndicator(false);
                return false;
            }
        };
        
        // Loading state helper
        window.setButtonLoading = function(button, loading = true) {
            if (loading) {
                button.classList.add('loading');
                button.disabled = true;
                button.dataset.originalText = button.textContent;
            } else {
                button.classList.remove('loading');
                button.disabled = false;
                if (button.dataset.originalText) {
                    button.textContent = button.dataset.originalText;
                }
            }
        };
        
        // Shake element on error
        window.shakeElement = function(element) {
            element.classList.add('error-shake');
            setTimeout(() => element.classList.remove('error-shake'), 500);
        };
        
        // Init au chargement
        initKeyboardShortcuts();
        
        // Auto-cleanup mensuel
        const lastCleanup = localStorage.getItem('BFM_LAST_CLEANUP');
        const now = Date.now();
        if (!lastCleanup || (now - parseInt(lastCleanup)) > (30 * 24 * 60 * 60 * 1000)) {
            setTimeout(() => {
                const cleaned = cleanupOldData();
                if (cleaned > 0) {
                    showToast(`🧹 ${cleaned} anciens lots nettoyés`, 'info');
                }
                localStorage.setItem('BFM_LAST_CLEANUP', now.toString());
            }, 5000); // Attendre 5s après chargement
        }

        // ========================================
        // TUTORIEL INTÉGRÉ INTERACTIF
        // ========================================
        
        window.TutorialService = {
            steps: [
                {
                    id: 'welcome',
                    title: '👋 Bienvenue !',
                    message: 'Bienvenue dans <strong>BusinessFood Manager</strong>, solution métier F&B by <strong>Fotsi Global Services (FGS)</strong>.<br><br>Cette application professionnelle vous aide à gérer votre restaurant : stocks, recettes, coûts et rentabilité.<br><br><strong>Voulez-vous faire le tour guidé ?</strong> (2 minutes)',
                    buttons: ['Oui, commencer', 'Plus tard']
                },
                {
                    id: 'demo',
                    title: '🎯 Commencez avec un exemple',
                    message: 'Pour découvrir l\'application, chargez une démo pré-remplie :<br><br>🧇 <strong>Démo Salon</strong> : Pâtisserie/Traiteur<br>🍹 <strong>Démo Bar</strong> : Bar à cocktails<br><br>Cliquez sur un des deux boutons orange.',
                    target: '.demo-buttons',
                    position: 'bottom'
                },
                {
                    id: 'sidebar',
                    title: '📂 Menu de navigation',
                    message: 'Sur la gauche, le menu vous permet d\'accéder aux différentes sections :<br><br>• <strong>Tableau de bord</strong> : Vue d\'ensemble<br>• <strong>Ingrédients</strong> : Gérer votre stock<br>• <strong>Recettes</strong> : Vos plats et préparations<br>• <strong>Rentabilité</strong> : Voir vos marges',
                    target: '#sidebar',
                    position: 'right'
                },
                {
                    id: 'ingredients',
                    title: '📦 Gérer vos ingrédients',
                    message: 'Ici vous ajoutez vos produits (farine, sucre, etc.).<br><br>Pour chaque ingrédient :<br>• Combien il en reste<br>• Date de péremption<br>• Prix d\'achat<br><br>Cliquez sur <strong>"+ Nouvel ingrédient"</strong> pour ajouter un produit.',
                    page: 'ingredients',
                    target: '.btn-primary',
                    position: 'bottom'
                },
                {
                    id: 'recipes',
                    title: '📋 Créer vos recettes',
                    message: 'Créez vos fiches techniques de cuisine.<br><br>L\'application <strong>calcule automatiquement</strong> :<br>• Le coût de revient<br>• Votre marge de bénéfice<br><br>Ajoutez simplement les ingrédients et leurs quantités !',
                    page: 'recipes',
                    target: '.btn-primary',
                    position: 'bottom'
                },
                {
                    id: 'profitability',
                    title: '💰 Analyser votre rentabilité',
                    message: 'Cette page vous montre si vos plats sont <strong>rentables</strong> :<br><br>🟢 <strong>Excellent</strong> : Marge > 50%<br>🟡 <strong>Correct</strong> : Marge 25-50%<br>🔴 <strong>Faible</strong> : Marge < 25%<br><br>Si un plat est en perte, augmentez le prix ou réduisez les ingrédients.',
                    page: 'profitability',
                    position: 'center'
                },
                {
                    id: 'alerts',
                    title: '🔔 Alertes automatiques',
                    message: 'L\'application surveille pour vous :<br><br>• Stock faible → Il faut recommander<br>• Date proche de péremption → À utiliser vite<br><br>Vous voyez les alertes sur cette page.',
                    page: 'alerts',
                    position: 'center'
                },
                {
                    id: 'export',
                    title: '📤 Imprimer vos documents',
                    message: 'Générez des PDF professionnels :<br><br>• Inventaire stock<br>• Fiches recettes (pour afficher en cuisine)<br>• Rapport de rentabilité<br><br>Cherchez les boutons <strong>"📤 Export PDF"</strong>',
                    position: 'center'
                },
                {
                    id: 'save',
                    title: '💾 Sauvegarde automatique',
                    message: 'Vos données sont <strong>sauvegardées automatiquement</strong> dans votre navigateur.<br><br>⚠️ <strong>Important</strong> : Exportez régulièrement vos données (menu Paramètres) pour éviter toute perte.',
                    position: 'center'
                },
                {
                    id: 'shortcuts',
                    title: '⌨️ Raccourcis pratiques',
                    message: 'Pour aller plus vite :<br><br>• <strong>Ctrl+S</strong> : Sauvegarder<br>• <strong>Esc</strong> : Fermer une fenêtre<br>• <strong>Ctrl+F</strong> : Chercher<br><br>Vous êtes prêt ! 🚀',
                    position: 'center'
                },
                {
                    id: 'finish',
                    title: '✅ Tutoriel terminé !',
                    message: 'Vous connaissez maintenant les bases.<br><br>N\'hésitez pas à explorer l\'application. Tout est intuitif et vous ne pouvez rien casser !<br><br><strong>Besoin d\'aide ?</strong> Cliquez sur le point d\'interrogation <strong>?</strong> en haut à droite.',
                    buttons: ['Commencer à utiliser l\'application']
                }
            ],
            
            currentStep: 0,
            
            start() {
                const hasSeenTutorial = localStorage.getItem('BFM_TUTORIAL_SEEN');
                if (!hasSeenTutorial) {
                    this.currentStep = 0;
                    this.showStep();
                }
            },
            
            showStep() {
                const step = this.steps[this.currentStep];
                if (!step) return;
                
                // Naviguer vers la page si nécessaire
                if (step.page && window.navigateTo) {
                    window.navigateTo(step.page);
                    setTimeout(() => this.renderStep(step), 300);
                } else {
                    this.renderStep(step);
                }
            },
            
            renderStep(step) {
                // Supprimer ancien tutoriel
                const existing = document.getElementById('tutorial-overlay');
                if (existing) existing.remove();
                
                // Créer overlay
                const overlay = document.createElement('div');
                overlay.id = 'tutorial-overlay';
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 9998;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;
                
                // Créer bulle
                const bubble = document.createElement('div');
                bubble.style.cssText = `
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    max-width: 500px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                    position: relative;
                    z-index: 9999;
                    animation: slideInModal 0.3s ease-out;
                `;
                
                // Titre
                const title = document.createElement('h2');
                title.style.cssText = 'margin: 0 0 15px 0; color: #FF6B35; font-size: 24px;';
                title.innerHTML = step.title;
                
                // Message
                const message = document.createElement('p');
                message.style.cssText = 'margin: 0 0 20px 0; line-height: 1.6; font-size: 16px;';
                message.innerHTML = step.message;
                
                // Boutons
                const buttonsDiv = document.createElement('div');
                buttonsDiv.style.cssText = 'display: flex; gap: 10px; justify-content: flex-end;';
                
                if (step.buttons) {
                    step.buttons.forEach((btnText, index) => {
                        const btn = document.createElement('button');
                        btn.textContent = btnText;
                        btn.className = 'btn btn-primary';
                        btn.onclick = () => {
                            if (index === 0) {
                                this.next();
                            } else {
                                this.skip();
                            }
                        };
                        buttonsDiv.appendChild(btn);
                    });
                } else {
                    // Boutons par défaut
                    const skipBtn = document.createElement('button');
                    skipBtn.textContent = 'Passer';
                    skipBtn.className = 'btn';
                    skipBtn.onclick = () => this.skip();
                    
                    const nextBtn = document.createElement('button');
                    nextBtn.textContent = this.currentStep === this.steps.length - 1 ? 'Terminer' : 'Suivant';
                    nextBtn.className = 'btn btn-primary';
                    nextBtn.onclick = () => this.next();
                    
                    buttonsDiv.appendChild(skipBtn);
                    buttonsDiv.appendChild(nextBtn);
                }
                
                // Indicateur progression
                const progress = document.createElement('div');
                progress.style.cssText = 'margin-top: 20px; text-align: center; color: #999; font-size: 14px;';
                progress.textContent = `${this.currentStep + 1} / ${this.steps.length}`;
                
                bubble.appendChild(title);
                bubble.appendChild(message);
                bubble.appendChild(buttonsDiv);
                bubble.appendChild(progress);
                overlay.appendChild(bubble);
                
                document.body.appendChild(overlay);
                
                // Mettre en surbrillance l'élément cible si défini
                if (step.target) {
                    const target = document.querySelector(step.target);
                    if (target) {
                        target.style.position = 'relative';
                        target.style.zIndex = '10000';
                        target.style.boxShadow = '0 0 0 4px #FF6B35, 0 0 20px rgba(255, 107, 53, 0.5)';
                    }
                }
            },
            
            next() {
                this.currentStep++;
                if (this.currentStep >= this.steps.length) {
                    this.finish();
                } else {
                    this.showStep();
                }
            },
            
            skip() {
                this.finish();
            },
            
            finish() {
                const overlay = document.getElementById('tutorial-overlay');
                if (overlay) overlay.remove();
                
                // Marquer comme vu
                localStorage.setItem('BFM_TUTORIAL_SEEN', 'true');
                
                // Retourner au dashboard
                if (window.navigateTo) {
                    window.navigateTo('dashboard');
                }
            },
            
            restart() {
                localStorage.removeItem('BFM_TUTORIAL_SEEN');
                this.currentStep = 0;
                this.start();
            }
        };
        
        // Lancer au chargement (après 1 seconde pour laisser l'app s'initialiser)
        setTimeout(() => {
            TutorialService.start();
        }, 1000);

