import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Edit2,
  Trash2,
  Clock,
  Plus,
} from "lucide-react";
import { Layout } from "../Layout";

export const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [showSchedulingModal, setShowSchedulingModal] = useState(false);

  // Sample scheduled posts data
  const scheduledPosts = [
    {
      id: 1,
      title: "Summer Teeth Whitening Special",
      content:
        "Book your summer teeth whitening appointment now and get 20% off!",
      platforms: ["facebook", "instagram"],
      scheduledTime: new Date(2023, 5, 15, 10, 0),
      author: "Dr. Sarah Johnson",
      status: "scheduled",
    },
    {
      id: 2,
      title: "Oral Health Awareness",
      content:
        "Did you know regular checkups can prevent serious health issues?",
      platforms: ["instagram"],
      scheduledTime: new Date(2023, 5, 18, 14, 30),
      author: "Dr. Michael Wong",
      status: "scheduled",
    },
    {
      id: 3,
      title: "New Pediatric Dentistry Services",
      content:
        "We're excited to announce our new pediatric dentistry services!",
      platforms: ["facebook", "twitter"],
      scheduledTime: new Date(2023, 5, 20, 9, 0),
      author: "Dr. Rachel Chen",
      status: "scheduled",
    },
  ];

  // Get days in month
  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month
  const firstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Navigate months
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Check if date has posts
  const hasPosts = (date: Date) => {
    return scheduledPosts.some(
      (post) =>
        post.scheduledTime.getDate() === date.getDate() &&
        post.scheduledTime.getMonth() === date.getMonth() &&
        post.scheduledTime.getFullYear() === date.getFullYear()
    );
  };

  // Get posts for selected date
  const getPostsForDate = (date: Date) => {
    return scheduledPosts.filter(
      (post) =>
        post.scheduledTime.getDate() === date.getDate() &&
        post.scheduledTime.getMonth() === date.getMonth() &&
        post.scheduledTime.getFullYear() === date.getFullYear()
    );
  };

  // Render calendar days
  const renderCalendarDays = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const totalDays = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);

    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-12 border border-gray-100"></div>
      );
    }

    // Actual days of the month
    for (let i = 1; i <= totalDays; i++) {
      const dayDate = new Date(year, month, i);
      const isToday = new Date().toDateString() === dayDate.toDateString();
      const isSelected =
        selectedDate && selectedDate.toDateString() === dayDate.toDateString();
      const hasPost = hasPosts(dayDate);

      days.push(
        <div
          key={`day-${i}`}
          onClick={() => setSelectedDate(dayDate)}
          className={`h-12 border border-gray-100 p-1 cursor-pointer transition-colors
            ${isToday ? "bg-blue-50" : ""}
            ${isSelected ? "bg-blue-100 border-blue-300" : ""}
            ${hasPost ? "bg-green-50" : ""}
            hover:bg-gray-50`}
        >
          <div className="flex justify-between">
            <span
              className={`text-sm ${isToday ? "font-bold text-blue-600" : ""}`}
            >
              {i}
            </span>
            {hasPost && (
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            )}
          </div>
          {isSelected && hasPost && (
            <div className="text-xs text-gray-500 mt-1 truncate">
              {getPostsForDate(dayDate).length} scheduled
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  // Platform icons
  const PlatformIcon = ({ platform }: { platform: string }) => {
    const icons: Record<string, string> = {
      facebook: "text-blue-600",
      instagram: "text-pink-600",
      twitter: "text-sky-400",
      linkedin: "text-blue-700",
    };

    return (
      <span className={`${icons[platform] || "text-gray-500"} mx-0.5`}>
        {platform === "facebook" && "f"}
        {platform === "instagram" && "📷"}
        {platform === "twitter" && "𝕏"}
        {platform === "linkedin" && "in"}
      </span>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Content Schedule</h1>
          <button
            onClick={() => setShowSchedulingModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" /> Schedule New Post
          </button>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={prevMonth}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold text-gray-700">
                {currentDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <button
                onClick={nextMonth}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Today
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("month")}
                className={`px-3 py-1 text-sm rounded-md ${
                  viewMode === "month"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode("week")}
                className={`px-3 py-1 text-sm rounded-md ${
                  viewMode === "week" ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode("day")}
                className={`px-3 py-1 text-sm rounded-md ${
                  viewMode === "day" ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                Day
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-0">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-gray-500 text-sm py-2 font-medium"
              >
                {day}
              </div>
            ))}
            {renderCalendarDays()}
          </div>
        </div>

        {/* Scheduled Posts */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-700">
              {selectedDate
                ? `Scheduled Posts for ${selectedDate.toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}`
                : "Upcoming Scheduled Posts"}
            </h2>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="mr-1 h-4 w-4" />
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          {selectedDate ? (
            getPostsForDate(selectedDate).length > 0 ? (
              <div className="space-y-4">
                {getPostsForDate(selectedDate).map((post) => (
                  <div
                    key={post.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-800">
                        {post.title}
                      </h3>
                      <div className="flex space-x-2">
                        <button className="text-gray-500 hover:text-blue-600 p-1">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-500 hover:text-red-600 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{post.content}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-3">
                          {post.author}
                        </span>
                        <div className="flex">
                          {post.platforms.map((platform) => (
                            <PlatformIcon key={platform} platform={platform} />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {post.scheduledTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="mx-auto h-8 w-8 mb-2" />
                <p>No posts scheduled for this date</p>
                <button
                  onClick={() => setShowSchedulingModal(true)}
                  className="text-blue-600 hover:text-blue-800 mt-2 text-sm font-medium"
                >
                  Schedule a post
                </button>
              </div>
            )
          ) : (
            <div className="space-y-4">
              {scheduledPosts
                .sort(
                  (a, b) =>
                    a.scheduledTime.getTime() - b.scheduledTime.getTime()
                )
                .map((post) => (
                  <div
                    key={post.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-800">
                        {post.title}
                      </h3>
                      <div className="flex space-x-2">
                        <button className="text-gray-500 hover:text-blue-600 p-1">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-500 hover:text-red-600 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{post.content}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-3">
                          {post.author}
                        </span>
                        <div className="flex">
                          {post.platforms.map((platform) => (
                            <PlatformIcon key={platform} platform={platform} />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {post.scheduledTime.toLocaleDateString()} at{" "}
                        {post.scheduledTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Scheduling Modal */}
        {showSchedulingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Schedule New Post
                </h3>
                <button
                  onClick={() => setShowSchedulingModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Post
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="">Choose from drafts...</option>
                    <option value="1">Summer Teeth Whitening Special</option>
                    <option value="2">Oral Health Awareness</option>
                    <option value="3">New Pediatric Dentistry Services</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Platforms
                  </label>
                  <div className="flex space-x-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" checked />
                      <span>Facebook</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" checked />
                      <span>Instagram</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 border-t border-gray-200 p-4">
                <button
                  onClick={() => setShowSchedulingModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowSchedulingModal(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Schedule Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
