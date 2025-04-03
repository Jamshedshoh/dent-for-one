import React, { useState } from "react";
import { ChevronDown, ChevronUp, Calendar, Clock, Stethoscope, ClipboardList } from "lucide-react";
import { Layout } from "../Layout";
import { Search } from "../../../ui/Search";

interface TreatmentPlan {
  id: string;
  title: string;
  date: string;
  type: 'upcoming' | 'completed';
  procedures: string[];
  notes?: string;
  dentist?: string;
}

const mockTreatmentPlans: TreatmentPlan[] = [
  {
    id: "T001",
    title: "Root Canal Treatment",
    date: "2023-11-15",
    type: 'upcoming',
    procedures: ["Root Canal", "Crown Placement"],
    dentist: "Dr. Smith",
    notes: "Patient has sensitivity in lower left molar"
  },
  {
    id: "T002",
    title: "Regular Checkup",
    date: "2023-09-10",
    type: 'completed',
    procedures: ["Cleaning", "X-Ray"],
    dentist: "Dr. Johnson"
  },
  {
    id: "T003",
    title: "Teeth Whitening",
    date: "2023-12-01",
    type: 'upcoming',
    procedures: ["Whitening Treatment"],
    notes: "Patient prefers subtle whitening"
  }
];

export const Treatment = () => {
  const [expandedPlans, setExpandedPlans] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const togglePlanExpand = (planId: string) => {
    setExpandedPlans((prev) =>
      prev.includes(planId)
        ? prev.filter((id) => id !== planId)
        : [...prev, planId]
    );
  };

  const isPlanExpanded = (planId: string) =>
    expandedPlans.includes(planId);

  const filteredPlans = mockTreatmentPlans.filter(plan =>
    plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plan.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Treatment Plans</h2>
          <div className="flex items-center space-x-4">
            <ClipboardList className="w-6 h-6 text-gray-600" />
            <span className="text-gray-600">{mockTreatmentPlans.length} plans</span>
          </div>
        </div>

        <Search query={searchQuery} onSearch={setSearchQuery} />

        <div className="space-y-4">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Plan Header */}
              <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => togglePlanExpand(plan.id)}
              >
                <div className="flex items-center space-x-4">
                  <ClipboardList className={`w-5 h-5 ${plan.type === 'upcoming' ? 'text-blue-500' : 'text-green-500'}`} />
                  <div>
                    <h3 className="font-medium">{plan.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(plan.date).toLocaleDateString()} - {plan.type === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {isPlanExpanded(plan.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </div>

              {/* Plan Details (Collapsible) */}
              {isPlanExpanded(plan.id) && (
                <div className="border-t border-gray-200">
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Treatment Details
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Date:</span> {new Date(plan.date).toLocaleDateString()}
                        </p>
                        {plan.dentist && (
                          <p className="text-sm">
                            <span className="font-medium">Dentist:</span> {plan.dentist}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Procedures
                      </h3>
                      <div className="space-y-2">
                        {plan.procedures.map((procedure, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Stethoscope className="w-4 h-4 text-gray-500" />
                            <p className="text-sm">{procedure}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  {plan.notes && (
                    <div className="p-4 bg-gray-50">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Notes
                      </h3>
                      <p className="text-sm">{plan.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {filteredPlans.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No treatment plans found</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
