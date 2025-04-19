import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/BottomNavigation";
import {
  CheckCircle2,
  Circle,
  Trophy,
  TrendingUp,
  Calendar,
  MoreHorizontal,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Habit {
  id: string;
  name: string;
  icon?: React.ReactNode;
  completed: boolean;
  time?: string;
  streakDays: number;
}

export default function Care() {
  const [activeTab, setActiveTab] = useState("today");

  // In a real app, these would be fetched from an API
  const habits: Habit[] = [
    {
      id: "1",
      name: "Morning Brush",
      completed: true,
      time: "7:30 AM",
      streakDays: 15,
    },
    {
      id: "2",
      name: "Floss",
      completed: false,
      time: "9:00 PM",
      streakDays: 7,
    },
    {
      id: "3",
      name: "Evening Brush",
      completed: false,
      time: "9:30 PM",
      streakDays: 15,
    },
    {
      id: "4",
      name: "Mouthwash",
      completed: false,
      time: "9:45 PM",
      streakDays: 3,
    },
  ];

  const completedHabits = habits.filter((habit) => habit.completed).length;
  const progress = (completedHabits / habits.length) * 100;

  // Mock point system
  const points = 235;
  const level = "Dental Defender";
  const nextLevel = 300;
  const levelProgress = (points / nextLevel) * 100;

  const badges = [
    {
      id: "1",
      name: "Early Riser",
      description: "Completed morning routine before 8 AM 5 days in a row",
      image: "🌅",
      earned: true,
    },
    {
      id: "2",
      name: "Floss Boss",
      description: "Flossed for 7 consecutive days",
      image: "🧵",
      earned: true,
    },
    {
      id: "3",
      name: "Perfect Month",
      description: "Complete all habits every day for a month",
      image: "🏆",
      earned: false,
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title="Care" />

      <main className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Habit Tracker</h2>
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">{points} points</span>
            <Trophy size={18} className="text-amber-500" />
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <TrendingUp size={16} className="text-primary mr-2" />
              <span className="text-sm font-medium">Today's Progress</span>
            </div>
            <span className="text-sm font-medium">
              {completedHabits}/{habits.length}
            </span>
          </div>

          <div className="h-3 bg-secondary rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Level: {level}</span>
            <span>
              {points}/{nextLevel} to next level
            </span>
          </div>

          <div className="h-1.5 bg-secondary rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
        </div>

        <div className="flex border-b border-border mb-6">
          <button
            className={`flex-1 pb-2 text-center font-medium text-sm ${
              activeTab === "today"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("today")}
          >
            Today
          </button>
          <button
            className={`flex-1 pb-2 text-center font-medium text-sm ${
              activeTab === "insights"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("insights")}
          >
            Insights
          </button>
          <button
            className={`flex-1 pb-2 text-center font-medium text-sm ${
              activeTab === "badges"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("badges")}
          >
            Badges
          </button>
        </div>

        {activeTab === "today" && (
          <div className="space-y-3">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className={cn(
                  "p-4 rounded-xl flex items-center justify-between animate-fade-in border",
                  habit.completed
                    ? "bg-primary/5 border-primary/20"
                    : "bg-card border-border"
                )}
                style={{ animationDelay: `${parseInt(habit.id) * 100}ms` }}
              >
                <div className="flex items-center">
                  {habit.completed ? (
                    <CheckCircle2
                      size={22}
                      className="text-primary flex-shrink-0"
                    />
                  ) : (
                    <Circle
                      size={22}
                      className="text-muted-foreground flex-shrink-0"
                    />
                  )}
                  <div className="ml-3">
                    <div className="flex items-center">
                      <h3 className="font-medium">{habit.name}</h3>
                      {habit.streakDays > 0 && (
                        <div className="ml-2 flex items-center text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          <span className="mr-1">🔥</span>
                          {habit.streakDays} days
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Scheduled: {habit.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  {!habit.completed && (
                    <button className="mr-2 px-3 py-1 rounded-lg bg-primary text-white text-xs font-medium">
                      Check-in
                    </button>
                  )}
                  <button className="p-1.5 rounded-lg hover:bg-muted">
                    <MoreHorizontal
                      size={18}
                      className="text-muted-foreground"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "insights" && (
          <div className="space-y-6">
            <div className="bg-card rounded-xl shadow-sm p-4">
              <h3 className="font-medium mb-4">Weekly Overview</h3>
              <div className="flex justify-between items-center">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, index) => (
                    <div key={day} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                          index < 3
                            ? "bg-primary text-white"
                            : index === 3
                            ? "border-2 border-dashed border-primary text-primary"
                            : "bg-secondary"
                        }`}
                      >
                        {index < 3 ? "✓" : index === 3 ? "•" : ""}
                      </div>
                      <span className="text-xs">{day}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="bg-card rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Upcoming Check-up</h3>
                <div className="flex items-center text-primary text-sm">
                  <Calendar size={16} className="mr-1" />
                  <span>June 12, 2025</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg flex items-start">
                <AlertCircle
                  size={18}
                  className="text-amber-500 mr-2 flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    Preparation Tips
                  </p>
                  <p className="text-xs text-amber-700">
                    Continue your good habits to ensure a positive check-up.
                    Don't forget to bring your insurance card.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "badges" && (
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={cn(
                  "p-4 bg-card rounded-xl shadow-sm flex flex-col items-center text-center",
                  !badge.earned && "opacity-60"
                )}
              >
                <div className="text-4xl mb-2">{badge.image}</div>
                <h3 className="font-medium text-sm mb-1">{badge.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {badge.description}
                </p>
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    badge.earned
                      ? "bg-green-100 text-green-800"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {badge.earned ? "Earned" : "In Progress"}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
