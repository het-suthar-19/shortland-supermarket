# 🚀 Quick Start Guide

Follow these steps **in order** to get the application running.

## Step 1: Create Backend .env File

Create a file named `.env` in the `backend` folder with this content:

```env
DATABASE_URL="postgresql://postgres:root@localhost:5432/softland?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
ADMIN_USER="admin@softland.com"
ADMIN_PASS="root"
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

**Important**: Change the `DATABASE_URL` if your PostgreSQL password is different from `admin`.

## Step 2: Create Database

Open PostgreSQL (pgAdmin or psql) and run:

```sql
CREATE DATABASE softland;
```

## Step 3: Setup Backend

Open a terminal in the project root and run:

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

You should see: `🚀 Server running on port 5000`

**Keep this terminal open!**

## Step 4: Setup Frontend

Open a **NEW** terminal in the project root and run:

```bash
cd frontend
npm install
npm run dev
```

You should see: `Local: http://localhost:5173/`

## Step 5: Access Application

- **Frontend**: Open http://localhost:5173 in your browser
- **Backend API**: http://localhost:5000/api/health

## Admin Login

- **Email**: `admin@softland.com`
- **Password**: `root`

## Common Errors & Fixes

### Error: "Cannot find module"

**Fix**: Run `npm install` in the respective folder

### Error: "database does not exist"

**Fix**: Create the database (Step 2)

### Error: "Port already in use"

**Fix**:

- Backend: Change `PORT=5000` to `PORT=5001` in `.env`
- Frontend: Kill the process using port 5173

### Error: "Prisma Client not generated"

**Fix**: Run `npm run prisma:generate` in backend folder

## Still Having Issues?

1. Make sure Node.js is installed: `node --version` (should be 18+)
2. Make sure PostgreSQL is running
3. Check that all files are in the correct folders
4. See `TROUBLESHOOTING.md` for more help
