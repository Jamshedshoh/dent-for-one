import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../Layout";

export const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Sample program data - in a real app this would come from an API
  const samplePrograms = [
    {
      id: 1,
      title: "Daily Brushing Routine",
      status: "active",
      duration: "4 weeks",
      exercises: 5,
      description:
        "Master the proper brushing technique with daily practice and tracking.",
      benefits: [
        "Reduce plaque buildup",
        "Improve gum health",
        "Prevent cavities",
      ],
      timeCommitment: "5-7 minutes daily",
    },
    {
      id: 2,
      title: "Flossing Mastery",
      status: "completed",
      duration: "2 weeks",
      exercises: 3,
      description: "Develop consistent flossing habits with guided exercises.",
      benefits: [
        "Clean between teeth",
        "Reduce gum inflammation",
        "Prevent tartar buildup",
      ],
      timeCommitment: "3-5 minutes daily",
    },
    {
      id: 3,
      title: "Nutrition for Teeth",
      status: "pending",
      duration: "3 weeks",
      exercises: 4,
      description:
        "Learn which foods support dental health and which to avoid.",
      benefits: [
        "Strengthen enamel",
        "Reduce acid erosion",
        "Promote healthy gums",
      ],
      timeCommitment: "Weekly lessons + daily practice",
    },
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setPrograms(samplePrograms);
      setIsLoading(false);
    }, 800);
  }, []);

  const filteredPrograms = programs.filter((program) => {
    // Apply status filter
    if (filter !== "all" && program.status !== filter) return false;

    // Apply search filter
    if (
      searchQuery &&
      !program.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const enrollInProgram = (programId) => {
    // In a real app, this would call an API to enroll the user
    const updatedPrograms = programs.map((program) => {
      if (program.id === programId) {
        return { ...program, status: "active" };
      }
      return program;
    });

    setPrograms(updatedPrograms);

    // Add program activities to planner (in a real app, this would be an API call)
    const programToAdd = programs.find((p) => p.id === programId);
    console.log(`Adding ${programToAdd.title} to planner`);

    // Navigate to planner page
    navigate("/planner", { state: { newProgram: programToAdd } });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Active
          </span>
        );
      case "completed":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Completed
          </span>
        );
      case "pending":
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  const openProgramDetails = (program) => {
    setSelectedProgram(program);
  };

  const closeProgramDetails = () => {
    setSelectedProgram(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Programs
          </h1>
          <div className="text-sm text-gray-500">
            {filteredPrograms.length} programs available
          </div>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                filter === "active"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                filter === "pending"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                filter === "completed"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {selectedProgram ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedProgram.title}
              </h2>
              <button
                onClick={closeProgramDetails}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">
                  Program Duration
                </h3>
                <p className="text-lg font-semibold">
                  {selectedProgram.duration}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">Exercises</h3>
                <p className="text-lg font-semibold">
                  {selectedProgram.exercises}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800 mb-2">
                  Time Commitment
                </h3>
                <p className="text-lg font-semibold">
                  {selectedProgram.timeCommitment}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600">{selectedProgram.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="font-medium text-gray-700 mb-2">Benefits</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                {selectedProgram.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            {selectedProgram.status === "pending" && (
              <button
                onClick={() => enrollInProgram(selectedProgram.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200"
              >
                Enroll in Program
              </button>
            )}

            {selectedProgram.status === "active" && (
              <div className="text-center py-4 text-green-600 font-medium">
                You're currently enrolled in this program
              </div>
            )}

            {selectedProgram.status === "completed" && (
              <div className="text-center py-4 text-blue-600 font-medium">
                You've successfully completed this program
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program) => (
                <div
                  key={program.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {program.title}
                      </h3>
                      {getStatusBadge(program.status)}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {program.description}
                    </p>

                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span>{program.exercises} exercises</span>
                      <span>{program.duration}</span>
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => openProgramDetails(program)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        View details
                      </button>
                      {program.status === "pending" && (
                        <button
                          onClick={() => enrollInProgram(program.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1 px-3 rounded transition duration-200"
                        >
                          Enroll
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No programs found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-3">
            About Dental Care Programs
          </h2>
          <p className="text-blue-700 mb-4">
            Our programs are designed by dental professionals to help you
            establish and maintain excellent oral health habits. Each program
            includes a series of exercises and takes between 2-4 weeks to
            complete.
          </p>
          <p className="text-blue-700">
            When you enroll in a program, its activities will be automatically
            added to your planner to help you stay on track.
          </p>
        </div>
      </div>
    </Layout>
  );
};
