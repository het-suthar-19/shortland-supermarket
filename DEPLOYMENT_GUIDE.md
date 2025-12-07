# 🚀 Free Deployment Guide - Softland Supermarket

Complete guide to deploy your full-stack application (Frontend + Backend + Database) **100% FREE**.

## 🎯 Best Free Deployment Options

### Option 1: Vercel + Render + Supabase (Recommended) ⭐

**Why this combo:**
- ✅ Vercel: Best for React frontend (automatic deployments)
- ✅ Render: Free PostgreSQL + Node.js backend hosting
- ✅ Supabase: Free PostgreSQL alternative (easier setup)
- ✅ All have generous free tiers

---

## 📋 Step-by-Step Deployment

### Part 1: Deploy Database (PostgreSQL)

#### Option A: Supabase (Easiest) ⭐ Recommended

1. **Sign up**: Go to [supabase.com](https://supabase.com)
2. **Create Project**:
   - Click "New Project"
   - Name: `softland`
   - Database Password: (save this!)
   - Region: Choose closest to you
3. **Get Connection String**:
   - Go to Project Settings → Database
   - Copy "Connection string" → "URI"
   - Format: `postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres`
4. **Update Prisma Schema**:
   - Use the connection string in your `.env`

#### Option B: Render PostgreSQL

1. **Sign up**: Go to [render.com](https://render.com)
2. **Create Database**:
   - Click "New" → "PostgreSQL"
   - Name: `softland`
   - Database: `softland`
   - User: `softland_user`
   - Region: Choose closest
3. **Get Connection String**:
   - Go to your database dashboard
   - Copy "Internal Database URL" or "External Database URL"
4. **Update Prisma Schema**:
   - Use the connection string in your `.env`

#### Option C: Railway (Alternative)

1. **Sign up**: Go to [railway.app](https://railway.app)
2. **Create PostgreSQL**:
   - Click "New Project"
   - Add "PostgreSQL" service
3. **Get Connection String**:
   - Go to Variables tab
   - Copy `DATABASE_URL`

---

### Part 2: Deploy Backend (Node.js + Express)

#### Option A: Render (Recommended) ⭐

1. **Prepare Backend**:
   - Make sure `package.json` has `"start": "node server.js"`
   - Create `render.yaml` (optional, for easier setup)

2. **Deploy**:
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Settings:
     - **Name**: `softland-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install && npm run prisma:generate`
     - **Start Command**: `npm start`
   - **Environment Variables**:
     ```
     DATABASE_URL=your_supabase_or_render_db_url
     JWT_SECRET=your-secret-key-here
     JWT_EXPIRES_IN=7d
     ADMIN_USER=admin@softland.com
     ADMIN_PASS=root
     NODE_ENV=production
     FRONTEND_URL=https://your-frontend.vercel.app
     PORT=10000
     ```
   - Click "Create Web Service"

3. **Run Migrations**:
   - After deployment, go to Shell/Console
   - Run: `npm run prisma:migrate deploy`
   - Run: `npm run prisma:seed`

4. **Get Backend URL**:
   - Your backend will be at: `https://softland-backend.onrender.com`
   - Update frontend `.env` with this URL

#### Option B: Railway

1. **Deploy**:
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub"
   - Select your repository
   - Add service → Select `backend` folder
   - Add environment variables (same as Render)
   - Railway auto-detects Node.js

2. **Run Migrations**:
   - Use Railway's console/terminal
   - Run: `npm run prisma:migrate deploy && npm run prisma:seed`

#### Option C: Fly.io

1. **Install Fly CLI**: `npm install -g @fly/cli`
2. **Login**: `fly auth login`
3. **Create App**: `cd backend && fly launch`
4. **Deploy**: `fly deploy`

---

### Part 3: Deploy Frontend (React + Vite)

#### Option A: Vercel (Recommended) ⭐

1. **Prepare Frontend**:
   - Make sure `package.json` has build script
   - Create `vercel.json` (optional):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

2. **Deploy**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - **Settings**:
     - **Root Directory**: `frontend`
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - **Environment Variables**:
     ```
     VITE_API_URL=https://your-backend.onrender.com/api
     ```
   - Click "Deploy"

3. **Get Frontend URL**:
   - Your frontend will be at: `https://softland.vercel.app`
   - Update backend `FRONTEND_URL` env variable

#### Option B: Netlify

1. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub
   - **Settings**:
     - **Base directory**: `frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - **Environment Variables**:
     ```
     VITE_API_URL=https://your-backend.onrender.com/api
     ```
   - Click "Deploy site"

#### Option C: Cloudflare Pages

1. **Deploy**:
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Connect GitHub
   - **Settings**:
     - **Framework preset**: Vite
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
   - Add environment variables

---

## 🔧 Complete Deployment Checklist

### Before Deployment:

- [ ] Push code to GitHub
- [ ] Update all `.env` files with production URLs
- [ ] Test locally with production-like settings
- [ ] Remove `console.log` statements (optional)

### Database Setup:

- [ ] Create PostgreSQL database (Supabase/Render/Railway)
- [ ] Copy connection string
- [ ] Test connection locally

### Backend Deployment:

- [ ] Deploy backend (Render/Railway/Fly.io)
- [ ] Add all environment variables
- [ ] Run migrations: `npm run prisma:migrate deploy`
- [ ] Seed database: `npm run prisma:seed`
- [ ] Test backend URL: `https://your-backend.onrender.com/api/health`
- [ ] Update CORS settings if needed

### Frontend Deployment:

- [ ] Deploy frontend (Vercel/Netlify)
- [ ] Add `VITE_API_URL` environment variable
- [ ] Update backend `FRONTEND_URL` to frontend URL
- [ ] Test frontend URL
- [ ] Test API connection

### After Deployment:

- [ ] Test user registration
- [ ] Test login
- [ ] Test placing order
- [ ] Test admin dashboard
- [ ] Test real-time notifications

---

## 📝 Environment Variables Reference

### Backend `.env` (Production):
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
JWT_SECRET="your-super-secret-production-key"
JWT_EXPIRES_IN="7d"
ADMIN_USER="admin@softland.com"
ADMIN_PASS="root"
PORT=10000
NODE_ENV=production
FRONTEND_URL="https://your-frontend.vercel.app"
```

### Frontend `.env` (Production):
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## 🎯 Recommended Free Stack (Best Performance)

1. **Frontend**: Vercel
   - ✅ Automatic deployments
   - ✅ CDN worldwide
   - ✅ Free SSL
   - ✅ Unlimited bandwidth

2. **Backend**: Render
   - ✅ Free tier: 750 hours/month
   - ✅ Auto-sleeps after 15min inactivity (wakes on request)
   - ✅ Free SSL
   - ✅ Easy PostgreSQL setup

3. **Database**: Supabase
   - ✅ 500MB database free
   - ✅ 2GB bandwidth free
   - ✅ Easy connection
   - ✅ Built-in dashboard

**Total Cost: $0/month** 🎉

---

## ⚠️ Important Notes

### Render Free Tier Limitations:
- Backend sleeps after 15min inactivity
- First request after sleep takes ~30 seconds (cold start)
- 750 hours/month free (enough for most projects)

### Solutions for Render Sleep:
1. **Use Uptime Robot** (free):
   - Sign up at [uptimerobot.com](https://uptimerobot.com)
   - Add monitor: `https://your-backend.onrender.com/api/health`
   - Set interval: 5 minutes
   - This keeps your backend awake

2. **Or use Railway** (alternative):
   - $5/month but no sleep
   - Or use free trial credits

### Database Limitations:
- Supabase: 500MB free (plenty for small apps)
- Render PostgreSQL: 90 days free trial, then $7/month
- Railway: $5/month after free trial

---

## 🚀 Quick Deploy Commands

### Render Deployment:
```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Go to render.com and connect repo
# 3. Add environment variables
# 4. Deploy!
```

### Vercel Deployment:
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
cd frontend
vercel

# 3. Follow prompts
```

---

## 📚 Additional Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Railway Docs**: https://docs.railway.app

---

## 🎉 You're Ready to Deploy!

Follow the steps above and your app will be live for **FREE**! 

Need help with a specific step? Let me know!

