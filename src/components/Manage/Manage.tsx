import {
  Activity,
  Calendar,
  Clock,
  Users,
  FileText,
  AlertCircle,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Layout } from "./Layout";

export const Manage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);

  // Sample data
  const practiceMetrics = [
    {
      title: "Today's Appointments",
      value: 18,
      change: "+2",
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Patients Seen",
      value: 12,
      change: "+3",
      icon: <Users className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Treatment Plans",
      value: 7,
      change: "+1",
      icon: <FileText className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Chair Utilization",
      value: "85%",
      change: "+5%",
      icon: <Activity className="h-5 w-5 text-orange-500" />,
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: "Michael Johnson",
      time: "9:00 AM",
      procedure: "Dental Cleaning",
      status: "confirmed",
      duration: "30 min",
    },
    {
      id: 2,
      patient: "Sarah Williams",
      time: "10:30 AM",
      procedure: "Tooth Filling",
      status: "confirmed",
      duration: "45 min",
    },
    {
      id: 3,
      patient: "Robert Chen",
      time: "11:30 AM",
      procedure: "Initial Consultation",
      status: "new",
      duration: "60 min",
    },
  ];

  const alerts = [
    {
      id: 1,
      type: "stock",
      message: "Composite resin running low (3 packs left)",
      priority: "high",
    },
    {
      id: 2,
      type: "insurance",
      message: "5 claims pending submission",
      priority: "medium",
    },
    {
      id: 3,
      type: "patient",
      message: "2 unconfirmed appointments for tomorrow",
      priority: "low",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Appointment completed",
      patient: "Emily Rodriguez",
      time: "30 min ago",
      details: "Dental cleaning",
    },
    {
      id: 2,
      action: "Treatment plan approved",
      patient: "David Kim",
      time: "2 hours ago",
      details: "Invisalign treatment",
    },
    {
      id: 3,
      action: "New patient registered",
      patient: "Jessica Miller",
      time: "4 hours ago",
      details: "Initial consultation scheduled",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto">
        {/* Main Content */}
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {practiceMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">
                      {metric.value}
                    </p>
                  </div>
                  {metric.icon}
                </div>
                <p className="text-sm mt-2">
                  <span className="text-green-500 font-medium">
                    {metric.change}
                  </span>{" "}
                  from yesterday
                </p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "overview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "schedule"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("schedule")}
            >
              Schedule
            </button>
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "patients"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("patients")}
            >
              Patients
            </button>
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "reports"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("reports")}
            >
              Reports
            </button>
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Appointments */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Upcoming Appointments
                  </h2>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="divide-y divide-gray-200">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="px-6 py-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {appointment.patient}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.procedure}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {appointment.time}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.duration}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            appointment.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {appointment.status === "confirmed"
                            ? "Confirmed"
                            : "New Patient"}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Activity
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="px-6 py-4 hover:bg-gray-50"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.action} - {activity.patient}
                          </p>
                          <p className="text-sm text-gray-500">
                            {activity.details}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setShowNewPatientModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg flex flex-col items-center"
                  >
                    <Plus className="h-6 w-6 mb-2" />
                    <span>New Patient</span>
                  </button>
                  <button className="bg-white border border-gray-300 hover:bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                    <Calendar className="h-6 w-6 mb-2 text-blue-600" />
                    <span>Schedule</span>
                  </button>
                  <button className="bg-white border border-gray-300 hover:bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                    <FileText className="h-6 w-6 mb-2 text-purple-600" />
                    <span>Treatment Plan</span>
                  </button>
                  <button className="bg-white border border-gray-300 hover:bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                    <ArrowUpRight className="h-6 w-6 mb-2 text-green-600" />
                    <span>Quick Bill</span>
                  </button>
                </div>
              </div>

              {/* Alerts */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Alerts
                  </h2>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="divide-y divide-gray-200">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="px-6 py-4 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div
                          className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                            alert.priority === "high"
                              ? "bg-red-100 text-red-600"
                              : alert.priority === "medium"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {alert.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 capitalize">
                            {alert.type} alert
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Patient Modal */}
        {showNewPatientModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  New Patient Registration
                </h3>
                <button
                  onClick={() => setShowNewPatientModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Patient's full name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="patient@example.com"
                  />
                </div>
              </div>
              <div className="flex justify-end border-t border-gray-200 p-4">
                <button
                  onClick={() => setShowNewPatientModal(false)}
                  className="text-gray-600 hover:text-gray-800 mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle patient registration logic
                    setShowNewPatientModal(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Register Patient
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
