import { useState } from "react";
import { Layout } from "../Layout";

export const ContentPool = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContent, setSelectedContent] = useState<number | null>(null);

  // Sample content data
  const contentItems = [
    {
      id: 1,
      title: "Summer Teeth Whitening Special",
      excerpt:
        "We're excited to offer a special summer discount on teeth whitening treatments! Book by July 15th...",
      author: "Dr. Sarah Johnson",
      status: "published",
      platforms: ["facebook", "instagram"],
      createdAt: "2023-06-15",
      scheduledDate: null,
    },
    {
      id: 2,
      title: "Dental Health Connections",
      excerpt:
        "Did you know that regular dental checkups can help detect early signs of health issues like diabetes...",
      author: "Dr. Rachel Chen",
      status: "draft",
      platforms: ["instagram"],
      createdAt: "2023-06-14",
      scheduledDate: null,
    },
    {
      id: 3,
      title: "Invisalign Benefits",
      excerpt:
        "Invisalign treatment can straighten your teeth without traditional braces! Book a consultation today...",
      author: "Dr. Michael Wong",
      status: "scheduled",
      platforms: ["facebook", "twitter"],
      createdAt: "2023-06-13",
      scheduledDate: "2023-06-20",
    },
    {
      id: 4,
      title: "New Pediatric Dentistry Services",
      excerpt:
        "We're now offering specialized pediatric dentistry services to make dental visits fun for kids...",
      author: "Dr. Rachel Chen",
      status: "draft",
      platforms: ["facebook", "instagram", "linkedin"],
      createdAt: "2023-06-12",
      scheduledDate: null,
    },
    {
      id: 5,
      title: "Meet Our Hygienist - Lisa",
      excerpt:
        "Get to know Lisa, our dental hygienist with 10 years of experience in gentle teeth cleaning...",
      author: "Dr. Sarah Johnson",
      status: "published",
      platforms: ["instagram"],
      createdAt: "2023-06-10",
      scheduledDate: null,
    },
  ];

  // Filter content based on active filter and search query
  const filteredContent = contentItems.filter((item) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "published" && item.status === "published") ||
      (activeFilter === "draft" && item.status === "draft") ||
      (activeFilter === "scheduled" && item.status === "scheduled");

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Platform icons
  const PlatformIcon = ({ platform }: { platform: string }) => {
    const icons: Record<string, string> = {
      facebook: "text-blue-600",
      instagram: "text-pink-600",
      twitter: "text-sky-400",
      linkedin: "text-blue-700",
    };

    return (
      <span className={`${icons[platform] || "text-gray-500"} mx-1`}>
        {platform === "facebook" && "f"}
        {platform === "instagram" && "📷"}
        {platform === "twitter" && "𝕏"}
        {platform === "linkedin" && "in"}
      </span>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Team Content Pool
          </h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            <span className="mr-2">+</span> Create New Content
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-3 py-1 rounded-md text-sm ${
                  activeFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-300"
                }`}
              >
                All Content
              </button>
              <button
                onClick={() => setActiveFilter("published")}
                className={`px-3 py-1 rounded-md text-sm ${
                  activeFilter === "published"
                    ? "bg-green-600 text-white"
                    : "bg-white border border-gray-300"
                }`}
              >
                Published
              </button>
              <button
                onClick={() => setActiveFilter("draft")}
                className={`px-3 py-1 rounded-md text-sm ${
                  activeFilter === "draft"
                    ? "bg-yellow-500 text-white"
                    : "bg-white border border-gray-300"
                }`}
              >
                Drafts
              </button>
              <button
                onClick={() => setActiveFilter("scheduled")}
                className={`px-3 py-1 rounded-md text-sm ${
                  activeFilter === "scheduled"
                    ? "bg-blue-500 text-white"
                    : "bg-white border border-gray-300"
                }`}
              >
                Scheduled
              </button>
            </div>

            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredContent.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                setSelectedContent(item.id === selectedContent ? null : item.id)
              }
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedContent === item.id
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <h3 className="font-medium text-gray-800 mb-2 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {item.excerpt}
              </p>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">{item.author}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex">
                  {item.platforms.map((platform) => (
                    <PlatformIcon key={platform} platform={platform} />
                  ))}
                </div>
                <span className="text-xs text-gray-400">{item.createdAt}</span>
              </div>

              {item.scheduledDate && (
                <div className="mt-2 text-xs text-blue-600">
                  Scheduled: {item.scheduledDate}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredContent.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500">
              No content found matching your criteria
            </p>
            <button
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
              }}
              className="text-blue-600 hover:text-blue-800 mt-2 text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Content Detail View (when an item is selected) */}
        {selectedContent !== null && (
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {
                    contentItems.find((item) => item.id === selectedContent)
                      ?.title
                  }
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>
                    {
                      contentItems.find((item) => item.id === selectedContent)
                        ?.author
                    }
                  </span>
                  <span>•</span>
                  <span>
                    {
                      contentItems.find((item) => item.id === selectedContent)
                        ?.createdAt
                    }
                  </span>
                  <span>•</span>
                  <span
                    className={`px-2 py-1 rounded-full ${getStatusColor(
                      contentItems.find((item) => item.id === selectedContent)
                        ?.status || ""
                    )}`}
                  >
                    {
                      contentItems.find((item) => item.id === selectedContent)
                        ?.status
                    }
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedContent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-gray-700">
                {
                  contentItems.find((item) => item.id === selectedContent)
                    ?.excerpt
                }
                This is the full content of the post. When you click on a
                content card in the grid above, the full content would be
                displayed here with all formatting and images.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                Edit Content
              </button>
              <button className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md">
                Share with Team
              </button>
              <button className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md">
                Schedule Post
              </button>
              <button className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md">
                Publish Now
              </button>
              <button className="text-red-600 hover:text-red-800 px-4 py-2 rounded-md">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
