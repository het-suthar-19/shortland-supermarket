# Troubleshooting Guide

## Backend Not Starting

### Check 1: Missing .env file

**Error**: `Cannot find module` or database connection errors

**Fix**: Create `backend/.env` file with:

```env
DATABASE_URL="postgresql://postgres:admin@localhost:5432/softland?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
ADMIN_USER="admin@softland.com"
ADMIN_PASS="root"
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

### Check 2: Dependencies not installed

**Error**: `Cannot find module 'express'` or similar

**Fix**:

```bash
cd backend
npm install
```

### Check 3: Prisma Client not generated

**Error**: `Cannot find module '@prisma/client'`

**Fix**:

```bash
cd backend
npm run prisma:generate
```

### Check 4: Database not created

**Error**: `database "softland" does not exist`

**Fix**:

1. Open PostgreSQL (pgAdmin or psql)
2. Create database:

```sql
CREATE DATABASE softland;
```

### Check 5: Database migrations not run

**Error**: `Table does not exist`

**Fix**:

```bash
cd backend
npm run prisma:migrate
```

### Check 6: Port already in use

**Error**: `EADDRINUSE: address already in use :::5000`

**Fix**:

- Change PORT in `.env` to another port (e.g., 5001)
- Or kill the process using port 5000

## Frontend Not Starting

### Check 1: Dependencies not installed

**Error**: `Cannot find module 'react'` or similar

**Fix**:

```bash
cd frontend
npm install
```

### Check 2: Port already in use

**Error**: `Port 5173 is already in use`

**Fix**:

- Change port in `vite.config.js`
- Or use: `npm run dev -- --port 3000`

### Check 3: Vite configuration issue

**Error**: Build or dev server errors

**Fix**: Check `vite.config.js` exists and is correct

## Quick Fix Commands

### Backend Reset:

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

### Frontend Reset:

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Windows Specific Issues

### Issue: `'npm' is not recognized`

**Fix**: Install Node.js from nodejs.org

### Issue: `'psql' is not recognized`

**Fix**:

- Install PostgreSQL from postgresql.org
- Or use pgAdmin to create database

### Issue: Scripts not running

**Fix**: Use Git Bash or PowerShell, not CMD

## Still Not Working?

1. Check Node.js version: `node --version` (should be 18+)
2. Check npm version: `npm --version`
3. Check PostgreSQL is running
4. Check all files exist in correct locations
5. Check console for specific error messages
