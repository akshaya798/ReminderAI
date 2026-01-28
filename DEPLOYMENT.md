# Deployment Guide

## Frontend Deployment to Netlify ✅

### Option 1: Netlify Web UI (Easiest)

1. **Push code to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Add multi-level architecture and Netlify config"
   git push origin main
   ```

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com) and sign in with GitHub
   - Click "New site from Git"
   - Select your `akshaya798/ReminderAI` repository
   - Build settings will auto-detect:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Click "Deploy site"
   - Netlify will auto-deploy on future pushes to `main`

### Option 2: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

---

## Backend Deployment Options

Since your app has an Express API server, you need to deploy it separately. Choose one:

### Option A: Railway.app (Recommended - Easy)
- Sign up at [railway.app](https://railway.app)
- Connect your GitHub repo
- Railway detects Node.js and auto-deploys
- Get your API URL from the Railway dashboard
- Update `vite.config.ts` or set env var: `VITE_API_BASE=https://your-railway-url.railway.app`

### Option B: Heroku (Classic)
```bash
brew tap heroku/brew && brew install heroku
heroku login
heroku create your-app-name
git push heroku main
heroku logs --tail
```
- Get the API URL: `https://your-app-name.herokuapp.com`

### Option C: DigitalOcean App Platform
- Create App Platform > Connect GitHub repo
- Set **Run Command**: `npm run start:api`
- Deploy and get the URL

### Option D: Vercel (Functions)
- Vercel supports Node.js backends
- Deploy via `vercel` CLI

---

## Environment Variables

Once you have your backend URL, update the frontend:

**Option 1: During build** (add to Netlify env vars):
```
VITE_API_BASE=https://your-api-server.com
```

**Option 2: Runtime** (update `src/api.ts`):
```typescript
const BASE = (typeof window !== 'undefined' && (window as any).__API_BASE) || 
             import.meta.env.VITE_API_BASE || 
             'http://localhost:4000'
```

**Option 3: .env file** (dev only):
```
VITE_API_BASE=https://your-api-server.com
```

---

## Quick Start: Full Stack on Railway

1. **Connect GitHub** on railway.app with this repo
2. **Create a PostgreSQL add-on** (optional, for persistence)
3. **Add two services**:
   - **Frontend**: Publish `dist/` to a static host, OR use Netlify (steps above)
   - **Backend**: Auto-deploy Node server with `npm run start:api`
4. **Link services**: Frontend requests to backend via Railway private network

---

## Troubleshooting

**CORS errors?**
- Ensure API server has CORS enabled (✅ it does in `server/index.js`)
- Frontend and backend URLs match `VITE_API_BASE`

**API not found?**
- Check `src/api.ts` — `BASE` URL must point to running backend
- Test API directly: `curl http://your-backend/api/groups`

**Build fails?**
- Run locally: `npm run build`
- Check Node version: `node --version` (needs ≥18)
- Check `netlify.toml` — points to correct directories

---

## Summary

| Component | Hosting | Command |
|-----------|---------|---------|
| Frontend | Netlify | `npm run build` → `dist/` |
| API | Railway / Heroku / DO | `npm run start:api` |

**Recommended setup**: Netlify (frontend) + Railway (backend) = ~5 minutes to deploy.
