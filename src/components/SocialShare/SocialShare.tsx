import { BookOpen, Calendar, MessageCircle, BarChart, LayoutTemplate, Users } from "lucide-react";
import { Layout } from "./Layout";
import { Link } from "react-router-dom";

export const SocialShare = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Social Media Content Hub
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Content Library Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Content Library</h2>
            <p className="text-gray-600 mb-4">
              Access pre-approved dental health content including educational posts, infographics, and promotional materials ready for social sharing.
            </p>
            <Link
              to="/social-share/content-library"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Browse Content →
            </Link>
          </div>

          {/* Scheduled Posts Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Scheduled Posts</h2>
            <p className="text-gray-600 mb-4">
              Manage your upcoming social media posts. View, edit, and track scheduled content across multiple platforms.
            </p>
            <Link
              to="/social-share/scheduled-posts"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View Calendar →
            </Link>
          </div>

          {/* Analytics Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <BarChart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Post Analytics</h2>
            <p className="text-gray-600 mb-4">
              Track engagement metrics and performance of your shared content. Monitor likes, shares, and comments across platforms.
            </p>
            <Link
              to="/social-share/analytics"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View Insights →
            </Link>
          </div>

          {/* Social Templates Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <LayoutTemplate className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Social Templates</h2>
            <p className="text-gray-600 mb-4">
              Customizable templates for different social platforms. Create consistent branding with pre-designed post formats.
            </p>
            <Link
              to="/social-share/templates"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Use Templates →
            </Link>
          </div>

          {/* Collaboration Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Team Collaboration</h2>
            <p className="text-gray-600 mb-4">
              Work with your clinic team on content strategy. Review, comment, and approve posts before publishing.
            </p>
            <Link
              to="/social-share/team"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Collaborate Now →
            </Link>
          </div>

          {/* Content Calendar Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Content Calendar</h2>
            <p className="text-gray-600 mb-4">
              Plan your social media strategy with our interactive calendar. Schedule posts for optimal engagement times.
            </p>
            <Link
              to="/social-share/calendar"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Plan Content →
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
