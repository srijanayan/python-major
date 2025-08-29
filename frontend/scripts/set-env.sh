#!/bin/bash

# Environment switching script for E-Store Frontend

echo "🛍️ E-Store Frontend Environment Switcher"
echo "=========================================="

if [ "$1" = "dev" ] || [ "$1" = "development" ]; then
    echo "Setting environment to DEVELOPMENT..."
    echo "REACT_APP_ENV=development" > .env
    echo "REACT_APP_API_BASE_URL=http://localhost:8000" >> .env
    echo "✅ Development environment configured!"
    echo "   API will use: http://localhost:8000"
    echo "   Make sure your backend is running on port 8000"
    
elif [ "$1" = "prod" ] || [ "$1" = "production" ]; then
    echo "Setting environment to PRODUCTION..."
    echo "REACT_APP_ENV=production" > .env
    echo "REACT_APP_API_BASE_URL=https://python-major-production.up.railway.app" >> .env
    echo "✅ Production environment configured!"
    echo "   API will use: https://python-major-production.up.railway.app"
    
else
    echo "Usage: $0 [dev|prod]"
    echo ""
    echo "Options:"
    echo "  dev, development  - Set to development mode (localhost:8000)"
    echo "  prod, production  - Set to production mode (Railway URL)"
    echo ""
    echo "Current configuration:"
    if [ -f .env ]; then
        echo "📁 .env file exists:"
        cat .env
    else
        echo "📁 No .env file found (using defaults)"
    fi
    echo ""
    echo "Package.json proxy: $(grep '"proxy"' package.json | cut -d'"' -f4)"
fi
