import {
  Video,
  Phone,
  MessageSquare,
  Calendar,
  Clock,
  User,
  Star,
  ChevronDown,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { Layout } from "../Layout";

export const Consultation = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Sample consultation data
  const consultations = {
    upcoming: [
      {
        id: 1,
        dentist: "Dr. Sarah Johnson",
        specialty: "Orthodontics",
        date: "Today",
        time: "3:30 PM - 4:00 PM",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4.8,
        type: "Follow-up (Invisalign)",
        status: "Confirmed",
      },
      {
        id: 2,
        dentist: "Dr. Michael Chen",
        specialty: "Endodontics",
        date: "Tomorrow",
        time: "11:00 AM - 11:30 AM",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.6,
        type: "Root Canal Consultation",
        status: "Confirmed",
      },
    ],
    past: [
      {
        id: 3,
        dentist: "Dr. Emily Wong",
        specialty: "Pediatric Dentistry",
        date: "June 15, 2023",
        time: "2:00 PM - 2:30 PM",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        rating: 4.9,
        type: "Child Dental Checkup",
        status: "Completed",
        notes: "Recommended fluoride treatment",
      },
    ],
  };

  // Sample dentists available for immediate consultation
  const availableDentists = [
    {
      id: 1,
      name: "Dr. James Wilson",
      specialty: "General Dentistry",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 4.7,
      languages: ["English", "Spanish"],
      available: true,
      nextAvailable: "Now",
    },
    {
      id: 2,
      name: "Dr. Lisa Park",
      specialty: "Periodontics",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      rating: 4.9,
      languages: ["English", "Korean"],
      available: false,
      nextAvailable: "3:45 PM",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              1-on-1 Consultations
            </h1>
            <p className="text-gray-600">
              Connect with your dentist for personalized care
            </p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button
              onClick={() => setShowJoinModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Video className="mr-2 h-5 w-5" /> Join Now
            </button>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md flex items-center"
            >
              <Calendar className="mr-2 h-5 w-5" /> Schedule
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
              activeTab === "past"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("past")}
          >
            Past Consultations
          </button>
          <button
            className={`pb-3 px-4 font-medium ${
              activeTab === "dentists"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("dentists")}
          >
            Available Dentists
          </button>
        </div>

        {/* Main Content */}
        {activeTab === "upcoming" && (
          <div className="space-y-4">
            {consultations.upcoming.length > 0 ? (
              consultations.upcoming.map((consultation) => (
                <div
                  key={consultation.id}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-start mb-4 md:mb-0">
                      <img
                        src={consultation.avatar}
                        alt={consultation.dentist}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {consultation.dentist}
                        </h3>
                        <p className="text-gray-600">
                          {consultation.specialty}
                        </p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm text-gray-700 ml-1">
                            {consultation.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{consultation.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">{consultation.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="font-medium">{consultation.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p
                          className={`font-medium ${
                            consultation.status === "Confirmed"
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        >
                          {consultation.status}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button className="flex items-center text-blue-600 hover:text-blue-800">
                      <MessageSquare className="mr-2 h-5 w-5" /> Message
                    </button>
                    <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                      <Video className="mr-2 h-5 w-5" /> Join Consultation
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  No upcoming consultations
                </h3>
                <p className="text-gray-600 mb-4">
                  Schedule a consultation with your dentist
                </p>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Schedule Now
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "past" && (
          <div className="space-y-4">
            {consultations.past.length > 0 ? (
              consultations.past.map((consultation) => (
                <div
                  key={consultation.id}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-start mb-4 md:mb-0">
                      <img
                        src={consultation.avatar}
                        alt={consultation.dentist}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {consultation.dentist}
                        </h3>
                        <p className="text-gray-600">
                          {consultation.specialty}
                        </p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm text-gray-700 ml-1">
                            {consultation.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{consultation.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">{consultation.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="font-medium">{consultation.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="text-gray-600 font-medium">
                          {consultation.status}
                        </p>
                      </div>
                    </div>
                  </div>
                  {consultation.notes && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-800 mb-1">
                        Dentist Notes
                      </h4>
                      <p className="text-blue-700">{consultation.notes}</p>
                    </div>
                  )}
                  <div className="flex justify-end space-x-3 mt-6">
                    <button className="flex items-center text-blue-600 hover:text-blue-800">
                      <MessageSquare className="mr-2 h-5 w-5" /> Message
                    </button>
                    <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                      Schedule Follow-up
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  No past consultations
                </h3>
                <p className="text-gray-600">
                  Your consultation history will appear here
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "dentists" && (
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Available for Immediate Consultation
              </h2>
              <div className="space-y-4">
                {availableDentists.filter((d) => d.available).length > 0 ? (
                  availableDentists
                    .filter((d) => d.available)
                    .map((dentist) => (
                      <div
                        key={dentist.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center">
                          <img
                            src={dentist.avatar}
                            alt={dentist.name}
                            className="w-12 h-12 rounded-full object-cover mr-4"
                          />
                          <div>
                            <h3 className="font-medium text-gray-800">
                              {dentist.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {dentist.specialty}
                            </p>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm text-gray-700 ml-1">
                                {dentist.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                          <Video className="mr-2 h-5 w-5" /> Consult Now
                        </button>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <Clock className="mx-auto h-8 w-8 mb-2" />
                    <p>
                      No dentists currently available for immediate consultation
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                All Dentists
              </h2>
              <div className="space-y-4">
                {availableDentists.map((dentist) => (
                  <div
                    key={dentist.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center">
                      <img
                        src={dentist.avatar}
                        alt={dentist.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {dentist.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {dentist.specialty}
                        </p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm text-gray-700 ml-1">
                            {dentist.rating}
                          </span>
                          <span className="text-sm text-gray-500 ml-3">
                            {dentist.languages.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Next available:</p>
                      <p className="font-medium">{dentist.nextAvailable}</p>
                      <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Join Consultation Modal */}
        {showJoinModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Join Consultation
                </h3>
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Consultation
                  </label>
                  <div className="relative">
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none">
                      <option>Today, 3:30 PM - Dr. Sarah Johnson</option>
                      <option>Tomorrow, 11:00 AM - Dr. Michael Chen</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex justify-between space-x-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md flex flex-col items-center">
                    <Video className="h-6 w-6 mb-2" />
                    <span>Video Call</span>
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-md flex flex-col items-center">
                    <Phone className="h-6 w-6 mb-2" />
                    <span>Audio Only</span>
                  </button>
                </div>
              </div>
              <div className="flex justify-end border-t border-gray-200 p-4">
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="text-gray-600 hover:text-gray-800 mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle join consultation logic
                    setShowJoinModal(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Join Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Consultation Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Schedule Consultation
                </h3>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Dentist
                  </label>
                  <div className="relative">
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none">
                      <option>Dr. Sarah Johnson (Orthodontics)</option>
                      <option>Dr. Michael Chen (Endodontics)</option>
                      <option>Dr. Emily Wong (Pediatric Dentistry)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Type
                  </label>
                  <div className="relative">
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none">
                      <option>General Consultation</option>
                      <option>Follow-up</option>
                      <option>Emergency</option>
                      <option>Treatment Discussion</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Consultation
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px]"
                    placeholder="Briefly describe your concern..."
                  />
                </div>
              </div>
              <div className="flex justify-end border-t border-gray-200 p-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="text-gray-600 hover:text-gray-800 mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle schedule logic
                    setShowScheduleModal(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
