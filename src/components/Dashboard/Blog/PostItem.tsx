import { Edit, Trash, ChevronDown, Check } from "lucide-react";
import { BlogPost } from "../../../contexts/BlogContext";

interface PostItemProps {
  post: BlogPost;
  expandedPost: number | null;
  setExpandedPost: (id: number | null) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onPublish: (id: number) => void;
}

export const PostItem = ({
  post,
  expandedPost,
  setExpandedPost,
  onEdit,
  onDelete,
  onPublish,
}: PostItemProps) => {
  return (
    <div key={post.id} className="bg-white rounded-lg shadow">
      <div
        className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
        onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
      >
        <div className="flex-1">
          <h3 className="font-medium text-gray-800">{post.title}</h3>
          <p className="text-sm text-gray-500">
            {post.published_at ? `Published: ${new Date(post.published_at).toLocaleDateString()}` : "Draft"}
          </p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            expandedPost === post.id ? "rotate-180" : ""
          }`}
        />
      </div>

      {expandedPost === post.id && (
        <div className="p-4 pt-0 border-t border-gray-100">
          <div className="prose max-w-none mb-4" dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className="flex p-4 justify-end space-x-4">
            {!post.published_at && (
              <button
                onClick={() => onPublish(post.id)}
                className="flex items-center space-x-1 text-green-600 hover:text-green-800"
              >
                <Check className="w-4 h-4" />
                <span>Publish</span>
              </button>
            )}
            <button
              onClick={() => onEdit(post.id)}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="flex items-center space-x-1 text-red-600 hover:text-red-800"
            >
              <Trash className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 