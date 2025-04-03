import {
  Search,
  TrendingUp,
  Users,
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { Layout } from "../Layout";

export const Explore = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample trending topics
  const trendingTopics = [
    { name: "#DentalHygiene", posts: "1.2K" },
    { name: "#OralCancerAwareness", posts: "892" },
    { name: "#Invisalign", posts: "3.4K" },
    { name: "#PediatricDentistry", posts: "567" },
    { name: "#TeethWhitening", posts: "2.1K" },
  ];

  // Sample popular posts
  const popularPosts = [
    {
      id: 1,
      author: "Dr. Sarah Johnson",
      practice: "Smile Bright Dental",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content:
        "Just attended an amazing workshop on minimally invasive dentistry techniques. The future of conservative tooth restoration is here! #Dentistry #ContinuingEducation",
      likes: 124,
      comments: 28,
      shares: 15,
      time: "2h ago",
      isLiked: false,
      isSaved: false,
    },
    {
      id: 2,
      author: "Dental Innovations",
      practice: "Industry News",
      avatar: "https://randomuser.me/api/portraits/lego/5.jpg",
      content:
        "New study shows 30% reduction in cavities for patients using our AI-powered brushing coach app. The digital transformation of preventive care is making an impact! #DigitalDentistry #PreventiveCare",
      likes: 342,
      comments: 47,
      shares: 89,
      time: "5h ago",
      isLiked: true,
      isSaved: true,
    },
    {
      id: 3,
      author: "Dr. Michael Chen",
      practice: "Gentle Family Dentistry",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content:
        "Sharing before/after of a full mouth rehabilitation case. So rewarding to see the confidence boost in our patients! #CosmeticDentistry #PatientSmiles",
      image:
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      likes: 287,
      comments: 34,
      shares: 42,
      time: "1d ago",
      isLiked: false,
      isSaved: false,
    },
  ];

  // Sample recommended accounts
  const recommendedAccounts = [
    {
      name: "American Dental Association",
      handle: "@ADA",
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      followers: "142K",
    },
    {
      name: "Dr. Jessica Wong",
      handle: "@DrJessWong",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      followers: "8.2K",
    },
    {
      name: "Dental Tech Today",
      handle: "@DentalTech",
      avatar: "https://randomuser.me/api/portraits/lego/3.jpg",
      followers: "24.7K",
    },
  ];

  // Toggle like status
  const toggleLike = (postId: number) => {
    // In a real app, this would update the backend
    console.log(`Toggled like for post ${postId}`);
  };

  // Toggle save status
  const toggleSave = (postId: number) => {
    // In a real app, this would update the backend
    console.log(`Toggled save for post ${postId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header and Search */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Explore Dental Content
          </h1>
          <p className="text-gray-600 mb-6">
            Discover trends, connect with peers, and stay updated
          </p>

          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for topics, dentists, or posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`pb-3 px-4 font-medium ${
              activeTab === "trending"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("trending")}
          >
            <TrendingUp className="inline mr-2 h-5 w-5" />
            Trending
          </button>
          <button
            className={`pb-3 px-4 font-medium ${
              activeTab === "popular"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("popular")}
          >
            <Users className="inline mr-2 h-5 w-5" />
            Popular
          </button>
          <button
            className={`pb-3 px-4 font-medium ${
              activeTab === "peers"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("peers")}
          >
            <MessageSquare className="inline mr-2 h-5 w-5" />
            Peer Posts
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Trending/Popular Content */}
          <div className="lg:col-span-2">
            {activeTab === "trending" && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Trending in Dentistry
                </h2>
                <div className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <div>
                        <p className="font-medium text-blue-600">
                          {topic.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {topic.posts} posts
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-blue-600">
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(activeTab === "popular" || activeTab === "peers") && (
              <div className="space-y-6">
                {popularPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start mb-4">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {post.author}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {post.practice} • {post.time}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{post.content}</p>

                    {post.image && (
                      <img
                        src={post.image}
                        alt="Dental case"
                        className="w-full h-auto rounded-lg mb-4"
                      />
                    )}

                    <div className="flex justify-between text-gray-500">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center ${
                          post.isLiked ? "text-red-500" : ""
                        }`}
                      >
                        <Heart className="mr-1 h-5 w-5" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center">
                        <MessageSquare className="mr-1 h-5 w-5" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center">
                        <Share2 className="mr-1 h-5 w-5" />
                        <span>{post.shares}</span>
                      </button>
                      <button
                        onClick={() => toggleSave(post.id)}
                        className={post.isSaved ? "text-blue-500" : ""}
                      >
                        <Bookmark className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Recommendations */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recommended Accounts
              </h2>
              <div className="space-y-4">
                {recommendedAccounts.map((account, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <img
                        src={account.avatar}
                        alt={account.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {account.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {account.handle} • {account.followers} followers
                        </p>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Upcoming Dental Events
              </h2>
              <div className="space-y-4">
                <div className="p-3 border border-gray-200 rounded-lg">
                  <p className="font-medium text-gray-800">
                    ADA Annual Conference
                  </p>
                  <p className="text-sm text-gray-500">
                    Oct 5-8, 2023 • Orlando, FL
                  </p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <p className="font-medium text-gray-800">
                    Digital Dentistry Workshop
                  </p>
                  <p className="text-sm text-gray-500">
                    Nov 12, 2023 • Virtual
                  </p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <p className="font-medium text-gray-800">
                    Pediatric Dentistry Symposium
                  </p>
                  <p className="text-sm text-gray-500">
                    Dec 3-5, 2023 • Chicago, IL
                  </p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 mt-4 text-sm font-medium">
                View all events
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Industry News
              </h2>
              <div className="space-y-3">
                <a href="#" className="block hover:bg-gray-50 p-2 rounded">
                  <p className="font-medium text-gray-800">
                    New study reveals benefits of AI in caries detection
                  </p>
                  <p className="text-sm text-gray-500">
                    Dental Tribune • 2 days ago
                  </p>
                </a>
                <a href="#" className="block hover:bg-gray-50 p-2 rounded">
                  <p className="font-medium text-gray-800">
                    FDA approves new minimally invasive gum treatment
                  </p>
                  <p className="text-sm text-gray-500">ADA News • 1 week ago</p>
                </a>
                <a href="#" className="block hover:bg-gray-50 p-2 rounded">
                  <p className="font-medium text-gray-800">
                    Survey: Patient preferences for telehealth dental
                    consultations
                  </p>
                  <p className="text-sm text-gray-500">
                    Journal of Dental Research • 2 weeks ago
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
