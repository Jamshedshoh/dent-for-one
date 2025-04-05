import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts";
import { useShop } from "../../contexts/ShopContext";
import { Dropdown } from "../ui/Dropdown";

// Navbar Component
export const Navbar = () => {
  const { user, logout }: any = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { getCartCount } = useShop();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
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
              to="/manage"
              className="text-2xl font-bold text-blue-600 flex-shrink-0"
            >
              Dent Manage
            </Link>
            <div className="flex space-x-4 items-end">
              <Dropdown title="Users">
                <Link
                  to="/manage/users"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Users
                </Link>
              </Dropdown>
              <Dropdown title="Messages">
                <Link
                  to="/manage/messages"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Messages
                </Link>
              </Dropdown>
              <Dropdown title="Shop">
                <Link
                  to="/manage/shop"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Shop
                </Link>
              </Dropdown>
              <Dropdown title="Booking">
                <Link
                  to="/manage/booking"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Booking
                </Link>
              </Dropdown>
              <Dropdown title="Social Share">
                <Link
                  to="/manage/social-share"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Social Share
                </Link>
              </Dropdown>
              <Dropdown title="Care">
                <Link
                  to="/manage/care"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Care
                </Link>
              </Dropdown>
            </div>
          </div>

          {/* User and Cart on the right side */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <Dropdown title={user?.email}>
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center justify-between">
          <Link
            to="/manage"
            className="text-2xl font-bold text-blue-600 flex-shrink-0"
          >
            Dent Manage
          </Link>
          <div className="flex space-x-5">
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
            to="/manage/shop"
            className="text-white bg-blue-600 font-medium rounded px-2"
          >
            Shop
          </Link>
          <Link
            to="/manage/booking"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Booking
          </Link>
          <Link
            to="/manage/social-share"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Social Share
          </Link>
          <Link
            to="/manage/care"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Care
          </Link>
        </div>
      </div>
    </nav>
  );
};
