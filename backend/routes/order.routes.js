import express from "express";
import { authenticate, isAdmin } from "../middleware/auth.middleware.js";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../services/order.service.js";

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const userId = req.user.userId;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Order items are required" });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ error: "Valid total amount is required" });
    }

    const order = await createOrder(userId, items, totalAmount);

    // Emit socket event to notify admin
    const io = req.app.get("io");
    if (io) {
      // Notify admin about new order
      io.emit("newOrderForAdmin", order);

      // Notify customer that order was placed
      io.to(`user:${userId}`).emit("orderPlaced", order);

      // Subscribe customer to this order's updates
      io.to(`user:${userId}`).emit("subscribeToOrder", order.id);
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/user/:userId", authenticate, async (req, res) => {
  try {
    const { userId } = req.params;

    // Users can only see their own orders
    if (req.user.userId !== userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const orders = await getUserOrders(userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", authenticate, isAdmin, async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:orderId/status", authenticate, isAdmin, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "accepted", "declined", "delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await updateOrderStatus(orderId, status);

    // Emit socket event to notify customer
    const io = req.app.get("io");
    if (io) {
      // Emit to order-specific room
      io.to(`order:${orderId}`).emit(
        `order${status.charAt(0).toUpperCase() + status.slice(1)}`,
        order
      );

      // Also emit to user's personal room for better targeting
      io.to(`user:${order.userId}`).emit("orderStatusUpdated", {
        orderId: order.id,
        status: order.status,
        order: order,
      });

      // Emit specific events for better frontend handling
      if (status === "accepted") {
        io.to(`user:${order.userId}`).emit("orderAccepted", order);
      } else if (status === "declined") {
        io.to(`user:${order.userId}`).emit("orderDeclined", order);
      } else if (status === "delivered") {
        io.to(`user:${order.userId}`).emit("orderDelivered", order);
      }
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
