
import { Lightbulb, Bell, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tip {
  id: string;
  content: string;
  type: "tip" | "reminder";
  isNew?: boolean;
}

export function TipsAndReminders() {
  const items: Tip[] = [
    {
      id: "1",
      content: "Remember to replace your toothbrush every 3 months for optimal cleaning.",
      type: "tip",
      isNew: true
    },
    {
      id: "2",
      content: "Your next teeth cleaning appointment is in 2 weeks.",
      type: "reminder"
    },
    {
      id: "3",
      content: "Drinking water after meals helps wash away food particles and reduces acid.",
      type: "tip"
    }
  ];

  return (
    <div className="mb-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Tips & Reminders</h3>
        <a 
          href="/tips" 
          className="text-primary flex items-center text-sm font-medium"
        >
          View All <ArrowRight size={16} className="ml-1" />
        </a>
      </div>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id}
            className={cn(
              "p-3 rounded-xl flex",
              item.type === "tip" ? "bg-blue-50" : "bg-amber-50"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-3",
              item.type === "tip" ? "bg-blue-100" : "bg-amber-100"
            )}>
              {item.type === "tip" ? (
                <Lightbulb size={18} className="text-blue-600" />
              ) : (
                <Bell size={18} className="text-amber-600" />
              )}
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center">
                <h4 className="font-medium text-sm capitalize">
                  {item.type}
                </h4>
                {item.isNew && (
                  <span className="ml-2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </div>
              <p className="text-xs mt-1 text-muted-foreground">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
