import React from "react";

export const Billing = () => {
  const billingData = [
    {
      id: 1,
      patient: "John Doe",
      amount: 150.0,
      dueDate: "2025-01-20",
      status: "Paid",
    },
    {
      id: 2,
      patient: "Jane Smith",
      amount: 200.0,
      dueDate: "2025-01-25",
      status: "Pending",
    },
    {
      id: 3,
      patient: "Tom Lee",
      amount: 120.0,
      dueDate: "2025-01-22",
      status: "Overdue",
    },
    // Add more mock data as needed
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Billing</h2>

      {/* Billing List */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Outstanding Bills</h3>

        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Patient</th>
              <th className="px-4 py-2 text-left text-gray-700">Amount</th>
              <th className="px-4 py-2 text-left text-gray-700">Due Date</th>
              <th className="px-4 py-2 text-left text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {billingData.map((bill) => (
              <tr key={bill.id}>
                <td className="px-4 py-2">{bill.patient}</td>
                <td className="px-4 py-2">${bill.amount}</td>
                <td className="px-4 py-2">{bill.dueDate}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-sm font-semibold rounded-full ${
                      bill.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : bill.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {bill.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add Payment */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Record Payment</h3>

        <form className="space-y-4">
          <div>
            <label htmlFor="patient" className="block text-gray-700 font-semibold mb-1">
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
              <label htmlFor="amount" className="block text-gray-700 font-semibold mb-1">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                placeholder="Enter amount paid"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-gray-700 font-semibold mb-1">
                Payment Date
              </label>
              <input
                type="date"
                id="date"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              Record Payment
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
