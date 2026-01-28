# 🎯 DEPLOYMENT VISUAL GUIDE

## Your App Architecture
```
┌─────────────────────────────────────────────────────┐
│  Browser                                             │
│  https://your-site.netlify.app                       │
│  ┌────────────────────────────────────────────────┐  │
│  │  React App (Frontend)                          │  │
│  │  - Groups List                                 │  │
│  │  - Group Details                               │  │
│  │  - Asset Management                            │  │
│  └─────────────┬──────────────────────────────────┘  │
│                │ API Calls                            │
└────────────────┼────────────────────────────────────┘
                 │ HTTP/CORS
                 │ VITE_API_BASE env var
                 ↓
┌─────────────────────────────────────────────────────┐
│  Railway.app                                         │
│  https://your-app-xxx.up.railway.app                │
│  ┌────────────────────────────────────────────────┐  │
│  │  Express.js API Server                         │  │
│  │  - GET /api/groups                             │  │
│  │  - POST /api/groups                            │  │
│  │  - GET/PUT/DELETE /api/groups/:id/assets       │  │
│  │  - Bulk operations                             │  │
│  │  - Metrics & RBAC                              │  │
│  └────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## Step-by-Step: Deploy in 15 Minutes

### ✅ Status Check (Already Done)
- ✓ Code pushed to GitHub
- ✓ Build works (168K)
- ✓ API server starts on port 4000
- ✓ GitHub Actions workflows ready

---

### 1️⃣ Deploy Frontend to Netlify (5 min)

**OPEN THIS LINK:**
```
https://app.netlify.com/start
```

**Follow these steps:**
1. Click "Connect to GitHub"
2. Select `akshaya798/ReminderAI`
3. Build settings (auto-filled):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click "Deploy site"
5. Wait 2-3 minutes
6. You'll get a URL like: `https://xxx.netlify.app`

**After deployment:**
- Copy this URL (you'll need it later)
- Your frontend is now LIVE

---

### 2️⃣ Deploy Backend to Railway (5 min)

**OPEN THIS LINK:**
```
https://railway.app
```

**Follow these steps:**
1. Click "Start New Project"
2. Select "Deploy from GitHub repo"
3. Select `akshaya798/ReminderAI`
4. Railway auto-detects Node.js
5. Wait 2-3 minutes for deployment
6. Click on your project → Settings
7. You'll see a URL like: `https://your-app-xxx.up.railway.app`

**After deployment:**
- Copy this URL
- Your API is now LIVE

---

### 3️⃣ Get Your Tokens (2 min)

**Netlify Token:**
1. Open: https://app.netlify.com/user/applications/personal-access-tokens
2. Click "New access token"
3. Give it a name like "GitHub Actions"
4. Copy the token (you'll only see it once!)
5. Save it somewhere safe

**Netlify Site ID:**
1. Go back to Netlify dashboard
2. Click on your site
3. Site settings → General
4. Look for "Site ID" (long string like `abc123-def456`)
5. Copy it

**Railway Token:**
1. Open: https://railway.app/account/tokens
2. Click "Create token"
3. Name it "GitHub Actions"
4. Copy the token
5. Save it

---

### 4️⃣ Add GitHub Secrets (3 min) — THIS ENABLES AUTO-DEPLOY

**OPEN THIS LINK:**
```
https://github.com/akshaya798/ReminderAI/settings/secrets/actions
```

**Add 3 New Secrets:**

**First secret:**
- Name: `NETLIFY_AUTH_TOKEN`
- Value: (paste your Netlify token from step 3)
- Click "Add secret"

**Second secret:**
- Name: `NETLIFY_SITE_ID`
- Value: (paste your Site ID from step 3)
- Click "Add secret"

**Third secret:**
- Name: `RAILWAY_TOKEN`
- Value: (paste your Railway token from step 3)
- Click "Add secret"

✅ **Auto-deploy is now enabled!** Every push to `main` will auto-deploy.

---

### 5️⃣ Link Backend to Frontend (1 min)

**Go to Netlify dashboard:**
1. Click on your site
2. Site settings → Build & deploy → Environment variables
3. Click "Add environment variable"

**Add this variable:**
- Key: `VITE_API_BASE`
- Value: `https://your-app-xxx.up.railway.app` (from step 2)

4. Save
5. Go to Deployments → Click "Deploy site" to trigger redeploy

Wait 2-3 minutes for redeploy to complete.

---

### 6️⃣ Test It Works! (2 min)

1. **Open your Netlify URL** in browser:
   - `https://xxx.netlify.app`

2. **You should see:**
   - "AMC Reminder & Escalation" header
   - Groups panel on the left
   - "Default Group" listed
   - Metrics showing on the right

3. **Test creating a group:**
   - Type a name
   - Click "Create"
   - Should appear immediately

4. **Test creating an asset:**
   - Click on a group
   - Type asset name
   - Click "Create Asset"
   - Should appear in the list

5. **If something doesn't work:**
   - Open DevTools (F12)
   - Look at Console tab for errors
   - Common issue: `VITE_API_BASE` not set correctly
   - Check that Railway URL is correct

---

## 🎉 You're Done!

Your app is now:
- ✅ Live on Netlify
- ✅ API running on Railway
- ✅ Auto-deploy enabled
- ✅ Ready for users

**Share your Netlify URL with anyone!**

---

## Future Pushes

Every time you push to `main`:
```bash
git add .
git commit -m "Your message"
git push origin main
```

GitHub Actions will automatically:
1. Build frontend → Deploy to Netlify (2-5 min)
2. Start backend → Deploy to Railway (2-5 min)

No manual steps needed! 🚀

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Groups not loading" | Check `VITE_API_BASE` is set in Netlify env vars |
| "API returns 403" | Wrong `x-user-role` header (role selector in UI should fix it) |
| "Build fails on Netlify" | Check `netlify.toml` exists and has correct `publish = "dist"` |
| "Railway shows error" | Check logs: Railway → Project → Logs |
| "Auto-deploy not working" | Check GitHub Secrets are added correctly |

---

**Questions?** Read `DEPLOY.md` for detailed explanations or `DEPLOY_CHECKLIST.md` to track progress.
