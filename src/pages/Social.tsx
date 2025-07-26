import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/BottomNavigation";
import {
  ThumbsUp,
  MessageCircle,
  Share,
  Users,
  Trophy,
  PlusCircle,
} from "lucide-react";
import { useState } from "react";

export default function Social() {
  const [activeTab, setActiveTab] = useState("feed");

  // In a real app, these would be fetched from an API
  const posts = [
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2340&auto=format&fit=crop",
      },
      content:
        "Just completed my 30-day flossing challenge! 🦷 My dentist was so impressed with the improvement.",
      likes: 24,
      comments: 5,
      timeAgo: "2h ago",
      image:
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2340&auto=format&fit=crop",
    },
    {
      id: "2",
      user: {
        name: "Dr. Michael Chen",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2340&auto=format&fit=crop",
      },
      content:
        "Tip of the day: Replace your toothbrush every 3 months for best results. Your gums will thank you!",
      likes: 56,
      comments: 8,
      timeAgo: "5h ago",
    },
    {
      id: "3",
      user: {
        name: "Jessica Miller",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2340&auto=format&fit=crop",
      },
      content:
        "Completed my teeth whitening treatment! Check out the before and after. So happy with the results! 😁",
      likes: 112,
      comments: 23,
      timeAgo: "1d ago",
      image:
        "https://images.unsplash.com/photo-1581671504312-2d7b55962d57?q=80&w=2340&auto=format&fit=crop",
    },
  ];

  const challenges = [
    {
      id: "1",
      title: "30-Day Flossing Challenge",
      participants: 247,
      progress: 70,
      days: "12 days left",
    },
    {
      id: "2",
      title: "Avoid Sugary Drinks Week",
      participants: 158,
      progress: 40,
      days: "5 days left",
    },
    {
      id: "3",
      title: "Morning & Night Brushing",
      participants: 523,
      progress: 90,
      days: "Ongoing",
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title="Dent Social" />

      <main className="container px-4 py-6">
        <div className="flex border-b border-border mb-6">
          <button
            className={`flex-1 pb-2 text-center font-medium text-sm ${
              activeTab === "feed"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("feed")}
          >
            Community Feed
          </button>
          <button
            className={`flex-1 pb-2 text-center font-medium text-sm ${
              activeTab === "challenges"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("challenges")}
          >
            Challenges
          </button>
        </div>

        {activeTab === "feed" ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-card rounded-xl shadow-sm overflow-hidden animate-fade-in"
                style={{ animationDelay: `${parseInt(post.id) * 100}ms` }}
              >
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <img
                      src={post.user.avatar}
                      alt={post.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <h3 className="font-medium text-sm">{post.user.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {post.timeAgo}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm mb-3">{post.content}</p>

                  {post.image && (
                    <div
                      className="h-48 bg-cover bg-center rounded-lg mb-3"
                      style={{ backgroundImage: `url(${post.image})` }}
                    />
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <button className="flex items-center text-xs text-muted-foreground">
                      <ThumbsUp size={14} className="mr-1" />
                      {post.likes}
                    </button>
                    <button className="flex items-center text-xs text-muted-foreground">
                      <MessageCircle size={14} className="mr-1" />
                      {post.comments}
                    </button>
                    <button className="flex items-center text-xs text-muted-foreground">
                      <Share size={14} className="mr-1" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium">Active Challenges</h2>
              <button className="text-primary text-sm font-medium flex items-center">
                <PlusCircle size={16} className="mr-1" />
                Join New
              </button>
            </div>

            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-card rounded-xl shadow-sm p-4 animate-fade-in"
                style={{ animationDelay: `${parseInt(challenge.id) * 100}ms` }}
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{challenge.title}</h3>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Users size={14} className="mr-1" />
                    {challenge.participants}
                  </div>
                </div>

                <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${challenge.progress}%` }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {challenge.days}
                  </span>
                  <div className="flex items-center">
                    <Trophy size={14} className="text-amber-500 mr-1" />
                    <span className="text-xs font-medium">
                      {challenge.progress >= 50 ? "On Track!" : "Keep Going!"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
