# ☑️ DEPLOYMENT CHECKLIST (Follow This!)

Use this to track your progress. Check off each box as you complete it.

---

## ✅ SETUP (You Already Did This!)
- [x] Code is pushed to GitHub
- [x] Build works locally
- [x] API server works locally

---

## 📝 PART 1: NETLIFY SIGNUP & FRONTEND DEPLOY

- [ ] Opened https://app.netlify.com/start
- [ ] Clicked "Connect to GitHub"
- [ ] Authorized Netlify with my GitHub account
- [ ] Selected my repo: akshaya798/ReminderAI
- [ ] Saw build command: `npm run build`
- [ ] Saw publish dir: `dist`
- [ ] Clicked "Deploy site"
- [ ] **Waited 2-3 minutes for deployment**
- [ ] ✅ Site is live! Got this URL:
  ```
  https://________________.netlify.app
  ```

**MY NETLIFY URL:** (save this!)
```
https://________________.netlify.app
```

---

## 📝 PART 2: RAILWAY SIGNUP & BACKEND DEPLOY

- [ ] Opened https://railway.app
- [ ] Clicked "Continue with GitHub"
- [ ] Authorized Railway with my GitHub account
- [ ] Created new project
- [ ] Selected "Deploy from GitHub repo"
- [ ] Selected my repo: akshaya798/ReminderAI
- [ ] **Waited 2-3 minutes for deployment**
- [ ] ✅ Deployment complete! Got this URL:
  ```
  https://your-app-___.up.railway.app
  ```

**MY RAILWAY URL:** (save this!)
```
https://your-app-___.up.railway.app
```

---

## 📝 PART 3: GET TOKENS

### Netlify Token
- [ ] Opened https://app.netlify.com/user/applications/personal-access-tokens
- [ ] Clicked "New access token"
- [ ] Named it `github-actions`
- [ ] Copied the token

**NETLIFY_AUTH_TOKEN:**
```
[paste your token here]
```

### Netlify Site ID
- [ ] Went back to Netlify dashboard
- [ ] Clicked on my site
- [ ] Opened Site settings → General
- [ ] Found "Site ID" and copied it

**NETLIFY_SITE_ID:**
```
[paste your site ID here]
```

### Railway Token
- [ ] Opened https://railway.app/account/tokens
- [ ] Clicked "Create token"
- [ ] Named it `github-actions`
- [ ] Copied the token

**RAILWAY_TOKEN:**
```
[paste your token here]
```

---

## 📝 PART 4: ADD GITHUB SECRETS

Opened: https://github.com/akshaya798/ReminderAI/settings/secrets/actions

- [ ] Added secret #1:
  - Name: `NETLIFY_AUTH_TOKEN`
  - Value: [your Netlify token from Part 3]

- [ ] Added secret #2:
  - Name: `NETLIFY_SITE_ID`
  - Value: [your Site ID from Part 3]

- [ ] Added secret #3:
  - Name: `RAILWAY_TOKEN`
  - Value: [your Railway token from Part 3]

- [ ] Can see all 3 secrets listed on the page ✅

---

## 📝 PART 5: LINK API TO FRONTEND

- [ ] Opened Netlify dashboard
- [ ] Clicked on my site
- [ ] Opened Site settings → Build & deploy → Environment
- [ ] Added environment variable:
  - Key: `VITE_API_BASE`
  - Value: `https://your-app-___.up.railway.app` (from Part 2)
- [ ] Saved the variable
- [ ] Went to Deployments tab
- [ ] Clicked "Deploy site" to redeploy
- [ ] **Waited 2-3 minutes for redeploy**

---

## 📝 PART 6: TEST IT! 

- [ ] Opened my Netlify URL in browser
- [ ] Saw "AMC Reminder & Escalation" title
- [ ] Saw Groups list on the left
- [ ] Saw "Default Group" in the list
- [ ] Saw metrics on the right side
- [ ] Tried creating a new group:
  - [ ] Typed a group name
  - [ ] Clicked "Create"
  - [ ] Group appeared in the list
- [ ] Clicked on a group to see details
- [ ] Tried creating an asset:
  - [ ] Typed asset name
  - [ ] Clicked "Create Asset"
  - [ ] Asset appeared in the list
- [ ] ✅ Everything works!

---

## 🎉 DONE!

**Your live URL:**
```
https://________________.netlify.app
```

**Share this URL with anyone to show them your app!**

---

## ⚡ Auto-Deploy Now Works

From now on, every time you push to GitHub:
```bash
git push origin main
```

Your app automatically:
- Rebuilds on Netlify (2-5 min)
- Restarts on Railway (2-5 min)

No manual steps needed! 🚀

---

## 🆘 NEED HELP?

Got stuck on a step? Reply with:
1. Which part/step you're on
2. The exact error message (if any)
3. A screenshot (if helpful)

I'll help you fix it! 💪
