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
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts";
import { useShop } from "../../contexts/ShopContext";

// Navbar Component
export const Navbar = () => {
  const { user, logout }: any = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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
              to="/shop"
              className="text-2xl font-bold text-blue-600 flex-shrink-0"
            >
              Dent Shop
            </Link>
            <div className="flex space-x-4 items-end">
              <Link
                to="/shop/catalog"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Catalog
              </Link>
              <Link
                to="/shop/sale"
                className="font-medium text-red-500 bg-yellow-300 rounded px-2"
              >
                Sale -50%
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
                      to="/shop/account"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Account
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
            to="/shop/catalog"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Catalog
          </Link>
          <Link
            to="/shop/sale"
            className="font-medium text-red-500 bg-yellow-300 rounded px-2"
          >
            Sale -50%
          </Link>
        </div>
      </div>
    </nav>
  );
};
