# 🚀 Deployment Checklist

## Before You Start
- [ ] GitHub account with `akshaya798/ReminderAI` repo
- [ ] Code pushed to `main` branch

## Frontend Deployment (Netlify)
- [ ] Sign up at [netlify.com](https://netlify.com) with GitHub
- [ ] Create new site from `akshaya798/ReminderAI` repo
- [ ] Site deployed successfully (wait 2-3 min)
- [ ] Copy **Netlify Auth Token** from User menu → Applications → Personal access tokens
- [ ] Copy **Site ID** from Site settings → Build & deploy → Environment

**Netlify URL**: `https://_____.netlify.app`

## Backend Deployment (Railway)
- [ ] Sign up at [railway.app](https://railway.app) with GitHub
- [ ] Create new project from `akshaya798/ReminderAI` repo
- [ ] Project deployed successfully (wait 2-3 min)
- [ ] Copy **Railway API Token** from User menu → Account → Tokens

**Railway URL**: `https://your-app-xxx.up.railway.app`

## GitHub Secrets (Enable Auto-Deploy)
- [ ] Go to GitHub repo → Settings → Secrets and variables → Actions
- [ ] Add `NETLIFY_AUTH_TOKEN` = ______________________
- [ ] Add `NETLIFY_SITE_ID` = ______________________
- [ ] Add `RAILWAY_TOKEN` = ______________________

## Link API to Frontend
- [ ] In Netlify → Site settings → Build & deploy → Environment
- [ ] Add `VITE_API_BASE` = `https://your-app-xxx.up.railway.app`
- [ ] Trigger redeploy in Netlify (Deployments → Deploy site)

## Verify Deployment
- [ ] Frontend loads at Netlify URL ✓
- [ ] Open console → see no API errors ✓
- [ ] Groups list appears on screen ✓
- [ ] Can create/edit/delete groups ✓
- [ ] Can create/edit/delete assets ✓

## Test Auto-Deploy
- [ ] Push a test commit: `git commit --allow-empty -m "Test" && git push`
- [ ] Netlify auto-deploys (check Actions & Netlify Deployments)
- [ ] Railway auto-deploys (check Actions & Railway Deployments)

## Done! 🎉
- [ ] Site is live and working
- [ ] Auto-deploy is working on push
- [ ] Share your Netlify URL!

---

**Need help?** See `DEPLOY.md` for detailed step-by-step instructions.
