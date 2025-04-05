import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../Layout";

export const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - in a real app this would come from an API
  const sampleMessages = [
    {
      id: 1,
      sender: "Dr. Sarah Lee",
      subject: "Appointment Reminder",
      preview: "Just a reminder for your upcoming appointment...",
      date: "2025-01-12",
      read: false,
      thread: [
        {
          id: 1,
          sender: "Dr. Sarah Lee",
          content:
            "Just a reminder for your upcoming appointment on 2025-01-15. Please confirm if this time works for you.",
          timestamp: "2025-01-12 09:30 AM",
        },
        {
          id: 2,
          sender: "You",
          content:
            "Yes, that time works perfectly for me. Thank you for the reminder!",
          timestamp: "2025-01-12 11:45 AM",
        },
      ],
    },
    {
      id: 2,
      sender: "Patient John Doe",
      subject: "Question about Billing",
      preview: "I have a question regarding my last billing statement...",
      date: "2025-01-10",
      read: true,
      thread: [
        {
          id: 1,
          sender: "Patient John Doe",
          content:
            "I have a question regarding my last billing statement. Could you please provide more details?",
          timestamp: "2025-01-10 02:15 PM",
        },
      ],
    },
    {
      id: 3,
      sender: "Admin",
      subject: "New Practice Guidelines",
      preview: "Please review the new practice guidelines...",
      date: "2025-01-05",
      read: true,
      thread: [
        {
          id: 1,
          sender: "Admin",
          content:
            "Please review the new practice guidelines that have been implemented for 2025.",
          timestamp: "2025-01-05 10:00 AM",
        },
      ],
    },
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setMessages(sampleMessages);
      setLoading(false);
    }, 800);
  }, []);

  const openThread = (messageId) => {
    const message = messages.find((m) => m.id === messageId);
    setActiveThread(message);

    // Mark as read
    if (!message.read) {
      const updatedMessages = messages.map((m) =>
        m.id === messageId ? { ...m, read: true } : m
      );
      setMessages(updatedMessages);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !activeThread) return;

    const newThreadMessage = {
      id: activeThread.thread.length + 1,
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleString(),
    };

    const updatedThread = {
      ...activeThread,
      thread: [...activeThread.thread, newThreadMessage],
    };

    setActiveThread(updatedThread);
    setNewMessage("");

    // Update the message in the list with new preview
    const updatedMessages = messages.map((m) =>
      m.id === activeThread.id
        ? {
            ...m,
            preview:
              newMessage.substring(0, 50) +
              (newMessage.length > 50 ? "..." : ""),
            date: "Today",
          }
        : m
    );

    setMessages(updatedMessages);
  };

  const filteredMessages = messages.filter((message) => {
    return (
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {unreadCount} unread
            </span>
          )}
        </div>

        {activeThread ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Thread Header */}
            <div className="border-b border-gray-200 p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setActiveThread(null)}
                  className="text-gray-500 hover:text-gray-700"
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
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    ></path>
                  </svg>
                </button>
                <h2 className="text-lg font-semibold text-gray-800">
                  {activeThread.subject}
                </h2>
                <div className="w-6"></div> {/* Spacer for alignment */}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Conversation with {activeThread.sender}
              </div>
            </div>

            {/* Message Thread */}
            <div className="p-4 space-y-4" style={{ minHeight: "400px" }}>
              {activeThread.thread.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                      message.sender === "You"
                        ? "bg-blue-100 text-blue-900"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="font-medium">{message.sender}</div>
                    <p className="mt-1">{message.content}</p>
                    <div className="text-xs text-gray-500 mt-2">
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className={`bg-blue-600 text-white px-4 py-2 rounded-r-lg ${
                    !newMessage.trim()
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-700"
                  }`}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <div className="relative mb-6">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Message List */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredMessages.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`border-b border-gray-200 p-4 cursor-pointer hover:bg-gray-50 ${
                      !message.read ? "bg-blue-50" : ""
                    }`}
                    onClick={() => openThread(message.id)}
                  >
                    <div className="flex justify-between">
                      <h3
                        className={`font-medium ${
                          !message.read ? "text-blue-800" : "text-gray-800"
                        }`}
                      >
                        {message.sender}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {message.date}
                      </span>
                    </div>
                    <h4 className="text-gray-700 mt-1">{message.subject}</h4>
                    <p className="text-gray-500 text-sm mt-1 truncate">
                      {message.preview}
                    </p>
                    {!message.read && (
                      <div className="mt-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No messages found
                </h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search or check back later
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};
