# Complete Deployment Guide

## Prerequisites
- GitHub account (you have this ✓)
- Code pushed to main branch (you have this ✓)

---

## Step 1: Deploy Frontend to Netlify (5 minutes)

### 1a. Create Netlify Account & Site
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click **"New site from Git"**
4. Select your GitHub repo: `akshaya798/ReminderAI`
5. Build settings auto-detected:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18.x`
6. Click **"Deploy site"** and wait 2-3 minutes

Your frontend is now live! You'll get a URL like:
```
https://your-site-name.netlify.app
```

### 1b. Get Netlify Credentials
1. In Netlify dashboard, go to **User menu → Applications → Personal access tokens**
2. Click **"New access token"**
3. Name it: `GitHub Actions`
4. Copy the token (you'll only see it once)
5. Go to **Site settings → Build & deploy → Environment** to find your **Site ID**

---

## Step 2: Deploy Backend to Railway (5 minutes)

### 2a. Create Railway Account & Project
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Select `akshaya798/ReminderAI`
6. Railway auto-detects it's a Node.js project
7. **Deployment config** (Railway usually auto-detects):
   - **Start command**: `npm run start:api`
   - **Port**: `4000`

Wait for deployment (~2-3 minutes). Your backend URL will look like:
```
https://your-app-xxx.up.railway.app
```

### 2b. Get Railway API Token
1. Click your **profile icon → Account → Tokens**
2. Click **"Create token"**
3. Name it: `GitHub Actions`
4. Copy the token

---

## Step 3: Add GitHub Secrets (Enables Auto-Deploy)

1. Go to your GitHub repo: `https://github.com/akshaya798/ReminderAI`
2. Click **Settings → Secrets and variables → Actions**
3. Click **"New repository secret"** and add these THREE secrets:

| Secret Name | Value | Where to get |
|---|---|---|
| `NETLIFY_AUTH_TOKEN` | Your Netlify token | Netlify dashboard (Step 1b) |
| `NETLIFY_SITE_ID` | Your Netlify site ID | Netlify dashboard (Step 1b) |
| `RAILWAY_TOKEN` | Your Railway token | Railway dashboard (Step 2b) |

---

## Step 4: Link Backend to Frontend

Your frontend needs to know where the API is.

### Option A: Set Environment Variable (Recommended)

1. In Netlify dashboard → **Site settings → Build & deploy → Environment**
2. Add this environment variable:
   ```
   VITE_API_BASE=https://your-app-xxx.up.railway.app
   ```
   (Replace with your actual Railway URL from Step 2a)

3. **Trigger a redeploy**:
   - Go to Netlify → **Deployments → Trigger deploy → Deploy site**
   - OR push a commit to main branch

### Option B: Update Source Code

Edit `src/api.ts` and change:
```typescript
const BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:4000') + '/api'
```

---

## Step 5: Test Deployment

1. **Frontend**: Open your Netlify URL in browser
   - You should see the AMC Reminder app
   - It will try to connect to the API

2. **Test API Connection**:
   - Open **Browser DevTools → Console**
   - You should see the groups list load
   - If error: check that `VITE_API_BASE` is set correctly

3. **Troubleshoot API not loading**:
   - Ensure Railway backend is running: `https://your-app-xxx.up.railway.app/api/groups`
   - Check Netlify env var: `VITE_API_BASE` is set
   - Check Railway logs for errors

---

## Step 6: Verify Auto-Deploy Works

Now every push to `main` will auto-deploy both frontend and backend.

**Test it**:
```bash
cd /workspaces/ReminderAI
git commit --allow-empty -m "Test auto-deploy"
git push origin main
```

Watch:
- **Netlify**: Deployments tab (2-5 min)
- **Railway**: Deployments tab (3-5 min)
- **GitHub Actions**: Actions tab to see workflow logs

---

## Monitoring & Logs

### Netlify Logs
- **Site settings → Deploys → View logs** — see build & deployment logs
- **Site settings → Monitoring → Analytics** — see traffic

### Railway Logs
- **Project → Deployments** — see deployment history
- **Project → Logs** — real-time backend logs

---

## Next Steps (Optional)

1. **Add custom domain**:
   - Netlify: Site settings → Domain management
   - Railway: Add public domain

2. **Add database** (for persistence):
   - Railway: Create PostgreSQL addon, update `server/index.js` to use it

3. **Add authentication**:
   - Update RBAC: use JWT tokens instead of header `x-user-role`

4. **Monitor uptime**:
   - Use Netlify Analytics or UptimeRobot

---

## Quick Reference

| What | Where | Time |
|---|---|---|
| Frontend | Netlify | 5 min |
| Backend | Railway | 5 min |
| Secrets | GitHub | 2 min |
| Link API | Netlify env var | 1 min |
| **Total** | — | **~15 min** |

