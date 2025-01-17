import { useState } from "react";
import {
  Menu,
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
import { Sidebar } from "../Sidebar";
import { Link, Outlet } from "react-router-dom"; // Import Link and Outlet from react-router-dom

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        title="Dent Dashboard"
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      >
        <nav className="flex flex-col space-y-4 p-4 md:p-6">
          <Link
            to="overview"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <Home className="w-6 h-6" /> <span>Overview</span>
          </Link>
          <Link
            to="appointments"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <Calendar className="w-6 h-6" /> <span>Appointments</span>
          </Link>
          <Link
            to="billing"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <CreditCard className="w-6 h-6" /> <span>Billing</span>
          </Link>
          <Link
            to="reports"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <File className="w-6 h-6" /> <span>Reports</span>
          </Link>
          <Link
            to="inbox"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <Mail className="w-6 h-6" /> <span>Inbox</span>
          </Link>
          <Link
            to="database"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <Database className="w-6 h-6" /> <span>Database Management</span>
          </Link>
          <Link
            to="patients"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <User className="w-6 h-6" /> <span>Patient Management</span>
          </Link>
          <Link
            to="inventory"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <Box className="w-6 h-6" /> <span>Inventory</span>
          </Link>
          <Link
            to="marketing"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <Siren className="w-6 h-6" /> <span>Marketing</span>
          </Link>
          <Link
            to="settings"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <Settings2 className="w-6 h-6" /> <span>Settings</span>
          </Link>
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-800 hover:text-red-600"
          >
            <LogOut className="w-6 h-6" /> <span>Logout</span>
          </Link>
        </nav>
      </Sidebar>

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col bg-gray-50 transition-all duration-300 md:ml-64`}
      >
        {/* Navbar on mobile */}
        <div className="md:hidden p-4 flex justify-between items-center bg-white shadow-md">
          <button onClick={toggleSidebar}>
            <Menu className="w-6 h-6 text-gray-800" />
          </button>
          <div className="text-xl font-bold text-blue-600">
            Dent Dashboard
          </div>
        </div>

        {/* Dashboard content */}
        <main className="p-4 md:p-6 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to Your Dashboard!
          </h1>
          {/* Sub-navigation content */}
          <Outlet />{" "}
          {/* This will render the correct sub-route based on the active route */}
        </main>
      </div>
    </div>
  );
};
