# Setup GitHub Actions Auto-Deploy

To enable automatic deployment to Netlify and Railway, follow these steps:

## 1. Get Netlify Credentials

```bash
# Login to Netlify and get tokens
netlify login

# OR create a personal access token at:
# https://app.netlify.com/user/applications#personal-access-tokens

# Get your Site ID from:
# https://app.netlify.com/sites/your-site-name/settings/general
```

## 2. Get Railway Token

```bash
# Login to Railway
railway login

# Get your token at:
# https://railway.app/account/tokens
```

## 3. Add Secrets to GitHub

Go to: `https://github.com/akshaya798/ReminderAI/settings/secrets/actions`

Add these secrets:

| Secret Name | Value |
|---|---|
| `NETLIFY_AUTH_TOKEN` | Your Netlify personal access token |
| `NETLIFY_SITE_ID` | Your Netlify site ID |
| `RAILWAY_TOKEN` | Your Railway API token |

## 4. Verify Workflows

Check: `https://github.com/akshaya798/ReminderAI/actions`

You should see two workflows:
- ✅ Deploy Frontend to Netlify
- ✅ Deploy Backend to Railway

## 5. Test Deploy

Push a commit to `main`:
```bash
git add .
git commit -m "Enable GitHub Actions auto-deploy"
git push origin main
```

Watch the Actions tab — both workflows will run automatically!

## Environment Variables for Frontend

Once Railway backend is deployed, you need to link the API URL to the frontend.

**In Netlify Build Environment Variables**:
```
VITE_API_BASE=https://your-railway-backend-url.up.railway.app
```

Set this in Netlify dashboard → Site Settings → Build & Deploy → Environment.

---

## Troubleshooting

**Netlify deploy fails?**
- Ensure `NETLIFY_SITE_ID` is correct (not the site name)
- Check `netlify.toml` exists with correct `publish = "dist"`

**Railway deploy fails?**
- Ensure Railway project exists at https://railway.app
- Check `RAILWAY_TOKEN` is valid
- Railway may need `railway.json` for multi-service setup

**API not connecting?**
- Check `VITE_API_BASE` environment variable is set
- Frontend should make requests to Railway backend URL

---

## Manual Deploy (if needed)

**Netlify CLI**:
```bash
npm run build
netlify deploy --prod --dir=dist --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
```

**Railway CLI**:
```bash
railway login
railway up --service backend
```
