import { Layout } from "../Layout";

export const Shop = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">
          Book Your Appointment
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Booking Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Schedule Your Visit</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Book Appointment
              </button>
            </form>
          </div>

          {/* Information Section */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Our Services</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">•</span>
                  General Checkup
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">•</span>
                  Teeth Cleaning
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">•</span>
                  Orthodontics
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">•</span>
                  Cosmetic Dentistry
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>
              <div className="space-y-2">
                <p className="flex items-center">
                  <span className="text-blue-600 mr-2">📍</span>
                  123 Dental Street, City, Country
                </p>
                <p className="flex items-center">
                  <span className="text-blue-600 mr-2">📞</span>
                  +1 234 567 890
                </p>
                <p className="flex items-center">
                  <span className="text-blue-600 mr-2">✉️</span>
                  info@dentclinic.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
