import { useEffect, useState } from "react";
import { Menu, User } from "lucide-react"; // Icons for navigation
import { Sidebar } from "../Sidebar";
import { useNavigate, Outlet } from "react-router-dom"; // Import Link and Outlet from react-router-dom
import { useAuth } from "../../contexts";

export const Account = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar
        title="Dent Dashboard"
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div
        className={`flex-1 flex flex-col bg-gray-50 transition-all duration-300 md:ml-64`}
      >
        <div className="md:hidden p-4 flex justify-between items-center bg-white shadow-md">
          <button onClick={toggleSidebar}>
            <Menu className="w-6 h-6 text-gray-800" />
          </button>
          <div className="text-xl font-bold text-blue-600">Dent Dashboard</div>
          <div className="flex items-center space-x-2 text-gray-800">
            <User className="w-6 h-6" /> <span>{user.email}</span>
          </div>
        </div>

        <main className="p-4 md:p-6 flex-1">
          <Outlet />{" "}
        </main>
      </div>
    </div>
  );
};
