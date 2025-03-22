import { useState } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../../../contexts";
import { useShop } from "../../../contexts/ShopContext";
import { Dropdown } from "../../ui/Dropdown";

// Navbar Component
export const Navbar = () => {
  const { user, logout }: any = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useShop();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-md py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/shop"
              className="text-2xl font-bold text-blue-600 flex-shrink-0"
            >
              Dent Shop
            </Link>
            <div className="flex space-x-4 items-end">
              <Link
                to="/shop/account"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Overview
              </Link>
              <Link
                to="/shop/account/messages"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Messages
              </Link>
              <Link
                to="/shop/account/orders"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Orders
              </Link>
              <Link
                to="/shop/account/payments"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Payments
              </Link>
              <Link
                to="/shop/account/receipts"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Receipts
              </Link>
              <Link
                to="/shop/account/favorites"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Favorites
              </Link>
            </div>
          </div>

          {/* Desktop User and Cart */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/shop/cart"
              className="text-gray-700 hover:text-blue-600 relative"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            </Link>

            {user ? (
              <Dropdown title={user.email}>
                <Link
                  to="/shop/account/settings"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </Dropdown>
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

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 flex-shrink-0"
          >
            Dent
          </Link>
          <div className="flex space-x-5">
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

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 right-0 bg-white shadow-lg rounded-lg mx-4`}
        >
          <Link
            to="/shop/account/overview"
            className="block px-4 py-3 text-gray-700 hover:bg-gray-100 border-b"
          >
            Overview
          </Link>
          <div className="border-b">
            <Link
              to="/shop/account/orders"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              Orders
            </Link>
            <Link
              to="/shop/account/payments"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              Payments
            </Link>
            <Link
              to="/shop/account/receipts"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              Receipts
            </Link>
            <Link
              to="/shop/account/favorites"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              Favorites
            </Link>
          </div>
          <Link
            to="/messages"
            className="block px-4 py-3 text-gray-700 hover:bg-gray-100 border-b"
          >
            Messages
          </Link>
          {user ? (
            <>
              <Link
                to="/shop/account/settings"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 border-b"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-3 text-red-600 hover:bg-gray-100 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="p-2 border-t">
              <Link
                to="/login"
                className="block w-full px-4 py-2 text-center text-gray-700 hover:bg-gray-100 rounded-lg mb-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full px-4 py-2 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
