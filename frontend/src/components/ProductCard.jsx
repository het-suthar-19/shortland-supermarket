import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { cn } from "../lib/utils";

export default function ProductCard({ product }) {
  const { addItem } = useCartStore();
  const finalPrice =
    product.discount > 0 ? product.price - product.discount : product.price;
  const discountPercent =
    product.discount > 0
      ? Math.round((product.discount / product.price) * 100)
      : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {product.discount > 0 && (
        <div className="absolute top-3 right-3 z-10 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
          -{discountPercent}%
        </div>
      )}

      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-black group-hover:text-primary transition">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {product.discount > 0 ? (
              <>
                <span className="text-2xl font-bold text-primary">
                  ${finalPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-black">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition flex items-center justify-center space-x-2 group/btn"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </Link>
  );
}

