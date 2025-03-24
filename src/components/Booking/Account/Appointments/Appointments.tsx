import { useState } from "react";
import { Search } from "../../../ui/Search";
import { CollapseCard } from "../../../ui/CollapseCard";
import { Edit, Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import { Modal } from "../../../ui/Modal";
import { Layout } from "../Layout";

interface Appointment {
  id: string;
  patientName: string;
  patientContact: string;
  date: string;
  reason: string;
  duration: number;
  status: string;
}

const mockAppointments: Appointment[] = [
  {
    id: "12345",
    patientName: "John Doe",
    patientContact: "john@example.com",
    date: "2023-10-15T09:00:00",
    reason: "Routine Checkup",
    duration: 30,
    status: "scheduled"
  },
  {
    id: "67890",
    patientName: "Jane Smith",
    patientContact: "jane@example.com",
    date: "2023-10-16T10:30:00",
    reason: "Toothache",
    duration: 45,
    status: "completed"
  },
  {
    id: "54321",
    patientName: "Michael Brown",
    patientContact: "michael@example.com",
    date: "2023-10-17T14:00:00",
    reason: "Cleaning",
    duration: 60,
    status: "cancelled"
  }
];

export const Appointments = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [searchQuery, setSearchQuery] = useState("");
  const [editAppointmentId, setEditAppointmentId] = useState<string | null>(null);

  const updateAppointmentStatus = (id: string, status: string) => {
    setAppointments(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status } : app
      )
    );
  };

  const handleEditAppointment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = e.currentTarget.status.value;
    try {
      if (editAppointmentId) {
        updateAppointmentStatus(editAppointmentId, status);
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
    setEditAppointmentId(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const appointmentActions = (appointmentId: string) => {
    return [
      <button
        key="edit"
        className="text-blue-500 hover:text-blue-600"
        aria-label="Edit"
        title="Edit"
        onClick={() => setEditAppointmentId(appointmentId)}
      >
        <Edit />
      </button>,
    ];
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.id.includes(searchQuery) ||
      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            My Appointments
          </h2>
          <div className="flex items-center space-x-4">
            <Calendar className="w-6 h-6 text-gray-600" />
            <span className="text-gray-600">{appointments.length} appointments</span>
          </div>
        </div>

        <Search query={searchQuery} onSearch={setSearchQuery} />

        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <CollapseCard
              key={appointment.id}
              title={
                <span className="flex items-center gap-2">
                  <span>Appointment #{appointment.id}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      appointment.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : appointment.status === "scheduled"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                  </span>
                </span>
              }
              actions={appointmentActions(appointment.id)}
            >
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(appointment.status)}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Appointment Date:
                    </h3>
                    <div className="text-sm text-gray-500">
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200">
                {/* Patient Info */}
                <div className="p-4 bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Patient Information
                  </h3>
                  <p className="text-sm">Name: {appointment.patientName}</p>
                  <p className="text-sm mt-1">
                    Contact: {appointment.patientContact}
                  </p>
                </div>

                {/* Appointment Details */}
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Appointment Details
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <p className="text-sm text-gray-500">Reason:</p>
                      <span className="font-medium">{appointment.reason}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <p className="text-sm text-gray-500">Duration:</p>
                      <span className="font-medium">{appointment.duration} minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </CollapseCard>
          ))}

          {filteredAppointments.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No appointments found</p>
            </div>
          )}
        </div>

        {editAppointmentId && (
          <Modal
            isOpen={true}
            onClose={() => setEditAppointmentId(null)}
            title="Edit Appointment"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Edit Appointment
            </h2>
            <p className="text-gray-600 mb-4">
              Appointment ID: <span className="font-medium">{editAppointmentId}</span>
            </p>

            <form onSubmit={handleEditAppointment} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="status" className="font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Save
              </button>
            </form>
          </Modal>
        )}
      </div>
    </Layout>
  );
};
