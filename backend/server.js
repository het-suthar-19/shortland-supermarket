import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import orderRoutes from "./routes/order.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Shortland API is running" });
});

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Subscribe to order updates
  socket.on("subscribeOrderUpdates", (orderId) => {
    socket.join(`order:${orderId}`);
    console.log(`Socket ${socket.id} subscribed to order:${orderId}`);
  });

  // Subscribe user to their personal room for notifications
  socket.on("subscribeUserRoom", (userId) => {
    socket.join(`user:${userId}`);
    console.log(`Socket ${socket.id} subscribed to user:${userId}`);
  });

  // Subscribe to specific order when notified
  socket.on("subscribeToOrder", (orderId) => {
    socket.join(`order:${orderId}`);
    console.log(`Socket ${socket.id} subscribed to order:${orderId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Make io available to routes
app.set("io", io);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export { io };
