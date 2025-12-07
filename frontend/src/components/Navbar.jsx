import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { useState } from "react";

export default function Navbar() {
  const { isAuthenticated, user, logout, isAdmin } = useAuthStore();
  const { getItemCount } = useCartStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const cartCount = getItemCount();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Shortland</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-black hover:text-primary transition">
              Home
            </Link>
            <Link
              to="/products"
              className="text-black hover:text-primary transition"
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="text-black hover:text-primary transition"
            >
              Categories
            </Link>
            <Link
              to="/discounts"
              className="text-black hover:text-primary transition"
            >
              Discounts
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="text-black hover:text-primary transition"
              >
                Admin
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/orders"
                className="text-black hover:text-primary transition"
              >
                My Orders
              </Link>
            )}

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-black hover:text-primary transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="text-sm">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-black hover:text-primary transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-black hover:text-primary transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-slide-down">
            <Link to="/" className="block text-black hover:text-primary">
              Home
            </Link>
            <Link
              to="/products"
              className="block text-black hover:text-primary"
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="block text-black hover:text-primary"
            >
              Categories
            </Link>
            <Link
              to="/discounts"
              className="block text-black hover:text-primary"
            >
              Discounts
            </Link>
            {isAdmin && (
              <Link to="/admin" className="block text-black hover:text-primary">
                Admin
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/orders"
                className="block text-black hover:text-primary"
              >
                My Orders
              </Link>
            )}
            <Link to="/cart" className="block text-black hover:text-primary">
              Cart ({cartCount})
            </Link>
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="text-sm text-gray-600">{user?.name}</div>
                <button
                  onClick={handleLogout}
                  className="text-black hover:text-primary"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="block text-black hover:text-primary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-primary text-white px-4 py-2 rounded-lg text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

