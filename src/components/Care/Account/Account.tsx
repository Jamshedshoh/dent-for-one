import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Layout } from "./Layout";

export const Account = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [habits, setHabits] = useState([]);
  const [progress, setProgress] = useState(0);
  const [activePrograms, setActivePrograms] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Sample data - in a real app this would come from APIs
  const sampleHabits = [
    { id: 1, name: "Brushing", target: 2, completed: 1, unit: "times daily" },
    { id: 2, name: "Flossing", target: 1, completed: 0, unit: "time daily" },
    { id: 3, name: "Mouth Rinse", target: 1, completed: 1, unit: "time daily" },
  ];

  const samplePrograms = [
    { id: 1, name: "Daily Brushing Routine", progress: 65 },
    { id: 2, name: "Flossing Mastery", progress: 30 },
  ];

  const sampleNotifications = [
    {
      id: 1,
      message: "Dr. Smith sent you a message",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      message: "Your brushing streak is 3 days!",
      time: "1 day ago",
      read: true,
    },
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setHabits(sampleHabits);
      setActivePrograms(samplePrograms);
      setNotifications(sampleNotifications);
      calculateProgress(sampleHabits);
    }, 500);
  }, []);

  const calculateProgress = (habitsList) => {
    const total = habitsList.reduce((sum, habit) => sum + habit.target, 0);
    const completed = habitsList.reduce(
      (sum, habit) => sum + habit.completed,
      0
    );
    setProgress(Math.round((completed / total) * 100));
  };

  const markHabitComplete = (habitId) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        const newCompleted = Math.min(habit.completed + 1, habit.target);
        return { ...habit, completed: newCompleted };
      }
      return habit;
    });
    setHabits(updatedHabits);
    calculateProgress(updatedHabits);
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <Layout>
      <div className="container mx-auto p-6">
        {/* Header with Date */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Good morning, <span className="text-blue-600">John</span>!
          </h1>
          <p className="text-gray-600">{formatDate(currentDate)}</p>
        </div>

        {/* Welcome Message */}
        <div className="bg-blue-50 rounded-lg p-4 mb-8">
          <p className="text-blue-800">
            Track your dental care habits and stay on top of your oral health.
          </p>
        </div>

        {/* Progress Circle */}
        <div className="flex justify-center mb-8">
          <div className="w-48 h-48">
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={{
                path: {
                  stroke: `rgba(59, 130, 246, ${progress / 100})`,
                  strokeLinecap: "butt",
                },
                text: {
                  fill: "#1F2937",
                  fontSize: "24px",
                  fontWeight: "bold",
                },
                trail: {
                  stroke: "#E5E7EB",
                },
              }}
            />
          </div>
        </div>

        {/* Today's Habits */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Today's Habits
          </h2>
          <div className="space-y-4">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-800">{habit.name}</h3>
                  <p className="text-sm text-gray-500">
                    {habit.completed}/{habit.target} {habit.unit}
                  </p>
                </div>
                <button
                  onClick={() => markHabitComplete(habit.id)}
                  disabled={habit.completed >= habit.target}
                  className={`px-4 py-2 rounded-lg ${
                    habit.completed >= habit.target
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {habit.completed >= habit.target ? "Completed" : "Mark Done"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Active Programs */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Active Programs
            </h2>
            <Link
              to="/programs"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All
            </Link>
          </div>

          {activePrograms.length > 0 ? (
            <div className="space-y-4">
              {activePrograms.map((program) => (
                <div
                  key={program.id}
                  className="p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-800">
                      {program.name}
                    </h3>
                    <span className="text-blue-600 font-medium">
                      {program.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${program.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">No active programs</p>
              <Link
                to="/programs"
                className="mt-2 inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                Browse Programs
              </Link>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Notifications
            </h2>
            {unreadNotifications > 0 && (
              <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                {unreadNotifications} new
              </span>
            )}
          </div>

          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg ${
                    notification.read ? "bg-gray-50" : "bg-blue-50"
                  }`}
                >
                  <div className="flex justify-between">
                    <p
                      className={`${
                        notification.read
                          ? "text-gray-600"
                          : "font-medium text-blue-800"
                      }`}
                    >
                      {notification.message}
                    </p>
                    <span className="text-sm text-gray-500">
                      {notification.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              No notifications
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
