#!/bin/bash

# Deployment Script for Next.js Todo App to Vercel

echo "🚀 Preparing Next.js Todo App for Vercel Deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Found uncommitted changes. Committing..."
    git add .
    git commit -m "Deploy to Vercel: $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "🔐 Please make sure you have:"
echo "   1. Vercel account (sign up at https://vercel.com)"
echo "   2. MongoDB Atlas connection string in .env.local"
echo "   3. Git repository (GitHub, GitLab, or Bitbucket)"
echo ""

echo "📋 Project Summary:"
echo "   - Next.js 14.2.13"
echo "   - TypeScript"
echo "   - Tailwind CSS"
echo "   - MongoDB with Mongoose"
echo "   - API Routes for todos"
echo "   - Full CRUD operations"
echo ""

echo "🔧 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo ""
echo "🌐 Choose deployment option:"
echo "   1) Deploy to Vercel (interactive)"
echo "   2) Deploy with production preview"
echo "   3) Link to existing Vercel project"
echo "   4) Exit"
echo ""

read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo "🚀 Starting Vercel deployment..."
        vercel deploy --prod
        ;;
    2)
        echo "🚀 Deploying with preview..."
        vercel --prod
        ;;
    3)
        echo "🔗 Linking to existing project..."
        vercel link
        vercel --prod
        ;;
    4)
        echo "👋 Exiting..."
        exit 0
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment initiated! Check your Vercel dashboard for progress."
echo "📱 Your app will be available at: https://[your-project-name].vercel.app"