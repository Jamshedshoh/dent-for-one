
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Users, Stethoscope, CalendarClock, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SlideOutMenu } from "./SlideOutMenu";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/" },
  { icon: ShoppingBag, label: "Shop", path: "/shop" },
  { icon: Users, label: "Social", path: "/social" },
  { icon: Stethoscope, label: "Care", path: "/care" },
  { icon: CalendarClock, label: "Booking", path: "/booking" },
];

export function SidebarNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="hidden md:flex fixed left-0 top-0 h-full w-16 bg-background border-r flex-col items-center pt-16 pb-4">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            size="icon"
            className={cn(
              "mb-2 relative w-12 h-12 rounded-xl",
              isActive(item.path) && "bg-primary/10 text-primary"
            )}
            onClick={() => navigate(item.path)}
          >
            <item.icon size={22} />
            {isActive(item.path) && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
            )}
          </Button>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed left-4 top-3 z-30"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu />
      </Button>

      <SlideOutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
