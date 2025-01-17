import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

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
    <div className="relative bg-blue-600 text-white py-20 px-6 text-center">
      <div className="container mx-auto">
        <h1 className="text-5xl font-semibold">Blog</h1>
        <p className="mt-4 text-lg">Stay informed with the latest trends, tips, and news in the dental industry.</p>
      </div>
    </div>
  );
};

// Blog Posts Section Component
const BlogPostsSection = () => {
  return (
    <div className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Latest Posts</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "The Future of Dental Technology", excerpt: "Explore how AI and advanced tools are transforming dental care.", date: "January 10, 2025" },
            { title: "5 Tips for Growing Your Dental Practice", excerpt: "Proven strategies to attract and retain more patients.", date: "December 15, 2024" },
            { title: "Understanding Dental Insurance Trends", excerpt: "A deep dive into how insurance impacts dental businesses.", date: "November 30, 2024" },
            { title: "Improving Patient Engagement", excerpt: "Techniques to create a better patient experience.", date: "October 20, 2024" },
            { title: "Top Dental Products for 2025", excerpt: "A review of the best tools and supplies for your clinic.", date: "September 5, 2024" },
            { title: "Navigating Regulatory Changes", excerpt: "Stay compliant with the latest industry regulations.", date: "August 15, 2024" }
          ].map((post, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <p className="text-sm text-gray-500">Published on: {post.date}</p>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};