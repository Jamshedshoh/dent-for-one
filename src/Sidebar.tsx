import React, { useEffect } from "react";
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
} from "lucide-react"; // Icons for navigation
import { Link } from "react-router-dom"; // Import Link and Outlet from react-router-dom

export type SidebarProps = {
  title: string;
  isOpen: boolean;
  toggleSidebar: () => void;
  children?: React.ReactNode;
};

export const Sidebar = ({ title, isOpen, toggleSidebar }: SidebarProps) => {
  // Close sidebar if clicked outside
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
      toggleSidebar(); // Close the sidebar on link click
    }
  };

  return (
    <>
      {/* Backdrop when sidebar is open */}
      <div
        id="backdrop"
        className={`fixed inset-0 z-40 transition-all duration-300 ${isOpen ? "bg-gray-900 bg-opacity-50" : "bg-transparent"}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed inset-0 z-50 md:z-50 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex flex-col bg-white shadow-lg w-full md:w-64 h-full`}
      >
        <div className="flex justify-between items-center p-4 md:p-6">
          <div className="text-xl font-bold text-blue-600">{title}</div>
          <button onClick={toggleSidebar} className="md:hidden">
            <X className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4 p-4 md:p-6">
          <Link to="overview" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600" onClick={handleLinkClick}>
            <Home className="w-6 h-6" /> <span>Overview</span>
          </Link>
          <Link to="appointments" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600" onClick={handleLinkClick}>
            <Calendar className="w-6 h-6" /> <span>Appointments</span>
          </Link>
          <Link to="billing" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600" onClick={handleLinkClick}>
            <CreditCard className="w-6 h-6" /> <span>Billing</span>
          </Link>
          <Link to="reports" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600" onClick={handleLinkClick}>
            <File className="w-6 h-6" /> <span>Reports</span>
          </Link>
          <Link to="inbox" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600" onClick={handleLinkClick}>
            <Mail className="w-6 h-6" /> <span>Inbox</span>
          </Link>
          <Link to="database" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600" onClick={handleLinkClick}>
            <Database className="w-6 h-6" /> <span>Database Management</span>
          </Link>
          <Link to="patients" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600" onClick={handleLinkClick}>
            <User className="w-6 h-6" /> <span>Patient Management</span>
          </Link>
          <Link to="inventory" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600" onClick={handleLinkClick}>
            <Box className="w-6 h-6" /> <span>Inventory</span>
          </Link>
          <Link to="marketing" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600" onClick={handleLinkClick}>
            <Siren className="w-6 h-6" /> <span>Marketing</span>
          </Link>
          <Link to="settings" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600" onClick={handleLinkClick}>
            <Settings2 className="w-6 h-6" /> <span>Settings</span>
          </Link>
          <Link to="/" className="flex items-center space-x-2 text-gray-800 hover:text-red-600" onClick={handleLinkClick}>
            <LogOut className="w-6 h-6" /> <span>Logout</span>
          </Link>
        </nav>
      </div>
    </>
  );
};
