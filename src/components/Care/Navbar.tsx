import { useState } from "react";
import { Menu, X, LogOut, User, MessageCircle, Bot } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts";
import { Dropdown } from "../ui/Dropdown";

// Navbar Component
export const Navbar = () => {
  const { user, logout }: any = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-md py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <div className="hidden md:flex space-x-6">
            <Link
              to="/care"
              className="text-2xl font-bold text-blue-600 flex-shrink-0"
            >
              Dent Care
            </Link>
            <div className="flex space-x-4 items-end">
              <Link
                to="/care/consultation"
                className="text-white bg-blue-600 font-medium rounded px-2"
              >
                1:1 Consultation
              </Link>
            </div>
          </div>

          {/* User and Cart on the right side */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <Dropdown title={user?.email}>
                <Link
                  to="/care/account"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
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
            to="/care"
            className="text-2xl font-bold text-blue-600 flex-shrink-0"
          >
            Dental Care
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
          } absolute top-16 right-0 bg-white shadow-lg rounded-lg w-full p-4 space-y-3`}
        >
          <Link
            to="/care/consultation"
            className="flex items-center text-gray-700 hover:text-blue-600 font-medium"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            1:1 Consultation
          </Link>
        </div>
      </div>
    </nav>
  );
};
