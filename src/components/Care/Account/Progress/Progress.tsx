import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Layout } from "../Layout";

export const Progress = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [habitData, setHabitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("habits");
  const [trainingProgress, setTrainingProgress] = useState({
    mouthState: 65,
    brushing: 80,
    flossing: 45,
  });

  // Sample data - in a real app this would come from an API
  const sampleData = {
    week: [
      { day: "Mon", brushing: 2, flossing: 1, rinse: 1, completion: 75 },
      { day: "Tue", brushing: 2, flossing: 0, rinse: 1, completion: 50 },
      { day: "Wed", brushing: 2, flossing: 1, rinse: 1, completion: 75 },
      { day: "Thu", brushing: 2, flossing: 1, rinse: 0, completion: 50 },
      { day: "Fri", brushing: 2, flossing: 1, rinse: 1, completion: 75 },
      { day: "Sat", brushing: 1, flossing: 0, rinse: 0, completion: 25 },
      { day: "Sun", brushing: 2, flossing: 1, rinse: 1, completion: 75 },
    ],
    month: [
      { week: "Week 1", brushing: 12, flossing: 5, rinse: 6, completion: 64 },
      { week: "Week 2", brushing: 14, flossing: 7, rinse: 7, completion: 78 },
      { week: "Week 3", brushing: 10, flossing: 4, rinse: 5, completion: 53 },
      { week: "Week 4", brushing: 13, flossing: 6, rinse: 6, completion: 69 },
    ],
    year: [
      { month: "Jan", brushing: 50, flossing: 25, rinse: 30, completion: 70 },
      { month: "Feb", brushing: 45, flossing: 20, rinse: 25, completion: 60 },
      { month: "Mar", brushing: 55, flossing: 30, rinse: 35, completion: 80 },
      { month: "Apr", brushing: 52, flossing: 28, rinse: 32, completion: 75 },
      { month: "May", brushing: 48, flossing: 22, rinse: 28, completion: 65 },
      { month: "Jun", brushing: 53, flossing: 27, rinse: 31, completion: 74 },
    ],
  };

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setHabitData(sampleData[timeRange]);
      setLoading(false);
    }, 800);
  }, [timeRange]);

  const calculateAverages = () => {
    if (!habitData || habitData.length === 0)
      return { completion: 0, brushing: 0, flossing: 0, rinse: 0 };

    const sum = habitData.reduce(
      (acc, day) => {
        return {
          completion: acc.completion + day.completion,
          brushing: acc.brushing + day.brushing,
          flossing: acc.flossing + day.flossing,
          rinse: acc.rinse + day.rinse,
        };
      },
      { completion: 0, brushing: 0, flossing: 0, rinse: 0 }
    );

    const count = habitData.length;
    return {
      completion: Math.round(sum.completion / count),
      brushing: Math.round(sum.brushing / count),
      flossing: Math.round(sum.flossing / count),
      rinse: Math.round(sum.rinse / count),
    };
  };

  const averages = calculateAverages();

  const calculateCurrentStreak = () => {
    // In a real app, this would calculate based on actual completion data
    return 3; // Sample streak of 3 days
  };

  const streak = calculateCurrentStreak();

  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={habitData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={
              timeRange === "week"
                ? "day"
                : timeRange === "month"
                ? "week"
                : "month"
            }
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="brushing" fill="#3B82F6" name="Brushing" />
          <Bar dataKey="flossing" fill="#10B981" name="Flossing" />
          <Bar dataKey="rinse" fill="#8B5CF6" name="Mouth Rinse" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderCompletionChart = () => {
    if (loading) return null;

    return (
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={habitData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={
              timeRange === "week"
                ? "day"
                : timeRange === "month"
                ? "week"
                : "month"
            }
          />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="completion"
            stroke="#EC4899"
            name="Completion %"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Progress Reports</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange("week")}
              className={`px-4 py-2 text-sm rounded-lg ${
                timeRange === "week"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange("month")}
              className={`px-4 py-2 text-sm rounded-lg ${
                timeRange === "month"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange("year")}
              className={`px-4 py-2 text-sm rounded-lg ${
                timeRange === "year"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Year
            </button>
          </div>
        </div>

        {/* Progress Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Average Completion
                </h2>
                <div className="text-3xl font-bold text-blue-600">
                  {averages.completion}%
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Current Streak
                </h2>
                <div className="text-3xl font-bold text-green-600">
                  {streak} days
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Daily Averages
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {averages.brushing}
                </div>
                <div className="text-sm text-gray-500">Brushing</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {averages.flossing}
                </div>
                <div className="text-sm text-gray-500">Flossing</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">
                  {averages.rinse}
                </div>
                <div className="text-sm text-gray-500">Rinse</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("habits")}
            className={`px-4 py-2 font-medium ${
              activeTab === "habits"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            Habit Completion
          </button>
          <button
            onClick={() => setActiveTab("training")}
            className={`px-4 py-2 font-medium ${
              activeTab === "training"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            Training Progress
          </button>
        </div>

        {activeTab === "habits" ? (
          <>
            {/* Habit Completion */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Habit Completion Rate
              </h2>
              {habitData.length > 0 ? (
                renderChart()
              ) : (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No habit data available
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Start tracking your habits to see progress
                  </p>
                </div>
              )}
            </div>

            {/* Completion Trend */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Completion Trend
              </h2>
              {habitData.length > 0 ? (
                renderCompletionChart()
              ) : (
                <div className="h-48 flex items-center justify-center text-gray-500">
                  No completion data available
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Training Progress
            </h2>

            <div className="space-y-6">
              {/* Mouth State Training */}
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Mouth State Awareness</h3>
                  <span className="font-semibold">
                    {trainingProgress.mouthState}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${trainingProgress.mouthState}%` }}
                  ></div>
                </div>
              </div>

              {/* Brushing Technique */}
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Brushing Technique</h3>
                  <span className="font-semibold">
                    {trainingProgress.brushing}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${trainingProgress.brushing}%` }}
                  ></div>
                </div>
              </div>

              {/* Flossing Technique */}
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Flossing Technique</h3>
                  <span className="font-semibold">
                    {trainingProgress.flossing}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-500 h-2.5 rounded-full"
                    style={{ width: `${trainingProgress.flossing}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Training Tips</h3>
              <p className="text-blue-700 text-sm">
                Complete the training modules in the Programs section to improve
                your scores. Regular practice will help you master proper dental
                care techniques.
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
