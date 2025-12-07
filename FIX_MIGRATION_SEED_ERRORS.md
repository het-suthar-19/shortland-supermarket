# Fix Migration & Seed Errors

## Common Migration Errors

### Error 1: "Database does not exist"

**Error**: `database "softland" does not exist`

**Fix**:

1. Open PostgreSQL (pgAdmin or psql)
2. Create database:

```sql
CREATE DATABASE softland;
```

### Error 2: "Connection refused" or "Password authentication failed"

**Error**: `P1001: Can't reach database server` or `P1000: Authentication failed`

**Fix**:

1. Check PostgreSQL is running
2. Verify `.env` file has correct credentials:

```env
DATABASE_URL="postgresql://postgres:root@localhost:5432/softland?schema=public"
```

3. Test connection:

```bash
psql -U postgres -d softland
```

### Error 3: "Migration already applied"

**Error**: `Migration ... is already applied`

**Fix**:

```bash
# Reset database (WARNING: Deletes all data!)
npm run prisma:migrate reset

# Or create new migration
npm run prisma:migrate dev --name new_migration
```

### Error 4: "Table already exists"

**Error**: `relation "users" already exists`

**Fix**:

```bash
# Option 1: Reset and re-migrate
npm run prisma:migrate reset

# Option 2: Mark migration as applied
npm run prisma:migrate resolve --applied <migration_name>
```

---

## Common Seed Errors

### Error 1: "Unique constraint violation"

**Error**: `Unique constraint failed on the fields: (email)` or `(name)`

**Fix**:

- Seed file now handles duplicates properly
- If error persists, clear existing data:

```bash
# In psql or pgAdmin
TRUNCATE TABLE users, categories, products, orders, order_items CASCADE;
```

Then run seed again.

### Error 2: "Foreign key constraint violation"

**Error**: `Foreign key constraint failed`

**Fix**:

- Make sure categories are created before products
- Seed file already handles this correctly
- If error persists, check migration ran successfully

### Error 3: "Cannot find module '@prisma/client'"

**Error**: `Cannot find module '@prisma/client'`

**Fix**:

```bash
npm run prisma:generate
```

### Error 4: "bcrypt error"

**Error**: `bcrypt` related errors

**Fix**:

```bash
npm install bcrypt
```

---

## Step-by-Step Fix Process

### If Migration Fails:

1. **Check database exists**:

```sql
-- In psql
\l
-- Look for "softland" database
```

2. **Check connection**:

```bash
# Test connection
psql -U postgres -d softland
```

3. **Reset if needed** (WARNING: Deletes data):

```bash
cd backend
npm run prisma:migrate reset
```

4. **Run migration again**:

```bash
npm run prisma:migrate dev
```

### If Seed Fails:

1. **Check Prisma Client generated**:

```bash
npm run prisma:generate
```

2. **Check migration completed**:

```bash
# Should show migration applied
npm run prisma:migrate status
```

3. **Clear existing data** (if needed):

```sql
-- In psql or pgAdmin
TRUNCATE TABLE users, categories, products, orders, order_items CASCADE;
```

4. **Run seed again**:

```bash
npm run prisma:seed
```

---

## Complete Reset (Nuclear Option)

If nothing works, completely reset:

```bash
cd backend

# 1. Drop and recreate database
# In psql:
DROP DATABASE softland;
CREATE DATABASE softland;

# 2. Delete migrations folder (optional)
# rmdir /s /q prisma\migrations

# 3. Generate Prisma Client
npm run prisma:generate

# 4. Create fresh migration
npm run prisma:migrate dev --name init

# 5. Seed database
npm run prisma:seed
```

---

## Verify Everything Works

After migration and seed:

1. **Check tables exist**:

```sql
-- In psql
\dt
-- Should show: users, categories, products, orders, order_items
```

2. **Check data seeded**:

```sql
SELECT COUNT(*) FROM users; -- Should be 1 (admin)
SELECT COUNT(*) FROM categories; -- Should be 8
SELECT COUNT(*) FROM products; -- Should be 16
```

3. **Test API**:

```bash
# Should return admin user
curl http://localhost:5000/api/health
```

---

## Still Having Issues?

Share the **exact error message** from your terminal and I'll help fix it!
