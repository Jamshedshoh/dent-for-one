import {
  Calendar,
  Clock,
  User,
  Search,
  Filter,
  Plus,
  ChevronDown,
  MoreVertical,
  Edit,
  Trash2,
  Phone,
  Video,
  MapPin,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { Layout } from "../Layout";

export const Booking = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");

  // Sample appointment data
  const appointments = {
    upcoming: [
      {
        id: 1,
        patient: "Michael Johnson",
        procedure: "Dental Cleaning",
        date: "2023-07-15",
        time: "9:00 AM - 9:30 AM",
        dentist: "Dr. Sarah Wilson",
        status: "confirmed",
        type: "in-person",
        notes: "Regular 6-month cleaning",
      },
      {
        id: 2,
        patient: "Emily Rodriguez",
        procedure: "Tooth Filling",
        date: "2023-07-15",
        time: "10:30 AM - 11:15 AM",
        dentist: "Dr. Michael Chen",
        status: "confirmed",
        type: "in-person",
        notes: "Composite filling - tooth #19",
      },
      {
        id: 3,
        patient: "David Kim",
        procedure: "Consultation",
        date: "2023-07-15",
        time: "2:00 PM - 2:30 PM",
        dentist: "Dr. Sarah Wilson",
        status: "confirmed",
        type: "virtual",
        notes: "Invisalign follow-up",
      },
    ],
    pending: [
      {
        id: 4,
        patient: "Jessica Miller",
        procedure: "Initial Exam",
        date: "2023-07-16",
        time: "9:30 AM - 10:15 AM",
        dentist: "Dr. Michael Chen",
        status: "pending",
        type: "in-person",
        notes: "New patient - insurance verification needed",
      },
    ],
    completed: [
      {
        id: 5,
        patient: "Robert Smith",
        procedure: "Root Canal",
        date: "2023-07-14",
        time: "11:00 AM - 12:00 PM",
        dentist: "Dr. Lisa Park",
        status: "completed",
        type: "in-person",
        notes: "Tooth #30 - prescribed antibiotics",
      },
    ],
  };

  // Filter appointments based on search
  const filteredAppointments = appointments[
    activeTab as keyof typeof appointments
  ].filter((appt) => {
    return (
      appt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.procedure.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.dentist.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Dentists list
  const dentists = [
    { id: 1, name: "Dr. Sarah Wilson", specialty: "General Dentistry" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Endodontics" },
    { id: 3, name: "Dr. Lisa Park", specialty: "Periodontics" },
  ];

  // Procedures list
  const procedures = [
    "Dental Cleaning",
    "Tooth Filling",
    "Root Canal",
    "Extraction",
    "Consultation",
    "Crown Placement",
    "Dental Implant",
    "Teeth Whitening",
    "Invisalign Checkup",
  ];

  return (
    <Layout>
      <div className="container mx-auto">
        {/* Main Content */}
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {/* Calendar View Toggle */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">July 2023</h2>
              <p className="text-sm text-gray-500">
                Manage patient appointments
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("day")}
                className={`px-3 py-1 text-sm rounded-md ${
                  viewMode === "day" ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                Day
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
                onClick={() => setViewMode("month")}
                className={`px-3 py-1 text-sm rounded-md ${
                  viewMode === "month"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                Month
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "upcoming"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "pending"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Pending
            </button>
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "completed"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
          </div>

          {/* Search and Actions */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowNewBookingModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <Plus className="mr-2 h-5 w-5" /> New Booking
                </button>
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>All Dentists</option>
                    {dentists.map((dentist) => (
                      <option key={dentist.id}>{dentist.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {filteredAppointments.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-start mb-4 md:mb-0">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                          <User className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {appointment.patient}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {appointment.procedure}
                          </p>
                          <div className="flex items-center mt-1">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                appointment.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : appointment.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {appointment.status === "confirmed"
                                ? "Confirmed"
                                : appointment.status === "pending"
                                ? "Pending"
                                : "Completed"}
                            </span>
                            <span
                              className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                appointment.type === "in-person"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {appointment.type === "in-person" ? (
                                <>
                                  <MapPin className="mr-1 h-3 w-3" /> In-Person
                                </>
                              ) : (
                                <>
                                  <Video className="mr-1 h-3 w-3" /> Virtual
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium">{appointment.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="font-medium">{appointment.time}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Dentist</p>
                          <p className="font-medium">{appointment.dentist}</p>
                        </div>
                      </div>
                    </div>
                    {appointment.notes && (
                      <div className="mt-3 p-2 bg-blue-50 rounded">
                        <p className="text-xs text-blue-700">
                          {appointment.notes}
                        </p>
                      </div>
                    )}
                    <div className="flex justify-end space-x-3 mt-4">
                      {appointment.status === "pending" && (
                        <>
                          <button className="flex items-center text-green-600 hover:text-green-800">
                            <Check className="mr-1 h-4 w-4" /> Confirm
                          </button>
                          <button className="flex items-center text-red-600 hover:text-red-800">
                            <X className="mr-1 h-4 w-4" /> Decline
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setShowRescheduleModal(true);
                        }}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="mr-1 h-4 w-4" /> Reschedule
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-gray-800">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  No {activeTab} appointments found
                </h3>
                <p className="text-gray-600 mb-4">
                  {activeTab === "upcoming"
                    ? "All upcoming appointments will appear here"
                    : activeTab === "pending"
                    ? "Pending appointment requests will appear here"
                    : "Completed appointments will appear here"}
                </p>
                <button
                  onClick={() => setShowNewBookingModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Schedule New Appointment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* New Booking Modal */}
        {showNewBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
              <div className="flex justify-between items-center border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  New Appointment
                </h3>
                <button
                  onClick={() => setShowNewBookingModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient
                    </label>
                    <div className="relative">
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none">
                        <option>Select patient...</option>
                        <option>Michael Johnson</option>
                        <option>Emily Rodriguez</option>
                        <option>David Kim</option>
                        <option>Jessica Miller</option>
                        <option>Robert Smith</option>
                        <option>+ Add New Patient</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dentist
                    </label>
                    <div className="relative">
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none">
                        {dentists.map((dentist) => (
                          <option key={dentist.id}>{dentist.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Procedure
                    </label>
                    <div className="relative">
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none">
                        {procedures.map((procedure) => (
                          <option key={procedure}>{procedure}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Appointment Type
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="appointmentType"
                          value="in-person"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          In-Person
                        </span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="appointmentType"
                          value="virtual"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Virtual
                        </span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px]"
                      placeholder="Any special instructions or notes..."
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end border-t border-gray-200 p-4">
                <button
                  onClick={() => setShowNewBookingModal(false)}
                  className="text-gray-600 hover:text-gray-800 mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle booking logic
                    setShowNewBookingModal(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reschedule Modal */}
        {showRescheduleModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Reschedule Appointment
                </h3>
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Patient</p>
                  <p className="font-medium">{selectedAppointment.patient}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Current Appointment</p>
                  <p className="font-medium">
                    {selectedAppointment.date} at{" "}
                    {selectedAppointment.time.split(" - ")[0]}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Time
                  </label>
                  <input
                    type="time"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    id="send-notification"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label
                    htmlFor="send-notification"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Send notification to patient
                  </label>
                </div>
              </div>
              <div className="flex justify-end border-t border-gray-200 p-4">
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="text-gray-600 hover:text-gray-800 mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle reschedule logic
                    setShowRescheduleModal(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Confirm Reschedule
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
