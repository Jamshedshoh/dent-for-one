import { useState, useEffect } from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { useBlog } from "../../contexts/BlogContext";
import { Loading } from "../ui/Loading";
import { PostCard } from "./PostCard";
import HeroImage from "../../assets/blog-hero-picture.png";
import { Link } from "react-router-dom";

export const Blog = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <PostsSection />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="relative bg-white py-20 px-6">
      <div className="container mx-auto py-20 flex justify-between">
        <div className="mt-20 mx-5">
          <h1 className="text-5xl font-semibold">Dental News</h1>
          <p className="mt-4 text-lg">
            On this blog we share news about events and Inspiring stories of our
            patients. Make sure you subscribe to get the latest updates
          </p>

          <div className="flex mt-8 md:w-96 shadow-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-2 border border-gray-300 rounded-l-md"
              required
            />
            <button className="px-4 bg-blue-400 text-white rounded-r-md hover:bg-blue-600 transition">
              Subscribe
            </button>
          </div>
        </div>
        <div className="w-4/6">
          <img
            className="object-cover w-full h-full rounded-md"
            src={HeroImage}
            alt="Platform connects Dentists, Patients, and Vendors in one unified ecosystem."
          />
        </div>
      </div>
    </div>
  );
};

const categories = [
  { name: "General Dentistry", icon: "🦷" },
  { name: "Cosmetic Dentistry", icon: "💅" },
  { name: "Orthodontics", icon: "🔄" },
  { name: "Preventative Care", icon: "🚽" },
  { name: "Patient Stories", icon: "📚" },
  { name: "Pediatric Dentistry", icon: "👶" },
  { name: "Endodontics", icon: "🔍" },
  { name: "Periodontics", icon: "🦷" },
  { name: "Prosthodontics", icon: "🔧" },
  { name: "Oral Surgery", icon: "🔪" },
];

const CategoriesSection = () => {

  const [minShown, setMinShown] = useState(6);

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Browse Categories
          </h2>
          <div>
            <button
              onClick={() =>
                setMinShown(
                  minShown === categories.length ? 6 : categories.length
                )
              }
              className="text-blue-400 hover:text-blue-700 font-bold py-2 px-4 rounded"
            >
              {minShown === categories.length
                ? "Show Less"
                : "View All Categories"}
            </button>
          </div>
        </div>
        <div className="flex space-x-4 flex-wrap space-y-4">
          {categories.slice(0, minShown).map((category, index) => (
            <button
              key={index}
              className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded shadow-md flex items-center first:mt-4"
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Blog Posts Section Component
const PostsSection = () => {
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
      <div className="container mx-auto space-y-10">
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold text-gray-800 mb-12">
              Featured Articles
            </h2>
            <div>
              <Link
                to="blog/featured"
                className="text-blue-400 hover:text-blue-700 font-bold py-2 px-4 rounded"
              >
                See All Articles
              </Link>
            </div>
          </div>
          <div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {posts
                ?.slice(0, 4)
                .filter((post) => post.published_at)
                .map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold text-gray-800 mb-12">
              Orthodontics
            </h2>
            <div>
              <Link
                to="blog/featured"
                className="text-blue-400 hover:text-blue-700 font-bold py-2 px-4 rounded"
              >
                See All Articles
              </Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {posts
              ?.slice(0, 4)
              .filter((post) => post.published_at)
              .map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold text-gray-800 mb-12">
              Preventative Care
            </h2>
            <div>
              <Link
                to="blog/featured"
                className="text-blue-400 hover:text-blue-700 font-bold py-2 px-4 rounded"
              >
                See All Articles
              </Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {posts
              ?.slice(0, 4)
              .filter((post) => post.published_at)
              .map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SubscribeSection = () => {

  return (
    <div className="bg-blue-100 py-16 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Stay With Us
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Get the latest articles and updates delivered straight to your inbox.
        </p>
        <div className="flex justify-center mt-8 md:w-1/2 mx-auto shadow-md">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 p-3 border border-gray-300 rounded-l-md"
            required
          />
          <button className="px-6 bg-blue-400 text-white rounded-r-md hover:bg-blue-600 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
