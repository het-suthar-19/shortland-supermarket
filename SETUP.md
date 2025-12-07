# Quick Setup Guide

## Common Issues & Solutions

### Issue 1: Backend not starting

**Problem**: Missing .env file or database not connected

**Solution**:

1. Create `backend/.env` file:

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

2. Make sure PostgreSQL is running
3. Create the database:

```sql
CREATE DATABASE softland;
```

4. Install dependencies:

```bash
cd backend
npm install
```

5. Generate Prisma Client:

```bash
npm run prisma:generate
```

6. Run migrations:

```bash
npm run prisma:migrate
```

7. Seed database:

```bash
npm run prisma:seed
```

8. Start server:

```bash
npm run dev
```

### Issue 2: Frontend not starting

**Problem**: Missing dependencies or configuration

**Solution**:

1. Install dependencies:

```bash
cd frontend
npm install
```

2. (Optional) Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

3. Start dev server:

```bash
npm run dev
```

### Issue 3: "Cannot find module" errors

**Solution**:

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Issue 4: Port already in use

**Solution**:

- Backend: Change PORT in `.env` file
- Frontend: Change port in `vite.config.js` or use `npm run dev -- --port 3000`

### Issue 5: Database connection error

**Solution**:

1. Check PostgreSQL is running
2. Verify DATABASE_URL in `.env` matches your PostgreSQL credentials
3. Make sure database `softland` exists

## Step-by-Step First Time Setup

### 1. Backend Setup

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

### 2. Frontend Setup (in new terminal)

```bash
cd frontend
npm install
npm run dev
```

### 3. Access Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Admin Login: admin@softland.com / root
