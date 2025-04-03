import { useState } from "react";
import { Layout } from "./Layout";

export const Account = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const [aiContentType, setAiContentType] = useState("");
  const [aiTone, setAiTone] = useState("");

  // Sample data
  const metrics = [
    { title: "Posts This Month", value: "38", change: "14%" },
    { title: "Engagement Rate", value: "47%", change: "3%" },
    { title: "Profile Visits", value: "1,249", change: "22%" },
    { title: "New Followers", value: "247", change: "8%" },
  ];

  const teamContent = [
    {
      title: "Summer Teeth Whitening Special",
      content:
        "We're excited to offer a special summer discount on teeth whitening treatments! Book by July 15th...",
      author: "Dr. Sarah Johnson",
      status: "published",
    },
    {
      title: "Dental Health Connections",
      content:
        "Did you know that regular dental checkups can help detect early signs of health issues like diabetes...",
      author: "Dr. Rachel Chen",
      status: "draft",
    },
    {
      title: "Invisalign Benefits",
      content:
        "Invisalign treatment can straighten your teeth without traditional braces! Book a consultation today...",
      author: "Dr. Michael Wong",
      status: "scheduled",
    },
  ];

  const recentPosts = [
    {
      author: "Dr. Sarah Johnson",
      platform: "Facebook",
      time: "Today",
      content:
        "We're excited to offer a special summer discount on teeth whitening treatments! Book by July 15th and get 20% off. Perfect timing to brighten your smile for summer events! #SummerSmile #TeethWhitening",
      stats: { likes: 24, comments: 8, shares: 12 },
    },
    {
      author: "Dr. Sarah Johnson",
      platform: "Instagram",
      time: "Today",
      content:
        "Did you know that regular dental checkups can help detect early signs of health issues like diabetes and heart disease? Your oral health is connected to your overall wellbeing! #DentalFacts #OralHealth",
      stats: { likes: 56, comments: 14, shares: 23 },
    },
  ];

  const pendingApprovals = [
    {
      author: "Dr. Sarah Johnson",
      time: "Today",
      content:
        "Invisalign treatment can straighten your teeth without traditional braces! Book a consultation today to see if it's right for you...",
    },
    {
      author: "Dr. Sarah Johnson",
      time: "Today",
      content:
        "Meet our newest team member! Dr. Rachel Johnson joins Smile Bright Dental with expertise in pediatric dentistry. She's excited...",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600 mb-8">
          Manage, collaborate, and optimize your social media content
        </p>

        {/* Performance Overview */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Performance Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-500 text-sm font-medium">
                  {metric.title}
                </h3>
                <p className="text-2xl font-bold text-gray-800 mt-2">
                  {metric.value}
                  <span className="text-green-500 text-sm ml-2">
                    ↑{metric.change}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Content Generation */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            AI Content Generation
          </h2>
          <div className="bg-white rounded-lg shadow p-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-4">
              + Generate New Content
            </button>

            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={aiContentType}
                onChange={(e) => setAiContentType(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select content type</option>
                <option value="educational">Educational Post</option>
                <option value="promotional">Promotional Offer</option>
                <option value="team">Team Introduction</option>
                <option value="testimonial">Patient Testimonial</option>
              </select>

              <select
                value={aiTone}
                onChange={(e) => setAiTone(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select tone</option>
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="enthusiastic">Enthusiastic</option>
                <option value="authoritative">Authoritative</option>
              </select>

              <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md">
                Generate
              </button>
            </div>
          </div>
        </section>

        {/* Team Content Pool */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Team Content Pool
          </h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-wrap gap-2 mb-6">
              <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                All Content
              </button>
              <button className="bg-white border border-gray-300 px-3 py-1 rounded-md text-sm">
                Drafts
              </button>
              <button className="bg-white border border-gray-300 px-3 py-1 rounded-md text-sm">
                Scheduled
              </button>
              <button className="bg-white border border-gray-300 px-3 py-1 rounded-md text-sm">
                Published
              </button>
              <input
                type="text"
                placeholder="Search content..."
                className="flex-1 min-w-[200px] border border-gray-300 rounded-md px-3 py-1 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamContent.map((content, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h4 className="font-medium text-gray-800 mb-2">
                    {content.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {content.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {content.author}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        content.status === "published"
                          ? "bg-green-100 text-green-800"
                          : content.status === "draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {content.status}
                    </span>
                    <button className="text-gray-500 hover:text-gray-700">
                      ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="text-blue-600 hover:text-blue-800 mt-6 text-sm font-medium">
              View All Team Content →
            </button>
          </div>
        </section>

        {/* Recent Posts & Approvals */}
        <section className="mb-12">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`pb-2 px-4 ${
                activeTab === "recent"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("recent")}
            >
              Recent Posts
            </button>
            <button
              className={`pb-2 px-4 ${
                activeTab === "approvals"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("approvals")}
            >
              Pending Approvals ({pendingApprovals.length})
            </button>
          </div>

          {activeTab === "recent" ? (
            <div className="space-y-6">
              {recentPosts.map((post, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-medium text-gray-800">
                      {post.author}
                    </span>
                    <span className="text-gray-500 text-sm">•</span>
                    <span className="text-gray-500 text-sm">
                      {post.platform}
                    </span>
                    <span className="text-gray-500 text-sm">•</span>
                    <span className="text-gray-500 text-sm">{post.time}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="flex gap-4 text-gray-500 text-sm">
                    <span>👍 {post.stats.likes}</span>
                    <span>💬 {post.stats.comments}</span>
                    <span>↗ {post.stats.shares}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {pendingApprovals.map((approval, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-medium text-gray-800">
                      {approval.author}
                    </span>
                    <span className="text-gray-500 text-sm">•</span>
                    <span className="text-gray-500 text-sm">
                      {approval.time}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{approval.content}</p>
                  <div className="flex gap-2">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm">
                      Approve
                    </button>
                    <button className="bg-white border border-gray-300 hover:bg-gray-50 px-3 py-1 rounded-md text-sm">
                      Edit
                    </button>
                    <button className="bg-white border border-gray-300 hover:bg-gray-50 px-3 py-1 rounded-md text-sm">
                      Schedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Social Media Scheduling */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Social Media Scheduling
          </h2>
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <div className="flex justify-between items-center mb-4">
              <button className="text-gray-500 hover:text-gray-700">←</button>
              <h3 className="font-medium text-gray-800">June 2023</h3>
              <button className="text-gray-500 hover:text-gray-700">→</button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {/* Calendar days would go here */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-gray-500 text-sm py-2"
                >
                  {day}
                </div>
              ))}
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 border border-gray-100 rounded p-1"
                >
                  <div className="text-right text-sm">{i + 1}</div>
                </div>
              ))}
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            + Schedule New Post
          </button>
        </section>
      </div>
    </Layout>
  );
};
