import { Layout } from "./Layout";

export const Account = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Practice Overview */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Practice Overview</h3>
          <p className="text-gray-600">
            Welcome back, Doctor! Here's your practice summary:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg shadow-md text-center">
              <h4 className="text-lg font-semibold text-blue-700">
                Today's Appointments
              </h4>
              <p className="text-2xl text-blue-900">8</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-md text-center">
              <h4 className="text-lg font-semibold text-green-700">
                New Messages
              </h4>
              <p className="text-2xl text-green-900">3</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg shadow-md text-center">
              <h4 className="text-lg font-semibold text-yellow-700">
                Open Slots This Week
              </h4>
              <p className="text-2xl text-yellow-900">12</p>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">
                New appointment booked by John Doe
              </span>
              <span className="text-gray-500 text-sm">2 hours ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                Patient Jane Smith rescheduled appointment
              </span>
              <span className="text-gray-500 text-sm">4 hours ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                New message from patient Michael Brown
              </span>
              <span className="text-gray-500 text-sm">1 day ago</span>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Quick Access
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <h4 className="font-medium text-gray-700">Appointments</h4>
              <p className="text-sm text-gray-500">View upcoming schedule</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <h4 className="font-medium text-gray-700">Patient Records</h4>
              <p className="text-sm text-gray-500">Access patient history</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <h4 className="font-medium text-gray-700">Messages</h4>
              <p className="text-sm text-gray-500">View patient messages</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <h4 className="font-medium text-gray-700">Schedule</h4>
              <p className="text-sm text-gray-500">Manage availability</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <h4 className="font-medium text-gray-700">Billing</h4>
              <p className="text-sm text-gray-500">View financial records</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <h4 className="font-medium text-gray-700">Settings</h4>
              <p className="text-sm text-gray-500">Manage practice profile</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};
