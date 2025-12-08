import { useEffect, useState } from "react";
import { ordersAPI, productsAPI, categoriesAPI } from "../../lib/api";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalCategories: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, productsRes, categoriesRes] = await Promise.all([
          ordersAPI.getAll(),
          productsAPI.getAll({ limit: 1000 }),
          categoriesAPI.getAll(),
        ]);

        const orders = ordersRes.data;
        const revenue = orders
          .filter((o) => o.status === "delivered")
          .reduce((sum, o) => sum + o.totalAmount, 0);

        setStats({
          totalOrders: orders.length,
          totalProducts: productsRes.data.products.length,
          totalCategories: categoriesRes.data.length,
          totalRevenue: revenue,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Poll for updates every 5 seconds for better real-time feel
    const interval = setInterval(fetchStats, 5000);

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: ShoppingBag,
      color: "bg-green-500",
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-black mb-8">Admin Dashboard</h1>

        {loading ? (
          <div className="text-center py-16">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 glass hover:shadow-xl transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-black">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-black mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <a
                href="/admin/products"
                className="block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition text-center"
              >
                Manage Products
              </a>
              <a
                href="/admin/categories"
                className="block bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition text-center"
              >
                Manage Categories
              </a>
              <a
                href="/admin/orders"
                className="block bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition text-center"
              >
                Manage Orders
              </a>
              <a
                href="/admin/employees"
                className="block bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition text-center"
              >
                Employees
              </a>
              <a
                href="/admin/inventory"
                className="block bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition text-center"
              >
                Inventory
              </a>
              <a
                href="/admin/salary"
                className="block bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition text-center"
              >
                Salary Planning
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

