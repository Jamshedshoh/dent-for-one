import React, { useState } from "react";
import { Layout } from "../Layout";

export const Settings = () => {
  // State to manage the form inputs
  const [profile, setProfile] = useState({
    name: "Dr. John Doe",
    email: "john.doe@example.com",
    phone: "555-1234",
  });

  const [practice, setPractice] = useState({
    name: "Doe Dental Clinic",
    address: "123 Main Street, Cityville, USA",
    phone: "555-5678",
    website: "www.doedentalclinic.com",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
  });

  // Handler to update profile
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler to update practice settings
  const handlePracticeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPractice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler to update preferences
  const handlePreferencesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <Layout>
      <div className="space-y-6 p-4">
        <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>

        {/* Profile Settings Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Profile Settings
          </h3>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 font-semibold mb-1"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your phone number"
              />
            </div>
          </form>
        </section>

        {/* Practice Settings Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Practice Settings
          </h3>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="practiceName"
                className="block text-gray-700 font-semibold mb-1"
              >
                Practice Name
              </label>
              <input
                type="text"
                id="practiceName"
                name="name"
                value={practice.name}
                onChange={handlePracticeChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your practice name"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-gray-700 font-semibold mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={practice.address}
                onChange={handlePracticeChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your practice address"
              />
            </div>

            <div>
              <label
                htmlFor="practicePhone"
                className="block text-gray-700 font-semibold mb-1"
              >
                Phone
              </label>
              <input
                type="text"
                id="practicePhone"
                name="phone"
                value={practice.phone}
                onChange={handlePracticeChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter practice phone number"
              />
            </div>

            <div>
              <label
                htmlFor="website"
                className="block text-gray-700 font-semibold mb-1"
              >
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={practice.website}
                onChange={handlePracticeChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter practice website URL"
              />
            </div>
          </form>
        </section>

        {/* Preferences Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Preferences
          </h3>
          <form className="space-y-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={preferences.emailNotifications}
                  onChange={handlePreferencesChange}
                  className="mr-2"
                />
                Email Notifications
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={preferences.smsNotifications}
                  onChange={handlePreferencesChange}
                  className="mr-2"
                />
                SMS Notifications
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={preferences.darkMode}
                  onChange={handlePreferencesChange}
                  className="mr-2"
                />
                Enable Dark Mode
              </label>
            </div>
          </form>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
            Save Settings
          </button>
        </div>
      </div>
    </Layout>
  );
};
