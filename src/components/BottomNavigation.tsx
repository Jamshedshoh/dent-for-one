import { Home, ShoppingBag, Share2, Heart, Calendar, Bot } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: ShoppingBag, label: "Shop", path: "/shop" },
    { icon: Calendar, label: "Booking", path: "/booking" },
    { icon: Share2, label: "Social", path: "/social" },
    { icon: Heart, label: "Care", path: "/care" },
    { icon: Bot, label: "AI Help", path: "/ai-help" },
  ];

  const renderNavItem = (item: (typeof navItems)[number]) => {
    return (
      <button
        key={item.label}
        onClick={() => navigate(item.path)}
        className={cn(
          "flex flex-col items-center justify-center w-full h-full transition-colors",
          location.pathname === item.path
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <item.icon
          size={20}
          className={cn(
            location.pathname === item.path && "animate-pulse-soft"
          )}
        />
        <span className="text-xs mt-1 font-medium">{item.label}</span>
      </button>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border flex items-center justify-around z-50">
      {navItems.map((item) => renderNavItem(item))}
    </div>
  );
}
