import { useState, useEffect } from "react";
import { useBlog } from "../../../contexts/BlogContext";
import { Plus, Search, Edit, Trash, ChevronDown, Check } from "lucide-react";

export const Blog = () => {
  const { posts, fetchPosts, createPost, updatePost, deletePost, publishPost } = useBlog();
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = posts.filter((post) =>
    post?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    };

    try {
      if (editId !== null) {
        await updatePost(editId, postData);
        setEditId(null);
      } else {
        await createPost(postData);
      }
      setIsAdding(false);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Blog Posts</h1>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Post</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredPosts.map((post) => (
            <div key={post.id} className="border-b last:border-b-0">
              <div className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{post.title}</h3>
                    <p className="text-sm text-gray-500">
                      {post.published_at ? "Published" : "Draft"}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {!post.published_at && (
                      <button
                        onClick={() => publishPost(post.id)}
                        className="text-green-600 hover:text-green-700"
                        title="Publish"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => setEditId(post.id)}
                      className="text-blue-600 hover:text-blue-700"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="text-red-600 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                      className="text-gray-600 hover:text-gray-700"
                    >
                      <ChevronDown className={`w-5 h-5 transition-transform ${expandedPost === post.id ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
                {expandedPost === post.id && (
                  <div className="mt-4 text-sm text-gray-600">
                    <p>{post.content}</p>
                    <p className="mt-2">
                      Created: {new Date(post.created_at).toLocaleDateString()}
                    </p>
                    {post.published_at && (
                      <p>Published: {new Date(post.published_at).toLocaleDateString()}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        {(isAdding || editId !== null) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
              <h2 className="text-xl font-bold mb-4">
                {editId !== null ? "Edit Post" : "Add New Post"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      name="title"
                      type="text"
                      required
                      className="w-full px-3 py-2 border rounded-md"
                      defaultValue={editId !== null ? posts.find(p => p.id === editId)?.title : ""}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <textarea
                      name="content"
                      required
                      rows={6}
                      className="w-full px-3 py-2 border rounded-md"
                      defaultValue={editId !== null ? posts.find(p => p.id === editId)?.content : ""}
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setEditId(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
