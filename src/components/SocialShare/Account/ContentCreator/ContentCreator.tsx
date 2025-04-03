import { useState } from "react";
import {
  Plus,
  Edit2,
  Calendar,
  Share2,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { Layout } from "../Layout";

export const ContentCreator = () => {
  const [activeTab, setActiveTab] = useState("write");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "facebook",
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState<string | null>(null);
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);

  // Sample content types for AI generation
  const contentTypes = [
    "Educational Post",
    "Promotional Offer",
    "Team Introduction",
    "Patient Testimonial",
    "Event Announcement",
    "Oral Health Tip",
  ];

  const tones = [
    "Professional",
    "Friendly",
    "Enthusiastic",
    "Authoritative",
    "Conversational",
  ];

  const platforms = [
    { id: "facebook", name: "Facebook", icon: "f" },
    { id: "instagram", name: "Instagram", icon: "📷" },
    { id: "twitter", name: "Twitter", icon: "𝕏" },
    { id: "linkedin", name: "LinkedIn", icon: "in" },
  ];

  // Toggle platform selection
  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter((id) => id !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  // Generate AI content ideas
  const generateIdeas = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedIdeas([
        "5 signs you might need a dental checkup sooner than you think",
        "How proper brushing technique can save you money on dental treatments",
        "Meet our hygienist: Q&A about daily oral care routines",
        "Summer special: 15% off teeth whitening this month",
      ]);
      setIsGenerating(false);
    }, 1500);
  };

  // Use a generated idea
  const useGeneratedIdea = (idea: string) => {
    setTitle(idea);
    setContent(
      `This would be AI-generated content based on the idea: "${idea}". The content would be tailored to your dental practice and selected tone.`
    );
    setActiveTab("write");
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save/publish logic here
    console.log({
      title,
      content,
      platforms: selectedPlatforms,
      scheduledDate,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Create New Content
          </h1>
          <div className="flex space-x-3">
            <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
              <Edit2 className="mr-2" /> Save Draft
            </button>
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              <Share2 className="mr-2" /> Publish Now
            </button>
          </div>
        </div>

        {/* Content Type Selection */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            1. Select Content Type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {contentTypes.map((type) => (
              <button
                key={type}
                className={`border rounded-md p-3 text-sm ${
                  activeTab === "write"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => setActiveTab("write")}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs for Write/Generate */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`pb-2 px-4 ${
              activeTab === "write"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("write")}
          >
            Write Content
          </button>
          <button
            className={`pb-2 px-4 ${
              activeTab === "generate"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("generate")}
          >
            AI Generate Ideas
          </button>
        </div>

        {/* Main Content Area */}
        {activeTab === "write" ? (
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Title/Headline
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter a title for your content"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Content
                </label>
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  {/* Simple toolbar for demonstration */}
                  <div className="flex border-b border-gray-300 p-2 bg-gray-50">
                    <button
                      type="button"
                      className="p-1 mx-1 hover:bg-gray-200 rounded"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      className="p-1 mx-1 hover:bg-gray-200 rounded"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      className="p-1 mx-1 hover:bg-gray-200 rounded"
                    >
                      U
                    </button>
                    <button
                      type="button"
                      className="p-1 mx-1 hover:bg-gray-200 rounded"
                    >
                      🔗
                    </button>
                    <button
                      type="button"
                      className="p-1 mx-1 hover:bg-gray-200 rounded"
                    >
                      📷
                    </button>
                    <button
                      type="button"
                      className="p-1 mx-1 hover:bg-gray-200 rounded"
                    >
                      📊
                    </button>
                  </div>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-3 min-h-[200px]"
                    placeholder="Write your content here..."
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post To
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setShowPlatformDropdown(!showPlatformDropdown)
                      }
                      className="flex items-center justify-between w-48 border border-gray-300 rounded-md px-3 py-2 bg-white"
                    >
                      <div className="flex">
                        {selectedPlatforms.slice(0, 2).map((platformId) => {
                          const platform = platforms.find(
                            (p) => p.id === platformId
                          );
                          return (
                            <span key={platformId} className="mr-1">
                              {platform?.icon}
                            </span>
                          );
                        })}
                        {selectedPlatforms.length > 2 && (
                          <span className="ml-1">
                            +{selectedPlatforms.length - 2}
                          </span>
                        )}
                      </div>
                      <ChevronDown />
                    </button>
                    {showPlatformDropdown && (
                      <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                        {platforms.map((platform) => (
                          <label
                            key={platform.id}
                            className="flex items-center px-3 py-2 hover:bg-gray-100"
                          >
                            <input
                              type="checkbox"
                              checked={selectedPlatforms.includes(platform.id)}
                              onChange={() => togglePlatform(platform.id)}
                              className="mr-2"
                            />
                            <span className="mr-2">{platform.icon}</span>
                            {platform.name}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
                    <Calendar className="mr-2 text-gray-400" />
                    <input
                      type="datetime-local"
                      value={scheduledDate || ""}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="border-none focus:ring-0 p-0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                {scheduledDate ? "Schedule Post" : "Publish Now"}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              AI Content Generation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  {contentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tone
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  {tones.map((tone) => (
                    <option key={tone} value={tone}>
                      {tone}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={generateIdeas}
              disabled={isGenerating}
              className={`flex items-center justify-center w-full py-3 rounded-md mb-6 ${
                isGenerating ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {isGenerating ? "Generating Ideas..." : "Generate Content Ideas"}
            </button>

            {generatedIdeas.length > 0 && (
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3">
                  Generated Ideas
                </h3>
                <div className="space-y-3">
                  {generatedIdeas.map((idea, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer"
                      onClick={() => useGeneratedIdea(idea)}
                    >
                      <div className="flex justify-between">
                        <p>{idea}</p>
                        <button
                          className="text-blue-600 hover:text-blue-800 ml-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            useGeneratedIdea(idea);
                          }}
                        >
                          Use
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};
