import React, { useState } from "react";
import { Calendar, Clock, Plus, Trash, Edit } from "lucide-react";
import { Layout } from "../Layout";

interface ScheduleEntry {
  id: string;
  type: "working" | "vacation" | "other";
  startDate: string;
  endDate: string;
  description?: string;
}

const mockSchedule: ScheduleEntry[] = [
  {
    id: "1",
    type: "working",
    startDate: "2023-10-16T09:00:00",
    endDate: "2023-10-16T17:00:00",
    description: "Regular working hours"
  },
  {
    id: "2",
    type: "vacation",
    startDate: "2023-10-20T00:00:00",
    endDate: "2023-10-27T23:59:59",
    description: "Annual leave"
  },
  {
    id: "3",
    type: "other",
    startDate: "2023-10-30T14:00:00",
    endDate: "2023-10-30T16:00:00",
    description: "Team meeting"
  }
];

export const Schedule = () => {
  const [schedule, setSchedule] = useState(mockSchedule);
  const [isAdding, setIsAdding] = useState(false);

  const getTypeColor = (type: ScheduleEntry["type"]) => {
    switch (type) {
      case "working":
        return "bg-blue-100 text-blue-800";
      case "vacation":
        return "bg-green-100 text-green-800";
      case "other":
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">My Schedule</h2>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Entry
          </button>
        </div>

        <div className="space-y-4">
          {schedule.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${getTypeColor(
                    entry.type
                  )}`}
                >
                  {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                </span>
                <div>
                  <h3 className="font-medium">
                    {new Date(entry.startDate).toLocaleDateString()} -{" "}
                    {new Date(entry.endDate).toLocaleDateString()}
                  </h3>
                  {entry.description && (
                    <p className="text-sm text-gray-500">{entry.description}</p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {schedule.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No schedule entries found</p>
            </div>
          )}
        </div>

        {isAdding && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Add Schedule Entry</h3>
              {/* Add form fields here */}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
