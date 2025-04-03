import { Layout } from "./Layout";

export const Account = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Patient Overview */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">My Dental Care</h3>
          <p className="text-gray-600">
            Welcome back! Here's your dental care summary:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg shadow-md text-center">
              <h4 className="text-lg font-semibold text-blue-700">
                Upcoming Appointments
              </h4>
              <p className="text-2xl text-blue-900">2</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-md text-center">
              <h4 className="text-lg font-semibold text-green-700">
                Past Procedures
              </h4>
              <p className="text-2xl text-green-900">5</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg shadow-md text-center">
              <h4 className="text-lg font-semibold text-yellow-700">
                Pending Feedback
              </h4>
              <p className="text-2xl text-yellow-900">1</p>
            </div>
          </div>
        </section>

        {/* Treatment History */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Treatment History
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">
                Cleaning and Checkup - Completed
              </span>
              <span className="text-gray-500 text-sm">March 15, 2023</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                Filling Replacement - Completed
              </span>
              <span className="text-gray-500 text-sm">January 10, 2023</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                Root Canal Therapy - Completed
              </span>
              <span className="text-gray-500 text-sm">November 5, 2022</span>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <h4 className="font-medium text-gray-700">Appointments</h4>
              <p className="text-sm text-gray-500">View upcoming visits</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <h4 className="font-medium text-gray-700">Treatment Plan</h4>
              <p className="text-sm text-gray-500">View recommended care</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <h4 className="font-medium text-gray-700">Messages</h4>
              <p className="text-sm text-gray-500">Contact your dentist</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <h4 className="font-medium text-gray-700">Payment History</h4>
              <p className="text-sm text-gray-500">View billing records</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <h4 className="font-medium text-gray-700">Leave Feedback</h4>
              <p className="text-sm text-gray-500">Rate your experience</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <h4 className="font-medium text-gray-700">Documents</h4>
              <p className="text-sm text-gray-500">Access your records</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};
