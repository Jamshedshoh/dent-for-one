
import { Menu, Search, Bell, X } from "lucide-react";
import { useState } from "react";
import { SlideOutMenu } from "./SlideOutMenu";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  className?: string;
}

export function Header({ 
  title = "Smile Well Hub", 
  showSearch = true, 
  showNotifications = true,
  className
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  return (
    <>
      <header className={cn("sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm border-b border-border", className)}>
        <div className="container flex h-16 items-center justify-between px-4">
          {!searchActive ? (
            <>
              <div className="flex items-center">
                <button 
                  onClick={() => setMenuOpen(true)}
                  className="mr-4 rounded-full p-2 hover:bg-accent"
                >
                  <Menu size={22} />
                </button>
                <h1 className="text-lg font-semibold">{title}</h1>
              </div>
              
              <div className="flex items-center space-x-2">
                {showSearch && (
                  <button 
                    onClick={() => setSearchActive(true)}
                    className="rounded-full p-2 hover:bg-accent"
                  >
                    <Search size={22} />
                  </button>
                )}
                
                {showNotifications && (
                  <button className="rounded-full p-2 hover:bg-accent relative">
                    <Bell size={22} />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full flex items-center">
              <button 
                onClick={() => setSearchActive(false)}
                className="p-2 mr-2"
              >
                <X size={20} />
              </button>
              <input
                type="text"
                placeholder="Search for products, tips, or appointments..."
                className="w-full bg-muted py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
            </div>
          )}
        </div>
      </header>
      <SlideOutMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
