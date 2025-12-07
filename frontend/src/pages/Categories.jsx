import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoriesAPI } from "../lib/api";
import { ShoppingBag } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoriesAPI.getAll();
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-black mb-8">All Categories</h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl h-48 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 p-8 text-center"
              >
                <div className="glass-dark rounded-lg p-6 mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-12 h-12 mx-auto text-primary" />
                </div>
                <h3 className="font-semibold text-xl text-black group-hover:text-primary transition mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category._count?.products || 0} products
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

