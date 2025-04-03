import { Layout } from "./Layout";

export const Dentists = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Our Dentists</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dentist Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Dr. John Doe"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center">Dr. John Doe</h2>
            <p className="text-gray-600 text-center mb-2">General Dentistry</p>
            <p className="text-sm text-gray-500 text-center mb-4">
              10 years of experience. Specializes in preventive care and
              cosmetic dentistry.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Book Appointment
            </button>
          </div>

          {/* Dentist Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Dr. Jane Smith"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center">
              Dr. Jane Smith
            </h2>
            <p className="text-gray-600 text-center mb-2">Orthodontics</p>
            <p className="text-sm text-gray-500 text-center mb-4">
              8 years of experience. Expert in braces and Invisalign treatments.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Book Appointment
            </button>
          </div>

          {/* Dentist Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Dr. Michael Brown"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center">
              Dr. Michael Brown
            </h2>
            <p className="text-gray-600 text-center mb-2">Oral Surgery</p>
            <p className="text-sm text-gray-500 text-center mb-4">
              12 years of experience. Specializes in wisdom teeth removal and
              dental implants.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
