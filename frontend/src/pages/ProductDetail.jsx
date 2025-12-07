import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { productsAPI } from "../lib/api";
import { useCartStore } from "../store/cartStore";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productsAPI.getById(id);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-4">
              Product not found
            </h2>
            <button
              onClick={() => navigate("/products")}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const finalPrice =
    product.discount > 0 ? product.price - product.discount : product.price;
  const discountPercent =
    product.discount > 0
      ? Math.round((product.discount / product.price) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-black hover:text-primary transition mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="relative">
              {product.discount > 0 && (
                <div className="absolute top-4 right-4 z-10 bg-primary text-white px-4 py-2 rounded-full text-lg font-bold">
                  -{discountPercent}%
                </div>
              )}
              <img
                src={product.image || "https://via.placeholder.com/400"}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-black mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Category</p>
                  <p className="text-lg font-semibold text-black">
                    {product.category?.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Stock</p>
                  <p className="text-lg font-semibold text-black">
                    {product.stock > 0
                      ? `${product.stock} available`
                      : "Out of stock"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Price</p>
                  <div className="flex items-center space-x-4">
                    {product.discount > 0 ? (
                      <>
                        <span className="text-4xl font-bold text-primary">
                          ${finalPrice.toFixed(2)}
                        </span>
                        <span className="text-2xl text-gray-400 line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-black">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {product.stock > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Quantity</p>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2 transition"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity(Math.min(product.stock, quantity + 1))
                        }
                        className="bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full bg-primary text-white py-4 rounded-lg hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-lg font-semibold"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>
                    {product.stock > 0
                      ? `Add ${quantity} to Cart`
                      : "Out of Stock"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
