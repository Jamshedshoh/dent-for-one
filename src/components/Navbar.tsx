import { useState } from "react";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts";
import { useShop } from "../contexts/ShopContext";

// Navbar Component
export const Navbar = () => {
  const { user, logout }: any = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getCartCount } = useShop();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProducts = () => setIsProductsOpen(!isProductsOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 flex-shrink-0"
            >
              Dent
            </Link>
            <div className="flex space-x-4 items-end">
              <div className="relative">
                <button
                  onClick={toggleProducts}
                  className="text-gray-700 hover:text-blue-600 font-medium flex items-center"
                >
                  <span className="mr-2">Products</span>
                  {isProductsOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-700" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-700" />
                  )}
                </button>
                {isProductsOpen && (
                  <div className="absolute left-0 mt-5 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <Link
                      to="/shop"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      Shop App
                    </Link>
                    <Link
                      to="/social-share"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      Social Share App
                    </Link>
                    <Link
                      to="/booking"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      Booking App
                    </Link>
                    <Link
                      to="/care"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      Care App
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/pricing"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Pricing
              </Link>
              <Link
                to="/community"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Community
              </Link>
              <Link
                to="/blog"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* User and Cart on the right side */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart Icon */}
            <Link
              to="/shop/cart"
              className="text-gray-700 hover:text-blue-600 relative"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <span className="font-medium">{user.email}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 flex-shrink-0"
          >
            Dent
          </Link>
          <div className="flex space-x-5">
            {/* Cart Icon for Mobile */}
            <Link
              to="/shop/cart"
              className="text-gray-700 hover:text-blue-600 relative"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            </Link>
            <button className="text-gray-700" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 right-0 bg-white shadow-lg rounded-lg w-full`}
        >
          <Link
            to="/shop"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Shop
          </Link>
          <Link
            to="/pricing"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Pricing
          </Link>
          <Link
            to="/community"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Community
          </Link>
          <Link
            to="/blog"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
};
