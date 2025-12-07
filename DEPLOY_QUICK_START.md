# ⚡ Quick Deploy Guide (5 Minutes)

## Fastest Free Deployment Path

### Step 1: Database (2 min)

1. Go to [supabase.com](https://supabase.com) → Sign up
2. Create new project → Name: `softland`
3. Copy connection string from Settings → Database
4. ✅ Done!

### Step 2: Backend (2 min)

1. Go to [render.com](https://render.com) → Sign up
2. New → Web Service → Connect GitHub
3. Select your repo → Root Directory: `backend`
4. Add environment variables:
   - `DATABASE_URL` = (from Supabase)
   - `JWT_SECRET` = any random string
   - `FRONTEND_URL` = (we'll add after frontend deploys)
   - `PORT` = 10000
5. Deploy → Wait 5 minutes
6. Get URL: `https://your-backend.onrender.com`
7. ✅ Done!

### Step 3: Frontend (1 min)

1. Go to [vercel.com](https://vercel.com) → Sign up
2. Add New Project → Import GitHub repo
3. Root Directory: `frontend`
4. Environment Variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
5. Deploy → Wait 2 minutes
6. Get URL: `https://your-app.vercel.app`
7. ✅ Done!

### Step 4: Update Backend

1. Go back to Render backend settings
2. Update `FRONTEND_URL` = `https://your-app.vercel.app`
3. Redeploy backend

### Step 5: Run Migrations

1. In Render, go to your backend service
2. Click "Shell" or "Console"
3. Run:

```bash
npm run prisma:migrate deploy
npm run prisma:seed
```

### ✅ You're Live!

**Frontend**: `https://your-app.vercel.app`  
**Backend**: `https://your-backend.onrender.com`  
**Database**: Supabase (managed)

---

## 🎯 Total Cost: $0/month

All free tiers are generous enough for development and small projects!
