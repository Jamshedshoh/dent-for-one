import { useState, useEffect } from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { useBlog } from "../../contexts/BlogContext";
import { Loading } from "../ui/Loading";
import { PostCard } from "./PostCard";

export const Blog = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <BlogHeroSection />
      <BlogPostsSection />
      <Footer />
    </div>
  );
};

// Blog Hero Section Component
const BlogHeroSection = () => {
  return (
    <div className="relative bg-blue-600 text-white py-20 px-6 text-center mt-16">
      <div className="container mx-auto">
        <h1 className="text-5xl font-semibold">Blog</h1>
        <p className="mt-4 text-lg">Stay informed with the latest trends, tips, and news in the dental industry.</p>
      </div>
    </div>
  );
};

// Blog Posts Section Component
const BlogPostsSection = () => {
  const { posts, fetchPosts } = useBlog();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        await fetchPosts();
        setLoading(false);
      } catch (error) {
        console.error("Error loading posts:", error);
        setLoading(false);
      }
    };
    loadPosts();
  }, [fetchPosts]);

  if (loading) {
    return (
      <div className="py-16 px-6">
        <div className="container mx-auto text-center">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Latest Posts</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.filter(post => post.published_at).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};