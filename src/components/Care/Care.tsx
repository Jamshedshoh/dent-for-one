import { AlertCircle, BookOpen, Bot, Calendar, MessageCircle } from "lucide-react";
import { Layout } from "./Layout";
import { Link } from "react-router-dom";

export const Care = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Your Comprehensive Dental Care Solution
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* AI Assistant Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <Bot className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold mb-4">AI Dental Assistant</h2>
            <p className="text-gray-600 mb-4">
              Get instant answers to your dental health questions. Our AI assistant provides personalized advice on oral care, hygiene tips, and treatment options.
            </p>
            <Link
              to="/care/ai-assistant"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Try AI Assistant →
            </Link>
          </div>

          {/* 1:1 Consultation Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold mb-4">1:1 Consultation</h2>
            <p className="text-gray-600 mb-4">
              Book a private session with our certified dentists. Get professional advice, treatment plans, and answers to your specific dental concerns.
            </p>
            <Link
              to="/care/consultation"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Schedule Consultation →
            </Link>
          </div>

          {/* Habit Tracker Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Habit Tracker</h2>
            <p className="text-gray-600 mb-4">
              Track your daily oral care routine, set reminders, and monitor your progress. Achieve your dental health goals with our interactive tracker.
            </p>
            <Link
              to="/care/tracker"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Start Tracking →
            </Link>
          </div>

          {/* Resources Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Educational Resources</h2>
            <p className="text-gray-600 mb-4">
              Access a wealth of information about dental health, including articles, videos, and guides on various oral care topics and procedures.
            </p>
            <Link
              to="/care/resources"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Explore Resources →
            </Link>
          </div>

          {/* Appointment Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
            <p className="text-gray-600 mb-4">
              Schedule your next dental visit with ease. Choose from our range of services and find a time that works best for you.
            </p>
            <Link
              to="/care/appointments"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Book Now →
            </Link>
          </div>

          {/* Emergency Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Emergency Care</h2>
            <p className="text-gray-600 mb-4">
              Need immediate dental attention? Our emergency services are available 24/7 to address urgent dental issues.
            </p>
            <Link
              to="/care/emergency"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Get Help Now →
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
