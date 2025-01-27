import React, { useState } from "react";

export const Reports = () => {
  // Mock data for patient visit reports
  const [reports, setReports] = useState([
    {
      id: 1,
      patientName: "John Doe",
      visitDate: "2024-11-15",
      treatment: "Dental Cleaning",
      cost: 120.0,
    },
    {
      id: 2,
      patientName: "Jane Smith",
      visitDate: "2024-12-01",
      treatment: "Cavity Filling",
      cost: 250.0,
    },
    {
      id: 3,
      patientName: "Emily Johnson",
      visitDate: "2024-12-05",
      treatment: "Teeth Whitening",
      cost: 300.0,
    },
    // Add more mock reports as needed
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Reports</h2>

      {/* Patient Visit Report Table */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Patient Visit Report</h3>

        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Patient Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Visit Date</th>
              <th className="px-4 py-2 text-left text-gray-700">Treatment</th>
              <th className="px-4 py-2 text-left text-gray-700">Cost ($)</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="px-4 py-2">{report.patientName}</td>
                <td className="px-4 py-2">{report.visitDate}</td>
                <td className="px-4 py-2">{report.treatment}</td>
                <td className="px-4 py-2">${report.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Other Reports (Placeholder for future reports) */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Other Reports</h3>
        <p>In the future, you could include more reports such as:</p>
        <ul className="list-disc pl-5">
          <li>Billing Summary</li>
          <li>Monthly Revenue Report</li>
          <li>Patient Demographics Report</li>
          <li>Treatment Success Rate</li>
        </ul>
      </section>
    </div>
  );
};
