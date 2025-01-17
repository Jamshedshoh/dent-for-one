export const Overview = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Practice Overview
      </h2>

      {/* Summary Overview */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Summary</h3>
        <p className="text-gray-600">
          Welcome back! Here’s a quick overview of your practice’s current
          status:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg shadow-md text-center">
            <h4 className="text-lg font-semibold text-blue-700">
              Total Patients
            </h4>
            <p className="text-2xl text-blue-900">1,200</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow-md text-center">
            <h4 className="text-lg font-semibold text-green-700">
              Upcoming Appointments
            </h4>
            <p className="text-2xl text-green-900">45</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow-md text-center">
            <h4 className="text-lg font-semibold text-yellow-700">
              Pending Bills
            </h4>
            <p className="text-2xl text-yellow-900">$2,500</p>
          </div>
        </div>
      </section>

      {/* Activity Overview */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">
              Appointment with John Doe scheduled
            </span>
            <span className="text-gray-500 text-sm">2 hours ago</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              New patient, Jane Smith, added
            </span>
            <span className="text-gray-500 text-sm">4 hours ago</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              Payment of $100 received from Tom Lee
            </span>
            <span className="text-gray-500 text-sm">1 day ago</span>
          </div>
        </div>
      </section>

      {/* Performance Graph */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Performance Analytics
        </h3>
        <div className="bg-gray-200 p-4 rounded-lg h-64">
          <p className="text-gray-600">
            This could be a graph or chart of practice performance.
          </p>
          {/* Placeholder for chart */}
        </div>
      </section>
    </div>
  );
};
