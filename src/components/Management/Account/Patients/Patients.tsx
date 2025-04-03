import React, { useState } from "react";
import { ChevronDown, ChevronUp, User, Calendar, Clock, Stethoscope } from "lucide-react";
import { Layout } from "../Layout";
import { Search } from "../../../ui/Search";

interface Patient {
  id: string;
  name: string;
  contact: string;
  lastVisit: string;
  nextAppointment?: string;
  medicalHistory: string[];
}

const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "John Doe",
    contact: "john@example.com",
    lastVisit: "2023-09-15",
    nextAppointment: "2023-11-10",
    medicalHistory: ["Routine Checkup", "Flu Shot"]
  },
  {
    id: "P002",
    name: "Jane Smith",
    contact: "jane@example.com",
    lastVisit: "2023-08-20",
    medicalHistory: ["Annual Physical", "Blood Test"]
  },
  {
    id: "P003",
    name: "Michael Brown",
    contact: "michael@example.com",
    lastVisit: "2023-10-01",
    nextAppointment: "2023-12-05",
    medicalHistory: ["Dental Cleaning", "X-Ray"]
  }
];

export const Patients = () => {
  const [expandedPatients, setExpandedPatients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const togglePatientExpand = (patientId: string) => {
    setExpandedPatients((prev) =>
      prev.includes(patientId)
        ? prev.filter((id) => id !== patientId)
        : [...prev, patientId]
    );
  };

  const isPatientExpanded = (patientId: string) =>
    expandedPatients.includes(patientId);

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">My Patients</h2>
          <div className="flex items-center space-x-4">
            <User className="w-6 h-6 text-gray-600" />
            <span className="text-gray-600">{mockPatients.length} patients</span>
          </div>
        </div>

        <Search query={searchQuery} onSearch={setSearchQuery} />

        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Patient Header */}
              <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => togglePatientExpand(patient.id)}
              >
                <div className="flex items-center space-x-4">
                  <User className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-medium">{patient.name}</h3>
                    <p className="text-sm text-gray-500">ID: {patient.id}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}
                  </span>
                  {isPatientExpanded(patient.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </div>

              {/* Patient Details (Collapsible) */}
              {isPatientExpanded(patient.id) && (
                <div className="border-t border-gray-200">
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Contact Information
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Email:</span> {patient.contact}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Appointments
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Last Visit:</span>{" "}
                          {new Date(patient.lastVisit).toLocaleDateString()}
                        </p>
                        {patient.nextAppointment && (
                          <p className="text-sm">
                            <span className="font-medium">Next Appointment:</span>{" "}
                            {new Date(patient.nextAppointment).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Medical History */}
                  <div className="p-4 bg-gray-50">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Medical History
                    </h3>
                    <div className="space-y-2">
                      {patient.medicalHistory.map((history, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Stethoscope className="w-4 h-4 text-gray-500" />
                          <p className="text-sm">{history}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredPatients.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No patients found</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
