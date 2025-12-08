import { useEffect, useState } from "react";
import { ordersAPI } from "../../lib/api";
import { CheckCircle, XCircle, Package } from "lucide-react";

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
  accepted: { color: "bg-blue-100 text-blue-800", label: "Accepted" },
  declined: { color: "bg-red-100 text-red-800", label: "Declined" },
  delivered: { color: "bg-green-100 text-green-800", label: "Delivered" },
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();

    // Poll for updates every 15 seconds
    const interval = setInterval(fetchOrders, 15000);

    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await ordersAPI.getAll();
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await ordersAPI.updateStatus(orderId, status);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-black mb-8">Manage Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Package className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-black mb-2">
              No orders yet
            </h2>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const status = statusConfig[order.status] || statusConfig.pending;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-black">
                        Order #{order.id.slice(0, 8)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Customer: {order.user?.name} ({order.user?.email})
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${status.color}`}
                      >
                        {status.label}
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        ${order.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    {order.orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-2 border-b"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={
                              item.product?.image ||
                              "https://via.placeholder.com/400"
                            }
                            alt={item.product?.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-semibold">
                              {item.product?.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {order.status === "pending" && (
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => updateOrderStatus(order.id, "accepted")}
                        className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, "declined")}
                        className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        <XCircle className="w-5 h-5" />
                        <span>Decline</span>
                      </button>
                    </div>
                  )}

                  {order.status === "accepted" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "delivered")}
                      className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
                    >
                      <Package className="w-5 h-5" />
                      <span>Mark as Delivered</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

