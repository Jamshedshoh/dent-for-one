import React, { useEffect, useState } from "react";
import {
  X,
  Home,
  User,
  Calendar,
  CreditCard,
  LogOut,
  Database,
  File,
  Box,
  Settings2,
  Mail,
  Siren,
  ShoppingCart,
  Package,
  DollarSign,
  ChevronDown,
} from "lucide-react"; // Icons for navigation
import { Link } from "react-router-dom"; // Import Link
import { useAuth } from "../contexts";

export type SidebarProps = {
  title: string;
  isOpen: boolean;
  toggleSidebar: () => void;
  children?: React.ReactNode;
};

export const Sidebar = ({ title, isOpen, toggleSidebar }: SidebarProps) => {
  const { user, logout }: any = useAuth();
  const [shopOpen, setShopOpen] = useState(false); // State for Shop dropdown

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const sidebar = document.getElementById("sidebar");
        const backdrop = document.getElementById("backdrop");
        if (
          sidebar &&
          backdrop &&
          !sidebar.contains(e.target as Node) &&
          !backdrop.contains(e.target as Node)
        ) {
          toggleSidebar();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, toggleSidebar]);

  const handleLinkClick = () => {
    if (isOpen) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {/* <div
        id="backdrop"
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? "bg-gray-900 bg-opacity-50" : "bg-transparent"
        }`}
        onClick={toggleSidebar}
      ></div> */}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed inset-0 z-50 md:z-50 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex flex-col bg-white shadow-lg w-full md:w-64 h-full`}
      >
        <div className="flex justify-between items-center p-4 md:p-6">
          <Link to="/dashboard" className="text-xl font-bold text-blue-600">
            {title}
            <div className="flex items-center space-x-2 text-gray-800">
              <User className="w-4 h-4" />
              <span className="text-sm text-gray-600">{user.email}</span>
            </div>
          </Link>

          <button onClick={toggleSidebar} className="md:hidden">
            <X className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4 p-4 md:p-6">
          <Link
            to="overview"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
            onClick={handleLinkClick}
          >
            <Home className="w-6 h-6" /> <span>Overview</span>
          </Link>

          <Link
            to="inbox"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
            onClick={handleLinkClick}
          >
            <Mail className="w-6 h-6" /> <span>Inbox</span>
          </Link>

          {/* <Link
            to="appointments"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
            onClick={handleLinkClick}
          >
            <Calendar className="w-6 h-6" /> <span>Appointments</span>
          </Link> */}

          {/* <Link
            to="billing"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
            onClick={handleLinkClick}
          >
            <CreditCard className="w-6 h-6" /> <span>Billing</span>
          </Link> */}

          <button
            className="flex items-center justify-between w-full text-gray-800 hover:text-blue-600"
            onClick={() => setShopOpen(!shopOpen)}
          >
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6" /> <span>Shop</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${shopOpen ? "rotate-180" : ""}`} />
          </button>
          {shopOpen && (
            <div className="ml-6 flex flex-col space-y-2">
              <Link
                to="shop/products"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                onClick={handleLinkClick}
              >
                <Package className="w-5 h-5" /> <span>Products</span>
              </Link>
              <Link
                to="shop/orders"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                onClick={handleLinkClick}
              >
                <Box className="w-5 h-5" /> <span>Orders</span>
              </Link>
              <Link
                to="shop/payments"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                onClick={handleLinkClick}
              >
                <DollarSign className="w-5 h-5" /> <span>Payments</span>
              </Link>
            </div>
          )}

          <Link
            to="reports"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
            onClick={handleLinkClick}
          >
            <File className="w-6 h-6" /> <span>Reports</span>
          </Link>

          {/* <Link
            to="database"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
            onClick={handleLinkClick}
          >
            <Database className="w-6 h-6" /> <span>Database Management</span>
          </Link> */}

          <Link
            to="settings"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
            onClick={handleLinkClick}
          >
            <Settings2 className="w-6 h-6" /> <span>Settings</span>
          </Link>

          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-800 hover:text-red-600"
            onClick={logout}
          >
            <LogOut className="w-6 h-6" /> <span>Logout</span>
          </Link>
        </nav>
      </div>
    </>
  );
};
