#!/bin/bash

# Script de lancement BusinessFood Manager v55.1
# Usage: ./launch.sh [port]

PORT=${1:-8000}

echo "🚀 Lancement de BusinessFood Manager v55.1"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Vérifier si on est dans le bon dossier
if [ ! -f "index.html" ]; then
    echo "❌ Erreur: index.html non trouvé"
    echo "   Assurez-vous d'être dans le dossier BusinessFood_v55_1_ACTEURS_OPTIONNELS"
    exit 1
fi

echo "📂 Dossier: $(pwd)"
echo "🌐 Port: $PORT"
echo ""

# Détecter le serveur disponible et lancer
if command -v python3 &> /dev/null; then
    echo "✅ Serveur Python 3 détecté"
    echo "🌍 Accès: http://localhost:$PORT/index.html"
    echo ""
    echo "Appuyez sur Ctrl+C pour arrêter"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    python3 -m http.server $PORT

elif command -v python &> /dev/null; then
    echo "✅ Serveur Python 2 détecté"
    echo "🌍 Accès: http://localhost:$PORT/index.html"
    echo ""
    echo "Appuyez sur Ctrl+C pour arrêter"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    python -m SimpleHTTPServer $PORT

elif command -v php &> /dev/null; then
    echo "✅ Serveur PHP détecté"
    echo "🌍 Accès: http://localhost:$PORT/index.html"
    echo ""
    echo "Appuyez sur Ctrl+C pour arrêter"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    php -S localhost:$PORT

elif command -v npx &> /dev/null; then
    echo "✅ npx détecté"
    echo "🌍 Accès: http://localhost:$PORT/index.html"
    echo ""
    echo "Appuyez sur Ctrl+C pour arrêter"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    npx http-server -p $PORT

else
    echo "❌ Aucun serveur HTTP trouvé"
    echo ""
    echo "Solutions:"
    echo "  1. Installer Python: https://www.python.org/"
    echo "  2. Installer Node.js: https://nodejs.org/"
    echo "  3. Installer PHP: https://www.php.net/"
    echo ""
    echo "Ou ouvrir directement:"
    echo "  - Double-clic sur index.html"
    echo "  - Ouvrir avec votre navigateur"
    exit 1
fi
