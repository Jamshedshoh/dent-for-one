
export const DatabaseManagement = () => {
  const databaseRecords = [
    {
      id: 1,
      patientName: "John Doe",
      lastVisit: "2025-01-15",
      treatment: "Teeth Cleaning",
      status: "Active",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      lastVisit: "2025-01-10",
      treatment: "Root Canal",
      status: "Inactive",
    },
    {
      id: 3,
      patientName: "Tom Lee",
      lastVisit: "2025-01-12",
      treatment: "Fillings",
      status: "Active",
    },
    // Add more mock data as needed
  ];

  const handleDelete = (id: number) => {
    // Implement logic to delete the record from the database
    alert(`Deleted record with ID: ${id}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Database Management</h2>

      {/* Database Records List */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Patient Records</h3>

        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Patient Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Last Visit</th>
              <th className="px-4 py-2 text-left text-gray-700">Treatment</th>
              <th className="px-4 py-2 text-left text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {databaseRecords.map((record) => (
              <tr key={record.id}>
                <td className="px-4 py-2">{record.patientName}</td>
                <td className="px-4 py-2">{record.lastVisit}</td>
                <td className="px-4 py-2">{record.treatment}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-sm font-semibold rounded-full ${
                      record.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add New Record */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Add New Record</h3>

        <form className="space-y-4">
          <div>
            <label htmlFor="patientName" className="block text-gray-700 font-semibold mb-1">
              Patient Name
            </label>
            <input
              type="text"
              id="patientName"
              placeholder="Enter patient name"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="treatment" className="block text-gray-700 font-semibold mb-1">
                Treatment
              </label>
              <input
                type="text"
                id="treatment"
                placeholder="Enter treatment"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-gray-700 font-semibold mb-1">
                Status
              </label>
              <select
                id="status"
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              Add Record
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
