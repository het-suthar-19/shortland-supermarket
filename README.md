- **React 18** with Vite
- **TailwindCSS** for styling
- **React Router** for navigation
- **Zustand** for state management
- **Axios** for API calls
- **Socket.io-client** for real-time updates
- **Lucide React** for icons

### Backend

- **Node.js** with Express
- **PostgreSQL** database
- **Prisma ORM** for database management
- **JWT** for authentication
- **bcrypt** for password hashing
- **Socket.io** for real-time communication

## 📋 Features

### Customer Features

- ✅ Browse products with search and category filters
- ✅ View discount items
- ✅ Shopping cart with add/remove functionality
- ✅ Checkout with COD payment
- ✅ Real-time order tracking
- ✅ User authentication (login/register)

### Admin Features

- ✅ Products CRUD operations
- ✅ Categories CRUD operations
- ✅ Real-time orders management
- ✅ Accept/Decline orders
- ✅ Mark orders as delivered
- ✅ Analytics dashboard

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory:

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

4. Generate Prisma client:

```bash
npm run prisma:generate
```

5. Run database migrations:

```bash
npm run prisma:migrate
```

6. Seed the database:

```bash
npm run prisma:seed
```

7. Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):

```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
softland/
├── backend/
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── product.routes.js
│   │   ├── category.routes.js
│   │   └── order.routes.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── product.service.js
│   │   ├── category.service.js
│   │   └── order.service.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   └── admin/
│   │   ├── store/
│   │   ├── lib/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 🔐 Default Admin Credentials

After seeding the database, you can login with:

- **Email**: `admin@softland.com` (or the value from `ADMIN_USER` in .env)
- **Password**: `root` (or the value from `ADMIN_PASS` in .env)

## 🎨 Design Features

- Modern, clean UI with glassmorphism effects
- Smooth animations and transitions
- Responsive design (mobile-friendly)
- Premium product cards
- Elegant dashboard design
- Color scheme: White, Black, Red (#e10600)

## 🔌 API Endpoints

### Auth

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login

### Products

- `GET /api/products` - Get all products (with pagination, search, category filter)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:categoryId` - Get products by category
- `GET /api/products/discounts` - Get discount products
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### Orders

- `POST /api/orders` - Create order (authenticated)
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders` - Get all orders (admin only)
- `PUT /api/orders/:orderId/status` - Update order status (admin only)

## 🔄 Real-time Features (Socket.io)

### Client Events

- `subscribeOrderUpdates` - Subscribe to order status updates

### Server Events

- `newOrderForAdmin` - Notify admin when new order is placed
- `orderAccepted` - Notify customer when order is accepted
- `orderDeclined` - Notify customer when order is declined
- `orderDelivered` - Notify customer when order is delivered

## 🚀 Production Deployment

### Backend

1. Set `NODE_ENV=production` in `.env`
2. Update `DATABASE_URL` to production database
3. Set a strong `JWT_SECRET`
4. Build and deploy

### Frontend

1. Update `VITE_API_URL` to production API URL
2. Build the project: `npm run build`
3. Deploy the `dist` folder to your hosting service

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

For development, both servers should run simultaneously:

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

The frontend is configured to proxy API requests to the backend.

## 🎯 Next Steps

- Add product image upload functionality
- Implement payment gateway integration
- Add email notifications
- Implement user profile management
- Add product reviews and ratings
- Add wishlist functionality
