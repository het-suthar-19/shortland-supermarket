# 📋 Complete Step-by-Step Setup Guide

Follow these steps **in order** to get your Softland Supermarket application fully working.

## ✅ Step 1: Verify Backend is Running

Your backend should be running on `http://localhost:5000`

**Check**: Open a browser and go to: `http://localhost:5000/api/health`

You should see:

```json
{ "status": "ok", "message": "Softland API is running" }
```

If you see this, ✅ **Step 1 is complete!**

---

## ✅ Step 2: Verify Frontend is Running

Your frontend should be running on `http://localhost:5173`

**Check**: Open a browser and go to: `http://localhost:5173`

You should see the Softland homepage with:

- Hero section
- Today's Discounts
- Categories

If you see this, ✅ **Step 2 is complete!**

---

## 🔧 Step 3: Create Backend .env File (If Not Done)

1. Navigate to the `backend` folder
2. Create a file named `.env` (no extension)
3. Add this content:

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

**Important**:

- If your PostgreSQL password is NOT `root`, change it in `DATABASE_URL`
- If your PostgreSQL username is NOT `postgres`, change it too

---

## 🗄️ Step 4: Create PostgreSQL Database

### Option A: Using pgAdmin (GUI)

1. Open **pgAdmin**
2. Right-click on **Databases** → **Create** → **Database**
3. Name: `softland`
4. Click **Save**

### Option B: Using psql (Command Line)

1. Open Command Prompt or PowerShell
2. Run:

```bash
psql -U postgres
```

3. Enter your PostgreSQL password
4. Run:

```sql
CREATE DATABASE softland;
```

5. Exit: `\q`

---

## 🔨 Step 5: Generate Prisma Client

1. Open a **NEW terminal** (keep backend running in the first terminal)
2. Navigate to backend folder:

```bash
cd backend
```

3. Run:

```bash
npm run prisma:generate
```

**Expected output**:

```
✔ Generated Prisma Client
```

✅ **Step 5 complete!**

---

## 📊 Step 6: Run Database Migrations

In the same terminal (backend folder), run:

```bash
npm run prisma:migrate
```

**What this does**: Creates all database tables (User, Product, Category, Order, OrderItem)

**Expected output**:

```
✔ Migration completed
```

When prompted for a migration name, just press Enter (or type "init")

✅ **Step 6 complete!**

---

## 🌱 Step 7: Seed the Database

In the same terminal, run:

```bash
npm run prisma:seed
```

**What this does**:

- Creates admin user (admin@softland.com / root)
- Creates 8 categories
- Creates 16 sample products

**Expected output**:

```
🌱 Starting seed...
✅ Admin user created: admin@softland.com
✅ Categories created: 8
✅ Products created: 16
🎉 Seed completed successfully!
```

✅ **Step 7 complete!**

---

## 🎉 Step 8: Test the Application

### 8.1 Test Frontend

1. Go to: `http://localhost:5173`
2. You should see:
   - Homepage with products
   - Categories section
   - Discount items

### 8.2 Test User Registration

1. Click **Register** (top right)
2. Fill in:
   - Name: Your Name
   - Email: your@email.com
   - Password: password123
3. Click **Register**
4. You should be automatically logged in

### 8.3 Test Shopping

1. Browse products on homepage
2. Click on any product card
3. Click **Add to Cart**
4. Click the cart icon (top right) - you should see items
5. Adjust quantities or remove items
6. Click **Proceed to Checkout**

### 8.4 Test Checkout

1. Review your order
2. Click **Place Order**
3. You should see "Order Placed Successfully!"

### 8.5 Test Admin Login

1. Click **Logout** (if logged in)
2. You need to login as admin
3. Since there's no admin login page, you can:
   - Use the API directly, OR
   - Register a new user and manually change role in database

**Better Option**: Test admin via API or create admin login page

---

## 🔐 Step 9: Login as Admin (Optional)

### Option A: Use API (Recommended for Testing)

1. Open Postman or use curl:

```bash
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@softland.com","password":"root"}'
```

2. Copy the token from response
3. Use it in API requests

### Option B: Create Admin Login (We can add this)

I can create an admin login page if you want.

---

## 📱 Step 10: Test Admin Dashboard

1. Login as admin (using the token from Step 9)
2. Go to: `http://localhost:5173/admin`
3. You should see:
   - Dashboard with statistics
   - Quick action buttons

### Test Admin Features:

1. **Manage Products**:

   - Go to `/admin/products`
   - Click **Add Product**
   - Fill in product details
   - Click **Create**

2. **Manage Categories**:

   - Go to `/admin/categories`
   - Click **Add Category**
   - Enter category name
   - Click **Create**

3. **Manage Orders**:
   - Go to `/admin/orders`
   - You should see orders placed by users
   - Click **Accept** or **Decline** on pending orders
   - Click **Mark as Delivered** on accepted orders

---

## 🎯 Step 11: Test Real-Time Features

### Test Order Tracking:

1. **As Customer**:

   - Place an order (logged in)
   - Go to `/orders`
   - You should see your order with status "Pending"

2. **As Admin** (in another browser/incognito):

   - Login as admin
   - Go to `/admin/orders`
   - Click **Accept** on the pending order

3. **Back to Customer**:
   - Refresh `/orders` page
   - Order status should update to "Accepted" (real-time!)

---

## ✅ Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] `.env` file created in backend folder
- [ ] PostgreSQL database `softland` created
- [ ] Prisma Client generated
- [ ] Database migrations run
- [ ] Database seeded with sample data
- [ ] Can browse products on homepage
- [ ] Can register new user
- [ ] Can add products to cart
- [ ] Can place order
- [ ] Can login as admin
- [ ] Can access admin dashboard
- [ ] Can manage products/categories/orders
- [ ] Real-time order updates working

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to database"

- Check PostgreSQL is running
- Verify DATABASE_URL in `.env` is correct
- Make sure database `softland` exists

### Issue: "Prisma Client not generated"

- Run: `cd backend && npm run prisma:generate`

### Issue: "No products showing"

- Run: `cd backend && npm run prisma:seed`

### Issue: "Cannot login as admin"

- Default credentials: `admin@softland.com` / `root`
- Or check `.env` for `ADMIN_USER` and `ADMIN_PASS`

### Issue: "Port already in use"

- Backend: Change `PORT=5000` to `PORT=5001` in `.env`
- Frontend: Kill process or change port in `vite.config.js`

---

## 🎊 You're All Set!

Your Softland Supermarket application is now fully functional!

**Default Admin Credentials:**

- Email: `admin@softland.com`
- Password: `root`

**Next Steps:**

- Customize products and categories
- Add more features
- Deploy to production

Need help with anything? Let me know!
