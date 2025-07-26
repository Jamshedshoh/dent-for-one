
import { ShoppingBag, Share2, Heart, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface QuickAction {
  icon: React.ElementType;
  label: string;
  color: string;
  bgColor: string;
  path: string;
}

export function QuickActionButtons() {
  const navigate = useNavigate();
  
  const quickActions: QuickAction[] = [
    { 
      icon: ShoppingBag, 
      label: "Shop", 
      color: "bg-blue-500", 
      bgColor: "bg-blue-50", 
      path: "/shop" 
    },
    { 
      icon: Share2, 
      label: "Social", 
      color: "bg-purple-500", 
      bgColor: "bg-purple-50", 
      path: "/social" 
    },
    { 
      icon: Heart, 
      label: "Care", 
      color: "bg-green-500", 
      bgColor: "bg-green-50", 
      path: "/care" 
    },
    { 
      icon: Calendar, 
      label: "Booking", 
      color: "bg-amber-500", 
      bgColor: "bg-amber-50", 
      path: "/booking" 
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
      {quickActions.map((action) => (
        <button
          key={action.label}
          onClick={() => navigate(action.path)}
          className="flex flex-col items-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2"
        >
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center mb-2",
            action.bgColor
          )}>
            <action.icon className={cn(
              "h-6 w-6",
              action.label === "Shop" && "text-blue-500",
              action.label === "Social" && "text-purple-500",
              action.label === "Care" && "text-green-500",
              action.label === "Booking" && "text-amber-500",
            )} />
          </div>
          <span className="text-xs font-medium">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
