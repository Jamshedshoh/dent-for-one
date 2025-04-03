import React, { useState } from "react";
import { Layout } from "../Layout";

export const Messages = () => {
  // Mock data for inbox messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Dr. Sarah Lee",
      subject: "Appointment Reminder",
      date: "2025-01-12",
      body: "Just a reminder for your upcoming appointment on 2025-01-15. Please confirm if this time works for you.",
    },
    {
      id: 2,
      sender: "Patient John Doe",
      subject: "Question about Billing",
      date: "2025-01-10",
      body: "I have a question regarding my last billing statement. Could you please provide more details?",
    },
    {
      id: 3,
      sender: "Admin",
      subject: "New Practice Guidelines",
      date: "2025-01-05",
      body: "Please review the new practice guidelines that have been implemented for 2025.",
    },
    // Add more mock messages as needed
  ]);

  // Function to delete a message
  const deleteMessage = (id: number) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  };

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Inbox</h2>

        {/* Inbox Message List */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Messages</h3>

          <ul className="space-y-4">
            {messages.map((message) => (
              <li key={message.id} className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {message.sender}
                    </p>
                    <p className="text-gray-600">{message.subject}</p>
                  </div>
                  <p className="text-gray-500 text-sm">{message.date}</p>
                </div>

                <p className="text-gray-700 mt-2">{message.body}</p>

                <div className="mt-4 flex justify-end space-x-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    View
                  </button>
                  <button
                    onClick={() => deleteMessage(message.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
};
