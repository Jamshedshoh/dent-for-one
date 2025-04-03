import { useState } from "react";
import {
  Menu,
  X,
  LogOut,
  Settings,
  Activity,
  BookOpen,
  Bot,
  ClipboardList,
  TrendingUp,
  Goal,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../../../contexts";
import { Dropdown } from "../../ui/Dropdown";

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
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/care/account"
              className="text-2xl font-bold text-blue-600 flex-shrink-0"
            >
              Dent Care
            </Link>
            <div className="flex space-x-4 items-end">
              <Link
                to="/care/account/messages"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                <MessageCircle className="inline-block w-4 h-4 mr-1" />
                Messages
              </Link>
              <Link
                to="/care/account/planner"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                <Goal className="inline-block w-4 h-4 mr-1" />
                Planner
              </Link>
              <Link
                to="/care/account/progress"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                <TrendingUp className="inline-block w-4 h-4 mr-1" />
                Progress
              </Link>
              <Link
                to="/care/account/programs"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                <ClipboardList className="inline-block w-4 h-4 mr-1" />
                Programs
              </Link>
              <Link
                to="/care/account/resources"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                <BookOpen className="inline-block w-4 h-4 mr-1" />
                Resources
              </Link>
            </div>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <Dropdown title={user.email}>
                <Link
                  to="/care/settings"
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

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 right-0 bg-white shadow-lg rounded-lg mx-4`}
        >
          <Link
            to="/care/exercises"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 border-b"
          >
            <Activity className="w-4 h-4 mr-2" />
            Exercises
          </Link>
          <Link
            to="/care/progress"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 border-b"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Progress
          </Link>
          <Link
            to="/care/programs"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 border-b"
          >
            <ClipboardList className="w-4 h-4 mr-2" />
            Programs
          </Link>
          <Link
            to="/care/ai-assistant"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 border-b"
          >
            <Bot className="w-4 h-4 mr-2" />
            AI Assistant
          </Link>
          <Link
            to="/care/resources"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 border-b"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Resources
          </Link>
          {user ? (
            <>
              <Link
                to="/care/settings"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 border-b"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-gray-100 text-left"
              >
                <LogOut className="w-4 h-4 mr-2" />
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
