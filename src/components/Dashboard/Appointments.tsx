export const Appointments = () => {
  const appointments = [
    {
      id: 1,
      patient: "John Doe",
      date: "2025-01-18",
      time: "10:00 AM",
      status: "Scheduled",
    },
    {
      id: 2,
      patient: "Jane Smith",
      date: "2025-01-19",
      time: "11:30 AM",
      status: "Completed",
    },
    {
      id: 3,
      patient: "Tom Lee",
      date: "2025-01-20",
      time: "02:00 PM",
      status: "Pending",
    },
    // Add more mock data as needed
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Appointments</h2>

      {/* Appointment List */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Upcoming Appointments
        </h3>

        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Patient</th>
              <th className="px-4 py-2 text-left text-gray-700">Date</th>
              <th className="px-4 py-2 text-left text-gray-700">Time</th>
              <th className="px-4 py-2 text-left text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-4 py-2">{appointment.patient}</td>
                <td className="px-4 py-2">{appointment.date}</td>
                <td className="px-4 py-2">{appointment.time}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-sm font-semibold rounded-full ${
                      appointment.status === "Scheduled"
                        ? "bg-blue-100 text-blue-700"
                        : appointment.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Schedule New Appointment */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Schedule New Appointment
        </h3>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="patient"
              className="block text-gray-700 font-semibold mb-1"
            >
              Patient Name
            </label>
            <input
              type="text"
              id="patient"
              placeholder="Enter patient name"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-gray-700 font-semibold mb-1"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-gray-700 font-semibold mb-1"
              >
                Time
              </label>
              <input
                type="time"
                id="time"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              Schedule Appointment
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
