import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBlog } from "../../contexts/BlogContext";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { Loading } from "../ui/Loading";

export const Post = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchPost } = useBlog();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (id) {
          const postData = await fetchPost(parseInt(id));
          setPost(postData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading post:", error);
        setLoading(false);
      }
    };
    loadPost();
  }, [id, fetchPost]);

  if (loading) {
    return (
      <div className="bg-gray-100">
        <Navbar />
        <div className="container mx-auto py-16 px-6 mt-16 text-center min-h-screen">
          <Loading />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-gray-100">
        <Navbar />
        <div className="container mx-auto py-16 px-6 mt-16 text-center min-h-screen">
          <p className="text-3xl text-gray-800 mb-4">Post not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-16 px-6 mt-16">
        <article className="bg-white rounded-lg shadow-lg p-8 min-h-screen">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {post.title}
          </h1>
          {post.published_at && (
            <p className="text-sm text-gray-500 mb-8">
              Published on: {new Date(post.published_at).toLocaleDateString()}
            </p>
          )}
          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
      <Footer />
    </div>
  );
};
