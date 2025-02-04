import { useState, useEffect } from "react";
import { useBlog } from "../../../contexts";
import { Plus } from "lucide-react";
import { Search } from "./Search";
import { PostItem } from "./PostItem";
import { PostFormAdd } from "./PostFormAdd";
import { PostFormEdit } from "./PostFormEdit";

export const Blog = () => {
  const { posts, fetchPosts, deletePost, createPost, updatePost, publishPost } = useBlog();
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = posts.filter((post) =>
    post?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitialFormData = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return undefined;
    return {
      id: post.id,
      title: post.title,
      content: post.content
    };
  };

  const handleAddPost = async (data: { title: string; content: string }) => {
    await createPost(data);
    setIsAddFormOpen(false);
  };

  const handleEditPost = async (data: { title: string; content: string }) => {
    if (editPostId) {
      await updatePost(editPostId, data);
      setEditPostId(null);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Blog Posts</h1>
          <button
            onClick={() => setIsAddFormOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Post</span>
          </button>
        </div>

        {/* Search Bar */}
        <Search query={searchQuery} onSearch={setSearchQuery} />

        {/* Posts List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredPosts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              expandedPost={expandedPost}
              setExpandedPost={setExpandedPost}
              onEdit={setEditPostId}
              onDelete={deletePost}
              onPublish={publishPost}
            />
          ))}
        </div>

        {isAddFormOpen && (
          <PostFormAdd
            onSubmit={handleAddPost}
            onCancel={() => setIsAddFormOpen(false)}
          />
        )}

        {editPostId && (
          <PostFormEdit
            initialData={getInitialFormData(editPostId)}
            onSubmit={handleEditPost}
            onCancel={() => setEditPostId(null)}
          />
        )}
      </div>
    </div>
  );
};
