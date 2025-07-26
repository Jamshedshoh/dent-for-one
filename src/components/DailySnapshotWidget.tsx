
import { CheckCircle2, Circle, CalendarClock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Habit {
  id: string;
  name: string;
  completed: boolean;
  time?: string;
}

export function DailySnapshotWidget() {
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = today.toLocaleDateString('en-US', dateOptions);
  
  const habits: Habit[] = [
    { id: "1", name: "Morning Brush", completed: true, time: "7:30 AM" },
    { id: "2", name: "Floss", completed: false, time: "9:00 PM" },
    { id: "3", name: "Evening Brush", completed: false, time: "9:30 PM" },
  ];

  const completedHabits = habits.filter(habit => habit.completed).length;
  const progress = (completedHabits / habits.length) * 100;

  const nextAppointment = {
    date: "June 12, 2025",
    time: "2:30 PM",
    type: "Dental Checkup"
  };

  return (
    <div className="bg-card rounded-xl shadow-sm p-4 mb-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Daily Snapshot</h3>
        <span className="text-sm text-muted-foreground">{formattedDate}</span>
      </div>
      
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <TrendingUp size={16} className="text-primary mr-2" />
            <span className="text-sm font-medium">Today's Progress</span>
          </div>
          <span className="text-sm font-medium">{completedHabits}/{habits.length}</span>
        </div>
        
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="space-y-3 mb-5">
        <h4 className="text-sm font-medium">Today's Habits</h4>
        {habits.map(habit => (
          <div key={habit.id} className="flex items-center">
            {habit.completed ? (
              <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
            ) : (
              <Circle size={18} className="text-muted-foreground flex-shrink-0" />
            )}
            <span className={cn(
              "ml-2 text-sm flex-grow", 
              habit.completed ? "line-through text-muted-foreground" : ""
            )}>
              {habit.name}
            </span>
            <span className="text-xs text-muted-foreground">{habit.time}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t border-border pt-4">
        <div className="flex items-center">
          <CalendarClock size={18} className="text-primary mr-2" />
          <div>
            <h4 className="text-sm font-medium">Next Appointment</h4>
            <p className="text-xs text-muted-foreground">
              {nextAppointment.type} • {nextAppointment.date} at {nextAppointment.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
