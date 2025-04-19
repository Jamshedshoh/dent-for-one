import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/BottomNavigation";
import { DailySnapshotWidget } from "@/components/DailySnapshotWidget";
import { QuickActionButtons } from "@/components/QuickActionButtons";
import { RecommendedProducts } from "@/components/RecommendedProducts";
import { TipsAndReminders } from "@/components/TipsAndReminders";

export default function Home() {
  // In a real app, you would fetch this from user profile
  const userName = "John";
  const timeOfDay = getTimeOfDay();

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />

      <main className="container px-4 py-6">
        <h2 className="text-2xl font-semibold mb-6">
          Good {timeOfDay}, {userName}!
        </h2>

        <QuickActionButtons />
        <DailySnapshotWidget />
        <RecommendedProducts />
        <TipsAndReminders />
      </main>

      <BottomNavigation />
    </div>
  );
}

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}
