#!/bin/bash

# ReminderAI Deployment Helper
# This script helps verify your setup and provides next steps

echo "🚀 ReminderAI Deployment Helper"
echo "================================"
echo ""

# Check 1: Git status
echo "✓ Checking git status..."
if git rev-parse --git-dir > /dev/null 2>&1; then
  BRANCH=$(git rev-parse --abbrev-ref HEAD)
  echo "  Current branch: $BRANCH"
  if [ "$BRANCH" != "main" ]; then
    echo "  ⚠️  Warning: You're on $BRANCH. Push to main for auto-deploy."
  fi
  UNPUSHED=$(git rev-list @{u}.. 2>/dev/null | wc -l)
  if [ "$UNPUSHED" -gt 0 ]; then
    echo "  ⚠️  You have $UNPUSHED unpushed commits. Run: git push origin main"
  else
    echo "  ✓ All commits pushed to GitHub"
  fi
else
  echo "  ❌ Not a git repo"
fi
echo ""

# Check 2: Node & npm
echo "✓ Checking Node.js setup..."
NODE_VERSION=$(node --version 2>/dev/null || echo "not installed")
echo "  Node version: $NODE_VERSION"
if [ "$NODE_VERSION" = "not installed" ]; then
  echo "  ❌ Node.js not found. Install from https://nodejs.org"
else
  echo "  ✓ Node.js found"
fi
echo ""

# Check 3: Build
echo "✓ Checking if build works..."
if npm run build > /dev/null 2>&1; then
  echo "  ✓ Build successful"
  DIST_SIZE=$(du -sh dist/ 2>/dev/null | cut -f1)
  echo "  Build size: $DIST_SIZE"
else
  echo "  ❌ Build failed. Run 'npm run build' for details"
fi
echo ""

# Check 4: Server
echo "✓ Checking if API server starts..."
timeout 3 node server/index.js > /dev/null 2>&1 &
sleep 1
if lsof -Pi :4000 -sTCP:LISTEN -t >/dev/null 2>&1; then
  echo "  ✓ API server starts on port 4000"
  pkill -f "node server/index.js" 2>/dev/null
else
  echo "  ⚠️  API server didn't start (expected if deps not installed)"
fi
echo ""

echo "📋 NEXT STEPS FOR DEPLOYMENT"
echo "============================="
echo ""
echo "1️⃣  DEPLOY FRONTEND (Netlify) - Takes 5 minutes"
echo "   ➜ Open: https://app.netlify.com/start"
echo "   ➜ Sign up/login with GitHub"
echo "   ➜ Select repo: akshaya798/ReminderAI"
echo "   ➜ Build command: npm run build"
echo "   ➜ Publish dir: dist"
echo "   ➜ Click Deploy"
echo ""

echo "2️⃣  DEPLOY BACKEND (Railway) - Takes 5 minutes"
echo "   ➜ Open: https://railway.app"
echo "   ➜ Sign up/login with GitHub"
echo "   ➜ New Project → Deploy from GitHub"
echo "   ➜ Select: akshaya798/ReminderAI"
echo "   ➜ Start command: npm run start:api"
echo "   ➜ Wait for deployment"
echo ""

echo "3️⃣  GET YOUR TOKENS"
echo "   Netlify token:"
echo "   ➜ https://app.netlify.com/user/applications/personal-access-tokens"
echo "   ➜ Click 'New access token'"
echo "   ➜ Copy and save"
echo ""
echo "   Netlify Site ID:"
echo "   ➜ Go to Site settings"
echo "   ➜ Look for 'Site ID' on General page"
echo "   ➜ Copy and save"
echo ""
echo "   Railway token:"
echo "   ➜ https://railway.app/account/tokens"
echo "   ➜ Click 'Create token'"
echo "   ➜ Copy and save"
echo ""

echo "4️⃣  ADD GITHUB SECRETS"
echo "   ➜ Go to: https://github.com/akshaya798/ReminderAI/settings/secrets/actions"
echo "   ➜ Click 'New repository secret'"
echo "   ➜ Add these 3 secrets:"
echo ""
echo "      Name: NETLIFY_AUTH_TOKEN"
echo "      Value: (paste your Netlify token)"
echo ""
echo "      Name: NETLIFY_SITE_ID"
echo "      Value: (paste your Site ID)"
echo ""
echo "      Name: RAILWAY_TOKEN"
echo "      Value: (paste your Railway token)"
echo ""

echo "5️⃣  LINK API TO FRONTEND"
echo "   ➜ In Netlify dashboard"
echo "   ➜ Go to Site settings → Build & deploy → Environment"
echo "   ➜ Add variable:"
echo ""
echo "      Key: VITE_API_BASE"
echo "      Value: https://your-railway-url.up.railway.app"
echo ""
echo "   ➜ Trigger redeploy: Deployments → Deploy site"
echo ""

echo "6️⃣  TEST IT WORKS"
echo "   ➜ Open your Netlify URL"
echo "   ➜ Should see the app"
echo "   ➜ Groups should load from API"
echo "   ➜ Try creating a group"
echo ""

echo "✅ All set! Questions? Check DEPLOY.md or DEPLOY_CHECKLIST.md"
echo ""
