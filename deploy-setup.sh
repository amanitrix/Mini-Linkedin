#!/bin/bash

echo "🚀 Mini LinkedIn App - Vercel + Render Deployment Setup"
echo "======================================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin <your-github-repo-url>"
    echo "   git push -u origin main"
    exit 1
fi

# Check if all required files exist
echo "📋 Checking required files..."

required_files=(
    "client/package.json"
    "server/package.json"
    "client/vercel.json"
    "render.yaml"
    "VERCEL_RENDER_DEPLOYMENT.md"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - Missing!"
    fi
done

echo ""
echo "🔧 Next Steps:"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Prepare for Vercel + Render deployment'"
echo "   git push origin main"
echo ""
echo "2. Follow the deployment guide:"
echo "   📖 VERCEL_RENDER_DEPLOYMENT.md"
echo ""
echo "3. Deploy Backend on Render:"
echo "   🌐 https://render.com"
echo ""
echo "4. Deploy Frontend on Vercel:"
echo "   🌐 https://vercel.com"
echo ""
echo "🎯 Good luck with your deployment!" 