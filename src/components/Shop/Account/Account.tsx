import { Layout } from "./Layout";

export const Account = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Account Overview */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Account Overview</h3>
          <p className="text-gray-600">
            Welcome back! Here's a quick summary of your account activity:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg shadow-md text-center">
              <h4 className="text-lg font-semibold text-blue-700">
                Unread Messages
              </h4>
              <p className="text-2xl text-blue-900">3</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-md text-center">
              <h4 className="text-lg font-semibold text-green-700">
                Active Orders
              </h4>
              <p className="text-2xl text-green-900">2</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg shadow-md text-center">
              <h4 className="text-lg font-semibold text-yellow-700">
                Favorites
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
                Order #1234 marked as shipped
              </span>
              <span className="text-gray-500 text-sm">2 hours ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                New message from support team
              </span>
              <span className="text-gray-500 text-sm">4 hours ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                Payment of $150.00 processed
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
              <h4 className="font-medium text-gray-700">Messages</h4>
              <p className="text-sm text-gray-500">View your messages</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <h4 className="font-medium text-gray-700">My Orders</h4>
              <p className="text-sm text-gray-500">Track your purchases</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <h4 className="font-medium text-gray-700">Payment History</h4>
              <p className="text-sm text-gray-500">View transaction records</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <h4 className="font-medium text-gray-700">Receipts</h4>
              <p className="text-sm text-gray-500">Download invoices</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <h4 className="font-medium text-gray-700">Favorites</h4>
              <p className="text-sm text-gray-500">View saved items</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <h4 className="font-medium text-gray-700">Account Settings</h4>
              <p className="text-sm text-gray-500">Manage your profile</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};
