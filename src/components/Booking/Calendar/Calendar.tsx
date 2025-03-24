import { Layout } from "../Layout";

export const Calendar = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Appointment Calendar</h1>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {/* Calendar Header */}
          <div className="col-span-7 grid grid-cols-7 gap-4 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-gray-700"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          {Array.from({ length: 35 }).map((_, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 min-h-[120px] hover:bg-gray-50 transition-colors"
            >
              <div className="text-gray-700 font-medium mb-2">{index + 1}</div>

              {/* Appointment Slots */}
              <div className="space-y-1">
                <div className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                  9:00 AM
                </div>
                <div className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                  11:00 AM
                </div>
                <div className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded">
                  2:00 PM
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex space-x-4 justify-center">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-100 mr-2"></div>
            <span className="text-sm">Morning</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-100 mr-2"></div>
            <span className="text-sm">Afternoon</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-100 mr-2"></div>
            <span className="text-sm">Evening</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};
