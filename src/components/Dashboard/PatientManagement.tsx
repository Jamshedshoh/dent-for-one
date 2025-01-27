import React, { useState } from "react";

export const PatientManagement = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 30,
      gender: "Male",
      lastVisit: "2024-11-15",
      phone: "555-1234",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 40,
      gender: "Female",
      lastVisit: "2024-12-01",
      phone: "555-5678",
      email: "jane.smith@example.com",
    },
    // Add more mock patients if necessary
  ]);

  const handleAddPatient = (
    name: string,
    age: number,
    gender: string,
    phone: string,
    email: string
  ) => {
    setPatients([
      ...patients,
      {
        id: patients.length + 1,
        name,
        age,
        gender,
        lastVisit: "Not Yet Visited", // Placeholder for new patients
        phone,
        email,
      },
    ]);
  };

  const handleDeletePatient = (id: number) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Patient Management</h2>

      {/* Add New Patient */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Add New Patient</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const name = (e.target as any).name.value;
            const age = parseInt((e.target as any).age.value);
            const gender = (e.target as any).gender.value;
            const phone = (e.target as any).phone.value;
            const email = (e.target as any).email.value;
            handleAddPatient(name, age, gender, phone, email);
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter patient's name"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="age" className="block text-gray-700 font-semibold mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                placeholder="Enter patient's age"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-gray-700 font-semibold mb-1">
                Gender
              </label>
              <select
                id="gender"
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Enter patient's phone number"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter patient's email"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              Add Patient
            </button>
          </div>
        </form>
      </section>

      {/* Patient List */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Patient List</h3>

        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Age</th>
              <th className="px-4 py-2 text-left text-gray-700">Gender</th>
              <th className="px-4 py-2 text-left text-gray-700">Last Visit</th>
              <th className="px-4 py-2 text-left text-gray-700">Phone</th>
              <th className="px-4 py-2 text-left text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td className="px-4 py-2">{patient.name}</td>
                <td className="px-4 py-2">{patient.age}</td>
                <td className="px-4 py-2">{patient.gender}</td>
                <td className="px-4 py-2">{patient.lastVisit}</td>
                <td className="px-4 py-2">{patient.phone}</td>
                <td className="px-4 py-2">{patient.email}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeletePatient(patient.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
