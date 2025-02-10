import { Link } from "react-router-dom";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    published_at: string | null;
  };
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
        <p className="text-sm text-gray-500">
          Published on: {new Date(post.published_at!).toLocaleDateString()}
        </p>
      </div>
      <div className="p-6 pt-0 flex justify-end">
        <Link
          to={`/blog/${post.id}`}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};