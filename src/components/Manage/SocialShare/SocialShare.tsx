import {
  MessageSquare,
  Image,
  Calendar,
  Clock,
  ChevronDown,
  Plus,
  Share2,
  Bookmark,
  Heart,
  MoreHorizontal,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { Layout } from "../Layout";

export const SocialShare = () => {
  const [activeTab, setActiveTab] = useState("drafts");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [platforms, setPlatforms] = useState(["facebook", "instagram"]);

  // Sample posts data
  const posts = {
    drafts: [
      {
        id: 1,
        content:
          "Did you know regular dental checkups can prevent serious health issues? Schedule your appointment today! #DentalHealth #PreventiveCare",
        media: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
        platforms: ["facebook", "instagram"],
        scheduled: null,
        status: "draft",
      },
      {
        id: 2,
        content:
          "Meet our new hygienist, Lisa! With 10 years of experience, she's making dental visits comfortable for all our patients.",
        media: null,
        platforms: ["facebook"],
        scheduled: null,
        status: "draft",
      },
    ],
    scheduled: [
      {
        id: 3,
        content:
          "Summer special: 15% off teeth whitening this month! Call us to book your appointment. #SummerSmile #WhiteningSpecial",
        media: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d",
        platforms: ["instagram", "facebook"],
        scheduled: "2023-07-20 09:00",
        status: "scheduled",
      },
    ],
    published: [
      {
        id: 4,
        content:
          "We're now offering Saturday appointments for your convenience. Book online today! #PatientCare #Convenience",
        media: "https://images.unsplash.com/photo-1629909613654-28e377c0b8d0",
        platforms: ["facebook"],
        scheduled: "2023-07-15 10:30",
        published: "2023-07-15 10:30",
        status: "published",
        stats: {
          likes: 24,
          comments: 5,
          shares: 3,
        },
      },
    ],
  };

  // Toggle platform selection
  const togglePlatform = (platform: string) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter((p) => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

  // Platform icons
  const PlatformIcon = ({
    platform,
    size = 4,
  }: {
    platform: string;
    size?: number;
  }) => {
    const icons: Record<string, JSX.Element> = {
      facebook: <Facebook className={`h-${size} w-${size} text-blue-600`} />,
      instagram: <Instagram className={`h-${size} w-${size} text-pink-600`} />,
      twitter: <Twitter className={`h-${size} w-${size} text-blue-400`} />,
      linkedin: <Linkedin className={`h-${size} w-${size} text-blue-700`} />,
      youtube: <Youtube className={`h-${size} w-${size} text-red-600`} />,
    };

    return (
      icons[platform] || (
        <Share2 className={`h-${size} w-${size} text-gray-500`} />
      )
    );
  };

  return (
    <Layout>
      <div className="container mx-auto">
        {/* Main Content */}
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Drafts</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {posts.drafts.length}
                  </p>
                </div>
                <MessageSquare className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Scheduled</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {posts.scheduled.length}
                  </p>
                </div>
                <Calendar className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Published</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {posts.published.length}
                  </p>
                </div>
                <Share2 className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "drafts"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("drafts")}
            >
              Drafts
            </button>
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "scheduled"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("scheduled")}
            >
              Scheduled
            </button>
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === "published"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("published")}
            >
              Published
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus className="mr-2 h-5 w-5" /> Create Post
            </button>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Platforms</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>Twitter</option>
                <option>LinkedIn</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts[activeTab as keyof typeof posts].length > 0 ? (
              posts[activeTab as keyof typeof posts].map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  {post.media && (
                    <div className="h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={post.media}
                        alt="Post media"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-gray-700 mb-4">{post.content}</p>

                    <div className="flex items-center mb-4">
                      {post.platforms.map((platform) => (
                        <div key={platform} className="mr-2">
                          <PlatformIcon platform={platform} />
                        </div>
                      ))}
                    </div>

                    {post.scheduled && (
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Scheduled for {post.scheduled}</span>
                      </div>
                    )}

                    {post.status === "published" && post.stats && (
                      <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-3">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-red-500" />
                          <span>{post.stats.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1 text-blue-500" />
                          <span>{post.stats.comments}</span>
                        </div>
                        <div className="flex items-center">
                          <Share2 className="h-4 w-4 mr-1 text-green-500" />
                          <span>{post.stats.shares}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end space-x-2 mt-4">
                      {post.status === "draft" && (
                        <>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Schedule
                          </button>
                          <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                            Publish Now
                          </button>
                        </>
                      )}
                      {post.status === "scheduled" && (
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Reschedule
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedPost(post);
                          // Would open edit modal in a real app
                        }}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white rounded-lg shadow p-8 text-center">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  No {activeTab} posts found
                </h3>
                <p className="text-gray-600 mb-4">
                  {activeTab === "drafts"
                    ? "Create a new draft to get started"
                    : activeTab === "scheduled"
                    ? "Schedule posts to appear here"
                    : "Published posts will appear here"}
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Create Your First Post
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Create Post Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
              <div className="flex justify-between items-center border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Create New Post
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Content
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[150px]"
                    placeholder="Write your post content here..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Media
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Image className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Drag and drop images here, or click to browse
                      </p>
                      <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
                        Select Files
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platforms
                  </label>
                  <div className="flex space-x-4">
                    {["facebook", "instagram", "twitter", "linkedin"].map(
                      (platform) => (
                        <button
                          key={platform}
                          onClick={() => togglePlatform(platform)}
                          className={`p-3 rounded-lg border ${
                            platforms.includes(platform)
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300"
                          }`}
                        >
                          <PlatformIcon platform={platform} size={6} />
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Schedule
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="schedule"
                          value="now"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Publish Now
                        </span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="schedule"
                          value="later"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Schedule
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date & Time
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                      <input
                        type="time"
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end border-t border-gray-200 p-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-600 hover:text-gray-800 mr-4"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => {
                    // Handle post creation logic
                    setShowCreateModal(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  {platforms.length > 1 ? "Schedule Posts" : "Schedule Post"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
