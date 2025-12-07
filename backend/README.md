# Shortland Backend API

Express.js backend API for Softland Supermarket application.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env`:

```env
DATABASE_URL="postgresql://postgres:admin@localhost:5432/softland?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
ADMIN_USER="admin@softland.com"
ADMIN_PASS="root"
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

3. Generate Prisma Client:

```bash
npm run prisma:generate
```

4. Run migrations:

```bash
npm run prisma:migrate
```

5. Seed database:

```bash
npm run prisma:seed
```

6. Start server:

```bash
npm run dev
```

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed database with sample data
- `npm run prisma:studio` - Open Prisma Studio

## API Documentation

See main README.md for API endpoint documentation.
