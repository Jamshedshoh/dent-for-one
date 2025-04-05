import {
  Activity,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Edit,
  MessageSquare,
  Plus,
  Settings,
  Star,
  TrendingUp,
  User,
  Video,
} from "lucide-react";
import { useState } from "react";
import { Layout } from "../Layout";

export const Care = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showNewHabitModal, setShowNewHabitModal] = useState(false);
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);

  // Sample user data
  const user = {
    name: "Michael Johnson",
    streak: 12,
    points: 450,
    dentist: "Dr. Sarah Wilson",
    nextAppointment: "2023-07-25 10:00 AM",
  };

  // Sample care programs
  const carePrograms = [
    {
      id: 1,
      title: "Gum Health Improvement",
      dentist: "Dr. Sarah Wilson",
      startDate: "2023-06-15",
      duration: "8 weeks",
      progress: 65,
      tasks: [
        { id: 1, name: "Brushing (2x/day)", completed: true },
        { id: 2, name: "Flossing (daily)", completed: true },
        { id: 3, name: "Antibacterial rinse", completed: false },
        { id: 4, name: "Massage gums", completed: false },
      ],
    },
    {
      id: 2,
      title: "Post-Whitening Care",
      dentist: "Dr. Michael Chen",
      startDate: "2023-07-01",
      duration: "4 weeks",
      progress: 25,
      tasks: [
        { id: 1, name: "Avoid staining foods", completed: true },
        { id: 2, name: "Use sensitivity toothpaste", completed: true },
        { id: 3, name: "Weekly whitening touch-up", completed: false },
      ],
    },
  ];

  // Sample habits to track
  const habits = [
    {
      id: 1,
      name: "Morning Brushing",
      streak: 12,
      goal: "2 minutes",
      time: "7:30 AM",
    },
    {
      id: 2,
      name: "Evening Brushing",
      streak: 10,
      goal: "2 minutes",
      time: "9:00 PM",
    },
    {
      id: 3,
      name: "Daily Flossing",
      streak: 8,
      goal: "1 minute",
      time: "9:05 PM",
    },
    {
      id: 4,
      name: "Tongue Cleaning",
      streak: 5,
      goal: "30 seconds",
      time: "9:07 PM",
    },
  ];

  // Sample educational content
  const education = [
    {
      id: 1,
      title: "Proper Brushing Technique",
      type: "video",
      duration: "3 min",
      viewed: true,
    },
    {
      id: 2,
      title: "Benefits of Flossing",
      type: "article",
      duration: "5 min",
      viewed: false,
    },
    {
      id: 3,
      title: "Nutrition for Healthy Gums",
      type: "article",
      duration: "4 min",
      viewed: false,
    },
  ];

  // Sample messages
  const messages = [
    {
      id: 1,
      sender: "Dr. Sarah Wilson",
      content: "How is the new brushing technique working for you?",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      sender: "Dent Care Team",
      content: "New educational content added to your program",
      time: "1 day ago",
      read: true,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto">
        {/* Main Content */}
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "dashboard"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "programs"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("programs")}
            >
              Care Programs
            </button>
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "habits"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("habits")}
            >
              Habits
            </button>
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "education"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("education")}
            >
              Education
            </button>
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "messages"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("messages")}
            >
              Messages
            </button>
          </div>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Current Streak
                      </p>
                      <p className="text-2xl font-semibold text-gray-900 mt-1">
                        {user.streak} days
                      </p>
                    </div>
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Active Programs
                      </p>
                      <p className="text-2xl font-semibold text-gray-900 mt-1">
                        {carePrograms.length}
                      </p>
                    </div>
                    <Activity className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Next Appointment
                      </p>
                      <p className="text-2xl font-semibold text-gray-900 mt-1">
                        {user.nextAppointment}
                      </p>
                    </div>
                    <Calendar className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
              </div>

              {/* Current Program */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Current Care Program
                  </h2>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View All
                  </button>
                </div>
                {carePrograms.length > 0 ? (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {carePrograms[0].title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          By {carePrograms[0].dentist}
                        </p>
                        <div className="mt-2">
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            {carePrograms[0].duration} program
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Progress</p>
                        <p className="text-xl font-semibold text-gray-900">
                          {carePrograms[0].progress}%
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${carePrograms[0].progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      {carePrograms[0].tasks.map((task) => (
                        <div key={task.id} className="flex items-center">
                          <CheckCircle
                            className={`h-5 w-5 mr-2 ${
                              task.completed
                                ? "text-green-500"
                                : "text-gray-300"
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              task.completed
                                ? "text-gray-500 line-through"
                                : "text-gray-700"
                            }`}
                          >
                            {task.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>
                      No active care programs. Your dentist can assign one for
                      you.
                    </p>
                  </div>
                )}
              </div>

              {/* Today's Habits */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Today's Habits
                  </h2>
                  <button
                    onClick={() => setShowNewHabitModal(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Habit
                  </button>
                </div>
                <div className="space-y-3">
                  {habits.map((habit) => (
                    <div
                      key={habit.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {habit.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {habit.time} • {habit.goal}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700 mr-3">
                          {habit.streak} day streak
                        </span>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm">
                          Done
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Programs Tab */}
          {activeTab === "programs" && (
            <div className="space-y-4">
              {carePrograms.length > 0 ? (
                carePrograms.map((program) => (
                  <div
                    key={program.id}
                    className="bg-white rounded-lg shadow overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {program.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Created by {program.dentist}
                          </p>
                          <div className="mt-2">
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              Started on {program.startDate}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedProgram(program);
                            // Would open program details in a real app
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{program.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${program.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Tasks
                        </h4>
                        <div className="space-y-2">
                          {program.tasks.map((task) => (
                            <div key={task.id} className="flex items-center">
                              <CheckCircle
                                className={`h-5 w-5 mr-2 ${
                                  task.completed
                                    ? "text-green-500"
                                    : "text-gray-300"
                                }`}
                              />
                              <span
                                className={`text-sm ${
                                  task.completed
                                    ? "text-gray-500 line-through"
                                    : "text-gray-700"
                                }`}
                              >
                                {task.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <Activity className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    No Active Programs
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Your dentist can create a personalized care program for you
                  </p>
                  <button
                    onClick={() => setShowConsultModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Request Program
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Habits Tab */}
          {activeTab === "habits" && (
            <div>
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Oral Care Habits
                  </h2>
                  <button
                    onClick={() => setShowNewHabitModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <Plus className="mr-2 h-5 w-5" /> New Habit
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    className="bg-white rounded-lg shadow p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">
                          {habit.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {habit.time} • {habit.goal}
                        </p>
                      </div>
                      <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {habit.streak} day streak
                      </span>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                        <Edit className="h-4 w-4 inline mr-1" /> Edit
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                        Mark as Done
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="space-y-4">
              {education.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {item.type} • {item.duration}
                      </p>
                    </div>
                    {item.viewed ? (
                      <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                        Viewed
                      </span>
                    ) : (
                      <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Content
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="space-y-4">
              <button
                onClick={() => setShowConsultModal(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md flex items-center justify-center"
              >
                <Video className="mr-2 h-5 w-5" /> Start Video Consultation
              </button>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {message.sender}
                      </h3>
                      <p className="text-sm text-gray-500">{message.time}</p>
                    </div>
                    {!message.read && (
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    )}
                  </div>
                  <p className="mt-2 text-gray-700">{message.content}</p>
                  <div className="mt-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* New Habit Modal */}
        {showNewHabitModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  New Oral Care Habit
                </h3>
                <button
                  onClick={() => setShowNewHabitModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Habit Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g. Evening Flossing"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time of Day
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                    <option>Specific Time</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration Goal
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g. 2 minutes"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reminder
                  </label>
                  <div className="flex items-center">
                    <input
                      id="enable-reminder"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="enable-reminder"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Enable daily reminder
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end border-t border-gray-200 p-4">
                <button
                  onClick={() => setShowNewHabitModal(false)}
                  className="text-gray-600 hover:text-gray-800 mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle habit creation logic
                    setShowNewHabitModal(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Create Habit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Consultation Modal */}
        {showConsultModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Start Consultation
                </h3>
                <button
                  onClick={() => setShowConsultModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Consultation Type
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="consultType"
                        value="video"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        defaultChecked
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Video Call
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="consultType"
                        value="message"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Message
                      </span>
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dentist
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option>Dr. Sarah Wilson (General Dentistry)</option>
                    <option>Dr. Michael Chen (Endodontics)</option>
                    <option>Dr. Lisa Park (Periodontics)</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option>Request new care program</option>
                    <option>Modify current program</option>
                    <option>Pain or discomfort</option>
                    <option>General question</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px]"
                    placeholder="Describe your concern..."
                  />
                </div>
              </div>
              <div className="flex justify-end border-t border-gray-200 p-4">
                <button
                  onClick={() => setShowConsultModal(false)}
                  className="text-gray-600 hover:text-gray-800 mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle consultation request logic
                    setShowConsultModal(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Request Consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
