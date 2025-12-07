import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { ordersAPI } from "../lib/api";
import { CheckCircle } from "lucide-react";
import { io } from "socket.io-client";

export default function Checkout() {
  const { items, getTotal, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const socketRef = useRef(null);

  const total = getTotal();

  // Set up socket connection for order updates
  useEffect(() => {
    if (isAuthenticated && user) {
      const socket = io("http://localhost:5000");
      socketRef.current = socket;

      // Subscribe to user room
      socket.emit("subscribeUserRoom", user.id);

      // Listen for order placed confirmation
      socket.on("orderPlaced", (order) => {
        setOrderId(order.id);
        setOrderPlaced(true);
        clearCart();
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [isAuthenticated, user, clearCart]);

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (items.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderItems = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.discount > 0 ? item.price - item.discount : item.price,
      }));

      const res = await ordersAPI.create({
        items: orderItems,
        totalAmount: total,
      });

      // Subscribe to this order's updates
      if (socketRef.current) {
        socketRef.current.emit("subscribeOrderUpdates", res.data.id);
        socketRef.current.emit("subscribeToOrder", res.data.id);
      }

      setOrderId(res.data.id);
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl shadow-md p-12">
            <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-6" />
            <h2 className="text-3xl font-bold text-black mb-4">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your order has been placed and will be processed shortly.
            </p>
            <p className="text-sm text-gray-500 mb-8">Order ID: {orderId}</p>
            <div className="space-x-4">
              <button
                onClick={() => navigate("/orders")}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition"
              >
                View Orders
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-black mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-black mb-4">
                Delivery Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="bg-gray-100 px-4 py-3 rounded-lg">
                    <span className="font-semibold">
                      Cash on Delivery (COD)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-black mb-4">
                Order Items
              </h2>
              <div className="space-y-4">
                {items.map((item) => {
                  const finalPrice =
                    item.discount > 0 ? item.price - item.discount : item.price;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-4 border-b"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image || "https://via.placeholder.com/400"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold">
                        ${(finalPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-black mb-4">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold text-black">Total</span>
                    <span className="text-xl font-bold text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
