import {
  Bell,
  Bluetooth,
  BookOpen,
  ChevronRight,
  Info,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type MenuItem = {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: string;
};

const menuItems: MenuItem[] = [
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: BookOpen, label: "Dental Health Guide", path: "/guide" },
  { icon: Bell, label: "Notifications", path: "/notifications", badge: "3" },
  { icon: Bluetooth, label: "Connect Devices", path: "/devices" },
  { icon: Info, label: "Help & Support", path: "/support" },
];

interface SlideOutMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SlideOutMenu({ isOpen, onClose }: SlideOutMenuProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // You would add actual theme toggling logic here
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-all">
      <div
        ref={menuRef}
        className={cn(
          "fixed top-0 left-0 h-full w-[280px] bg-background p-6 shadow-xl transition-transform animate-slide-in",
          !isOpen && "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-accent transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* <div className="flex items-center mb-8 p-3 bg-secondary rounded-lg">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
            JS
          </div>
          <div className="ml-3">
            <p className="font-medium">John Smith</p>
            <p className="text-xs text-muted-foreground">john.smith@example.com</p>
          </div>
        </div> */}

        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleMenuItemClick(item.path)}
              className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent transition-colors text-left"
            >
              <div className="flex items-center">
                <item.icon size={18} className="text-primary" />
                <span className="ml-3">{item.label}</span>
              </div>
              <div className="flex items-center">
                {item.badge && (
                  <span className="mr-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>

        <div className="absolute bottom-20 w-[calc(100%-3rem)]">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors mb-4">
            <div className="flex items-center">
              {isDarkMode ? (
                <Moon size={18} className="text-primary" />
              ) : (
                <Sun size={18} className="text-primary" />
              )}
              <span className="ml-3">Dark Mode</span>
            </div>
            <button
              onClick={toggleTheme}
              className={cn(
                "w-11 h-6 rounded-full relative",
                isDarkMode ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
                  isDarkMode ? "translate-x-5" : "translate-x-1"
                )}
              />
            </button>
          </div>

          <button
            className="flex w-full items-center p-3 mb-7 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
            onClick={() => {
              // In a real app, you would log the user out here
              toast.success("Signed out successfully");
              navigate("/");
              onClose();
            }}
          >
            <LogOut size={18} />
            <span className="ml-3">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
